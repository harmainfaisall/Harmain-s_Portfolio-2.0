"use client";

import * as React from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagicTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  activeColor?: string;
  ghostOpacity?: number;
  offset?: [any, any];
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  activeColor?: string;
  ghostOpacity?: number;
}

const Word: React.FC<WordProps> = ({
  children,
  progress,
  range,
  className,
  activeColor,
  ghostOpacity = 0.2,
}) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className={cn("relative inline-block mr-[0.3em] my-[0.15em]", className)}>
      {/* Dim/Ghost word background before scrolling reveals it */}
      <span
        className="absolute inset-0 select-none pointer-events-none transition-opacity"
        style={{ opacity: ghostOpacity }}
      >
        {children}
      </span>
      {/* Scroll-revealed illuminated text on top */}
      <motion.span
        style={{ opacity }}
        className={cn(activeColor ? activeColor : "text-white")}
      >
        {children}
      </motion.span>
    </span>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({
  text,
  className,
  wordClassName,
  activeColor,
  ghostOpacity = 0.2,
  offset = ["start 0.9", "start 0.25"],
}) => {
  const container = useRef<HTMLParagraphElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: offset,
  });

  const words = text.split(" ").filter(Boolean);

  return (
    <p
      ref={container}
      className={cn(
        "flex flex-wrap items-baseline text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed tracking-normal select-none",
        className
      )}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[start, end]}
            className={wordClassName}
            activeColor={activeColor}
            ghostOpacity={ghostOpacity}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
};

export default MagicText;
