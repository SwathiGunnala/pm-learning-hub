import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Flame, CheckCircle2, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { RecommendationCard } from "@/components/recommendation-card";
import { ProgressCard } from "@/components/progress-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import heroImage from "@assets/generated_images/pm_brain_gym_illustration.png";
import type { UserProgress, CaseStudy, Exercise } from "@shared/schema";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const { data: progress, isLoading: progressLoading } = useQuery<UserProgress>({
    queryKey: ["/api/progress"],
  });

  const { data: caseStudies } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
  });

  const { data: exercises } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
  });

  const recommendedCase = caseStudies?.[0];
  const recommendedExercise = exercises?.[0];

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <section className="relative rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 lg:p-12">
        <div className="grid lg:grid-cols-[60%_40%] gap-8 items-center">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Welcome back, Product Pro</p>
              <h1 className="text-3xl lg:text-4xl font-bold">Your PM Learning Hub</h1>
              <p className="text-lg text-muted-foreground">
                Build product thinking muscle, one rep at a time
              </p>
            </div>
            <div className="flex items-center gap-2 text-orange-500">
              <Flame className="h-5 w-5" />
              <span className="font-semibold">
                {progress?.streakDays || 0} day streak - keep it going!
              </span>
            </div>
          </div>
          <div className="hidden lg:block">
            <img 
              src={heroImage} 
              alt="Product learning illustration"
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {progressLoading ? (
          <>
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </>
        ) : (
          <>
            <StatCard
              icon={<Flame className="h-6 w-6" />}
              label="Current Streak"
              value={progress?.streakDays || 0}
              sublabel={`Your longest: ${progress?.longestStreak || 0} days`}
            />
            <StatCard
              icon={<CheckCircle2 className="h-6 w-6" />}
              label="Exercises Completed"
              value={progress?.exercisesCompleted || 0}
              sublabel={`This month: ${progress?.exercisesThisMonth || 0}`}
            />
            <StatCard
              icon={<TrendingUp className="h-6 w-6" />}
              label="Skill Level"
              value={progress?.skillLevel || "Beginner"}
              sublabel={`${progress?.levelProgress || 0}% to next level`}
            />
          </>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Today's Recommendations</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {recommendedExercise ? (
            <RecommendationCard
              type="quick-win"
              title={recommendedExercise.title}
              description={recommendedExercise.context.slice(0, 100) + "..."}
              duration="5 min"
              category={recommendedExercise.category}
              onStart={() => setLocation("/gym")}
            />
          ) : (
            <Skeleton className="h-64" />
          )}
          {recommendedCase ? (
            <RecommendationCard
              type="deep-dive"
              title={recommendedCase.title}
              description={recommendedCase.preview}
              duration={recommendedCase.readTime}
              category={recommendedCase.industry}
              onStart={() => setLocation("/library")}
            />
          ) : (
            <Skeleton className="h-64" />
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Continue Learning</h2>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-4 pb-4">
            <ProgressCard
              title="Jobs-to-be-Done Framework"
              category="Framework Toolkit"
              progress={65}
              onResume={() => setLocation("/toolkit")}
            />
            <ProgressCard
              title="Prioritization Exercise"
              category="Product Sense Gym"
              progress={40}
              onResume={() => setLocation("/gym")}
            />
            {caseStudies?.slice(0, 2).map((cs) => (
              <ProgressCard
                key={cs.id}
                title={cs.title}
                category="Strategy Library"
                progress={Math.floor(Math.random() * 60) + 20}
                onResume={() => setLocation("/library")}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    </div>
  );
}
