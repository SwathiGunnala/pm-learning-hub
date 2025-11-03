import { Lightbulb, HelpCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">Product Article Builder</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" data-testid="button-help">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Help</span>
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" data-testid="button-profile">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
