import { motion } from "framer-motion";

interface BrandLogoProps {
  variant?: "navbar" | "footer";
  showSubtitle?: boolean;
  className?: string;
}

export function BrandLogo({
  variant = "navbar",
  showSubtitle = true,
  className = "",
}: BrandLogoProps) {
  const isFooter = variant === "footer";

  return (
    <div className={`group flex items-center gap-3 select-none ${className}`}>
      {/* ── BESPOKE ARCHITECTURAL MONOGRAM EMBLEM ── */}
      <motion.div
        whileHover={{ scale: 1.06, rotate: 1 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative shrink-0"
      >
        {/* Soft Ambient Gold Glow on Hover */}
        <div className="absolute -inset-1 rounded-2xl bg-[#C6A77A]/25 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Vector SVG Emblem (Interlocking H • F Monogram) */}
        <svg
          width="42"
          height="42"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative drop-shadow-md"
        >
          <defs>
            {/* Metallic Champagne Gradient */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2E2" />
              <stop offset="35%" stopColor="#DEBE90" />
              <stop offset="70%" stopColor="#C6A77A" />
              <stop offset="100%" stopColor="#9C7745" />
            </linearGradient>

            {/* Deep Velvet Wine Gradient */}
            <linearGradient id="crestBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A1E29" />
              <stop offset="50%" stopColor="#36141D" />
              <stop offset="100%" stopColor="#210B11" />
            </linearGradient>

            {/* Inner Border Champagne Shimmer */}
            <linearGradient id="borderShimmer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EBD7C9" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#C6A77A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#9C7745" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* 1. Outer Squircle Base with Deep Wine Gradient */}
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="13"
            fill="url(#crestBg)"
            stroke="url(#borderShimmer)"
            strokeWidth="1.5"
          />

          {/* 2. Inner Fine Hairline Frame */}
          <rect
            x="5.5"
            y="5.5"
            width="37"
            height="37"
            rx="10"
            fill="none"
            stroke="#C6A77A"
            strokeWidth="0.6"
            strokeOpacity="0.35"
          />

          {/* 3. Interlocking HF Monogram Geometry */}
          {/* Stem 1: H Left Pillar */}
          <rect
            x="13.5"
            y="13.5"
            width="3.5"
            height="21"
            rx="1.75"
            fill="url(#goldGradient)"
          />

          {/* Stem 2: Shared Central Pillar (H Right + F Backbone) */}
          <rect
            x="22.5"
            y="13.5"
            width="3.5"
            height="21"
            rx="1.75"
            fill="url(#goldGradient)"
          />

          {/* Horizontal Bar: H Crossbar & F Middle Arm */}
          <rect
            x="13.5"
            y="22.5"
            width="17.5"
            height="3.2"
            rx="1.6"
            fill="url(#goldGradient)"
          />

          {/* Top Arm of F */}
          <path
            d="M 22.5 13.5 L 34.5 13.5 C 35.3 13.5 36 14.2 36 15 L 36 16.7 L 22.5 16.7 Z"
            fill="url(#goldGradient)"
          />

          {/* Code Accent Node: Digital Dot Vertex */}
          <circle
            cx="32.5"
            cy="24.1"
            r="1.4"
            fill="#FFF2E2"
            className="animate-pulse"
          />

          {/* Bottom Terminal Accent */}
          <rect
            x="22.5"
            y="31"
            width="3.5"
            height="3.5"
            rx="1"
            fill="#FFF2E2"
            fillOpacity="0.85"
          />
        </svg>
      </motion.div>

      {/* ── LOGO TYPOGRAPHY ── */}
      <div className="flex flex-col text-left">
        <span
          className={`font-editorial font-bold tracking-[0.02em] leading-tight transition-colors ${
            isFooter
              ? "text-lg sm:text-xl text-[#F5E9DF] group-hover:text-[#C6A77A]"
              : "text-base sm:text-lg text-[#401A22] group-hover:text-[#54283F]"
          }`}
        >
          Harmain Faisal
        </span>
        {showSubtitle && (
          <span className="font-mono text-[9px] sm:text-[9.5px] font-semibold tracking-[0.24em] uppercase text-[#C6A77A] mt-0.5">
            CREATIVE DEV
          </span>
        )}
      </div>
    </div>
  );
}

export default BrandLogo;
