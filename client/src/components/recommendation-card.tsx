import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";

type RecommendationCardProps = {
  type: "quick-win" | "deep-dive";
  title: string;
  description: string;
  duration: string;
  category?: string;
  onStart: () => void;
};

export function RecommendationCard({ 
  type, 
  title, 
  description, 
  duration, 
  category,
  onStart 
}: RecommendationCardProps) {
  const isQuickWin = type === "quick-win";
  
  return (
    <Card className="p-6 hover-elevate">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <Badge variant={isQuickWin ? "default" : "secondary"}>
            {isQuickWin ? "Quick Win" : "Deep Dive"}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
        
        {category && (
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        )}
        
        <Button 
          className="w-full" 
          variant={isQuickWin ? "default" : "outline"}
          onClick={onStart}
          data-testid={`button-start-${type}`}
        >
          {isQuickWin ? "Start Now" : "Read Case"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
