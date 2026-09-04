"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Folder from "./Folder";

export default function PrizesSection() {
  // 3 Prize Cards configured to match the folder fanning order:
  // items[0] -> Left paper (2nd Place)
  // items[1] -> Right paper (3rd Place)
  // items[2] -> Center Top paper (1st Place Champion)
  const prizeItems = useMemo(
    () => [
      // 🥈 Second Place (Left Paper)
      (
        <div
          key="second-place"
          className="w-full h-full p-2.5 sm:p-3 flex flex-col items-center justify-center text-center relative overflow-hidden bg-gradient-to-b from-[#14161d] to-[#0b0d11]"
        >
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="text-[7px] sm:text-[7.5px] font-mono uppercase tracking-widest text-zinc-300 font-bold px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/15">
              2nd Place
            </span>
            <span className="text-[9px]">🥈</span>
          </div>

          <div className="text-[18px] sm:text-[19px] font-black tracking-tight text-white leading-none my-1">
            ₹5,000
          </div>

          <p className="text-[7.5px] sm:text-[8px] font-sans text-white/65 leading-tight">
            Cash Prize + Goodies
          </p>
        </div>
      ),

      // 🥉 Third Place (Right Paper)
      (
        <div
          key="third-place"
          className="w-full h-full p-2.5 sm:p-3 flex flex-col items-center justify-center text-center relative overflow-hidden bg-gradient-to-b from-[#14161d] to-[#0b0d11]"
        >
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="text-[7px] sm:text-[7.5px] font-mono uppercase tracking-widest text-zinc-300 font-bold px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/15">
              3rd Place
            </span>
            <span className="text-[9px]">🥉</span>
          </div>

          <div className="text-[18px] sm:text-[19px] font-black tracking-tight text-white leading-none my-1">
            ₹2,000
          </div>

          <p className="text-[7.5px] sm:text-[8px] font-sans text-white/65 leading-tight">
            Cash Prize + Citation
          </p>
        </div>
      ),

      // 🏆 First Place (Center Top Paper)
      (
        <div
          key="first-place"
          className="w-full h-full p-2.5 sm:p-3 flex flex-col items-center justify-center text-center relative overflow-hidden bg-gradient-to-b from-[#181a22] to-[#0d0f14]"
        >
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="text-[7px] sm:text-[7.5px] font-mono uppercase tracking-widest text-amber-300 font-bold px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">
              1st Place
            </span>
            <span className="text-[9px]">🏆</span>
          </div>

          <div className="text-[19px] sm:text-[20px] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-400 leading-none my-1">
            ₹8,000
          </div>

          <p className="text-[7.5px] sm:text-[8px] font-sans text-white/70 leading-tight">
            Cash Prize + Hardware Kit
          </p>
        </div>
      ),
    ],
    []
  );

  return (
    <section
      id="prizes-section"
      className="relative z-30 w-full px-4 sm:px-8 lg:px-12 pt-10 pb-2 sm:pt-16 sm:pb-4 max-w-7xl mx-auto flex flex-col items-center overflow-x-clip sm:overflow-visible"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[440px] pointer-events-none -z-10 blur-[130px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(120,120,140,0.1) 40%, transparent 75%)",
        }}
      />

      {/* Header with ample PC bottom margin so open cards never collide with text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex flex-col items-center text-center gap-2.5 mb-14 sm:mb-32 md:mb-40 lg:mb-44 max-w-3xl mx-auto"
      >
        <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-white/60">
          REWARDS & RECOGNITION · YUVA MEGATHON
        </p>
        <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-[1.05]">
          15K+ Worth Prizes
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-white/60 max-w-2xl leading-relaxed mt-0.5">
          Build fast, assemble on-site, and turn your hardware vision into a
          winning prototype. Top engineering teams take home cash awards and hardware kits.
        </p>
      </motion.div>

      {/* Interactive Folder Container */}
      <div
        className="w-full h-[240px] xs:h-[260px] sm:h-[300px] relative flex items-center justify-center overflow-visible"
      >
        <Folder
          size={2}
          color="#2e323b"
          className="custom-folder"
          items={prizeItems}
        />
      </div>
    </section>
  );
}
