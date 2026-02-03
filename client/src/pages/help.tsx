import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HelpCircle, MessageSquare, Loader2, CheckCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";

const supportSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  description: z.string().min(20, "Please provide more details (at least 20 characters)"),
});

const feedbackSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  description: z.string().min(20, "Please provide more details (at least 20 characters)"),
});

type SupportFormData = z.infer<typeof supportSchema>;
type FeedbackFormData = z.infer<typeof feedbackSchema>;

export default function Help() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const supportForm = useForm<SupportFormData>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      email: user?.email || "",
      description: "",
    },
  });

  const feedbackForm = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      email: user?.email || "",
      description: "",
    },
  });

  const submitSupport = useMutation({
    mutationFn: async (data: SupportFormData) => {
      return apiRequest("POST", "/api/tickets", {
        subject: "Support Request",
        description: data.description,
        category: "general",
        priority: "medium",
        userEmail: data.email,
      });
    },
    onSuccess: () => {
      toast({ title: "Support request submitted", description: "We'll get back to you soon!" });
      setSupportSubmitted(true);
      supportForm.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to submit request", variant: "destructive" });
    },
  });

  const submitFeedback = useMutation({
    mutationFn: async (data: FeedbackFormData) => {
      return apiRequest("POST", "/api/feedback", {
        title: "User Feedback",
        description: data.description,
        category: "other",
        userEmail: data.email,
      });
    },
    onSuccess: () => {
      toast({ title: "Feedback submitted", description: "Thank you for helping us improve!" });
      setFeedbackSubmitted(true);
      feedbackForm.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to submit feedback", variant: "destructive" });
    },
  });

  const onSupportSubmit = (data: SupportFormData) => {
    submitSupport.mutate(data);
  };

  const onFeedbackSubmit = (data: FeedbackFormData) => {
    submitFeedback.mutate(data);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold" data-testid="text-help-title">Help & Feedback</h1>
        <p className="text-muted-foreground">Need help or have suggestions? We're here to listen.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card data-testid="card-support">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Support</CardTitle>
                <CardDescription>Get help with any issues</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {supportSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
                <div>
                  <p className="font-medium">Request Submitted</p>
                  <p className="text-sm text-muted-foreground">We'll get back to you soon!</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSupportSubmitted(false)}
                  data-testid="button-support-another"
                >
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <Form {...supportForm}>
                <form onSubmit={supportForm.handleSubmit(onSupportSubmit)} className="space-y-4">
                  <FormField
                    control={supportForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. john.doe@company.com" 
                            type="email"
                            {...field} 
                            data-testid="input-support-email" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={supportForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How can we help?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your issue or question..." 
                            className="min-h-24"
                            {...field} 
                            data-testid="input-support-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={submitSupport.isPending} 
                    data-testid="button-submit-support"
                  >
                    {submitSupport.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    Submit Request
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>

        <Card data-testid="card-feedback">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Submit Feedback or Suggestion</CardTitle>
                <CardDescription>Help us improve the platform</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {feedbackSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
                <div>
                  <p className="font-medium">Feedback Submitted</p>
                  <p className="text-sm text-muted-foreground">Thank you for your input!</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setFeedbackSubmitted(false)}
                  data-testid="button-feedback-another"
                >
                  Submit More Feedback
                </Button>
              </div>
            ) : (
              <Form {...feedbackForm}>
                <form onSubmit={feedbackForm.handleSubmit(onFeedbackSubmit)} className="space-y-4">
                  <FormField
                    control={feedbackForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. john.doe@company.com" 
                            type="email"
                            {...field} 
                            data-testid="input-feedback-email" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={feedbackForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Feedback or Suggestion</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share your ideas, suggestions, or feedback..." 
                            className="min-h-24"
                            {...field} 
                            data-testid="input-feedback-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={submitFeedback.isPending} 
                    data-testid="button-submit-feedback"
                  >
                    {submitFeedback.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    Submit Feedback
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
