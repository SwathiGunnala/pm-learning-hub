import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, CheckCircle2 } from "lucide-react";

type ExerciseCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  completedCount: number;
  totalCount: number;
  onStart: () => void;
};

export function ExerciseCard({
  icon,
  title,
  description,
  difficulty,
  completedCount,
  totalCount,
  onStart,
}: ExerciseCardProps) {
  const difficultyColors = {
    beginner: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    advanced: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <Card className="p-6 hover-elevate">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <Badge className={difficultyColors[difficulty]}>
            {difficulty}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>{completedCount}/{totalCount} completed</span>
        </div>
        
        <Button className="w-full" onClick={onStart} data-testid={`button-start-${title.toLowerCase().replace(/\s+/g, "-")}`}>
          <Play className="mr-2 h-4 w-4" />
          Start Exercise
        </Button>
      </div>
    </Card>
  );
}
