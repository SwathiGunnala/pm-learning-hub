import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, CreditCard, Shield, LogOut, Crown, CheckCircle, Loader2, ExternalLink, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Subscription, UserProgress2 } from "@shared/schema";

interface StripePrice {
  id: string;
  unitAmount: number;
  currency: string;
  recurring: { interval: string } | null;
}

interface StripeProduct {
  id: string;
  name: string;
  description: string;
  prices: StripePrice[];
}

const FREE_FEATURES = ["5 case studies", "3 exercises/month", "Basic frameworks"];
const PRO_FEATURES = ["All 57 case studies", "Unlimited exercises", "AI feedback", "All frameworks", "Progress tracking", "Email reminders"];

export default function Settings() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [location] = useLocation();

  const { data: subscription } = useQuery<Subscription>({
    queryKey: ["/api/subscription"],
  });

  const { data: userSettings } = useQuery<UserProgress2>({
    queryKey: ["/api/user-progress-db"],
  });

  const { data: stripeProducts } = useQuery<{ data: StripeProduct[] }>({
    queryKey: ["/api/stripe/products"],
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "success") {
      toast({ title: "Subscription activated!", description: "Welcome to Pro. Enjoy unlimited access." });
      queryClient.invalidateQueries({ queryKey: ["/api/subscription"] });
      window.history.replaceState({}, "", "/settings");
    } else if (params.get("checkout") === "cancel") {
      toast({ title: "Checkout cancelled", description: "You can upgrade any time." });
      window.history.replaceState({}, "", "/settings");
    }
  }, [toast]);

  const updateSettings = useMutation({
    mutationFn: async (data: { emailNotifications?: boolean; streakReminders?: boolean }) => {
      return apiRequest("PATCH", "/api/user-settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user-progress-db"] });
      toast({ title: "Settings updated", description: "Your preferences have been saved." });
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: async (priceId: string) => {
      const response = await apiRequest("POST", "/api/stripe/checkout", { priceId });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.url) window.location.href = data.url;
    },
    onError: (err: any) => {
      toast({ title: "Checkout failed", description: "Please try again.", variant: "destructive" });
    },
  });

  const portalMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/stripe/portal", {});
      return response.json();
    },
    onSuccess: (data) => {
      if (data.url) window.location.href = data.url;
    },
    onError: () => {
      toast({ title: "Could not open billing portal", variant: "destructive" });
    },
  });

  const isPro = subscription?.plan === "pro";

  const proProduct = stripeProducts?.data?.find(p => p.name === "Pro Plan");
  const monthlyPrice = proProduct?.prices?.find(p => p.recurring?.interval === "month");
  const yearlyPrice = proProduct?.prices?.find(p => p.recurring?.interval === "year");

  const features = isPro ? PRO_FEATURES : FREE_FEATURES;

  return (
    <div className="space-y-6 p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and subscription</p>
      </div>

      {/* Profile */}
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

      {/* Subscription */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <CreditCard className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Subscription</h2>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{isPro ? "Pro" : "Free"} Plan</span>
              {isPro && <Crown className="h-4 w-4 text-yellow-500" />}
            </div>
            <p className="text-sm text-muted-foreground">
              {isPro ? "$9.99/month" : "Free forever"}
            </p>
          </div>
          <Badge variant={subscription?.status === "active" ? "default" : "secondary"}>
            {subscription?.status || "active"}
          </Badge>
        </div>

        <Separator className="my-4" />

        <div className="space-y-2 mb-6">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {!isPro && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground font-medium">Upgrade to Pro for full access:</p>
            <div className="flex flex-wrap gap-3">
              {monthlyPrice && (
                <Button
                  onClick={() => checkoutMutation.mutate(monthlyPrice.id)}
                  disabled={checkoutMutation.isPending}
                  data-testid="button-upgrade-monthly"
                >
                  {checkoutMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Crown className="mr-2 h-4 w-4" />
                  $9.99 / month
                </Button>
              )}
              {yearlyPrice && (
                <Button
                  variant="outline"
                  onClick={() => checkoutMutation.mutate(yearlyPrice.id)}
                  disabled={checkoutMutation.isPending}
                  data-testid="button-upgrade-yearly"
                >
                  $79.99 / year
                  <Badge variant="secondary" className="ml-2">Save 33%</Badge>
                </Button>
              )}
              {!stripeProducts?.data?.length && (
                <Button disabled data-testid="button-upgrade">
                  <Crown className="mr-2 h-4 w-4" />
                  Upgrade to Pro — $9.99/mo
                </Button>
              )}
            </div>
          </div>
        )}

        {isPro && (
          <Button
            variant="outline"
            onClick={() => portalMutation.mutate()}
            disabled={portalMutation.isPending}
            data-testid="button-manage-billing"
          >
            {portalMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <ExternalLink className="mr-2 h-4 w-4" />
            Manage Billing
          </Button>
        )}
      </Card>

      {/* Notifications */}
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

      {/* Referral */}
      <ReferralCard />

      {/* Account */}
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

function ReferralCard() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const { data: codeData } = useQuery<{ code: string }>({
    queryKey: ["/api/referral/code"],
  });

  const { data: statsData } = useQuery<{ total: number; claimed: number; code: string | null }>({
    queryKey: ["/api/referral/stats"],
  });

  const referralLink = codeData?.code
    ? `${window.location.origin}/auth?ref=${codeData.code}`
    : null;

  const copyLink = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied!", description: "Share this link with a friend." });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Gift className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Invite Friends</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Share your referral link. When a friend signs up, you earn <span className="font-medium text-foreground">50 XP</span> bonus.
      </p>
      {referralLink && (
        <div className="flex items-center gap-2 mb-4">
          <code className="flex-1 text-sm bg-muted px-3 py-2 rounded-md truncate">{referralLink}</code>
          <Button variant="outline" size="sm" onClick={copyLink} data-testid="button-copy-referral">
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      )}
      {statsData && statsData.claimed > 0 && (
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{statsData.claimed}</span> friend{statsData.claimed !== 1 ? "s" : ""} joined with your link
        </p>
      )}
    </Card>
  );
}
