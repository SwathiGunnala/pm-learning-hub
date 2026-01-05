import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "./use-auth";

type ActivityType = "view" | "complete" | "submit" | "login" | "upgrade";
type EntityType = "case_study" | "exercise" | "framework" | "challenge" | "journal" | "lesson";

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
