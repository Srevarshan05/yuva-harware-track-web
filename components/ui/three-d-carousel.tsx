"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

export interface Judge {
  id: string
  name: string
  title: string
  org: string
  image: string
  bio: string
}

interface ThreeDPhotoCarouselProps {
  judges?: Judge[]
}

const DEFAULT_JUDGES: Judge[] = [
  {
    id: "j1",
    name: "Dr. Priya Krishnan",
    title: "Professor & Head of IoT Lab",
    org: "SRM IST Trichy",
    image: "/judges/judge-1.jpg",
    bio: "Dr. Priya Krishnan leads the IoT and Embedded Systems research division at SRM IST Trichy. With over 15 years in hardware innovation, she has mentored 200+ student projects and holds 8 patents in sensor fusion and edge AI.",
  },
  {
    id: "j2",
    name: "Mr. Arun Venkat",
    title: "Sr. Hardware Engineer",
    org: "NVIDIA India",
    image: "/judges/judge-2.jpg",
    bio: "Arun Venkat is a senior hardware engineer at NVIDIA India specializing in Jetson-based edge computing platforms. He contributes to embedded ML pipelines and leads the Jetson developer community in South India.",
  },
  {
    id: "j3",
    name: "Ms. Deepa Suresh",
    title: "Co-Founder & CTO",
    org: "BotForge Labs",
    image: "/judges/judge-3.jpg",
    bio: "Deepa Suresh co-founded BotForge Labs, a Trichy-based robotics startup, after completing her masters in Mechatronics from IIT Madras. She champions hardware entrepreneurship and is an active angel investor.",
  },
  {
    id: "j4",
    name: "Dr. Karthik Rajan",
    title: "Associate Professor, ECE",
    org: "NIT Trichy",
    image: "/judges/judge-4.jpg",
    bio: "Dr. Karthik Rajan's research spans VLSI design and mixed-signal circuits. He has published 40+ papers in IEEE journals and routinely judges national-level hardware competitions including Smart India Hackathon.",
  },
  {
    id: "j5",
    name: "Ms. Sowmya Balaji",
    title: "IEEE WIE Chair",
    org: "IEEE Madras Section",
    image: "/judges/judge-5.jpg",
    bio: "Sowmya Balaji serves as the Women in Engineering Chair for IEEE Madras Section. She is passionate about bridging the gender gap in hardware engineering and has built open-source toolchains used by 10,000+ engineers.",
  },
]

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function JudgeAvatar({ judge, index }: { judge: Judge; index: number }) {
  const initials = judge.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
  const colors = [
    "from-indigo-600 to-purple-700",
    "from-slate-700 to-slate-900",
    "from-violet-700 to-indigo-900",
    "from-zinc-700 to-zinc-900",
    "from-purple-700 to-pink-900",
  ]
  return (
    <div className={`w-full h-full bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center`}>
      <span className="text-4xl sm:text-5xl font-light text-white/80 tracking-widest select-none">{initials}</span>
    </div>
  )
}

const CARD_POSITIONS = [
  { x: 0,    y: 0,   z: 0,   rotateY: 0,   scale: 1,    opacity: 1,    zIndex: 5 },   // center
  { x: 240,  y: 20,  z: -120, rotateY: -28, scale: 0.82, opacity: 0.85, zIndex: 4 },  // right 1
  { x: 430,  y: 50,  z: -260, rotateY: -40, scale: 0.65, opacity: 0.55, zIndex: 3 },  // right 2
  { x: -430, y: 50,  z: -260, rotateY:  40, scale: 0.65, opacity: 0.55, zIndex: 3 },  // left 2
  { x: -240, y: 20,  z: -120, rotateY:  28, scale: 0.82, opacity: 0.85, zIndex: 4 },  // left 1
]

function getPositionForOffset(offset: number, total: number) {
  const normalised = ((offset % total) + total) % total
  const slots = [0, 1, 2, total - 2, total - 1]
  const posIdx = slots.indexOf(normalised)
  return posIdx === -1 ? null : CARD_POSITIONS[posIdx]
}

export default function ThreeDPhotoCarousel({ judges = DEFAULT_JUDGES }: ThreeDPhotoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selected, setSelected] = useState<Judge | null>(null)

  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + judges.length) % judges.length), [judges.length])
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % judges.length), [judges.length])

  // keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (selected) { if (e.key === "Escape") setSelected(null); return }
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [next, prev, selected])

  return (
    <div className="relative w-full select-none">
      {/* 3-D stage */}
      <div className="relative w-full h-[420px] sm:h-[480px] flex items-center justify-center" style={{ perspective: "1100px" }}>
        {judges.map((judge, idx) => {
          const offset = (idx - activeIndex + judges.length) % judges.length
          const pos = getPositionForOffset(offset, judges.length)
          if (!pos) return null

          const isCenter = offset === 0

          return (
            <motion.div
              key={judge.id}
              animate={{
                x: pos.x,
                y: pos.y,
                scale: pos.scale,
                opacity: pos.opacity,
                rotateY: pos.rotateY,
                zIndex: pos.zIndex,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="absolute cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              onClick={() => isCenter ? setSelected(judge) : setActiveIndex(idx)}
            >
              {/* Card */}
              <div
                className={`
                  w-52 sm:w-60 rounded-2xl overflow-hidden
                  border transition-all duration-300
                  ${isCenter
                    ? "border-white/25 shadow-[0_0_60px_rgba(255,255,255,0.08),0_20px_60px_rgba(0,0,0,0.6)]"
                    : "border-white/8 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                  }
                `}
              >
                {/* Photo */}
                <div className="w-full h-48 sm:h-56 overflow-hidden relative">
                  <JudgeAvatar judge={judge} index={idx} />
                  {isCenter && (
                    <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-white/70">Click to expand</span>
                    </div>
                  )}
                </div>

                {/* Name plate */}
                <div className="bg-[#111] px-4 py-3 border-t border-white/8">
                  <p className="text-sm font-medium text-white leading-snug tracking-[-0.01em] truncate">{judge.name}</p>
                  <p className="text-[11px] text-white/45 mt-0.5 font-mono truncate">{judge.org}</p>
                </div>
              </div>

              {/* Active ring */}
              {isCenter && (
                <motion.div
                  layoutId="judge-ring"
                  className="absolute -inset-1 rounded-[18px] border border-white/20 pointer-events-none"
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Arrow controls */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/35 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M15 18l-6-6 6-6" /></svg>
        </button>

        {/* Dot indicators */}
        <div className="flex gap-2 items-center">
          {judges.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-300 ${i === activeIndex ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/25 hover:bg-white/45"}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/35 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>

      {/* Expanded Judge Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/75 backdrop-blur-lg"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className="relative w-full max-w-lg rounded-2xl bg-[#111] border border-white/12 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all"
              >
                <XIcon />
              </button>

              {/* Photo strip */}
              <div className="w-full h-52 sm:h-64 relative overflow-hidden">
                <JudgeAvatar judge={selected} index={judges.findIndex(j => j.id === selected.id)} />
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="px-6 pb-8 pt-2">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-1">{selected.org}</p>
                <h3 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-white leading-tight mb-1">
                  {selected.name}
                </h3>
                <p className="text-sm text-white/50 mb-5 font-mono">{selected.title}</p>
                <p className="text-sm sm:text-base leading-[170%] text-white/75">{selected.bio}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
