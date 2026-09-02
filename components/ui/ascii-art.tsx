"use client";

import React, { useEffect, useRef, useState } from "react";

interface AsciiArtProps {
  src: string;
  resolution?: number;
  color?: string;
  animationStyle?: "fade" | "none";
  animationDuration?: number;
  animateOnView?: boolean;
  className?: string;
}

// High-definition ASCII gradient: from dense to light
const ASCII_CHARS = "@%#*+=-:. ";

export function AsciiArt({
  src,
  resolution = 120,
  color = "#ffffff",
  animationStyle = "fade",
  animationDuration = 1.2,
  animateOnView = false,
  className = "",
}: AsciiArtProps) {
  const [ascii, setAscii] = useState<string>("");
  const [isVisible, setIsVisible] = useState(!animateOnView);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animateOnView) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [animateOnView]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const targetWidth = Math.max(90, Math.min(resolution, 150));
      // Standard monospace character font aspect ratio is ~ 1 : 2
      const targetHeight = Math.round((img.height / img.width) * targetWidth * 0.52);

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
      const data = imageData.data;

      let result = "";
      for (let y = 0; y < targetHeight; y++) {
        for (let x = 0; x < targetWidth; x++) {
          const offset = (y * targetWidth + x) * 4;
          const r = data[offset];
          const g = data[offset + 1];
          const b = data[offset + 2];
          const a = data[offset + 3];

          // Transparent background pixels
          if (a < 35) {
            result += " ";
            continue;
          }

          // Perceived luminance (0 to 255)
          const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          // Invert so brighter areas get denser characters for dark background
          const normalized = (luminance / 255) * (a / 255);
          const charIdx = Math.floor(normalized * (ASCII_CHARS.length - 1));
          // Reverse index so light pixels shine brightly
          const char = ASCII_CHARS[ASCII_CHARS.length - 1 - charIdx] || " ";

          result += char;
        }
        result += "\n";
      }

      setAscii(result);
    };
  }, [src, resolution]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{
        transition: animationStyle === "fade" ? `opacity ${animationDuration}s ease-in-out` : undefined,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <pre
        className="font-mono leading-[0.58] tracking-[-0.09em] select-none text-[6.5px] sm:text-[7.5px] md:text-[8.5px] lg:text-[9.5px] whitespace-pre text-center"
        style={{
          color: color,
        }}
      >
        {ascii || "Loading ASCII..."}
      </pre>
    </div>
  );
}
