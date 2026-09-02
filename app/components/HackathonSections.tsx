"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";

/* ─── Shared animation variants ──────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.1 },
  }),
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
};

/* ─── Section label pill ─────────────────────────────────────────────────────── */
function SectionTag({ children, color = "purple" }: { children: React.ReactNode; color?: "purple" | "green" | "gold" }) {
  const colors: Record<string, string> = {
    purple: "rgba(124,58,237,0.18)",
    green:  "rgba(118,185,0,0.14)",
    gold:   "rgba(245,158,11,0.14)",
  };
  const borders: Record<string, string> = {
    purple: "rgba(124,58,237,0.35)",
    green:  "rgba(118,185,0,0.3)",
    gold:   "rgba(245,158,11,0.3)",
  };
  const texts: Record<string, string> = {
    purple: "#a78bfa",
    green:  "#86cc14",
    gold:   "#fbbf24",
  };
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full label-tag"
      style={{
        background: colors[color],
        border: `1px solid ${borders[color]}`,
        color: texts[color],
      }}
    >
      {children}
    </span>
  );
}

/* ─── Glow blob ──────────────────────────────────────────────────────────────── */
function GlowBlob({ color, size = 600, x = "50%", y = "50%", opacity = 0.12 }: {
  color: string; size?: number; x?: string; y?: string; opacity?: number;
}) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: "blur(1px)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════════════════════════════════ */
export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Atmospheric glow blobs */}
      <GlowBlob color="rgba(124,58,237,0.4)"  size={700} x="20%"  y="30%"  opacity={0.18} />
      <GlowBlob color="rgba(118,185,0,0.3)"   size={500} x="80%"  y="60%"  opacity={0.12} />
      <GlowBlob color="rgba(124,58,237,0.3)"  size={400} x="70%"  y="20%"  opacity={0.10} />

      {/* Fine grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* IEEE badge top-left */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-24 left-6 md:left-12"
      >
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full glass"
          style={{ border: "1px solid rgba(118,185,0,0.2)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="label-tag" style={{ color: "#86cc14", fontSize: "0.6rem" }}>
            IEEE SB · SRM IST Trichy
          </span>
        </div>
      </motion.div>

      {/* Main content — parallax wrapper */}
      <motion.div
        style={{ y: springY, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
      >
        {/* Italic opening quote */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-10 max-w-2xl italic leading-relaxed"
          style={{
            fontSize: "clamp(0.8rem, 1.6vw, 1.05rem)",
            color: "rgba(255,255,255,0.38)",
            fontStyle: "italic",
            fontWeight: 300,
          }}
        >
          "Hardware is built to run software, and software is developed to empower hardware.
          True innovation happens where they intersect."
        </motion.p>

        {/* Event badge */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="mb-6">
          <SectionTag color="purple">Hardware Track 2026</SectionTag>
        </motion.div>

        {/* YUVA MEGATHON — massive display type */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="display-xl glow-purple mb-4 select-none"
          style={{
            fontSize: "clamp(3.5rem, 12vw, 10rem)",
            color: "rgba(255,255,255,0.95)",
          }}
        >
          YUVA
          <br />
          <span style={{ color: "#a78bfa" }}>MEGA</span>THON
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mb-12 tracking-widest uppercase"
          style={{
            fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.3em",
          }}
        >
          Hardware Track &nbsp;·&nbsp; Hosted by IEEE SB of SRM IST Trichy
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="flex flex-col items-center gap-4"
        >
          <a
            href="#canvas-section"
            className="flex flex-col items-center gap-3 group cursor-pointer"
          >
            <span
              className="label-tag group-hover:opacity-80 transition-opacity"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Explore the Track
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 1,
                height: 48,
                background: "linear-gradient(to bottom, rgba(124,58,237,0.8), transparent)",
              }}
            />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ABOUT SECTION
═══════════════════════════════════════════════════════════════════════════════ */
export function AboutSection() {
  const stats = [
    { value: "48h",   label: "Non-stop Build" },
    { value: "500+",  label: "Participants" },
    { value: "3",     label: "Hardware Tracks" },
    { value: "Top 3", label: "Win Hardware Kits" },
  ];

  return (
    <section
      id="about"
      className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div className="section-divider mb-24" />
      <GlowBlob color="rgba(124,58,237,0.5)" size={600} x="90%" y="30%" opacity={0.10} />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <SectionTag color="purple">About The Event</SectionTag>
            </motion.div>

            <motion.h2
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} custom={1}
              className="heading-lg mt-6 mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "rgba(255,255,255,0.92)" }}
            >
              The most intensive hardware hackathon in South India.
            </motion.h2>

            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} custom={2}
              style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8, fontSize: "0.95rem" }}
              className="mb-6"
            >
              YUVA Megathon Hardware Track is not a simulation. You will solder circuits,
              flash microcontrollers, debug sensors at 3 AM, and emerge with something
              that actually works in the physical world.
            </motion.p>

            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} custom={3}
              style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.8, fontSize: "0.9rem" }}
            >
              IEEE SB of SRM IST Trichy brings together the sharpest engineering minds
              to prototype, iterate, and present transformative hardware solutions —
              powered by platforms like NVIDIA Jetson, Arduino, Raspberry Pi, and more.
            </motion.p>
          </div>

          {/* Right — stat grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={scaleUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i}
                className="glass rounded-2xl p-6 flex flex-col border-glow-purple"
                style={{ borderColor: "rgba(124,58,237,0.12)" }}
              >
                <span
                  className="display-xl glow-purple mb-2"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#a78bfa" }}
                >
                  {s.value}
                </span>
                <span className="label-tag" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   TRACKS SECTION  (Bento-grid glassmorphism)
═══════════════════════════════════════════════════════════════════════════════ */
const TRACKS = [
  {
    id: "iot",
    tag: "Track 01",
    title: "Internet of Things & Smart Cities",
    desc: "Design sensor networks, smart infrastructure, and connected systems that make cities more efficient, safe, and sustainable.",
    icon: "⚡",
    color: "#76b900",
    colSpan: "md:col-span-2",
    accent: "rgba(118,185,0,0.08)",
    border: "rgba(118,185,0,0.15)",
    glow: "rgba(118,185,0,0.3)",
    bullets: ["Environmental Monitoring", "Smart Grids", "Connected Devices", "Edge Sensors"],
  },
  {
    id: "robotics",
    tag: "Track 02",
    title: "Robotics & Automation",
    desc: "Build autonomous systems that navigate, manipulate, and interact with the physical world.",
    icon: "🤖",
    color: "#7c3aed",
    colSpan: "md:col-span-1",
    accent: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.2)",
    glow: "rgba(124,58,237,0.35)",
    bullets: ["Autonomous Navigation", "Servo Control", "Computer Vision", "SLAM"],
  },
  {
    id: "edge",
    tag: "Track 03",
    title: "Edge Computing & AI",
    desc: "Run inference at the edge. Deploy neural networks on embedded hardware for real-time intelligence without the cloud.",
    icon: "🧠",
    color: "#f59e0b",
    colSpan: "md:col-span-1",
    accent: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.18)",
    glow: "rgba(245,158,11,0.35)",
    bullets: ["TensorFlow Lite", "NVIDIA Jetson", "OpenCV", "ONNX Runtime"],
  },
];

