// Theme configuration for accent colors
// Maps semantic accent names to CSS custom properties

export type AccentType = "primary" | "accent" | "neon-cyan";

export const accentColors: Record<AccentType, string> = {
  primary: "hsl(var(--primary))",
  accent: "hsl(var(--accent))",
  "neon-cyan": "hsl(var(--neon-cyan))",
};

export const getAccentColor = (accent: AccentType): string => {
  return accentColors[accent] || accentColors.primary;
};

// Shadow classes mapped to accent types
export const accentShadows: Record<AccentType, string> = {
  primary: "shadow-neon-orange",
  accent: "shadow-neon-cyan",
  "neon-cyan": "shadow-neon-cyan",
};

// Border classes mapped to accent types
export const accentBorderHover: Record<AccentType, string> = {
  primary: "hover:border-primary/50",
  accent: "hover:border-accent/50",
  "neon-cyan": "hover:border-accent/50",
};
