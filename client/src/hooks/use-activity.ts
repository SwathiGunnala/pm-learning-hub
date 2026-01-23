import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "./use-auth";
import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

type ActivityType = 
  | "view" 
  | "complete" 
  | "submit" 
  | "login" 
  | "upgrade"
  | "page_view"
  | "session_start"
  | "feature_click"
  | "navigation"
  | "search"
  | "scroll_depth"
  | "time_on_page"
  | "error"
  | "milestone";

type EntityType = 
  | "case_study" 
  | "exercise" 
  | "framework" 
  | "challenge" 
  | "journal" 
  | "lesson"
  | "page"
  | "button"
  | "link"
  | "pillar"
  | "streak"
  | "xp";

interface ActivityData {
  activityType: ActivityType;
  entityType?: EntityType;
  entityId?: string;
  metadata?: Record<string, any>;
}

export function useTrackActivity() {
  const { isAuthenticated } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data: ActivityData) => {
      return apiRequest("POST", "/api/activity", data);
    },
    onError: (error) => {
      console.warn("Activity tracking failed:", error);
    },
  });

  const trackActivity = (data: ActivityData) => {
    if (!isAuthenticated) return;
    mutation.mutate(data);
  };

  return { trackActivity, isTracking: mutation.isPending };
}

export function usePageTracking() {
  const { trackActivity } = useTrackActivity();
  const [location] = useLocation();
  const lastLocation = useRef<string | null>(null);
  const pageStartTime = useRef<number>(Date.now());

  useEffect(() => {
    if (location !== lastLocation.current) {
      if (lastLocation.current) {
        const timeSpent = Math.round((Date.now() - pageStartTime.current) / 1000);
        trackActivity({
          activityType: "time_on_page",
          entityType: "page",
          entityId: lastLocation.current,
          metadata: { seconds: timeSpent }
        });
      }
      
      trackActivity({
        activityType: "page_view",
        entityType: "page",
        entityId: location,
        metadata: { 
          referrer: lastLocation.current,
          timestamp: new Date().toISOString()
        }
      });
      
      lastLocation.current = location;
      pageStartTime.current = Date.now();
    }
  }, [location, trackActivity]);

  return { currentPage: location };
}

export function useSessionTracking() {
  const { trackActivity } = useTrackActivity();
  const { isAuthenticated } = useAuth();
  const sessionTracked = useRef(false);

  useEffect(() => {
    if (isAuthenticated && !sessionTracked.current) {
      sessionTracked.current = true;
      const sessionId = `session_${Date.now()}`;
      trackActivity({
        activityType: "session_start",
        entityType: "page",
        entityId: window.location.pathname,
        metadata: {
          sessionId,
          userAgent: navigator.userAgent,
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
          timestamp: new Date().toISOString()
        }
      });
    }
  }, [isAuthenticated, trackActivity]);
}
