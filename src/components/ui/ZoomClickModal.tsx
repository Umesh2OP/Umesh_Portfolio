import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomOut, ExternalLink, Code2 } from 'lucide-react';

export interface ZoomItemData {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  videoUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  techStack?: string[];
  metrics?: { label: string; value: string }[];
}

interface ZoomClickModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ZoomItemData | null;
}

export function ZoomClickModal({ isOpen, onClose, data }: ZoomClickModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
          
          {/* Backdrop Blur Overlay with Click Zoom-out trigger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl cursor-zoom-out z-0"
          />

          {/* 3D Cinematic Zoom In / Zoom Out Card Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.25, rotateX: 20, y: 80 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.25, rotateX: -15, y: 60 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1400px',
            }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[#09090b] text-white rounded-[28px] sm:rounded-[36px] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
          >
            
            {/* Top Modal HUD Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/60 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-orange animate-pulse" />
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-neutral-300">
                  3D CINEMATIC ZOOM FOCUS // {data.category}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block text-[9px] font-mono text-neutral-400 uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                  ESC to Zoom Out
                </span>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close Zoom Modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Media Preview (Video or Image) */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video group">
                {data.videoUrl ? (
                  <video
                    src={data.videoUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-cover"
                  />
                ) : data.image ? (
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-900 to-black text-neutral-500 font-mono text-xs">
                    Media Frame Preview
                  </div>
                )}
                
                <div className="absolute top-4 left-4 pointer-events-none">
                  <span className="text-[9px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-orange border border-orange/30">
                    INTERACTIVE FOCUS
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-orange uppercase tracking-wider block mb-1">
                      {data.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {data.title}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    {data.demoUrl && (
                      <a
                        href={data.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-orange hover:bg-orange/90 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {data.githubUrl && (
                      <a
                        href={data.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 border border-white/10 transition-all hover:scale-105"
                      >
                        <span>Code</span>
                        <Code2 className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed font-sans font-medium pt-2">
                  {data.description}
                </p>
              </div>

              {/* Tech Stack Pills */}
              {data.techStack && data.techStack.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 block mb-2">
                    [ Technologies & Architecture ]
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {data.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Metrics Grid */}
              {data.metrics && data.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  {data.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1"
                    >
                      <span className="text-[10px] font-mono text-neutral-400 block uppercase">
                        {metric.label}
                      </span>
                      <span className="text-xl font-mono font-extrabold text-orange">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Bottom Footer Bar */}
            <div className="px-6 py-4 border-t border-white/10 bg-black/60 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>CLICK BACKDROP TO ZOOM OUT</span>
              <button
                onClick={onClose}
                className="text-orange hover:underline font-bold uppercase flex items-center gap-1 cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
                <span>Zoom Out</span>
              </button>
            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}

export default ZoomClickModal;
