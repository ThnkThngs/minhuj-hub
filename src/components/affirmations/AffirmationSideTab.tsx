import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface AffirmationSideTabProps {
  onClick: () => void;
}

export function AffirmationSideTab({ onClick }: AffirmationSideTabProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40
        flex flex-col items-center gap-1 px-2 py-4
        bg-gradient-to-b from-primary/90 to-primary/70
        hover:from-primary hover:to-primary/80
        text-primary-foreground rounded-l-lg
        shadow-[0_0_20px_rgba(var(--primary),0.3)]
        hover:shadow-[0_0_30px_rgba(var(--primary),0.5)]
        transition-all duration-300
        group cursor-pointer"
      aria-label="Open daily affirmation"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-l-lg bg-primary/30 blur-md -z-10"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <Sparkles className="h-5 w-5 group-hover:scale-110 transition-transform" />
      <span
        className="text-xs font-medium writing-mode-vertical"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        Daily
      </span>
    </motion.button>
  );
}
