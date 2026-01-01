import { Brain, BookOpen, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: "primary" | "accent" | "neon-cyan";
}

export const features: Feature[] = [
  {
    icon: Brain,
    title: "AI Coaching",
    description: "Deep Thinking mode analyzes your form using classical manuscripts for historically-accurate guidance.",
    accent: "primary",
  },
  {
    icon: BookOpen,
    title: "Classical Manuscripts",
    description: "Access 'Arab Archery', 'Saracen Archery', and Mamluk Furusiyah literature as your knowledge base.",
    accent: "accent",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Track sessions, scores, and earn ranks with XP badges featuring Islamic geometric patterns.",
    accent: "neon-cyan",
  },
];
