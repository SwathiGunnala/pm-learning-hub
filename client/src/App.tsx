import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ErrorBoundary } from "@/components/error-boundary";
import { RetryIndicator } from "@/components/retry-indicator";
import { BetaBanner } from "@/components/beta-banner";
import { OnboardingQuiz } from "@/components/onboarding-quiz";
import { AIAssistant } from "@/components/ai-assistant";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Loader2, LogIn } from "lucide-react";
import Dashboard from "@/pages/dashboard";
import LessonPage from "@/pages/lesson";
import Library from "@/pages/library";
import Gym from "@/pages/gym";
import Toolkit from "@/pages/toolkit";
import Journal from "@/pages/journal";
import GitHubPage from "@/pages/github";
import Settings from "@/pages/settings";
import Support from "@/pages/support";
import Feedback from "@/pages/feedback";
import Analytics from "@/pages/analytics";
import Landing from "@/pages/landing";
import NotFound from "@/pages/not-found";
import { usePageTracking, useSessionTracking } from "@/hooks/use-activity";
import type { UserProgress2 } from "@shared/schema";

const PUBLIC_ROUTES = ["/library", "/gym", "/toolkit"];

function MainRouter() {
  const { user } = useAuth();
  
  return (
    <Switch>
      <Route path="/" component={user ? Dashboard : Landing} />
      <Route path="/learn/:id" component={LessonPage} />
      <Route path="/library" component={Library} />
      <Route path="/gym" component={Gym} />
      <Route path="/toolkit" component={Toolkit} />
      <Route path="/journal" component={user ? Journal : Landing} />
      <Route path="/github" component={user ? GitHubPage : Landing} />
      <Route path="/settings" component={user ? Settings : Landing} />
      <Route path="/support" component={user ? Support : Landing} />
      <Route path="/feedback" component={user ? Feedback : Landing} />
      <Route path="/analytics" component={user ? Analytics : Landing} />
      <Route component={NotFound} />
    </Switch>
  );
}

function TrackingWrapper({ children }: { children: React.ReactNode }) {
  usePageTracking();
  useSessionTracking();
  return <>{children}</>;
}

function MainApp() {
  const { user } = useAuth();
  const [location] = useLocation();
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const { data: userProgress } = useQuery<UserProgress2>({
    queryKey: ["/api/user-progress-db"],
    enabled: !!user,
  });

  const needsOnboarding = user && userProgress && !userProgress.onboardingCompleted;
  
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  const isPublicRoute = PUBLIC_ROUTES.some(route => location.startsWith(route));
  const showAppShell = user || isPublicRoute;

  if (!showAppShell) {
    return <MainRouter />;
  }

  return (
    <>
      {(needsOnboarding || showOnboarding) && (
        <OnboardingQuiz onComplete={() => setShowOnboarding(false)} />
      )}
      <SidebarProvider style={style as React.CSSProperties}>
        <div className="flex h-screen w-full">
          <AppSidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <header className="flex items-center justify-between h-14 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <div className="flex items-center gap-2">
                {user ? (
                  <NotificationsDropdown />
                ) : (
                  <Button asChild size="sm" data-testid="button-header-login">
                    <a href="/api/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </a>
                  </Button>
                )}
                <ThemeToggle />
              </div>
            </header>
            <main className="flex-1 overflow-auto">
              <MainRouter />
            </main>
          </div>
        </div>
      </SidebarProvider>
      {user && <AIAssistant />}
    </>
  );
}

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <TrackingWrapper>
      <MainApp />
    </TrackingWrapper>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen">
              <BetaBanner />
              <div className="flex-1">
                <AppContent />
              </div>
            </div>
            <RetryIndicator />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
