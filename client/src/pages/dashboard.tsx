import { useLocation } from "wouter";
import { Flame, CheckCircle2, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { RecommendationCard } from "@/components/recommendation-card";
import { ProgressCard } from "@/components/progress-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import heroImage from "@assets/generated_images/pm_brain_gym_illustration.png";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <section className="relative rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 lg:p-12">
        <div className="grid lg:grid-cols-[60%_40%] gap-8 items-center">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Welcome back, Product Pro</p>
              <h1 className="text-3xl lg:text-4xl font-bold">Your PM Brain Gym</h1>
              <p className="text-lg text-muted-foreground">
                Build product thinking muscle, one rep at a time
              </p>
            </div>
            <div className="flex items-center gap-2 text-orange-500">
              <Flame className="h-5 w-5" />
              <span className="font-semibold">7 day streak - keep it going!</span>
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
        <StatCard
          icon={<Flame className="h-6 w-6" />}
          label="Current Streak"
          value={7}
          sublabel="Your longest: 14 days"
        />
        <StatCard
          icon={<CheckCircle2 className="h-6 w-6" />}
          label="Exercises Completed"
          value={42}
          sublabel="This month: 12"
        />
        <StatCard
          icon={<TrendingUp className="h-6 w-6" />}
          label="Skill Level"
          value="Rising PM"
          sublabel="68% to next level"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Today's Recommendations</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <RecommendationCard
            type="quick-win"
            title="Spot the Metric That Matters"
            description="A 5-minute exercise to sharpen your ability to identify the key metric in any product scenario."
            duration="5 min"
            category="Metrics"
            onStart={() => setLocation("/gym")}
          />
          <RecommendationCard
            type="deep-dive"
            title="How Slack Became Essential"
            description="Explore how Slack's product decisions turned it from a gaming company's side project to a workplace must-have."
            duration="12 min read"
            category="SaaS"
            onStart={() => setLocation("/library")}
          />
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
              title="Prioritization Exercise #3"
              category="Product Sense Gym"
              progress={40}
              onResume={() => setLocation("/gym")}
            />
            <ProgressCard
              title="Netflix's Personalization Strategy"
              category="Strategy Library"
              progress={80}
              onResume={() => setLocation("/library")}
            />
            <ProgressCard
              title="North Star Metrics Deep Dive"
              category="Framework Toolkit"
              progress={25}
              onResume={() => setLocation("/toolkit")}
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    </div>
  );
}
