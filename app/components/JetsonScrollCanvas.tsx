"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

/* ─── Configuration with Transparent RGBA Frames ────────────────────────────── */
const TOTAL_FRAMES = 180;
const FRAME_BASE = "/frames-transparent/frame_";

function frameSrc(i: number): string {
  const frameNum = Math.min(Math.max(1, i), TOTAL_FRAMES);
  return `${FRAME_BASE}${String(frameNum).padStart(4, "0")}.webp`;
}

export default function JetsonScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  /*
   * 280vh container height provides 180vh of pinned scroll travel.
   * Gives the 180-frame explosion & reassembly smooth cinematic momentum.
   */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring momentum physics matching jetson-web
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 38,
    restDelta: 0.0005,
  });

  // Scroll reveal animation for the "Did you know?" narrative callout in left negative space
  const didYouKnowOpacity = useTransform(
    smoothProgress,
    [0.06, 0.20, 0.82, 0.94],
    [0, 1, 1, 0]
  );

  const didYouKnowY = useTransform(
    smoothProgress,
    [0.06, 0.20, 0.82, 0.94],
    [32, 0, 0, -24]
  );

  /* ── Safe fallback: finds nearest loaded frame so canvas never flickers ─────── */
  const getRenderableImage = useCallback((targetIndex: number): HTMLImageElement | null => {
    const direct = imagesRef.current[targetIndex];
    if (direct && direct.complete && direct.naturalWidth > 0) {
      return direct;
    }

    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIndex - offset;
      if (prev >= 0 && imagesRef.current[prev]?.complete && imagesRef.current[prev]?.naturalWidth > 0) {
        return imagesRef.current[prev];
      }
      const next = targetIndex + offset;
      if (next < TOTAL_FRAMES && imagesRef.current[next]?.complete && imagesRef.current[next]?.naturalWidth > 0) {
        return imagesRef.current[next];
      }
    }
    return null;
  }, []);

  /* ── Canvas draw routine: completely transparent canvas, solid hardware ───── */
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!canvas || !ctx) return;

      const img = getRenderableImage(index);

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Clear transparent so the continuous global Dither background flows through seamlessly
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const imgWidth = img.naturalWidth || 1280;
      const imgHeight = img.naturalHeight || 720;

      // Object-fit: contain calculation
      const hRatio = canvasWidth / imgWidth;
      const vRatio = canvasHeight / imgHeight;
      const ratio = Math.min(hRatio, vRatio);

      // Scale to 1.04 for bold, commanding presence
      const displayScale = 1.04;
      const renderRatio = ratio * displayScale;

      const drawWidth = imgWidth * renderRatio;
      const drawHeight = imgHeight * renderRatio;
      const drawX = (canvasWidth - drawWidth) / 2;
      const drawY = (canvasHeight - drawHeight) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      // Opaque hardware in front, zero lines, transparent background
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    },
    [getRenderableImage]
  );

  /* ── Resize handler with Retina DPR ──────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    ctxRef.current = ctx;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      drawFrame(Math.round(currentFrameRef.current));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  /* ── Progressive Image Preload ─────────────────────────────────────────────── */
  useEffect(() => {
    let isCancelled = false;
    imagesRef.current = new Array(TOTAL_FRAMES);

    const loadSingle = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new window.Image();
        img.src = frameSrc(index + 1);
        img.decoding = "async";
        img.onload = () => {
          if (!isCancelled) imagesRef.current[index] = img;
          resolve();
        };
        img.onerror = () => resolve();
      });
    };

    const runPreloader = async () => {
      // Step 1: Milestone frames for instant interactivity
      const milestones = [0, 44, 89, 134, 179];
      await Promise.all(milestones.map((m) => loadSingle(m)));

      if (!isCancelled) {
        drawFrame(0);
      }

      // Step 2: Stream remaining frames in concurrent chunks of 10
      const remaining: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!milestones.includes(i)) remaining.push(i);
      }

      const chunkSize = 10;
      for (let i = 0; i < remaining.length; i += chunkSize) {
        if (isCancelled) break;
        const chunk = remaining.slice(i, i + chunkSize);
        await Promise.all(chunk.map((idx) => loadSingle(idx)));
      }
    };

    runPreloader();

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  /*
   * ── Continuous Spring + Lerp Render Loop ───────────────────────────────────
   * - From 0.0 to 0.85: Performs the full disassembly & reassembly.
   * - From 0.85 to 1.0: Firmly holds the reassembled product so the user sees
   *   the completed device before it unpins.
   */
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const normalized = Math.max(0, Math.min(latest / 0.85, 1));
      targetFrameRef.current = normalized * (TOTAL_FRAMES - 1);
    });

    const lerpSpeed = 0.35; // Responsive yet buttery momentum
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.02) {
        currentFrameRef.current += diff * lerpSpeed;
        drawFrame(Math.round(currentFrameRef.current));
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafRef.current);
    };
  }, [smoothProgress, drawFrame]);

  return (
    <section
      ref={containerRef}
      className="relative w-full z-20 bg-transparent"
      style={{ height: "280vh" }}
      aria-label="Jetson hardware disassembly scrollytelling"
    >
      {/* Sticky full-screen viewport — 100% transparent, seamless integration */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-transparent"
        style={{ position: "sticky", top: 0 }}
      >
        {/* Narrative Floating Texts (Left and Right Negative Spaces, Behind Hardware z-0) */}
        <div className="absolute inset-0 z-0 pointer-events-none w-full px-5 sm:px-8 md:px-10 lg:px-14 flex flex-col justify-between py-16 sm:py-0 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: DID YOU KNOW? (Shifted left-top into clear negative space) */}
          <motion.div
            style={{
              opacity: didYouKnowOpacity,
              y: didYouKnowY,
            }}
            className="w-full max-w-[250px] sm:max-w-[280px] md:max-w-[320px] pointer-events-none select-none sm:-translate-y-14 md:-translate-y-20"
          >
            <div className="space-y-3 sm:space-y-4">
              {/* Clean text without oval pill background or glowing dot */}
              <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-indigo-400 uppercase font-semibold">
                DID YOU KNOW?
              </p>

              {/* Body statement */}
              <p className="text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans font-normal">
                If <span className="text-white font-semibold">8 billion people</span> did 1 calculation every second, that’s{" "}
                <span className="text-white font-medium font-mono">8 billion operations/sec</span>.
              </p>

              <div className="h-px w-20 bg-gradient-to-r from-indigo-500/50 to-transparent" />

              <p className="text-base sm:text-lg md:text-xl text-white font-medium leading-snug font-sans">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-200 to-cyan-300 font-bold">
                  Jetson Orin Nano
                </span>{" "}
                can deliver up to{" "}
                <span className="font-bold font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300">
                  67 trillion
                </span>{" "}
                AI operations/sec.
              </p>
            </div>
          </motion.div>

          {/* Right: EDGE AI REAL-TIME CALLOUT (Bottom Right Negative Space) */}
          <motion.div
            style={{
              opacity: didYouKnowOpacity,
              y: didYouKnowY,
            }}
            className="w-full max-w-[250px] sm:max-w-[280px] md:max-w-[320px] pointer-events-none select-none sm:translate-y-12 md:translate-y-16 self-end sm:self-auto"
          >
            <div className="space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-indigo-400 uppercase font-semibold">
                WHY EDGE AI?
              </p>

              <p className="text-sm sm:text-base md:text-lg text-white/75 leading-relaxed font-sans font-normal">
                When <span className="text-white font-semibold">milliseconds matter</span>, sending data to a distant server isn't always ideal.
              </p>

              <div className="h-px w-20 bg-gradient-to-r from-indigo-500/50 to-transparent" />

              <p className="text-base sm:text-lg md:text-xl text-white font-medium leading-snug font-sans">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-200 to-cyan-300 font-bold">
                  Edge AI
                </span>{" "}
                makes the decision right where the data is created.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hardware-accelerated Canvas with transparent background: floats directly in front (z-10) */}
        <canvas
          ref={canvasRef}
          className="relative z-10 w-full h-full block select-none pointer-events-none"
        />
      </div>
    </section>
  );
}
