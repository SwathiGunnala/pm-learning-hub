import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JournalEntryCard } from "@/components/journal-entry-card";
import { Skeleton } from "@/components/ui/skeleton";
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
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { JournalEntry } from "@shared/schema";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

export default function Journal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const { toast } = useToast();

  const { data: entries, isLoading } = useQuery<JournalEntry[]>({
    queryKey: ["/api/journal"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: { title: string; content: string }) => {
      const res = await apiRequest("POST", "/api/journal", {
        ...data,
        source: "personal",
        tags: [],
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal"] });
      setIsDialogOpen(false);
      setNewTitle("");
      setNewContent("");
      toast({
        title: "Entry created",
        description: "Your new journal entry has been saved.",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { title: string; content: string } }) => {
      const res = await apiRequest("PATCH", `/api/journal/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal"] });
      setIsDialogOpen(false);
      setEditingEntry(null);
      setNewTitle("");
      setNewContent("");
      toast({
        title: "Entry updated",
        description: "Your changes have been saved.",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/journal/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal"] });
      toast({
        title: "Entry deleted",
        description: "Your journal entry has been removed.",
      });
    },
  });

  const filteredEntries = entries?.filter((entry) =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  const handleNewEntry = () => {
    setEditingEntry(null);
    setNewTitle("");
    setNewContent("");
    setIsDialogOpen(true);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setNewTitle(entry.title);
    setNewContent(entry.content);
    setIsDialogOpen(true);
  };

  const handleDeleteEntry = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleSaveEntry = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    if (editingEntry) {
      updateMutation.mutate({
        id: editingEntry.id,
        data: { title: newTitle, content: newContent },
      });
    } else {
      createMutation.mutate({ title: newTitle, content: newContent });
    }
  };

  const groupedByDate = filteredEntries.reduce((acc, entry) => {
    const dateLabel = formatDate(entry.date);
    if (!acc[dateLabel]) {
      acc[dateLabel] = [];
    }
    acc[dateLabel].push(entry);
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

      {isLoading ? (
        <div className="space-y-8">
          <Skeleton className="h-8 w-24" />
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        </div>
      ) : (
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
                    title={entry.title}
                    excerpt={entry.excerpt}
                    date={formatDate(entry.date)}
                    source={entry.source}
                    tags={entry.tags}
                    onEdit={() => handleEditEntry(entry)}
                    onDelete={() => handleDeleteEntry(entry.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && filteredEntries.length === 0 && (
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
            <Button 
              onClick={handleSaveEntry} 
              disabled={!newTitle.trim() || !newContent.trim() || createMutation.isPending || updateMutation.isPending} 
              data-testid="button-save-entry"
            >
              {editingEntry ? "Save Changes" : "Create Entry"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