export function TracksSection() {
  return (
    <section
      id="tracks"
      className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div className="section-divider mb-24" />
      <GlowBlob color="rgba(124,58,237,0.45)" size={700} x="10%" y="60%" opacity={0.09} />
      <GlowBlob color="rgba(245,158,11,0.4)"  size={500} x="85%" y="80%" opacity={0.08} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} className="mb-4"
        >
          <SectionTag color="green">Competition Tracks</SectionTag>
        </motion.div>
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} custom={1}
          className="heading-lg mb-16"
          style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "rgba(255,255,255,0.92)" }}
        >
          Choose your domain.<br />Own the stage.
        </motion.h2>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TRACKS.map((track, i) => (
            <motion.div
              key={track.id}
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-60px" }} custom={i}
              className={`relative rounded-3xl p-8 overflow-hidden group cursor-default ${track.colSpan}`}
              style={{
                background: track.accent,
                border: `1px solid ${track.border}`,
                transition: "box-shadow 0.3s ease",
              }}
              whileHover={{
                boxShadow: `0 0 48px ${track.glow}`,
                scale: 1.01,
                transition: { duration: 0.25 },
              }}
            >
              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 60% 60% at 50% 100%, ${track.accent} 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div className="text-4xl mb-5">{track.icon}</div>

                <div className="mb-3">
                  <span className="label-tag" style={{ color: track.color }}>{track.tag}</span>
                </div>

                <h3
                  className="heading-lg mb-4"
                  style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", color: "rgba(255,255,255,0.9)" }}
                >
                  {track.title}
                </h3>

                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.875rem", lineHeight: 1.7 }} className="mb-6">
                  {track.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {track.bullets.map((b) => (
                    <span
                      key={b}
                      className="text-[10px] px-2.5 py-1 rounded-full"
                      style={{
                        background: `${track.color}18`,
                        border: `1px solid ${track.color}30`,
                        color: track.color,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PRIZES SECTION
═══════════════════════════════════════════════════════════════════════════════ */
export function PrizesSection() {
  const prizes = [
    { rank: "1st Place", amount: "₹50,000", icon: "🥇", perks: ["NVIDIA Jetson Kit", "Cloud Credits", "Internship Fast-track"] },
    { rank: "2nd Place", amount: "₹25,000", icon: "🥈", perks: ["Raspberry Pi Kit", "IEEE Membership", "Mentorship Access"] },
    { rank: "3rd Place", amount: "₹10,000", icon: "🥉", perks: ["Arduino Mega Kit", "Swag Pack", "Certificate of Excellence"] },
  ];

  return (
    <section
      id="prizes"
      className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div className="section-divider mb-24" />
      <GlowBlob color="rgba(245,158,11,0.5)" size={700} x="50%" y="40%" opacity={0.10} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} className="mb-4 text-center"
        >
          <SectionTag color="gold">Prizes & Perks</SectionTag>
        </motion.div>
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} custom={1}
          className="heading-lg mb-4 text-center"
          style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "rgba(255,255,255,0.92)" }}
        >
          Build great. Win greater.
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} custom={2}
          className="text-center mb-16"
          style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.875rem" }}
        >
          Total prize pool of <span style={{ color: "#fbbf24" }}>₹85,000+</span> in cash & hardware kits awarded to finalists.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prizes.map((p, i) => (
            <motion.div
              key={p.rank}
              variants={scaleUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} custom={i}
              className={`relative rounded-3xl p-8 text-center overflow-hidden ${i === 0 ? "glass-purple border-glow-purple" : "glass"}`}
              style={{
                border: i === 0 ? "1px solid rgba(124,58,237,0.3)" : "1px solid rgba(255,255,255,0.06)",
              }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              {i === 0 && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 70%)",
                  }}
                />
              )}

              <div className="relative z-10">
                <div className="text-5xl mb-4">{p.icon}</div>
                <div className="label-tag mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>{p.rank}</div>
                <div
                  className="display-xl glow-gold mb-6"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: "#fbbf24" }}
                >
                  {p.amount}
                </div>

                <div className="flex flex-col gap-2">
                  {p.perks.map((perk) => (
                    <div
                      key={perk}
                      className="flex items-center justify-center gap-2 text-xs"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      <div className="w-1 h-1 rounded-full" style={{ background: "#fbbf24" }} />
                      {perk}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hardware kits callout */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} custom={3}
          className="mt-12 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: "rgba(118,185,0,0.05)",
            border: "1px solid rgba(118,185,0,0.15)",
          }}
        >
          <div>
            <p className="label-tag mb-1" style={{ color: "#86cc14" }}>Bonus for All Finalists</p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: "1rem" }}>
              Hardware kits provided to all top-10 finalist teams.
            </p>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginTop: 4 }}>
              Components include sensors, MCUs, and development boards.
            </p>
          </div>
          <div className="text-4xl flex-shrink-0">🛠️</div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   JURY SECTION
