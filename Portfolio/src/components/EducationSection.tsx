import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import DMImage from "../assets/DM.jpg";
import GDCImage from "../assets/GDC.jpg";
import SmitImage from "../assets/smit.png";
import { SplineText3D } from "./ui/SplineText3D";

export function EducationSection() {
  return (
    <section
      id="education"
      className="relative py-20 md:py-28 bg-[#F5E9DF] text-[#211817] overflow-hidden border-t border-[#C6A77A]/30"
    >
      {/* Background Ambient Star & Glow Accents */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#C6A77A]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-[#C6A77A]/15 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between border-b border-[#C6A77A]/30 pb-5 mb-12 text-xs font-mono uppercase tracking-[0.3em] text-[#54283F]"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#C6A77A]">•</span>
            <span className="font-semibold text-[#401A22]">EDUCATION</span>
            <span className="text-[#C6A77A]">•</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">LEARN / GROW / BUILD</span>
            <span className="text-[#C6A77A] text-xs">•</span>
          </div>
        </motion.div>

        {/* Hero Title & Subtitle */}
        <div className="relative mb-14 md:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <SplineText3D
              segments={[
                { text: "My ", className: "italic font-normal text-[#54283F] font-editorial" },
                { text: "Education", className: "font-normal text-[#401A22] font-editorial" },
              ]}
              as="h2"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial tracking-tight text-[#401A22] mb-4"
            />
            <p className="text-sm sm:text-base text-[#54283F] leading-relaxed font-sans">
              A journey of discipline and learning — from academic roots to modern software engineering.
            </p>
          </motion.div>

          {/* Aesthetic Handwritten Callout on Top Right */}
          <motion.div
            initial={{ opacity: 0, rotate: -6, scale: 0.9 }}
            whileInView={{ opacity: 1, rotate: -4, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex flex-col items-center absolute -top-2 right-6 select-none pointer-events-none"
          >
            <span className="font-handwriting text-2xl lg:text-3xl text-[#C6A77A] drop-shadow-2xs leading-tight text-center">
              Better Knowledge<br />Bigger Dreams
            </span>
          </motion.div>
        </div>

        {/* =========================================================================
            MILESTONE 01: Dar ul Madinah Islamic School
        ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-12 md:pb-16 border-b border-[#C6A77A]/25"
        >
          {/* Left: Number + Vertical Line + Content */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
            {/* Big Serif 01 & Year */}
            <div className="flex sm:flex-col items-baseline sm:items-start gap-4 sm:gap-1 shrink-0">
              <span className="text-6xl sm:text-7xl md:text-8xl font-editorial font-light text-[#C6A77A] leading-none select-none tracking-tighter">
                01<span className="text-[#401A22]">.</span>
              </span>
              <div className="text-xs font-mono tracking-widest text-[#B78C8E] sm:mt-2">
                <span>2018</span>
                <span className="inline sm:block text-[#C6A77A]/70 mx-1 sm:my-0.5">—</span>
                <span>2020</span>
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="hidden sm:block w-px self-stretch bg-gradient-to-b from-[#C6A77A]/50 via-[#C6A77A]/30 to-transparent" />

            {/* Information */}
            <div className="space-y-3 pt-1 flex-1">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#B78C8E] block font-semibold">
                MATRICULATION
              </span>

              <h3 className="text-2xl sm:text-3xl font-editorial font-medium text-[#401A22] tracking-tight">
                Dar ul Madinah Islamic School
              </h3>

              <div>
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-sans text-[#401A22] border border-[#C6A77A]/40 bg-[#FFFFFF] shadow-2xs font-medium">
                  Pre-Medical
                </span>
              </div>

              <p className="text-sm text-[#54283F] leading-relaxed max-w-lg font-sans">
                Built my foundation in Islamic values, discipline and basic academic knowledge.
              </p>
            </div>
          </div>

          {/* Right: Architectural Photo Card & Cursive Annotation */}
          <div className="lg:col-span-5 flex items-center justify-start lg:justify-end gap-5 relative">
            <div className="relative group">
              <div className="absolute -inset-1.5 rounded-[28px] rounded-br-[6px] bg-[#EBD7C9] border border-[#C6A77A]/35 shadow-md translate-x-1.5 translate-y-1.5 group-hover:translate-x-2.5 group-hover:translate-y-2.5 transition-transform duration-500" />
              
              <div className="relative w-60 sm:w-68 md:w-72 h-40 sm:h-44 md:h-48 rounded-[24px] rounded-br-[4px] overflow-hidden border border-[#C6A77A]/35 bg-[#FFFFFF] z-10 shadow-md">
                <img
                  src={DMImage}
                  alt="Dar ul Madinah Islamic School"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Handwritten note & curved arrow */}
            <div className="flex flex-col items-start select-none">
              <span className="font-handwriting text-lg sm:text-xl text-[#C6A77A] leading-tight rotate-2 whitespace-nowrap">
                Where<br />it all<br />began
              </span>
              <svg width="32" height="26" viewBox="0 0 40 32" fill="none" className="text-[#C6A77A] mt-1 ml-1">
                <path d="M10 4 C 18 16, 28 22, 36 22 M 28 16 L 36 22 L 28 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            MILESTONE 02: Government Islamia College (Alternating Layout)
        ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 md:py-16 border-b border-[#C6A77A]/25"
        >
          {/* Left: Cursive note + Photo */}
          <div className="lg:col-span-5 flex items-center justify-start gap-5 order-2 lg:order-1">
            <div className="flex flex-col items-end text-right select-none shrink-0">
              <span className="font-handwriting text-lg sm:text-xl text-[#C6A77A] leading-tight rotate-[-2deg]">
                Growth &<br />perspective
              </span>
              <span className="text-[#C6A77A] font-mono text-sm mt-1">—</span>
            </div>

            <div className="relative group/pic flex-1">
              <div className="absolute -inset-1.5 rounded-[28px] rounded-bl-[6px] bg-[#EBD7C9] border border-[#C6A77A]/35 shadow-md -translate-x-1.5 translate-y-1.5 group-hover/pic:-translate-x-2.5 group-hover/pic:translate-y-2.5 transition-transform duration-500" />
              
              <div className="relative w-full max-w-[288px] h-40 sm:h-44 md:h-48 rounded-[24px] rounded-bl-[4px] overflow-hidden border border-[#C6A77A]/35 bg-[#FFFFFF] z-10 shadow-md">
                <img
                  src={GDCImage}
                  alt="Government Islamia College"
                  className="w-full h-full object-cover group-hover/pic:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Center / Right: Details + Milestone 02 */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-start justify-between gap-6 sm:gap-8 order-1 lg:order-2">
            <div className="space-y-3 pt-1 flex-1">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#B78C8E] block font-semibold">
                INTERMEDIATE
              </span>

              <h3 className="text-2xl sm:text-3xl font-editorial font-medium text-[#401A22] tracking-tight">
                Government Islamia College
              </h3>

              <div>
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-sans text-[#401A22] border border-[#C6A77A]/40 bg-[#FFFFFF] shadow-2xs font-medium">
                  Pre-Medical
                </span>
              </div>

              <p className="text-sm text-[#54283F] leading-relaxed max-w-lg font-sans">
                Deepened academic discipline with a focus on Pre-Medical sciences, developing strong focus and dedication.
              </p>
            </div>

            {/* Vertical Separator */}
            <div className="hidden sm:block w-px self-stretch bg-gradient-to-b from-[#C6A77A]/50 via-[#C6A77A]/30 to-transparent" />

            {/* Big Serif 02 & Year */}
            <div className="flex sm:flex-col items-baseline sm:items-end gap-4 sm:gap-1 shrink-0">
              <span className="text-6xl sm:text-7xl md:text-8xl font-editorial font-light text-[#C6A77A] leading-none select-none tracking-tighter">
                <span className="text-[#401A22]">.</span>02
              </span>
              <div className="text-xs font-mono tracking-widest text-[#B78C8E] sm:mt-2 sm:text-right">
                <span>2020</span>
                <span className="inline sm:block text-[#C6A77A]/70 mx-1 sm:my-0.5">—</span>
                <span>2022</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            MILESTONE 03: Saylani Mass IT Training (SMIT)
        ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-12 md:pt-16 pb-16 md:pb-20"
        >
          {/* Left: Number + Vertical Line + Content */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
            {/* Big Serif 03 & Year */}
            <div className="flex sm:flex-col items-baseline sm:items-start gap-4 sm:gap-1 shrink-0">
              <span className="text-6xl sm:text-7xl md:text-8xl font-editorial font-light text-[#C6A77A] leading-none select-none tracking-tighter">
                03<span className="text-[#401A22]">.</span>
              </span>
              <div className="text-xs font-mono tracking-widest text-[#B78C8E] sm:mt-2">
                <span>2022</span>
                <span className="inline sm:block text-[#C6A77A]/70 mx-1 sm:my-0.5">—</span>
                <span>2023</span>
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="hidden sm:block w-px self-stretch bg-gradient-to-b from-[#C6A77A]/50 via-[#C6A77A]/30 to-transparent" />

            {/* Information */}
            <div className="space-y-3 pt-1 flex-1">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#B78C8E] block font-semibold">
                TECHNICAL TRAINING
              </span>

              <h3 className="text-2xl sm:text-3xl font-editorial font-medium text-[#401A22] tracking-tight">
                Saylani Mass IT Training (SMIT)
              </h3>

              <div>
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-sans text-[#401A22] border border-[#C6A77A]/40 bg-[#FFFFFF] shadow-2xs font-medium">
                  Web Development
                </span>
              </div>

              <p className="text-sm text-[#54283F] leading-relaxed max-w-lg font-sans">
                Hands-on practical training in modern software engineering and responsive web development.
              </p>
            </div>
          </div>

          {/* Right: Architectural Photo Card & Cursive Annotation */}
          <div className="lg:col-span-5 flex items-center justify-start lg:justify-end gap-5 relative">
            <div className="relative group">
              <div className="absolute -inset-1.5 rounded-[28px] rounded-br-[6px] bg-[#EBD7C9] border border-[#C6A77A]/35 shadow-md translate-x-1.5 translate-y-1.5 group-hover:translate-x-2.5 group-hover:translate-y-2.5 transition-transform duration-500" />
              
              <div className="relative w-60 sm:w-68 md:w-72 h-40 sm:h-44 md:h-48 rounded-[24px] rounded-br-[4px] overflow-hidden border border-[#C6A77A]/35 bg-[#FFFFFF] z-10 shadow-md">
                <img
                  src={SmitImage}
                  alt="Saylani Mass IT Training (SMIT)"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Handwritten note & curved arrow */}
            <div className="flex flex-col items-start select-none">
              <span className="font-handwriting text-lg sm:text-xl text-[#C6A77A] leading-tight rotate-2 whitespace-nowrap">
                Where<br />code<br />began
              </span>
              <svg width="32" height="26" viewBox="0 0 40 32" fill="none" className="text-[#C6A77A] mt-1 ml-1">
                <path d="M10 4 C 18 16, 28 22, 36 22 M 28 16 L 36 22 L 28 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            BOTTOM MOTTO
        ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative pt-10 border-t border-[#C6A77A]/30 flex flex-col items-center justify-center text-center"
        >
          {/* Subtle Sparkle Divider */}
          <div className="flex items-center gap-4 w-full max-w-xl mb-4 opacity-75">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C6A77A]/50 to-[#C6A77A]" />
            <Sparkles className="w-4 h-4 text-[#C6A77A] animate-pulse" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#C6A77A]/50 to-[#C6A77A]" />
          </div>

          <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-[#54283F] uppercase max-w-xl leading-relaxed">
            EDUCATION GAVE ME THE FOUNDATION.<br />
            <span className="text-[#401A22] font-semibold">CURIOSITY TOOK ME FURTHER.</span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default EducationSection;
