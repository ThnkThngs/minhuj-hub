import { Home, Target, BookOpen, TrendingUp, Users, Crosshair, Library, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon?: LucideIcon;
}

// Full menu for sidebar/hamburger menu
export const menuLinks: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/reading", label: "Reading Hub" },
  { to: "/sessions", label: "Sessions" },
  { to: "/stories", label: "Heritage Stories" },
  { to: "/library", label: "Classical Library" },
  { to: "/analyze", label: "Technique Analysis" },
  { to: "/progress", label: "My Progress" },
  { to: "/equipment", label: "Equipment" },
  { to: "/community", label: "Community" },
  { to: "/settings", label: "Settings" },
  { to: "/credits", label: "Credits" },
];

// Bottom nav items for mobile
export const bottomNavItems: NavItem[] = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/reading", icon: BookOpen, label: "Reading" },
  { to: "/sessions", icon: Target, label: "Sessions" },
  { to: "/progress", icon: TrendingUp, label: "Progress" },
  { to: "/community", icon: Users, label: "Community" },
];

// Quick action items for home page
export interface QuickAction {
  to: string;
  icon: LucideIcon;
  label: string;
  description: string;
  accent: "primary" | "accent";
}

export const quickActions: QuickAction[] = [
  {
    to: "/sessions",
    icon: Target,
    label: "Progress Tracking",
    description: "Track sessions, scores, and earn ranks with XP badges featuring Islamic geometric patterns.",
    accent: "accent",
  },
  {
    to: "/analyze",
    icon: Crosshair,
    label: "AI Coaching",
    description: "Deep Thinking mode analyzes your form using classical manuscripts for historically-accurate guidance.",
    accent: "primary",
  },
  {
    to: "/stories",
    icon: BookOpen,
    label: "Heritage Stories",
    description: "Discover tales of the Sahaba and archery tradition",
    accent: "accent",
  },
  {
    to: "/library",
    icon: Library,
    label: "Classical Manuscripts",
    description: "Access 'Arab Archery', 'Saracen Archery', and Mamluk Furusiyah literature as your knowledge base.",
    accent: "primary",
  },
];
