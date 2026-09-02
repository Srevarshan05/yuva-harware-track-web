"use client"

import { motion } from "framer-motion"

const CRITERIA = [
  { label: "Problem Understanding & Relevance", score: 15 },
  { label: "Solution Clarity & Novelty",        score: 25 },
  { label: "Technical Feasibility",             score: 25 },
  { label: "BOM Realism & Architecture",        score: 20 },
  { label: "Demo-ability",                      score: 10 },
  { label: "Presentation Quality",              score:  5 },
]

export default function ScoringBreakdown() {
  return (
    <section className="relative z-30 w-full px-6 sm:px-10 lg:px-20 py-24 sm:py-32 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-3 mb-14 sm:mb-20"
      >
        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/40">
          Judging · Score Breakdown
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[92%] tracking-[-0.03em] text-white">
          Evaluation Criteria
        </h2>
      </motion.div>

      <div className="flex flex-col">
        {CRITERIA.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-px w-full bg-white/10" />
            <div className="group flex items-center justify-between gap-6 py-6 sm:py-7 cursor-default select-none transition-all duration-300 hover:pl-2">
              <div className="flex items-center gap-5 sm:gap-8 min-w-0">
                <span className="flex-shrink-0 text-[11px] font-mono text-white/30 tracking-widest w-5 text-right">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl font-normal leading-snug tracking-[-0.02em] text-white/85 group-hover:text-white transition-colors duration-300">
                  {item.label}
                </span>
              </div>
              <span className="flex-shrink-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-none tracking-[-0.04em] text-white tabular-nums">
                {item.score}<span className="text-2xl sm:text-3xl text-white/40 ml-1">%</span>
              </span>
            </div>
          </motion.div>
        ))}
        <div className="h-px w-full bg-white/10" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="flex justify-end mt-6"
      >
        <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/30">
          Total · 100%
        </span>
      </motion.div>
    </section>
  )
}
