import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
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
import type { CaseStudy } from "@shared/schema";

const filters = ["All", "Wins", "Fails", "SaaS", "Entertainment", "Productivity", "Social Media", "Real Estate"];

export default function Library() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const { data: caseStudies, isLoading } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
  });

  const filteredCases = caseStudies?.filter((study) => {
    const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "All") return matchesSearch;
    if (activeFilter === "Wins") return matchesSearch && study.outcome === "win";
    if (activeFilter === "Fails") return matchesSearch && study.outcome === "fail";
    return matchesSearch && study.industry === activeFilter;
  }) || [];

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
