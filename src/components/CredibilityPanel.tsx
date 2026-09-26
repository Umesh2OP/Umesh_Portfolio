import React from 'react';
import { METRICS_DATA } from '../data/portfolioData';
import { Zap, TrendingUp, ShieldCheck, Cpu, Clock, CheckCircle2, Server, Database, Code, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export const CredibilityPanel: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap': return <Zap className="w-5 h-5 text-orange" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-green" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-purple" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-orange" />;
      case 'Clock': return <Clock className="w-5 h-5 text-purple" />;
      default: return <Zap className="w-5 h-5 text-orange" />;
    }
  };

  const statusPanels = [
    {
      title: "Production Stack",
      icon: <Code className="w-4 h-4 text-orange" />,
      items: ["React 18", "Next.js", "TypeScript", "Node.js", "Express"]
    },
    {
      title: "Systems & Backend",
      icon: <Server className="w-4 h-4 text-green" />,
      items: ["REST APIs", "Redis Caching", "JWT Auth", "Redux Toolkit"]
    },
    {
      title: "Databases & Data",
      icon: <Database className="w-4 h-4 text-purple" />,
      items: ["MongoDB Atlas", "MySQL", "Appwrite", "FastAPI"]
    },
    {
      title: "Deployment & CI/CD",
      icon: <Globe className="w-4 h-4 text-orange" />,
      items: ["Vercel", "Hostinger", "Git / GitHub", "Vite"]
    }
  ];

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-16 bg-cream border-y border-line-strong relative overflow-hidden select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <span className="eyebrow text-purple">Telemetry & Performance</span>
            <h2 className="text-2xl font-bold text-ink mt-1">
              Factual Performance Telemetry
            </h2>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-line-strong rounded-full text-xs font-semibold text-ink-soft shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse"></span>
            <span>Production Metrics</span>
          </div>
        </motion.div>

        {/* Real Metrics Telemetry Grid */}
        <motion.div
          variants={listContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8"
        >
          {METRICS_DATA.map((metric) => (
            <motion.div
              key={metric.id}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-3.5 sm:p-5 rounded-2xl bg-white border border-line-strong hover:border-orange/40 transition-all duration-300 shadow-[0_8px_30px_rgba(28,26,34,0.02)] group flex flex-col justify-between select-text"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4 select-none">
                  <div className="p-1.5 sm:p-2 rounded-xl bg-cream-dim/30 border border-line transition-colors">
                    {getIcon(metric.iconName)}
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-purple bg-purple-soft/40 px-2 py-0.5 rounded-full border border-purple-soft/75 truncate max-w-[80px] sm:max-w-none">
                    {metric.badge.split(' ')[0]}
                  </span>
                </div>

                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-ink tracking-tight group-hover:text-orange transition-colors">
                  {metric.value}
                </div>

                <div className="text-[11px] sm:text-xs font-bold text-ink mt-1 select-none leading-snug">
                  {metric.label}
                </div>
              </div>

              <p className="text-[10px] sm:text-[11px] text-ink-soft mt-2 leading-relaxed font-sans font-medium line-clamp-3 sm:line-clamp-none">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Technical Status Panels Matrix */}
        <motion.div
          variants={listContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statusPanels.map((panel, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-5 rounded-2xl bg-white border border-line-strong font-sans shadow-sm"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink mb-3 pb-2 border-b border-line select-none">
                {panel.icon}
                <span>{panel.title}</span>
              </div>

              <ul className="space-y-2">
                {panel.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center gap-2.5 text-xs font-semibold text-ink-soft select-text">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green shrink-0 select-none" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
