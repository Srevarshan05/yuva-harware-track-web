"use client"

import { motion } from "framer-motion"
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "@/components/ui/expandable-screen"

export default function PptScreeningSection() {
  return (
    <ExpandableScreen
      layoutId="cta-card"
      triggerRadius="100px"
      contentRadius="24px"
    >
      {/* ── Collapsed View with Scroll Animation ─────────────────────────── */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 text-center max-w-3xl mx-auto"
        >
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[92%] tracking-[-0.03em] text-foreground mix-blend-exclusion"
          >
            Initial Screening Round
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl leading-[160%] text-foreground/80 max-w-2xl px-4"
          >
            All registered participants must submit a PPT for their given usecase.
            Evaluation will be strictly based on PPT Design, Quality, Problem Understanding,
            Impact, Tech Feasibility, Block Diagram, and Solution Clarity.
          </motion.p>

          {/* Morphing Trigger Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="pt-2"
          >
            <ExpandableScreenTrigger>
              <div className="bg-primary h-15 px-8 sm:px-10 py-3.5 text-lg sm:text-xl font-regular text-primary-foreground tracking-[-0.01em] shadow-2xl flex items-center gap-3">
                <span>View Instructions &amp; Process</span>
                <svg
                  className="w-5 h-5 text-primary-foreground transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </ExpandableScreenTrigger>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Expanded View ──────────────────────────────────────────────── */}
      <ExpandableScreenContent className="bg-primary">
        <div className="relative z-10 flex flex-col h-full w-full max-w-[1240px] mx-auto p-6 sm:p-10 lg:p-14 gap-10 sm:gap-12 my-auto">

          {/* ══════════════════════════════════════════════════════════════════
              TOP SECTION: EVALUATION CRITERIA & BIG DOWNLOAD BUTTON
          ══════════════════════════════════════════════════════════════════ */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-primary-foreground/15 pb-4">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-primary-foreground leading-none tracking-[-0.03em]">
                  Evaluation Criteria
                </h2>
                <p className="text-xs sm:text-sm text-primary-foreground/70 mt-2 max-w-xl leading-relaxed">
                  Screening presentations will be evaluated by our technical jury based on these core engineering parameters.
                </p>
              </div>

              {/* Big Download Button */}
              <div className="flex-shrink-0">
                <a
                  href="/templates/yuva_megathon_ppt_template.pptx"
                  download
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-4 rounded-full bg-primary-foreground text-primary font-semibold text-base sm:text-lg shadow-xl hover:bg-primary-foreground/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] tracking-[-0.01em]"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download PPT Template (.pptx)</span>
                </a>
              </div>
            </div>

            {/* 4 Criteria in 2x2 Grid with Entrance Animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  title: "PPT Design & Quality",
                  desc: "Clear visual hierarchy, readability, structured typography, proper margins, and aesthetic quality.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  ),
                },
                {
                  title: "Problem Understanding & Impact",
                  desc: "Depth of problem analysis, domain constraints, societal value, and tangible real-world impact.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  ),
                },
                {
                  title: "Tech Feasibility & Solution Clarity",
                  desc: "Viable hardware choices, sensor calibration, edge compute fit, and clear stepwise implementation logic.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  ),
                },
                {
                  title: "Block Diagram & Architecture",
                  desc: "System-level hardware block diagram with microcontroller pinouts, communication buses, and sensor nodes.",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                    />
                  ),
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 + idx * 0.08, ease: "easeOut" }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="flex gap-4 p-4.5 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 items-start hover:border-primary-foreground/20 transition-colors"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <p className="text-base text-primary-foreground font-semibold">
                      {item.title}
                    </p>
                    <p className="text-xs sm:text-sm text-primary-foreground/75 leading-[150%] mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              BOTTOM SECTION: PARTICIPATION FLOW (LEFT TO RIGHT FLOW CHART)
          ══════════════════════════════════════════════════════════════════ */}
          <div className="flex flex-col gap-5 pt-4 border-t border-primary-foreground/15">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-2xl sm:text-3xl font-medium text-primary-foreground tracking-[-0.02em]">
                  Participation Flow
                </h3>
                <p className="text-xs sm:text-sm text-primary-foreground/65 mt-0.5">
                  Follow this sequential pipeline from registration to the Grand Finale.
                </p>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-primary-foreground/50 hidden sm:inline-block">
                Step 01 → Step 05
              </span>
            </div>

            {/* Left to Right Horizontal Flow Grid with Staggered Cascading Animation */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4 relative items-stretch">
              {[
                {
                  step: "01",
                  title: "Register on Unstop",
                  desc: "First, participants must register their team with all members on the official Unstop portal.",
                  isFinal: false,
                },
                {
                  step: "02",
                  title: "Download Template",
                  desc: "Visit this Hardware Track page to download the official screening PPT template.",
                  isFinal: false,
                },
                {
                  step: "03",
                  title: "Build PPT",
                  desc: "Complete your presentation slides adhering to all evaluation criteria and block diagrams.",
                  isFinal: false,
                },
                {
                  step: "04",
                  title: "Submit in Unstop",
                  desc: "Upload your completed presentation deck directly on Unstop under your registered team.",
                  isFinal: false,
                },
                {
                  step: "05",
                  title: "36-Hr Hackathon",
                  desc: "Shortlisted teams receive an official confirmation mail for the in-person 36-hour hackathon at SRM IST Trichy during Yuva Megathon!",
                  isFinal: true,
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + idx * 0.08, ease: "easeOut" }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`relative flex flex-col justify-between p-4 sm:p-4.5 rounded-2xl ${
                    item.isFinal
                      ? "bg-primary-foreground/10 border-2 border-primary-foreground/25"
                      : "bg-primary-foreground/5 border border-primary-foreground/10 hover:border-primary-foreground/20"
                  } transition-colors`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                          item.isFinal
                            ? "bg-primary-foreground text-primary"
                            : "bg-primary-foreground/15 text-primary-foreground"
                        }`}
                      >
                        {item.step}
                      </span>
                      {item.isFinal ? (
                        <span className="text-[10px] font-mono tracking-wider uppercase text-primary-foreground/60">
                          Final
                        </span>
                      ) : (
                        <span className="text-primary-foreground/30 text-xs hidden md:block">→</span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-primary-foreground leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-primary-foreground/70 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </ExpandableScreenContent>
    </ExpandableScreen>
  )
}

