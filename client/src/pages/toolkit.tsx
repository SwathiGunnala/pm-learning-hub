import { useState } from "react";
import { 
  Grid3X3, 
  Target, 
  Users, 
  TrendingUp, 
  Layers, 
  Compass,
  ArrowLeft,
  Download,
  CheckCircle2
} from "lucide-react";
import { FrameworkCard } from "@/components/framework-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Framework = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
  whenToUse: string[];
  steps: string[];
  example: string;
  commonMistakes: string[];
};

const frameworks: Framework[] = [
  {
    id: "rice",
    icon: <Grid3X3 className="h-6 w-6" />,
    title: "RICE Scoring",
    description: "Prioritize features by Reach, Impact, Confidence, and Effort.",
    category: "Product Strategy",
    whenToUse: [
      "You have multiple feature ideas competing for attention",
      "You need a data-driven way to compare options",
      "Stakeholders disagree on what to build next",
    ],
    steps: [
      "Estimate Reach: How many users will this affect?",
      "Rate Impact: How much will it move your key metric? (0.25-3x)",
      "Set Confidence: How sure are you about your estimates? (0-100%)",
      "Calculate Effort: How many person-months will this take?",
      "Score = (Reach x Impact x Confidence) / Effort",
    ],
    example: "Spotify might use RICE to compare 'podcast recommendations' (high reach, medium impact) vs 'collaborative playlists' (medium reach, high impact).",
    commonMistakes: [
      "Inflating confidence scores without data",
      "Ignoring strategic fit for high-scoring features",
      "Treating the score as the final decision instead of a starting point",
    ],
  },
  {
    id: "jtbd",
    icon: <Target className="h-6 w-6" />,
    title: "Jobs-to-be-Done",
    description: "Understand what job users are hiring your product to do.",
    category: "Discovery",
    whenToUse: [
      "You're not sure why users choose your product",
      "You want to find new market opportunities",
      "Competitors keep surprising you",
    ],
    steps: [
      "Interview users about their last purchase/usage",
      "Identify the 'push' (what made them look for a solution)",
      "Find the 'pull' (what attracted them to your product)",
      "Uncover anxieties and habits holding them back",
      "Define the job story: When ___, I want to ___, so I can ___",
    ],
    example: "Milkshake buyers in the morning aren't just buying a snack - they're 'hiring' it for a boring commute that needs something engaging and filling.",
    commonMistakes: [
      "Focusing on product features instead of user motivations",
      "Assuming all users have the same job",
      "Confusing the job with the solution",
    ],
  },
  {
    id: "north-star",
    icon: <Compass className="h-6 w-6" />,
    title: "North Star Metric",
    description: "Identify the one metric that best captures the value you create for customers.",
    category: "Metrics",
    whenToUse: [
      "Teams are optimizing for different metrics",
      "You need to align company-wide priorities",
      "Short-term metrics are conflicting with long-term success",
    ],
    steps: [
      "Identify the core value you deliver to users",
      "Find a metric that captures that value delivery",
      "Ensure it connects to revenue/retention long-term",
      "Break it into input metrics teams can influence",
      "Track and review regularly",
    ],
    example: "Airbnb's North Star is 'Nights Booked' - it captures guest value (finding stays), host value (earning income), and company value (revenue).",
    commonMistakes: [
      "Choosing a vanity metric that doesn't drive business outcomes",
      "Picking something too easy to game",
      "Changing it too frequently",
    ],
  },
  {
    id: "user-persona",
    icon: <Users className="h-6 w-6" />,
    title: "User Personas",
    description: "Create detailed profiles of your ideal users to guide decisions.",
    category: "Discovery",
    whenToUse: [
      "The team has different ideas of who the user is",
      "You're designing a new feature or product",
      "Marketing and product aren't aligned",
    ],
    steps: [
      "Gather data from user research and analytics",
      "Identify patterns and common characteristics",
      "Create 3-5 distinct persona profiles",
      "Include goals, frustrations, and behaviors",
      "Validate with real user feedback",
    ],
    example: "Slack might have personas like 'Remote Team Lead' (needs visibility), 'IC Developer' (wants focus time), and 'HR Manager' (needs org-wide communication).",
    commonMistakes: [
      "Making up personas without research",
      "Creating too many personas",
      "Treating personas as static - they should evolve",
    ],
  },
  {
    id: "kano",
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Kano Model",
    description: "Categorize features by how they affect customer satisfaction.",
    category: "Product Strategy",
    whenToUse: [
      "You need to balance must-haves with delighters",
      "Resources are limited and trade-offs are necessary",
      "You want to find features that differentiate your product",
    ],
    steps: [
      "List all potential features",
      "Survey users: How would you feel if this feature exists/doesn't exist?",
      "Categorize: Must-be, Performance, Attractive, Indifferent, Reverse",
      "Prioritize must-haves first, then balance others",
      "Re-evaluate as expectations change",
    ],
    example: "For a banking app: Must-have (secure login), Performance (transfer speed), Attractive (spending insights), Indifferent (custom themes).",
    commonMistakes: [
      "Ignoring must-haves for exciting delighters",
      "Not realizing delighters become expectations over time",
      "Surveying the wrong audience",
    ],
  },
  {
    id: "opportunity",
    icon: <Layers className="h-6 w-6" />,
    title: "Opportunity Solution Tree",
    description: "Map the path from outcomes to experiments in a visual tree.",
    category: "Delivery",
    whenToUse: [
      "You need to align solutions with business outcomes",
      "You want to explore multiple solutions before committing",
      "The team is jumping straight to solutions without exploring the problem",
    ],
    steps: [
      "Start with your desired outcome at the top",
      "Branch into opportunities (user needs and pain points)",
      "Under each opportunity, brainstorm solutions",
      "For each solution, define experiments to test",
      "Let evidence guide which branches to pursue",
    ],
    example: "Outcome: Increase activation → Opportunity: Users don't understand value → Solutions: Onboarding tour, Sample projects, Video explainer → Experiments: A/B tests for each.",
    commonMistakes: [
      "Only exploring one solution per opportunity",
      "Skipping experimentation and going straight to building",
      "Not revisiting and updating the tree regularly",
    ],
  },
];

