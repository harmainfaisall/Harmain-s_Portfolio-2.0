import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  Copy,
  Check,
  User,
  MapPin,
  ArrowRight,
  Sparkles,
  FileText,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { SplineText3D } from "./ui/SplineText3D";

/* ---------- Social Icons ---------- */
function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const DESTINATION_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "harmain.faisal19@gmail.com";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    navigator.clipboard.writeText(DESTINATION_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formState.name.trim(),
          email: formState.email.trim(),
          subject: formState.subject.trim() || `New Inquiry from ${formState.name.trim()}`,
          message: formState.message.trim(),
          _subject: `Portfolio Message from ${formState.name.trim()}: ${formState.subject.trim() || "General Inquiry"}`,
          _replyto: formState.email.trim(),
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && (data.success === "true" || data.success === true || response.status === 200)) {
        setSubmitted(true);

        // Trigger celebration confetti matching the luxury palette
        try {
          confetti({
            particleCount: 65,
            spread: 70,
            origin: { y: 0.75 },
            colors: ["#401A22", "#54283F", "#B78C8E", "#C6A77A", "#F5E9DF", "#211817"],
          });
        } catch {
          // Fallback gracefully
        }
      } else {
        throw new Error(data.message || "Failed to submit message.");
      }
    } catch (err: unknown) {
      console.error("Form submission error:", err);
      setErrorMessage(
        `Message could not be sent automatically. You can email directly to ${DESTINATION_EMAIL}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 md:py-36 bg-[#401A22] text-[#F5E9DF] overflow-hidden border-t border-[#C6A77A]/30"
    >
      {/* Ambient Lighting & Texture matching editorial palette */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C6A77A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[480px] h-[480px] bg-[#54283F]/35 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: Header, Channels, Hand-drawn Notes & Doodles
          ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            
            {/* Top Doodle & Kicker Row */}
            <div className="relative pt-2">
              {/* Handwritten Note: "Got an idea? Let's talk. :)" */}
              <motion.div
                initial={{ opacity: 0, y: -10, rotate: -8 }}
                whileInView={{ opacity: 1, y: 0, rotate: -7 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="absolute -top-10 sm:-top-11 left-0 flex items-center gap-2 select-none pointer-events-none"
              >
                <span className="font-handwriting text-2xl sm:text-3xl text-[#F5E9DF] font-bold tracking-wide">
                  Got an idea? Let&apos;s talk. :)
                </span>
                {/* Hand-drawn curved arrow SVG pointing down */}
                <svg
                  width="36"
                  height="34"
                  viewBox="0 0 36 34"
                  fill="none"
                  className="text-[#C6A77A] translate-y-3 -translate-x-1"
                >
                  <path
                    d="M4 4 C14 8, 26 14, 28 26"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="2 3"
                  />
                  <path
                    d="M20 25 L28 26 L29 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              {/* Subheading Kicker */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="pt-6 sm:pt-4 mb-3"
              >
                <div className="border border-[#C6A77A]/35 py-1 px-4 rounded-full text-xs font-mono tracking-widest uppercase text-[#F5E9DF] bg-[#54283F] shadow-2xs font-semibold w-fit">
                  CONTACT ME
                </div>
              </motion.div>
            </div>

            {/* Main Headline in Bodoni Moda (Enlarged as requested) */}
            <div className="mb-5 flex items-baseline">
              <SplineText3D
                segments={[
                  { text: "Let's Build " },
                  { text: "Something", className: "font-editorial italic font-normal text-[#C6A77A] underline decoration-[#C6A77A]/50 decoration-wavy decoration-1 underline-offset-8" },
                  { text: " Great." },
                ]}
                as="h2"
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial font-normal tracking-tight text-[#F5E9DF] leading-[1.05]"
              />
            </div>

            {/* Intro Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-sm sm:text-base text-[#F5E9DF]/80 font-normal leading-relaxed max-w-lg mb-8 font-sans"
            >
              Have a project, opportunity, or just want to say hi? I&apos;d love to hear from you. Feel free to reach out through any of the channels below or send me a message.
            </motion.p>

            {/* Direct Channel Cards (High-contrast obsidian cards matching editorial style) */}
            <div className="space-y-3.5 mb-8">
              {/* Card 1: EMAIL */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative flex items-center justify-between p-4 sm:p-4.5 rounded-2xl bg-[#211817] text-[#F5E9DF] border border-[#C6A77A]/30 shadow-xl hover:shadow-2xl hover:border-[#C6A77A] hover:bg-[#54283F]/30 transition-all duration-300"
              >
                <a
                  href={`mailto:${DESTINATION_EMAIL}`}
                  className="flex items-center gap-4 flex-1 min-w-0"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#401A22] border border-[#C6A77A]/30 group-hover:border-[#C6A77A] flex items-center justify-center text-[#C6A77A] group-hover:scale-110 transition-all shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-mono tracking-[0.2em] text-[#C6A77A] uppercase font-semibold">
                      EMAIL
                    </span>
                    <span className="block text-sm sm:text-base font-medium text-[#F5E9DF] group-hover:text-[#C6A77A] transition-colors truncate">
                      {DESTINATION_EMAIL}
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-2 pl-3 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl bg-white/[0.08] hover:bg-[#C6A77A] text-[#F5E9DF] hover:text-[#211817] transition-colors cursor-pointer"
                    title="Copy email address"
                    aria-label="Copy email"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-[#C6A77A] group-hover:text-[#211817]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href={`mailto:${DESTINATION_EMAIL}`}
                    aria-label="Send email"
                    className="p-2 rounded-xl text-[#F5E9DF]/60 group-hover:text-[#C6A77A] group-hover:translate-x-1 transition-all"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>

              {/* Card 2: LINKEDIN */}
              <motion.a
                href="https://www.linkedin.com/in/harmain-faisall/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="group relative flex items-center justify-between p-4 sm:p-4.5 rounded-2xl bg-[#211817] text-[#F5E9DF] border border-[#C6A77A]/30 shadow-xl hover:shadow-2xl hover:border-[#C6A77A] hover:bg-[#54283F]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#401A22] border border-[#C6A77A]/30 group-hover:border-[#C6A77A] flex items-center justify-center text-[#C6A77A] group-hover:scale-110 transition-all shrink-0">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-mono tracking-[0.2em] text-[#C6A77A] uppercase font-semibold">
                      LINKEDIN
                    </span>
                    <span className="block text-sm sm:text-base font-medium text-[#F5E9DF] group-hover:text-[#C6A77A] transition-colors truncate">
                      /harmain-faisall
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#F5E9DF]/60 group-hover:text-[#C6A77A] group-hover:translate-x-1.5 transition-all shrink-0 ml-3" />
              </motion.a>

              {/* Card 3: GITHUB */}
              <motion.a
                href="https://github.com/harmainfaisall"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group relative flex items-center justify-between p-4 sm:p-4.5 rounded-2xl bg-[#211817] text-[#F5E9DF] border border-[#C6A77A]/30 shadow-xl hover:shadow-2xl hover:border-[#C6A77A] hover:bg-[#54283F]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#401A22] border border-[#C6A77A]/30 group-hover:border-[#C6A77A] flex items-center justify-center text-[#C6A77A] group-hover:scale-110 transition-all shrink-0">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-mono tracking-[0.2em] text-[#C6A77A] uppercase font-semibold">
                      GITHUB
                    </span>
                    <span className="block text-sm sm:text-base font-medium text-[#F5E9DF] group-hover:text-[#C6A77A] transition-colors truncate">
                      /harmainfaisall
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#F5E9DF]/60 group-hover:text-[#C6A77A] group-hover:translate-x-1.5 transition-all shrink-0 ml-3" />
              </motion.a>

              {/* Card 4: LOCATION */}
              <motion.a
                href="https://maps.google.com/?q=Karachi,+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="group relative flex items-center justify-between p-4 sm:p-4.5 rounded-2xl bg-[#211817] text-[#F5E9DF] border border-[#C6A77A]/30 shadow-xl hover:shadow-2xl hover:border-[#C6A77A] hover:bg-[#54283F]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#401A22] border border-[#C6A77A]/30 group-hover:border-[#C6A77A] flex items-center justify-center text-[#C6A77A] group-hover:scale-110 transition-all shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-mono tracking-[0.2em] text-[#C6A77A] uppercase font-semibold">
                      LOCATION
                    </span>
                    <span className="block text-sm sm:text-base font-medium text-[#F5E9DF] group-hover:text-[#C6A77A] transition-colors truncate">
                      Karachi, Pakistan
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#F5E9DF]/60 group-hover:text-[#C6A77A] group-hover:translate-x-1.5 transition-all shrink-0 ml-3" />
              </motion.a>
            </div>

            {/* Bottom Left Desk Decor & Handwritten Doodles */}
            <div className="relative pt-3 flex flex-wrap items-center justify-between gap-4">
              {/* Handwritten Note: "Thanks for being here! :)" */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="select-none inline-flex flex-col items-start -rotate-2"
              >
                <span className="font-handwriting text-2xl sm:text-3xl text-[#F5E9DF] font-bold">
                  Thanks for being here! :)
                </span>
                {/* Hand-drawn curly underline doodle */}
                <svg
                  width="130"
                  height="14"
                  viewBox="0 0 130 14"
                  fill="none"
                  className="text-[#C6A77A] -mt-1"
                >
                  <path
                    d="M3 8 C 30 2, 60 12, 90 6 C 105 3, 120 10, 127 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

              {/* Aesthetic Callout: "Better Ideas Together ♡" */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#54283F] text-[#F5E9DF] border border-[#C6A77A]/40 select-none shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C6A77A]" />
                <span className="font-handwriting text-lg text-[#F5E9DF] font-bold">
                  Better Ideas Together ♡
                </span>
              </motion.div>
            </div>
          </div>


          {/* =========================================================================
              RIGHT COLUMN: The Presentation Folder with Paperclip Note & Form
          ========================================================================= */}
          <div className="lg:col-span-7 relative pt-4 sm:pt-6">
            
            {/* Outer Presentation Folder Container */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative rounded-[28px] sm:rounded-[34px] bg-[#211817] border border-[#C6A77A]/35 p-4 sm:p-7 md:p-8 shadow-2xl text-[#F5E9DF]"
            >
              {/* Folder Top Tab Notch */}
              <div className="absolute -top-3.5 left-8 sm:left-12 px-5 py-1 rounded-t-xl bg-[#211817] border-t border-l border-r border-[#C6A77A]/35 text-[10px] font-mono text-[#C6A77A] uppercase tracking-widest flex items-center gap-1.5 shadow-sm font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A77A]" />
                <span>INBOX / 01</span>
              </div>

              {/* Pinned Note on Top Right with Metallic Paperclip */}
              <motion.div
                initial={{ opacity: 0, rotate: 6, scale: 0.9 }}
                whileInView={{ opacity: 1, rotate: 4, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -top-7 sm:-top-8 -right-2 sm:-right-4 z-20 select-none"
              >
                {/* Paperclip Graphic SVG */}
                <div className="absolute -top-3.5 left-5 z-30 drop-shadow-md">
                  <svg
                    width="26"
                    height="50"
                    viewBox="0 0 26 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 18 V36 C8 39.5 10.5 42 14 42 C17.5 42 20 39.5 20 36 V10 C20 5.5 16 2 11 2 C6 2 2 5.5 2 10 V39 C2 44.5 6.5 48 12 48 C17.5 48 22 44.5 22 39 V14"
                      stroke="#C6A77A"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 18 V36 C8 39.5 10.5 42 14 42 C17.5 42 20 39.5 20 36 V10 C20 5.5 16 2 11 2 C6 2 2 5.5 2 10 V39 C2 44.5 6.5 48 12 48 C17.5 48 22 44.5 22 39 V14"
                      stroke="#F5E9DF"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* The Paper Sticky Note */}
                <div className="relative bg-[#F5E9DF] text-[#211817] px-4 py-3 sm:px-5 sm:py-4 rounded-xl shadow-xl border border-[#C6A77A]/40 transform hover:rotate-2 transition-transform">
                  <p className="font-handwriting text-xl sm:text-2xl text-[#211817] font-bold leading-tight text-center">
                    Good<br />
                    Things<br />
                    Take<br />
                    Messages ♡
                  </p>
                </div>
              </motion.div>


              {/* =====================================================================
                  MAIN FORM SHEET (Clean Parchment Sheet inside Folder)
              ===================================================================== */}
              <div className="relative rounded-2xl sm:rounded-[22px] bg-[#F5E9DF] text-[#211817] p-6 sm:p-8 md:p-9 shadow-inner shadow-black/5 border border-[#C6A77A]/30">
                
                {/* Header Tag */}
                <div className="flex items-center gap-2 mb-6 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6A77A]" />
                  <span className="text-xs font-mono font-bold tracking-[0.22em] text-[#401A22] uppercase">
                    SEND ME A MESSAGE
                  </span>
                </div>

                {submitted ? (
                  /* Success State Confirmation */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#401A22] flex items-center justify-center mx-auto text-[#C6A77A] shadow-md">
                      <Sparkles className="w-8 h-8 animate-pulse text-[#C6A77A]" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-editorial font-medium text-[#401A22]">
                      Message Received!
                    </h3>
                    <p className="text-sm sm:text-base text-[#54283F] max-w-md mx-auto leading-relaxed font-sans">
                      Thank you for reaching out, <span className="font-bold text-[#401A22]">{formState.name}</span>. I will get back to you promptly at{" "}
                      <span className="font-bold underline decoration-[#C6A77A] text-[#401A22]">{formState.email}</span>.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setErrorMessage(null);
                          setFormState({ name: "", email: "", subject: "", message: "" });
                        }}
                        className="px-6 py-2.5 rounded-full bg-[#401A22] hover:bg-[#54283F] text-xs font-mono font-bold text-[#F5E9DF] transition-all shadow-md cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* The Contact Form */
                  <form onSubmit={handleSubmit} className="space-y-4.5 sm:space-y-5">
                    {/* Spam prevention honeypot */}
                    <input
                      type="text"
                      name="_honey"
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* Error Banner */}
                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 rounded-xl bg-[#54283F]/15 border border-[#54283F]/40 text-[#401A22] text-xs font-sans flex items-start gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 text-[#401A22] shrink-0 mt-0.5" />
                        <div className="flex-1 space-y-1">
                          <p className="font-semibold">{errorMessage}</p>
                          <a
                            href={`mailto:${DESTINATION_EMAIL}?subject=${encodeURIComponent(
                              formState.subject || "Portfolio Inquiry"
                            )}&body=${encodeURIComponent(formState.message)}`}
                            className="inline-flex items-center gap-1 font-bold underline text-[#401A22] hover:text-[#54283F] transition-colors"
                          >
                            <span>Open in your email client</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Row 1: Name & Email side-by-side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#211817]/85">
                          <User className="w-3.5 h-3.5 text-[#401A22]" />
                          <span>Your Name</span>
                          <span className="text-[#401A22]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-[#C6A77A]/40 text-[#211817] placeholder-[#211817]/45 text-sm focus:outline-none focus:border-[#401A22] focus:ring-2 focus:ring-[#54283F]/20 transition-all font-sans font-medium"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#211817]/85">
                          <Mail className="w-3.5 h-3.5 text-[#401A22]" />
                          <span>Your Email</span>
                          <span className="text-[#401A22]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({ ...formState, email: e.target.value })
                          }
                          placeholder="alex@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-[#C6A77A]/40 text-[#211817] placeholder-[#211817]/45 text-sm focus:outline-none focus:border-[#401A22] focus:ring-2 focus:ring-[#54283F]/20 transition-all font-sans font-medium"
                        />
                      </div>
                    </div>

                    {/* Row 2: Subject */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#211817]/85">
                        <FileText className="w-3.5 h-3.5 text-[#401A22]" />
                        <span>Subject</span>
                      </label>
                      <input
                        type="text"
                        value={formState.subject}
                        onChange={(e) =>
                          setFormState({ ...formState, subject: e.target.value })
                        }
                        placeholder="Project Inquiry / Collaboration / Other"
                        className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-[#C6A77A]/40 text-[#211817] placeholder-[#211817]/45 text-sm focus:outline-none focus:border-[#401A22] focus:ring-2 focus:ring-[#54283F]/20 transition-all font-sans font-medium"
                      />
                    </div>

                    {/* Row 3: Message */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#211817]/85">
                        <MessageSquare className="w-3.5 h-3.5 text-[#401A22]" />
                        <span>Message</span>
                        <span className="text-[#401A22]">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({ ...formState, message: e.target.value })
                        }
                        placeholder="Tell me about your project, timeline, or just say hello..."
                        className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-[#C6A77A]/40 text-[#211817] placeholder-[#211817]/45 text-sm focus:outline-none focus:border-[#401A22] focus:ring-2 focus:ring-[#54283F]/20 transition-all font-sans font-medium resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full py-3.5 sm:py-4 px-6 rounded-full font-sans font-bold text-sm sm:text-base text-[#F5E9DF] bg-[#401A22] hover:bg-[#54283F] shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 rounded-full border-2 border-[#C6A77A] border-t-transparent animate-spin" />
                            <span>Sending message...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4 text-[#C6A77A]" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>


        {/* =========================================================================
            BOTTOM DIVIDER & QUOTE + BOTTOM RIGHT DOODLE
        ========================================================================= */}
        <div className="relative mt-20 pt-10 border-t border-[#C6A77A]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Centered / Left Motto: —— I'M ALWAYS OPEN TO NEW IDEAS. —— */}
          <div className="w-full text-center md:text-left">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#F5E9DF]/70 font-semibold">
              —— I&apos;M ALWAYS OPEN TO NEW IDEAS. ——
            </span>
          </div>

          {/* Bottom Right Handwritten Doodle: "Let's ✈ Create Together ♡" */}
          <motion.div
            initial={{ opacity: 0, rotate: 2 }}
            whileInView={{ opacity: 1, rotate: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 select-none shrink-0"
          >
            {/* Hand-drawn curved arrow SVG pointing up/left */}
            <svg
              width="40"
              height="36"
              viewBox="0 0 40 36"
              fill="none"
              className="text-[#C6A77A] -scale-x-100 -rotate-45"
            >
              <path
                d="M4 4 C14 8, 26 14, 28 26"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="2 3"
              />
              <path
                d="M20 25 L28 26 L29 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="font-handwriting text-2xl sm:text-3xl text-[#F5E9DF] font-bold whitespace-nowrap">
              Let&apos;s ✈ Create Together ♡
            </span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

export default ContactSection;
