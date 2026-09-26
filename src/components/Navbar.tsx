import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Wifi, Battery } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [timeString, setTimeString] = useState('');

  // Live Clock for macOS top-right status bar
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      setTimeString(now.toLocaleTimeString('en-US', options).toUpperCase());
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'architecture', 'services', 'experience', 'about', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (activeSection !== section) {
              setActiveSection(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Work', href: '#work' },
    { name: 'Engineering', href: '#architecture' },
    { name: 'Capabilities', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const leftLinks = navLinks.slice(0, 3); // Home, Work, Engineering
  const rightLinks = navLinks.slice(3); // Capabilities, Experience, About, Contact

  return (
    <>
      {/* ================= DESKTOP & TABLET MAC-STYLE NOTCH BAR ================= */}
      <div className="hidden lg:flex fixed top-0 left-0 w-full items-start z-50 pointer-events-none select-none">
        
        {/* Left Side Thin Bar */}
        <div className="h-9 bg-[#09090b] flex-grow flex items-center justify-between px-4 xl:px-6 border-b border-white/[0.08] pointer-events-auto shadow-[0_4px_20px_rgba(0,0,0,0.15)] min-w-0">
          <div className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse shrink-0" />
            <span className="text-[9px] font-extrabold tracking-[0.2em] xl:tracking-[0.25em] font-mono text-neutral-300 uppercase truncate">
              {PERSONAL_INFO.name} OS
            </span>
          </div>
        </div>

        {/* Left Concave S-Curve */}
        <div className="w-5 xl:w-6 h-14 text-[#09090b] fill-current pointer-events-none relative -mt-[0.5px] z-10 shrink-0">
          <svg className="w-full h-full" viewBox="0 0 24 56" preserveAspectRatio="none">
            <path d="M0 32c12 0 12 24 24 24V0H0z" />
            <path d="M0 32c12 0 12 24 24 24" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Center Notch Body */}
        <div className="w-[580px] xl:w-[660px] h-14 bg-[#09090b] flex items-center justify-center px-4 xl:px-8 border-b border-white/[0.08] pointer-events-auto relative z-20 shadow-[0_4px_30px_rgba(0,0,0,0.25)] shrink-0">
          <div className="flex items-center justify-between w-full h-full pt-1.5">
            
            {/* Left Nav Menu */}
            <div className="flex items-center gap-1 xl:gap-2">
              {leftLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    data-magnetic="true"
                    className={`relative px-2.5 xl:px-3 py-1.5 text-[8px] xl:text-[9px] font-extrabold uppercase tracking-wider xl:tracking-widest transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPillDesktop"
                        className="absolute inset-0 bg-white/10 border border-white/5 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Central Brand Star Icon */}
            <div className="flex items-center justify-center px-1 xl:px-2 shrink-0">
              <svg className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-orange fill-current animate-pulse" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>

            {/* Right Nav Menu */}
            <div className="flex items-center gap-1 xl:gap-2">
              {rightLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    data-magnetic="true"
                    className={`relative px-2.5 xl:px-3 py-1.5 text-[8px] xl:text-[9px] font-extrabold uppercase tracking-wider xl:tracking-widest transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPillDesktop"
                        className="absolute inset-0 bg-white/10 border border-white/5 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

          </div>
        </div>

        {/* Right Concave S-Curve */}
        <div className="w-5 xl:w-6 h-14 text-[#09090b] fill-current pointer-events-none relative -mt-[0.5px] z-10 shrink-0">
          <svg className="w-full h-full" viewBox="0 0 24 56" preserveAspectRatio="none">
            <path d="M0 56c12 0 12-24 24-24V0H0z" />
            <path d="M0 56c12 0 12-24 24-24" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Right Side Thin Bar */}
        <div className="h-9 bg-[#09090b] flex-grow flex items-center justify-end px-4 xl:px-6 border-b border-white/[0.08] pointer-events-auto shadow-[0_4px_20px_rgba(0,0,0,0.15)] min-w-0">
          <div className="flex items-center gap-3 xl:gap-4 text-neutral-400 text-[10px] font-mono shrink-0">
            <Wifi className="w-3.5 h-3.5 hover:text-white transition-colors cursor-pointer hidden sm:block" />
            <div className="flex items-center gap-1">
              <Battery className="w-4 h-4 text-orange hover:text-white transition-colors cursor-pointer" />
              <span className="text-[8px] font-bold text-neutral-500">100%</span>
            </div>
            <span className="text-neutral-300 font-bold uppercase tracking-wider text-[9px] xl:text-[10px]">{timeString}</span>
          </div>
        </div>

      </div>

      {/* ================= MOBILE DYNAMIC ISLAND MENU ================= */}
      <div className="lg:hidden fixed top-2 left-0 w-full flex justify-center z-50 pointer-events-none select-none">
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.15 }}
          layout
          className="relative w-[94%] max-w-md bg-[#09090b] text-neutral-200 border border-neutral-800/80 rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto"
        >
          {/* Simulated iPhone Camera & Sensor Array */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/80 border border-white/5 pointer-events-none select-none z-30">
            <div className="w-6 h-1 rounded-full bg-neutral-900 border border-neutral-800/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#0a0f1d] border border-neutral-800/60 shadow-[inset_0_0.5px_1px_rgba(255,255,255,0.2)] flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-[#18356c] opacity-60" />
            </div>
            <div className="w-1 h-1 rounded-full bg-[#30d158] shadow-[0_0_6px_#30d158] animate-pulse" />
          </div>

          {/* Mobile Inner Header Area */}
          <div className="px-4 sm:px-5 pt-5 pb-3 flex items-center justify-between h-14">
            {/* Brand/Logo */}
            <a href="#home" className="font-bold text-white text-[10px] sm:text-[11px] tracking-widest uppercase flex items-center gap-2 select-none z-20 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse shrink-0" />
              <span className="truncate">{PERSONAL_INFO.name}</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 z-20 shrink-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer (Dynamic Island morphing expansion) */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="border-t border-neutral-900 bg-[#09090b] px-5 py-4 space-y-1 z-20 max-h-[calc(100vh-90px)] overflow-y-auto"
              >
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-widest rounded-xl transition-colors ${
                        isActive ? 'text-white bg-white/10' : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center mt-3 bg-orange hover:bg-orange/95 text-white font-extrabold uppercase tracking-widest py-3 rounded-xl text-[10px]"
                >
                  Start Project →
                </a>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </>
  );
};



