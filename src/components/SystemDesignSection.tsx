import React, { useState } from 'react';
import { ARCHITECTURE_NODES } from '../data/portfolioData';
import { Network, Server, Database, Cpu, HardDrive } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SystemDesignSection: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('gateway-layer');

  const selectedNode =
    ARCHITECTURE_NODES.find((n) => n.id === selectedNodeId) ?? ARCHITECTURE_NODES[1];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'client':   return <Network   className="w-4 h-4 text-accent" />;
      case 'gateway':  return <Server    className="w-4 h-4 text-accent" />;
      case 'cache':    return <HardDrive className="w-4 h-4 text-accent" />;
      case 'service':  return <Cpu       className="w-4 h-4 text-accent" />;
      case 'database': return <Database  className="w-4 h-4 text-accent" />;
      default:         return <Server    className="w-4 h-4 text-accent" />;
    }
  };

  return (
    <section id="architecture" className="py-20 md:py-28 bg-bg border-t border-line">
      <div className="container-editorial">

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="text-label mb-3">System architecture</p>
          <h2 className="text-heading">From interface to infrastructure.</h2>
          <p className="text-body mt-4 max-w-lg">
            An interactive blueprint detailing how full-stack systems connect — from client SPA
            to edge routing, rate-limiting middleware, and database persistence.
          </p>
        </motion.div>

        {/* ── Two-column layout ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left: pipeline layer list */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="lg:col-span-7"
          >
            <div className="rounded-xl border border-line overflow-hidden">
              <div className="px-4 py-3 border-b border-line bg-bg-dim">
                <p className="text-2xs mono text-ink-4 uppercase tracking-widest">
                  Pipeline blueprint — select a layer to inspect
                </p>
              </div>
              <div className="divide-y divide-line">
                {ARCHITECTURE_NODES.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-150 ${
                        isSelected
                          ? 'bg-ink'
                          : 'bg-bg hover:bg-bg-dim'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/10' : 'bg-bg-dim border border-line'}`}>
                          {getNodeIcon(node.type)}
                        </div>
                        <div className="text-left">
                          <p className={`text-sm font-medium ${isSelected ? 'text-bg' : 'text-ink'}`}>
                            {node.name}
                          </p>
                          <p className={`text-2xs mono mt-0.5 ${isSelected ? 'text-bg/50' : 'text-ink-4'}`}>
                            {node.tech}
                          </p>
                        </div>
                      </div>
                      <span className={`mono text-2xs px-2.5 py-1 rounded-full border shrink-0 ${
                        isSelected
                          ? 'border-white/20 text-bg/70'
                          : 'border-line-2 text-ink-4'
                      }`}>
                        {node.latency}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right: inspector panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="lg:col-span-5"
          >
            <div className="rounded-xl border border-line bg-bg-card p-6 sticky top-20">
              <div className="flex items-center justify-between pb-4 border-b border-line mb-5">
                <p className="text-sm font-medium text-ink">Layer inspector</p>
                <span className="status-badge">
                  <span className="status-dot" />
                  Online
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedNodeId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-base font-semibold text-ink">{selectedNode.name}</h3>
                    <p className="mono text-2xs text-ink-4 mt-1">{selectedNode.tech}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-bg-dim border border-line">
                      <p className="text-2xs text-ink-4 mb-1">Overhead</p>
                      <p className="text-sm font-semibold text-ink">{selectedNode.latency}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-bg-dim border border-line">
                      <p className="text-2xs text-ink-4 mb-1">Type</p>
                      <p className="text-sm font-semibold text-ink capitalize">{selectedNode.type}</p>
                    </div>
                  </div>

                  <p className="text-sm text-ink-3 leading-relaxed">{selectedNode.details}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default SystemDesignSection;
