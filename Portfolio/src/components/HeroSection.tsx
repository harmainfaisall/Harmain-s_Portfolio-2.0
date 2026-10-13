import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, MessageSquare, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import harmainPortrait from "@/assets/harmain-portrait.png";

export function HeroSection() {
  // Subtle interactive mouse parallax for natural editorial depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  const portraitTranslateX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const portraitTranslateY = useTransform(springY, [-0.5, 0.5], [-6, 6]);
  const mastheadTranslateX = useTransform(springX, [-0.5, 0.5], [6, -6]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-[#F5E9DF] text-[#211817] overflow-x-clip selection:bg-[#54283F] selection:text-[#F5E9DF]"
    >
      {/* ───────────────────────────────────────────────────────────────────────
          1. EDITORIAL LUXURY BACKGROUND & SILK DRAPE LIGHTING
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Warm Studio Keylight Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 25%, #F5E9DF 0%, #F5E9DF 45%, #EFE1D5 85%, #E3D1C2 100%)",
          }}
        />

        {/* Soft Organic Silk Fabric Drapes (Warm Rose / Burgundy Soft Glow) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-45 mix-blend-multiply"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="silkGlow1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FAF1E9" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#EBD7C9" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#D9BFB1" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="silkGlow2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EAD8CA" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#F5ECE4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F5E9DF" stopOpacity="0" />
            </linearGradient>
            <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="40" />
            </filter>
          </defs>

          {/* Sweeping diagonal drape folds */}
          <path
            d="M-100,-50 C400,200 650,50 1100,320 C1300,450 1500,200 1600,-50 L1600,950 L-100,950 Z"
            fill="url(#silkGlow1)"
            filter="url(#softBlur)"
          />
          <path
            d="M300,-100 C600,300 900,180 1200,600 C1350,800 1550,500 1600,300 L1600,-100 Z"
            fill="url(#silkGlow2)"
            filter="url(#softBlur)"
          />
        </svg>

        {/* Tactile Fine Paper / Silk Grain Overlay */}
        <div className="absolute inset-0 bg-grain opacity-25 mix-blend-multiply" />

        {/* Subtle Ambient Vignette & Warmth */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#E8D3C4]/40 blur-[130px]" />
        <div className="absolute top-1/3 right-10 w-[650px] h-[650px] rounded-full bg-[#E8D3C4]/20 blur-[140px]" />
      </div>

      {/* ───────────────────────────────────────────────────────────────────────
          2. LUXURY EDITORIAL FRAME / PRINT BORDER MARGIN
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-2 sm:inset-4 lg:inset-6 border border-[#C6A77A]/25 pointer-events-none z-30" />

      {/* Editorial Corner Crosshairs / Regis Marks */}
      <div className="absolute top-2 sm:top-4 lg:top-6 left-2 sm:left-4 lg:left-6 w-3 h-3 border-t-2 border-l-2 border-[#C6A77A]/40 pointer-events-none z-30" />
      <div className="absolute top-2 sm:top-4 lg:top-6 right-2 sm:right-4 lg:right-6 w-3 h-3 border-t-2 border-r-2 border-[#C6A77A]/40 pointer-events-none z-30" />
      <div className="absolute bottom-2 sm:bottom-4 lg:bottom-6 left-2 sm:left-4 lg:left-6 w-3 h-3 border-b-2 border-l-2 border-[#C6A77A]/40 pointer-events-none z-30" />
      <div className="absolute bottom-2 sm:bottom-4 lg:bottom-6 right-2 sm:right-4 lg:right-6 w-3 h-3 border-b-2 border-r-2 border-[#C6A77A]/40 pointer-events-none z-30" />

      {/* ───────────────────────────────────────────────────────────────────────
          3. MAIN HERO MAGAZINE COVER CANVAS
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 pt-20 sm:pt-22 md:pt-24 pb-12 sm:pb-16 flex flex-col justify-between min-h-screen">
        {/* ── TOP EDITORIAL HEADER BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex items-center justify-between pb-4 sm:pb-6 border-b border-[#C6A77A]/25 text-[#54283F]"
        >
          {/* Top-Left: WEB DEVELOPER label */}
          <div className="flex items-center gap-2.5">
            <span className="font-sans text-[11px] sm:text-xs font-bold tracking-[0.28em] uppercase text-[#401A22]">
              WEB DEVELOPER
            </span>
            <span className="text-[#C6A77A] text-xs">/</span>
            <span className="hidden sm:inline font-mono text-[10px] tracking-[0.2em] text-[#B78C8E] uppercase">
              EDITION N° 01
            </span>
          </div>

          {/* Center Micro-text (Desktop only) */}
          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[#B78C8E]">
            <span>DIGITAL ARCHITECTURE</span>
            <span className="text-[#C6A77A]">•</span>
            <span>CREATIVE ENGINEERING</span>
          </div>

          {/* Top-Right: 2026 text */}
          <div className="flex items-center gap-2">
            <span className="text-[#C6A77A] text-xs">•</span>
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#401A22]">
              2026
            </span>
          </div>
        </motion.div>

        {/* ── CENTRAL MAGAZINE COMPOSITION ── */}
        <div className="relative w-full flex-1 flex flex-col justify-center my-4 sm:my-8 lg:my-6">
          {/* ── GIANT MASTHEAD: "PORTFOLIO" ── */}
          <div className="relative w-full">
            {/* Solid Deep Espresso Masthead (Layer 1 - behind portrait) */}
            <motion.div
              style={isClient ? { x: mastheadTranslateX } : undefined}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative z-10 select-none pt-2 sm:pt-4"
            >
              <h1
                className="font-editorial text-[15.5vw] sm:text-[14.5vw] md:text-[13.5vw] lg:text-[13vw] xl:text-[168px] 2xl:text-[188px] font-normal tracking-[-0.015em] sm:tracking-[0.01em] text-[#401A22] leading-[0.82] text-center w-full uppercase"
                style={{
                  fontFeatureSettings: '"salt" on, "swsh" on',
                  textRendering: "optimizeLegibility",
                }}
              >
                PORTFOLIO
              </h1>
            </motion.div>

            {/* Subtle Champagne Hairline Stroke Overlay (Layer 3 - over portrait for dark coat layering) */}
            <motion.div
              style={isClient ? { x: mastheadTranslateX } : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.3 }}
              className="w-full absolute inset-x-0 top-0 z-25 select-none pointer-events-none pt-2 sm:pt-4 hidden lg:block"
              aria-hidden="true"
            >
              <h1
                className="font-editorial text-[15.5vw] sm:text-[14.5vw] md:text-[13.5vw] lg:text-[13vw] xl:text-[168px] 2xl:text-[188px] font-normal tracking-[-0.015em] sm:tracking-[0.01em] leading-[0.82] text-center w-full uppercase"
                style={{
                  WebkitTextStroke: "1px rgba(198, 167, 122, 0.45)",
                  color: "transparent",
                  fontFeatureSettings: '"salt" on, "swsh" on',
                }}
              >
                PORTFOLIO
              </h1>
            </motion.div>
          </div>

          {/* ── EDITORIAL GRID: LEFT COPY & CENTER-RIGHT PORTRAIT ── */}
          <div className="relative w-full flex flex-col lg:grid lg:grid-cols-12 items-end pt-2 sm:pt-4">
            {/* ── LEFT COLUMN: STORY, NAME & METADATA ── */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 lg:order-1 lg:col-span-6 xl:col-span-5 relative z-25 flex flex-col justify-end text-left pt-8 lg:pt-0 pb-2 sm:pb-6"
            >
              {/* Supporting Editorial Heading */}
              <div className="space-y-1.5">
                <span className="text-[#C6A77A] font-sans font-bold text-xs sm:text-sm tracking-[0.32em] uppercase block">
                  CREATIVE
                </span>
                <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#401A22] uppercase leading-none">
                  WEB DEVELOPER
                </h3>
              </div>

              {/* Fine Champagne-Gold Editorial Hairline */}
              <div className="w-12 sm:w-14 h-[1.5px] bg-[#C6A77A] my-4 sm:my-5" />

              {/* Supporting Text */}
              <p className="text-sm sm:text-base text-[#54283F] leading-relaxed max-w-sm sm:max-w-md font-normal font-sans">
                Building digital things with a little extra personality.
              </p>

              {/* Gen-Z Cute Caption */}
              <div className="mt-3.5 inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#54283F]">
                <span className="font-editorial italic font-normal text-sm sm:text-base text-[#54283F] tracking-wide">
                  “less talk, more projects”
                </span>
                <span className="text-[#B78C8E] text-base font-serif select-none" aria-label="love">
                  ♡
                </span>
              </div>

              {/* Prominent Editorial Name Display */}
              <div className="mt-7 sm:mt-9 pt-6 sm:pt-7 border-t border-[#C6A77A]/30">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.32em] text-[#B78C8E] font-semibold block mb-1">
                  PORTFOLIO OF
                </span>
                <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] font-medium tracking-[0.03em] text-[#401A22] uppercase leading-[0.92]">
                  HARMAIN
                  <br />
                  <span className="text-[#211817] font-light">FAISAL</span>
                </h2>
              </div>

              {/* Small Label: DIGITAL CREATOR • 2026 */}
              <div className="mt-3.5 flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#54283F]">
                <span className="font-medium text-[#401A22]">DIGITAL CREATOR</span>
                <span className="text-[#C6A77A]">•</span>
                <span>2026</span>
              </div>

              {/* High-End Editorial Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-7 pt-2">
                <a
                  href="#projects"
                  className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F5E9DF] bg-[#401A22] hover:bg-[#54283F] border border-[#C6A77A]/40 shadow-md shadow-[#401A22]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Explore Works</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C6A77A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#401A22] bg-[#F5E9DF] hover:bg-[#EBDDCF] border border-[#C6A77A]/60 hover:border-[#C6A77A] shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C6A77A]" />
                  <span>Let&apos;s Talk</span>
                </a>

                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event("open-ai-chat"))}
                  className="inline-flex items-center gap-2 px-3.5 py-3 rounded-full text-xs font-medium tracking-wide text-[#54283F] hover:text-[#401A22] bg-[#EBDDCF]/70 hover:bg-[#E2D0BF] border border-[#C6A77A]/40 transition-colors cursor-pointer"
                  title="Chat with Harmain's AI Assistant"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#C6A77A]" />
                  <span className="hidden sm:inline">AI Assistant</span>
                </button>
              </div>

              {/* Social Micro-Links */}
              <div className="flex items-center gap-3 mt-6 text-[#54283F]">
                <a
                  href="https://github.com/harmainfaisall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-[#F5E9DF] border border-[#C6A77A]/40 text-[#401A22] hover:text-[#B78C8E] hover:border-[#C6A77A] transition-all shadow-2xs"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/harmain-faisall/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-[#F5E9DF] border border-[#C6A77A]/40 text-[#401A22] hover:text-[#B78C8E] hover:border-[#C6A77A] transition-all shadow-2xs"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="mailto:harmain.faisall19@gmail.com"
                  className="p-2.5 rounded-full bg-[#F5E9DF] border border-[#C6A77A]/40 text-[#401A22] hover:text-[#B78C8E] hover:border-[#C6A77A] transition-all shadow-2xs"
                  aria-label="Email Harmain"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* ── CENTER-RIGHT: HARMAIN'S EDITORIAL PORTRAIT ── */}
            <motion.div
              style={
                isClient
                  ? {
                      x: portraitTranslateX,
                      y: portraitTranslateY,
                    }
                  : undefined
              }
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="order-1 lg:order-2 lg:col-span-6 xl:col-span-7 relative z-20 flex justify-center lg:justify-end items-end pointer-events-none -mt-8 sm:-mt-12 lg:-mt-40 xl:-mt-56 2xl:-mt-64 w-full"
            >
              {/* Portrait Container with Editorial Cutout & Refined Drop Shadow */}
              <div className="relative max-w-full">
                <img
                  src={harmainPortrait}
                  alt="Harmain Faisal — Web Developer"
                  className="relative z-20 w-auto h-[540px] sm:h-[660px] md:h-[780px] lg:h-[920px] xl:h-[1020px] 2xl:h-[1120px] max-h-none lg:max-h-[96vh] object-contain select-none scale-105 sm:scale-105 lg:scale-[1.12] xl:scale-[1.16] origin-bottom transition-transform duration-500"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 86%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 86%, transparent 100%)",
                  }}
                  loading="eager"
                  fetchPriority="high"
                />

                {/* ── CIRCULAR SIGNATURE MONOGRAM STAMP ("H") ── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="absolute bottom-8 sm:bottom-12 -left-4 sm:-left-8 lg:-left-12 z-30 pointer-events-auto"
                >
                  <div
                    className="group relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center cursor-pointer select-none transition-transform hover:scale-105 active:scale-95"
                    title="Harmain Faisal Signature Monogram"
                  >
                    {/* Rotating Circular Text Ring */}
                    <div className="absolute inset-0 animate-[spin_24s_linear_infinite] group-hover:[animation-play-state:paused]">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path
                          id="monogramTextPath"
                          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                          fill="none"
                        />
                          <text className="text-[7.2px] uppercase font-mono tracking-[0.24em] fill-[#54283F] font-semibold">
                          <textPath href="#monogramTextPath" startOffset="0%">
                            • HARMAIN FAISAL • CREATIVE DEV • 2026
                          </textPath>
                        </text>
                      </svg>
                    </div>

                    {/* Inner Champagne Ring */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#C6A77A]/50 bg-[#F5E9DF]/90 backdrop-blur-xs shadow-sm flex flex-col items-center justify-center">
                      <span className="font-editorial text-xl sm:text-2xl font-normal text-[#401A22] leading-none">
                        H
                      </span>
                      <span className="text-[#C6A77A] text-[9px] leading-none mt-0.5">•</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── BOTTOM EDITORIAL FOOTER STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full pt-4 sm:pt-6 border-t border-[#C6A77A]/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#54283F]"
        >
          {/* Left Metadata */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A77A]" />
            <span>ISSUE 01 • FULL-STACK & DEVOPS</span>
          </div>

          {/* Center: Scroll down guide */}
          <a
            href="#about"
            className="group inline-flex items-center gap-2 font-sans font-medium text-[#401A22] hover:text-[#54283F] transition-colors"
          >
            <span className="tracking-[0.25em]">DISCOVER MORE</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#C6A77A] group-hover:translate-y-0.5 transition-transform animate-bounce" />
          </a>

          {/* Right Location */}
          <div className="hidden sm:flex items-center gap-2">
            <span>KARACHI, PK</span>
            <span className="text-[#C6A77A]">•</span>
            <span>WORLDWIDE</span>
          </div>
        </motion.div>
      </div>

    </section>
  );
}

export default HeroSection;
