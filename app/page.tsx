"use client";

import Image from "next/image";
import Dither from "./components/Dither";
import { motion } from "framer-motion";
import JetsonScrollCanvas from "./components/JetsonScrollCanvas";
import PptScreeningSection from "./components/PptScreeningSection";
import ScoringBreakdown from "./components/ScoringBreakdown";
import JudgesCarouselSection from "./components/JudgesCarouselSection";

const PARTNER_LOGOS = [
  { name: "YUVA", src: "/logos/yuva-badge.png" },
  { name: "STAR(T)ECH", src: "/logos/startech.jpeg" },
  { name: "IEEE SB SRMIST", src: "/logos/ieee-srmist.jpg" }, // Center
  { name: "IET", src: "/logos/iet.jpeg" },
  { name: "ACM", src: "/logos/acm.jpeg" },
];

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-black text-white overflow-x-hidden flex flex-col justify-between">
      {/* ── Background Dither Animation ───────────────────────────────────── */}
      <div className="fixed inset-0 w-full h-full pointer-events-auto z-0">
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          backgroundColor={[0, 0, 0]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          pixelSize={2}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
          className="w-full h-full"
        />
      </div>

      {/* ── Subtle Vignette Blend ─────────────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 75%, #000000 100%)",
        }}
      />

      {/* ── Static Light-Theme White Logo Navbar Strip ────────────────────── */}
      <header className="sticky top-0 z-40 w-full bg-white shadow-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between sm:justify-around gap-4 md:gap-8 flex-wrap sm:flex-nowrap">
          {PARTNER_LOGOS.map((logo, idx) => (
            <motion.div
              key={logo.name}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`flex items-center gap-2.5 sm:gap-3 cursor-pointer group ${
                idx === 2 ? "sm:scale-105 font-extrabold" : ""
              }`}
            >
              <div className="relative h-8 sm:h-9 md:h-10 w-auto max-w-[130px] flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-full w-auto object-contain max-h-8 sm:max-h-9 md:max-h-10 rounded-sm drop-shadow-sm group-hover:drop-shadow transition-all"
                />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-wider text-neutral-800 uppercase font-sans whitespace-nowrap group-hover:text-neutral-950 transition-colors">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          PAGE 1: MAIN HERO SECTION (FULL SCREEN)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-30 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto min-h-[calc(100vh-60px)] py-12">
        {/* Large Central YUVA Logo with Ambient Glow and Interactive Hover Effect */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Ambient Glow Aura */}
          <div
            className="absolute -inset-6 rounded-full opacity-60 blur-3xl pointer-events-none animate-pulse"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(139,92,246,0.35) 45%, rgba(99,102,241,0.15) 70%, transparent 85%)",
            }}
          />

          {/* Interactive Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{
              scale: 1.12,
              rotate: [0, -1.5, 1.5, 0],
              transition: { duration: 0.35, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.96 }}
            className="relative cursor-pointer select-none"
          >
            <Image
              src="/logos/yuva-main.png"
              alt="YUVA Main Logo"
              width={300}
              height={300}
              priority
              className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain transition-all duration-300 drop-shadow-[0_0_45px_rgba(255,255,255,0.45)] hover:drop-shadow-[0_0_65px_rgba(255,255,255,0.75)] mx-auto"
            />
          </motion.div>
        </div>

        {/* Organizer Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
          className="text-sm md:text-base font-mono tracking-[0.25em] uppercase text-indigo-300 mb-3"
        >
          IEEE SB SRM IST Trichy Organizes
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6 text-white uppercase select-none font-sans"
          style={{
            textShadow:
              "0 0 50px rgba(99,102,241,0.3), 0 0 100px rgba(99,102,241,0.15)",
          }}
        >
          Hardware Hackathon
        </motion.h1>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-base md:text-xl text-white/70 max-w-2xl leading-relaxed font-normal italic"
        >
          "Hardware is built to run software, and software is developed to run
          efficiently on hardware. True innovation happens where they intersect."
        </motion.p>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          JETSON SCROLL ANIMATION (between hero and tracks)
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative z-20 w-full" style={{ background: "#050505" }}>
        <JetsonScrollCanvas />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          PAGE 2: PPT SCREENING INSTRUCTIONS, SCORING & JUDGES
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="tracks-section"
        className="relative z-30 w-full flex flex-col items-center justify-center overflow-visible pointer-events-auto"
      >
        <PptScreeningSection />
        <ScoringBreakdown />
        <JudgesCarouselSection />
      </section>

      {/* ── Minimalist Clean Footer ───────────────────────────────────────── */}
      <footer className="relative z-30 w-full py-16 px-6 flex flex-col items-center justify-center text-center">
        <span className="text-xs tracking-[0.25em] uppercase font-mono text-white/40 mb-2">
          © 2026 IEEE SB · SRM IST TRICHY
        </span>
        <span className="text-[10px] text-white/20 font-mono tracking-widest uppercase">
          YUVA MEGATHON · HARDWARE TRACK
        </span>
      </footer>
    </main>
  );
}