═══════════════════════════════════════════════════════════════════════════════ */
const JURY = [
  { name: "Dr. Aravind Kumar", role: "Prof. of ECE, SRM IST Trichy", expertise: "Embedded Systems & IoT", initials: "AK", accent: "#7c3aed" },
  { name: "Ms. Priya Nataraj",  role: "Senior Engineer, Qualcomm",   expertise: "Edge AI & SoC Design",    initials: "PN", accent: "#76b900" },
  { name: "Mr. Rohit Mehta",    role: "Co-founder, TechLabs India",  expertise: "Robotics & Automation",   initials: "RM", accent: "#f59e0b" },
  { name: "Dr. Suresh Iyer",    role: "IEEE Senior Member",          expertise: "Signal Processing & RF",  initials: "SI", accent: "#a78bfa" },
];

export function JurySection() {
  return (
    <section
      id="jury"
      className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div className="section-divider mb-24" />
      <GlowBlob color="rgba(124,58,237,0.45)" size={600} x="50%" y="50%" opacity={0.08} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} className="mb-4"
        >
          <SectionTag color="purple">The Juries</SectionTag>
        </motion.div>
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} custom={1}
          className="heading-lg mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "rgba(255,255,255,0.92)" }}
        >
          Evaluated by industry<br />& academia&apos;s finest.
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} custom={2}
          className="mb-14"
          style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.875rem", maxWidth: 480 }}
        >
          Our jury panel brings decades of expertise spanning embedded systems, robotics,
          and intelligent edge computing.
        </motion.p>

        {/* Jury cards — horizontal scroll on mobile, grid on desktop */}
        <div className="jury-scroll md:grid md:grid-cols-4 md:gap-5">
          {JURY.map((j, i) => (
            <motion.div
              key={j.name}
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} custom={i}
              className="glass rounded-2xl p-6 flex flex-col gap-4 w-64 md:w-auto"
              style={{ border: `1px solid rgba(255,255,255,0.07)` }}
              whileHover={{
                borderColor: j.accent + "55",
                boxShadow: `0 0 28px ${j.accent}22`,
                transition: { duration: 0.2 },
              }}
            >
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg"
                style={{
                  background: `${j.accent}20`,
                  border: `1px solid ${j.accent}40`,
                  color: j.accent,
                  fontFamily: "var(--font-primary)",
                }}
              >
                {j.initials}
              </div>

              <div>
                <h4
                  style={{ color: "rgba(255,255,255,0.88)", fontWeight: 600, fontSize: "0.95rem", marginBottom: 2 }}
                >
                  {j.name}
                </h4>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", marginBottom: 8 }}>{j.role}</p>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    background: `${j.accent}15`,
                    border: `1px solid ${j.accent}30`,
                    color: j.accent,
                    letterSpacing: "0.04em",
                  }}
                >
                  {j.expertise}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   FINAL CTA SECTION
