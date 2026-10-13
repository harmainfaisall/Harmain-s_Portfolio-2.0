import { motion } from "framer-motion";
import { Sparkles, Terminal, Code2, Server, ArrowUpRight } from "lucide-react";
import { MagicText } from "./ui/magic-text";
import { SplineText3D } from "./ui/SplineText3D";

const ABOUT_PARAGRAPHS = [
  "I'm Harmain Faisal, a Full Stack Developer passionate about building modern, responsive, and user-friendly web applications.",
  "I enjoy turning ideas into functional digital experiences by combining creative frontend design with backend development. I focus on writing clean code, solving problems, and continuously improving my development skills through hands-on projects.",
  "Currently, I'm expanding my knowledge of backend technologies and exploring DevOps to better understand the complete software development and deployment process.",
  "I'm always eager to learn, take on new challenges, and build meaningful digital solutions that make a difference.",
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 md:py-36 bg-[#401A22] text-[#F5E9DF] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-[#54283F]/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-[#C6A77A]/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle tech grid pattern in warm champagne */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#54283F]/70 border border-[#C6A77A]/40 text-xs font-mono text-[#F5E9DF] shadow-2xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A77A]" />
            <span>GET TO KNOW ME</span>
          </div>

          <div className="block">
            <SplineText3D
              text="About Me"
              as="h2"
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-editorial font-normal tracking-tight text-[#F5E9DF]"
            />
          </div>

          <p className="mt-4 text-sm sm:text-base font-mono uppercase tracking-widest text-[#B78C8E]">
            Passionate Engineer • Problem Solver • Lifelong Learner
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive MagicText Paragraphs */}
          <div className="lg:col-span-8 space-y-10 sm:space-y-12">
            {ABOUT_PARAGRAPHS.map((paragraph, index) => (
              <div
                key={index}
                className="relative pl-0 sm:pl-6 sm:border-l-2 border-[#54283F] hover:border-[#C6A77A] transition-colors duration-300"
              >
                <MagicText
                  text={paragraph}
                  className="text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-[#B78C8E] font-sans"
                  activeColor="text-[#F5E9DF] font-medium drop-shadow-sm"
                  ghostOpacity={0.35}
                  offset={["start 92%", "start 40%"]}
                />
              </div>
            ))}

            {/* Quick Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#54283F] text-[#F5E9DF] font-sans font-bold text-xs uppercase tracking-wider hover:bg-[#B78C8E] hover:text-[#211817] transition-all shadow-md shadow-black/30 border border-[#C6A77A]/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore My Work</span>
                <ArrowUpRight className="w-4 h-4 text-[#C6A77A]" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-transparent text-[#F5E9DF] font-sans font-semibold text-xs uppercase tracking-wider border border-[#C6A77A]/50 hover:border-[#C6A77A] hover:bg-[#54283F]/50 transition-all shadow-2xs hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Let&apos;s Connect</span>
              </a>
            </div>
          </div>

          {/* Right Column: Profile Key Pillars Card (High-Contrast Editorial Card) */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-[#211817] border border-[#C6A77A]/35 p-6 sm:p-7 shadow-2xl relative overflow-hidden text-[#F5E9DF]"
            >
              {/* Corner Ambient Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C6A77A]/15 rounded-full blur-2xl pointer-events-none" />

              <h3 className="font-mono text-xs tracking-[0.25em] uppercase text-[#C6A77A] font-semibold mb-6 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#C6A77A]" />
                <span>CORE FOCUS & PILLARS</span>
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#2D1B1E] border border-[#54283F]/60 hover:border-[#C6A77A]/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#54283F]/50 flex items-center justify-center text-[#C6A77A]">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <span className="font-editorial font-bold text-base text-[#F5E9DF] tracking-wide">Full-Stack Development</span>
                  </div>
                  <p className="text-xs text-[#F5E9DF]/80 leading-relaxed font-sans">
                    React, Next.js, TypeScript, modern state architecture, and REST/GraphQL APIs.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#2D1B1E] border border-[#54283F]/60 hover:border-[#C6A77A]/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#54283F]/50 flex items-center justify-center text-[#C6A77A]">
                      <Server className="w-4 h-4" />
                    </div>
                    <span className="font-editorial font-bold text-base text-[#F5E9DF] tracking-wide">Cloud & DevOps Journey</span>
                  </div>
                  <p className="text-xs text-[#F5E9DF]/80 leading-relaxed font-sans">
                    Automated CI/CD pipelines, Docker containerization, and reliable server deployments at SMIT.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#2D1B1E] border border-[#54283F]/60 hover:border-[#C6A77A]/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#54283F]/50 flex items-center justify-center text-[#C6A77A]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="font-editorial font-bold text-base text-[#F5E9DF] tracking-wide">Interactive UX & 3D Depth</span>
                  </div>
                  <p className="text-xs text-[#F5E9DF]/80 leading-relaxed font-sans">
                    Creating tactile, responsive micro-interactions, smooth scrolling, and Spline 3D integrations.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#C6A77A]/20 flex items-center justify-between text-xs font-mono text-[#F5E9DF]/70">
                <span>STATUS: AVAILABLE</span>
                <span className="flex items-center gap-1.5 text-[#C6A77A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6A77A] animate-ping" />
                  <span>SMIT APPRENTICE</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;
