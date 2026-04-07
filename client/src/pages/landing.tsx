import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookOpen, Brain, Users, Trophy, Sparkles, ArrowRight, CheckCircle, Star, Flame, Zap } from "lucide-react";

const features = [
  { icon: BookOpen, title: "Strategy Library", description: "57 real-world case studies from Apple, Spotify, Slack & more" },
  { icon: Brain, title: "Product Sense Gym", description: "Interactive exercises with AI-powered mentor feedback" },
  { icon: Users, title: "Stakeholder Mastery", description: "Navigate complex organizations and lead without authority" },
  { icon: Trophy, title: "Gamified Learning", description: "Earn XP, maintain streaks, and level up your PM career" },
];

const stats = [
  { value: "2,400+", label: "PMs learning" },
  { value: "57", label: "Case studies" },
  { value: "60+", label: "Lessons" },
  { value: "5", label: "Learning pillars" },
];

const testimonials = [
  {
    quote: "The case studies are insanely good. I used the Slack pivot story directly in my PM interview and got an offer.",
    name: "Sarah K.",
    role: "Senior PM, Series B startup",
    initials: "SK",
    stars: 5,
  },
  {
    quote: "I went from engineer to PM in 3 months. The frameworks and AI feedback made all the difference.",
    name: "Marcus T.",
    role: "Product Manager, Fintech",
    initials: "MT",
    stars: 5,
  },
  {
    quote: "Best $9.99 I spend every month. The streak system keeps me accountable like nothing else has.",
    name: "Priya R.",
    role: "Group PM, E-commerce",
    initials: "PR",
    stars: 5,
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    features: ["5 case studies", "3 exercises/month", "Basic frameworks", "Community access"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    features: ["All 57 case studies", "Unlimited exercises", "AI feedback", "All frameworks", "Progress tracking", "Email reminders"],
    cta: "Start Pro Trial",
    popular: true,
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Product Learning Hub</span>
          </div>
          <Button asChild data-testid="button-login">
            <a href="/auth">Log In</a>
          </Button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <Badge variant="secondary" className="mb-4">Built by a passionate product leader</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              The PM skills platform that actually makes you better
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              57 real-world case studies, AI-powered exercises, and proven frameworks — organized into a Duolingo-style curriculum that builds your product sense one lesson at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-get-started">
                <a href="/auth">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-view-library">
                <a href="/library">Browse Case Studies</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="border-y bg-muted/30 py-8 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4">Everything you need to become a better PM</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              Five learning pillars covering strategy, execution, leadership, and the mental models top PMs rely on daily.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="p-6">
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold text-center mb-4">Loved by product managers</h2>
            <p className="text-center text-muted-foreground mb-12">
              Join 2,400+ PMs who are leveling up their skills every week.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <Card key={t.name} className="p-6 flex flex-col gap-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="text-xs">{t.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Streak/gamification callout */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <div className="flex justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-orange-500 text-lg font-semibold">
                <Flame className="h-6 w-6" />
                Streaks
              </div>
              <div className="flex items-center gap-2 text-primary text-lg font-semibold">
                <Zap className="h-6 w-6" />
                XP & Levels
              </div>
              <div className="flex items-center gap-2 text-yellow-500 text-lg font-semibold">
                <Trophy className="h-6 w-6" />
                Leaderboard
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Learning that sticks</h2>
            <p className="text-muted-foreground mb-6">
              Daily streak goals, XP rewards, and a leaderboard keep you coming back. Share your progress, invite teammates, and climb the ranks together.
            </p>
            <Button asChild data-testid="button-start-streak">
              <a href="/auth">Start your streak today</a>
            </Button>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-center mb-4">Simple, transparent pricing</h2>
            <p className="text-center text-muted-foreground mb-12">Start free. Upgrade when you're ready.</p>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {plans.map((plan) => (
                <Card key={plan.name} className={`p-6 relative ${plan.popular ? "ring-2 ring-primary" : ""}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                  )}
                  <div className="mb-6">
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                    data-testid={`button-plan-${plan.name.toLowerCase()}`}
                  >
                    <a href="/auth">{plan.cta}</a>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground space-y-2">
          <p className="font-medium">Product Learning Hub</p>
          <p>Build your product sense, one lesson at a time.</p>
        </div>
      </footer>
    </div>
  );
}
