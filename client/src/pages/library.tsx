import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CaseStudyCard } from "@/components/case-study-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CaseStudy = {
  id: string;
  title: string;
  company: string;
  industry: string;
  outcome: "win" | "fail";
  preview: string;
  readTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  fullContent: string;
};

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "How Slack Became Essential for Teams",
    company: "Slack",
    industry: "SaaS",
    outcome: "win",
    preview: "From a gaming company's internal tool to a $27.7B acquisition by Salesforce.",
    readTime: "8 min",
    difficulty: "beginner",
    fullContent: "Slack started as an internal communication tool at Tiny Speck, a gaming company. When their game failed, they realized their chat tool was the real product...",
  },
  {
    id: "2",
    title: "Why Google+ Failed Despite Google's Resources",
    company: "Google",
    industry: "Social Media",
    outcome: "fail",
    preview: "Even with billions of users and massive resources, Google couldn't crack social networking.",
    readTime: "10 min",
    difficulty: "intermediate",
    fullContent: "Google+ launched in 2011 with high hopes of competing with Facebook. Despite forcing integration with other Google services...",
  },
  {
    id: "3",
    title: "Spotify's Freemium Model That Changed Music",
    company: "Spotify",
    industry: "Entertainment",
    outcome: "win",
    preview: "How giving away music for free became the path to profitability.",
    readTime: "12 min",
    difficulty: "intermediate",
    fullContent: "In an industry plagued by piracy, Spotify took a counterintuitive approach: give users free access to music with ads...",
  },
  {
    id: "4",
    title: "Quibi's $1.75 Billion Lesson",
    company: "Quibi",
    industry: "Entertainment",
    outcome: "fail",
    preview: "Why short-form premium video failed despite massive funding and star power.",
    readTime: "9 min",
    difficulty: "beginner",
    fullContent: "Quibi launched in April 2020 with the premise that people wanted short, high-quality videos for their commutes...",
  },
  {
    id: "5",
    title: "Notion's Community-Led Growth",
    company: "Notion",
    industry: "Productivity",
    outcome: "win",
    preview: "How Notion built a passionate community that became their best marketing channel.",
    readTime: "7 min",
    difficulty: "beginner",
    fullContent: "Notion's approach to growth was radically different from typical SaaS playbooks. Instead of heavy sales teams...",
  },
  {
    id: "6",
    title: "WeWork's Overvaluation Catastrophe",
    company: "WeWork",
    industry: "Real Estate",
    outcome: "fail",
    preview: "When 'community-adjusted EBITDA' and mission statements couldn't hide fundamental business problems.",
    readTime: "15 min",
    difficulty: "advanced",
    fullContent: "WeWork was once valued at $47 billion. But as IPO preparations began, the cracks started showing...",
  },
];

const filters = ["All", "Wins", "Fails", "SaaS", "Entertainment", "Productivity"];

export default function Library() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const filteredCases = caseStudies.filter((study) => {
    const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "All") return matchesSearch;
    if (activeFilter === "Wins") return matchesSearch && study.outcome === "win";
    if (activeFilter === "Fails") return matchesSearch && study.outcome === "fail";
    return matchesSearch && study.industry === activeFilter;
  });

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Strategy Library</h1>
        <p className="text-muted-foreground">
          Learn from real product wins and fails across industries
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Badge
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              className="cursor-pointer px-4 py-2"
              onClick={() => setActiveFilter(filter)}
              data-testid={`filter-${filter.toLowerCase()}`}
            >
              {filter}
            </Badge>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-cases"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCases.map((study) => (
          <CaseStudyCard
            key={study.id}
            {...study}
            onClick={() => setSelectedCase(study)}
          />
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No case studies found matching your criteria.</p>
        </div>
      )}

      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedCase && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>{selectedCase.company}</span>
                  <span>•</span>
                  <span>{selectedCase.industry}</span>
                  <span>•</span>
                  <span>{selectedCase.readTime}</span>
                </div>
                <DialogTitle className="text-2xl">{selectedCase.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <p className="text-lg text-muted-foreground">{selectedCase.preview}</p>
                <div className="prose dark:prose-invert">
                  <p>{selectedCase.fullContent}</p>
                  <p className="text-muted-foreground italic">
                    Full case study content would appear here with detailed analysis, key decisions, outcomes, and lessons learned.
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
