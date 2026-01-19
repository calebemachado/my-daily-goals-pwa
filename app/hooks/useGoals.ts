"use client";

import { useCallback, useEffect, useState } from "react";
import type { Goal, GoalType, GoalWithStatus } from "@/app/lib/db/types";
import {
  addGoal as dbAddGoal,
  archiveGoal,
  getActiveGoals,
  getCompletionsForDate,
  getGoalsForDate,
  toggleGoalCompletion,
} from "@/app/lib/db";
import { getTodayString, isToday } from "@/app/lib/db/utils";

interface UseGoalsOptions {
  date: string;
}

export function useGoals({ date }: UseGoalsOptions) {
  const [goals, setGoals] = useState<GoalWithStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isCurrentDay = isToday(date);

  const loadGoals = useCallback(async () => {
    setIsLoading(true);
    try {
      let goalsToShow: Goal[];

      if (isToday(date)) {
        goalsToShow = await getActiveGoals();
      } else {
        goalsToShow = await getGoalsForDate(date);
      }

      const completions = await getCompletionsForDate(date);
      const completedIds = new Set(completions.map((c) => c.goalId));

      const goalsWithStatus: GoalWithStatus[] = goalsToShow.map((goal) => ({
        ...goal,
        isCompletedToday: completedIds.has(goal.id),
      }));

      setGoals(goalsWithStatus);
    } catch (error) {
      console.error("Failed to load goals:", error);
    } finally {
      setIsLoading(false);
    }
  }, [date]);

  useEffect(() => {
    loadGoals();
  }, [loadGoals]);

  const addGoal = useCallback(
    async (title: string, type: GoalType) => {
      const goal = await dbAddGoal(title, type);
      if (isCurrentDay) {
        setGoals((prev) => [...prev, { ...goal, isCompletedToday: false }]);
      }
    },
    [isCurrentDay]
  );

  const toggleGoal = useCallback(
    async (goalId: string) => {
      if (!isCurrentDay) return;

      const goal = goals.find((g) => g.id === goalId);
      if (!goal) return;

      const isNowCompleted = await toggleGoalCompletion(goalId, date);

      if (goal.type === "one-time" && isNowCompleted) {
        await archiveGoal(goalId);
        setGoals((prev) => prev.filter((g) => g.id !== goalId));
      } else {
        setGoals((prev) =>
          prev.map((g) =>
            g.id === goalId ? { ...g, isCompletedToday: isNowCompleted } : g
          )
        );
      }
    },
    [isCurrentDay, date, goals]
  );

  const refreshGoals = useCallback(() => {
    loadGoals();
  }, [loadGoals]);

  return {
    goals,
    isLoading,
    isCurrentDay,
    addGoal,
    toggleGoal,
    refreshGoals,
  };
}
