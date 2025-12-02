import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play } from "lucide-react";

type ProgressCardProps = {
  title: string;
  category: string;
  progress: number;
  onResume: () => void;
};

export function ProgressCard({ title, category, progress, onResume }: ProgressCardProps) {
  return (
    <Card className="p-4 min-w-[280px] hover-elevate">
      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">{category}</p>
          <h4 className="font-medium text-sm leading-tight line-clamp-2">{title}</h4>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <Button variant="ghost" size="sm" className="w-full" onClick={onResume}>
          <Play className="mr-2 h-3 w-3" />
          Resume
        </Button>
      </div>
    </Card>
  );
}
