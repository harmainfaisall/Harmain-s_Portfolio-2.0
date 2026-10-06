# Harmain Faisal — Premium Light Theme 3D Portfolio

A premium, modern, calm, and 3D interactive personal portfolio website for **Harmain Faisal**.

Built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **Three.js** (`@react-three/fiber` & `@react-three/drei`), and **Spline 3D** (`@splinetool/react-spline` & `@splinetool/runtime`).

---

## 🎨 Theme Specifications

- **Background Color**: `#EEEEEE` (soft off-white)
- **Primary Text & Headings**: Pure Black (`#000000`)
- **Secondary & Body Text**: Dark Gray (`#222222` / `#333333` / `#444444`)
- **Cards & Surfaces**: Pure White (`#FFFFFF`) with subtle borders (`border-neutral-200` / `rgba(0,0,0,0.08)`) and gentle elevation shadows
- **Accents**: Strictly soft black and neutral light grays (no blue, no indigo, no cyan)
- **3D Scene**: Sculpted carbon core with pure black and metallic gray orbital rings and monochromatic particle field
- **Interactive CLI Terminal**: Clean white shell with bold black prompt, dark gray responses, and retro scanline toggle
- **Smooth Inertial Scroll**: Powered by Lenis with `prefers-reduced-motion` support
- **Editorial Texture**: Subtle soft film grain overlay

---

## 🌀 Spline 3D Skill Integration

The **Spline 3D Integration Skill** has been installed to your Antigravity agent directories:
- `.agent/skills/spline-3d-integration/`
- `.agents/skills/spline-3d-integration/`
- Global: `~/.gemini/antigravity/skills/spline-3d-integration/`

### Active Hero Spline 3D Scene:
- **Scene URL**: `https://prod.spline.design/6yKpO6g8C74FAWBI/scene.splinecode`
- **Location**: [`Portfolio/src/components/HeroSection.tsx`](file:///c:/Practice%20Work/Digital%20Portfolio/Portfolio/src/components/HeroSection.tsx) via [`Portfolio/src/components/SplineScene.tsx`](file:///c:/Practice%20Work/Digital%20Portfolio/Portfolio/src/components/SplineScene.tsx)
- **Features**: Lazy loading, smooth fade-in, ErrorBoundary protection, and interaction cue badge.

```tsx
import { SplineScene } from "./components/SplineScene";

export function CustomSection() {
  return (
    <div className="w-full h-[500px]">
      <SplineScene
        scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
        onLoad={(splineApp) => console.log("Spline Scene loaded!", splineApp)}
      />
    </div>
  );
}
```

---

## 🚀 Quick Start

From the workspace root or inside the `Portfolio/` directory:

```bash
# Start development server (running at http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Key File Map

| Component / File | Purpose |
| :--- | :--- |
| [`Portfolio/src/App.tsx`](file:///c:/Practice%20Work/Digital%20Portfolio/Portfolio/src/App.tsx) | Master layout assembling all sections, boot loader, and Lenis scroll |
| [`Portfolio/src/components/HeroCanvas.tsx`](file:///c:/Practice%20Work/Digital%20Portfolio/Portfolio/src/components/HeroCanvas.tsx) | 3D Three.js canvas in monochrome luxury styling with mouse parallax |
| [`Portfolio/src/components/SplineScene.tsx`](file:///c:/Practice%20Work/Digital%20Portfolio/Portfolio/src/components/SplineScene.tsx) | Lazy-loaded Spline 3D component wrapper from the installed skill |
| [`Portfolio/src/components/TiltCard.tsx`](file:///c:/Practice%20Work/Digital%20Portfolio/Portfolio/src/components/TiltCard.tsx) | 3D perspective mouse tilt with dynamic neutral sheen reflection |
| [`Portfolio/src/components/TerminalSection.tsx`](file:///c:/Practice%20Work/Digital%20Portfolio/Portfolio/src/components/TerminalSection.tsx) | Clean white interactive CLI terminal with auto-typing and command parser |
| [`Portfolio/src/components/SkillsSection.tsx`](file:///c:/Practice%20Work/Digital%20Portfolio/Portfolio/src/components/SkillsSection.tsx) | Categorized skills cards with 3D hover and DevOps @ SMIT spotlight |
| [`Portfolio/src/components/ProjectsSection.tsx`](file:///c:/Practice%20Work/Digital%20Portfolio/Portfolio/src/components/ProjectsSection.tsx) | 6 modular project cards with tech tags and mockup previews (`PROJECTS_DATA`) |
| [`Portfolio/src/components/EducationSection.tsx`](file:///c:/Practice%20Work/Digital%20Portfolio/Portfolio/src/components/EducationSection.tsx) | Academic milestone timeline (SMIT, College, School) |
| [`Portfolio/src/components/ContactSection.tsx`](file:///c:/Practice%20Work/Digital%20Portfolio/Portfolio/src/components/ContactSection.tsx) | Form with validation, monochrome confetti, clipboard copy, and social links |
| [`Portfolio/src/components/LoadingScreen.tsx`](file:///c:/Practice%20Work/Digital%20Portfolio/Portfolio/src/components/LoadingScreen.tsx) | Clean boot sequence with progress bar and Skip button |
| [`Portfolio/src/index.css`](file:///c:/Practice%20Work/Digital%20Portfolio/Portfolio/src/index.css) | Clean light theme variables, Space Grotesk & Geist typography, light scrollbars |

---

## 👤 Core Identity
- **Name**: Harmain Faisal
- **Role**: Full-Stack Web Developer | Currently learning DevOps at SMIT
- **Email**: harmain.faisall19@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/harmain-faisall/
- **GitHub**: https://github.com/harmainfaisall
