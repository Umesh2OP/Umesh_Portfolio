import React, { useState } from 'react';
import { Sliders, Sparkles, Waves, CircleDot, RefreshCw } from 'lucide-react';

export type ShaderMode = 'quantum' | 'fluid' | 'ribbon';

interface LusionLabsControllerProps {
  currentMode: ShaderMode;
  onModeChange: (mode: ShaderMode) => void;
  onTriggerWipe: () => void;
}

export function LusionLabsController({
  currentMode,
  onModeChange,
  onTriggerWipe,
}: LusionLabsControllerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectMode = (mode: ShaderMode) => {
    onModeChange(mode);
  };

  const handleWipe = () => {
    onTriggerWipe();
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 select-none">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-magnetic="true"
        data-cursor-hover="true"
        aria-label="Open 3D Visualizer Labs Panel"
        className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-ink/90 text-cream border border-orange/40 shadow-xl backdrop-blur-md hover:border-orange hover:bg-ink transition-all duration-300 group"
      >
        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange animate-pulse" />
        <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-neutral-200">
          3D Engine Labs
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-green" />
      </button>

      {/* Control Drawer Popup */}
      {isOpen && (
        <div className="absolute bottom-12 sm:bottom-14 left-0 w-60 sm:w-64 max-w-[calc(100vw-32px)] bg-ink/95 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl text-cream space-y-4 animate-scale-up">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400">
              WebGL Shader Modes
            </span>
            <button
              onClick={handleWipe}
              className="flex items-center gap-1 text-[9px] font-extrabold text-orange hover:text-white uppercase tracking-wider"
            >
              <RefreshCw className="w-3 h-3" />
              <span>3D Wipe</span>
            </button>
          </div>

          <div className="space-y-1.5">
            <button
              onClick={() => handleSelectMode('fluid')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                currentMode === 'fluid'
                  ? 'bg-orange text-white'
                  : 'bg-white/5 text-neutral-300 hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2">
                <Waves className="w-4 h-4" />
                <span>Fluid Liquid Mesh</span>
              </span>
              {currentMode === 'fluid' && <span className="text-[9px]">ACTIVE</span>}
            </button>

            <button
              onClick={() => handleSelectMode('quantum')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                currentMode === 'quantum'
                  ? 'bg-orange text-white'
                  : 'bg-white/5 text-neutral-300 hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Quantum Particle Field</span>
              </span>
              {currentMode === 'quantum' && <span className="text-[9px]">ACTIVE</span>}
            </button>

            <button
              onClick={() => handleSelectMode('ribbon')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                currentMode === 'ribbon'
                  ? 'bg-orange text-white'
                  : 'bg-white/5 text-neutral-300 hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2">
                <CircleDot className="w-4 h-4" />
                <span>Ribbon Wave Geometry</span>
              </span>
              {currentMode === 'ribbon' && <span className="text-[9px]">ACTIVE</span>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LusionLabsController;
