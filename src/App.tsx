import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Home from "@/pages/Home";
import Sessions from "@/pages/Sessions";
import Stories from "@/pages/Stories";
import Library from "@/pages/Library";
import Analyze from "@/pages/Analyze";
import Progress from "@/pages/Progress";
import Equipment from "@/pages/Equipment";
import Community from "@/pages/Community";
import Credits from "@/pages/Credits";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/library" element={<Library />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/community" element={<Community />} />
            <Route path="/credits" element={<Credits />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
