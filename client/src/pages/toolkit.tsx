import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Grid3X3, 
  Target, 
  Users, 
  TrendingUp, 
  Layers, 
  Compass,
  ArrowLeft,
  Download,
  CheckCircle2
} from "lucide-react";
import { FrameworkCard } from "@/components/framework-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Framework } from "@shared/schema";

const frameworkIcons: Record<string, React.ReactNode> = {
  "rice": <Grid3X3 className="h-6 w-6" />,
  "jtbd": <Target className="h-6 w-6" />,
  "north-star": <Compass className="h-6 w-6" />,
  "kano": <TrendingUp className="h-6 w-6" />,
  "opportunity-tree": <Layers className="h-6 w-6" />,
  "user-story-mapping": <Users className="h-6 w-6" />,
};

export default function Toolkit() {
  const [selectedFrameworkId, setSelectedFrameworkId] = useState<string | null>(null);

  const { data: frameworks, isLoading } = useQuery<Framework[]>({
    queryKey: ["/api/frameworks"],
  });

  const selectedFramework = frameworks?.find(f => f.id === selectedFrameworkId);

  if (selectedFramework) {
    return (
      <div className="space-y-6 p-6 lg:p-8 max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => setSelectedFrameworkId(null)} data-testid="button-back-toolkit">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Toolkit
        </Button>

        <div className="grid gap-8 lg:grid-cols-[40%_60%]">
          <Card className="p-8 h-fit">
            <div className="space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {frameworkIcons[selectedFramework.id] || <Grid3X3 className="h-6 w-6" />}
              </div>
              <Badge>{selectedFramework.category}</Badge>
              <h1 className="text-2xl font-bold">{selectedFramework.title}</h1>
              <p className="text-muted-foreground">{selectedFramework.description}</p>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </div>
          </Card>

          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">When to Use</h2>
              <ul className="space-y-2">
                {selectedFramework.whenToUse.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Step-by-Step</h2>
              <ol className="space-y-3">
                {selectedFramework.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <Card className="p-6 bg-muted/30">
              <div className="space-y-2">
                <h3 className="font-semibold">Real Example</h3>
                <p className="text-sm">{selectedFramework.example}</p>
              </div>
            </Card>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Common Mistakes</h2>
              <ul className="space-y-2">
                {selectedFramework.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-destructive">-</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Framework Toolkit</h1>
        <p className="text-muted-foreground">
          Battle-tested frameworks explained simply, with real examples
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {frameworks?.map((framework) => (
            <FrameworkCard
              key={framework.id}
              icon={frameworkIcons[framework.id] || <Grid3X3 className="h-6 w-6" />}
              title={framework.title}
              description={framework.description}
              category={framework.category}
              onClick={() => setSelectedFrameworkId(framework.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
