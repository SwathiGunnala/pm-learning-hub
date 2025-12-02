import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type FrameworkCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
  onClick: () => void;
};

export function FrameworkCard({
  icon,
  title,
  description,
  category,
  onClick,
}: FrameworkCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="p-6 hover-elevate">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            data-testid={`button-favorite-${title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <Heart 
              className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} 
            />
          </Button>
        </div>
        
        <div className="space-y-2">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
        
        <Button variant="ghost" className="w-full" onClick={onClick}>
          Learn More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
