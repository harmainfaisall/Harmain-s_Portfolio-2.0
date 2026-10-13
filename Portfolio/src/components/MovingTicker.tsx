import { motion } from "framer-motion";

const TICKER_ITEMS = [
  "FRONTEND",
  "BACKEND",
  "FULL STACK",
  "TYPESCRIPT",
  "JAVASCRIPT",
  "REACT",
  "NEXT.JS",
  "NODE.JS",
  "DATABASE",
  "REST APIs",
  "UI / UX",
];

export function MovingTicker() {
  return (
    <div className="relative w-full overflow-hidden bg-[#211817] py-5 sm:py-6 md:py-7 lg:py-8 border-t-2 border-[#C6A77A]/45 border-b-2 border-[#C6A77A]/35 select-none z-30 shadow-[0_12px_32px_rgba(33,24,23,0.3)]">
      {/* Subtle luxury grain texture matching editorial aesthetic */}
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none mix-blend-overlay" />

      <motion.div
        className="flex w-max shrink-0 items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 28,
        }}
      >
        {/* Render twice for continuous seamless looping */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="font-sans font-black tracking-[0.24em] text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#F5E9DF] uppercase px-4 sm:px-6 md:px-8 drop-shadow-xs">
              {item}
            </span>
            <span
              className="inline-block w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-[#C6A77A] shrink-0 mx-2 sm:mx-3 shadow-xs"
              aria-hidden="true"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default MovingTicker;
