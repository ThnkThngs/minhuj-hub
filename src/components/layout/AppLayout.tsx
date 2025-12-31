import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { TopHeader } from "./TopHeader";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopHeader />
      <main className="flex-1 pt-16 pb-20 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
