"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Dither from "./components/Dither";
import { motion } from "framer-motion";
import JetsonScrollCanvas from "./components/JetsonScrollCanvas";
import PptScreeningSection from "./components/PptScreeningSection";
import ScoringBreakdown from "./components/ScoringBreakdown";
import { MacbookScrollDemo } from "./components/MacbookScrollDemo";
import PrizesSection from "./components/PrizesSection";
import JudgesCarouselSection from "./components/JudgesCarouselSection";
import { RegisterAndFaqSection } from "./components/RegisterAndFaqSection";
import DevTeamModal from "./components/DevTeamModal";

const PARTNER_LOGOS = [
  { name: "SRM IST", src: "/logos/srm logo.jpeg" },
  { name: "YUVA", src: "/logos/yuva-badge.png" },
  { name: "IEEE SB SRMIST", src: "/logos/ieee-srmist.jpg" },
  { name: "ACM", src: "/logos/acm.jpeg" },
  { name: "IET", src: "/logos/iet.jpeg" },
  { name: "STAR(T)ECH", src: "/logos/startech.jpeg" },
];

export default function Home() {
  const [isDevTeamOpen, setIsDevTeamOpen] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      if (
        typeof window !== "undefined" &&
        (window.location.hash === "#dev-team" ||
          window.location.hash === "#devs" ||
          window.location.hash === "#meet-the-dev-team")
      ) {
        setIsDevTeamOpen(true);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);
  return (
    <main className="relative w-full min-h-screen bg-black text-white">
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

      {/* ── Static Light-Theme White Logo Navbar Strip (Scrolls away with page) ── */}
      <header className="relative z-40 w-full bg-white shadow-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-around sm:justify-around gap-2 sm:gap-4 md:gap-6 flex-nowrap md:flex-wrap lg:flex-nowrap overflow-x-auto scrollbar-none">
          {PARTNER_LOGOS.map((logo) => (
            <motion.div
              key={logo.name}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0"
              title={logo.name}
            >
              <div className="relative h-7 sm:h-8 md:h-9 w-auto max-w-[110px] sm:max-w-[130px] flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-full w-auto object-contain max-h-7 sm:max-h-8 md:max-h-9 rounded-sm drop-shadow-sm group-hover:drop-shadow transition-all"
                />
              </div>
              <span className="hidden md:inline text-xs sm:text-sm font-bold tracking-wider text-neutral-800 uppercase font-sans whitespace-nowrap group-hover:text-neutral-950 transition-colors">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          PAGE 1: MAIN HERO SECTION (FULL SCREEN)
      ══════════════════════════════════════════════════════════════════════ */}
      {/* ══════════════════════════════════════════════════════════════════════
          PAGE 1: MAIN HERO SECTION (FULL SCREEN)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-30 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto min-h-[calc(100vh-60px)] py-12">
        {/* Large Central YUVA Logo with Ambient Glow and Interactive Hover Effect */}
        <div className="relative mb-0 flex items-center justify-center">
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
              width={280}
              height={280}
              priority
              className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain transition-all duration-300 drop-shadow-[0_0_45px_rgba(255,255,255,0.45)] hover:drop-shadow-[0_0_65px_rgba(255,255,255,0.75)] mx-auto"
            />
          </motion.div>
        </div>

        {/* Headline: MEGATHON 2026 */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10 mb-3 sm:mb-4 text-white uppercase select-none font-sans"
          style={{
            textShadow:
              "0 0 50px rgba(99,102,241,0.35), 0 0 100px rgba(99,102,241,0.18)",
          }}
        >
          MEGATHON 2026
        </motion.h1>

        {/* Organizer Tagline (Bolded & larger) */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14, ease: "easeOut" }}
          className="text-sm sm:text-base md:text-lg font-mono tracking-[0.26em] uppercase text-white/90 font-bold mb-3 sm:mb-4"
        >
          IEEE SB SRM IST TRICHY ORGANIZES
        </motion.p>

        {/* Sub-headline: Hardware Track (Initial Caps) */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-cyan-300 mb-6 font-sans select-none"
        >
          Hardware Track
        </motion.h2>

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

      {/* ═══════════════════════════════════════════════════════════════════════
          Wrapper — smooth blended dark translucent backdrop starting from
          the Jetson animation section all the way till the end of the page.
          Feathers seamlessly from the hero so there is no hard cutoff line,
          and lets the animated dither stay subtly visible throughout.
      ════════════════════════════════════════════════════════════════════════ */}
      <div
        className="relative z-20 w-full"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0) 0%, rgba(5,5,5,0.3) 150px, rgba(5,5,5,0.68) 350px, rgba(5,5,5,0.68) 100%)",
        }}
      >
        {/* ── Scroll-linked Jetson Animation (No Text) ───────────────────────── */}
        <JetsonScrollCanvas />

        {/* ══════════════════════════════════════════════════════════════════════
            PAGE 2: PPT SCREENING INSTRUCTIONS, SCORING & JUDGES
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          id="tracks-section"
          className="relative w-full flex flex-col items-center justify-center overflow-visible pointer-events-auto"
        >
          <PptScreeningSection />
          <ScoringBreakdown />
          <MacbookScrollDemo />
          <PrizesSection />
          <JudgesCarouselSection />
          <RegisterAndFaqSection />
        </section>

      {/* ── Rich Footer ──────────────────────────────────────────────────────── */}
      <footer
        className="relative w-full pt-16 pb-8 px-6 sm:px-10 lg:px-20"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/[0.06]">
            {/* Brand column */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-9 px-2 py-1 bg-white rounded-md flex items-center shadow-sm">
                  <img
                    src="/logos/srm logo.jpeg"
                    alt="SRM IST Tiruchirappalli"
                    className="h-7 w-auto object-contain"
                  />
                </div>
                <div className="h-9 w-9 p-1 bg-white rounded-md flex items-center justify-center shadow-sm">
                  <Image
                    src="/logos/ieee-srmist.jpg"
                    alt="IEEE SB SRM IST"
                    width={28}
                    height={28}
                    className="h-full w-full object-contain rounded"
                  />
                </div>
                <span className="text-white font-semibold text-sm tracking-tight">
                  SRM IST · IEEE SB Trichy
                </span>
              </div>
              <p className="text-white/45 text-xs leading-relaxed max-w-[240px]">
                Organizing Yuva Megathon — a flagship Hardware Hackathon empowering student innovators at SRM IST Tiruchirappalli.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3 mt-1">
                {[
                  { href: "https://instagram.com", label: "Instagram", d: "M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5Zm0 1.5h8.5c2.9 0 4.75 1.85 4.75 4.75v8.5c0 2.9-1.85 4.75-4.75 4.75h-8.5c-2.9 0-4.75-1.85-4.75-4.75v-8.5c0-2.9 1.85-4.75 4.75-4.75ZM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7Zm0 1.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm5.25-2.5a.875.875 0 1 0 0 1.75.875.875 0 0 0 0-1.75Z" },
                  { href: "https://twitter.com", label: "Twitter/X", d: "M4 4h4l2.5 3.5L13 4h4l-4.5 5.5L21 20h-4l-3-4.5L11 20H7l5-6.5L4 4Zm2.5 1.5 5.25 6.5-.75 1 5.25 6H15l-4.5-6L8 14l-3.5-4.5.75-1L7 13.5 5 5.5h1.5Z" },
                  { href: "https://linkedin.com", label: "LinkedIn", d: "M4.5 3A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3h-15Zm2 3.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM5 10h3v9H5v-9Zm5 0h2.75v1.25C13.25 10.5 14.25 10 15.5 10c2.5 0 3.5 1.5 3.5 4.25V19h-3v-4.5c0-1-.5-1.75-1.5-1.75s-1.5.75-1.5 1.75V19H11v-9Z" },
                  { href: "https://youtube.com", label: "YouTube", d: "M12 4.5C7.5 4.5 4 5.5 4 5.5A2.5 2.5 0 0 0 2 8v8a2.5 2.5 0 0 0 2 2.5s3.5 1 8 1 8-1 8-1A2.5 2.5 0 0 0 22 16V8a2.5 2.5 0 0 0-2-2.5s-3.5-1-8-1Zm-2 4 5.5 3.5L10 15.5V8.5Z" },
                ].map(({ href, label, d }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/12 flex items-center justify-center transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" opacity={0.6}>
                      <path d={d} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Explore column */}
            <div className="flex flex-col gap-3">
              <p className="text-white/60 text-xs font-mono uppercase tracking-[0.2em] mb-1">Explore</p>
              {[
                { label: "Home", href: "#" },
                { label: "Initial Screening", href: "#tracks-section" },
                { label: "Evaluation Criteria", href: "#tracks-section" },
                { label: "What's Next", href: "#tracks-section" },
                { label: "Prizes & Rewards", href: "#prizes-section" },
                { label: "Judges Panel", href: "#tracks-section" },
                { label: "FAQ", href: "#tracks-section" },
              ].map(({ label, href }) => (
                <a key={label} href={href} className="text-white/45 hover:text-white text-sm transition-colors">
                  {label}
                </a>
              ))}

              {/* Highlighted Meet the Dev Team Option (Quite Bigger) */}
              <button
                type="button"
                onClick={() => setIsDevTeamOpen(true)}
                className="group mt-3.5 inline-flex items-center justify-between gap-3.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-white/40 text-white text-sm sm:text-base font-semibold tracking-wide transition-all shadow-lg hover:shadow-white/5 hover:scale-[1.03] active:scale-95 text-left w-fit cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                  </span>
                  <span className="text-white/95 group-hover:text-white transition-colors font-medium">
                    Meet the Dev Team
                  </span>
                </span>
                <span className="text-white/50 group-hover:text-white text-sm font-mono group-hover:translate-x-1 transition-all">
                  →
                </span>
              </button>
            </div>

            {/* Organised By column */}
            <div className="flex flex-col gap-3">
              <p className="text-white/60 text-xs font-mono uppercase tracking-[0.2em] mb-1">Organised By</p>
              {[
                { label: "SRM IST Tiruchirappalli", href: "https://ist.srmtrichy.edu.in" },
                { label: "YUVA — Technology Club", href: "#" },
                { label: "IEEE SB SRM IST Trichy", href: "https://www.srmist.edu.in" },
                { label: "ACM Student Chapter", href: "#" },
                { label: "IET On Campus", href: "#" },
                { label: "STAR(T)ECH", href: "#" },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-white text-sm transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-white/25 tracking-widest uppercase">
              © 2026 IEEE SB · SRM IST Trichy — YUVA Megathon · Hardware Track
            </span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsDevTeamOpen(true)}
                className="text-[11px] font-mono text-white/40 hover:text-white tracking-wider uppercase underline underline-offset-4 decoration-white/20 hover:decoration-white/50 transition-colors cursor-pointer"
              >
                Meet the Dev Team
              </button>
              <span className="text-[11px] font-mono text-white/20 tracking-widest uppercase">
                All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>

      </div>{/* end solid dark bg wrapper */}

      {/* ── Meet the Dev Team Interactive Modal (Opens inside the website) ── */}
      <DevTeamModal
        isOpen={isDevTeamOpen}
        onClose={() => setIsDevTeamOpen(false)}
      />
    </main>
  );
}

