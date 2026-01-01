import { Home, Target, BookOpen, TrendingUp, Users, Crosshair, Library } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon?: LucideIcon;
}

// Full menu for sidebar/hamburger menu
export const menuLinks: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/sessions", label: "Sessions" },
  { to: "/stories", label: "Heritage Stories" },
  { to: "/library", label: "Classical Library" },
  { to: "/analyze", label: "Technique Analysis" },
  { to: "/progress", label: "My Progress" },
  { to: "/equipment", label: "Equipment" },
  { to: "/community", label: "Community" },
  { to: "/credits", label: "Credits" },
];

// Bottom nav items for mobile
export const bottomNavItems: NavItem[] = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/sessions", icon: Target, label: "Sessions" },
  { to: "/stories", icon: BookOpen, label: "Stories" },
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
    label: "New Session",
    description: "AI-generated training plans based on classical manuscripts",
    accent: "accent",
  },
  {
    to: "/analyze",
    icon: Crosshair,
    label: "Analyze",
    description: "Upload your form for AI technique analysis",
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
    label: "Library",
    description: "Browse classical archery manuscripts",
    accent: "primary",
  },
];
