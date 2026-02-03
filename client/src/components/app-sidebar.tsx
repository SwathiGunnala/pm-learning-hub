import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Home, Library, Dumbbell, Wrench, BookOpen, Flame, Zap, Trophy, Settings, HelpCircle, MessageSquare, LogIn, BarChart3 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import type { UserProgress } from "@shared/schema";
import { levels } from "@shared/schema";

const publicNavItems = [
  { title: "Framework Toolkit", url: "/toolkit", icon: Wrench, requiresAuth: false },
  { title: "Product Sense Gym", url: "/gym", icon: Dumbbell, requiresAuth: false },
  { title: "Strategy Library", url: "/library", icon: Library, requiresAuth: false },
];

const authNavItems = [
  { title: "Dashboard", url: "/", icon: Home, requiresAuth: true },
  { title: "Learning Journal", url: "/journal", icon: BookOpen, requiresAuth: true },
];

const settingsItems = [
  { title: "Account Settings", url: "/settings", icon: Settings },
  { title: "Feedback", url: "/feedback", icon: MessageSquare },
  { title: "Support", url: "/support", icon: HelpCircle },
  { title: "Analytics", url: "/analytics", icon: BarChart3, adminOnly: true },
];

export function AppSidebar() {
  const [location] = useLocation();
  const { user } = useAuth();

  const { data: progress } = useQuery<UserProgress>({
    queryKey: ['/api/progress'],
    enabled: !!user,
  });

  const currentLevel = levels.find(l => l.level === (progress?.level || 1));

  const navItems = user 
    ? [authNavItems[0], ...publicNavItems, authNavItems[1]]
    : publicNavItems;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer hover-elevate rounded-lg p-1 -m-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">PM Learning Hub</h1>
              <p className="text-xs text-muted-foreground">Build your product sense</p>
            </div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location === item.url || 
                  (item.url !== "/" && location.startsWith(item.url));
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user && (
          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {settingsItems.map((item) => {
                  const isActive = location === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive}
                        data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <Link href={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-3">
        {user ? (
          <>
            <div className="space-y-2 px-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <Trophy className="h-3 w-3 text-amber-500" />
                  <span className="font-medium">{currentLevel?.title || "PM Curious"}</span>
                </div>
                <span className="text-muted-foreground">{progress?.levelProgress || 0}%</span>
              </div>
              <Progress value={progress?.levelProgress || 0} className="h-1.5" />
            </div>

            <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.profileImageUrl || ""} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {user?.firstName?.[0] || user?.email?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.firstName || user?.email || "User"}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {progress?.streakDays ? (
                    <div className="flex items-center gap-1">
                      <Flame className="h-3 w-3 text-orange-500" />
                      <span>{progress.streakDays} days</span>
                    </div>
                  ) : (
                    <Link href="/gym" className="flex items-center gap-1 text-orange-500 hover:underline">
                      <Flame className="h-3 w-3" />
                      <span>Start streak</span>
                    </Link>
                  )}
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-purple-500" />
                    <span>{progress?.totalXp || 0} XP</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <div className="text-center px-2">
              <p className="text-sm text-muted-foreground">
                Sign in to track your progress and save your work
              </p>
            </div>
            <Button asChild className="w-full" data-testid="button-sidebar-login">
              <a href="/api/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In with Replit
              </a>
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