═══════════════════════════════════════════════════════════════════════════════ */
export function CTASection() {
  return (
    <section
      id="register"
      className="relative py-40 px-6 overflow-hidden flex flex-col items-center justify-center text-center"
      style={{ background: "#050505" }}
    >
      <div className="section-divider mb-0" />

      {/* Dramatic centred glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 80%, rgba(124,58,237,0.18) 0%, transparent 70%)",
        }}
      />
      <GlowBlob color="rgba(124,58,237,0.6)" size={800} x="50%" y="70%" opacity={0.14} />
      <GlowBlob color="rgba(255,107,53,0.4)"  size={400} x="30%" y="60%" opacity={0.08} />
      <GlowBlob color="rgba(245,158,11,0.4)"  size={400} x="70%" y="55%" opacity={0.08} />

      {/* Fine grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} className="mb-6"
        >
          <SectionTag color="gold">Registration Open</SectionTag>
        </motion.div>

        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} custom={1}
          className="display-xl glow-purple mb-6"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", color: "rgba(255,255,255,0.93)" }}
        >
          Your circuit<br />starts here.
        </motion.h2>

        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} custom={2}
          className="mb-12"
          style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)", lineHeight: 1.75 }}
        >
          Form your team, choose your track, and register on Unstop to secure your spot
          at YUVA Megathon — the most electrifying hardware hackathon in South India.
        </motion.p>

        {/* Register button — Unstop brand shimmer */}
        <motion.div
          variants={scaleUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} custom={3}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="https://unstop.com"
            target="_blank"
            rel="noopener noreferrer"
            className="unstop-btn inline-flex items-center gap-3 px-10 py-4 rounded-full text-white text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
              <path d="M6 9h6M9 6l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Register on Unstop
          </motion.a>

          <a
            href="#about"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm transition-all duration-300 hover:bg-white/5"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Learn More
          </a>
        </motion.div>

        {/* Fine print */}
        <motion.p
          variants={fadeIn} initial="hidden" whileInView="visible"
          viewport={{ once: true }} custom={4}
          className="mt-10 label-tag"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          Team size: 2–4 members &nbsp;·&nbsp; Open to all college students &nbsp;·&nbsp; Free entry
        </motion.p>
      </div>

      {/* Footer */}
      <motion.div
        variants={fadeIn} initial="hidden" whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 mt-24 pt-8 w-full max-w-6xl border-t flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
            style={{ background: "#7c3aed", color: "white" }}
          >
            YM
          </div>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>
            © 2026 YUVA Megathon · IEEE SB, SRM IST Trichy. All rights reserved.
          </span>
        </div>
        <div className="flex gap-6">
          {["About IEEE", "Code of Conduct", "Contact Us"].map((link) => (
            <a
              key={link}
              href="#"
              className="transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
            >
              {link}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
