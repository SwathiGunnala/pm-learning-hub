import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Users, 
  Activity, 
  Eye, 
  Clock, 
  TrendingUp,
  BarChart3,
  MousePointer,
  ArrowRight
} from "lucide-react";
import { format } from "date-fns";

interface OverviewData {
  totalUsers: number;
  activeUsersToday: number;
  activeUsersThisWeek: number;
  totalSessions: number;
  totalPageViews: number;
}

interface PageView {
  page: string;
  views: number;
}

interface ActivityBreakdown {
  activityType: string;
  count: number;
}

interface FunnelStep {
  step: string;
  count: number;
}

interface TimeOnPage {
  page: string;
  avgTime: number;
  totalViews: number;
}

interface UserActivity {
  userId: string;
  activityType: string;
  entityType: string | null;
  entityId: string | null;
  metadata: any;
  createdAt: string;
}

export default function Analytics() {
  const { data: overview, isLoading: overviewLoading, error: overviewError } = useQuery<OverviewData>({
    queryKey: ["/api/analytics/overview"]
  });

  const { data: pageViews, isLoading: pageViewsLoading } = useQuery<PageView[]>({
    queryKey: ["/api/analytics/page-views"]
  });

  const { data: activityBreakdown, isLoading: breakdownLoading } = useQuery<ActivityBreakdown[]>({
    queryKey: ["/api/analytics/activity-breakdown"]
  });

  const { data: funnel, isLoading: funnelLoading } = useQuery<{ funnel: FunnelStep[] }>({
    queryKey: ["/api/analytics/funnel"]
  });

  const { data: timeOnPage, isLoading: timeLoading } = useQuery<TimeOnPage[]>({
    queryKey: ["/api/analytics/time-on-page"]
  });

  const { data: journeys, isLoading: journeysLoading } = useQuery<{ recentActivities: UserActivity[] }>({
    queryKey: ["/api/analytics/user-journeys"]
  });

  if (overviewError) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              <p>Admin access required to view analytics.</p>
              <p className="text-sm mt-2">Contact the app administrator to get access.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatPageName = (page: string | null) => {
    if (!page) return "Unknown";
    const names: Record<string, string> = {
      "/": "Dashboard",
      "/gym": "Product Sense Gym",
      "/library": "Strategy Library",
      "/toolkit": "Framework Toolkit",
      "/journal": "Learning Journal",
      "/settings": "Settings",
      "/support": "Support",
      "/feedback": "Feedback"
    };
    return names[page] || page;
  };

  const formatActivityType = (type: string) => {
    const labels: Record<string, string> = {
      page_view: "Page View",
      session_start: "Session Start",
      view: "Content View",
      complete: "Completion",
      submit: "Submission",
      login: "Login",
      time_on_page: "Time Tracking",
      feature_click: "Feature Click",
      navigation: "Navigation"
    };
    return labels[type] || type;
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" data-testid="text-analytics-title">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track user patterns and journeys</p>
        </div>
        <Badge variant="outline">Admin Only</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {overviewLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold" data-testid="stat-total-users">
                {overview?.totalUsers || 0}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            {overviewLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold" data-testid="stat-active-today">
                {overview?.activeUsersToday || 0}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium">Active This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            {overviewLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold" data-testid="stat-active-week">
                {overview?.activeUsersThisWeek || 0}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {overviewLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold" data-testid="stat-sessions">
                {overview?.totalSessions || 0}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {overviewLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold" data-testid="stat-page-views">
                {overview?.totalPageViews || 0}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              User Funnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            {funnelLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {funnel?.funnel.map((step, index) => {
                  const maxCount = funnel.funnel[0]?.count || 1;
                  const percentage = Math.round((step.count / maxCount) * 100);
                  return (
                    <div key={step.step} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          {index > 0 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                          {step.step}
                        </span>
                        <span className="font-medium">{step.count}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Top Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pageViewsLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {pageViews?.slice(0, 10).map((pv, index) => (
                  <div key={pv.page || index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm">{formatPageName(pv.page)}</span>
                    <Badge variant="secondary">{pv.views} views</Badge>
                  </div>
                ))}
                {(!pageViews || pageViews.length === 0) && (
                  <p className="text-sm text-muted-foreground text-center py-4">No page view data yet</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activity Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {breakdownLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4].map(i => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {activityBreakdown?.map((activity) => (
                  <div key={activity.activityType} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm">{formatActivityType(activity.activityType)}</span>
                    <Badge variant="outline">{activity.count}</Badge>
                  </div>
                ))}
                {(!activityBreakdown || activityBreakdown.length === 0) && (
                  <p className="text-sm text-muted-foreground text-center py-4">No activity data yet</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Avg. Time on Page
            </CardTitle>
          </CardHeader>
          <CardContent>
            {timeLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4].map(i => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {timeOnPage?.slice(0, 8).map((item, index) => (
                  <div key={item.page || index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm">{formatPageName(item.page)}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {Math.round(item.avgTime || 0)}s avg
                      </Badge>
                      <span className="text-xs text-muted-foreground">({item.totalViews} views)</span>
                    </div>
                  </div>
                ))}
                {(!timeOnPage || timeOnPage.length === 0) && (
                  <p className="text-sm text-muted-foreground text-center py-4">No time tracking data yet</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {journeysLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map(i => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Time</th>
                    <th className="text-left py-2 px-2">User</th>
                    <th className="text-left py-2 px-2">Activity</th>
                    <th className="text-left py-2 px-2">Page/Content</th>
                  </tr>
                </thead>
                <tbody>
                  {journeys?.recentActivities.slice(0, 20).map((activity, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-2 px-2 text-muted-foreground">
                        {activity.createdAt ? format(new Date(activity.createdAt), "MMM d, HH:mm") : "-"}
                      </td>
                      <td className="py-2 px-2 font-mono text-xs">
                        {activity.userId.slice(0, 8)}...
                      </td>
                      <td className="py-2 px-2">
                        <Badge variant="outline" className="text-xs">
                          {formatActivityType(activity.activityType)}
                        </Badge>
                      </td>
                      <td className="py-2 px-2">
                        {formatPageName(activity.entityId)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(!journeys?.recentActivities || journeys.recentActivities.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-8">No activity data yet. User interactions will appear here.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
