import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ArticleForm, type ArticleFormData } from "@/components/article-form";
import { ArticlePreview, type Article } from "@/components/article-preview";
import { LessonsSidebar } from "@/components/lessons-sidebar";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);

  const handleGenerate = async (formData: ArticleFormData) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const mockArticle: Article = {
        title: `${formData.topic}`,
        content: `You know that feeling when you open your closet and stuff just falls out? That's exactly what happened to me last spring. I had crammed so many things in there - winter coats, summer dresses, shoes I hadn't worn in years - that I couldn't even find my favorite jacket anymore.

[EXAMPLE] Picture this: It's Monday morning, you're already running late, and you need that one specific shirt. But instead of grabbing it and going, you're now in a full wrestling match with hangers, boxes, and that random scarf you forgot you owned. Sound familiar?

This is basically what happens with product backlogs. We keep adding more ideas, more features, more "nice-to-haves" until we can't even see what's actually important anymore.

[LESSON] ${formData.lesson}

Here's what changed for me - both with my closet and my product thinking. I had to get real about what I actually used versus what I just kept "in case." With my closet, I started with a simple rule: if I hadn't worn it in six months, it went into a donation pile. Not thrown away, just moved out of my immediate space.

The same principle works beautifully for product backlogs. Create an "archive" for ideas that aren't priorities right now. They're not dead - they're just not cluttering your view of what matters today.

[LESSON] Prioritization isn't about saying no forever - it's about saying "not right now" so you can focus on what will make the biggest difference for your users today.

Think about it this way: every item in your backlog is competing for attention. When you have 200 items, each one gets 0.5% of your focus. When you have 20 carefully chosen items, each gets 5% of your attention. That's ten times more mental energy available to understand and solve the real problems.`,
        readingTime: formData.length === "short" ? 3 : formData.length === "medium" ? 5 : 8,
        gradeLevel: 7,
        lessons: [
          "An overstuffed backlog obscures what truly matters, just like a cluttered closet",
          formData.lesson,
          "Fewer items means more focus and mental energy per priority"
        ]
      };
      
      setArticle(mockArticle);
      setIsGenerating(false);
    }, 2500);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2500);
  };

  const handleDownload = () => {
    if (!article) return;
    
    const content = `# ${article.title}\n\n${article.content}`;
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${article.title.toLowerCase().replace(/\s+/g, "-")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <HeroSection />
      
      <main id="editor-section" className="flex-1 py-12 md:py-16">
        <div className="container px-6">
          <div className="grid gap-8 lg:grid-cols-[60%_40%] lg:gap-12">
            <div className="space-y-8">
              <ArticleForm onGenerate={handleGenerate} isGenerating={isGenerating} />
              <ArticlePreview 
                article={article}
                isGenerating={isGenerating}
                onRegenerate={handleRegenerate}
                onDownload={handleDownload}
              />
            </div>
            
            <div>
              <LessonsSidebar lessons={article?.lessons || []} />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-12 bg-muted/20">
        <div className="container px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Examples</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Tips for Better Articles</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Weekly Product Thinking Tips</h4>
              <p className="text-sm text-muted-foreground">
                Get insights delivered to your inbox
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="flex-1 px-3 py-2 text-sm border rounded-md bg-background"
                  data-testid="input-newsletter"
                />
                <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover-elevate active-elevate-2">
                  Subscribe
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
