import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Fira Code", "monospace"],
        heading: ["var(--font-space-grotesk)", "var(--font-geist-sans)", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 7s ease-in-out infinite",
        "float-reverse": "floatReverse 8s ease-in-out infinite",
        "glow-slow": "glow 3s ease-in-out infinite alternate",
        "spin-slow": "spin 25s linear infinite",
        "scanline": "scanline 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(12px) rotate(3deg)" },
        },
        glow: {
          "0%": { opacity: "0.3" },
          "100%": { opacity: "0.7" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
      boxShadow: {
        "glass-sm": "0 2px 8px 0 rgba(0, 0, 0, 0.3)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
        "glass-lg": "0 12px 48px 0 rgba(0, 0, 0, 0.5)",
        "glow-cyan": "0 0 25px -5px rgba(56, 189, 248, 0.25)",
        "glow-indigo": "0 0 25px -5px rgba(129, 140, 248, 0.25)",
        "glow-slate": "0 0 35px -5px rgba(148, 163, 184, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
