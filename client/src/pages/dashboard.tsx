import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
  Star
} from "lucide-react";
import type { Pillar, UserProgress, DailyChallenge } from "@shared/schema";
import { levels } from "@shared/schema";
import { DailyChallengeCard } from "@/components/daily-challenge-card";

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

export default function Dashboard() {
  const { data: curriculum, isLoading: curriculumLoading } = useQuery<Pillar[]>({
    queryKey: ['/api/curriculum'],
  });

  const { data: progress, isLoading: progressLoading } = useQuery<UserProgress>({
    queryKey: ['/api/progress'],
  });

  const { data: dailyChallenge, isLoading: challengeLoading } = useQuery<DailyChallenge>({
    queryKey: ['/api/daily-challenge'],
  });

  const currentLevel = levels.find(l => l.level === (progress?.level || 1));
  const nextLevel = levels.find(l => l.level === (progress?.level || 1) + 1);

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
      <div className="container py-6 space-y-6">
        <Skeleton className="h-32 w-full" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map(i => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-8">
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
              <div className="flex items-center gap-4">
                {progress?.streakDays ? (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10" data-testid="stat-streak">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-lg font-bold text-orange-500">{progress.streakDays}</p>
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
                  <div>
                    <p className="text-lg font-bold text-purple-500">{progress?.totalXp || 0}</p>
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
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Daily Challenge</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative">
            {challengeLoading ? (
              <Skeleton className="h-16" />
            ) : dailyChallenge ? (
              <div className="space-y-3">
                <p className="text-sm font-medium">{dailyChallenge.title}</p>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <Badge variant="secondary">{dailyChallenge.category}</Badge>
                  <Badge variant="outline" className="gap-1">
                    <Zap className="h-3 w-3" />
                    +{dailyChallenge.xpReward} XP
                  </Badge>
                </div>
                <Button size="sm" className="w-full" data-testid="button-start-challenge">
                  Start Challenge
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Your Learning Path
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {curriculum?.map((pillar) => {
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

      <DailyChallengeCard />
    </div>
  );
}