export default function Toolkit() {
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);

  if (selectedFramework) {
    return (
      <div className="space-y-6 p-6 lg:p-8 max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => setSelectedFramework(null)} data-testid="button-back-toolkit">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Toolkit
        </Button>

        <div className="grid gap-8 lg:grid-cols-[40%_60%]">
          <Card className="p-8 h-fit">
            <div className="space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {selectedFramework.icon}
              </div>
              <Badge>{selectedFramework.category}</Badge>
              <h1 className="text-2xl font-bold">{selectedFramework.title}</h1>
              <p className="text-muted-foreground">{selectedFramework.description}</p>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </div>
          </Card>

          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">When to Use</h2>
              <ul className="space-y-2">
                {selectedFramework.whenToUse.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Step-by-Step</h2>
              <ol className="space-y-3">
                {selectedFramework.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <Card className="p-6 bg-muted/30">
              <div className="space-y-2">
                <h3 className="font-semibold">Real Example</h3>
                <p className="text-sm">{selectedFramework.example}</p>
              </div>
            </Card>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Common Mistakes</h2>
              <ul className="space-y-2">
                {selectedFramework.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-destructive">•</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Framework Toolkit</h1>
        <p className="text-muted-foreground">
          Battle-tested frameworks explained simply, with real examples
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {frameworks.map((framework) => (
          <FrameworkCard
            key={framework.id}
            icon={framework.icon}
            title={framework.title}
            description={framework.description}
            category={framework.category}
            onClick={() => setSelectedFramework(framework)}
          />
        ))}
      </div>
    </div>
  );
}
