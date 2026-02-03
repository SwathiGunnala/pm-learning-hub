import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  Dumbbell, 
  Brain, 
  Users, 
  Crown,
  Flame,
  Zap,
  Lock,
  Check,
  ChevronRight,
  Trophy,
  Star,
  Sparkles,
  Send,
  CheckCircle,
  Lightbulb,
  TrendingUp
} from "lucide-react";
import type { Pillar, UserProgress, DailyChallenge, UserProgress2, AIFeedback } from "@shared/schema";
import { levels } from "@shared/schema";
import { useTrackActivity } from "@/hooks/use-activity";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const pillarIcons: Record<string, any> = {
  foundations: BookOpen,
  "product-sense": Dumbbell,
  "mental-models": Brain,
  "stakeholder-mastery": Users,
  "advanced-leadership": Crown,
};

const pillarColors: Record<string, string> = {
  emerald: "from-emerald-500 to-emerald-600",
  orange: "from-orange-500 to-orange-600",
  purple: "from-purple-500 to-purple-600",
  blue: "from-blue-500 to-blue-600",
  amber: "from-amber-500 to-amber-600",
};

const pillarBorders: Record<string, string> = {
  emerald: "border-emerald-500/30 hover:border-emerald-500/50",
  orange: "border-orange-500/30 hover:border-orange-500/50",
  purple: "border-purple-500/30 hover:border-purple-500/50",
  blue: "border-blue-500/30 hover:border-blue-500/50",
  amber: "border-amber-500/30 hover:border-amber-500/50",
};

const pillarLevels: Record<string, "beginner" | "intermediate" | "expert"> = {
  "foundations": "beginner",
  "product-sense": "beginner",
  "mental-models": "intermediate",
  "stakeholder-mastery": "intermediate", 
  "advanced-leadership": "expert",
};

