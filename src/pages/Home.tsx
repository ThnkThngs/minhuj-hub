import { HeroSection } from "@/components/home/HeroSection";
import { QuickActions } from "@/components/home/QuickActions";
import { ProgressSummary } from "@/components/home/ProgressSummary";
import { ActiveChallenges } from "@/components/home/ActiveChallenges";
import { EquipmentAlerts } from "@/components/home/EquipmentAlerts";
import { AffirmationTeaser } from "@/components/home/AffirmationTeaser";
import { DailyAffirmationDialog } from "@/components/affirmations/DailyAffirmationDialog";
import { useDailyAffirmation } from "@/hooks/use-daily-affirmation";

export default function Home() {
  const { 
    todayAffirmation, 
    isDialogOpen, 
    openDialog, 
    closeDialog,
    toggleSaveAffirmation,
    isAffirmationSaved,
  } = useDailyAffirmation();

  return (
    <div className="animate-fade-in">
      <HeroSection />
      <QuickActions />
      <div className="container py-8 space-y-6">
        <AffirmationTeaser 
          affirmation={todayAffirmation} 
          onReadMore={openDialog} 
        />
        <ProgressSummary />
        <ActiveChallenges />
        <EquipmentAlerts />
      </div>
      
      <DailyAffirmationDialog
        open={isDialogOpen}
        onOpenChange={(open) => open ? openDialog() : closeDialog()}
        affirmation={todayAffirmation}
        isSaved={isAffirmationSaved(todayAffirmation.id)}
        onToggleSave={() => toggleSaveAffirmation(todayAffirmation.id)}
      />
    </div>
  );
}
