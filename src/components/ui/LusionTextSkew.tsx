import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LusionTextSkewProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  accentWords?: string[];
}

export function LusionTextSkew({ text, className = '', as = 'h1', accentWords = [] }: LusionTextSkewProps) {
  const [scrollVelocity, setScrollVelocity] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let timer: number;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const velocity = (currentScrollY - lastScrollY) * 0.15;
      const clampedVelocity = Math.max(-12, Math.min(12, velocity));
      setScrollVelocity(clampedVelocity);
      lastScrollY = currentScrollY;

      clearTimeout(timer);
      timer = setTimeout(() => {
        setScrollVelocity(0);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { y: '100%', opacity: 0, rotateX: -60 },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        damping: 14,
      },
    },
  };

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`inline-flex flex-wrap gap-x-[0.25em] gap-y-[0.1em] overflow-hidden ${className}`}
      style={{
        transform: `skewY(${scrollVelocity}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      {words.map((word, wordIdx) => {
        const isAccent = accentWords.some((aw) => word.toLowerCase().includes(aw.toLowerCase()));
        const letters = word.split('');

        return (
          <span key={wordIdx} className="inline-flex overflow-hidden py-1">
            {letters.map((char, charIdx) => (
              <motion.span
                key={charIdx}
                variants={letterVariants}
                className={`inline-block transform-gpu ${
                  isAccent ? 'accent text-orange' : ''
                }`}
              >
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
    </Component>
  );
}

export default LusionTextSkew;
