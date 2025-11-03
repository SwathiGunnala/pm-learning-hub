import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, RefreshCw, Edit3, Clock, BookOpen, Lightbulb } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export type Article = {
  title: string;
  content: string;
  readingTime: number;
  gradeLevel: number;
  lessons: string[];
};

type ArticlePreviewProps = {
  article: Article | null;
  isGenerating: boolean;
  onRegenerate?: () => void;
  onDownload?: () => void;
};

export function ArticlePreview({ article, isGenerating, onRegenerate, onDownload }: ArticlePreviewProps) {
  if (isGenerating) {
    return (
      <Card className="p-12">
        <div className="space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <div className="flex gap-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </Card>
    );
  }

  if (!article) {
    return (
      <Card className="p-12 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
        <BookOpen className="h-16 w-16 text-muted-foreground/50" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Your first product story starts here</h3>
          <p className="text-muted-foreground">
            Fill out the form to generate an engaging article
          </p>
        </div>
      </Card>
    );
  }

  const paragraphs = article.content.split('\n\n');

  return (
    <div className="space-y-6">
      <Card className="p-12">
        <article className="space-y-6 font-serif">
          <div className="space-y-4 border-b pb-6">
            <h2 className="text-3xl font-bold font-sans" data-testid="text-article-title">
              {article.title}
            </h2>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{article.readingTime} min read</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>Grade {article.gradeLevel} level</span>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-lg leading-relaxed">
            {paragraphs.map((paragraph, idx) => {
              if (paragraph.startsWith('[LESSON]')) {
                const lessonText = paragraph.replace('[LESSON]', '').trim();
                return (
                  <div key={idx} className="border-l-4 border-primary pl-6 py-4 bg-muted/30 rounded-r-md">
                    <div className="flex gap-3">
                      <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <p className="italic font-sans">{lessonText}</p>
                    </div>
                  </div>
                );
              }
              
              if (paragraph.startsWith('[EXAMPLE]')) {
                const exampleText = paragraph.replace('[EXAMPLE]', '').trim();
                return (
                  <div key={idx} className="bg-accent/40 p-6 rounded-lg">
                    <p className="font-sans">{exampleText}</p>
                  </div>
                );
              }

              return <p key={idx}>{paragraph}</p>;
            })}
          </div>
        </article>
      </Card>

      <div className="flex gap-4 justify-end">
        <Button variant="outline" onClick={onRegenerate} data-testid="button-regenerate">
          <RefreshCw className="mr-2 h-4 w-4" />
          Regenerate
        </Button>
        <Button variant="outline" data-testid="button-refine">
          <Edit3 className="mr-2 h-4 w-4" />
          Refine
        </Button>
        <Button onClick={onDownload} data-testid="button-download">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
}