export default function Dashboard() {
  const { trackActivity } = useTrackActivity();
  const { toast } = useToast();
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeResponse, setChallengeResponse] = useState("");
  const [challengeFeedback, setChallengeFeedback] = useState<AIFeedback | null>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  
  const { data: curriculum, isLoading: curriculumLoading } = useQuery<Pillar[]>({
    queryKey: ['/api/curriculum'],
  });

  const { data: progress, isLoading: progressLoading } = useQuery<UserProgress>({
    queryKey: ['/api/progress'],
  });

  const { data: dailyChallenge, isLoading: challengeLoading } = useQuery<DailyChallenge>({
    queryKey: ['/api/daily-challenge'],
  });

  const { data: userProgressDb } = useQuery<UserProgress2>({
    queryKey: ['/api/user-progress-db'],
  });

  const submitChallengeMutation = useMutation({
    mutationFn: async (response: string) => {
      const res = await apiRequest("POST", "/api/daily-challenge/submit", { response });
      return res.json();
    },
    onSuccess: (data: { feedback: AIFeedback; progress: UserProgress }) => {
      setChallengeFeedback(data.feedback);
      queryClient.invalidateQueries({ queryKey: ['/api/progress'] });
      queryClient.invalidateQueries({ queryKey: ['/api/user-progress-db'] });
      toast({
        title: "Challenge Completed!",
        description: `You earned ${dailyChallenge?.xpReward || 15} XP`,
      });
      trackActivity({
        activityType: "complete",
        entityType: "exercise",
        entityId: dailyChallenge?.id || "unknown",
        metadata: { type: "daily_challenge", xpEarned: dailyChallenge?.xpReward }
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

  const handleStartChallenge = () => {
    setShowChallenge(true);
    setChallengeResponse("");
    setChallengeFeedback(null);
    // Scroll to challenge section after a brief delay for render
    setTimeout(() => {
      challengeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    trackActivity({
      activityType: "view",
      entityType: "exercise",
      entityId: dailyChallenge?.id || "unknown",
      metadata: { type: "daily_challenge" }
    });
  };

  const handlePillarClick = (pillar: Pillar) => {
    trackActivity({
      activityType: "feature_click",
      entityType: "pillar",
      entityId: pillar.id,
      metadata: { title: pillar.title }
    });
  };

  const currentLevel = levels.find(l => l.level === (progress?.level || 1));
  const nextLevel = levels.find(l => l.level === (progress?.level || 1) + 1);

  const getRecommendedPillars = () => {
    if (!curriculum) return [];
    const userLevel = userProgressDb?.experienceLevel || "beginner";
    
    const levelPriority: Record<string, number> = {
      beginner: 0,
      intermediate: 1,
      expert: 2
    };
    
    return curriculum.filter(pillar => {
      const pillarLevel = pillarLevels[pillar.id] || "beginner";
      const userPriority = levelPriority[userLevel];
      const pillarPriority = levelPriority[pillarLevel];
      return pillarPriority <= userPriority + 1;
    });
  };

  const filteredCurriculum = getRecommendedPillars();

  const calculatePillarProgress = (pillar: Pillar) => {
    if (!progress) return { completed: 0, total: 0, percent: 0 };
    const totalLessons = pillar.units.reduce((acc, unit) => acc + unit.lessons.length, 0);
    const completedLessons = pillar.units.reduce((acc, unit) => 
      acc + unit.lessons.filter(l => progress.lessonsCompleted.includes(l.id)).length, 0
    );
    return {
      completed: completedLessons,
      total: totalLessons,
      percent: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
    };
  };

  const isUnitUnlocked = (unit: { requiredXp: number }) => {
    return (progress?.totalXp || 0) >= unit.requiredXp;
  };

  const getNextLesson = (pillar: Pillar) => {
    for (const unit of pillar.units) {
      if (!isUnitUnlocked(unit)) continue;
      for (const lesson of unit.lessons) {
        if (!progress?.lessonsCompleted.includes(lesson.id)) {
          return { unit, lesson };
        }
      }
    }
    return null;
  };

  if (curriculumLoading || progressLoading) {
    return (
      <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <Skeleton className="h-32 w-full" />
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5].map(i => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2" data-testid="card-welcome">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <CardTitle className="text-2xl">
                  {progress?.streakDays ? "Welcome back!" : "Welcome!"}
                </CardTitle>
                <CardDescription>
                  {progress?.streakDays 
                    ? "Ready to sharpen your PM skills today?" 
                    : "Complete your first exercise to start your streak"}
                </CardDescription>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {(userProgressDb?.streakDays || progress?.streakDays) ? (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10" data-testid="stat-streak">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <div className="text-center">
                      <p className="text-lg font-bold text-orange-500">{userProgressDb?.streakDays || progress?.streakDays}</p>
                      <p className="text-xs text-muted-foreground">day streak</p>
                    </div>
                  </div>
                ) : (
                  <Link href="/gym">
                    <Button variant="outline" className="gap-2 border-orange-500/30 text-orange-600 hover-elevate" data-testid="button-start-streak">
                      <Flame className="h-4 w-4" />
                      Start Your Streak
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10" data-testid="stat-xp">
                  <Zap className="h-5 w-5 text-purple-500" />
                  <div className="text-center">
                    <p className="text-lg font-bold text-purple-500">{userProgressDb?.totalXp || progress?.totalXp || 0}</p>
                    <p className="text-xs text-muted-foreground">total XP</p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">{currentLevel?.title || "PM Curious"}</span>
                </div>
                <span className="text-muted-foreground">
                  {nextLevel ? `${progress?.levelProgress || 0}% to ${nextLevel.title}` : "Max Level!"}
                </span>
              </div>
              <Progress value={progress?.levelProgress || 0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden" data-testid="card-daily-challenge-preview">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
          <CardHeader className="pb-3 relative">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Daily Challenge</CardTitle>
              </div>
              {dailyChallenge && (
                <Badge variant="outline" className="gap-1">
                  <Zap className="h-3 w-3" />
                  +{dailyChallenge.xpReward} XP
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="relative">
            {challengeLoading ? (
              <Skeleton className="h-16" />
            ) : dailyChallenge ? (
              <div className="space-y-3">
                <p className="text-sm font-medium">{dailyChallenge.title}</p>
                <Badge variant="secondary">{dailyChallenge.category}</Badge>
                <Button 
                  size="sm" 
                  className="w-full" 
                  onClick={handleStartChallenge}
                  data-testid="button-start-challenge"
                >
                  Start Challenge
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Your Learning Path
          </h2>
          {userProgressDb?.experienceLevel && (
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3" />
              Personalized for {userProgressDb.experienceLevel === "beginner" ? "Beginners" : 
                userProgressDb.experienceLevel === "intermediate" ? "Intermediate PMs" : "Expert PMs"}
            </Badge>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCurriculum?.map((pillar) => {
            const Icon = pillarIcons[pillar.id] || BookOpen;
            const progressInfo = calculatePillarProgress(pillar);
            const nextStep = getNextLesson(pillar);
            const gradient = pillarColors[pillar.color] || "from-gray-500 to-gray-600";
            const borderColor = pillarBorders[pillar.color] || "border-gray-500/30";

            return (
              <Card 
                key={pillar.id} 
                className={`relative overflow-hidden transition-all duration-200 ${borderColor} border-2`}
                data-testid={`card-pillar-${pillar.id}`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r ${gradient} text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    {progressInfo.completed === 0 ? (
                      <Badge className="text-xs bg-blue-500/10 text-blue-600 border-blue-500/30">
                        New
                      </Badge>
                    ) : progressInfo.percent === 100 ? (
                      <Badge className="text-xs bg-green-500/10 text-green-600 border-green-500/30">
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        {progressInfo.completed}/{progressInfo.total} lessons
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg mt-3">{pillar.title}</CardTitle>
                  <CardDescription className="text-sm">{pillar.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Progress</span>
                      <span>{progressInfo.percent}%</span>
                    </div>
                    <Progress value={progressInfo.percent} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    {pillar.units.slice(0, 3).map((unit) => {
                      const unlocked = isUnitUnlocked(unit);
                      const unitComplete = unit.lessons.every(l => 
                        progress?.lessonsCompleted.includes(l.id)
                      );
                      return (
                        <div 
                          key={unit.id}
                          className={`flex items-center gap-2 text-sm ${
                            !unlocked ? 'text-muted-foreground' : ''
                          }`}
                        >
                          {unitComplete ? (
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                          ) : unlocked ? (
                            <div className="h-4 w-4 rounded-full border-2 border-primary shrink-0" />
                          ) : (
                            <Lock className="h-4 w-4 shrink-0" />
                          )}
                          <span className={unlocked ? '' : 'opacity-60'}>{unit.title}</span>
                          {!unlocked && (
                            <Badge variant="outline" className="text-xs ml-auto">
                              {unit.requiredXp} XP
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                    {pillar.units.length > 3 && (
                      <p className="text-xs text-muted-foreground pl-6">
                        +{pillar.units.length - 3} more units
                      </p>
                    )}
                  </div>

                  {progressInfo.percent === 100 ? (
                    <Button variant="outline" className="w-full gap-2" disabled>
                      <Check className="h-4 w-4" />
                      Completed
                    </Button>
                  ) : nextStep && progressInfo.completed > 0 ? (
                    <Link href={`/learn/${nextStep.lesson.id}`}>
                      <Button className="w-full gap-2" data-testid={`button-continue-${pillar.id}`}>
                        Continue
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/learn/${pillar.units[0]?.lessons[0]?.id}`}>
                      <Button className="w-full gap-2" data-testid={`button-start-${pillar.id}`}>
                        Start
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {showChallenge && dailyChallenge && (
        <Card ref={challengeRef} className="relative overflow-hidden" data-testid="card-daily-challenge-expanded">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />
          <CardHeader>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-purple-500 text-white">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl">Today's Challenge</CardTitle>
                  <CardDescription>{dailyChallenge.title}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{dailyChallenge.category}</Badge>
                <Badge variant="outline" className="gap-1">
                  <Zap className="h-3 w-3" />
                  +{dailyChallenge.xpReward} XP
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {!challengeFeedback ? (
              <>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                    <h4 className="font-medium">Scenario</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {dailyChallenge.scenario}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">{dailyChallenge.question}</h4>
                    <Textarea
                      placeholder="Think through your approach... What would you do and why?"
                      value={challengeResponse}
                      onChange={(e) => setChallengeResponse(e.target.value)}
                      rows={5}
                      className="resize-none"
                      data-testid="input-challenge-response"
                    />
                  </div>
                </div>

                <Button
                  onClick={() => submitChallengeMutation.mutate(challengeResponse)}
                  disabled={challengeResponse.trim().length < 20 || submitChallengeMutation.isPending}
                  className="w-full gap-2"
                  data-testid="button-submit-challenge"
                >
                  {submitChallengeMutation.isPending ? (
                    "Getting feedback..."
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Response
                    </>
                  )}
                </Button>

                {challengeResponse.trim().length < 20 && challengeResponse.length > 0 && (
                  <p className="text-xs text-muted-foreground text-center">
                    Share a bit more of your thinking (at least 20 characters)
                  </p>
                )}
              </>
            ) : (
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
                      {challengeFeedback.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-muted-foreground">{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-500/10 space-y-2">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <Lightbulb className="h-4 w-4" />
                      <h4 className="font-medium">Areas to Explore</h4>
                    </div>
                    <ul className="space-y-1">
                      {challengeFeedback.improvements.map((s, i) => (
                        <li key={i} className="text-sm text-muted-foreground">{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {challengeFeedback.tip && (
                  <div className="p-4 rounded-lg bg-amber-500/10 space-y-2">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <TrendingUp className="h-4 w-4" />
                      <h4 className="font-medium">Pro Tip</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{challengeFeedback.tip}</p>
                  </div>
                )}

                <div className="text-center text-sm text-muted-foreground">
                  <span className="flex items-center justify-center gap-2">
                    <Flame className="h-4 w-4 text-orange-500" />
                    Your streak has been updated!
                  </span>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setShowChallenge(false)}
                  className="w-full"
                  data-testid="button-close-challenge"
                >
                  Close
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
