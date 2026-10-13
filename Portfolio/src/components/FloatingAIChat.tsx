import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MessageSquare,
  User,
  Trash2,
  Copy,
  Check,
  X,
  ArrowUpRight,
  Download,
  Mail,
  ExternalLink,
  ChevronDown,
  GraduationCap,
  Award,
  Code2,
} from "lucide-react";
import { PROJECTS } from "../data/projects";

interface Message {
  id: string;
  sender: "assistant" | "user";
  text: string;
  timestamp: string;
  suggestions?: string[];
  links?: { label: string; url: string; primary?: boolean }[];
  cardType?: "projects" | "devops" | "contact" | "skills" | "education" | "certificates";
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    sender: "assistant",
    text: "Hello! Welcome to Harmain Faisal's portfolio.\n\nI'm her portfolio assistant. Feel free to ask about her **7 featured projects**, her **technical stack**, her **DevOps training at SMIT**, **education milestones**, **certifications**, or how to hire/contact her directly.",
    timestamp: "Just now",
    suggestions: [
      "Featured projects",
      "Technical skills",
      "Education journey",
      "Certifications",
      "DevOps at SMIT",
      "Contact Harmain",
      "Download resume",
    ],
  },
];

const QUICK_PROMPTS = [
  "Featured projects",
  "Technical skills",
  "Education journey",
  "Certifications",
  "DevOps at SMIT",
  "Contact Harmain",
  "Download resume",
  "About Harmain",
];

// All 3 educational milestones in Harmain's portfolio
const EDUCATION_MILESTONES = [
  {
    number: "01",
    years: "2018 — 2020",
    level: "MATRICULATION (PRE-MEDICAL)",
    institution: "Dar ul Madinah Islamic School",
    description: "Built her academic foundation in Islamic values, discipline, and scientific inquiry.",
  },
  {
    number: "02",
    years: "2020 — 2022",
    level: "INTERMEDIATE (PRE-MEDICAL)",
    institution: "Government Islamia College",
    description: "Deepened academic discipline, determination, and analytical thinking with a focus on Pre-Medical sciences.",
  },
  {
    number: "03",
    years: "2022 — Present",
    level: "TECHNICAL TRAINING & APPRENTICESHIP",
    institution: "Saylani Mass IT Training (SMIT)",
    description: "Hands-on engineering training in Full-Stack Web Development, modern JavaScript architectures, and DevOps cloud practices.",
  },
];

// Professional certifications
const CERTIFICATIONS = [
  {
    title: "Cisco Networking Certificate",
    issuer: "Cisco Networking Academy",
    details: "Foundational computer networks, IP addressing, routing protocols, and internet connectivity.",
  },
  {
    title: "Artificial Intelligence Certificate",
    issuer: "AI Specialization Program",
    details: "Core principles of AI, machine learning concepts, LLM architectures, and prompt design.",
  },
  {
    title: "JavaScript Certificate",
    issuer: "Web Engineering Program",
    details: "Modern ES6+, asynchronous patterns, DOM architecture, event loops, and functional paradigms.",
  },
  {
    title: "CSS & Modern Layouts Certificate",
    issuer: "Frontend Development Program",
    details: "CSS Grid, Flexbox, responsive tokens, UI layout design, and smooth transitions.",
  },
  {
    title: "SMIT Web & DevOps Apprenticeship",
    issuer: "Saylani Mass IT Training",
    details: "Comprehensive full-stack engineering, React ecosystem, and cloud deployment pipelines.",
  },
];

