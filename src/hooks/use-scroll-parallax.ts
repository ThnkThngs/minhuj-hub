import { useParallax } from './use-parallax';
import { useEntranceAnimation } from './use-entrance-animation';

/**
 * Combined hook for scroll parallax effects and entrance animations.
 * Re-exports functionality from split hooks for backward compatibility.
 */
export function useScrollParallax() {
  const { scrollY, getParallaxStyle, getOpacityStyle } = useParallax();
  const isVisible = useEntranceAnimation(100);

  return { scrollY, isVisible, getParallaxStyle, getOpacityStyle };
}
