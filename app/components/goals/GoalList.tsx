"use client";

import type { GoalWithStatus } from "@/app/lib/db/types";
import { GoalItem } from "./GoalItem";
import { EmptyState } from "./EmptyState";

interface GoalListProps {
  goals: GoalWithStatus[];
  isCurrentDay: boolean;
  onToggle: (goalId: string) => void;
  onAddGoal?: () => void;
}

export function GoalList({
  goals,
  isCurrentDay,
  onToggle,
  onAddGoal,
}: GoalListProps) {
  if (goals.length === 0) {
    return <EmptyState isCurrentDay={isCurrentDay} onAddGoal={onAddGoal} />;
  }

  const pendingGoals = goals.filter((g) => !g.isCompletedToday);
  const completedGoals = goals.filter((g) => g.isCompletedToday);

  return (
    <div className="space-y-6">
      {pendingGoals.length > 0 && (
        <div className="space-y-3">
          {pendingGoals.map((goal) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              onToggle={() => onToggle(goal.id)}
              disabled={!isCurrentDay}
            />
          ))}
        </div>
      )}

      {completedGoals.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
              Completed ({completedGoals.length})
            </span>
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>
          {completedGoals.map((goal) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              onToggle={() => onToggle(goal.id)}
              disabled={!isCurrentDay}
            />
          ))}
        </div>
      )}
    </div>
  );
}
