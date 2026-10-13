import { useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { SmoothScroll } from "./components/SmoothScroll";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { MovingTicker } from "./components/MovingTicker";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { FloatingAIChat } from "./components/FloatingAIChat";
import { ProjectsSection } from "./components/ProjectsSection";
import { EducationSection } from "./components/EducationSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";


export function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#F5E9DF] text-[#211817] selection:bg-[#54283F] selection:text-[#F5E9DF]">
      {/* Soft Editorial Film Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-grain z-50 opacity-15 mix-blend-multiply" />

      {/* Lenis Smooth Scroll Engine */}
      <SmoothScroll />

      {/* Cinematic Terminal Boot Loader */}
      {!loadingComplete && (
        <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Main Portfolio Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <MovingTicker />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
        
        {/* Compact Floating Real AI Chatbot Widget */}
        <FloatingAIChat />
      </div>
    </div>
  );
}

export default App;
