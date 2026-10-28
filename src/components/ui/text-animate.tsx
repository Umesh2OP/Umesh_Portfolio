import { useRef } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { useIsCompactViewport } from '../../hooks/useIsCompactViewport';

type TextAnimation = 'blurInUp' | 'springCharacter';
type TextAnimationGrouping = 'character' | 'word';

interface TextAnimateProps {
  children: string;
  animation?: TextAnimation;
  by?: TextAnimationGrouping;
  duration?: number;
  delay?: number;
  staggerDelay?: number;
  className?: string;
  variants?: Variants;
}

export function TextAnimate({
  children,
  animation = 'blurInUp',
  by = 'word',
  duration = 0.65,
  delay = 0,
  staggerDelay = 0.025,
  className,
  variants,
}: TextAnimateProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const isCompact = useIsCompactViewport();
  const compactCharacterAnimation = animation === 'springCharacter' && !variants && isCompact;
  const animationVariants: Variants = variants ?? (animation === 'springCharacter'
    ? {
      hidden: compactCharacterAnimation
        ? { opacity: 0, y: 8 }
        : { opacity: 0, y: 14, rotate: 12, scale: 0.96 },
      show: (index: number) => ({
        opacity: 1,
        y: 0,
        rotate: compactCharacterAnimation ? 0 : undefined,
        scale: compactCharacterAnimation ? 1 : undefined,
        transition: {
          delay: delay + index * (compactCharacterAnimation ? Math.min(staggerDelay, 0.012) : Math.min(staggerDelay, 0.035)),
          duration: compactCharacterAnimation ? 0.3 : undefined,
          y: compactCharacterAnimation
            ? { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
            : { type: 'spring', damping: 14, stiffness: 240, mass: 0.65 },
          rotate: compactCharacterAnimation ? undefined : { type: 'spring', damping: 10, stiffness: 180 },
          scale: compactCharacterAnimation ? undefined : { type: 'spring', damping: 12, stiffness: 320 },
        },
      }),
      exit: (index: number) => ({
        opacity: 0,
        y: compactCharacterAnimation ? 8 : 14,
        rotate: compactCharacterAnimation ? 0 : 12,
        scale: compactCharacterAnimation ? 1 : 0.96,
        transition: { delay: delay + index * staggerDelay, duration: Math.min(duration, 0.3) },
      }),
    }
    : {
      hidden: isCompact
        ? { opacity: 0, y: 8 }
        : { opacity: 0, y: 18, filter: 'blur(8px)' },
      show: (index: number) => ({
        opacity: 1,
        y: 0,
        filter: isCompact ? undefined : 'blur(0px)',
        transition: {
          duration: isCompact ? Math.min(duration, 0.35) : duration,
          delay: delay + index * Math.min(staggerDelay, isCompact ? 0.012 : 0.02),
          ease: [0.22, 1, 0.36, 1],
        },
      }),
    });
  let characterSequence = 0;

  if (reduceMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true" style={{ whiteSpace: 'pre-wrap' }}>
        {by === 'character' && !compactCharacterAnimation
          ? Array.from(children.matchAll(/\S+|\s+/g)).map(([unit], wordIndex) => {
            if (/^\s+$/.test(unit)) return unit;

            return (
              <span key={`${unit}-${wordIndex}`} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {Array.from(unit).map((character, characterIndex) => {
                  const index = characterSequence++;
                  return (
                    <motion.span
                      key={`${character}-${characterIndex}`}
                      custom={index}
                      variants={animationVariants}
                      initial="hidden"
                      animate={inView ? 'show' : 'hidden'}
                      style={{ display: 'inline-block' }}
                    >
                      {character}
                    </motion.span>
                  );
                })}
              </span>
            );
          })
          : children.split(/(\s+)/).filter(Boolean).map((unit, index) => (
            <motion.span
              key={`${unit}-${index}`}
              custom={index}
              variants={animationVariants}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              style={{
                display: 'inline-block',
                whiteSpace: 'pre',
                transformOrigin: compactCharacterAnimation ? '50% 80%' : undefined,
              }}
            >
              {unit}
            </motion.span>
          ))}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );
}
