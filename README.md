# Yuva Megathon - Hardware Track (NVIDIA Jetson Orin Nano)

A high-performance, interactive landing page for **Yuva Megathon 2026 - Hardware Track**, hosted by **SRM IST Trichy** in collaboration with **IEEE SB**, **IET**, **ACM**, **STAR(T)ECH**, and **YUVA**.

Featuring an interactive 3D dither simulation, seamless scroll-driven Jetson Orin Nano cinematic hardware showcase, expandable initial screening round guidelines, and dynamic interactive energy beam footers.

---

## ⚡ Tech Stack & Highlights

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **Language**: TypeScript & React 19
- **Styling**: Tailwind CSS v4
- **Animations & Physics**: [Framer Motion](https://www.framer.com/motion/)
- **Graphics & Visual Effects**:
  - WebGL 2.0 / GLSL Real-Time Dither Shader with dynamic mouse interaction
  - Canvas 2D 60FPS scroll-synchronized lossless frame interpolation
  - Interactive LaserFlow energy beam footer
- **Hardware Asset**: Custom rendered 4K lossless Jetson Orin Nano sequence composited with zero background artifacting

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Srevarshan05/yuva-harware-track-web.git
cd yuva-harware-track-web
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── app/
│   ├── components/
│   │   ├── Dither.tsx              # WebGL Bayer matrix interactive background dither
│   │   ├── JetsonScrollCanvas.tsx  # 60FPS scroll-driven Jetson hardware showcase
│   │   ├── LaserFlow.tsx           # Interactive WebGL energy laser footer
│   │   └── PptScreeningSection.tsx # Expandable round 1 submission instructions
│   ├── layout.tsx                  # Root layout & Google Fonts configuration
│   ├── page.tsx                    # Main landing page composition
│   └── globals.css                 # Global Tailwind and styling tokens
├── public/
│   ├── jetson-frames/              # 30-frame lossless WebP Jetson sequence
│   └── logos/                      # Organization and institutional logos
```

---

## 📜 License & Copyright

© 2026 IEEE Student Branch · SRM IST Trichy. All Rights Reserved.
