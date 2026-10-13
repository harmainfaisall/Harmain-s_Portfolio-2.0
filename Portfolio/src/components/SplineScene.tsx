import React, { Component, useState, useRef, useEffect, Suspense, lazy, type ReactNode } from "react";
import type { Application } from "@splinetool/runtime";
import { RefreshCw, AlertCircle } from "lucide-react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface ErrorBoundaryProps {
  fallback: (error: Error, reset: () => void) => ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class SplineErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("Spline 3D Scene notification:", error.message, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.error!, this.reset);
    }
    return this.props.children;
  }
}

interface SplineSceneProps {
  /** URL to the Spline scene (.splinecode file) */
  scene: string;
  /** CSS class applied to the container */
  className?: string;
  /** Optional callback fired when the Spline scene finishes loading */
  onLoad?: (app: Application) => void;
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLoad = (app: Application) => {
    setLoaded(true);
    try {
      // Set the scene background to match the dark hero section background (#121210) exactly
      app.setBackgroundColor("#121210");
    } catch {
      // Fallback gracefully if scene restricts background modification
    }
    if (onLoad) onLoad(app);
  };

  // MutationObserver to hide any "Built with Spline" watermark badge injected into the DOM
  useEffect(() => {
    if (!containerRef.current) return;
    const hideWatermark = () => {
      if (!containerRef.current) return;
      const links = containerRef.current.querySelectorAll("a");
      links.forEach((link) => {
        if (link.href && link.href.includes("spline.design")) {
          link.style.setProperty("display", "none", "important");
          link.style.setProperty("opacity", "0", "important");
          link.style.setProperty("visibility", "hidden", "important");
          link.style.setProperty("pointer-events", "none", "important");
        }
      });
      // Target watermark badge elements
      const elements = containerRef.current.querySelectorAll(
        '[class*="watermark"], [id*="watermark"], #spline-watermark, a'
      );
      elements.forEach((el) => {
        (el as HTMLElement).style.setProperty("display", "none", "important");
        (el as HTMLElement).style.setProperty("opacity", "0", "important");
        (el as HTMLElement).style.setProperty("visibility", "hidden", "important");
      });
    };

    hideWatermark();
    const observer = new MutationObserver(hideWatermark);
    observer.observe(containerRef.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[400px] sm:min-h-[480px] lg:min-h-[550px] flex items-center justify-center overflow-hidden bg-[#121210] ${
        className || ""
      }`}
    >
      {/* Loading state indicator */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 text-[#ECE5C8] bg-[#121210] z-10 pointer-events-none">
          <div className="w-10 h-10 rounded-full border-2 border-[#E9E4A8]/20 border-t-[#E9E4A8] animate-spin" />
          <span className="text-xs font-mono tracking-wider font-medium text-[#ECE5C8]/80">
            STREAMING SPLINE 3D SCENE...
          </span>
        </div>
      )}

      {/* Spline 3D Canvas wrapped in ErrorBoundary */}
      <SplineErrorBoundary
        fallback={(error, reset) => (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#1A1916] border border-[#E9E4A8]/20 rounded-2xl shadow-sm z-20">
            <AlertCircle className="w-8 h-8 text-[#E9E4A8]" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">
                Connecting to Spline 3D Cloud
              </p>
              <p className="text-xs text-[#ECE5C8]/70 max-w-xs font-mono">
                {error.message || "Network stream pending..."}
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E9E4A8] text-[#121210] text-xs font-semibold hover:bg-[#F4EED4] transition-all shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Scene</span>
            </button>
          </div>
        )}
      >
        <Suspense fallback={null}>
          <div
            className={`w-full h-full transition-opacity duration-700 bg-[#121210] ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <Spline scene={scene} onLoad={handleLoad} className="w-full h-full bg-[#121210]" />
          </div>
        </Suspense>
      </SplineErrorBoundary>
    </div>
  );
}

export default SplineScene;
