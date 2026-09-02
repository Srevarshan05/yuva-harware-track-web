"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
} from "framer-motion";

/* ─── Constants ─────────────────────────────────────────────────────────────── */
const START_FRAME = 11;
const END_FRAME = 30;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1; // 20 frames (11 to 30)
const BG_COLOR = "#050505";
const FRAME_BASE = "/jetson-frames/frame-";

/* ─── Scroll-pinned text sections for Component Disassembly ─────────────────── */
interface Section {
  start: number;
  end: number;
  title: string;
  body?: string;
  tag?: string;
  align: "center" | "left" | "right";
}

const COMPONENT_SECTIONS: Section[] = [
  {
    start: 0.05,
    end: 0.32,
    title: "Engineered to the Core.",
    body: "Custom extruded aluminum heatsink and thermal module engineered for high-density heat dissipation under continuous 40 TOPS workloads.",
    align: "left",
    tag: "COOLING & THERMAL MODULE",
  },
  {
    start: 0.36,
    end: 0.65,
    title: "Ampere Architecture SOM.",
    body: "1024-core NVIDIA Ampere GPU with 32 Tensor Cores, 6-core 64-bit Arm CPU, and 8 GB 128-bit LPDDR5 delivering 68 GB/s bandwidth.",
    align: "right",
    tag: "SILICON ENGINE · 40 TOPS",
  },
  {
    start: 0.70,
    end: 0.95,
    title: "Complete Hardware Freedom.",
    body: "Dual M.2 Key-M NVMe storage, 40-pin expansion header, Gigabit Ethernet, and dual MIPI CSI camera lanes ready for edge deployment.",
    align: "center",
    tag: "CARRIER BOARD & I/O",
  },
];

/* ─── Helpers ───────────────────────────────────────────────────────────────── */
function frameSrc(offsetIndex: number): string {
  const frameNum = Math.min(Math.max(START_FRAME, START_FRAME + offsetIndex), END_FRAME);
  return `${FRAME_BASE}${String(frameNum).padStart(4, "0")}.webp`;
}

function sectionOpacity(progress: number, s: Section): number {
  const fadeLen = 0.055;
  if (progress < s.start || progress > s.end) return 0;
  const fadeIn = Math.min((progress - s.start) / fadeLen, 1);
  const fadeOut = Math.min((s.end - progress) / fadeLen, 1);
  return Math.min(fadeIn, fadeOut);
}

/* ─── Text overlay ───────────────────────────────────────────────────────────── */
function TextOverlay({ section, opacity }: { section: Section; opacity: number }) {
  const isCenter = section.align === "center";
  const isRight = section.align === "right";

  const positionClass = isCenter
    ? "items-center text-center px-6"
    : isRight
    ? "items-end text-right pr-8 md:pr-20 lg:pr-32"
    : "items-start text-left pl-8 md:pl-20 lg:pl-32";

  const justifyTag = isRight ? "flex-end" : isCenter ? "center" : "flex-start";

  const dividerStyle = isCenter
    ? { background: "linear-gradient(to right, transparent, rgba(118,185,0,0.7), transparent)" }
    : isRight
    ? { background: "linear-gradient(to left, rgba(118,185,0,0.7), rgba(118,185,0,0.2), transparent)" }
    : { background: "linear-gradient(to right, rgba(118,185,0,0.7), rgba(118,185,0,0.2), transparent)" };

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center pointer-events-none ${positionClass}`}
      style={{ opacity, transition: "opacity 0.04s linear", willChange: "opacity" }}
    >
      <div className="max-w-xl">
        {section.tag && (
          <div className="flex items-center gap-2 mb-3" style={{ justifyContent: justifyTag }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#76b900] animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#76b900] font-semibold">
              {section.tag}
            </span>
          </div>
        )}

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.05] drop-shadow-2xl">
          {section.title}
        </h2>

        <div className="w-20 h-[2px] my-4 rounded-full" style={dividerStyle} />

        {section.body && (
          <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed drop-shadow-md">
            {section.body}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────────── */
export default function JetsonComponentCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  /* ── Canvas draw ─────────────────────────────────────────────────────────── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.clientWidth || window.innerWidth;
    const ch = canvas.clientHeight || window.innerHeight;
    const iw = img.naturalWidth || 1280;
    const ih = img.naturalHeight || 720;

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, cw, ch);

    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const yOffset = Math.round(dh * 0.1);
    const dy = (ch - dh) / 2 - yOffset;

    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  /* ── Resize handler ──────────────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    ctxRef.current = ctx;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      drawFrame(currentFrameRef.current);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [drawFrame]);

  /* ── Preload frames 11 to 30 ─────────────────────────────────────────────── */
  useEffect(() => {
    let doneCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const onSettled = (i: number) => {
      doneCount++;
      if (doneCount === TOTAL_FRAMES) {
        imagesRef.current = images;
        setLoaded(true);
        drawFrame(0);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);
      img.decoding = "async";
      img.onload = () => onSettled(i);
      img.onerror = () => onSettled(i);
      images[i] = img;
    }
  }, [drawFrame]);

  /* ── Scroll-linked frame updates ─────────────────────────────────────────── */
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!loaded) return;

    const floored = Math.max(0, Math.min(Math.floor(latest), TOTAL_FRAMES - 1));
    const ceiled = Math.min(floored + 1, TOTAL_FRAMES - 1);
    const t = latest - floored;

    const idx = t < 0.5 ? floored : ceiled;
    if (idx === currentFrameRef.current) return;
    currentFrameRef.current = idx;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => drawFrame(idx));
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const sectionOpacities = COMPONENT_SECTIONS.map((s) => sectionOpacity(scrollProgress, s));

  return (
    <div
      ref={containerRef}
      style={{ height: "200vh", position: "relative", background: BG_COLOR }}
      aria-label="Jetson Orin Nano component disassembly scroll animation"
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: BG_COLOR,
        }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            background: BG_COLOR,
          }}
        />

        {/* Subtle radial vignette */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 90% 85% at 50% 50%, transparent 60%, ${BG_COLOR} 100%)`,
            pointerEvents: "none",
          }}
        />

        {/* Ambient atmospheric glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(118,185,0,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Text overlays */}
        {COMPONENT_SECTIONS.map((s, i) => (
          <TextOverlay key={s.tag ?? s.title} section={s} opacity={sectionOpacities[i]} />
        ))}
      </div>
    </div>
  );
}
