import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

/* ---------- Social Icons ---------- */
function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#211817] text-[#F5E9DF] overflow-hidden">
      {/* ── TOP WAVE DIVIDER: CONTACT (#401A22) TO FOOTER (#211817) ── */}
      <div className="w-full overflow-hidden leading-none pointer-events-none bg-[#401A22] -mt-px relative z-20">
        <svg
          viewBox="0 0 1440 95"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-14 sm:h-20 md:h-24 block text-[#211817]"
        >
          {/* Champagne hairline accent contour */}
          <path
            d="M0,50 C280,85 560,15 880,65 C1160,100 1340,35 1440,40"
            fill="none"
            stroke="#C6A77A"
            strokeWidth="1.5"
            strokeOpacity="0.45"
          />
          {/* Deep espresso dramatic flowing wave seamlessly entering footer */}
          <path
            d="M0,50 C280,85 560,15 880,65 C1160,100 1340,35 1440,40 L1440,95 L0,95 Z"
            fill="#211817"
          />
        </svg>
      </div>

      {/* Subtle Editorial Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C6A77A]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Giant Editorial Watermark Typography */}
      <div className="absolute inset-x-0 bottom-3 flex justify-center pointer-events-none select-none overflow-hidden opacity-[0.035]">
        <span className="font-editorial text-[13vw] font-normal leading-none tracking-wider text-[#F5E9DF] whitespace-nowrap">
          HARMAIN FAISAL
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-10 sm:pb-12 z-10">
        {/* Main 3-Column Luxury Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-[#C6A77A]/20">
          
          {/* Column 1: Editorial Identity (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Brand Logo & Monogram */}
              <BrandLogo variant="footer" />

              {/* Gen-Z Signature Editorial Quote */}
              <p className="font-handwriting text-xl sm:text-2xl text-[#B78C8E] pt-1">
                “less talk, more projects ♡”
              </p>

              {/* Supporting tagline */}
              <p className="text-xs sm:text-base text-[#F5E9DF]/70 max-w-sm leading-relaxed font-sans">
                Building refined digital experiences, interactive web applications, and thoughtful interfaces with extra personality.
              </p>
            </div>

            {/* Live Availability Pill */}
            <div className="pt-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#401A22] border border-[#C6A77A]/30 text-xs font-mono text-[#F5E9DF]/90 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Available for freelance & collaborations</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs tracking-[0.3em] uppercase text-[#C6A77A] font-bold mb-5 flex items-center gap-2">
              <span>EXPLORE</span>
              <span className="h-px w-6 bg-[#C6A77A]/30" />
            </h4>
            <ul className="space-y-3 font-mono text-xs">
              {[
                { label: "About Me", href: "#about" },
                { label: "Technologies & Skills", href: "#skills" },
                { label: "Selected Projects", href: "#projects" },
                { label: "Education Journey", href: "#education" },
                { label: "Get In Touch", href: "#contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-[#F5E9DF]/75 hover:text-[#C6A77A] transition-colors"
                  >
                    <span className="text-[#C6A77A]/40 group-hover:text-[#C6A77A] group-hover:translate-x-0.5 transition-all">
                      ›
                    </span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event("open-ai-chat"))}
                  className="group inline-flex items-center gap-1.5 text-[#C6A77A] hover:text-[#F5E9DF] transition-colors cursor-pointer"
                >
                  <span className="text-xs">›</span>
                  <span className="underline decoration-[#C6A77A]/40 decoration-wavy underline-offset-4">
                    Ask AI Assistant
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect & Actions (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-xs tracking-[0.3em] uppercase text-[#C6A77A] font-bold mb-5 flex items-center gap-2">
                <span>CONNECT</span>
                <span className="h-px w-6 bg-[#C6A77A]/30" />
              </h4>

              {/* Social Channels List */}
              <div className="space-y-2.5">
                <a
                  href="mailto:harmain.faisal19@gmail.com"
                  className="group flex items-center justify-between p-2.5 rounded-xl bg-[#401A22]/50 hover:bg-[#401A22] border border-[#C6A77A]/25 hover:border-[#C6A77A] transition-all text-xs"
                >
                  <div className="flex items-center gap-2.5 text-[#F5E9DF]/80 group-hover:text-[#F5E9DF] min-w-0">
                    <Mail className="w-4 h-4 text-[#C6A77A] shrink-0" />
                    <span className="font-mono truncate">harmain.faisal19@gmail.com</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C6A77A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-2" />
                </a>

                <a
                  href="https://www.linkedin.com/in/harmain-faisall/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-2.5 rounded-xl bg-[#401A22]/50 hover:bg-[#401A22] border border-[#C6A77A]/25 hover:border-[#C6A77A] transition-all text-xs"
                >
                  <div className="flex items-center gap-2.5 text-[#F5E9DF]/80 group-hover:text-[#F5E9DF]">
                    <LinkedinIcon className="w-4 h-4 text-[#C6A77A] shrink-0" />
                    <span className="font-mono">LinkedIn / harmain-faisall</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C6A77A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>

                <a
                  href="https://github.com/harmainfaisall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-2.5 rounded-xl bg-[#401A22]/50 hover:bg-[#401A22] border border-[#C6A77A]/25 hover:border-[#C6A77A] transition-all text-xs"
                >
                  <div className="flex items-center gap-2.5 text-[#F5E9DF]/80 group-hover:text-[#F5E9DF]">
                    <GithubIcon className="w-4 h-4 text-[#C6A77A] shrink-0" />
                    <span className="font-mono">GitHub / harmainfaisall</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C6A77A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              </div>
            </div>

            {/* Back to Top Magnetic Pill */}
            <div className="pt-6">
              <button
                type="button"
                onClick={scrollToTop}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#401A22] hover:bg-[#C6A77A] border border-[#C6A77A]/35 text-xs font-mono text-[#F5E9DF] hover:text-[#211817] shadow-sm transition-all cursor-pointer w-fit"
                aria-label="Back to top"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5 text-[#C6A77A] group-hover:text-[#211817] group-hover:-translate-y-0.5 transition-all" />
              </button>
            </div>
          </div>
        </div>

        {/* Refined Minimalist Bottom Editorial Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#F5E9DF]/50">
          <div className="flex items-center gap-2">
            <span>© 2026 HARMAIN FAISAL</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-2 text-[#C6A77A]/80 tracking-widest uppercase">
            <span>KARACHI, PAKISTAN</span>
            <span>•</span>
            <span>2026 EDITION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
