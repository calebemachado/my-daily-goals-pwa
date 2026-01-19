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

  return (
    <div className="space-y-3">
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          onToggle={() => onToggle(goal.id)}
          disabled={!isCurrentDay}
        />
      ))}
    </div>
  );
}
