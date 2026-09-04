"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Shield, Flame, Activity, Layers, ChevronDown } from "lucide-react";

interface StoryOverlayProps {
  progress: number; // 0.0 to 1.0
  onExploreClick?: () => void;
}

export default function StoryOverlay({ progress, onExploreClick }: StoryOverlayProps) {
  // Chapter 1: 0% - 22% (The Monolith)
  const isCh1 = progress >= 0 && progress < 0.22;
  // Chapter 2: 24% - 48% (Exoskeleton Disassembly)
  const isCh2 = progress >= 0.24 && progress < 0.48;
  // Chapter 3: 50% - 76% (Silicon & Tensor Matrix)
  const isCh3 = progress >= 0.50 && progress < 0.76;
  // Chapter 4: 78% - 100% (Harmonic Reassembly)
  const isCh4 = progress >= 0.78 && progress <= 1.0;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 md:p-14">
      {/* Top telemetry status bar */}
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto pt-6 opacity-75 text-[11px] font-mono tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="text-white/60">
            SYSTEM STATUS: SYNCHRONIZED
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-white/40">
            DISASSEMBLY VECTOR: {(progress * 100).toFixed(0)}%
          </span>
          <span className="w-1 h-1 rounded-full bg-cyan-400" />
          <span className="text-white/40">
            THERMAL EQUILIBRIUM: NOMINAL
          </span>
        </div>
      </div>

      {/* Narrative Section Center Stages */}
      <div className="w-full max-w-7xl mx-auto my-auto relative">
        {/* CHAPTER 1: THE MONOLITH */}
        {isCh1 && (
          <motion.div
            key="ch1"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border backdrop-blur-md bg-white/5 border-white/10 text-cyan-400">
              <SparklesIcon className="w-3 h-3" />
              <span>PHASE 01 // ARCHITECTURAL CONVERGENCE</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-white/95">
              Autonomous Intelligence.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                Unconstrained.
              </span>
            </h1>
            <p className="mt-5 text-base md:text-lg font-normal leading-relaxed max-w-lg text-white/60">
              The Jetson architecture delivers 275 teraflops of edge artificial intelligence in an aerospace-grade hermetic chassis. Scroll to inspect its inner anatomy.
            </p>

            {/* Metric badges */}
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <div>
                <div className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  275 <span className="text-xs font-mono text-cyan-400">TOPS</span>
                </div>
                <div className="text-xs uppercase tracking-wider font-mono text-white/40">
                  INT8 AI Inference
                </div>
              </div>
              <div className="w-px h-8 bg-neutral-800" />
              <div>
                <div className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  64 <span className="text-xs font-mono text-cyan-400">GB</span>
                </div>
                <div className="text-xs uppercase tracking-wider font-mono text-white/40">
                  256-bit LPDDR5X
                </div>
              </div>
              <div className="w-px h-8 bg-neutral-800" />
              <div>
                <div className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  15-60 <span className="text-xs font-mono text-cyan-400">W</span>
                </div>
                <div className="text-xs uppercase tracking-wider font-mono text-white/40">
                  Configurable TDP
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CHAPTER 2: DECONSTRUCTION / EXOSKELETON */}
        {isCh2 && (
          <motion.div
            key="ch2"
            initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 20, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border backdrop-blur-md bg-white/5 border-white/10 text-amber-400">
              <Layers className="w-3 h-3" />
              <span>PHASE 02 // EXOSKELETON DISASSEMBLY</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white/90">
              Precision Unibody.
              <br />
              Zero Structural Compromise.
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-white/60">
              CNC-milled from a solid billet of 7075-T6 aluminum. Each thermal fin is aerodynamically profiled to generate passive laminar micro-convection currents.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <div className="p-3 rounded-xl border backdrop-blur-md flex items-start gap-3 bg-white/5 border-white/10">
                <Shield className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-white">
                    Hermetic O-Ring Vacuum Seal
                  </h4>
                  <p className="text-xs mt-0.5 text-white/50">
                    IP67 immersion and dust ingress certified for harsh industrial robotics.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CHAPTER 3: SILICON & TENSOR MATRIX */}
        {isCh3 && (
          <motion.div
            key="ch3"
            initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl ml-auto text-right"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border backdrop-blur-md bg-white/5 border-white/10 text-emerald-400">
              <Cpu className="w-3 h-3" />
              <span>PHASE 03 // SILICON CORE EXPOSED</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white/90">
              2,048 Ampere Cores.
              <br />
              Zero Bottlenecks.
            </h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-white/60">
              Direct die contact with a vapor chamber forged from sintered copper powder, transferring 120W/cm² with near-zero thermal delta.
            </p>

            <div className="mt-6 flex flex-col gap-3 items-end">
              <div className="p-3 rounded-xl border backdrop-blur-md flex items-start gap-3 text-left max-w-sm bg-white/5 border-white/10">
                <Flame className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-white">
                    Sintered Vapor Chamber
                  </h4>
                  <p className="text-xs mt-0.5 text-white/50">
                    Sub-millimeter phase-change wick removes peak heat transients instantly.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CHAPTER 4: SYNTHESIS & REASSEMBLY */}
        {isCh4 && (
          <motion.div
            key="ch4"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border backdrop-blur-md bg-white/5 border-white/10 text-cyan-400">
              <Zap className="w-3 h-3" />
              <span>PHASE 04 // HARMONIC CONVERGENCE</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white/90">
              Reassembled. Calibrated.
              <br />
              Ready for the Real World.
            </h2>
            <p className="mt-4 text-sm md:text-base max-w-md mx-auto leading-relaxed text-white/60">
              Every component locks back into acoustic and thermal harmony. Built for next-generation humanoid robotics, autonomous flight, and factory vision.
            </p>

            {onExploreClick && (
              <div className="mt-7 flex items-center justify-center gap-4 pointer-events-auto">
                <button
                  onClick={onExploreClick}
                  className="px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all shadow-xl bg-white text-black hover:bg-neutral-200 shadow-white/20 active:scale-95"
                >
                  Inspect Technical Blueprint
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom Scroll Prompt & Progress Bar */}
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-2.5">
        {progress < 0.85 && (
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase opacity-70 text-white/60"
          >
            <span>SCROLL TO DISASSEMBLE</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
        )}

        {/* Minimal scrub timeline indicator */}
        <div className="w-full max-w-xs h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-75"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
      />
    </svg>
  );
}
