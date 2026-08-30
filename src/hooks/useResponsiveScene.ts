import { useState, useEffect } from 'react';

export interface ScenePerformanceConfig {
  isMobile: boolean;
  dpr: number;
  particleCount: number;
  geometrySegments: number;
  enableParallax: boolean;
}

export function useResponsiveScene(): ScenePerformanceConfig {
  const [config, setConfig] = useState<ScenePerformanceConfig>({
    isMobile: false,
    dpr: 1.5,
    particleCount: 24,
    geometrySegments: 32,
    enableParallax: true,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const deviceDpr = window.devicePixelRatio || 1;

      setConfig({
        isMobile,
        dpr: Math.min(deviceDpr, isMobile ? 1.25 : 2),
        particleCount: isMobile ? 10 : 28,
        geometrySegments: isMobile ? 16 : 32,
        enableParallax: !isMobile,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return config;
}
