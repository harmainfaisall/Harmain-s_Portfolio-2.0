import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { MessageSquare } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

const NAV_LINKS = [
  { name: "About", href: "#about", shape: "1" },
  { name: "Skills", href: "#skills", shape: "2" },
  { name: "Projects", href: "#projects", shape: "3" },
  { name: "Education", href: "#education", shape: "4" },
  { name: "Contact", href: "#contact", shape: "5" },
];

export function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial GSAP State Setup (no animation on initial load)
  useEffect(() => {
    if (!containerRef.current) return;
    const navWrap = containerRef.current.querySelector(".nav-overlay-wrapper");
    const menu = containerRef.current.querySelector(".menu-content");
    const overlay = containerRef.current.querySelector(".overlay");
    const bgPanels = containerRef.current.querySelectorAll(".backdrop-layer");
    const menuLinks = containerRef.current.querySelectorAll(".nav-link");

    gsap.set(navWrap, { display: "none" });
    gsap.set(menu, { xPercent: 120 });
    gsap.set(overlay, { autoAlpha: 0 });
    gsap.set(bgPanels, { xPercent: 101 });
    gsap.set(menuLinks, { yPercent: 140, rotate: 8, opacity: 0 });
  }, []);

  // GSAP Kinetic Shapes Hover Setup
  useEffect(() => {
    if (!containerRef.current) return;

    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch {
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      const menuItems = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes");

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;

        if (!shape) return;
        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          if (shapesContainer) {
            shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
          }
          shape.classList.add("active");

          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10, transformOrigin: "center center" },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
          );
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => shape.classList.remove("active"),
            overwrite: "auto",
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);

        (item as any)._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
        items.forEach((item: any) => item._cleanup && item._cleanup());
      }
    };
  }, []);

  // GSAP Menu Open/Close Timeline
  useEffect(() => {
    if (!containerRef.current) return;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
      const menu = containerRef.current!.querySelector(".menu-content");
      const overlay = containerRef.current!.querySelector(".overlay");
      const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
      const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
      const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");

      const menuButton = containerRef.current!.querySelector(".nav-close-btn");
      const menuButtonTexts = menuButton?.querySelectorAll("p");
      const menuButtonIcon = menuButton?.querySelector(".menu-button-icon");

      const tl = gsap.timeline();

      if (isMenuOpen) {
        // OPEN
        if (navWrap) navWrap.setAttribute("data-nav", "open");

        tl.set(navWrap, { display: "block" })
          .set(menu, { xPercent: 0 }, "<");

        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.15, duration: 0.45, ease: "power2.inOut" });
        }
        if (menuButtonIcon) {
          tl.fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315, duration: 0.45, ease: "power2.inOut" }, "<");
        }

        tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, "<")
          .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.65, ease: "power3.inOut" }, "<")
          .fromTo(menuLinks, { yPercent: 140, rotate: 8, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, stagger: 0.06, duration: 0.65, ease: "power3.out" }, "<+=0.35");

        if (fadeTargets.length) {
          tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 30 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, duration: 0.4, clearProps: "all" }, "<+=0.15");
        }
      } else {
        // CLOSE
        if (navWrap) navWrap.setAttribute("data-nav", "closed");

        tl.to(overlay, { autoAlpha: 0, duration: 0.35 })
          .to(menu, { xPercent: 120, duration: 0.5, ease: "power2.in" }, "<")
          .to(menuLinks, { yPercent: 80, opacity: 0, duration: 0.25 }, "<");

        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.to(menuButtonTexts, { yPercent: 0, duration: 0.35, ease: "power2.inOut" }, "<");
        }
        if (menuButtonIcon) {
          tl.to(menuButtonIcon, { rotate: 0, duration: 0.35, ease: "power2.inOut" }, "<");
        }

        tl.set(navWrap, { display: "none" })
          .set(bgPanels, { xPercent: 101 });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  // Escape key handling
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div ref={containerRef}>
      {/* ── TOP STICKY HEADER WRAPPER ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-70 transition-all duration-300 ${
          scrolled
            ? "bg-[#F5E9DF]/95 backdrop-blur-md border-b border-[#C6A77A]/30 shadow-xs py-2.5 sm:py-3"
            : "bg-transparent py-3 sm:py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={closeMenu}
            className="transition-transform active:scale-95"
            aria-label="Harmain Faisal Home"
          >
            <BrandLogo variant="navbar" />
          </a>

          {/* Header Right Action Area */}
          <div className="flex items-center gap-3">
            {/* AI Assistant Button */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-ai-chat"))}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-sans font-medium text-[#401A22] hover:text-[#B78C8E] bg-[#FFFFFF] hover:bg-[#F5E9DF] border border-[#C6A77A]/40 hover:border-[#C6A77A] rounded-full shadow-2xs transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#C6A77A]" />
              <span>Assistant</span>
            </button>

            {/* Sterling Gate Kinetic Menu Button */}
            <button
              type="button"
              className="nav-close-btn"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            >
              <div className="menu-button-text">
                <p className="p-large">Menu</p>
                <p className="p-large">Close</p>
              </div>
              <div className="icon-wrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="menu-button-icon"
                >
                  <path
                    d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                    fill="currentColor"
                  />
                  <path
                    d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                    fill="currentColor"
                  />
                  <path
                    d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ── STERLING GATE FULLSCREEN KINETIC MENU OVERLAY ── */}
      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper">
          {/* Dimmed backdrop overlay */}
          <div className="overlay" onClick={closeMenu} />

          {/* Sliding drawer content */}
          <nav className="menu-content">
            <div className="menu-bg">
              {/* Multi-layer sliding curtains */}
              <div className="backdrop-layer first" />
              <div className="backdrop-layer second" />
              <div className="backdrop-layer" />

              {/* Interactive ambient shapes reacting to hover */}
              <div className="ambient-background-shapes">
                {/* Shape 1: Floating circles */}
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(198,167,122,0.22)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(183,140,142,0.2)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(84,40,63,0.35)" />
                  <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(198,167,122,0.25)" />
                </svg>

                {/* Shape 2: Wave pattern */}
                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M0 200 Q100 100, 200 200 T 400 200"
                    stroke="rgba(198,167,122,0.3)"
                    strokeWidth="60"
                    fill="none"
                  />
                  <path
                    className="shape-element"
                    d="M0 280 Q100 180, 200 280 T 400 280"
                    stroke="rgba(183,140,142,0.25)"
                    strokeWidth="40"
                    fill="none"
                  />
                </svg>

                {/* Shape 3: Grid dots */}
                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="50" cy="50" r="8" fill="rgba(198,167,122,0.4)" />
                  <circle className="shape-element" cx="150" cy="50" r="8" fill="rgba(183,140,142,0.4)" />
                  <circle className="shape-element" cx="250" cy="50" r="8" fill="rgba(198,167,122,0.4)" />
                  <circle className="shape-element" cx="350" cy="50" r="8" fill="rgba(183,140,142,0.4)" />
                  <circle className="shape-element" cx="100" cy="150" r="12" fill="rgba(198,167,122,0.35)" />
                  <circle className="shape-element" cx="200" cy="150" r="12" fill="rgba(84,40,63,0.35)" />
                  <circle className="shape-element" cx="300" cy="150" r="12" fill="rgba(198,167,122,0.35)" />
                  <circle className="shape-element" cx="50" cy="250" r="10" fill="rgba(183,140,142,0.4)" />
                  <circle className="shape-element" cx="150" cy="250" r="10" fill="rgba(198,167,122,0.4)" />
                  <circle className="shape-element" cx="250" cy="250" r="10" fill="rgba(84,40,63,0.4)" />
                  <circle className="shape-element" cx="350" cy="250" r="10" fill="rgba(198,167,122,0.4)" />
                </svg>

                {/* Shape 4: Organic blobs */}
                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                    fill="rgba(198,167,122,0.22)"
                  />
                  <path
                    className="shape-element"
                    d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200"
                    fill="rgba(84,40,63,0.25)"
                  />
                </svg>

                {/* Shape 5: Diagonal lines */}
                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none">
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="rgba(198,167,122,0.25)" strokeWidth="30" />
                  <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="rgba(183,140,142,0.2)" strokeWidth="25" />
                  <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="rgba(198,167,122,0.18)" strokeWidth="20" />
                </svg>
              </div>
            </div>

            {/* Menu Links with Staggered Kinetic Typography */}
            <div className="menu-content-wrapper">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C6A77A] font-semibold block mb-4">
                NAVIGATION
              </span>

              <ul className="menu-list">
                {NAV_LINKS.map((link) => (
                  <li key={link.name} className="menu-list-item" data-shape={link.shape}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="nav-link w-inline-block"
                    >
                      <p className="nav-link-text">{link.name}</p>
                      <div className="nav-link-hover-bg" />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Kinetic Menu Footer Details */}
              <div data-menu-fade className="mt-10 pt-6 border-t border-[#C6A77A]/20 flex items-center justify-between text-xs font-mono text-[#B78C8E]">
                <span>HARMAIN FAISAL</span>
                <span className="text-[#C6A77A]">2026 EDITION</span>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}

export default Navbar;
