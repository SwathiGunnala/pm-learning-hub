import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, CreditCard, Shield, Mail, LogOut, Crown, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Subscription, UserProgress2 } from "@shared/schema";

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    features: ["5 case studies", "3 exercises/month", "Basic frameworks"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    features: ["All case studies", "Unlimited exercises", "AI feedback", "All frameworks", "Progress tracking", "Email reminders"],
  },
];

export default function Settings() {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const { data: subscription } = useQuery<Subscription>({
    queryKey: ["/api/subscription"],
  });

  const { data: userSettings } = useQuery<UserProgress2>({
    queryKey: ["/api/user-progress-db"],
  });

  const updateSettings = useMutation({
    mutationFn: async (data: { emailNotifications?: boolean; streakReminders?: boolean }) => {
      return apiRequest("PATCH", "/api/user-settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user-progress-db"] });
      toast({ title: "Settings updated", description: "Your preferences have been saved." });
    },
  });

  const currentPlan = plans.find(p => p.id === subscription?.plan) || plans[0];

  return (
    <div className="space-y-6 p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and subscription</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <User className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Profile</h2>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.profileImageUrl || ""} />
            <AvatarFallback>{user?.firstName?.[0] || user?.email?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user?.firstName} {user?.lastName}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <CreditCard className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Subscription</h2>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{currentPlan.name} Plan</span>
              {currentPlan.id === "pro" && <Crown className="h-4 w-4 text-yellow-500" />}
            </div>
            <p className="text-sm text-muted-foreground">
              {currentPlan.price === 0 ? "Free forever" : `$${currentPlan.price}/month`}
            </p>
          </div>
          <Badge variant={subscription?.status === "active" ? "default" : "secondary"}>
            {subscription?.status || "active"}
          </Badge>
        </div>
        <Separator className="my-4" />
        <div className="space-y-2 mb-4">
          {currentPlan.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        {currentPlan.id === "free" && (
          <Button className="w-full" data-testid="button-upgrade">
            <Crown className="mr-2 h-4 w-4" />
            Upgrade to Pro
          </Button>
        )}
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive updates about new content and features</p>
            </div>
            <Switch
              id="email-notifications"
              checked={userSettings?.emailNotifications ?? true}
              onCheckedChange={(checked) => updateSettings.mutate({ emailNotifications: checked })}
              data-testid="switch-email-notifications"
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="streak-reminders" className="font-medium">Streak Reminders</Label>
              <p className="text-sm text-muted-foreground">Get reminded to maintain your learning streak</p>
            </div>
            <Switch
              id="streak-reminders"
              checked={userSettings?.streakReminders ?? true}
              onCheckedChange={(checked) => updateSettings.mutate({ streakReminders: checked })}
              data-testid="switch-streak-reminders"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Account</h2>
        </div>
        <Button variant="outline" onClick={() => logout()} data-testid="button-logout">
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </Card>
    </div>
  );
}
