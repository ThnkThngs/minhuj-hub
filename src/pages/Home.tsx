import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { QuickActions } from "@/components/home/QuickActions";
import { ProgressSummary } from "@/components/home/ProgressSummary";
import { ActiveChallenges } from "@/components/home/ActiveChallenges";
import { EquipmentAlerts } from "@/components/home/EquipmentAlerts";

export default function Home() {
  return (
    <div className="animate-fade-in">
      <HeroSection />
      <FeaturesSection />
      <QuickActions />
      <div className="container py-8 space-y-6">
        <ProgressSummary />
        <ActiveChallenges />
        <EquipmentAlerts />
      </div>
    </div>
  );
}
