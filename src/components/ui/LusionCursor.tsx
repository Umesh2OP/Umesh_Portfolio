import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function LusionCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  const posRef = useRef({ x: -100, y: -100 });
  const currentFollowerRef = useRef({ x: -100, y: -100 });
  const velocityRef = useRef({ vx: 0, vy: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    let animFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Magnetic attraction logic
      const target = e.target as HTMLElement | null;
      const magneticElement = target?.closest('[data-magnetic="true"]') as HTMLElement | null;

      let targetX = x;
      let targetY = y;

      if (magneticElement) {
        const rect = magneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = x - centerX;
        const distanceY = y - centerY;

        const pullStrength = 0.2;
        magneticElement.style.transform = `translate3d(${distanceX * pullStrength}px, ${distanceY * pullStrength}px, 0)`;

        targetX = centerX + distanceX * 0.4;
        targetY = centerY + distanceY * 0.4;
      } else {
        document.querySelectorAll('[data-magnetic="true"]').forEach((el) => {
          (el as HTMLElement).style.transform = 'translate3d(0px, 0px, 0px)';
        });
      }

      posRef.current = { x: targetX, y: targetY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }

      // Check hover interactive states
      const isInteractive = !!target?.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      setIsHovered(isInteractive);

      const textAttr = target?.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
      setCursorText(textAttr || null);
    };

    // Smooth direct-DOM physics loop for ring follower (0 React re-renders per frame)
    const updateFollower = () => {
      const ease = 0.22;
      const dx = posRef.current.x - currentFollowerRef.current.x;
      const dy = posRef.current.y - currentFollowerRef.current.y;

      velocityRef.current.vx = dx * ease;
      velocityRef.current.vy = dy * ease;

      currentFollowerRef.current.x += velocityRef.current.vx;
      currentFollowerRef.current.y += velocityRef.current.vy;

      if (followerRef.current) {
        const speedMag = Math.hypot(velocityRef.current.vx, velocityRef.current.vy);
        const angle = Math.atan2(velocityRef.current.vy, velocityRef.current.vx) * (180 / Math.PI);
        const stretch = Math.min(1 + speedMag * 0.012, 1.3);

        followerRef.current.style.transform = `translate3d(${currentFollowerRef.current.x}px, ${currentFollowerRef.current.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scaleX(${stretch})`;
      }

      animFrameId = requestAnimationFrame(updateFollower);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animFrameId = requestAnimationFrame(updateFollower);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameId);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* Main Cursor Dot */}
      <div
        ref={dotRef}
        className={`absolute rounded-full bg-orange transition-opacity duration-150 ease-out ${
          isHovered ? 'opacity-0' : 'opacity-90'
        }`}
        style={{
          width: '8px',
          height: '8px',
          willChange: 'transform',
        }}
      />

      {/* Outer Follower Ring / Magnetic Bubble */}
      <div
        ref={followerRef}
        className={`absolute flex items-center justify-center rounded-full border border-orange/40 bg-cream/20 backdrop-blur-[1px] transition-colors duration-200 ease-out ${
          isHovered ? 'border-orange bg-orange/15 shadow-[0_0_20px_rgba(156,122,46,0.3)]' : ''
        } ${cursorText ? '!w-24 !h-24 !bg-ink !text-cream border-transparent shadow-xl' : 'w-10 h-10'}`}
        style={{
          willChange: 'transform',
        }}
      >
        {cursorText && (
          <span className="text-[10px] font-semibold uppercase tracking-widest text-cream">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}

export default LusionCursor;
