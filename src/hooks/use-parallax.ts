import { useState, useEffect, useCallback } from 'react';

export function useParallax() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const getParallaxStyle = (speed: number = 0.5) => ({
    transform: `translateY(${scrollY * speed}px)`,
  });

  const getOpacityStyle = (fadeStart: number = 0, fadeEnd: number = 400) => ({
    opacity: Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart)),
  });

  return { scrollY, getParallaxStyle, getOpacityStyle };
}
