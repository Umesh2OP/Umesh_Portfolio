import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-cream-dim/35 border-t border-line-strong py-12 font-sans text-xs text-ink-soft">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Status Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-line-strong">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-line-strong flex items-center justify-center text-orange shadow-sm select-none">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-ink font-bold tracking-wider uppercase">{PERSONAL_INFO.name}</span>
              <p className="text-[11px] text-ink-soft font-semibold">{PERSONAL_INFO.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-line-strong text-ink-soft font-semibold shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span>
              </span>
              <span>SYS_CLOCK: {time || 'UTC LIVE'}</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-white border border-line-strong text-ink hover:text-orange hover:border-orange transition-all duration-200 shadow-sm"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-medium">
          <p className="text-[11px]">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Engineered with React 18, TypeScript, Tailwind CSS & WebGL Canvas.
          </p>

          <div className="flex items-center gap-3 text-[10px] text-ink-soft select-none font-bold uppercase tracking-wider">
            <span className="px-3 py-1 rounded-full bg-orange-soft/20 border border-orange-soft/60 text-orange">
              VITE 6.0
            </span>
            <span className="px-3 py-1 rounded-full bg-green-soft/25 border border-green-soft/60 text-green">
              LIGHTHOUSE 100
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-soft/25 border border-purple-soft/60 text-purple">
              SPRINT 1 READY
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
