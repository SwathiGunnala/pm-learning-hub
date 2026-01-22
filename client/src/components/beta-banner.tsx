import { X } from "lucide-react";
import { useState } from "react";

export function BetaBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-primary text-primary-foreground px-4 py-2 text-center text-sm flex items-center justify-center gap-2 relative" data-testid="banner-beta">
      <span className="font-medium">Welcome to PM Learning Hub Beta!</span>
      <span className="hidden sm:inline">We'd love your feedback as we build the best PM learning experience.</span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-2 p-1 hover-elevate rounded"
        aria-label="Dismiss banner"
        data-testid="button-dismiss-beta"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
