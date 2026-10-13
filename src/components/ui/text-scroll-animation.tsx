import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import ReactLenis from "lenis/react";
import { cn } from "@/lib/utils";

export type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
  className?: string;
};

export const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
  className,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;
  // Explodes outward horizontally & rotates in 3D perspective, smoothly locking into place
  const x = useTransform(scrollYProgress, [0, 0.45], [distanceFromCenter * 40, 0], { clamp: true });
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [distanceFromCenter * 25, 0], { clamp: true });
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0.2, 1], { clamp: true });

  return (
    <motion.span
      className={cn(
        "inline-block font-heading font-black text-[#E9E4A8] will-change-transform",
        isSpace && "w-3 sm:w-5 md:w-8",
        className
      )}
      style={{ x, rotateX, opacity }}
    >
      {char}
    </motion.span>
  );
};

export const CharacterV2 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
  className,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;
  const x = useTransform(scrollYProgress, [0, 0.45], [distanceFromCenter * 50, 0], { clamp: true });
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.65, 1], { clamp: true });
  const y = useTransform(scrollYProgress, [0, 0.45], [Math.abs(distanceFromCenter) * 35, 0], { clamp: true });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1], { clamp: true });

  return (
    <motion.div
      className={cn(
        "h-14 w-14 sm:h-18 sm:w-18 md:h-20 md:w-20 shrink-0 p-3 rounded-2xl bg-[#1A1916] border border-[#E9E4A8]/25 shadow-2xl flex items-center justify-center will-change-transform hover:border-[#E9E4A8]/60 transition-colors",
        className
      )}
      style={{ x, scale, y, opacity, transformOrigin: "center" }}
    >
      <img src={char} alt="tech stack icon" className="h-full w-full object-contain filter drop-shadow" />
    </motion.div>
  );
};

export const CharacterV3 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
  className,
}: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;
  const x = useTransform(scrollYProgress, [0, 0.45], [distanceFromCenter * 75, 0], { clamp: true });
  const rotate = useTransform(scrollYProgress, [0, 0.45], [distanceFromCenter * 40, 0], { clamp: true });
  const y = useTransform(scrollYProgress, [0, 0.45], [-Math.abs(distanceFromCenter) * 25, 0], { clamp: true });
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.65, 1], { clamp: true });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1], { clamp: true });

  return (
    <motion.div
      className={cn(
        "h-14 w-14 sm:h-18 sm:w-18 md:h-20 md:w-20 shrink-0 p-3 rounded-2xl bg-[#1A1916] border border-[#E9E4A8]/25 shadow-2xl flex items-center justify-center will-change-transform hover:border-[#E9E4A8]/60 transition-colors",
        className
      )}
      style={{ x, rotate, y, scale, opacity, transformOrigin: "center" }}
    >
      <img src={char} alt="tech stack icon" className="h-full w-full object-contain filter drop-shadow" />
    </motion.div>
  );
};

export const Bracket = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 27 78"
      className={cn("h-8 sm:h-12 w-auto", className)}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
};

export const DEFAULT_ICONS = [
  "https://cdn.21st.dev/assets/mirror/1d/1d364b72c9eaf1fe37d17ca88cd8fb541308dc0f3b09e2ab3b824f380b3493d5.svg",
  "https://cdn.21st.dev/assets/mirror/2f/2f86fca501dfed321a62f28743f29d9dd738dac91668eac5260ab746d1ef8840.svg",
  "https://cdn.21st.dev/assets/mirror/c6/c6c80c9ba890e199e94d35340fb4cf2d5790f339d9846800d68283e3e58e6031.svg",
  "https://cdn.21st.dev/assets/mirror/3b/3bf8cceead820aec50d4ee825a3fd02c5a1cd6665cc9cf4cbf3d9c8861a204bb.svg",
  "https://cdn.21st.dev/assets/mirror/66/6698757ee85997e8167b2eacaff8395d6987954185488f2e90b88ef387fec6c7.svg",
  "https://cdn.21st.dev/assets/mirror/b1/b17d2a2b592a06252efef522d5205f0c7a958f748d40df1011ed081417e42f85.svg",
];

