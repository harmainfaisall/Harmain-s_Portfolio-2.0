import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Terminal, Shield, RefreshCw, Eye, EyeOff } from "lucide-react";
import { PROJECTS } from "../data/projects";
import { SplineText3D } from "./ui/SplineText3D";

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export function TerminalSection() {
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number | null>(null);
  const [isAutoTyping, setIsAutoTyping] = useState(false);
  const [hasAutoTyped, setHasAutoTyped] = useState(false);
  const [crtEnabled, setCrtEnabled] = useState(false);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const executeCommand = useCallback((rawCmd: string) => {
    const cmdStr = rawCmd.trim().toLowerCase();
    if (!cmdStr) return;

    setCommandHistory((prev) => [...prev, cmdStr]);
    setHistoryPointer(null);

    let resultNode: React.ReactNode;

    switch (cmdStr) {
      case "help":
        resultNode = (
          <div className="space-y-1.5 text-xs text-[#ECE5C8]/80">
            <p className="text-[#E9E4A8] font-semibold">Available system utilities:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
              <div><span className="text-white font-mono font-bold">about</span> - Background & engineering philosophy</div>
              <div><span className="text-white font-mono font-bold">skills</span> - Core engineering stack</div>
              <div><span className="text-white font-mono font-bold">projects</span> - Deployed production projects</div>
              <div><span className="text-white font-mono font-bold">education</span> - SMIT & academic track</div>
              <div><span className="text-white font-mono font-bold">contact</span> - Communication endpoints</div>
              <div><span className="text-white font-mono font-bold">clear</span> - Flush terminal buffer</div>
              <div><span className="text-white font-mono font-bold">crt</span> - Toggle CRT scanlines</div>
            </div>
          </div>
        );
        break;

      case "about":
        resultNode = (
          <div className="space-y-1 text-xs text-[#ECE5C8]/80">
            <p className="text-white font-semibold">Harmain Faisal | Full-Stack Developer & DevOps Apprentice</p>
            <p>Training at Saylani Mass IT Training (SMIT) with a focus on modern TypeScript, React, Next.js, and containerized deployment workflows.</p>
          </div>
        );
        break;

      case "skills":
        resultNode = (
          <div className="space-y-1 text-xs text-[#ECE5C8]/80">
            <p className="text-[#E9E4A8] font-semibold">Technical Arsenal (Full-Stack):</p>
            <p>• Frontend: React 19, Next.js, TypeScript, Tailwind CSS, Framer Motion, Spline 3D</p>
            <p>• Backend: Node.js, Express, REST APIs, PostgreSQL, MongoDB, Redis</p>
            <p>• State & APIs: Redux Toolkit, Prisma ORM, GraphQL, Git & GitHub, Postman</p>
          </div>
        );
        break;

      case "projects":
        resultNode = (
          <div className="space-y-1.5 text-xs text-[#ECE5C8]/80">
            <p className="text-[#E9E4A8] font-semibold">Featured Projects Showcase ({PROJECTS.length}):</p>
            {PROJECTS.map((p, idx) => (
              <div key={p.id} className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <div>
                  <span className="text-[#E9E4A8] font-mono">{idx + 1}.</span>{" "}
                  <span className="text-white font-medium">{p.title}</span> —{" "}
                  <span className="text-neutral-400">{p.category}</span>
                </div>
                {p.liveUrl && (
                  <span className="text-[11px]">
                    [<a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-[#E9E4A8] underline hover:text-white">Live Demo</a>]
                  </span>
                )}
              </div>
            ))}
          </div>
        );
        break;

      case "education":
        resultNode = (
          <div className="space-y-1 text-xs text-[#ECE5C8]/80">
            <p className="text-white font-semibold">Saylani Mass IT Training (SMIT)</p>
            <p>Full-Stack Web Development + DevOps Specialization (2024 — Present)</p>
          </div>
        );
        break;

      case "contact":
        resultNode = (
          <div className="space-y-1 text-xs text-[#ECE5C8]/80">
            <p>Email: <a href="mailto:harmain.faisall19@gmail.com" className="text-[#E9E4A8] underline">harmain.faisall19@gmail.com</a></p>
            <p>GitHub: <a href="https://github.com/harmainfaisall" target="_blank" rel="noreferrer" className="text-[#E9E4A8] underline">github.com/harmainfaisall</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/harmain-faisall/" target="_blank" rel="noreferrer" className="text-[#E9E4A8] underline">linkedin.com/in/harmain-faisall/</a></p>
          </div>
        );
        break;

      case "date":
        resultNode = (
          <p className="text-[#ECE5C8] font-mono">
            {new Date().toUTCString()} (System Time)
          </p>
        );
        break;

      case "crt":
        setCrtEnabled((prev) => !prev);
        resultNode = (
          <p className="text-[#E9E4A8] font-semibold">
            CRT scanlines effect: {!crtEnabled ? "ENABLED" : "DISABLED"}
          </p>
        );
        break;

      case "sudo":
        resultNode = (
          <p className="text-[#ECE5C8] font-medium">
            [ACCESS RESTRICTED] You do not need root privileges to appreciate clean code! 😉
          </p>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        resultNode = (
          <p className="text-[#ECE5C8]/60">
            command not found: {cmdStr}. Type <span className="text-[#E9E4A8] font-bold">&apos;help&apos;</span> to inspect all functions.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        command: cmdStr,
        output: resultNode,
      },
    ]);
  }, [crtEnabled]);

  const runAutoTyping = useCallback(() => {
    setIsAutoTyping(true);
    const commandText = "harmain --fetch-profile";
    let curr = "";
    let idx = 0;

    const interval = setInterval(() => {
      if (idx < commandText.length) {
        curr += commandText[idx];
        setInputVal(curr);
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          executeCommand("about");
          setInputVal("");
          setIsAutoTyping(false);
        }, 300);
      }
    }, 45);
  }, [executeCommand]);

  // Auto-typing sequence when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAutoTyped) {
            setHasAutoTyped(true);
            runAutoTyping();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAutoTyped, runAutoTyping]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextPointer =
        historyPointer === null
          ? commandHistory.length - 1
          : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextPointer);
      setInputVal(commandHistory[nextPointer]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyPointer === null) return;
      const nextPointer = historyPointer + 1;
      if (nextPointer >= commandHistory.length) {
        setHistoryPointer(null);
        setInputVal("");
      } else {
        setHistoryPointer(nextPointer);
        setInputVal(commandHistory[nextPointer]);
      }
    }
  };

  return (
    <section
      id="terminal"
      ref={sectionRef}
      className="relative py-24 bg-[#121210] border-t border-[#E9E4A8]/15"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1916] border border-[#E9E4A8]/25 text-xs font-mono text-[#E9E4A8] shadow-sm">
            <Terminal className="w-3.5 h-3.5 text-[#E9E4A8]" />
            <span>INTERACTIVE ENVIRONMENT</span>
          </div>
          <SplineText3D
            text="Interactive CLI Terminal"
            as="h2"
            className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight"
          />
          <p className="text-sm sm:text-base text-[#ECE5C8]/80 max-w-xl mx-auto">
            Directly probe the system. Type commands or click below to discover skills, education, and credentials in real-time.
          </p>
        </div>

        {/* Terminal Window Shell */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          onClick={() => inputRef.current?.focus()}
          className={`relative rounded-2xl border border-[#E9E4A8]/20 bg-[#171613] shadow-2xl overflow-hidden cursor-text ${
            crtEnabled ? "crt-overlay" : ""
          }`}
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1D1C18] border-b border-[#E9E4A8]/15">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E9E4A8]/40" />
              <span className="w-3 h-3 rounded-full bg-[#E9E4A8]/70" />
              <span className="w-3 h-3 rounded-full bg-[#E9E4A8]" />
              <span className="ml-3 font-mono text-xs text-[#ECE5C8] flex items-center gap-1.5 font-medium">
                <Shield className="w-3.5 h-3.5 text-[#E9E4A8]" />
                harmain@devops-node:~ (bash)
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCrtEnabled(!crtEnabled);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1A1916] border border-[#E9E4A8]/20 text-[#ECE5C8] hover:text-white transition-colors shadow-sm"
                title="Toggle Scanlines"
              >
                {crtEnabled ? <Eye className="w-3 h-3 text-[#E9E4A8]" /> : <EyeOff className="w-3 h-3 text-[#ECE5C8]/40" />}
                <span className="hidden sm:inline">CRT: {crtEnabled ? "ON" : "OFF"}</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setHistory([]);
                  runAutoTyping();
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1A1916] border border-[#E9E4A8]/20 text-[#ECE5C8] hover:text-white transition-colors shadow-sm"
                title="Reset Terminal"
              >
                <RefreshCw className="w-3 h-3 text-[#E9E4A8]" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Terminal Screen Body */}
          <div
            ref={terminalRef}
            className="p-5 sm:p-6 font-mono text-xs sm:text-sm min-h-[360px] max-h-[480px] overflow-y-auto space-y-4 bg-[#171613]"
          >
            {/* Initial Welcome Banner */}
            <div className="text-[#ECE5C8]/80 space-y-1 pb-2 border-b border-[#E9E4A8]/15">
              <p className="text-white font-bold">
                Harmain Faisal — Developer CLI [Version 2.4.0-release]
              </p>
              <p className="text-[#ECE5C8]/70">
                Connected to Saylani Mass IT Training (SMIT) Cloud Cluster. Type <span className="text-[#E9E4A8] font-bold">&apos;help&apos;</span> to inspect all functions.
              </p>
            </div>

            {/* Rendered History Items */}
            {history.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#ECE5C8]">
                  <span className="text-[#E9E4A8] font-bold">harmain@smit:~$</span>
                  <span className="text-white font-medium">{item.command}</span>
                </div>
                <div className="pl-4 border-l-2 border-[#E9E4A8]/30 py-1">
                  {item.output}
                </div>
              </div>
            ))}

            {/* Live Command Prompt Input */}
            <div className="flex items-center gap-2 text-[#ECE5C8] pt-1">
              <span className="text-[#E9E4A8] font-bold shrink-0">harmain@smit:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                disabled={isAutoTyping}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white focus:outline-none caret-[#E9E4A8] font-mono text-xs sm:text-sm"
                placeholder={isAutoTyping ? "executing profile check..." : "type 'help' or any command..."}
                autoFocus={false}
              />
              <span className="w-2 h-4 bg-[#E9E4A8] animate-pulse shrink-0" />
            </div>
          </div>

          {/* Quick Command Suggestions Footer */}
          <div className="px-4 py-2.5 bg-[#141411] border-t border-[#E9E4A8]/15 flex flex-wrap items-center gap-2 text-xs font-mono text-[#ECE5C8]/70">
            <span className="text-[#E9E4A8] font-medium">Quick suggestions:</span>
            {["help", "about", "skills", "projects", "education", "contact"].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => {
                  setInputVal(cmd);
                  executeCommand(cmd);
                  setInputVal("");
                }}
                className="px-2.5 py-1 rounded bg-[#1A1916] hover:bg-[#E9E4A8] text-[#ECE5C8] hover:text-[#121210] border border-[#E9E4A8]/20 shadow-sm transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TerminalSection;
