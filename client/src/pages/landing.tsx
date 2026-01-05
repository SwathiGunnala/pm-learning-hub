import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Users, Trophy, Sparkles, ArrowRight, CheckCircle } from "lucide-react";

const features = [
  { icon: BookOpen, title: "Strategy Library", description: "50+ real-world case studies from top companies" },
  { icon: Brain, title: "Product Sense Gym", description: "Interactive exercises with AI-powered feedback" },
  { icon: Users, title: "Stakeholder Mastery", description: "Learn to navigate complex organizational dynamics" },
  { icon: Trophy, title: "Gamified Learning", description: "Earn XP, maintain streaks, level up your PM skills" },
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
    price: "$19",
    period: "/month",
    features: ["All 50+ case studies", "Unlimited exercises", "AI feedback", "All frameworks", "Progress tracking", "Email reminders"],
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
            <span className="font-bold text-xl">PM Learning Hub</span>
          </div>
          <Button asChild data-testid="button-login">
            <a href="/api/login">Log In</a>
          </Button>
        </div>
      </header>

      <main>
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <Badge variant="secondary" className="mb-4">Build your product sense</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Level up your PM skills with real-world practice
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Learn from 50+ case studies, practice with interactive exercises, and get AI-powered feedback. Join thousands of PMs building product thinking muscle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-get-started">
                <a href="/api/login">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">Everything you need to become a better PM</h2>
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

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-center mb-4">Simple, transparent pricing</h2>
            <p className="text-center text-muted-foreground mb-12">Start free, upgrade when you're ready</p>
            <div className="grid md:grid-cols-2 gap-8">
              {plans.map((plan) => (
                <Card key={plan.name} className={`p-6 ${plan.popular ? "border-primary ring-2 ring-primary/20" : ""}`}>
                  {plan.popular && (
                    <Badge className="mb-4">Most Popular</Badge>
                  )}
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="mt-4 mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={plan.popular ? "default" : "outline"} 
                    className="w-full"
                    asChild
                    data-testid={`button-plan-${plan.name.toLowerCase()}`}
                  >
                    <a href="/api/login">{plan.cta}</a>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>PM Learning Hub - Build your product sense, one lesson at a time.</p>
        </div>
      </footer>
    </div>
  );
}
