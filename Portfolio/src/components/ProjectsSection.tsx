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
import { PROJECTS, type Project } from "../data/projects";
import { SplineText3D } from "./ui/SplineText3D";

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

/* ---------- Main Component ---------- */
export function ProjectsSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking with smooth spring
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 220, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const cardWidth = 384;
    const cardHeight = 288;
    const offsetX = 28;
    const offsetY = 28;

    let targetX = e.clientX + offsetX;
    let targetY = e.clientY + offsetY;

    if (targetX + cardWidth > window.innerWidth) {
      targetX = e.clientX - cardWidth - offsetX;
    }
    if (targetY + cardHeight > window.innerHeight) {
      targetY = e.clientY - cardHeight - offsetY;
    }

    mouseX.set(targetX);
    mouseY.set(targetY);
  };

  const activeProject = PROJECTS.find((p) => p.id === activeId);

  return (
    <section
      id="projects"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full cursor-default overflow-hidden bg-[#401A22] px-6 py-28 text-[#F5E9DF] md:px-12"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(198,167,122,0.12),transparent_70%)]" />

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
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#C6A77A]/40 bg-[#54283F]/70 px-3.5 py-1 text-xs font-mono tracking-widest text-[#F5E9DF] shadow-2xs">
              <Sparkles className="h-3 w-3 text-[#C6A77A]" />
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            <SplineText3D
              segments={[
                { text: "Selected " },
                { text: "Projects", className: "text-[#C6A77A]" },
              ]}
              as="h2"
              className="text-5xl font-editorial font-normal tracking-tight text-[#F5E9DF] sm:text-7xl md:text-8xl lg:text-9xl"
            />
          </div>

          <div className="mx-8 hidden h-px flex-1 bg-[#C6A77A]/25 md:block" />

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C6A77A] animate-pulse" />
            <p className="text-xs font-mono font-medium uppercase tracking-[0.3em] text-[#B78C8E]">
              Featured Work ({PROJECTS.length})
            </p>
          </div>
        </motion.header>

        {/* The Kinetic Projects List */}
        <div className="flex flex-col">
          {PROJECTS.map((project, index) => (
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
                className="relative h-72 w-96 overflow-hidden rounded-2xl border border-[#C6A77A]/40 bg-[#211817]/98 shadow-2xl backdrop-blur-md text-[#F5E9DF]"
              >
                {/* Preview Image */}
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Top Badge: Category & Status */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-black/80 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-[#F5E9DF] backdrop-blur-md border border-[#C6A77A]/35">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C6A77A] animate-pulse" />
                    <span>{activeProject.category}</span>
                  </div>

                  <span className="rounded-full bg-black/80 px-2 py-0.5 text-[10px] font-mono text-[#B78C8E] backdrop-blur-md border border-white/10">
                    0{PROJECTS.findIndex((p) => p.id === activeProject.id) + 1}
                  </span>
                </div>

                {/* Bottom Overlay Info & Technologies */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/85 to-transparent p-5 pt-12">
                  <h4 className="text-base font-editorial font-medium text-white tracking-wide mb-1">
                    {activeProject.title}
                  </h4>
                  <p className="line-clamp-2 text-xs text-[#F5E9DF]/80 leading-relaxed mb-3 font-sans">
                    {activeProject.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1 max-w-[220px]">
                      {activeProject.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-[#54283F]/80 px-2 py-0.5 text-[9px] font-mono text-[#F5E9DF] border border-[#C6A77A]/25"
                        >
                          {tech}
                        </span>
                      ))}
                      {activeProject.technologies.length > 3 && (
                        <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[9px] font-mono text-neutral-300">
                          +{activeProject.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="inline-flex items-center gap-1 text-[11px] font-medium text-[#C6A77A]">
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
        opacity: isDimmed ? 0.3 : 1,
        y: 0,
        backgroundColor:
          isActive && isMobile ? "rgba(84,40,63,0.35)" : "transparent",
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      onMouseEnter={() => !isMobile && setActiveId(project.id)}
      onMouseLeave={() => !isMobile && setActiveId(null)}
      onClick={handleRowClick}
      className={`group relative border-t border-[#54283F]/80 transition-colors duration-300 last:border-b ${
        isMobile ? "cursor-pointer" : "cursor-pointer md:cursor-default"
      }`}
    >
      <div className="relative z-10 flex flex-col py-7 md:flex-row md:items-center md:justify-between md:py-10">
        {/* Number & Title */}
        <div className="flex items-baseline gap-5 pl-2 transition-transform duration-500 group-hover:translate-x-3 md:gap-10 md:pl-0 md:group-hover:translate-x-6">
          <span className="font-mono text-xs text-[#B78C8E] group-hover:text-[#C6A77A] transition-colors">
            0{index + 1}
          </span>
          <h3 className="text-2xl font-editorial font-normal tracking-tight text-[#F5E9DF] transition-colors duration-300 group-hover:text-[#C6A77A] sm:text-3xl md:text-5xl lg:text-6xl">
            {project.title}
          </h3>
        </div>

        {/* Category & Actions */}
        <div className="mt-4 flex items-center justify-between pl-10 pr-2 md:mt-0 md:justify-end md:gap-8 md:pl-0 md:pr-0">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B78C8E] transition-colors group-hover:text-[#F5E9DF]">
            {project.category}
          </span>

          {/* Mobile Accordion Toggle Icon */}
          <div className="block text-[#B78C8E] md:hidden">
            {isActive ? <Minus size={18} /> : <Plus size={18} />}
          </div>

          {/* Desktop Arrow & Direct Links */}
          <div className="hidden items-center gap-3 md:flex">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="View Source on GitHub"
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-[#B78C8E] hover:text-[#C6A77A] hover:bg-[#54283F]/50 rounded-full"
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
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-[#B78C8E] hover:text-[#C6A77A] hover:bg-[#54283F]/50 rounded-full"
              >
                <ExternalLink size={18} />
              </a>
            )}

            <motion.div
              animate={{
                x: isActive ? 0 : -8,
                opacity: isActive ? 1 : 0.45,
              }}
              transition={{ duration: 0.2 }}
              className="text-[#B78C8E] group-hover:text-[#C6A77A]"
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
            className="overflow-hidden bg-[#211817] border-t border-[#C6A77A]/30 text-[#F5E9DF] rounded-b-xl"
          >
            <div className="p-5 space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-[#C6A77A] border border-white/10 backdrop-blur-xs">
                    {project.category}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    0{index + 1}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#F5E9DF]/80 leading-relaxed font-sans">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-[#54283F]/80 border border-[#C6A77A]/25 px-2.5 py-1 text-[11px] font-mono text-[#F5E9DF]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C6A77A] text-[#211817] text-xs font-semibold hover:bg-[#D4B588] transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C6A77A]/40 text-[#F5E9DF] text-xs font-medium hover:bg-[#54283F]/50 transition-colors"
                  >
                    <GithubIcon size={12} />
                    <span>Source Code</span>
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

export default ProjectsSection;
