import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Lightbulb, RefreshCw, BookOpen } from "lucide-react";

type AIFeedbackPanelProps = {
  strengths: string[];
  improvements: string[];
  tip: string;
  onTryAnother: () => void;
  onSaveToJournal: () => void;
};

export function AIFeedbackPanel({
  strengths,
  improvements,
  tip,
  onTryAnother,
  onSaveToJournal,
}: AIFeedbackPanelProps) {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <Card className="p-6 border-l-4 border-l-green-500">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <CheckCircle2 className="h-5 w-5" />
            <h3 className="font-semibold">What You Did Well</h3>
          </div>
          <ul className="space-y-2 text-sm">
            {strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <Card className="p-6 border-l-4 border-l-amber-500">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <AlertCircle className="h-5 w-5" />
            <h3 className="font-semibold">Areas to Strengthen</h3>
          </div>
          <ul className="space-y-2 text-sm">
            {improvements.map((improvement, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 mt-1">•</span>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <Card className="p-6 border-l-4 border-l-primary">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Lightbulb className="h-5 w-5" />
            <h3 className="font-semibold">Mentor Tip</h3>
          </div>
          <p className="text-sm">{tip}</p>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1" onClick={onTryAnother} data-testid="button-try-another">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Another
        </Button>
        <Button className="flex-1" onClick={onSaveToJournal} data-testid="button-save-journal">
          <BookOpen className="mr-2 h-4 w-4" />
          Save to Journal
        </Button>
      </div>
    </div>
  );
}
