"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import Dither from "./Dither";

interface TeamMember {
  title: string;
  subtitle: string;
  image: string;
  className: string;
  imgPosition?: string;
}

interface DevTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEV_MEMBERS: TeamMember[] = [
  {
    title: "Srevarshan",
    subtitle: "4th Year AIML",
    image: "/team/srevarshan-dev.png",
    className: "absolute top-[12%] sm:top-[16%] left-[5%] sm:left-[10%] md:left-[14%] rotate-[-6deg]",
    imgPosition: "object-top",
  },
  {
    title: "Krishwin",
    subtitle: "3rd Year AIML",
    image: "/team/krishwin.jpeg",
    className: "absolute top-[28%] sm:top-[32%] left-[28%] sm:left-[35%] md:left-[41%] rotate-[6deg]",
    imgPosition: "object-center",
  },
  {
    title: "Karthik KS",
    subtitle: "4th Year AIML",
    image: "/team/karthik-ks.jpeg",
    className: "absolute top-[10%] sm:top-[14%] right-[5%] sm:right-[10%] md:right-[14%] rotate-[-5deg]",
    imgPosition: "object-top",
  },
];

export default function DevTeamModal({ isOpen, onClose }: DevTeamModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Outer Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl h-[88vh] max-h-[850px] min-h-[560px] my-auto bg-black/75 border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden z-10 flex flex-col"
          >
            {/* ── Outer Card Background: Black Blended Dither Animation ── */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden rounded-3xl">
              <Dither
                waveColor={[0.45, 0.45, 0.45]}
                backgroundColor={[0, 0, 0]}
                disableAnimation={false}
                enableMouseInteraction={false}
                colorNum={4}
                pixelSize={2}
                waveAmplitude={0.3}
                waveFrequency={3}
                waveSpeed={0.05}
                className="w-full h-full"
              />
              {/* Translucent black vignette blend */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.82) 100%)",
                }}
              />
            </div>

            {/* Top Bar Header inside modal */}
            <div className="relative z-30 flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-black/40 backdrop-blur-md">
              <div className="flex items-center">
                <span className="text-sm sm:text-base font-sans font-bold uppercase tracking-wider text-white/90 select-none">
                  Dev Team
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Draggable Cards Canvas Area */}
            <DraggableCardContainer className="relative flex-1 w-full h-full items-center justify-center overflow-hidden select-none z-10">
              {/* Center Background Typography (Webpage Font & Styling) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl text-center pointer-events-none select-none z-0 px-4">
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-sans font-black text-white/15 uppercase tracking-tight leading-none select-none">
                  Dev Team
                </h2>
                <p className="mt-4 text-xs sm:text-sm font-sans font-semibold text-white/30 tracking-[0.25em] uppercase select-none">
                  ✦ Click & drag any card around ✦
                </p>
              </div>

              {/* 3 Interactive Draggable Cards */}
              {DEV_MEMBERS.map((member) => (
                <DraggableCardBody key={member.title} className={member.className}>
                  <img
                    src={member.image}
                    alt={member.title}
                    className={`pointer-events-none relative z-10 h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 object-cover ${
                      member.imgPosition || "object-top"
                    } rounded-xl shadow-inner`}
                  />
                  <div className="mt-3 text-center">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
                      {member.title}
                    </h3>
                    <p className="mt-0.5 text-xs sm:text-sm font-mono text-neutral-400">
                      {member.subtitle}
                    </p>
                  </div>
                </DraggableCardBody>
              ))}
            </DraggableCardContainer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
