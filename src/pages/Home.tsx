import { QuickActions } from "@/components/home/QuickActions";
import { ProgressSummary } from "@/components/home/ProgressSummary";
import { WelcomeGreeting } from "@/components/home/WelcomeGreeting";
import { ActiveChallenges } from "@/components/home/ActiveChallenges";
import { EquipmentAlerts } from "@/components/home/EquipmentAlerts";

export default function Home() {
  return (
    <div className="container py-6 space-y-6 animate-fade-in">
      <WelcomeGreeting />
      <QuickActions />
      <ProgressSummary />
      <ActiveChallenges />
      <EquipmentAlerts />
    </div>
  );
}
