"use client";

import React from "react";
import { motion } from "motion/react";
import {
  firstColumn as defaultFirstColumn,
  secondColumn as defaultSecondColumn,
  thirdColumn as defaultThirdColumn,
  type Skill,
} from "@/data/skills";

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
                  className="group relative p-6 sm:p-7 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 shadow-lg shadow-neutral-900/5 hover:shadow-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 max-w-xs w-full flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Icon & Level Badge */}
                    <div className="flex items-center justify-between mb-4">
                      {icon ? (
                        <div className="h-10 w-10 rounded-2xl bg-neutral-100 dark:bg-neutral-800 p-2 flex items-center justify-center border border-neutral-200/60 dark:border-neutral-700/60 group-hover:scale-110 transition-transform">
                          <img
                            src={icon}
                            alt={name}
                            className="h-6 w-6 object-contain"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-2xl bg-neutral-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                          {name.slice(0, 2).toUpperCase()}
                        </div>
                      )}

                      {level && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-700/60">
                          {level}
                        </span>
                      )}
                    </div>

                    {/* Skill Name */}
                    <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {name}
                    </h3>

                    {/* Category */}
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-0.5 block">
                      {category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-4 leading-relaxed">
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
  badge = "Skills",
  title = "Technologies I Work With",
  subtitle = "Tools and technologies I use to build modern web applications",
  column1 = defaultFirstColumn,
  column2 = defaultSecondColumn,
  column3 = defaultThirdColumn,
  className = "",
}: SkillsSectionProps) => {
  return (
    <section id="skills" className={`my-20 relative overflow-hidden ${className}`}>
      <div className="container z-10 mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center"
        >
          <div className="flex justify-center">
            <div className="border border-neutral-300 dark:border-neutral-700 py-1 px-4 rounded-lg text-xs font-mono tracking-wider uppercase text-neutral-700 dark:text-neutral-300 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xs">
              {badge}
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mt-5 text-neutral-900 dark:text-white">
            {title}
          </h2>
          <p className="text-center mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </p>
        </motion.div>

        {/* 3 Infinite Scrolling Columns with Mask Gradient */}
        <div className="flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[740px] overflow-hidden">
          <SkillsColumn skills={column1} duration={15} />
          <SkillsColumn skills={column2} className="hidden md:block" duration={19} />
          <SkillsColumn skills={column3} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
