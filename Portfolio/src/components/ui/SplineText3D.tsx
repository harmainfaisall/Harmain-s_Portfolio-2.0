import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TextSegment {
  text: string;
  className?: string;
}

export interface SplineText3DProps {
  /** Plain text string to animate */
  text?: string;
  /** Or multiple text segments with custom classes (e.g. colored or italic highlights) */
  segments?: TextSegment[];
  /** HTML tag to render (default: h2) */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  /** Container className */
  className?: string;
  /** Perspective depth in pixels (default: 1000) */
  perspective?: number;
  /** Spread/explosion intensity multiplier (default: 25) */
  spread?: number;
  /** Rotation intensity multiplier in degrees (default: 20) */
  rotation?: number;
}

export function SplineText3D({
  text,
  segments,
  as: Component = "h2",
  className,
  perspective = 1000,
  spread = 24,
  rotation = 20,
}: SplineText3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track scroll progress as the element enters and moves through the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 92%", "center 45%"],
  });

  // Smooth out scroll progression with spring physics for cinematic 3D motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Normalize input into unified segments
  const resolvedSegments: TextSegment[] = segments ?? (text ? [{ text }] : []);

  // Compute total characters across all segments to establish global center
  const totalLength = resolvedSegments.reduce((acc, seg) => acc + seg.text.length, 0);
  const globalCenter = Math.floor(totalLength / 2);

  let currentGlobalIndex = 0;

  return (
    <div
      ref={containerRef}
      className={cn("inline-block select-none", className)}
      style={{ perspective: `${perspective}px` }}
    >
      <Component className="inline flex-wrap items-center justify-center font-heading tracking-tight">
        {resolvedSegments.map((segment, segIdx) => {
          // Split segment into words so word-wrapping is fully preserved
          const words = segment.text.split(" ");

          return (
            <React.Fragment key={`seg-${segIdx}`}>
              {words.map((word, wordIdx) => {
                const isLastWord = wordIdx === words.length - 1;

                return (
                  <span
                    key={`word-${segIdx}-${wordIdx}`}
                    className="inline-block whitespace-nowrap"
                  >
                    {word.split("").map((char) => {
                      const charIndex = currentGlobalIndex++;
                      const distanceFromCenter = charIndex - globalCenter;

                      // 3D perspective transforms matching the exploding/assembling character motion
                      const x = useTransform(
                        smoothProgress,
                        [0, 1],
                        [distanceFromCenter * spread, 0],
                        { clamp: true }
                      );
                      const rotateX = useTransform(
                        smoothProgress,
                        [0, 1],
                        [distanceFromCenter * rotation, 0],
                        { clamp: true }
                      );
                      const rotateY = useTransform(
                        smoothProgress,
                        [0, 1],
                        [-distanceFromCenter * (rotation * 0.5), 0],
                        { clamp: true }
                      );
                      const opacity = useTransform(
                        smoothProgress,
                        [0, 0.45, 1],
                        [0.15, 0.7, 1],
                        { clamp: true }
                      );
                      const scale = useTransform(
                        smoothProgress,
                        [0, 1],
                        [0.85, 1],
                        { clamp: true }
                      );

                      return (
                        <motion.span
                          key={`char-${charIndex}`}
                          className={cn(
                            "inline-block will-change-transform",
                            segment.className
                          )}
                          style={{
                            x,
                            rotateX,
                            rotateY,
                            opacity,
                            scale,
                            transformStyle: "preserve-3d",
                          }}
                        >
                          {char}
                        </motion.span>
                      );
                    })}

                    {/* Preserve space between words */}
                    {!isLastWord && (
                      <span className="inline-block w-[0.28em]">&nbsp;</span>
                    )}
                  </span>
                );
              })}

              {/* Space after segment if needed */}
              {segIdx < resolvedSegments.length - 1 &&
                segment.text.endsWith(" ") && (
                  <span className="inline-block w-[0.28em]">&nbsp;</span>
                )}
            </React.Fragment>
          );
        })}
      </Component>
    </div>
  );
}

export default SplineText3D;
