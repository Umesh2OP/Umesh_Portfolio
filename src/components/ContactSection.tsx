import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Send, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GithubIcon = () => (
  <svg className="w-4 h-4 text-orange-soft shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 text-orange-soft shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack Application',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', projectType: 'Full-Stack Application', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-cream relative overflow-hidden border-t border-line-strong select-none">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Dark High-Contrast Contact Panel */}
        <div className="bg-ink text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          
          {/* Subtle internal gradient backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(156,122,46,0.15),transparent_60%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
            
            {/* Left Column: Heading & Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-6 space-y-6"
            >
              <span className="eyebrow text-orange-soft select-none">
                Consultation & Inquiries
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white font-sans">
                Have a problem worth engineering?
              </h2>

              <p className="text-base text-white/70 leading-relaxed max-w-xl font-sans font-medium select-text">
                Whether you are building a product, optimizing an existing web platform, or turning a manual business process into custom software — let's talk about the technical solution.
              </p>

              {/* Direct Channels */}
              <div className="space-y-4 pt-4 font-sans text-xs select-none">
                <motion.a
                  whileHover={{ scale: 1.01 }}
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange/60 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-orange-soft group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="select-text">
                    <span className="text-white/50 block text-[9px] font-bold uppercase tracking-wider select-none">DIRECT EMAIL</span>
                    <span className="text-white font-bold text-sm group-hover:text-orange-soft transition-colors">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                </motion.a>

                <div className="grid grid-cols-2 gap-4">
                  <motion.a
                    whileHover={{ scale: 1.01 }}
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange/65 text-white hover:text-orange-soft transition-all"
                  >
                    <GithubIcon />
                    <span className="font-semibold text-xs">GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-auto text-white/45" />
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.01 }}
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange/65 text-white hover:text-orange-soft transition-all"
                  >
                    <LinkedinIcon />
                    <span className="font-semibold text-xs">LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-auto text-white/45" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Request Form */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-6 w-full"
            >
              <div className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10">
                
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-sans text-xs select-none">
                  <span className="text-orange-soft font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-soft" />
                    Initiate System Conversation
                  </span>
                  <span className="text-green font-bold uppercase tracking-wider text-[9px]">Secure</span>
                </div>

                <div className="overflow-hidden">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="submitted"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="p-8 rounded-xl bg-green-soft/10 border border-green/20 text-center font-sans space-y-3"
                      >
                        <CheckCircle2 className="w-10 h-10 text-green mx-auto animate-bounce" />
                        <h3 className="text-base font-bold text-white">Transmission Received</h3>
                        <p className="text-xs text-white/60 font-medium">
                          Thank you for reaching out. I will review your technical query and get back to you promptly.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="contact-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-4 font-sans text-xs select-text"
                      >
                        <div>
                          <label className="block text-white/50 uppercase font-bold mb-1.5 text-[9px] tracking-wider select-none">
                            Your Name / Company
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Alex Vance (Acme Corp)"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-orange transition-colors font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-white/50 uppercase font-bold mb-1.5 text-[9px] tracking-wider select-none">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="alex@company.com"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-orange transition-colors font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-white/50 uppercase font-bold mb-1.5 text-[9px] tracking-wider select-none">
                            Project Type / Inquiry
                          </label>
                          <select
                            value={formData.projectType}
                            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-[#1F1A12] border border-white/10 text-white focus:outline-none focus:border-orange transition-colors font-medium select-none"
                          >
                            <option value="Full-Stack Application">Full-Stack Application Development</option>
                            <option value="SDE Role Inquiry">Full-time SDE / Engineering Role</option>
                            <option value="API & Performance Optimization">API Architecture & Performance</option>
                            <option value="E-Commerce / Business Solution">E-Commerce & Business Solution</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-white/50 uppercase font-bold mb-1.5 text-[9px] tracking-wider select-none">
                            Problem Statement / Project Details
                          </label>
                          <textarea
                            rows={4}
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Describe the system, target timeline, or engineering problem..."
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-orange transition-colors resize-none font-medium"
                          />
                        </div>

                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="w-full py-4 px-6 rounded-full bg-orange hover:bg-orange/95 text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md shadow-orange/15 transition-all duration-200 select-none cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Inquiry</span>
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
