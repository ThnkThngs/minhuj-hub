import { 
  Target, 
  Crosshair, 
  Move, 
  Hand, 
  Eye, 
  Wind, 
  Zap, 
  Shield,
  CircleDot,
  Flame,
  type LucideIcon
} from "lucide-react";

export interface Technique {
  id: string;
  title: string;
  arabicTitle?: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "master";
  description: string;
  keyPoints: string[];
  source: string;
  icon: LucideIcon;
  duration?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: "primary" | "accent" | "success" | "destructive";
}

export const categories: Category[] = [
  {
    id: "stance",
    name: "Stance & Posture",
    description: "Foundation techniques for proper body alignment",
    icon: Shield,
    color: "primary",
  },
  {
    id: "draw",
    name: "Drawing",
    description: "Methods for drawing the bow correctly",
    icon: Move,
    color: "accent",
  },
  {
    id: "release",
    name: "Release & Follow-through",
    description: "Techniques for clean release and aim",
    icon: Zap,
    color: "success",
  },
  {
    id: "aiming",
    name: "Aiming Methods",
    description: "Traditional and instinctive aiming",
    icon: Crosshair,
    color: "primary",
  },
  {
    id: "breathing",
    name: "Breathing & Focus",
    description: "Mental preparation and breath control",
    icon: Wind,
    color: "accent",
  },
  {
    id: "advanced",
    name: "Advanced Techniques",
    description: "Master-level combat and speed techniques",
    icon: Flame,
    color: "destructive",
  },
];

