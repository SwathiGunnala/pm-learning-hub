import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

type CaseStudyCardProps = {
  title: string;
  company: string;
  industry: string;
  outcome: "win" | "fail";
  preview: string;
  readTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  onClick: () => void;
};

export function CaseStudyCard({
  title,
  company,
  industry,
  outcome,
  preview,
  readTime,
  difficulty,
  onClick,
}: CaseStudyCardProps) {
  const isWin = outcome === "win";
  
  return (
    <Card 
      className={cn(
        "overflow-hidden cursor-pointer hover-elevate active-elevate-2",
        isWin ? "border-l-4 border-l-green-500" : "border-l-4 border-l-amber-500"
      )}
      onClick={onClick}
      data-testid={`card-case-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="outline" className="text-xs">
            {industry}
          </Badge>
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium",
            isWin ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"
          )}>
            {isWin ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {isWin ? "Win" : "Fail"}
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">{company}</p>
          <h3 className="font-semibold leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{preview}</p>
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{readTime}</span>
          </div>
          <Badge variant="secondary" className="text-xs capitalize">
            {difficulty}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
