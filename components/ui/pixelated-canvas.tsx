"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export interface PixelatedCanvasProps {
  src: string;
  width?: number;
  height?: number;
  cellSize?: number;
  dotScale?: number;
  shape?: "square" | "circle";
  backgroundColor?: string;
  grayscale?: boolean;
  className?: string;
  responsive?: boolean;
  dropoutStrength?: number;
  interactive?: boolean;
  distortionStrength?: number;
  distortionRadius?: number;
  distortionMode?: "repel" | "attract" | "swirl";
  followSpeed?: number;
  sampleAverage?: boolean;
  tintColor?: string;
  tintStrength?: number;
  maxFps?: number;
  objectFit?: "cover" | "contain" | "fill" | "none";
  jitterStrength?: number;
  jitterSpeed?: number;
  fadeOnLeave?: boolean;
  fadeSpeed?: number;
}

export function PixelatedCanvas({
  src,
  width = 440,
  height = 440,
  cellSize = 3,
  dotScale = 0.9,
  shape = "circle",
  backgroundColor = "transparent",
  grayscale = false,
  className = "",
  responsive = false,
  dropoutStrength = 0,
  interactive = true,
  distortionStrength = 0,
  distortionRadius = 80,
  distortionMode = "swirl",
  followSpeed = 0.2,
  sampleAverage = true,
  tintColor = "#FFFFFF",
  tintStrength = 0,
  maxFps = 60,
  objectFit = "contain",
  jitterStrength = 0,
  jitterSpeed = 2,
  fadeOnLeave = true,
  fadeSpeed = 0.1,
}: PixelatedCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, isOver: false, intensity: 0 });
  const timeRef = useRef(0);
  const imgDataRef = useRef<ImageData | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef(0);

  const hexToRgb = (hex: string) => {
    const clean = hex.replace("#", "");
    if (clean.length === 3) {
      return {
        r: parseInt(clean[0] + clean[0], 16),
        g: parseInt(clean[1] + clean[1], 16),
        b: parseInt(clean[2] + clean[2], 16),
      };
    }
    return {
      r: parseInt(clean.substring(0, 2), 16) || 255,
      g: parseInt(clean.substring(2, 4), 16) || 255,
      b: parseInt(clean.substring(4, 6), 16) || 255,
    };
  };

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const ctx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const imgAspect = img.width / img.height;
      const targetAspect = width / height;
      let drawW = width;
      let drawH = height;
      let drawX = 0;
      let drawY = 0;

      if (objectFit === "contain") {
        if (imgAspect > targetAspect) {
          drawW = width;
          drawH = width / imgAspect;
          drawY = (height - drawH) / 2;
        } else {
          drawH = height;
          drawW = height * imgAspect;
          drawX = (width - drawW) / 2;
        }
      } else if (objectFit === "cover") {
        if (imgAspect > targetAspect) {
          drawH = height;
          drawW = height * imgAspect;
          drawX = (width - drawW) / 2;
        } else {
          drawW = width;
          drawH = width / imgAspect;
          drawY = (height - drawH) / 2;
        }
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      imgDataRef.current = ctx.getImageData(0, 0, width, height);
    };
  }, [src, width, height, objectFit]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tint = hexToRgb(tintColor);
    const radiusSq = distortionRadius * distortionRadius;
    const frameInterval = 1000 / maxFps;

    const render = (now: number) => {
      rafIdRef.current = requestAnimationFrame(render);

      if (now - lastFrameTimeRef.current < frameInterval) {
        return;
      }
      lastFrameTimeRef.current = now;

      timeRef.current += 0.04 * jitterSpeed;

      // Mouse smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * followSpeed;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * followSpeed;

      if (fadeOnLeave) {
        if (mouseRef.current.isOver) {
          mouseRef.current.intensity = Math.min(1, mouseRef.current.intensity + fadeSpeed);
        } else {
          mouseRef.current.intensity = Math.max(0, mouseRef.current.intensity - fadeSpeed);
        }
      } else {
        mouseRef.current.intensity = mouseRef.current.isOver ? 1 : 0;
      }

      ctx.clearRect(0, 0, width, height);
      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      const imgData = imgDataRef.current;
      if (!imgData) return;

      const { data } = imgData;
      const effectiveDotSize = cellSize * dotScale;
      const radiusOffset = (cellSize - effectiveDotSize) / 2;
      const activeDistortion = distortionStrength * mouseRef.current.intensity;

      for (let y = 0; y < height; y += cellSize) {
        for (let x = 0; x < width; x += cellSize) {
          // Dropout check
          if (dropoutStrength > 0) {
            const hash = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
            if (hash - Math.floor(hash) < dropoutStrength) {
              continue;
            }
          }

          let sampleX = Math.floor(x + cellSize / 2);
          let sampleY = Math.floor(y + cellSize / 2);

          let drawX = x;
          let drawY = y;

          // Pointer interaction distortion (if enabled and intensity > 0)
          if (interactive && activeDistortion > 0) {
            const dx = sampleX - mouseRef.current.x;
            const dy = sampleY - mouseRef.current.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < radiusSq && distSq > 0) {
              const dist = Math.sqrt(distSq);
              const factor = (1 - dist / distortionRadius) * activeDistortion;

              if (distortionMode === "swirl") {
                const angle = factor * 2;
                const cosA = Math.cos(angle);
                const sinA = Math.sin(angle);
                drawX += (dx * cosA - dy * sinA - dx);
                drawY += (dx * sinA + dy * cosA - dy);
              } else if (distortionMode === "repel") {
                drawX += (dx / dist) * factor * 20;
                drawY += (dy / dist) * factor * 20;
              } else if (distortionMode === "attract") {
                drawX -= (dx / dist) * factor * 20;
                drawY -= (dy / dist) * factor * 20;
              }
            }
          }

          // Jitter (if enabled)
          if (jitterStrength > 0) {
            const jx = Math.sin(timeRef.current + y * 0.1) * jitterStrength;
            const jy = Math.cos(timeRef.current + x * 0.1) * jitterStrength;
            drawX += jx;
            drawY += jy;
          }

          // Sample pixel color
          const idx = (Math.min(height - 1, Math.max(0, sampleY)) * width + Math.min(width - 1, Math.max(0, sampleX))) * 4;
          let r = data[idx];
          let g = data[idx + 1];
          let b = data[idx + 2];
          const a = data[idx + 3] / 255;

          // Skip transparent or pure white image background
          if (a < 0.05 || (r > 240 && g > 240 && b > 240)) continue;

          // Grayscale conversion
          if (grayscale) {
            const lum = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
            r = lum;
            g = lum;
            b = lum;
          }

          // Apply tint
          if (tintStrength > 0) {
            r = Math.round(r * (1 - tintStrength) + tint.r * tintStrength);
            g = Math.round(g * (1 - tintStrength) + tint.g * tintStrength);
            b = Math.round(b * (1 - tintStrength) + tint.b * tintStrength);
          }

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;

          if (shape === "circle") {
            ctx.beginPath();
            ctx.arc(
              drawX + cellSize / 2,
              drawY + cellSize / 2,
              effectiveDotSize / 2,
              0,
              Math.PI * 2
            );
            ctx.fill();
          } else {
            ctx.fillRect(
              drawX + radiusOffset,
              drawY + radiusOffset,
              effectiveDotSize,
              effectiveDotSize
            );
          }
        }
      }
    };

    rafIdRef.current = requestAnimationFrame(render);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [
    width,
    height,
    cellSize,
    dotScale,
    shape,
    backgroundColor,
    grayscale,
    dropoutStrength,
    interactive,
    distortionStrength,
    distortionRadius,
    distortionMode,
    followSpeed,
    sampleAverage,
    tintColor,
    tintStrength,
    maxFps,
    jitterStrength,
    jitterSpeed,
    fadeOnLeave,
    fadeSpeed,
  ]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    mouseRef.current.targetX = (e.clientX - rect.left) * scaleX;
    mouseRef.current.targetY = (e.clientY - rect.top) * scaleY;
    mouseRef.current.isOver = true;
  }, [interactive, width, height]);

  const handleMouseEnter = useCallback(() => {
    mouseRef.current.isOver = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.isOver = false;
    mouseRef.current.targetX = -1000;
    mouseRef.current.targetY = -1000;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`block ${className}`}
      style={{
        width: responsive ? "100%" : `${width}px`,
        height: responsive ? "auto" : `${height}px`,
      }}
    />
  );
}
