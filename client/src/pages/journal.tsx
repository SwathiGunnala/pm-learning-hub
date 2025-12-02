import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JournalEntryCard } from "@/components/journal-entry-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type JournalEntry = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  source: "library" | "gym" | "toolkit" | "personal";
  tags: string[];
  fullContent: string;
};

const initialEntries: JournalEntry[] = [
  {
    id: "1",
    title: "Key insight from Slack case study",
    excerpt: "The most interesting takeaway was how they pivoted from a gaming company. The team recognized that their internal tool had more value than the game itself...",
    date: "Today",
    source: "library",
    tags: ["pivots", "SaaS", "product-market-fit"],
    fullContent: "The most interesting takeaway was how they pivoted from a gaming company. The team recognized that their internal tool had more value than the game itself. This taught me to always pay attention to what users are actually engaging with, not what we intended them to use.",
  },
  {
    id: "2",
    title: "Prioritization exercise reflection",
    excerpt: "I learned that I tend to overweight CEO preferences in my prioritization. Need to balance stakeholder input with user data...",
    date: "Yesterday",
    source: "gym",
    tags: ["prioritization", "stakeholder-management"],
    fullContent: "I learned that I tend to overweight CEO preferences in my prioritization. Need to balance stakeholder input with user data. The AI feedback helped me see that I should be more confident in advocating for user needs.",
  },
  {
    id: "3",
    title: "RICE scoring notes",
    excerpt: "Finally understand why confidence matters so much in RICE. Without it, we'd just be making up numbers...",
    date: "3 days ago",
    source: "toolkit",
    tags: ["frameworks", "prioritization", "RICE"],
    fullContent: "Finally understand why confidence matters so much in RICE. Without it, we'd just be making up numbers. I'm going to start tracking my estimates vs actual outcomes to improve my confidence calibration over time.",
  },
  {
    id: "4",
    title: "Random product observation",
    excerpt: "Noticed how Uber shows surge pricing. They're transparent about the multiplier but make you feel like you're making a choice...",
    date: "1 week ago",
    source: "personal",
    tags: ["pricing", "UX", "transparency"],
    fullContent: "Noticed how Uber shows surge pricing. They're transparent about the multiplier but make you feel like you're making a choice by showing lower prices for waiting. Classic example of giving users control while still managing demand.",
  },
];

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>(initialEntries);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const { toast } = useToast();

  const filteredEntries = entries.filter((entry) =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleNewEntry = () => {
    setEditingEntry(null);
    setNewTitle("");
    setNewContent("");
    setIsDialogOpen(true);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setNewTitle(entry.title);
    setNewContent(entry.fullContent);
    setIsDialogOpen(true);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
    toast({
      title: "Entry deleted",
      description: "Your journal entry has been removed.",
    });
  };

  const handleSaveEntry = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    if (editingEntry) {
      setEntries(entries.map((e) =>
        e.id === editingEntry.id
          ? { ...e, title: newTitle, excerpt: newContent.slice(0, 150) + "...", fullContent: newContent }
          : e
      ));
      toast({
        title: "Entry updated",
        description: "Your changes have been saved.",
      });
    } else {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        title: newTitle,
        excerpt: newContent.slice(0, 150) + "...",
        date: "Just now",
        source: "personal",
        tags: [],
        fullContent: newContent,
      };
      setEntries([newEntry, ...entries]);
      toast({
        title: "Entry created",
        description: "Your new journal entry has been saved.",
      });
    }

    setIsDialogOpen(false);
  };

  const groupedByDate = filteredEntries.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {} as Record<string, JournalEntry[]>);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Learning Journal</h1>
          <p className="text-muted-foreground">
            Capture your insights and track your growth
          </p>
        </div>
        <Button onClick={handleNewEntry} data-testid="button-new-entry">
          <Plus className="mr-2 h-4 w-4" />
          New Entry
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search entries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
          data-testid="input-search-journal"
        />
      </div>

      <div className="space-y-8">
        {Object.entries(groupedByDate).map(([date, dateEntries]) => (
          <div key={date} className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground sticky top-0 bg-background py-2">
              {date}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {dateEntries.map((entry) => (
                <JournalEntryCard
                  key={entry.id}
                  {...entry}
                  onEdit={() => handleEditEntry(entry)}
                  onDelete={() => handleDeleteEntry(entry.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchQuery ? "No entries match your search." : "Start your learning journal with your first entry!"}
          </p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingEntry ? "Edit Entry" : "New Journal Entry"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="What did you learn?"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                data-testid="input-entry-title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Your Thoughts</Label>
              <Textarea
                id="content"
                placeholder="Capture your insights, reflections, or observations..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="min-h-48"
                data-testid="textarea-entry-content"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEntry} disabled={!newTitle.trim() || !newContent.trim()} data-testid="button-save-entry">
              {editingEntry ? "Save Changes" : "Create Entry"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
