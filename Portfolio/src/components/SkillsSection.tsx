import React from "react";
import { motion } from "motion/react";
import { SplineText3D } from "./ui/SplineText3D";
import {
  firstColumn as defaultFirstColumn,
  secondColumn as defaultSecondColumn,
  thirdColumn as defaultThirdColumn,
  type Skill,
} from "../data/skills";

/* ---------- Props ---------- */
export interface SkillsColumnProps {
  className?: string;
  skills: Skill[];
  duration?: number;
}

export interface SkillsSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  column1?: Skill[];
  column2?: Skill[];
  column3?: Skill[];
  className?: string;
}

/* ---------- Column Component ---------- */
export const SkillsColumn = ({
  className = "",
  skills,
  duration = 10,
}: SkillsColumnProps) => {
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {skills.map(({ name, category, description, icon, level }, i) => (
                <div
                  key={`${name}-${index}-${i}`}
                  className="group relative p-6 sm:p-7 rounded-3xl border border-[#C6A77A]/30 bg-[#401A22] text-[#F5E9DF] shadow-xl hover:shadow-2xl hover:border-[#C6A77A] hover:bg-[#54283F] transition-all duration-300 max-w-xs w-full flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Icon & Level Badge */}
                    <div className="flex items-center justify-between mb-4">
                      {icon ? (
                        <div className="h-10 w-10 rounded-2xl bg-[#211817] p-2 flex items-center justify-center border border-[#C6A77A]/30 group-hover:scale-110 transition-transform">
                          <img
                            src={icon}
                            alt={name}
                            className="h-6 w-6 object-contain"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-2xl bg-[#211817] text-[#C6A77A] font-mono text-xs flex items-center justify-center font-bold border border-[#C6A77A]/30">
                          {name.slice(0, 2).toUpperCase()}
                        </div>
                      )}

                      {level && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase bg-[#211817]/70 text-[#C6A77A] border border-[#C6A77A]/40">
                          {level}
                        </span>
                      )}
                    </div>

                    {/* Skill Name in Editorial Font */}
                    <h3 className="text-xl font-editorial font-normal tracking-wide text-white group-hover:text-[#C6A77A] transition-colors">
                      {name}
                    </h3>

                    {/* Category */}
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#C6A77A] mt-0.5 block">
                      {category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#F5E9DF]/80 mt-4 leading-relaxed font-sans">
                    {description}
                  </p>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

/* ---------- Main Skills Section ---------- */
export const SkillsSection = ({
  badge = "TECHNICAL ARSENAL",
  title = "Technologies I Work With",
  subtitle = "Tools and technologies I use to build modern, high-performance web applications",
  column1 = defaultFirstColumn,
  column2 = defaultSecondColumn,
  column3 = defaultThirdColumn,
  className = "",
}: SkillsSectionProps) => {
  return (
    <section id="skills" className={`relative overflow-hidden bg-[#F5E9DF] text-[#211817] ${className}`}>
      {/* ── TOP WAVE DIVIDER: ABOUT (#401A22) TO SKILLS (#F5E9DF) ── */}
      <div className="w-full overflow-hidden leading-none pointer-events-none bg-[#401A22] -mt-px relative z-20">
        <svg
          viewBox="0 0 1440 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-16 md:h-20 block text-[#F5E9DF]"
        >
          {/* Organic asymmetrical flowing wave into warm cream */}
          <path
            d="M0,45 C260,15 520,80 800,45 C1080,15 1300,65 1440,35 L1440,85 L0,85 Z"
            fill="#F5E9DF"
          />
          {/* Champagne hairline accent contour */}
          <path
            d="M0,45 C260,15 520,80 800,45 C1080,15 1300,65 1440,35"
            fill="none"
            stroke="#C6A77A"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
        </svg>
      </div>

      {/* Background Studio Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C6A77A]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="container z-10 mx-auto px-4 sm:px-6 relative pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[700px] mx-auto text-center"
        >
          <div className="flex justify-center">
            <div className="border border-[#C6A77A]/40 py-1 px-4 rounded-full text-xs font-mono tracking-widest uppercase text-[#401A22] bg-[#FFFFFF] shadow-2xs font-semibold">
              {badge}
            </div>
          </div>
          <SplineText3D
            text={title}
            as="h2"
            className="mt-5 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial font-normal tracking-tight text-[#401A22]"
          />
          <p className="text-center mt-4 text-sm sm:text-base text-[#54283F] max-w-xl font-normal font-sans">
            {subtitle}
          </p>
        </motion.div>

        {/* 3 Infinite Scrolling Columns with Cream Fade Mask Gradient */}
        <div className="flex justify-center gap-6 mt-14 [mask-image:linear-gradient(to_bottom,transparent,#F5E9DF_12%,#F5E9DF_88%,transparent)] max-h-[740px] overflow-hidden">
          <SkillsColumn skills={column1} duration={15} />
          <SkillsColumn skills={column2} className="hidden md:block" duration={19} />
          <SkillsColumn skills={column3} className="hidden lg:block" duration={17} />
        </div>
      </div>

      {/* ── BOTTOM WAVE DIVIDER: SKILLS (#F5E9DF) TO PROJECTS (#401A22) ── */}
      <div className="w-full overflow-hidden leading-none pointer-events-none -mb-px relative z-20">
        <svg
          viewBox="0 0 1440 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-16 md:h-20 block text-[#401A22]"
        >
          {/* Organic asymmetrical flowing wave into deep burgundy */}
          <path
            d="M0,40 C340,75 620,15 920,55 C1160,85 1340,30 1440,45 L1440,85 L0,85 Z"
            fill="#401A22"
          />
          {/* Champagne hairline accent contour */}
          <path
            d="M0,40 C340,75 620,15 920,55 C1160,85 1340,30 1440,45"
            fill="none"
            stroke="#C6A77A"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
        </svg>
      </div>
    </section>
  );
};

export default SkillsSection;
