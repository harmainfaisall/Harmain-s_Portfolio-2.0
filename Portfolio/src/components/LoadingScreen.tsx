import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldCheck, ChevronRight } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "INITIALIZING KERNEL & CORE MODULES...",
  "VERIFYING FULL-STACK & DEVOPS RUNTIMES...",
  "CONNECTING TO SAYLANI MASS IT TRAINING CLUSTER...",
  "SYNCHRONIZING 3D GRAPHICS & THREE.JS SHADERS...",
  "PORTFOLIO READY — HARMAIN FAISAL [ONLINE]",
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [logIndex, setLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("hf_portfolio_intro_seen");
    if (seen === "true") {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            sessionStorage.setItem("hf_portfolio_intro_seen", "true");
            setTimeout(onComplete, 500);
          }, 250);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev < BOOT_LOGS.length - 1 ? prev + 1 : prev));
    }, 400);

    return () => clearInterval(logInterval);
  }, []);

  const handleSkip = () => {
    setIsFinished(true);
    sessionStorage.setItem("hf_portfolio_intro_seen", "true");
    setTimeout(onComplete, 250);
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF6F0] px-4 text-[#1B1512] select-none"
        >
          <div className="w-full max-w-lg rounded-2xl border border-[#BFA07A]/35 bg-[#1B1512] p-6 sm:p-7 shadow-2xl text-[#FAF6F0]">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-[#BFA07A]/20 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#BFA07A]/40" />
                <span className="w-3 h-3 rounded-full bg-[#BFA07A]/70" />
                <span className="w-3 h-3 rounded-full bg-[#BFA07A]" />
                <span className="ml-2 text-xs font-mono text-[#FAF6F0] flex items-center gap-1.5 font-medium">
                  <Terminal className="w-3.5 h-3.5 text-[#BFA07A]" />
                  harmain@edition:~$
                </span>
              </div>
              <button
                onClick={handleSkip}
                className="text-xs font-mono text-[#D8CEBF] hover:text-white transition-colors px-2.5 py-0.5 rounded border border-[#BFA07A]/30 hover:border-[#BFA07A] bg-[#241E19]"
              >
                Skip [Esc]
              </button>
            </div>

            {/* Terminal logs list */}
            <div className="space-y-2 font-mono text-xs text-[#D8CEBF] min-h-[140px]">
              {BOOT_LOGS.slice(0, logIndex + 1).map((log, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <ChevronRight className="w-3 h-3 text-[#BFA07A] shrink-0" />
                  <span className={idx === logIndex ? "text-[#BFA07A] font-semibold" : "text-[#D8CEBF]/80"}>
                    {log}
                  </span>
                  {idx < logIndex && (
                    <span className="ml-auto text-[10px] text-[#BFA07A] font-bold">[OK]</span>
                  )}
                </motion.div>
              ))}
              <div className="flex items-center gap-2 text-[#BFA07A] animate-pulse">
                <span className="inline-block w-2 h-3 bg-[#BFA07A]" />
              </div>
            </div>

            {/* Progress bar & Percent */}
            <div className="mt-6 pt-4 border-t border-[#BFA07A]/20">
              <div className="flex items-center justify-between text-xs font-mono text-[#D8CEBF] mb-2">
                <span className="flex items-center gap-1 font-medium text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#BFA07A]" />
                  SYSTEM INITIALIZATION
                </span>
                <span className="text-[#BFA07A] font-bold">{progress}%</span>
              </div>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#241E19] border border-[#BFA07A]/20">
                <motion.div
                  className="h-full bg-[#BFA07A]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
