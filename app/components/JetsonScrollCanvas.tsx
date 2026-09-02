"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
} from "framer-motion";

/* ─── Constants ─────────────────────────────────────────────────────────────── */
const TOTAL_FRAMES = 10;
const BG_COLOR = "#050505";
const FRAME_BASE = "/jetson-frames/frame-";

/* ─── Scroll-pinned text sections ───────────────────────────────────────────── */
interface Section {
  start: number;
  end: number;
  title: string;
  body?: string;
  tag?: string;
  align: "center" | "left" | "right";
}

const SECTIONS: Section[] = [
  {
    start: 0.08,
    end: 0.88,
    title: "Meet the Jetson Orin Nano.",
    body: "The world's smallest edge AI supercomputer — purpose-built for autonomous, embedded, and next-generation intelligent devices.",
    align: "center",
    tag: "NVIDIA JETSON ORIN NANO",
  },
];

/* ─── Helpers ───────────────────────────────────────────────────────────────── */
function frameSrc(i: number): string {
  // Clamp between 1 and TOTAL_FRAMES to ensure valid frame requests
  const frameNum = Math.min(Math.max(1, i), TOTAL_FRAMES);
  return `${FRAME_BASE}${String(frameNum).padStart(4, "0")}.webp`;
}

function sectionOpacity(progress: number, s: Section): number {
  const fadeLen = 0.055;
  if (progress < s.start || progress > s.end) return 0;
  const fadeIn = Math.min((progress - s.start) / fadeLen, 1);
  const fadeOut = Math.min((s.end - progress) / fadeLen, 1);
  return Math.min(fadeIn, fadeOut);
}