export const techniques: Technique[] = [
  // Stance & Posture
  {
    id: "mamluk-stance",
    title: "The Mamluk Stance",
    arabicTitle: "وقفة المملوك",
    category: "stance",
    difficulty: "beginner",
    description: "The foundational standing position used by Mamluk archers, emphasizing balance and stability for accurate shooting.",
    keyPoints: [
      "Feet shoulder-width apart",
      "Weight distributed 60/40",
      "Shoulders relaxed and square to target",
      "Slight bend in knees",
    ],
    source: "Saracen Archery",
    icon: Shield,
    duration: "15 min",
  },
  {
    id: "oblique-stance",
    title: "Oblique Stance",
    arabicTitle: "الوقفة المائلة",
    category: "stance",
    difficulty: "intermediate",
    description: "An angled stance that allows for greater draw length and is preferred for long-distance shooting.",
    keyPoints: [
      "Body at 45-degree angle to target",
      "Rear foot perpendicular to shooting line",
      "Hip rotation provides power",
      "Core engaged throughout",
    ],
    source: "Arab Archery",
    icon: Shield,
    duration: "20 min",
  },
  // Drawing Techniques
  {
    id: "thumb-draw",
    title: "Thumb Draw (Qabda)",
    arabicTitle: "القبضة",
    category: "draw",
    difficulty: "beginner",
    description: "The primary drawing method in Islamic archery, using the thumb to hold the string with the index finger locking over it.",
    keyPoints: [
      "Thumb hooks around string below arrow",
      "Index finger locks over thumb tip",
      "String rests in thumb joint crease",
      "Wrist remains straight",
    ],
    source: "Arab Archery",
    icon: Hand,
    duration: "30 min",
  },
  {
    id: "three-finger-draw",
    title: "Three-Finger Mediterranean",
    category: "draw",
    difficulty: "beginner",
    description: "Alternative drawing technique using three fingers, adapted from Western methods but referenced in some manuscripts.",
    keyPoints: [
      "Index finger above arrow nock",
      "Middle and ring fingers below",
      "String in first finger joints",
      "Consistent anchor point",
    ],
    source: "Mamluk Furusiyah Literature",
    icon: Hand,
    duration: "25 min",
  },
  {
    id: "khatra-draw",
    title: "Khatra Draw Technique",
    arabicTitle: "الخطرة",
    category: "draw",
    difficulty: "advanced",
    description: "A dynamic drawing method incorporating a wrist snap for increased arrow speed and penetration power.",
    keyPoints: [
      "Controlled wrist rotation at release",
      "Snap timing is critical",
      "Practice with light arrows first",
      "Develops with muscle memory",
    ],
    source: "Saracen Archery",
    icon: Zap,
    duration: "45 min",
  },
  // Release Techniques
  {
    id: "clean-release",
    title: "The Clean Release",
    arabicTitle: "الإطلاق النظيف",
    category: "release",
    difficulty: "intermediate",
    description: "Fundamental release technique ensuring the string leaves the fingers smoothly without disturbing the arrow's flight.",
    keyPoints: [
      "Gradual relaxation of fingers",
      "No plucking or grabbing",
      "Hand moves straight back",
      "Maintain aim through release",
    ],
    source: "Arab Archery",
    icon: Target,
    duration: "20 min",
  },
  {
    id: "dead-release",
    title: "Dead Release",
    category: "release",
    difficulty: "advanced",
    description: "A release where the drawing hand remains completely still after releasing, maximizing accuracy for precision shots.",
    keyPoints: [
      "Complete stillness at release",
      "No follow-through movement",
      "Requires exceptional control",
      "Used for target shooting",
    ],
    source: "Saracen Archery",
    icon: CircleDot,
    duration: "35 min",
  },
  // Aiming Methods
  {
    id: "instinctive-aiming",
    title: "Instinctive Aiming",
    arabicTitle: "التصويب الفطري",
    category: "aiming",
    difficulty: "intermediate",
    description: "Traditional method where the archer focuses on the target and allows natural coordination to guide the shot.",
    keyPoints: [
      "Focus entirely on target, not arrow",
      "Trust muscle memory",
      "Consistent anchor point essential",
      "Developed through repetition",
    ],
    source: "Arab Archery",
    icon: Eye,
    duration: "40 min",
  },
  {
    id: "gap-shooting",
    title: "Gap Shooting",
    category: "aiming",
    difficulty: "beginner",
    description: "A method using the arrow point as a reference, adjusting for distance by the gap between arrow and target.",
    keyPoints: [
      "Arrow tip used as reference point",
      "Learn gaps for different distances",
      "More conscious than instinctive",
      "Good for beginners",
    ],
    source: "Mamluk Furusiyah Literature",
    icon: Crosshair,
    duration: "25 min",
  },
  // Breathing & Focus
  {
    id: "archer-breath",
    title: "The Archer's Breath",
    arabicTitle: "نَفَس الرامي",
    category: "breathing",
    difficulty: "beginner",
    description: "Controlled breathing pattern that steadies the body and calms the mind before and during the shot.",
    keyPoints: [
      "Deep inhale while drawing",
      "Hold briefly at anchor",
      "Release arrow on exhale",
      "Rhythmic and natural",
    ],
    source: "Arab Archery",
    icon: Wind,
    duration: "15 min",
  },
  {
    id: "meditative-focus",
    title: "Meditative Focus",
    arabicTitle: "التركيز التأملي",
    category: "breathing",
    difficulty: "intermediate",
    description: "Mental preparation techniques derived from Sufi practices, creating a state of calm awareness before shooting.",
    keyPoints: [
      "Clear the mind of distractions",
      "Visualize the perfect shot",
      "Connect intention with action",
      "Present-moment awareness",
    ],
    source: "Mamluk Furusiyah Literature",
    icon: Eye,
    duration: "30 min",
  },
  // Advanced Techniques
  {
    id: "speed-shooting",
    title: "Speed Shooting (Hajiya)",
    arabicTitle: "الهجية",
    category: "advanced",
    difficulty: "master",
    description: "Combat technique for rapid successive shots, firing multiple arrows in quick succession while maintaining accuracy.",
    keyPoints: [
      "Hold multiple arrows in draw hand",
      "Minimal draw for speed",
      "Sacrifice some accuracy for rate",
      "Used in mounted combat",
    ],
    source: "Saracen Archery",
    icon: Flame,
    duration: "60 min",
  },
  {
    id: "lock-release",
    title: "The Lock and Release",
    arabicTitle: "القفل والإطلاق",
    category: "advanced",
    difficulty: "advanced",
    description: "Advanced technique for held shots, maintaining full draw for extended periods while waiting for the optimal moment.",
    keyPoints: [
      "Back tension holds the draw",
      "Arm muscles relaxed",
      "Mental focus prevents fatigue",
      "Release on instinct",
    ],
    source: "Arab Archery",
    icon: Target,
    duration: "40 min",
  },
];

export const difficultyConfig = {
  beginner: { label: "Beginner", color: "bg-success/20 text-success border-success/30" },
  intermediate: { label: "Intermediate", color: "bg-accent/20 text-accent border-accent/30" },
  advanced: { label: "Advanced", color: "bg-primary/20 text-primary border-primary/30" },
  master: { label: "Master", color: "bg-destructive/20 text-destructive border-destructive/30" },
};
