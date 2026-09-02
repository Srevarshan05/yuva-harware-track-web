# Yuva Megathon - Hardware Track (NVIDIA Jetson Orin Nano)

A high-performance, interactive landing page for **Yuva Megathon 2026 - Hardware Track**, hosted by **SRM IST Trichy** in collaboration with **IEEE SB**, **YUVA**, **STAR(T)ECH**, **IET**, and **ACM**.

Featuring real-time WebGL shader dither effects, 3D MacBook scroll choreography, expandable modal presentation pipelines, comprehensive evaluation criteria, technical jury showcase, Unstop registration flow, and an interactive FAQ accordion.

---

## 🚀 What's New in `v2` (Comprehensive Developer Changelog)

This branch (`v2`) introduces major visual, interactive, and structural enhancements across the entire landing page. Here is a breakdown of what has been built and modified:

### 1. Seamless Background Blending & Dither Continuity
- **Feathered Hero Transition**: Resolved the abrupt horizontal demarcation below the hero quote by introducing a 550px smooth linear gradient ramp (`rgba(5,5,5,0) 0% → rgba(5,5,5,0.3) 180px → rgba(5,5,5,0.82) 550px → rgba(5,5,5,0.82) 100%`).
- **Unified Atmospheric Backdrop**: All post-hero sections now sit on a cohesive, semi-transparent dark backdrop (`rgba(5,5,5,0.82)`), enabling the underlying interactive WebGL/canvas dither animation to faintly and consistently breathe through (~18% luminance) without compromising typography readability.
- **Hero State Preservation**: The hero section retains its full-bleed, high-contrast animated dither shader with the central radial vignette.

### 2. 3D MacBook Scroll Feature (`components/ui/macbook-scroll.tsx` & `MacbookScrollDemo.tsx`)
- **Aceternity 3D Lid Mechanics**: Integrated scroll-driven 3D lid rotation with perspective mapping, keycap highlights, and trackpad lighting.
- **High-Resolution Lossless Screen Content**: Placed `/mac-book-img.webp` (3584x2688 px, 4:3) into the display housing using calibrated translation offsets (`translate: [0.55, 1]`) and responsive scaling for both desktop and mobile viewports.
- **Section Heading**: Styled with clean editorial typography: *"Shortlisted Teams — What’s Next?"*.

### 3. Initial Screening Round & Flow Modal (`PptScreeningSection.tsx`)
- **Minimalist Editorial Header**: Clear guidelines on submission expectations (PPT Design, Quality, Problem Understanding, Technical Feasibility, Block Diagram).
- **Expandable Modal (`ExpandableScreen`)**: An interactive white pill trigger button (`View Instructions & Process →`) morphs into a full-screen layout containing:
  - Downloadable official presentation template (`/templates/yuva_megathon_ppt_template.pptx`).
  - Step-by-step participation pipeline flow chart.
- **Clean Background Integration**: Stripped heavy pitch-black radial blockers in favor of soft ambient indigo glow halos.

### 4. Evaluation Criteria Section (`ScoringBreakdown.tsx`)
- Reverted and perfected the original full-width ruled editorial table.
- Features 6 distinct grading vectors with numbered indices, labels, and large tabular percentage badges (15%, 25%, 25%, 20%, 10%, 5%).
- Reduced vertical margins to create an uninterrupted rhythm leading directly into the MacBook section.

### 5. Technical Jury Showcase (`JudgesCarouselSection.tsx`)
- Multi-card dynamic jury presentation highlighting profiles, industry designations, and quotes.

### 6. Official Registration & FAQ Accordion (`RegisterAndFaqSection.tsx`)
- **Unstop Registration CTA**:
  - Restyled to perfectly match the **"View Instructions & Process →"** trigger button: solid white background (`bg-white`), black typography (`text-black text-lg sm:text-xl font-normal`), high-elevation shadow (`shadow-2xl`), rightward hover arrow animation, and official Unstop logo.
  - Removed outdated labels and badges for a streamlined, focused call-to-action.
- **Interactive FAQ Accordion**:
  - Built using HeroUI/Gravity UI design patterns with smooth SVG expand/collapse chevron indicators.
  - Answers essential questions on eligibility, team size, hardware submission, and evaluation.

### 7. Rich Multi-Column Footer (`app/page.tsx`)
- Replaced the placeholder footer with a production-ready 3-column footer:
  - **Brand Column**: IEEE SB SRM IST Trichy avatar, mission statement, and social icon links (Instagram, X/Twitter, LinkedIn, YouTube).
  - **Explore Column**: Jump links to Home, Initial Screening, Criteria, Judges, and FAQ.
  - **Organised By Column**: Affiliated student bodies (IEEE SB, YUVA, STAR(T)ECH, IET, ACM).
  - **Bottom Bar**: Legal notices and copyright metadata.

### 8. Temporary Jetson Section Detachment
- `JetsonScrollCanvas` is temporarily commented out in `app/page.tsx` for performance tuning and staging, ready to be reintegrated seamlessly.

---

## ⚡ Tech Stack & Dependencies

- **Framework**: [Next.js 16.3.3 (Turbopack, App Router)](https://nextjs.org/)
- **Language**: TypeScript & React 19
- **Styling**: Tailwind CSS v4 (PostCSS)
- **Animation & 3D Math**: [Framer Motion](https://www.framer.com/motion/), `@tabler/icons-react`
- **Typography**: Space Grotesk, Cabinet Grotesk, JetBrains Mono
- **Build & Quality**: Zero build errors, strict type-checking passed (`npm run build`).

---

## 🚀 Getting Started

### 1. Clone & Switch to `v2`
```bash
git clone https://github.com/Srevarshan05/yuva-harware-track-web.git
cd yuva-harware-track-web
git checkout v2
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
├── app/
│   ├── components/
│   │   ├── Dither.tsx                 # WebGL Bayer matrix interactive background dither
│   │   ├── JudgesCarouselSection.tsx  # Technical jury panel showcase
│   │   ├── MacbookScrollDemo.tsx      # Aceternity 3D MacBook scroll wrapper
│   │   ├── PptScreeningSection.tsx    # Expandable round 1 instructions & template download
│   │   ├── RegisterAndFaqSection.tsx  # Unstop CTA button & interactive FAQ accordion
│   │   └── ScoringBreakdown.tsx       # Ruled 6-vector evaluation criteria table
│   ├── layout.tsx                     # Root HTML layout & font declarations
│   ├── page.tsx                       # Main page orchestration & rich footer
│   └── globals.css                    # Design tokens & typography definitions
├── components/
│   └── ui/
│       ├── expandable-screen.tsx      # Morphing fullscreen modal trigger
│       └── macbook-scroll.tsx         # 3D MacBook lid, keyboard & trackpad math
├── public/
│   ├── logos/                         # Partner & organization SVGs / PNGs
│   └── mac-book-img.webp              # 4:3 high-res lossless screen texture
```

---

## 📜 License & Ownership

© 2026 IEEE Student Branch · SRM IST Trichy — Yuva Megathon Hardware Track. All Rights Reserved.
