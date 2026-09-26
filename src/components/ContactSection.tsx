import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Send, CheckCircle2, Sparkles, ArrowDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LusionContact3DCanvas } from './3d/LusionContact3DCanvas';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack Application',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', projectType: 'Full-Stack Application', message: '' });
      setFormDrawerOpen(false);
    }, 3500);
  };

  return (
    <section id="contact" className="relative min-h-[90vh] sm:min-h-screen w-full bg-[#070709] text-white flex flex-col justify-between overflow-hidden select-none">
      
      {/* 3D WebGL Floating Astronaut, Diamonds & Pop Stickers Playground */}
      <LusionContact3DCanvas />

      {/* Top Floating Header Pill Navigation Bar */}
      <div className="relative z-20 px-4 sm:px-12 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange animate-ping" />
          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-300 font-extrabold truncate">
            INQUIRY & COLLABORATION STAGE
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setFormDrawerOpen(!formDrawerOpen);
            }}
            data-magnetic="true"
            className="px-4 sm:px-5 py-2 rounded-full bg-white text-black font-extrabold text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-orange hover:text-white transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <span>LET'S TALK</span>
            <span className="w-1.5 h-1.5 rounded-full bg-orange" />
          </button>
        </div>
      </div>

      {/* Central High-Impact Lusion Kinetic Typography Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center my-auto py-12 pointer-events-none">
        
        {/* Top Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] sm:text-sm font-mono uppercase tracking-[0.25em] sm:tracking-[0.3em] text-neutral-300 mb-4 sm:mb-6 font-bold"
        >
          IS YOUR BIG IDEA READY TO GO WILD?
        </motion.p>

        {/* Giant Headline: "Let's work together!" */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight leading-[0.95] sm:leading-[0.9] font-sans drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        >
          Let's work <br />
          <span className="italic font-serif text-orange-soft font-normal">together!</span>
        </motion.h1>

        {/* Sub-text description & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pointer-events-auto"
        >
          <button
            onClick={() => {
              setFormDrawerOpen(true);
            }}
            data-magnetic="true"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-orange hover:bg-orange/90 text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(156,122,46,0.5)] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            Start a Conversation →
          </button>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            data-magnetic="true"
            className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-widest border border-white/20 backdrop-blur-md transition-all hover:scale-105"
          >
            {PERSONAL_INFO.email}
          </a>
        </motion.div>

      </div>

      {/* Bottom Center Floating Scroll Pill */}
      <div className="relative z-20 pb-8 flex items-center justify-center pointer-events-auto">
        <a
          href="#home"
          data-magnetic="true"
          className="px-6 py-2.5 rounded-full bg-white/90 text-black text-[10px] font-mono font-extrabold uppercase tracking-widest flex items-center gap-2 shadow-xl hover:bg-white transition-transform hover:scale-105"
        >
          <ArrowDown className="w-3.5 h-3.5 text-orange animate-bounce" />
          <span>CONTINUE TO SCROLL</span>
          <ArrowDown className="w-3.5 h-3.5 text-orange animate-bounce" />
        </a>
      </div>

      {/* Interactive Contact Form Modal Drawer */}
      <AnimatePresence>
        {formDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFormDrawerOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl z-0"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative z-10 w-full max-w-xl bg-[#09090b] text-white rounded-[32px] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden p-6 sm:p-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs">
                <span className="text-orange font-extrabold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange" />
                  INITIATE SYSTEM CONVERSATION
                </span>
                <button
                  onClick={() => setFormDrawerOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 font-mono">
                  <CheckCircle2 className="w-12 h-12 text-green mx-auto animate-bounce" />
                  <h3 className="text-xl font-bold text-white">Transmission Received</h3>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                    Thank you for reaching out! I will review your project query and respond promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono select-text">
                  <div>
                    <label className="block text-neutral-400 uppercase font-bold mb-1 tracking-wider text-[10px]">
                      Your Name / Company
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Vance (Acme Corp)"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-orange transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 uppercase font-bold mb-1 tracking-wider text-[10px]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-orange transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 uppercase font-bold mb-1 tracking-wider text-[10px]">
                      Project Type / Inquiry
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#18181b] border border-white/10 text-white focus:outline-none focus:border-orange transition-colors select-none"
                    >
                      <option value="Full-Stack Application">Full-Stack Application Development</option>
                      <option value="SDE Role Inquiry">Full-time SDE / Engineering Role</option>
                      <option value="API & Performance Optimization">API Architecture & Performance</option>
                      <option value="E-Commerce / Business Solution">E-Commerce & Business Solution</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-400 uppercase font-bold mb-1 tracking-wider text-[10px]">
                      Project Overview
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe target system requirements or timeline..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-orange transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-full bg-orange hover:bg-orange/90 text-white font-extrabold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-102 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ContactSection;
