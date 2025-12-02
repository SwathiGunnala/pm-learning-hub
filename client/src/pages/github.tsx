import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Github, Loader2, CheckCircle2, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
};

export default function GitHubPage() {
  const [repoName, setRepoName] = useState("pm-learning-hub");
  const [description, setDescription] = useState("PM Learning Hub - Product Learning Platform for Product Managers");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isNewRepo, setIsNewRepo] = useState(true);
  const [pushResult, setPushResult] = useState<{ success: boolean; repoUrl: string } | null>(null);
  const { toast } = useToast();

  const { data: user, isLoading: isLoadingUser } = useQuery<GitHubUser>({
    queryKey: ["/api/github/user"],
  });

  const pushMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/github/push", {
        repoName,
        description,
        isPrivate,
        isNewRepo,
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setPushResult(data);
        toast({
          title: "Success!",
          description: "Your code has been pushed to GitHub.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to push to GitHub",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to push to GitHub",
        variant: "destructive",
      });
    },
  });

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Github className="h-8 w-8" />
          Push to GitHub
        </h1>
        <p className="text-muted-foreground">
          Save your PM Learning Hub project to your GitHub account
        </p>
      </div>

      {user && (
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <img 
              src={user.avatar_url} 
              alt={user.login}
              className="h-12 w-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{user.name || user.login}</p>
              <p className="text-sm text-muted-foreground">@{user.login}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="repoName">Repository Name</Label>
              <Input
                id="repoName"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                placeholder="pm-learning-hub"
                data-testid="input-repo-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief description of your project"
                data-testid="input-repo-description"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Create New Repository</Label>
                <p className="text-sm text-muted-foreground">
                  {isNewRepo ? "A new repository will be created" : "Push to existing repository"}
                </p>
              </div>
              <Switch
                checked={isNewRepo}
                onCheckedChange={setIsNewRepo}
                data-testid="switch-new-repo"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Private Repository</Label>
                <p className="text-sm text-muted-foreground">
                  {isPrivate ? "Only you can see this repository" : "Anyone can see this repository"}
                </p>
              </div>
              <Switch
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
                data-testid="switch-private"
              />
            </div>

            <Button 
              className="w-full" 
              onClick={() => pushMutation.mutate()}
              disabled={pushMutation.isPending || !repoName}
              data-testid="button-push-github"
            >
              {pushMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Pushing to GitHub...
                </>
              ) : (
                <>
                  <Github className="mr-2 h-4 w-4" />
                  Push to GitHub
                </>
              )}
            </Button>
          </div>
        </Card>
      )}

      {pushResult?.success && (
        <Card className="p-6 border-green-500 bg-green-50 dark:bg-green-950/20">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-green-800 dark:text-green-200">
                Successfully pushed to GitHub!
              </h3>
              <a 
                href={pushResult.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                {pushResult.repoUrl}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
