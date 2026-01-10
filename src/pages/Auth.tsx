import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target } from "lucide-react";

export default function Auth() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="animate-fade-in min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold">Al-Qaws Academy</h1>
          <p className="text-muted-foreground">
            Sign in to save your progress and sync across devices
          </p>
        </div>

        {/* Auth Forms */}
        <div className="glass p-6 rounded-lg space-y-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")}>
            <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-6">
              <LoginForm />
            </TabsContent>
            <TabsContent value="signup" className="mt-6">
              <SignupForm onSuccess={() => setActiveTab("login")} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Features */}
        <div className="text-center text-sm text-muted-foreground">
          <p>By signing in, you can:</p>
          <ul className="mt-2 space-y-1">
            <li>✓ Save reading progress across devices</li>
            <li>✓ Track your training sessions</li>
            <li>✓ Favorite techniques for quick access</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