/* ─── Loading screen ────────────────────────────────────────────────────────── */
function LoadingScreen({ progress }: { progress: number }) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-[200]"
      style={{ background: BG_COLOR }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo mark */}
      <div className="mb-10 flex flex-col items-center gap-5">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full blur-2xl opacity-40" style={{ background: "#76b900" }} />
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="relative">
            <rect width="56" height="56" rx="10" fill="#76b900" />
            <text x="28" y="38" textAnchor="middle" fill="white" fontSize="26" fontWeight="800" fontFamily="sans-serif">N</text>
          </svg>
        </div>
        <span className="text-white/40 text-[10px] tracking-[0.45em] uppercase font-mono">
          Loading Experience
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-52 h-[1px] bg-white/8 relative overflow-hidden rounded-full">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #76b900, #a3e635)" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.15, ease: "linear" }}
        />
      </div>

      <div className="mt-4 text-white/25 text-[11px] font-mono tabular-nums tracking-widest">
        {Math.round(progress)}%
      </div>
    </motion.div>
  );
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
      <div className={`max-w-xs md:max-w-sm lg:max-w-md ${isCenter ? "mx-auto" : ""}`}>
        {/* Tag */}
        {section.tag && (
          <div className="mb-3 flex items-center gap-2" style={{ justifyContent: justifyTag }}>
            <div className="w-5 h-px" style={{ background: "#76b900" }} />
            <span
              className="text-[9px] tracking-[0.4em] uppercase font-mono"
              style={{ color: "#76b900" }}
            >
              {section.tag}
            </span>
            <div className="w-5 h-px" style={{ background: "#76b900" }} />
          </div>
        )}

        {/* Title */}
        <h2
          className="font-sans font-bold tracking-tight leading-[1.05] text-white/90 mb-4"
          style={{
            fontSize: "clamp(1.5rem, 3.2vw, 2.8rem)",
            textShadow: "0 0 60px rgba(0,0,0,0.9), 0 2px 20px rgba(0,0,0,0.7)",
          }}
        >
          {section.title}
        </h2>

        {/* Accent divider */}
        <div className="mb-4 h-px w-full" style={dividerStyle} />

        {/* Body */}
        {section.body && (
          <p
            className="text-white/55 leading-relaxed font-sans"
            style={{
              fontSize: "clamp(0.78rem, 1.3vw, 0.92rem)",
              textShadow: "0 1px 20px rgba(0,0,0,0.8)",
            }}
          >
            {section.body}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Scroll cue (bottom) ────────────────────────────────────────────────────── */
function ScrollCue({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-white/25 text-[9px] tracking-[0.4em] uppercase font-mono">Scroll</span>
      <motion.div
        className="w-px h-10 origin-top"
        style={{ background: "linear-gradient(to bottom, rgba(118,185,0,0.9), transparent)" }}
        animate={{ scaleY: [0.1, 1, 0.1], opacity: [0, 1, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────────── */
export default function JetsonScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollCue, setShowScrollCue] = useState(true);

  /*
   * offset: ["start start", "end end"]
   * → progress 0: container top at viewport top  → sticky pins, animation starts
   * → progress 1: container bottom at viewport bottom  → this happens at the EXACT same moment
   *   the CSS sticky releases (container height 200vh - sticky height 100vh = 100vh of travel)
   *   so animation completes exactly when sticky releases. Zero empty trailing scroll.
   */
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

    /* "contain" mode scaled to cover — use LOGICAL pixel dimensions */
    const cw = canvas.clientWidth || window.innerWidth;
    const ch = canvas.clientHeight || window.innerHeight;
    const iw = img.naturalWidth || 1280;
    const ih = img.naturalHeight || 720;

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, cw, ch);

    /* Center the image inside the logical viewport with vertical lift to eliminate empty top headroom */
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
      // Use setTransform to RESET the matrix each time (ctx.scale would compound on every resize)
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

  /* ── Preload all images ──────────────────────────────────────────────────── */
  useEffect(() => {
    let doneCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const onSettled = (i: number) => {
      doneCount++;
      setLoadProgress(Math.round((doneCount / TOTAL_FRAMES) * 100));
      if (doneCount === TOTAL_FRAMES) {
        imagesRef.current = images;
        setLoaded(true);
        drawFrame(0);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = frameSrc(i + 1);
      img.decoding = "async";
      img.onload = () => onSettled(i);
      img.onerror = () => onSettled(i);
      images[i] = img;
    }
  }, [drawFrame]);

  /* ── Scroll-linked frame updates (sub-frame interpolation) ───────────────── */
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!loaded) return;

    // Sub-frame interpolation: blend between two adjacent frames
    const floored = Math.max(0, Math.min(Math.floor(latest), TOTAL_FRAMES - 1));
    const ceiled = Math.min(floored + 1, TOTAL_FRAMES - 1);
    const t = latest - floored;

    // If we have a meaningful fractional difference, pick the closer frame
    const idx = t < 0.5 ? floored : ceiled;
    if (idx === currentFrameRef.current) return;
    currentFrameRef.current = idx;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => drawFrame(idx));
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
    setShowScrollCue(latest < 0.02);
  });

  /* ── Cleanup ─────────────────────────────────────────────────────────────── */
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  /* ── Compute per-section opacities ──────────────────────────────────────── */
  const sectionOpacities = SECTIONS.map((s) => sectionOpacity(scrollProgress, s));

  return (
    <>
      {/* Loading overlay — shown until images are ready */}
      {!loaded && <LoadingScreen progress={loadProgress} />}

      <div
        ref={containerRef}
        style={{ height: "200vh", position: "relative", background: BG_COLOR }}
        aria-label="Jetson Orin Nano scroll animation"
      >
        {/* Sticky viewport — full screen, clean rendering */}
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

          {/* Subtle vignette */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse 90% 85% at 50% 50%, transparent 60%, ${BG_COLOR} 100%)`,
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* Text overlays — z-index above vignette */}
          <div style={{ position: "absolute", inset: 0, zIndex: 4 }}>
            {SECTIONS.map((section, i) => (
              <TextOverlay key={i} section={section} opacity={sectionOpacities[i]} />
            ))}
          </div>

          {/* Scroll cue */}
          <div style={{ position: "absolute", inset: 0, zIndex: 5 }}>
            <ScrollCue visible={loaded && showScrollCue} />
          </div>

          {/* Frame counter (dev only) */}
          {process.env.NODE_ENV === "development" && (
            <div
              style={{
                position: "absolute",
                bottom: 12,
                right: 16,
                color: "rgba(255,255,255,0.2)",
                fontSize: 10,
                fontFamily: "monospace",
                zIndex: 10,
              }}
            >
              {String(currentFrameRef.current + 1).padStart(4, "0")} / {TOTAL_FRAMES}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
