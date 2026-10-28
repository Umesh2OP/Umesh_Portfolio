import { motion, useReducedMotion } from 'framer-motion';
import { Quote } from 'lucide-react';

export function ClientTestimonialSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="testimonials" className="client-review section-pad" aria-labelledby="client-review-heading">
      <div className="container-wide">
        <div className="client-review-heading">
          <p className="eyebrow">Real client review</p>
          <h2 id="client-review-heading" className="section-title">
            Good work is <em>remembered.</em>
          </h2>
        </div>

        <motion.figure
          className="client-review-card"
          initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="client-review-glow client-review-glow-one" aria-hidden="true" />
          <div className="client-review-glow client-review-glow-two" aria-hidden="true" />
          <div className="client-review-panel">
            <div className="client-review-panel-top">
              <span className="client-review-overline">A note from a client</span>
              <span className="client-review-mark"><Quote size={22} strokeWidth={1.6} aria-hidden="true" /></span>
            </div>
            <div className="client-review-orbit" aria-hidden="true">
              <span className="client-review-orbit-ring" />
              <span className="client-review-orbit-core">&lt;/&gt;</span>
              <span className="client-review-orbit-dot" />
            </div>
            <div className="client-review-panel-bottom">
              <span>Thoughtful work.<br />A lasting impression.</span>
              <span className="client-review-panel-index">01 — 01</span>
            </div>
          </div>
          <div className="client-review-content">
            <div className="client-review-topline">
              <span className="client-review-badge"><span /> Real client recommendation</span>
              <span className="client-review-source"><span className="client-review-linkedin-mark" aria-hidden="true">in</span> LinkedIn · Aug 6, 2026</span>
            </div>
            <blockquote>
              “It was a pleasure working with him. He understood my requirements well, delivered quality work, and was responsive throughout the project. Highly recommended.”
            </blockquote>
            <div className="client-review-author">
              <span className="client-review-monogram" aria-hidden="true">SW</span>
              <span className="client-review-author-details">
                <strong>Shrikant Wankhade</strong>
                <span>Senior Information Technology Analyst</span>
                <span>Umesh’s client</span>
              </span>
            </div>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