export function FloatingAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat to bottom smoothly
  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isTyping, scrollToBottom]);

  // Global event listener to toggle/open assistant from any button
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("open-ai-chat", handleOpenChat);
    return () => window.removeEventListener("open-ai-chat", handleOpenChat);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Comprehensive knowledge query processor with 100% of portfolio information
  const generateAssistantResponse = (
    query: string
  ): {
    text: string;
    links?: { label: string; url: string; primary?: boolean }[];
    cardType?: "projects" | "devops" | "contact" | "skills" | "education" | "certificates";
    suggestions?: string[];
  } => {
    const q = query.toLowerCase();

    // 1. Specific project queries
    if (q.includes("coffiora")) {
      return {
        text: "**Coffiora** is an artisanal luxury coffee web platform built by Harmain.\n\n• **Category:** Full-Stack Development\n• **Technologies:** React, TypeScript, Tailwind CSS, Framer Motion\n• **Highlights:** Dark luxury visuals, interactive coffee blend explorer, customizable ordering experience, and immersive storytelling.\n• **Status:** Live & Deployed on Netlify.",
        links: [
          { label: "Open Coffiora Live", url: "https://coffiora.netlify.app/", primary: true },
          { label: "View Source Code", url: "https://github.com/harmainfaisall/Coffiora" },
        ],
        suggestions: ["ServiConnect project", "Delicious Bites", "All projects"],
      };
    }

    if (q.includes("serviconnect")) {
      return {
        text: "**ServiConnect** is a service booking web app built for a hackathon.\n\n• **Category:** Full-Stack Web App\n• **Technologies:** React, TypeScript, Vite, Tailwind CSS\n• **Highlights:** Designed to connect users with verified local service providers through a friction-free booking process.\n• **Status:** Live on Netlify.",
        links: [
          { label: "Open ServiConnect Live", url: "https://serviconnect-hackathonproject.netlify.app/", primary: true },
          { label: "View Source Code", url: "https://github.com/harmainfaisall/Hackathon-ServiConnect" },
        ],
        suggestions: ["Coffiora project", "Delicious Bites", "All projects"],
      };
    }

    if (q.includes("delicious bites")) {
      return {
        text: "**Delicious Bites** is a responsive food ordering web application.\n\n• **Category:** Food Ordering Web App\n• **Technologies:** JavaScript, HTML5, CSS3\n• **Highlights:** Dynamic category filtering, interactive shopping cart, real-time price calculation, authentication flow, and streamlined checkout.\n• **Status:** Live on Netlify.",
        links: [
          { label: "Open Delicious Bites", url: "https://delicious-bites-practiceweb.netlify.app/", primary: true },
          { label: "View Source Code", url: "https://github.com/harmainfaisall/Delicious-Bites" },
        ],
        suggestions: ["Figma Clone", "TravelBae", "All projects"],
      };
    }

    if (q.includes("figma clone")) {
      return {
        text: "**Figma Clone** is a pixel-perfect recreation of the official Figma design tool canvas.\n\n• **Category:** UI Clone / Frontend (Hackathon)\n• **Technologies:** Pure HTML5, Modern CSS Grid, Design Tokens\n• **Highlights:** Strictly built without heavy frameworks to demonstrate mastery over pure CSS Grid and tokenized layouts.",
        links: [
          { label: "Open Figma Clone", url: "https://calm-dolphin-122a18.netlify.app/", primary: true },
          { label: "View Source Code", url: "https://github.com/harmainfaisall/My-First-HACKATHON" },
        ],
        suggestions: ["WordFlow AI", "All projects", "Technical skills"],
      };
    }

    if (q.includes("travelbae") || q.includes("travel")) {
      return {
        text: "**TravelBae** is a destination discovery and travel booking web platform.\n\n• **Category:** Travel & Booking\n• **Technologies:** Bootstrap 5, JavaScript, HTML5, CSS3\n• **Highlights:** Modal search, carousel sliders, destination filters, and responsive design.",
        links: [
          { label: "Open TravelBae", url: "https://travelbaeweb.netlify.app", primary: true },
          { label: "View Source Code", url: "https://github.com/harmainfaisall/Bootstrap-practice" },
        ],
        suggestions: ["WordFlow AI", "Coffiora", "All projects"],
      };
    }

    if (q.includes("wordflow") || q.includes("word flow")) {
      return {
        text: "**WordFlow AI** is a modern landing page for an AI-powered writing assistant.\n\n• **Category:** AI Landing Page\n• **Technologies:** Modern UI, Glassmorphism, CSS, Responsive Design\n• **Highlights:** Glassmorphic card styling, responsive feature breakdown, pricing tables, and call-to-actions.",
        links: [
          { label: "Open WordFlow AI", url: "https://landingpagewordflowai.netlify.app/", primary: true },
          { label: "View Source Code", url: "https://github.com/harmainfaisall/Syntecxhub_Project1_landingpage" },
        ],
        suggestions: ["Image Gallery", "Coffiora", "All projects"],
      };
    }

    if (q.includes("gallery") || q.includes("image gallery")) {
      return {
        text: "**Image Gallery** is an interactive photography portfolio showcase.\n\n• **Category:** Media & Web App\n• **Technologies:** JavaScript, CSS Grid, Lightbox Modal\n• **Highlights:** Category filtering, full-screen lightbox zoom, smooth transitions, and lazy loading.",
        links: [
          { label: "Open Image Gallery", url: "https://codealphaprojectimagegallery.netlify.app/", primary: true },
          { label: "View Source Code", url: "https://github.com/harmainfaisall/Codealpha-project1-imagegallery" },
        ],
        suggestions: ["Coffiora", "ServiConnect", "All projects"],
      };
    }

    // 2. All Projects Overview
    if (
      q.includes("project") ||
      q.includes("portfolio") ||
      q.includes("work") ||
      q.includes("built") ||
      q.includes("app")
    ) {
      return {
        text: `Harmain has built **${PROJECTS.length} featured web applications**, covering full-stack web applications, service booking, artisanal e-commerce, UI clones, and interactive media:\n\n1. **Coffiora** — Luxury coffee e-commerce (React, TypeScript, Tailwind)\n2. **ServiConnect** — Hackathon service booking platform (React, Vite)\n3. **Delicious Bites** — Food ordering platform with cart & checkout (JS, HTML/CSS)\n4. **Figma Clone** — Pixel-perfect UI recreation (HTML, CSS Grid)\n5. **TravelBae** — Travel discovery & booking (Bootstrap 5, JS)\n6. **WordFlow AI** — Modern AI product landing page (Glassmorphism)\n7. **Image Gallery** — Responsive media lightbox gallery (JavaScript, CSS Grid)\n\nHere are some of her spotlight projects:`,
        cardType: "projects",
        links: [
          { label: "Jump to Projects Section", url: "#projects", primary: true },
          { label: "GitHub Repositories", url: "https://github.com/harmainfaisall" },
        ],
        suggestions: ["Technical skills", "DevOps at SMIT", "Contact Harmain"],
      };
    }

    // 3. Education Journey & Background
    if (
      q.includes("education") ||
      q.includes("study") ||
      q.includes("degree") ||
      q.includes("college") ||
      q.includes("school") ||
      q.includes("matric") ||
      q.includes("intermediate") ||
      q.includes("dar ul madinah") ||
      q.includes("islamia")
    ) {
      return {
        text: "Harmain's educational path represents a journey of discipline, faith, and continuous learning — transitioning from early Pre-Medical studies to software engineering and cloud operations:\n\n• **2018 — 2020:** Matriculation (Pre-Medical) at Dar ul Madinah Islamic School\n• **2020 — 2022:** Intermediate (Pre-Medical) at Government Islamia College\n• **2022 — Present:** Full-Stack Web Development & DevOps Apprenticeship at Saylani Mass IT Training (SMIT)\n\nHere is the detailed timeline:",
        cardType: "education",
        links: [
          { label: "View Education Section", url: "#education" },
        ],
        suggestions: ["Certifications", "Technical skills", "DevOps at SMIT"],
      };
    }

    // 4. Certifications & Credentials
    if (
      q.includes("certificate") ||
      q.includes("certif") ||
      q.includes("cisco") ||
      q.includes("credential") ||
      q.includes("qualification") ||
      q.includes("honor")
    ) {
      return {
        text: "Harmain holds verified credentials across networking, artificial intelligence, and web technologies:\n\n1. **Cisco Networking Certificate:** Network fundamentals, routing, and connectivity\n2. **Artificial Intelligence Certificate:** AI concepts, LLMs, and intelligent interfaces\n3. **JavaScript Certificate:** Modern ES6+, DOM manipulation, and asynchronous patterns\n4. **CSS & Layouts Certificate:** Responsive design systems, CSS Grid, and design tokens\n5. **SMIT Web & DevOps Program:** Practical full-stack development and container deployment.",
        cardType: "certificates",
        links: [
          { label: "Education & Credentials", url: "#education" },
          { label: "LinkedIn Credentials", url: "https://www.linkedin.com/in/harmain-faisall/" },
        ],
        suggestions: ["Education journey", "Technical skills", "Featured projects"],
      };
    }

    // 5. Technical Skills & Toolkit
    if (
      q.includes("skill") ||
      q.includes("tech") ||
      q.includes("stack") ||
      q.includes("language") ||
      q.includes("react") ||
      q.includes("node") ||
      q.includes("typescript") ||
      q.includes("tailwind") ||
      q.includes("docker") ||
      q.includes("mongo") ||
      q.includes("postgres") ||
      q.includes("next")
    ) {
      return {
        text: "Harmain's core technical toolkit spans modern full-stack development:\n\n• **Frontend & UI:** React 19, Next.js, TypeScript, Tailwind CSS, JavaScript (ES6+), Framer Motion, Spline 3D\n• **Backend & Databases:** Node.js, Express.js, REST APIs, PostgreSQL, MongoDB, Redis\n• **State & Architecture:** Redux Toolkit, Prisma ORM, GraphQL, Git & GitHub, Postman\n• **Tooling:** Vite, Webpack, Postman, Lenis Smooth Scroll, ESLint",
        cardType: "skills",
        links: [
          { label: "View Full Skills Grid", url: "#skills" },
          { label: "GitHub Profile", url: "https://github.com/harmainfaisall" },
        ],
        suggestions: ["Featured projects", "DevOps at SMIT", "Download resume"],
      };
    }

    // 6. DevOps Training @ SMIT
    if (
      q.includes("devops") ||
      q.includes("smit") ||
      q.includes("saylani") ||
      q.includes("cloud") ||
      q.includes("pipeline") ||
      q.includes("ci/cd") ||
      q.includes("linux")
    ) {
      return {
        text: "Harmain is advancing her **DevOps & Cloud Specialization** at **Saylani Mass IT Training (SMIT)** in Karachi.\n\nHer core competencies include:\n• **Docker Containerization:** Creating multi-stage, secure Dockerfiles and optimizing image sizes.\n• **CI/CD Automation:** Designing automated linting, testing, and deployment pipelines with GitHub Actions.\n• **Linux Systems:** Server administration, permissions, Bash scripting, and daemon management.\n• **Deployment Reliability:** Zero-downtime rollouts, reverse proxy configuration with Nginx, and cloud resilience.",
        cardType: "devops",
        links: [
          { label: "Education & SMIT Details", url: "#education" },
        ],
        suggestions: ["Technical skills", "Featured projects", "Contact Harmain"],
      };
    }

    // 7. About Harmain / Bio
    if (
      q.includes("about") ||
      q.includes("who is") ||
      q.includes("bio") ||
      q.includes("introduce") ||
      q.includes("harmain")
    ) {
      return {
        text: "**Harmain Faisal** is a passionate Full-Stack Web Developer and DevOps apprentice based in **Karachi, Pakistan**.\n\n• **Specialization:** Building responsive, production-ready web applications with **React 19, TypeScript, Next.js, and Node.js**.\n• **Cloud & Infrastructure:** Advancing hands-on containerization and CI/CD pipelines at **SMIT**.\n• **Aesthetic Finesse:** Integrating tactile micro-interactions and interactive 3D depth with **Spline and Three.js**.\n• **Work Ethic:** Deeply committed to writing clean, maintainable code, solving complex architectural challenges, and continuous learning.",
        links: [
          { label: "Read About Section", url: "#about" },
          { label: "LinkedIn Profile", url: "https://www.linkedin.com/in/harmain-faisall/" },
        ],
        suggestions: ["Featured projects", "Education journey", "Contact Harmain"],
      };
    }

    // 8. Contact / Hire / Resume / Location / Email
    if (
      q.includes("contact") ||
      q.includes("hire") ||
      q.includes("email") ||
      q.includes("reach") ||
      q.includes("resume") ||
      q.includes("cv") ||
      q.includes("location") ||
      q.includes("where") ||
      q.includes("karachi") ||
      q.includes("available")
    ) {
      return {
        text: "**Harmain is actively available** for Full-Stack Developer roles, DevOps opportunities, and freelance projects.\n\n• **Email:** harmain.faisal19@gmail.com\n• **Location:** Karachi, Pakistan (Available for Remote worldwide or On-site in Karachi)\n• **LinkedIn:** linkedin.com/in/harmain-faisall/\n• **GitHub:** github.com/harmainfaisall\n\nYou can reach out directly or download her official resume:",
        cardType: "contact",
        links: [
          { label: "Open Contact Form", url: "#contact", primary: true },
          { label: "Connect on LinkedIn", url: "https://www.linkedin.com/in/harmain-faisall/" },
        ],
        suggestions: ["Download resume", "Featured projects", "Technical skills"],
      };
    }

    // 9. Greetings
    if (
      q.includes("hello") ||
      q.includes("hi") ||
      q.includes("hey") ||
      q.includes("salam") ||
      q.includes("aoa") ||
      q.includes("good morning") ||
      q.includes("good evening")
    ) {
      return {
        text: "Hello! Welcome to Harmain Faisal's portfolio. How can I help you today? You can ask about her 7 featured projects, her technical stack, her DevOps training at SMIT, her education milestones, or how to get in touch with her directly.",
        suggestions: [
          "Featured projects",
          "Technical skills",
          "Education journey",
          "Certifications",
          "Contact Harmain",
        ],
      };
    }

    // 10. General fallback
    return {
      text: `Harmain is a Full-Stack Web Developer and DevOps apprentice at SMIT with expertise across React, Next.js, TypeScript, Node.js, Docker, and CI/CD automation.\n\nRegarding *"${query}"*, you can ask about any of her 7 featured projects (Coffiora, ServiConnect, etc.), her educational milestones, technical certifications, or get in touch with her directly!`,
      links: [
        { label: "Go to Contact Form", url: "#contact" },
        { label: "View GitHub Profile", url: "https://github.com/harmainfaisall" },
      ],
      suggestions: ["Featured projects", "Technical skills", "Education journey", "Contact Harmain"],
    };
  };

  // Natural typing simulation
  const streamResponse = (fullResponse: {
    text: string;
    links?: { label: string; url: string; primary?: boolean }[];
    cardType?: "projects" | "devops" | "contact" | "skills" | "education" | "certificates";
    suggestions?: string[];
  }) => {
    const messageId = `assistant-${Date.now()}`;
    const words = fullResponse.text.split(" ");
    let displayedCount = 0;

    setMessages((prev) => [
      ...prev,
      {
        id: messageId,
        sender: "assistant",
        text: "",
        timestamp: "Just now",
        links: fullResponse.links,
        cardType: fullResponse.cardType,
        suggestions: fullResponse.suggestions,
      },
    ]);

    const interval = setInterval(() => {
      displayedCount += Math.floor(Math.random() * 2) + 2;
      const currentText = words.slice(0, displayedCount).join(" ");

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, text: currentText } : msg
        )
      );

      if (displayedCount >= words.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 24);
  };

  const handleSendMessage = (textToSend?: string) => {
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

    setTimeout(() => {
      const response = generateAssistantResponse(text);
      streamResponse(response);
    }, 280);
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* =========================================================================
          CHAT DIALOG WINDOW — SIZED TO NEVER CUT OFF AT THE TOP (h-[min(510px,calc(100dvh-105px))])
      ========================================================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-[92vw] sm:w-[410px] h-[min(510px,calc(100dvh-105px))] max-h-[calc(100dvh-105px)] rounded-2xl bg-[#211817] border border-[#C6A77A]/35 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden mb-2.5"
          >
            {/* Professional Clean Header (shrink-0 ensures it never scrolls or cuts off) */}
            <div className="px-4 sm:px-5 py-3.5 bg-[#401A22] border-b border-[#C6A77A]/25 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                {/* Monogram Badge */}
                <div className="relative">
                  <div className="w-8 h-8 rounded-xl bg-[#C6A77A] text-[#211817] flex items-center justify-center font-editorial font-bold text-xs shadow-sm">
                    HF
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#401A22]" />
                </div>

                <div>
                  <h3 className="font-editorial font-medium text-sm text-white leading-tight">
                    Harmain Faisal
                  </h3>
                  <p className="text-[11px] text-[#F5E9DF]/80 flex items-center gap-1.5 font-sans">
                    <span>Portfolio Assistant</span>
                    <span className="text-[#C6A77A]/50">•</span>
                    <span className="text-emerald-400 font-medium">Online</span>
                  </p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="p-1.5 rounded-lg text-[#F5E9DF]/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  className="p-1.5 rounded-lg text-[#F5E9DF]/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Body (flex-1 min-h-0 guarantees scrollability without pushing out header) */}
            <div
              ref={chatContainerRef}
              className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent"
            >
              {messages.map((message) => {
                const isUser = message.sender === "user";

                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`flex gap-2.5 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isUser && (
                      <div className="w-6 h-6 rounded-lg bg-[#C6A77A] text-[#211817] font-editorial font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        HF
                      </div>
                    )}

                    <div
                      className={`relative max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                        isUser
                          ? "bg-[#F5E9DF] text-[#211817] border border-[#C6A77A]/30 rounded-tr-xs shadow-xs font-medium"
                          : "bg-[#401A22] text-[#F5E9DF] border border-[#C6A77A]/25 rounded-tl-xs"
                      }`}
                    >
                      {/* Formatted Text */}
                      <div className="whitespace-pre-wrap font-sans">
                        {message.text.split("\n").map((line, lIdx) => {
                          const parts = line.split(/(\*\*.*?\*\*)/g);
                          return (
                            <span key={lIdx} className="block min-h-[1.25em]">
                              {parts.map((part, pIdx) => {
                                if (part.startsWith("**") && part.endsWith("**")) {
                                  return (
                                    <strong
                                      key={pIdx}
                                      className="font-semibold text-white"
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

                      {/* CARD WIDGET: Projects Browser Component */}
                      {message.cardType === "projects" && (
                        <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                          {PROJECTS.map((project) => (
                            <div
                              key={project.id}
                              className="p-3 rounded-xl bg-[#211817] border border-[#C6A77A]/20 hover:border-[#C6A77A]/50 transition-colors"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-heading font-bold text-xs text-white">
                                  {project.title}
                                </h4>
                                <span className="text-[10px] font-sans text-[#C6A77A] bg-[#C6A77A]/15 px-2 py-0.5 rounded">
                                  {project.category}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#F5E9DF]/75 mb-2 leading-relaxed">
                                {project.description}
                              </p>
                              <div className="flex items-center justify-between pt-1">
                                <div className="flex flex-wrap gap-1">
                                  {project.technologies.slice(0, 3).map((t, i) => (
                                    <span
                                      key={i}
                                      className="text-[9px] text-[#F5E9DF]/70 bg-white/5 px-1.5 py-0.5 rounded"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex items-center gap-2">
                                  {project.liveUrl && (
                                    <a
                                      href={project.liveUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 text-[11px] font-medium text-[#C6A77A] hover:underline"
                                    >
                                      <span>Demo</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                  {project.githubUrl && (
                                    <a
                                      href={project.githubUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 text-[11px] font-medium text-[#F5E9DF]/70 hover:text-white"
                                    >
                                      <span>Code</span>
                                      <ArrowUpRight className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CARD WIDGET: Education Milestones Timeline */}
                      {message.cardType === "education" && (
                        <div className="mt-3 pt-3 border-t border-white/10 space-y-2.5">
                          {EDUCATION_MILESTONES.map((m, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-[#211817] border border-[#C6A77A]/20"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-heading font-black text-xs text-[#C6A77A] flex items-center gap-1.5">
                                  <GraduationCap className="w-3.5 h-3.5 text-[#C6A77A]" />
                                  {m.number}. {m.institution}
                                </span>
                                <span className="text-[10px] font-mono text-[#B78C8E]">
                                  {m.years}
                                </span>
                              </div>
                              <span className="inline-block text-[10px] font-mono text-[#F5E9DF]/80 mb-1">
                                {m.level}
                              </span>
                              <p className="text-[11px] text-[#F5E9DF]/70 leading-relaxed">
                                {m.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CARD WIDGET: Certifications Component */}
                      {message.cardType === "certificates" && (
                        <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                          {CERTIFICATIONS.map((cert, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded-xl bg-[#211817] border border-white/10"
                            >
                              <div className="flex items-center gap-2 mb-0.5">
                                <Award className="w-3.5 h-3.5 text-[#C6A77A] shrink-0" />
                                <h4 className="font-heading font-bold text-xs text-white">
                                  {cert.title}
                                </h4>
                              </div>
                              <span className="text-[10px] font-mono text-[#C6A77A]/80 block mb-1">
                                {cert.issuer}
                              </span>
                              <p className="text-[11px] text-[#F5E9DF]/70 leading-relaxed">
                                {cert.details}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CARD WIDGET: Technical Skills Component */}
                      {message.cardType === "skills" && (
                        <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                          <div className="p-2.5 rounded-xl bg-[#211817] border border-white/10">
                            <span className="font-heading font-bold text-xs text-[#C6A77A] mb-1 flex items-center gap-1.5">
                              <Code2 className="w-3.5 h-3.5 text-[#C6A77A]" />
                              Frontend & UI Architecture
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Spline 3D", "Framer Motion"].map((s, i) => (
                                <span key={i} className="text-[10px] bg-white/5 text-[#F5E9DF] px-2 py-0.5 rounded">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-[#211817] border border-white/10">
                            <span className="font-heading font-bold text-xs text-[#C6A77A] block mb-1">
                              Backend & Databases
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {["Node.js", "Express.js", "REST APIs", "PostgreSQL", "MongoDB", "Redis"].map((s, i) => (
                                <span key={i} className="text-[10px] bg-white/5 text-[#F5E9DF] px-2 py-0.5 rounded">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-[#211817] border border-white/10">
                            <span className="font-heading font-bold text-xs text-[#C6A77A] block mb-1">
                              Architecture, State & Tooling
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {["Redux Toolkit", "Prisma ORM", "GraphQL", "REST APIs", "Git & GitHub", "Postman", "Vite"].map((s, i) => (
                                <span key={i} className="text-[10px] bg-white/5 text-[#F5E9DF] px-2 py-0.5 rounded">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CARD WIDGET: Professional Contact Card Component */}
                      {message.cardType === "contact" && (
                        <div className="mt-3 pt-3 border-t border-white/10 space-y-2.5">
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#211817] border border-white/10">
                            <div className="flex items-center gap-2 text-xs text-[#F5E9DF]">
                              <Mail className="w-3.5 h-3.5 text-[#C6A77A]" />
                              <span>harmain.faisal19@gmail.com</span>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                copyToClipboard(
                                  "harmain.faisal19@gmail.com",
                                  "copy-email"
                                )
                              }
                              className="px-2 py-1 rounded-md bg-[#C6A77A]/15 hover:bg-[#C6A77A]/25 text-[#C6A77A] font-sans text-[11px] font-medium transition-colors cursor-pointer"
                            >
                              {copiedId === "copy-email" ? "Copied" : "Copy"}
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <a
                              href="/assets/My%20Professional%20Resume.pdf"
                              download="Harmain_Faisal_Resume.pdf"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C6A77A] text-[#211817] font-heading font-bold text-xs hover:bg-[#D4B588] transition-all"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download Resume</span>
                            </a>
                            <a
                              href="https://www.linkedin.com/in/harmain-faisall/"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#F5E9DF] font-medium text-xs hover:bg-white/10 hover:text-white transition-all"
                            >
                              <span>LinkedIn</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Action Links */}
                      {message.links && message.links.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                          {message.links.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target={link.url.startsWith("http") ? "_blank" : undefined}
                              rel={link.url.startsWith("http") ? "noreferrer" : undefined}
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                                link.primary
                                  ? "bg-[#C6A77A] text-[#211817] font-bold hover:bg-[#D4B588]"
                                  : "bg-white/5 border border-white/10 text-[#F5E9DF] hover:text-white hover:bg-white/10"
                              }`}
                            >
                              <span>{link.label}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Inline Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                          {message.suggestions.map((s, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSendMessage(s)}
                              className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-[#C6A77A]/15 border border-white/10 hover:border-[#C6A77A]/30 text-[11px] text-[#F5E9DF]/80 hover:text-[#C6A77A] transition-colors cursor-pointer"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Timestamp & Copy Icon */}
                      <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#F5E9DF]/40">
                        <span>{message.timestamp}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(message.text, message.id)}
                          className="hover:text-white transition-colors p-0.5 cursor-pointer"
                          title="Copy text"
                        >
                          {copiedId === message.id ? (
                            <Check className="w-3 h-3 text-[#C6A77A]" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>

                    {isUser && (
                      <div className="w-6 h-6 rounded-lg bg-[#54283F] border border-[#C6A77A]/30 flex items-center justify-center text-[#C6A77A] shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Natural Typing State */}
              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-[#F5E9DF]/60">
                  <div className="w-6 h-6 rounded-lg bg-[#C6A77A] text-[#211817] font-heading font-black text-[10px] flex items-center justify-center shrink-0">
                    HF
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-[#401A22] border border-[#C6A77A]/25 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6A77A] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6A77A] animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6A77A] animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompt Carousel (shrink-0 ensures it stays intact) */}
            <div className="px-3.5 py-2 bg-[#211817] border-t border-[#C6A77A]/15 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-[#401A22] border border-[#C6A77A]/25 hover:border-[#C6A77A] text-[11px] text-[#F5E9DF]/80 hover:text-white transition-all cursor-pointer whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form (shrink-0 ensures it never overflows) */}
            <div className="p-3 bg-[#211817] border-t border-[#C6A77A]/25 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask a question about Harmain's work..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-[#401A22] border border-[#C6A77A]/30 text-white placeholder-[#F5E9DF]/40 text-xs sm:text-sm focus:outline-none focus:border-[#C6A77A] transition-colors font-sans"
                />

                <button
                  type="submit"
                  disabled={!inputVal.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-[#C6A77A] hover:bg-[#D4B588] text-[#211817] transition-colors shrink-0 cursor-pointer disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          REFINED FLOATING TRIGGER BUTTON (COMPACT & CLEAN)
      ========================================================================= */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="relative group flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-[#401A22] border border-[#C6A77A]/40 hover:border-[#C6A77A] shadow-xl text-[#F5E9DF] transition-all cursor-pointer"
        aria-label="Toggle Harmain Faisal Assistant"
      >
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#C6A77A] text-[#211817] flex items-center justify-center font-editorial font-bold text-xs shrink-0 shadow-sm">
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
        </div>

        <span className="font-editorial font-medium text-xs sm:text-sm text-[#F5E9DF] group-hover:text-[#C6A77A] transition-colors pr-1">
          {isOpen ? "Close Assistant" : "Chat with Assistant"}
        </span>

        {/* Live Active Status Indicator */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      </motion.button>
    </div>
  );
}

export default FloatingAIChat;
