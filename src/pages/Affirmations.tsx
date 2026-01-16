import { useState } from "react";
import { Sparkles, Bookmark } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { affirmations, DailyAffirmation, getAffirmationForDate } from "@/config/affirmations";
import { useDailyAffirmation } from "@/hooks/use-daily-affirmation";
import { AffirmationBrowseCard } from "@/components/affirmations/AffirmationBrowseCard";
import { DailyAffirmationDialog } from "@/components/affirmations/DailyAffirmationDialog";
import { motion } from "framer-motion";

type FilterCategory = "all" | "hadith" | "wisdom" | "virtue" | "health" | "saved";

export default function Affirmations() {
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [selectedAffirmation, setSelectedAffirmation] = useState<DailyAffirmation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { 
    todayAffirmation, 
    toggleSaveAffirmation, 
    isAffirmationSaved,
    savedAffirmations,
  } = useDailyAffirmation();

  const filteredAffirmations = affirmations.filter((aff) => {
    if (filter === "all") return true;
    if (filter === "saved") return savedAffirmations.includes(aff.id);
    return aff.category === filter;
  });

  // Sort to show today's affirmation first when viewing all
  const sortedAffirmations = [...filteredAffirmations].sort((a, b) => {
    if (a.id === todayAffirmation.id) return -1;
    if (b.id === todayAffirmation.id) return 1;
    return 0;
  });

  const handleCardClick = (affirmation: DailyAffirmation) => {
    setSelectedAffirmation(affirmation);
    setIsDialogOpen(true);
  };

  return (
    <div className="container py-6 animate-fade-in">
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Sunnah Affirmations</h1>
        </div>
        <p className="text-muted-foreground">
          Daily reminders from the archery tradition to inspire your practice
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterCategory)} className="mb-6">
          <TabsList className="flex-wrap h-auto gap-1 bg-muted/50 p-1">
            <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
            <TabsTrigger value="hadith" className="text-xs sm:text-sm">Hadith</TabsTrigger>
            <TabsTrigger value="wisdom" className="text-xs sm:text-sm">Wisdom</TabsTrigger>
            <TabsTrigger value="virtue" className="text-xs sm:text-sm">Virtue</TabsTrigger>
            <TabsTrigger value="health" className="text-xs sm:text-sm">Health</TabsTrigger>
            <TabsTrigger value="saved" className="text-xs sm:text-sm flex items-center gap-1">
              <Bookmark className="h-3 w-3" />
              Saved
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Affirmations Grid */}
      {sortedAffirmations.length === 0 ? (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Bookmark className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">No saved affirmations yet</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Tap the bookmark icon on any affirmation to save it
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedAffirmations.map((affirmation, index) => (
            <motion.div
              key={affirmation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <AffirmationBrowseCard
                affirmation={affirmation}
                isToday={affirmation.id === todayAffirmation.id}
                isSaved={isAffirmationSaved(affirmation.id)}
                onToggleSave={() => toggleSaveAffirmation(affirmation.id)}
                onClick={() => handleCardClick(affirmation)}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Detail Dialog */}
      <DailyAffirmationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        affirmation={selectedAffirmation || todayAffirmation}
        isSaved={isAffirmationSaved(selectedAffirmation?.id || todayAffirmation.id)}
        onToggleSave={() => toggleSaveAffirmation(selectedAffirmation?.id || todayAffirmation.id)}
      />
    </div>
  );
}
