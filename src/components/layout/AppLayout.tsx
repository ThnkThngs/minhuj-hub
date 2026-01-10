import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { TopHeader } from "./TopHeader";
import { AffirmationSideTab } from "@/components/affirmations/AffirmationSideTab";
import { DailyAffirmationDialog } from "@/components/affirmations/DailyAffirmationDialog";
import { useDailyAffirmation } from "@/hooks/use-daily-affirmation";

export function AppLayout() {
  const {
    todayAffirmation,
    isDialogOpen,
    openDialog,
    closeDialog,
    toggleSaveAffirmation,
    isAffirmationSaved,
  } = useDailyAffirmation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopHeader />
      <main className="flex-1 pt-16 pb-20 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />

      {/* Daily Affirmation Side Tab */}
      <AffirmationSideTab onClick={openDialog} />

      {/* Daily Affirmation Dialog */}
      <DailyAffirmationDialog
        open={isDialogOpen}
        onOpenChange={(open) => (open ? openDialog() : closeDialog())}
        affirmation={todayAffirmation}
        isSaved={isAffirmationSaved(todayAffirmation.id)}
        onToggleSave={() => toggleSaveAffirmation(todayAffirmation.id)}
      />
    </div>
  );
}
