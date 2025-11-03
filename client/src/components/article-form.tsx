import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles } from "lucide-react";

export type ArticleFormData = {
  topic: string;
  lesson: string;
  length: "short" | "medium" | "long";
  exampleType: "customer" | "personal" | "case-study" | "daily";
};

type ArticleFormProps = {
  onGenerate: (data: ArticleFormData) => void;
  isGenerating: boolean;
};

export function ArticleForm({ onGenerate, isGenerating }: ArticleFormProps) {
  const [topic, setTopic] = useState("");
  const [lesson, setLesson] = useState("");
  const [length, setLength] = useState<ArticleFormData["length"]>("medium");
  const [exampleType, setExampleType] = useState<ArticleFormData["exampleType"]>("personal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic && lesson) {
      onGenerate({ topic, lesson, length, exampleType });
    }
  };

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="topic" className="text-base font-medium">
            Article Topic
          </Label>
          <Input
            id="topic"
            placeholder="e.g., How to prioritize features when everything feels urgent"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="text-lg"
            data-testid="input-topic"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lesson" className="text-base font-medium">
            Key Product Lesson
          </Label>
          <Textarea
            id="lesson"
            placeholder="Describe the main product insight you want to teach..."
            value={lesson}
            onChange={(e) => setLesson(e.target.value)}
            rows={4}
            data-testid="input-lesson"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-base font-medium">Target Length</Label>
          <div className="flex gap-3">
            {(["short", "medium", "long"] as const).map((l) => (
              <Button
                key={l}
                type="button"
                variant={length === l ? "default" : "outline"}
                onClick={() => setLength(l)}
                className="flex-1 capitalize"
                data-testid={`button-length-${l}`}
              >
                {l}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-base font-medium">Example Type</Label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "customer", label: "Customer Story" },
              { value: "personal", label: "Personal Experience" },
              { value: "case-study", label: "Case Study" },
              { value: "daily", label: "Daily Scenario" },
            ].map(({ value, label }) => (
              <Badge
                key={value}
                variant={exampleType === value ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 hover-elevate active-elevate-2"
                onClick={() => setExampleType(value as ArticleFormData["exampleType"])}
                data-testid={`badge-example-${value}`}
              >
                {label}
              </Badge>
            ))}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full py-6 text-base" 
          disabled={isGenerating || !topic || !lesson}
          data-testid="button-generate"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Your Article...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Article
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
