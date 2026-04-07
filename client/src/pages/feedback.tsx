import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageSquare, Plus, Clock, Loader2, CheckCircle2, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { UserFeedback } from "@shared/schema";

const feedbackSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Please provide more details (at least 20 characters)"),
  category: z.enum(["bug", "feature", "ux", "content", "other"]),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

const statusConfig: Record<string, { color: string; label: string }> = {
  new: { color: "bg-blue-500", label: "New" },
  reviewing: { color: "bg-yellow-500", label: "Reviewing" },
  actioned: { color: "bg-green-500", label: "Actioned" },
  archived: { color: "bg-gray-500", label: "Archived" },
};

const categoryLabels: Record<string, string> = {
  bug: "Bug Report",
  feature: "Feature Request",
  ux: "UX Improvement",
  content: "Content",
  other: "Other",
};

export default function Feedback() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: feedbackList, isLoading } = useQuery<UserFeedback[]>({
    queryKey: ["/api/feedback"],
  });

  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "other",
    },
  });

  const createFeedback = useMutation({
    mutationFn: async (data: FeedbackFormData) => {
      return apiRequest("POST", "/api/feedback", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/feedback"] });
      toast({ title: "Feedback submitted", description: "Thank you for helping us improve!" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to submit feedback", variant: "destructive" });
    },
  });

  const onSubmit = (data: FeedbackFormData) => {
    createFeedback.mutate(data);
  };

  return (
    <div className="space-y-6 p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold" data-testid="text-feedback-title">Feedback</h1>
          <p className="text-muted-foreground">Help us improve Product Learning Hub with your suggestions and bug reports.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-new-feedback">
              <Plus className="mr-2 h-4 w-4" />
              Submit Feedback
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Feedback</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Brief summary of your feedback" {...field} data-testid="input-feedback-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-feedback-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bug">Bug Report</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="ux">UX Improvement</SelectItem>
                          <SelectItem value="content">Content Suggestion</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us more about your feedback, suggestions, or the bug you encountered..." 
                          className="min-h-32"
                          {...field} 
                          data-testid="input-feedback-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={createFeedback.isPending} data-testid="button-submit-feedback">
                  {createFeedback.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Feedback
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : feedbackList && feedbackList.length > 0 ? (
        <div className="space-y-4">
          {feedbackList.map((feedback) => (
            <Card key={feedback.id} className="p-4" data-testid={`card-feedback-${feedback.id}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-medium">{feedback.title}</h3>
                    <Badge variant="outline" className="capitalize">{categoryLabels[feedback.category] || feedback.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{feedback.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(feedback.createdAt!).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {feedback.adminResponse && (
                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Admin Response</span>
                        {feedback.respondedAt && (
                          <span className="text-xs text-muted-foreground">
                            {new Date(feedback.respondedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <p className="text-sm">{feedback.adminResponse}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={`${statusConfig[feedback.status]?.color || "bg-gray-500"} text-white`}>
                    {statusConfig[feedback.status]?.label || feedback.status}
                  </Badge>
                  {feedback.adminResponse && (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-medium mb-2">No feedback submitted yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Have an idea to improve Product Learning Hub? Found a bug? We'd love to hear from you!
          </p>
          <Button onClick={() => setIsDialogOpen(true)} data-testid="button-create-first-feedback">
            Submit Your First Feedback
          </Button>
        </Card>
      )}
    </div>
  );
}
