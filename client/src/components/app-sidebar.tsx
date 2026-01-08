import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Home, Library, Dumbbell, Wrench, BookOpen, Flame, Zap, Trophy, Settings, HelpCircle, MessageSquare, LogOut } from "lucide-react";
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
import { useAuth } from "@/hooks/use-auth";
import type { UserProgress } from "@shared/schema";
import { levels } from "@shared/schema";

const navItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Strategy Library", url: "/library", icon: Library },
  { title: "Product Sense Gym", url: "/gym", icon: Dumbbell },
  { title: "Framework Toolkit", url: "/toolkit", icon: Wrench },
  { title: "Learning Journal", url: "/journal", icon: BookOpen },
];

const settingsItems = [
  { title: "Account Settings", url: "/settings", icon: Settings },
  { title: "Feedback", url: "/feedback", icon: MessageSquare },
  { title: "Support", url: "/support", icon: HelpCircle },
];

export function AppSidebar() {
  const [location] = useLocation();
  const { user } = useAuth();

  const { data: progress } = useQuery<UserProgress>({
    queryKey: ['/api/progress'],
  });

  const currentLevel = levels.find(l => l.level === (progress?.level || 1));

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Dumbbell className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">PM Learning Hub</h1>
            <p className="text-xs text-muted-foreground">Build your product sense</p>
          </div>
        </div>
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
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-3">
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
              <div className="flex items-center gap-1">
                <Flame className="h-3 w-3 text-orange-500" />
                <span>{progress?.streakDays || 0} days</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-purple-500" />
                <span>{progress?.totalXp || 0} XP</span>
              </div>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
