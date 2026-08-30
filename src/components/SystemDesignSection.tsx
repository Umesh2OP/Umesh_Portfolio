import React, { useState } from 'react';
import { ARCHITECTURE_NODES } from '../data/portfolioData';
import { Network, Server, Database, Cpu, HardDrive, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SystemDesignSection: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('gateway-layer');

  const selectedNode =
    ARCHITECTURE_NODES.find((n) => n.id === selectedNodeId) || ARCHITECTURE_NODES[1];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'client': return <Network className="w-5 h-5 text-orange" />;
      case 'gateway': return <Server className="w-5 h-5 text-purple" />;
      case 'cache': return <HardDrive className="w-5 h-5 text-green" />;
      case 'service': return <Cpu className="w-5 h-5 text-purple" />;
      case 'database': return <Database className="w-5 h-5 text-green" />;
      default: return <Server className="w-5 h-5 text-orange" />;
    }
  };

  return (
    <section id="architecture" className="py-20 bg-cream border-y border-line-strong relative overflow-hidden select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mb-12"
        >
          <span className="eyebrow text-purple">Infrastructure & Design</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-ink mt-2">
            From interface to infrastructure.
          </h2>
          <p className="text-base text-ink-soft mt-3 leading-relaxed font-sans select-text font-medium">
            An illustrative representation of how I design end-to-end full stack software systems — connecting client interactions to edge routing, rate-limiting middleware, microservice workers, and persisted databases.
          </p>
        </motion.div>

        {/* 3D Visualizer + Telemetry Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          
          {/* Left Column: 2D Conceptual Canvas */}
          <div className="lg:col-span-7">
            <div className="relative p-3.5 pb-5 bg-white border border-line-strong shadow-[0_28px_64px_rgba(31,26,18,0.08)] rounded-xl">
              <div className="absolute inset-[7px] bottom-[26px] border border-orange/45 pointer-events-none z-10" />
              
              <div className="w-full h-[360px] lg:h-[420px] bg-[#FDFBF8] border border-line-strong overflow-hidden relative flex flex-col justify-center gap-2 px-6 py-4 bg-grid-pattern rounded">
                {/* SVG Connections behind the layers */}
                <div className="absolute inset-0 z-0 flex justify-center pointer-events-none">
                  <div className="w-0.5 h-full border-l border-dashed border-orange/30" />
                </div>

                {ARCHITECTURE_NODES.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <motion.button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`relative z-10 w-full flex items-center justify-between p-2.5 rounded-xl border transition-all pointer-events-auto text-left ${
                        isSelected 
                          ? 'bg-[#09090b] border-orange text-white shadow-[0_4px_20px_rgba(156,122,46,0.25)]' 
                          : 'bg-white border-line-strong text-ink hover:border-orange/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-neutral-800' : 'bg-cream-dim/20'}`}>
                          {getNodeIcon(node.type)}
                        </div>
                        <div>
                          <span className={`text-[8px] font-bold uppercase tracking-wider block font-mono ${isSelected ? 'text-orange-soft' : 'text-orange'}`}>
                            {node.tech.split(' · ')[0]}
                          </span>
                          <span className="text-xs font-bold leading-tight block">
                            {node.name}
                          </span>
                        </div>
                      </div>
                      <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-orange text-white' : 'bg-cream-dim/35 text-ink-soft'
                      }`}>
                        {node.latency}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-2.5 flex items-center justify-between font-sans text-[9px] font-semibold tracking-wider text-ink-soft select-none">
                <span>PLATE 02. INTERACTIVE PIPELINE BLUEPRINT</span>
                <span>SELECT ANY LAYER TO INSPECT TELEMETRY</span>
              </div>
            </div>
          </div>

          {/* Right Column: Node Inspector Panel */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-line-strong bg-white p-6 lg:p-8 shadow-sm">
              
              <div className="flex items-center justify-between pb-4 border-b border-line font-sans text-xs text-ink-soft select-none">
                <span className="text-purple font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-orange" />
                  Node Telemetry Inspector
                </span>
                <span className="text-green font-bold">ONLINE</span>
              </div>

              <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedNodeId}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                    className="mt-6 space-y-6 select-text"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-orange uppercase block mb-1 select-none">
                        [Selected Layer]
                      </span>
                      <h3 className="text-2xl font-bold text-ink">
                        {selectedNode.name}
                      </h3>
                      <p className="text-xs font-sans text-ink-soft mt-1">
                        Technology: <span className="text-ink font-semibold">{selectedNode.tech}</span>
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-cream-dim/10 border border-line space-y-3 font-sans text-xs font-semibold text-ink-soft">
                      <div className="flex justify-between items-center pb-2 border-b border-line">
                        <span>Estimated Overhead</span>
                        <span className="text-green font-bold">{selectedNode.latency}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Layer Type</span>
                        <span className="text-orange uppercase font-bold">{selectedNode.type}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-ink-soft uppercase block mb-2 select-none">
                        [Architectural Behavior]
                      </span>
                      <p className="text-sm text-ink-soft leading-relaxed bg-cream-dim/5 p-4 rounded-xl border border-line font-sans font-medium">
                        {selectedNode.details}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-orange-soft/20 border border-orange-soft/60 text-xs font-bold text-orange flex items-center gap-2 select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse"></span>
                      <span>System boundary decoupled with strict type contracts</span>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

        {/* 2D Interactive Layer Switcher Bar */}
        <div className="p-5 rounded-2xl bg-white border border-line-strong font-sans">
          <span className="text-[10px] font-bold text-ink-soft block mb-3 uppercase tracking-wider select-none">
            [Quick Layer Selector]
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {ARCHITECTURE_NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className="relative p-3.5 rounded-xl border border-line text-left text-xs transition-all overflow-hidden"
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeNodeOutline"
                      className="absolute inset-0 bg-cream-dim/30 border border-orange rounded-xl"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-1 select-none">
                      {getNodeIcon(node.type)}
                      <span className="font-bold truncate">{node.name.split(' ')[0]}</span>
                    </div>
                    <span className="text-[10px] text-ink-soft block font-medium select-none">{node.latency}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
