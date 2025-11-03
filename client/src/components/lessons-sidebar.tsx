import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, CheckCircle2, Lightbulb, TrendingUp } from "lucide-react";

type LessonsSidebarProps = {
  lessons: string[];
};

export function LessonsSidebar({ lessons }: LessonsSidebarProps) {
  if (lessons.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-24 space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Key Takeaways</h3>
          </div>
          
          <div className="space-y-4">
            {lessons.map((lesson, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-sm leading-relaxed">{lesson}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h4 className="font-semibold">Practice Exercise</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Think of a recent product decision you made. How would you explain the reasoning behind it using a relatable story?
          </p>
          <Badge variant="outline" className="mt-2">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            5 min activity
          </Badge>
        </div>
      </Card>
    </div>
  );
}
