import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Target, BarChart3, Compass, Lightbulb, Users, Loader2, ArrowLeft, LogIn } from "lucide-react";
import { ExerciseCard } from "@/components/exercise-card";
import { AIFeedbackPanel } from "@/components/ai-feedback-panel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useTrackActivity } from "@/hooks/use-activity";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Exercise, AIFeedback } from "@shared/schema";

const categoryIcons: Record<string, React.ReactNode> = {
  "Prioritization": <Target className="h-6 w-6" />,
  "Metrics & Measurement": <BarChart3 className="h-6 w-6" />,
  "Product Strategy": <Compass className="h-6 w-6" />,
  "Feature Design": <Lightbulb className="h-6 w-6" />,
  "User Research": <Users className="h-6 w-6" />,
};

export default function Gym() {
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);
  const { toast } = useToast();
  const { trackActivity } = useTrackActivity();
  const { user } = useAuth();

  const { data: exercises, isLoading } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
  });

  const { data: activeExercise } = useQuery<Exercise>({
    queryKey: ["/api/exercises", activeExerciseId],
    enabled: !!activeExerciseId,
  });

  const analyzeMutation = useMutation({
    mutationFn: async ({ exerciseId, response }: { exerciseId: string; response: string }) => {
      const res = await apiRequest("POST", `/api/exercises/${exerciseId}/analyze`, { response });
      return res.json();
    },
    onSuccess: (data: AIFeedback) => {
      setFeedback(data);
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
      if (activeExerciseId) {
        trackActivity({ activityType: "submit", entityType: "exercise", entityId: activeExerciseId });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Analysis failed",
        description: error.message || "Could not analyze your response. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleStartExercise = (id: string) => {
    setActiveExerciseId(id);
    setResponse("");
    setFeedback(null);
    trackActivity({ activityType: "view", entityType: "exercise", entityId: id });
  };

  const handleSubmitResponse = () => {
    if (!response.trim() || !activeExerciseId) return;
    analyzeMutation.mutate({ exerciseId: activeExerciseId, response });
  };

  const handleTryAnother = () => {
    setActiveExerciseId(null);
    setResponse("");
    setFeedback(null);
  };

  const handleSaveToJournal = async () => {
    if (!activeExercise || !feedback) return;
    
    try {
      await apiRequest("POST", "/api/journal", {
        title: `Exercise: ${activeExercise.title}`,
        content: `My Response:\n${response}\n\nStrengths:\n${feedback.strengths.join("\n")}\n\nAreas to Improve:\n${feedback.improvements.join("\n")}\n\nMentor Tip:\n${feedback.tip}`,
        source: "gym",
        tags: [activeExercise.category.toLowerCase().replace(/\s+/g, "-")],
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/journal"] });
      
      toast({
        title: "Saved to Journal",
        description: "Your exercise and feedback have been saved.",
      });
    } catch (error) {
      toast({
        title: "Failed to save",
        description: "Could not save to journal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exercisesByCategory = exercises?.reduce((acc, exercise) => {
    if (!acc[exercise.category]) {
      acc[exercise.category] = [];
    }
    acc[exercise.category].push(exercise);
    return acc;
  }, {} as Record<string, Exercise[]>) || {};

  if (activeExerciseId && activeExercise) {
    return (
      <div className="space-y-6 p-6 lg:p-8 max-w-4xl mx-auto">
        <Button variant="ghost" onClick={handleTryAnother} data-testid="button-back-exercises">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Exercises
        </Button>

        <Card className="p-8">
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-2">
                <Badge>{activeExercise.category}</Badge>
                <h2 className="text-2xl font-bold">{activeExercise.title}</h2>
              </div>
              <Badge variant="outline" className="capitalize">{activeExercise.difficulty}</Badge>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">{activeExercise.context}</p>
              <ul className="space-y-2">
                {activeExercise.scenario.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-semibold text-primary">{idx + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-medium">{activeExercise.question}</p>
            </div>

            {activeExercise.hints && activeExercise.hints.length > 0 && (
              <details className="text-sm">
                <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                  Need a hint?
                </summary>
                <ul className="mt-2 space-y-1 pl-4 text-muted-foreground">
                  {activeExercise.hints.map((hint, idx) => (
                    <li key={idx}>- {hint}</li>
                  ))}
                </ul>
              </details>
            )}

            <div className="space-y-4">
              <Textarea
                placeholder="Share your thinking here... Don't worry about getting it 'right' - this is about building your product sense muscle."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="min-h-48"
                data-testid="textarea-response"
                disabled={!!feedback}
              />
              
              {!feedback && (
                user ? (
                  <Button 
                    className="w-full" 
                    onClick={handleSubmitResponse}
                    disabled={!response.trim() || analyzeMutation.isPending}
                    data-testid="button-get-feedback"
                  >
                    {analyzeMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing your thinking...
                      </>
                    ) : (
                      "Get AI Feedback"
                    )}
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-center text-muted-foreground">
                      Sign in to get personalized AI feedback on your response
                    </p>
                    <Button asChild className="w-full" data-testid="button-login-for-feedback">
                      <a href="/api/login">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In to Get Feedback
                      </a>
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>
        </Card>

        {feedback && (
          <AIFeedbackPanel
            {...feedback}
            onTryAnother={handleTryAnother}
            onSaveToJournal={handleSaveToJournal}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Product Sense Gym</h1>
        <p className="text-muted-foreground">
          Practice exercises to sharpen your product thinking
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(exercisesByCategory).map(([category, categoryExercises]) => (
            <ExerciseCard
              key={category}
              icon={categoryIcons[category] || <Target className="h-6 w-6" />}
              title={category}
              description={`${categoryExercises.length} exercises to build your ${category.toLowerCase()} skills`}
              difficulty={categoryExercises[0]?.difficulty || "beginner"}
              completedCount={Math.floor(Math.random() * categoryExercises.length)}
              totalCount={categoryExercises.length}
              onStart={() => handleStartExercise(categoryExercises[0].id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
