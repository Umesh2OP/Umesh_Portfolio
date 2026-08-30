import React from 'react';
import { SERVICES_DATA } from '../data/portfolioData';
import { Layout, Server, Cpu, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ServicesSection: React.FC = () => {
  const getIcon = (name: string, category: string) => {
    let colorClass = "text-orange";
    let bgClass = "bg-orange-soft/40 border-orange-soft/75";
    
    if (category.toLowerCase().includes('backend') || name === 'Server') {
      colorClass = "text-green";
      bgClass = "bg-green-soft/50 border-green-soft/75";
    } else if (category.toLowerCase().includes('core') || name === 'Cpu') {
      colorClass = "text-purple";
      bgClass = "bg-purple-soft/50 border-purple-soft/75";
    }

    const iconProps = { className: `w-6 h-6 ${colorClass}` };
    
    let renderedIcon = <Layout {...iconProps} />;
    if (name === 'Server') renderedIcon = <Server {...iconProps} />;
    if (name === 'Cpu') renderedIcon = <Cpu {...iconProps} />;

    return (
      <div className={`p-3 rounded-xl border ${bgClass} transition-colors select-none`}>
        {renderedIcon}
      </div>
    );
  };

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <section id="services" className="py-20 bg-cream relative select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mb-16"
        >
          <span className="eyebrow text-purple">Capabilities & Services</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-ink mt-2">
            What I can build for your business.
          </h2>

          <p className="text-base text-ink-soft mt-3 leading-relaxed font-sans select-text font-medium">
            Whether you are a startup building a new software product or a business converting manual workflows into high-throughput digital systems, I engineer production-grade solutions.
          </p>
        </motion.div>

        {/* 3 Capability Cards Grid */}
        <motion.div
          variants={listContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {SERVICES_DATA.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              className="p-8 rounded-2xl bg-white border border-line-strong hover:border-orange/40 transition-all duration-300 shadow-[0_8px_30px_rgba(28,26,34,0.02)] flex flex-col justify-between group select-text"
            >
              <div>
                <div className="flex items-center justify-between mb-6 select-none">
                  {getIcon(service.iconName, service.category)}
                  <span className="text-[10px] font-bold text-purple bg-purple-soft/40 px-2.5 py-1 rounded-full border border-purple-soft/75 uppercase tracking-wider">
                    {service.category.split(' ')[0]}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-ink mb-3 group-hover:text-orange transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-ink-soft leading-relaxed mb-6 font-sans font-medium">
                  {service.description}
                </p>

                <div className="pt-4 border-t border-line">
                  <span className="text-[10px] font-bold text-ink-soft block mb-3 uppercase tracking-wider select-none">
                    [Technical Capabilities]
                  </span>

                  <ul className="space-y-2.5">
                    {service.capabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-ink font-sans">
                        <CheckCircle2 className="w-4 h-4 text-green shrink-0 mt-0.5 select-none" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-line select-none">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-purple hover:text-orange transition-colors"
                >
                  <span>Discuss Engineering Proposal</span>
                  <span>→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
