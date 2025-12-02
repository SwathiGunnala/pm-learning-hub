import { useState } from "react";
import { Target, BarChart3, Compass, Lightbulb, Users, Loader2 } from "lucide-react";
import { ExerciseCard } from "@/components/exercise-card";
import { AIFeedbackPanel } from "@/components/ai-feedback-panel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type Exercise = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  completedCount: number;
  totalCount: number;
};

const exercises: Exercise[] = [
  {
    id: "prioritization",
    icon: <Target className="h-6 w-6" />,
    title: "Prioritization",
    description: "Practice deciding what to build next when everything seems important.",
    difficulty: "beginner",
    completedCount: 3,
    totalCount: 10,
  },
  {
    id: "metrics",
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Metrics & Measurement",
    description: "Learn to identify and track the metrics that actually matter.",
    difficulty: "intermediate",
    completedCount: 2,
    totalCount: 8,
  },
  {
    id: "strategy",
    icon: <Compass className="h-6 w-6" />,
    title: "Product Strategy",
    description: "Think through long-term product direction and competitive positioning.",
    difficulty: "advanced",
    completedCount: 1,
    totalCount: 6,
  },
  {
    id: "feature-design",
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Feature Design",
    description: "Design features that solve real user problems elegantly.",
    difficulty: "intermediate",
    completedCount: 4,
    totalCount: 12,
  },
  {
    id: "user-research",
    icon: <Users className="h-6 w-6" />,
    title: "User Research",
    description: "Develop your ability to understand and empathize with users.",
    difficulty: "beginner",
    completedCount: 5,
    totalCount: 8,
  },
];

const sampleScenario = {
  title: "The Feature Request Flood",
  context: "You're the PM for a project management tool. In the last month, you've received these feature requests:",
  requests: [
    "Enterprise SSO integration (5 enterprise prospects, $500K ARR potential)",
    "Mobile app improvements (40% of users complain about mobile experience)",
    "AI-powered task suggestions (CEO is excited about AI)",
    "Better reporting dashboard (3 churned customers cited this as reason)",
  ],
  question: "How would you prioritize these features? Explain your reasoning and what additional information you'd want.",
};

export default function Gym() {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<{
    strengths: string[];
    improvements: string[];
    tip: string;
  } | null>(null);
  const { toast } = useToast();

  const handleStartExercise = (id: string) => {
    setActiveExercise(id);
    setResponse("");
    setFeedback(null);
  };

  const handleSubmitResponse = async () => {
    if (!response.trim()) return;
    
    setIsAnalyzing(true);
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setFeedback({
      strengths: [
        "You considered multiple stakeholder perspectives",
        "Good instinct to ask for more data before deciding",
        "Clear articulation of trade-offs between options",
      ],
      improvements: [
        "Consider the strategic implications of each choice on your product's positioning",
        "Think about dependencies between features - could one unlock others?",
        "Factor in team capacity and technical complexity",
      ],
      tip: "When facing competing priorities, try mapping each option against your product's North Star metric. The option that most directly moves that metric often deserves priority, assuming similar effort levels.",
    });
    
    setIsAnalyzing(false);
  };

  const handleTryAnother = () => {
    setActiveExercise(null);
    setResponse("");
    setFeedback(null);
  };

  const handleSaveToJournal = () => {
    toast({
      title: "Saved to Journal",
      description: "Your exercise and feedback have been saved to your Learning Journal.",
    });
  };

  if (activeExercise) {
    return (
      <div className="space-y-6 p-6 lg:p-8 max-w-4xl mx-auto">
        <Button variant="ghost" onClick={handleTryAnother} data-testid="button-back-exercises">
          Back to Exercises
        </Button>

        <Card className="p-8">
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <Badge>Prioritization</Badge>
                <h2 className="text-2xl font-bold">{sampleScenario.title}</h2>
              </div>
              <Badge variant="outline">Intermediate</Badge>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">{sampleScenario.context}</p>
              <ul className="space-y-2">
                {sampleScenario.requests.map((request, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-semibold text-primary">{idx + 1}.</span>
                    <span>{request}</span>
                  </li>
                ))}
              </ul>
              <p className="font-medium">{sampleScenario.question}</p>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder="Share your thinking here... Don't worry about getting it 'right' - this is about building your product sense muscle."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="min-h-48"
                data-testid="textarea-response"
              />
              
              <Button 
                className="w-full" 
                onClick={handleSubmitResponse}
                disabled={!response.trim() || isAnalyzing}
                data-testid="button-get-feedback"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing your thinking...
                  </>
                ) : (
                  "Get AI Feedback"
                )}
              </Button>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            {...exercise}
            onStart={() => handleStartExercise(exercise.id)}
          />
        ))}
      </div>
    </div>
  );
}
