import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

type JournalEntryCardProps = {
  title: string;
  excerpt: string;
  date: string;
  source: "library" | "gym" | "toolkit" | "personal";
  tags: string[];
  onEdit: () => void;
  onDelete: () => void;
};

export function JournalEntryCard({
  title,
  excerpt,
  date,
  source,
  tags,
  onEdit,
  onDelete,
}: JournalEntryCardProps) {
  const sourceColors = {
    library: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    gym: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    toolkit: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    personal: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  };

  const sourceLabels = {
    library: "Strategy Library",
    gym: "Product Sense Gym",
    toolkit: "Framework Toolkit",
    personal: "Personal Note",
  };

  return (
    <Card className="p-6 hover-elevate">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{date}</p>
            <Badge className={sourceColors[source]}>
              {sourceLabels[source]}
            </Badge>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={onEdit} data-testid="button-edit-entry">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete} data-testid="button-delete-entry">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