export interface TextScrollAnimationProps {
  /** The primary headline text animated in Section 1 (default: "Let's build something sharp.") */
  text?: string;
  /** Subheading text displayed above the icons in Section 2 and 3 */
  subheading?: string;
  /** Optional secondary subheading for Section 3 (defaults to subheading) */
  subheading2?: string;
  /** Optional badge text displayed at the top */
  badgeText?: string;
  /** Array of image or SVG URLs to animate */
  icons?: string[];
  /** Primary animated text color class (default: "text-[#E9E4A8]") */
  textColor?: string;
  /** Background color for sections (default: "bg-[#121210]") */
  sectionBg?: string;
  /** Additional container classes */
  className?: string;
  /**
   * Wrap with <ReactLenis root> for standalone pages.
   * Defaults to false if your app already has global smooth scroll.
   */
  enableLenis?: boolean;
}

export const Skiper31 = ({
  text = "Let's build something sharp.",
  subheading = "integrate with your fav tech stack",
  subheading2,
  badgeText = "Scroll to explore",
  icons = DEFAULT_ICONS,
  textColor = "text-[#E9E4A8]",
  sectionBg = "bg-[#121210]",
  className,
  enableLenis = false,
}: TextScrollAnimationProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const targetRef2 = useRef<HTMLDivElement | null>(null);
  const targetRef3 = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: targetRef2,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: targetRef3,
    offset: ["start start", "end end"],
  });

  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);
  const iconCenterIndex = Math.floor(icons.length / 2);
  const effectiveSubheading2 = subheading2 ?? subheading;

  const innerContent = (
    <div className={cn("relative w-full text-white selection:bg-[#E9E4A8] selection:text-[#121210]", sectionBg, className)}>
      {/* SECTION 1: 3D Exploding Headline */}
      <div ref={targetRef} className="relative h-[180vh] w-full">
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4">
          {/* Top Badge */}
          {badgeText && (
            <div className="absolute top-16 sm:top-20 md:top-24 left-1/2 z-10 grid -translate-x-1/2 content-start justify-items-center gap-4 text-center pointer-events-none">
              <span className="relative text-xs uppercase font-mono tracking-[0.25em] text-[#ECE5C8]/60 after:absolute after:left-1/2 after:top-full after:h-12 sm:after:h-16 after:w-px after:bg-gradient-to-b after:from-[#E9E4A8]/40 after:to-transparent">
                {badgeText}
              </span>
            </div>
          )}

          <div
            className="w-full max-w-6xl px-4 text-center font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase select-none leading-none"
            style={{ perspective: "600px" }}
          >
            {characters.map((char, index) => (
              <CharacterV1
                key={index}
                char={char}
                index={index}
                centerIndex={centerIndex}
                scrollYProgress={scrollYProgress}
                className={textColor}
              />
            ))}
          </div>

          <p className="mt-8 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#ECE5C8]/40">
            Keep scrolling to load the stack
          </p>
        </div>
      </div>

      {/* SECTION 2: Converging Tech Stack (Scale & Y) */}
      <div ref={targetRef2} className="relative h-[180vh] w-full border-t border-[#E9E4A8]/10">
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center gap-8 sm:gap-10 overflow-hidden px-4">
          <p className="font-heading flex items-center justify-center gap-2 sm:gap-4 px-4 text-center text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            <Bracket className="h-8 sm:h-12 text-[#E9E4A8] shrink-0" />
            <span className="font-heading font-bold text-[#ECE5C8]">{subheading}</span>
            <Bracket className="h-8 sm:h-12 scale-x-[-1] text-[#E9E4A8] shrink-0" />
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-4xl px-4">
            {icons.map((char, index) => (
              <CharacterV2
                key={index}
                char={char}
                index={index}
                centerIndex={iconCenterIndex}
                scrollYProgress={scrollYProgress2}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: 3D Rotated & Perspective Stack */}
      <div ref={targetRef3} className="relative h-[180vh] w-full border-t border-[#E9E4A8]/10">
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center gap-8 sm:gap-10 overflow-hidden px-4">
          <p className="font-heading flex items-center justify-center gap-2 sm:gap-4 px-4 text-center text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            <Bracket className="h-8 sm:h-12 text-[#E9E4A8] shrink-0" />
            <span className="font-heading font-bold text-[#ECE5C8]">{effectiveSubheading2}</span>
            <Bracket className="h-8 sm:h-12 scale-x-[-1] text-[#E9E4A8] shrink-0" />
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-4xl px-4"
            style={{ perspective: "600px" }}
          >
            {icons.map((char, index) => (
              <CharacterV3
                key={index}
                char={char}
                index={index}
                centerIndex={iconCenterIndex}
                scrollYProgress={scrollYProgress3}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (enableLenis) {
    return <ReactLenis root>{innerContent}</ReactLenis>;
  }

  return innerContent;
};

export { Skiper31 as TextScrollAnimation };
export default Skiper31;
