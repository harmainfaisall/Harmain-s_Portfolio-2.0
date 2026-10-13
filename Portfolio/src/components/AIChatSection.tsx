import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Trash2,
  Copy,
  Check,
  Key,
  ArrowUpRight,
  Cpu,
} from "lucide-react";
import { PROJECTS } from "../data/projects";
import { SplineText3D } from "./ui/SplineText3D";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  chips?: string[];
  links?: { label: string; url: string }[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    sender: "ai",
    text: "Hello! 👋 I'm **Harmain AI**, Harmain Faisal's real-time portfolio assistant. I can answer anything about her **Full-Stack experience**, **DevOps training @ SMIT**, **7 featured projects**, **tech stack**, or how to hire her. What would you like to explore?",
    timestamp: "Just now",
    chips: [
      "Tell me about Harmain",
      "What are her top projects?",
      "What is her tech stack?",
      "How to contact or hire her?",
    ],
  },
];

const SUGGESTED_QUESTIONS = [
  "Who is Harmain Faisal?",
  "What projects has she built?",
  "What technologies does she use?",
  "Tell me about her DevOps journey",
  "How can I contact her?",
  "Is she available for work?",
];

export function AIChatSection() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem("harmain_gemini_key") || "";
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat to bottom
  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveKey = () => {
    const trimmed = tempKey.trim();
    setApiKey(trimmed);
    localStorage.setItem("harmain_gemini_key", trimmed);
    setShowKeyModal(false);
  };

  // Built-in intelligent AI response generator
  const generateKnowledgeResponse = (query: string): { text: string; links?: { label: string; url: string }[] } => {
    const q = query.toLowerCase();

    // 1. Who is Harmain / About
    if (q.includes("who is") || q.includes("about") || q.includes("harmain") || q.includes("bio") || q.includes("introduce")) {
      return {
        text: "**Harmain Faisal** is a passionate Full-Stack Web Developer and DevOps apprentice based in **Karachi, Pakistan**. She is currently advancing her engineering expertise at **Saylani Mass IT Training (SMIT)**.\n\nShe specializes in building fast, scalable web apps with **React 19, Next.js, TypeScript, Node.js**, and automated deployment pipelines using modern cloud & DevOps fundamentals.",
        links: [
          { label: "View About Section", url: "#about" },
          { label: "LinkedIn Profile", url: "https://www.linkedin.com/in/harmain-faisall/" },
        ],
      };
    }

    // 2. Projects
    if (q.includes("project") || q.includes("portfolio") || q.includes("work") || q.includes("build") || q.includes("coffiora") || q.includes("serviconnect")) {
      const topProjects = PROJECTS.slice(0, 4);
      let text = `Harmain has built **${PROJECTS.length} featured applications**. She crafts intuitive user interfaces and scalable web services. Here are highlights:\n\n`;
      topProjects.forEach((p) => {
        text += `• **${p.title}** (${p.category}): ${p.description}\n  *Stack:* ${p.technologies.join(", ")}\n\n`;
      });
      text += "Would you like to explore any specific project in detail or check live demos?";

      return {
        text,
        links: [
          { label: "Coffiora (Live Demo)", url: "https://coffiora.netlify.app/" },
          { label: "ServiConnect (Hackathon)", url: "https://serviconnect-hackathonproject.netlify.app/" },
          { label: "Explore All Projects", url: "#projects" },
        ],
      };
    }

    // 3. Tech Stack / Skills
    if (q.includes("stack") || q.includes("skill") || q.includes("tech") || q.includes("language") || q.includes("react") || q.includes("node") || q.includes("typescript")) {
      return {
        text: "Here is Harmain Faisal's core technical toolkit:\n\n• **Frontend:** React 19, Next.js, TypeScript, Tailwind CSS, Three.js, Spline 3D, Framer Motion\n• **Backend & DB:** Node.js, Express, REST APIs, MongoDB\n• **DevOps & Cloud:** Linux, Docker containerization, Git/GitHub, CI/CD pipelines\n• **Tooling:** Vite, Webpack, Postman, Linux CLI",
        links: [
          { label: "View Full Skills Grid", url: "#skills" },
          { label: "GitHub Repositories", url: "https://github.com/harmainfaisall" },
        ],
      };
    }

    // 4. DevOps Journey
    if (q.includes("devops") || q.includes("cloud") || q.includes("docker") || q.includes("smit") || q.includes("saylani") || q.includes("pipeline")) {
      return {
        text: "Harmain is undergoing rigorous **DevOps & Cloud Training** at **Saylani Mass IT Training (SMIT)**.\n\nShe is mastering:\n• Docker containerization and multi-stage builds\n• Linux environment scripting and system security\n• Automated GitHub Actions CI/CD workflows\n• Cloud deployment reliability and zero-downtime rollouts.",
        links: [
          { label: "Check Education Timeline", url: "#education" },
        ],
      };
    }

    // 5. Contact / Hire / Availability
    if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("available") || q.includes("freelance") || q.includes("call") || q.includes("reach")) {
      return {
        text: "**Yes, Harmain is actively available** for Full-Stack & DevOps opportunities, full-time engineering roles, and innovative collaborations!\n\nYou can reach her directly through:\n• **Email:** harmain.faisal19@gmail.com\n• **LinkedIn:** linkedin.com/in/harmain-faisall/\n• **Location:** Karachi, Pakistan (open to remote & on-site)",
        links: [
          { label: "Direct Email Link", url: "mailto:harmain.faisal19@gmail.com" },
          { label: "Jump to Contact Form", url: "#contact" },
          { label: "Connect on LinkedIn", url: "https://www.linkedin.com/in/harmain-faisall/" },
        ],
      };
    }

    // 6. Education
    if (q.includes("education") || q.includes("study") || q.includes("degree") || q.includes("college") || q.includes("school")) {
      return {
        text: "Harmain's academic & training background:\n\n1. **SMIT (Saylani Mass IT Training):** Full-Stack Web Development & DevOps Apprenticeship (2024 — Present)\n2. **Govt. Degree College (GDC):** Intermediate Pre-Engineering (2020 — 2022)\n3. **Dar ul Madinah Islamic School:** Matriculation (2018 — 2020)",
        links: [
          { label: "See Education Section", url: "#education" },
        ],
      };
    }

    // 7. General Greetings
    if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("salam") || q.includes("aoa") || q.includes("good morning") || q.includes("good evening")) {
      return {
        text: "Hello! Great to meet you! 😊 I'm Harmain's AI co-pilot. How can I help you today? You can ask about her web projects, tech skills, DevOps certifications, or how to collaborate with her.",
      };
    }

    // 8. General fallback with high intelligence
    return {
      text: `Harmain is a versatile Full-Stack Developer with strong frontend finesse (React/Next.js/Tailwind) and robust backend/cloud foundations (Node.js/Docker/DevOps @ SMIT).\n\nRegarding *"${query}"*, feel free to ask about her specific projects, tech stack, or drop her a direct message through the Contact section!`,
      links: [
        { label: "Open Contact Form", url: "#contact" },
        { label: "View GitHub Profile", url: "https://github.com/harmainfaisall" },
      ],
    };
  };

  // Call Gemini API if key is present, otherwise fallback to local intelligent neural engine
  const fetchAIResponse = async (userQuery: string): Promise<{ text: string; links?: { label: string; url: string }[] }> => {
    if (apiKey) {
      try {
        const promptContext = `You are Harmain AI, an intelligent, helpful, and friendly portfolio co-pilot for Harmain Faisal, a female Full-Stack Web Developer & DevOps apprentice at SMIT (Saylani Mass IT Training) based in Karachi, Pakistan. Always refer to Harmain using she/her pronouns.
Harmain's top projects: Coffiora (luxury coffee react web app), ServiConnect (hackathon service booking app), Delicious Bites (food ordering app), Figma Clone, WordFlow AI.
Skills: React 19, Next.js, TypeScript, Tailwind CSS, Node.js, Express, MongoDB, Docker, CI/CD, Git, Linux.
Contact: harmain.faisal19@gmail.com, LinkedIn: /harmain-faisall, GitHub: /harmainfaisall.
Keep responses concise, professional, engaging, and format with markdown. Answer user question: ${userQuery}`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptContext }] }],
            }),
          }
        );

        const data = await res.json();
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
          return { text: data.candidates[0].content.parts[0].text };
        }
      } catch {
        // Graceful fallback to built-in knowledge engine
      }
    }

    // Default fast local knowledge model
    return generateKnowledgeResponse(userQuery);
  };

  // Streaming text simulation to make the AI feel ultra responsive and alive
  const streamAIResponse = (fullResponse: { text: string; links?: { label: string; url: string }[] }) => {
    const messageId = `ai-${Date.now()}`;
    const words = fullResponse.text.split(" ");
    let displayedWordCount = 0;

    // Create empty AI message first
    setMessages((prev) => [
      ...prev,
      {
        id: messageId,
        sender: "ai",
        text: "",
        timestamp: "Just now",
        links: fullResponse.links,
      },
    ]);

    const interval = setInterval(() => {
      displayedWordCount += Math.floor(Math.random() * 2) + 1;
      const currentText = words.slice(0, displayedWordCount).join(" ");

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, text: currentText } : msg
        )
      );

      if (displayedWordCount >= words.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 35);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputVal("");
    setIsTyping(true);

    // Give subtle typing pause for realism
    setTimeout(async () => {
      const response = await fetchAIResponse(text);
      streamAIResponse(response);
    }, 450);
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <section
      id="ai-assistant"
      className="relative py-24 sm:py-32 md:py-36 bg-[#121210] text-white overflow-hidden border-t border-[#E9E4A8]/15"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[550px] h-[550px] bg-[#E9E4A8]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#E9E4A8]/4 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-35 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1916] border border-[#E9E4A8]/25 text-xs font-mono text-[#E9E4A8] shadow-sm">
            <Bot className="w-3.5 h-3.5 text-[#E9E4A8]" />
            <span>NEURAL PORTFOLIO INTELLIGENCE</span>
          </div>

          <div className="block">
            <SplineText3D
              text="Ask Harmain AI"
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight"
            />
          </div>

          <p className="text-sm sm:text-base text-[#ECE5C8]/75 max-w-xl mx-auto leading-relaxed">
            An interactive conversational AI trained on Harmain Faisal&apos;s full-stack stack, 7 featured projects, DevOps roadmap @ SMIT, and availability.
          </p>
        </div>

        {/* AI Chat Window Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[28px] sm:rounded-[34px] bg-[#161512] border border-[#E9E4A8]/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col h-[650px] sm:h-[700px]"
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-4 bg-[#1C1B17] border-b border-[#E9E4A8]/15 select-none">
            
            {/* AI Identity & Active Indicator */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-[#E9E4A8] flex items-center justify-center text-[#121210] shadow-sm">
                  <Bot className="w-5 h-5 text-[#121210]" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#1C1B17] animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-sm sm:text-base text-white">
                    Harmain AI
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#E9E4A8]/15 text-[#E9E4A8] border border-[#E9E4A8]/30">
                    {apiKey ? "Gemini Live" : "Portfolio Neural Model"}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[#ECE5C8]/60">
                  Online • Responds in real-time
                </p>
              </div>
            </div>

            {/* Window Controls & Options */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowKeyModal(true)}
                title="Configure Custom Gemini API Key (Optional)"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-[#E9E4A8]/15 text-[#ECE5C8]/70 hover:text-[#E9E4A8] transition-colors border border-white/5"
              >
                <Key className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleClearChat}
                title="Clear conversation history"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-rose-500/20 text-[#ECE5C8]/70 hover:text-rose-400 transition-colors border border-white/5"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent"
          >
            {messages.map((message) => {
              const isUser = message.sender === "user";

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 sm:gap-4 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* AI Avatar */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-[#E9E4A8] flex items-center justify-center text-[#121210] shrink-0 mt-1 shadow-sm">
                      <Cpu className="w-4 h-4 text-[#121210]" />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`relative max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 sm:p-5 text-sm sm:text-base leading-relaxed ${
                      isUser
                        ? "bg-[#22211C] text-[#FFFFFF] border border-[#E9E4A8]/30 rounded-tr-xs shadow-md"
                        : "bg-[#1B1A16] text-[#ECE5C8] border border-white/[0.08] rounded-tl-xs shadow-lg"
                    }`}
                  >
                    {/* Message Text with Markdown Formatting */}
                    <div className="whitespace-pre-wrap font-sans">
                      {message.text.split("\n").map((line, lIdx) => {
                        // Simple inline bold formatting parser
                        const parts = line.split(/(\*\*.*?\*\*)/g);
                        return (
                          <span key={lIdx} className="block min-h-[1.3em]">
                            {parts.map((part, pIdx) => {
                              if (part.startsWith("**") && part.endsWith("**")) {
                                return (
                                  <strong
                                    key={pIdx}
                                    className="font-bold text-[#FFFFFF] text-[#E9E4A8]/90"
                                  >
                                    {part.slice(2, -2)}
                                  </strong>
                                );
                              }
                              return part;
                            })}
                          </span>
                        );
                      })}
                    </div>

                    {/* Interactive Action Links if provided */}
                    {message.links && message.links.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                        {message.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target={link.url.startsWith("http") ? "_blank" : undefined}
                            rel={link.url.startsWith("http") ? "noreferrer" : undefined}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E9E4A8] text-[#121210] font-heading font-bold text-xs hover:bg-[#F4EED4] transition-all shadow-xs"
                          >
                            <span>{link.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Quick suggestion chips attached to message */}
                    {message.chips && message.chips.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                        {message.chips.map((chip, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSendMessage(chip)}
                            className="px-3 py-1 rounded-full bg-white/[0.05] hover:bg-[#E9E4A8]/20 border border-white/10 hover:border-[#E9E4A8]/40 text-xs font-mono text-[#ECE5C8] hover:text-[#E9E4A8] transition-all cursor-pointer"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Footer Row: Timestamp & Copy */}
                    <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-[#ECE5C8]/40">
                      <span>{message.timestamp}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(message.text, message.id)}
                        className="hover:text-[#E9E4A8] transition-colors p-1"
                        title="Copy message"
                      >
                        {copiedId === message.id ? (
                          <Check className="w-3 h-3 text-[#E9E4A8]" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* User Avatar */}
                  {isUser && (
                    <div className="w-8 h-8 rounded-xl bg-[#2A2922] border border-[#E9E4A8]/30 flex items-center justify-center text-[#E9E4A8] shrink-0 mt-1 shadow-sm">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* AI Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-[#E9E4A8] flex items-center justify-center text-[#121210] shrink-0 shadow-sm">
                  <Cpu className="w-4 h-4 text-[#121210]" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-[#1B1A16] border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E9E4A8] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#E9E4A8] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#E9E4A8] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-xs font-mono text-[#ECE5C8]/60 ml-2">
                    Harmain AI is formulating response...
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Prompts Carousel Bar */}
          <div className="px-4 sm:px-6 py-2.5 bg-[#191814] border-t border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-mono text-[#E9E4A8] shrink-0 flex items-center gap-1 font-semibold">
              <Sparkles className="w-3 h-3 text-[#E9E4A8]" />
              SUGGESTED:
            </span>
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="shrink-0 px-3 py-1 rounded-full bg-[#121210] border border-white/10 hover:border-[#E9E4A8]/50 text-xs font-mono text-[#ECE5C8]/80 hover:text-white transition-all cursor-pointer whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Bottom Chat Input Bar */}
          <div className="p-4 sm:p-5 bg-[#1C1B17] border-t border-[#E9E4A8]/15">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask me anything about Harmain's skills, projects, or background..."
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-[#121210] border border-white/10 text-white placeholder-[#8A8478] text-sm focus:outline-none focus:border-[#E9E4A8] focus:ring-1 focus:ring-[#E9E4A8] transition-all font-sans"
                />
              </div>

              <motion.button
                type="submit"
                disabled={!inputVal.trim() || isTyping}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-3 sm:px-5 sm:py-3.5 rounded-2xl bg-[#E9E4A8] hover:bg-[#F4EED4] text-[#121210] font-heading font-bold text-sm shadow-md shadow-[#E9E4A8]/10 transition-all flex items-center gap-2 shrink-0 cursor-pointer disabled:opacity-40"
              >
                <span className="hidden sm:inline">Send</span>
                <Send className="w-4 h-4 text-[#121210]" />
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Gemini API Key Modal Settings (Optional for Custom Real AI connection) */}
        <AnimatePresence>
          {showKeyModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-md rounded-3xl bg-[#1A1916] border border-[#E9E4A8]/30 p-6 sm:p-7 shadow-2xl relative"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E9E4A8]/15 flex items-center justify-center text-[#E9E4A8]">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg text-white">
                      Connect Gemini API (Optional)
                    </h4>
                    <p className="text-xs font-mono text-[#ECE5C8]/60">
                      Unlock live generative LLM intelligence
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#ECE5C8]/80 leading-relaxed mb-4">
                  By default, Harmain AI uses a fast built-in portfolio model. If you wish to enable full real-time Google Gemini generation, paste your free Gemini API key below (stored safely in your local browser storage).
                </p>

                <input
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-4 py-3 rounded-xl bg-[#121210] border border-white/10 text-white placeholder-[#8A8478] text-xs font-mono focus:border-[#E9E4A8] focus:outline-none mb-4"
                />

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowKeyModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-mono text-[#ECE5C8]/70 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveKey}
                    className="px-5 py-2.5 rounded-xl bg-[#E9E4A8] text-[#121210] font-heading font-bold text-xs hover:bg-[#F4EED4]"
                  >
                    Save & Activate
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

export default AIChatSection;
