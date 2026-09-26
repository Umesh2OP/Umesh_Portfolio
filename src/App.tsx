import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CredibilityPanel } from './components/CredibilityPanel';
import { PhilosophySection } from './components/PhilosophySection';
import { FeaturedWorkSection } from './components/FeaturedWorkSection';
import { SystemDesignSection } from './components/SystemDesignSection';
import { ServicesSection } from './components/ServicesSection';
import { TechnicalEcosystem } from './components/TechnicalEcosystem';
import { ExperienceSection } from './components/ExperienceSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LusionBackgroundCanvas } from './components/3d/LusionBackgroundCanvas';
import { LusionCursor } from './components/ui/LusionCursor';
import { LusionLabsController, ShaderMode } from './components/ui/LusionLabsController';
import { SmoothSectionTransition } from './components/ui/SmoothSectionTransition';

export function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [shaderMode, setShaderMode] = useState<ShaderMode>('fluid');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerSectionWipe = () => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 900);
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }

      // Track active section for Lusion 3D Background palette and geometry morphing
      const sections = [
        { id: 'home', name: 'hero' },
        { id: 'credibility', name: 'credibility' },
        { id: 'philosophy', name: 'philosophy' },
        { id: 'work', name: 'work' },
        { id: 'architecture', name: 'system' },
        { id: 'capabilities', name: 'services' },
        { id: 'services', name: 'services' },
        { id: 'experience', name: 'experience' },
        { id: 'about', name: 'about' },
        { id: 'contact', name: 'contact' },
      ];

      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
          document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-cream text-ink font-sans selection:bg-orange selection:text-white overflow-x-hidden">
      {/* Interactive Global WebGL 3D Background Canvas */}
      <LusionBackgroundCanvas
        activeSection={activeSection}
        shaderMode={shaderMode}
        isTransitioning={isTransitioning}
      />

      {/* Lusion Magnetic Custom Pointer & Particle Trail */}
      <LusionCursor />

      {/* Lusion Labs 3D Shader Mode Switcher Widget */}
      <LusionLabsController
        currentMode={shaderMode}
        onModeChange={(mode) => {
          setShaderMode(mode);
          triggerSectionWipe();
        }}
        onTriggerWipe={triggerSectionWipe}
      />

      {/* Top Scroll Progress Indicator Bar */}
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Sticky Mac-Style Navigation Header */}
      <Navbar />

      {/* Main Content Sections with Smooth Animated Transitions */}
      <main className="relative z-10">
        <SmoothSectionTransition id="home">
          <HeroSection />
        </SmoothSectionTransition>
        <SmoothSectionTransition id="credibility" sectionNumber="01" sectionTitle="METRICS & IMPACT">
          <CredibilityPanel />
        </SmoothSectionTransition>
        <SmoothSectionTransition id="philosophy" sectionNumber="02" sectionTitle="ENGINEERING MANIFESTO">
          <PhilosophySection />
        </SmoothSectionTransition>
        <SmoothSectionTransition id="work" sectionNumber="03" sectionTitle="FEATURED PROJECTS & SYSTEMS">
          <FeaturedWorkSection />
        </SmoothSectionTransition>
        <SmoothSectionTransition id="architecture" sectionNumber="04" sectionTitle="3D ARCHITECTURE TOPOLOGY">
          <SystemDesignSection />
        </SmoothSectionTransition>
        <SmoothSectionTransition id="capabilities" sectionNumber="05" sectionTitle="TECHNICAL ECOSYSTEM">
          <TechnicalEcosystem />
        </SmoothSectionTransition>
        <SmoothSectionTransition id="services" sectionNumber="06" sectionTitle="CAPABILITIES & SERVICES">
          <ServicesSection />
        </SmoothSectionTransition>
        <SmoothSectionTransition id="experience" sectionNumber="07" sectionTitle="CAREER TRAJECTORY">
          <ExperienceSection />
        </SmoothSectionTransition>
        <SmoothSectionTransition id="about" sectionNumber="08" sectionTitle="PRODUCT DEVELOPMENT MINDSET">
          <AboutSection />
        </SmoothSectionTransition>
        <SmoothSectionTransition id="contact" sectionNumber="09" sectionTitle="INITIATE COLLABORATION">
          <ContactSection />
        </SmoothSectionTransition>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;


