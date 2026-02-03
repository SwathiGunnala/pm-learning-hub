import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Rocket, Award, ChevronRight, ChevronLeft } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

type ExperienceLevel = "beginner" | "intermediate" | "expert";

interface OnboardingQuizProps {
  onComplete: () => void;
}

// ============================================================================
// ONBOARDING QUIZ - EXPERIENCE LEVEL DETERMINATION
// ============================================================================
// 
// PURPOSE: These 3 questions determine the user's experience level for 
// personalized content recommendations throughout the platform.
//
// HOW IT WORKS:
// - Each question has 3 options mapped to: "beginner", "intermediate", "expert"
// - User answers all 3 questions
// - System counts how many times each level was selected
// - Final level is determined by majority vote (see calculateLevel function)
//
// LEVEL DETERMINATION LOGIC:
// - If user selected "expert" 2+ times → User is EXPERT
// - Else if user selected "intermediate" 2+ times → User is INTERMEDIATE  
// - Otherwise → User is BEGINNER (default/fallback)
//
// This means:
// - To be classified as "expert": need at least 2 expert answers
// - To be classified as "intermediate": need at least 2 intermediate answers
// - Mixed answers (1 of each) or mostly beginner → defaults to beginner
//
// ============================================================================

const questions = [
  // QUESTION 1: Assesses current PM experience/tenure
  // - Beginner: New to PM, learning basics
  // - Intermediate: 1-3 years experience
  // - Expert: 3+ years leading products
  {
    id: 1,
    question: "How would you describe your current PM experience?",
    options: [
      { value: "beginner", label: "I'm new to product management", description: "Learning the basics of PM" },
      { value: "intermediate", label: "I have some PM experience", description: "1-3 years in product roles" },
      { value: "expert", label: "I'm an experienced PM", description: "3+ years leading products" },
    ]
  },
  // QUESTION 2: Assesses learning goals/aspirations
  // - Beginner: Wants to learn fundamentals
  // - Intermediate: Wants to sharpen specific skills
  // - Expert: Wants to master advanced strategies
  {
    id: 2,
    question: "What's your primary learning goal?",
    options: [
      { value: "beginner", label: "Learn PM fundamentals", description: "Understand core concepts and frameworks" },
      { value: "intermediate", label: "Sharpen specific skills", description: "Improve prioritization, metrics, stakeholder management" },
      { value: "expert", label: "Master advanced strategies", description: "Strategic thinking, leadership, complex decisions" },
    ]
  },
  // QUESTION 3: Assesses data/metrics proficiency
  // - Beginner: Still learning what to measure
  // - Intermediate: Understands KPIs, can analyze data
  // - Expert: Can set up metrics frameworks and run experiments
  {
    id: 3,
    question: "How comfortable are you with product metrics and data?",
    options: [
      { value: "beginner", label: "Still learning about metrics", description: "Need guidance on what to measure" },
      { value: "intermediate", label: "Can work with common metrics", description: "Understand KPIs, can analyze data" },
      { value: "expert", label: "Deep analytics experience", description: "Set up metrics frameworks, run experiments" },
    ]
  }
];

export function OnboardingQuiz({ onComplete }: OnboardingQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const completeMutation = useMutation({
    mutationFn: async (experienceLevel: ExperienceLevel) => {
      const res = await apiRequest("POST", "/api/onboarding/complete", { experienceLevel });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user-progress-db"] });
      onComplete();
    }
  });

  // ============================================================================
  // LEVEL CALCULATION FUNCTION
  // ============================================================================
  // Determines final experience level based on answers to the 3 questions.
  // Uses a "majority vote" approach:
  // 
  // Step 1: Count how many times each level was selected
  // Step 2: Apply priority rules (expert > intermediate > beginner)
  //
  // Examples:
  // - [expert, expert, beginner] → 2 expert = EXPERT
  // - [intermediate, expert, intermediate] → 2 intermediate = INTERMEDIATE
  // - [beginner, beginner, expert] → 2 beginner = BEGINNER
  // - [beginner, intermediate, expert] → 1 each = BEGINNER (default)
  // ============================================================================
  const calculateLevel = (): ExperienceLevel => {
    // Count how many times each level was selected across all 3 questions
    const counts = { beginner: 0, intermediate: 0, expert: 0 };
    answers.forEach(answer => {
      counts[answer as ExperienceLevel]++;
    });
    
    // Priority: Expert first (if 2+ expert answers)
    if (counts.expert >= 2) return "expert";
    // Then intermediate (if 2+ intermediate answers)
    if (counts.intermediate >= 2) return "intermediate";
    // Default to beginner (includes mixed answers or 2+ beginner)
    return "beginner";
  };

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const level = calculateLevel();
      completeMutation.mutate(level);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "beginner": return <Sparkles className="h-5 w-5 text-emerald-500" />;
      case "intermediate": return <Rocket className="h-5 w-5 text-blue-500" />;
      case "expert": return <Award className="h-5 w-5 text-purple-500" />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentStep + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2 mb-4" />
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
          <CardDescription>
            This helps us personalize your learning experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={answers[currentStep] || ""}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div key={option.value} className="relative">
                <RadioGroupItem
                  value={option.value}
                  id={`${currentStep}-${option.value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`${currentStep}-${option.value}`}
                  className="flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all hover-elevate peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  data-testid={`option-${option.value}`}
                >
                  {getLevelIcon(option.value)}
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>

          {!answers[currentStep] && (
            <p className="text-sm text-muted-foreground text-center">Please select an option to continue</p>
          )}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              data-testid="button-back"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!answers[currentStep] || completeMutation.isPending}
              data-testid="button-next"
            >
              {completeMutation.isPending ? (
                "Saving..."
              ) : currentStep === questions.length - 1 ? (
                "Get Started"
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
