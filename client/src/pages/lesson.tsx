import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useLocation, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Lightbulb, 
  BookOpen,
  Zap,
  Clock,
  Trophy,
  Home
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Lesson, LessonContent, UserProgress } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import { useCelebration, getEncouragingMessage } from "@/components/celebration";

interface QuizAnswer {
  selectedIndex: number;
  isCorrect: boolean;
}

function ContentBlock({ content, onAnswer, answered, selectedAnswer }: { 
  content: LessonContent; 
  onAnswer?: (selectedIndex: number, correct: boolean) => void;
  answered?: boolean;
  selectedAnswer?: number;
}) {
  const [selected, setSelected] = useState<number | null>(selectedAnswer ?? null);

  switch (content.type) {
    case "text":
      return (
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-base leading-relaxed whitespace-pre-line">{content.content}</p>
        </div>
      );
    
    case "tip":
      return (
        <div className="flex gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <Lightbulb className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900 dark:text-amber-100">{content.content}</p>
        </div>
      );
    
    case "example":
      return (
        <div className="p-4 rounded-lg bg-muted/50 border-l-4 border-primary">
          <p className="text-sm font-medium text-muted-foreground mb-1">Example</p>
          <p className="text-sm">{content.content}</p>
        </div>
      );
    
    case "quiz":
      return (
        <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 space-y-4">
          <p className="font-medium">{content.content}</p>
          <RadioGroup 
            value={selected?.toString()} 
            onValueChange={(val) => {
              if (answered) return;
              const idx = parseInt(val);
              setSelected(idx);
              onAnswer?.(idx, idx === content.correctIndex);
            }}
            disabled={answered}
          >
            {content.options?.map((option, idx) => (
              <div 
                key={idx} 
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                  answered && idx === content.correctIndex 
                    ? 'bg-green-500/10 border-green-500' 
                    : answered && idx === selected && idx !== content.correctIndex
                    ? 'bg-red-500/10 border-red-500'
                    : 'hover:bg-muted/50'
                }`}
              >
                <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                <Label 
                  htmlFor={`option-${idx}`} 
                  className="flex-1 cursor-pointer text-sm"
                >
                  {option}
                </Label>
                {answered && idx === content.correctIndex && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
            ))}
          </RadioGroup>
          {answered && content.explanation && (
            <div className="p-3 rounded-lg bg-muted/50 mt-2">
              <p className="text-sm text-muted-foreground">{content.explanation}</p>
            </div>
          )}
        </div>
      );
    
    case "reflection":
      return (
        <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20 space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-purple-500" />
            <p className="font-medium text-purple-700 dark:text-purple-300">Reflection</p>
          </div>
          <p className="text-sm">{content.content}</p>
          <Textarea 
            placeholder="Take a moment to reflect..." 
            rows={3}
            className="resize-none"
            data-testid="input-reflection"
          />
        </div>
      );
    
    default:
      return null;
  }
}

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, QuizAnswer>>({});
  const [completed, setCompleted] = useState(false);
  const [encouragingMsg, setEncouragingMsg] = useState("");
  const { toast } = useToast();
  const { celebrate, CelebrationComponent } = useCelebration();

  const { data: lesson, isLoading } = useQuery<Lesson>({
    queryKey: ['/api/lessons', id],
  });

  const { data: progress } = useQuery<UserProgress>({
    queryKey: ['/api/progress'],
  });

  const completeMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/lessons/${id}/complete`, {});
      return res.json();
    },
    onSuccess: (data: UserProgress) => {
      setCompleted(true);
      setEncouragingMsg(getEncouragingMessage());
      celebrate();
      queryClient.invalidateQueries({ queryKey: ['/api/progress'] });
      queryClient.invalidateQueries({ queryKey: ['/api/curriculum'] });
      toast({
        title: "Lesson Complete!",
        description: `You earned ${lesson?.xpReward || 0} XP`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save your progress. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="container max-w-3xl py-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="container max-w-3xl py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
        <Link href="/">
          <Button>
            <Home className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const totalSteps = lesson.content.length;
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);
  const isLastStep = currentStep === totalSteps - 1;
  const currentContent = lesson.content[currentStep];
  const isQuizStep = currentContent?.type === "quiz";
  const quizAnswered = quizAnswers[currentStep] !== undefined;
  const alreadyCompleted = progress?.lessonsCompleted.includes(lesson.id);

  const handleNext = () => {
    if (isLastStep) {
      if (!alreadyCompleted) {
        completeMutation.mutate();
      } else {
        setCompleted(true);
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const canProceed = !isQuizStep || quizAnswered;

  if (completed) {
    return (
      <>
        <CelebrationComponent />
        <div className="container max-w-3xl py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center">
              <motion.div 
                className="h-24 w-24 rounded-full bg-green-500/20 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              >
                <Trophy className="h-12 w-12 text-green-500" />
              </motion.div>
            </div>
            
            <div className="space-y-2">
              <motion.h1 
                className="text-3xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Lesson Complete!
              </motion.h1>
              <motion.p 
                className="text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {encouragingMsg || `Great work completing "${lesson.title}"`}
              </motion.p>
            </div>

            <motion.div 
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Badge variant="secondary" className="gap-1 text-lg py-2 px-4">
                <Zap className="h-4 w-4" />
                +{lesson.xpReward} XP
              </Badge>
            </motion.div>

            <motion.div 
              className="flex justify-center gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/">
                <Button size="lg" data-testid="button-back-to-dashboard">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{lesson.durationMinutes} min</span>
          <Badge variant="outline" className="gap-1 ml-2">
            <Zap className="h-3 w-3" />
            {lesson.xpReward} XP
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{lesson.title}</span>
          <span>{currentStep + 1} of {totalSteps}</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      <Card>
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ContentBlock 
                content={currentContent} 
                onAnswer={(selectedIndex, correct) => setQuizAnswers(prev => ({ 
                  ...prev, 
                  [currentStep]: { selectedIndex, isCorrect: correct }
                }))}
                answered={quizAnswered}
                selectedAnswer={quizAnswers[currentStep]?.selectedIndex}
              />
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          data-testid="button-previous"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canProceed || completeMutation.isPending}
          data-testid="button-next"
        >
          {completeMutation.isPending ? (
            "Saving..."
          ) : isLastStep ? (
            <>
              Complete Lesson
              <CheckCircle className="h-4 w-4 ml-2" />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
