import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Zap, Send, CheckCircle, Lightbulb, TrendingUp, Sparkles } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { DailyChallenge, AIFeedback, UserProgress } from "@shared/schema";

export function DailyChallengeCard() {
  const [response, setResponse] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);
  const { toast } = useToast();

  const { data: challenge, isLoading } = useQuery<DailyChallenge>({
    queryKey: ['/api/daily-challenge'],
  });

  const submitMutation = useMutation({
    mutationFn: async (userResponse: string) => {
      const res = await apiRequest("POST", "/api/daily-challenge/submit", { response: userResponse });
      return res.json();
    },
    onSuccess: (data: { feedback: AIFeedback; progress: UserProgress }) => {
      setFeedback(data.feedback);
      setShowFeedback(true);
      queryClient.invalidateQueries({ queryKey: ['/api/progress'] });
      toast({
        title: "Challenge Completed!",
        description: `You earned ${challenge?.xpReward || 15} XP`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit your response. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (!challenge) {
    return null;
  }

  return (
    <Card className="relative overflow-hidden" data-testid="card-daily-challenge">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />
      
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-purple-500 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Today's Challenge</CardTitle>
              <CardDescription>{challenge.title}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {challenge.stakeholder && (
              <Badge variant="secondary">{challenge.stakeholder}</Badge>
            )}
            <Badge variant="outline" className="gap-1">
              <Zap className="h-3 w-3" />
              +{challenge.xpReward} XP
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {!showFeedback ? (
          <>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                <h4 className="font-medium">Scenario</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {challenge.scenario}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">{challenge.question}</h4>
                <Textarea
                  placeholder="Think through your approach... What would you do and why?"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  rows={5}
                  className="resize-none"
                  data-testid="input-challenge-response"
                />
              </div>
            </div>

            <Button
              onClick={() => submitMutation.mutate(response)}
              disabled={response.trim().length < 20 || submitMutation.isPending}
              className="w-full gap-2"
              data-testid="button-submit-challenge"
            >
              {submitMutation.isPending ? (
                "Getting feedback..."
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Response
                </>
              )}
            </Button>

            {response.trim().length < 20 && response.length > 0 && (
              <p className="text-xs text-muted-foreground text-center">
                Share a bit more of your thinking (at least 20 characters)
              </p>
            )}
          </>
        ) : feedback && (
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 text-green-500">
              <CheckCircle className="h-6 w-6" />
              <span className="text-lg font-medium">Challenge Complete!</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-500/10 space-y-2">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <h4 className="font-medium">What You Did Well</h4>
                </div>
                <ul className="space-y-1">
                  {feedback.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <TrendingUp className="h-4 w-4" />
                  <h4 className="font-medium">Room to Grow</h4>
                </div>
                <ul className="space-y-1">
                  {feedback.improvements.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-amber-500/10 space-y-2">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <Lightbulb className="h-4 w-4" />
                <h4 className="font-medium">Mentor Tip</h4>
              </div>
              <p className="text-sm text-muted-foreground">{feedback.tip}</p>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setShowFeedback(false);
                setResponse("");
                setFeedback(null);
              }}
              className="w-full"
              data-testid="button-new-challenge"
            >
              Done! Come back tomorrow for a new challenge
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
