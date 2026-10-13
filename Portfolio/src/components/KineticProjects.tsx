import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  Minus,
  Plus,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { PROJECTS as DEFAULT_PROJECTS, type Project } from "../data/projects";

/* ---------- Icons ---------- */
function GithubIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
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

/* ---------- Component Props ---------- */
export interface KineticProjectsProps {
  projects?: Project[];
  title?: string;
  highlightText?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

/* ---------- Main Component ---------- */
export function KineticProjects({
  projects = DEFAULT_PROJECTS,
  title = "Selected",
  highlightText = "Projects",
  subtitle = "Featured Work",
  badge = "Portfolio Showcase",
  className = "",
}: KineticProjectsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position resources (Smooth floating preview on desktop)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics spring configuration
  const springConfig = { damping: 22, stiffness: 160, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Responsive check for desktop vs mobile interactions
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Update mouse position with viewport edge detection
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;

    const cardWidth = 380;
    const cardHeight = 280;
    const offsetX =
      e.clientX + cardWidth + 30 > window.innerWidth
        ? -(cardWidth + 20)
        : 25;
    const offsetY =
      e.clientY + cardHeight + 30 > window.innerHeight
        ? -(cardHeight - 20)
        : 25;

    mouseX.set(e.clientX + offsetX);
    mouseY.set(e.clientY + offsetY);
  };

  const activeProject = projects.find((p) => p.id === activeId);

  return (
    <section
      id="projects"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen w-full cursor-default overflow-hidden bg-[#121210] border-t border-[#E9E4A8]/15 px-6 py-24 text-white md:px-12 ${className}`}
    >
      {/* Background Ambience & Lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(233,228,168,0.035),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E9E4A8]/20 bg-[#1A1916] px-3 py-1 text-xs font-mono tracking-wider text-[#E9E4A8] backdrop-blur-xs">
              <Sparkles className="h-3 w-3 text-[#E9E4A8]" />
              <span>{badge}</span>
            </div>
            <h2 className="text-4xl font-black font-heading tracking-tighter text-white sm:text-6xl md:text-8xl">
              {title} <span className="text-[#E9E4A8]">{highlightText}</span>
            </h2>
          </div>

          <div className="mx-8 hidden h-px flex-1 bg-neutral-900 md:block" />

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
              {subtitle}
            </p>
          </div>
        </motion.header>

        {/* The Kinetic Projects List */}
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              isActive={activeId === project.id}
              setActiveId={setActiveId}
              isMobile={isMobile}
              isAnyActive={activeId !== null}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP ONLY: Smooth Floating Cursor Preview Card */}
      {!isMobile && (
        <motion.div
          style={{ x: cursorX, y: cursorY }}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
        >
          <AnimatePresence mode="wait">
            {activeProject && (
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                className="relative h-72 w-96 overflow-hidden rounded-2xl border border-white/15 bg-neutral-900/95 shadow-2xl backdrop-blur-md"
              >
                {/* Preview Image */}
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Top Badge: Category & Status */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-white/90 backdrop-blur-md border border-white/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{activeProject.category}</span>
                  </div>

                  <span className="rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-mono text-neutral-300 backdrop-blur-md border border-white/10">
                    0{projects.findIndex((p) => p.id === activeProject.id) + 1}
                  </span>
                </div>

                {/* Bottom Overlay Info & Technologies */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/85 to-transparent p-5 pt-12">
                  <h4 className="text-base font-semibold text-white tracking-tight mb-1">
                    {activeProject.title}
                  </h4>
                  <p className="line-clamp-2 text-xs text-neutral-300 leading-relaxed mb-3">
                    {activeProject.description}
                  </p>

                  <div className="flex items-center justify-between">
                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1 max-w-[220px]">
                      {activeProject.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-white/10 px-2 py-0.5 text-[9px] font-mono text-neutral-200 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                      {activeProject.technologies.length > 3 && (
                        <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[9px] font-mono text-neutral-400">
                          +{activeProject.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                      <span>View Project</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}

/* ---------- Row Component ---------- */
function ProjectRow({
  project,
  index,
  isActive,
  setActiveId,
  isMobile,
  isAnyActive,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  setActiveId: (id: string | null) => void;
  isMobile: boolean;
  isAnyActive: boolean;
}) {
  const isDimmed = isAnyActive && !isActive;

  const handleRowClick = () => {
    if (isMobile) {
      setActiveId(isActive ? null : project.id);
    } else {
      const url = project.liveUrl || project.githubUrl;
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: isDimmed ? 0.25 : 1,
        y: 0,
        backgroundColor:
          isActive && isMobile
            ? "rgba(255,255,255,0.03)"
            : "transparent",
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      onMouseEnter={() => !isMobile && setActiveId(project.id)}
      onMouseLeave={() => !isMobile && setActiveId(null)}
      onClick={handleRowClick}
      className={`group relative border-t border-neutral-900 transition-colors duration-300 last:border-b ${
        isMobile ? "cursor-pointer" : "cursor-pointer md:cursor-default"
      }`}
    >
      <div className="relative z-10 flex flex-col py-7 md:flex-row md:items-center md:justify-between md:py-10">
        {/* Number & Title */}
        <div className="flex items-baseline gap-5 pl-2 transition-transform duration-500 group-hover:translate-x-3 md:gap-10 md:pl-0 md:group-hover:translate-x-6">
          <span className="font-mono text-xs text-neutral-600 group-hover:text-neutral-400 transition-colors">
            0{index + 1}
          </span>
          <h3 className="text-2xl font-light tracking-tight text-neutral-400 transition-colors duration-300 group-hover:text-white sm:text-3xl md:text-5xl lg:text-6xl">
            {project.title}
          </h3>
        </div>

        {/* Category & Actions */}
        <div className="mt-4 flex items-center justify-between pl-10 pr-2 md:mt-0 md:justify-end md:gap-8 md:pl-0 md:pr-0">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 transition-colors group-hover:text-neutral-300">
            {project.category}
          </span>

          {/* Mobile Accordion Toggle Icon */}
          <div className="block text-neutral-400 md:hidden">
            {isActive ? <Minus size={18} /> : <Plus size={18} />}
          </div>

          {/* Desktop Arrow Indicator & Direct Links */}
          <div className="hidden items-center gap-3 md:flex">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="View Source on GitHub"
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full"
              >
                <GithubIcon size={18} />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Live Demo"
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full"
              >
                <ExternalLink size={18} />
              </a>
            )}

            <motion.div
              animate={{
                x: isActive ? 0 : -8,
                opacity: isActive ? 1 : 0.4,
              }}
              transition={{ duration: 0.2 }}
              className="text-neutral-400 group-hover:text-white"
            >
              <ArrowUpRight size={26} strokeWidth={1.5} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* MOBILE ONLY: Inline Accordion Preview */}
      <AnimatePresence>
        {isMobile && isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden bg-neutral-900/60 border-t border-neutral-800/80 rounded-b-xl"
          >
            <div className="p-5 space-y-4">
              {/* Image Banner */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-emerald-400 border border-white/10 backdrop-blur-xs">
                    {project.category}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    0{index + 1}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-neutral-800/80 border border-neutral-700/60 px-2.5 py-1 text-[11px] font-mono text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-neutral-950 transition-colors hover:bg-neutral-200"
                  >
                    <span>View Live</span>
                    <ExternalLink size={14} />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800/80 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-700"
                  >
                    <GithubIcon size={14} />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default KineticProjects;
