import { useQuery } from "@tanstack/react-query";
import { Trophy, Flame, Zap, Medal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { levels } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";

interface LeaderboardEntry {
  id: string;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  totalXp: number;
  level: number;
  streakDays: number;
  lessonsCompleted: string[];
}

const rankColors = ["text-yellow-500", "text-slate-400", "text-amber-600"];
const rankIcons = [Trophy, Medal, Medal];

export default function Leaderboard() {
  const { user } = useAuth();

  const { data: entries, isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/leaderboard"],
  });

  const getInitials = (entry: LeaderboardEntry) => {
    const f = entry.firstName?.[0] || "";
    const l = entry.lastName?.[0] || "";
    return (f + l).toUpperCase() || "?";
  };

  const getLevelTitle = (level: number) => {
    return levels.find(l => l.level === level)?.title || `Level ${level}`;
  };

  const formatXp = (xp: number) => {
    if (xp >= 1000) return `${(xp / 1000).toFixed(1)}k`;
    return String(xp);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Leaderboard
        </h1>
        <p className="text-muted-foreground text-sm">Top learners ranked by XP earned this session</p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            </Card>
          ))}
        </div>
      ) : !entries || entries.length === 0 ? (
        <Card className="p-12 text-center">
          <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="font-medium mb-1">No learners yet</p>
          <p className="text-sm text-muted-foreground">Be the first to earn XP and claim the top spot!</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.map((entry, idx) => {
            const RankIcon = rankIcons[idx] || null;
            const rankColor = rankColors[idx] || "text-muted-foreground";
            const isCurrentUser = entry.id === user?.id;
            const lessonsCount = Array.isArray(entry.lessonsCompleted) ? entry.lessonsCompleted.length : 0;

            return (
              <Card
                key={entry.id}
                className={`p-4 transition-all ${isCurrentUser ? "ring-2 ring-primary" : ""}`}
                data-testid={`card-leaderboard-${idx + 1}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 text-center font-bold text-lg ${rankColor}`}>
                    {idx < 3 && RankIcon ? (
                      <RankIcon className="h-5 w-5 mx-auto" />
                    ) : (
                      <span className="text-muted-foreground text-base">#{idx + 1}</span>
                    )}
                  </div>

                  <Avatar className="h-10 w-10">
                    <AvatarImage src={entry.profileImageUrl || ""} />
                    <AvatarFallback>{getInitials(entry)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">
                        {entry.firstName || entry.lastName
                          ? `${entry.firstName || ""} ${entry.lastName || ""}`.trim()
                          : "Anonymous Learner"}
                      </p>
                      {isCurrentUser && (
                        <Badge variant="secondary" className="text-xs">You</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{getLevelTitle(entry.level)}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm shrink-0">
                    {entry.streakDays > 0 && (
                      <div className="flex items-center gap-1 text-orange-500">
                        <Flame className="h-4 w-4" />
                        <span className="font-medium">{entry.streakDays}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-primary">
                      <Zap className="h-4 w-4" />
                      <span className="font-bold">{formatXp(entry.totalXp)}</span>
                      <span className="text-muted-foreground text-xs">XP</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
