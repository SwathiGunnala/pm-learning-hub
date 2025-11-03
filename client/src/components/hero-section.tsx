import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/Product_team_collaboration_scene_2cc95d5e.png";

export function HeroSection() {
  const handleScrollToEditor = () => {
    const editorSection = document.getElementById("editor-section");
    editorSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full border-b bg-gradient-to-b from-background to-muted/20 py-20 md:py-24">
      <div className="container px-6">
        <div className="grid gap-12 lg:grid-cols-[60%_40%] lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Build Engaging Product Stories
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Create conversational, grade-7 product training articles with real-life examples that resonate
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>500+ Articles Created</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>95% Readability Score</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>Used by 2,000+ PMs</span>
              </div>
            </div>

            <Button 
              size="lg" 
              className="px-8 py-6 text-base"
              onClick={handleScrollToEditor}
              data-testid="button-start-writing"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Writing
            </Button>
          </div>

          <div className="relative hidden lg:block">
            <img 
              src={heroImage} 
              alt="Product team collaborating and sharing knowledge"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
