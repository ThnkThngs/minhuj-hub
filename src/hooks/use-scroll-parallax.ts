import { useState, useEffect, useCallback } from 'react';

export function useScrollParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    // Trigger entrance animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [handleScroll]);

  const getParallaxStyle = (speed: number = 0.5) => ({
    transform: `translateY(${scrollY * speed}px)`,
  });

  const getOpacityStyle = (fadeStart: number = 0, fadeEnd: number = 400) => ({
    opacity: Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart)),
  });

  return { scrollY, isVisible, getParallaxStyle, getOpacityStyle };
}
