import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, TrendingUp, TrendingDown, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CaseStudyCard } from "@/components/case-study-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTrackActivity } from "@/hooks/use-activity";
import type { CaseStudy } from "@shared/schema";

const outcomeFilters = [
  { label: "All Outcomes", value: "all", icon: BookOpen },
  { label: "Wins", value: "win", icon: TrendingUp },
  { label: "Fails", value: "fail", icon: TrendingDown },
];

const difficultyFilters = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function Library() {
  const [searchQuery, setSearchQuery] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("All Levels");
  const [industryFilter, setIndustryFilter] = useState("All Industries");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const { trackActivity } = useTrackActivity();

  const { data: caseStudies, isLoading } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
  });

  useEffect(() => {
    if (selectedCase) {
      trackActivity({
        activityType: "view",
        entityType: "case_study",
        entityId: selectedCase.id,
        metadata: { title: selectedCase.title, company: selectedCase.company }
      });
    }
  }, [selectedCase, trackActivity]);

  const industries = useMemo(() => {
    if (!caseStudies) return ["All Industries"];
    const unique = Array.from(new Set(caseStudies.map(s => s.industry))).sort();
    return ["All Industries", ...unique];
  }, [caseStudies]);

  const filteredCases = useMemo(() => {
    if (!caseStudies) return [];
    
    return caseStudies.filter((study) => {
      const matchesSearch = searchQuery === "" || 
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesOutcome = outcomeFilter === "all" || study.outcome === outcomeFilter;
      const matchesDifficulty = difficultyFilter === "All Levels" || 
        study.difficulty?.toLowerCase() === difficultyFilter.toLowerCase();
      const matchesIndustry = industryFilter === "All Industries" || study.industry === industryFilter;
      
      return matchesSearch && matchesOutcome && matchesDifficulty && matchesIndustry;
    });
  }, [caseStudies, searchQuery, outcomeFilter, difficultyFilter, industryFilter]);

  const stats = useMemo(() => {
    if (!caseStudies) return { total: 0, wins: 0, fails: 0 };
    return {
      total: caseStudies.length,
      wins: caseStudies.filter(s => s.outcome === "win").length,
      fails: caseStudies.filter(s => s.outcome === "fail").length,
    };
  }, [caseStudies]);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Strategy Library</h1>
        <p className="text-muted-foreground">
          Learn from {stats.total} real product case studies - {stats.wins} wins, {stats.fails} fails
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {outcomeFilters.map((filter) => {
          const Icon = filter.icon;
          return (
            <Badge
              key={filter.value}
              variant={outcomeFilter === filter.value ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 gap-1"
              onClick={() => setOutcomeFilter(filter.value)}
              data-testid={`filter-outcome-${filter.value}`}
            >
              <Icon className="h-3 w-3" />
              {filter.label}
            </Badge>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:flex-wrap">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by company or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-cases"
          />
        </div>
        
        <Select value={industryFilter} onValueChange={setIndustryFilter}>
          <SelectTrigger className="w-full sm:w-48" data-testid="select-industry">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-full sm:w-40" data-testid="select-difficulty">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            {difficultyFilters.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="text-sm text-muted-foreground ml-auto">
          Showing {filteredCases.length} of {stats.total} case studies
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCases.map((study) => (
            <CaseStudyCard
              key={study.id}
              {...study}
              onClick={() => setSelectedCase(study)}
            />
          ))}
        </div>
      )}

      {!isLoading && filteredCases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No case studies found matching your criteria.</p>
        </div>
      )}

      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          {selectedCase && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>{selectedCase.company}</span>
                  <span>-</span>
                  <span>{selectedCase.industry}</span>
                  <span>-</span>
                  <span>{selectedCase.readTime}</span>
                </div>
                <DialogTitle className="text-2xl">{selectedCase.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                <p className="text-lg text-muted-foreground">{selectedCase.preview}</p>
                <div className="prose dark:prose-invert prose-sm max-w-none">
                  {selectedCase.content.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('**')) {
                      const text = paragraph.replace(/\*\*/g, '');
                      return <h3 key={idx} className="font-semibold text-lg mt-6 mb-2">{text}</h3>;
                    }
                    if (paragraph.startsWith('1.') || paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n').filter(Boolean);
                      return (
                        <ul key={idx} className="list-disc pl-6 space-y-1">
                          {items.map((item, i) => (
                            <li key={i}>{item.replace(/^[\d\-\.\)]+\s*/, '').replace(/\*\*/g, '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={idx}>{paragraph}</p>;
                  })}
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-3">Key Lessons</h3>
                  <ul className="space-y-2">
                    {selectedCase.lessons.map((lesson, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary font-bold">{idx + 1}.</span>
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
