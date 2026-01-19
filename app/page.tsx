"use client";

import { useState } from "react";
import { useDB } from "@/app/hooks/useDB";
import { useGoals } from "@/app/hooks/useGoals";
import { getTodayString } from "@/app/lib/db/utils";
import { GoalList } from "@/app/components/goals/GoalList";
import { DateNavigator } from "@/app/components/goals/DateNavigator";
import { AddGoalButton } from "@/app/components/goals/AddGoalButton";
import { AddGoalForm } from "@/app/components/goals/AddGoalForm";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { isReady } = useDB();
  const { goals, isLoading, isCurrentDay, addGoal, toggleGoal } = useGoals({
    date: selectedDate,
  });

  if (!isReady || isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 px-4 pb-24 pt-16 dark:bg-black">
        <div className="mx-auto w-full max-w-lg">
          <div className="mb-8 flex items-center justify-between">
            <div className="h-10 w-10 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-6 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-10 w-10 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-4 pb-24 pt-16 dark:bg-black">
      <div className="mx-auto w-full max-w-lg">
        <div className="mb-8">
          <DateNavigator
            currentDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>

        {!isCurrentDay && (
          <div className="mb-4 rounded-lg bg-zinc-100 px-4 py-2 text-center text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
            Viewing history - goals are read-only
          </div>
        )}

        <GoalList
          goals={goals}
          isCurrentDay={isCurrentDay}
          onToggle={toggleGoal}
          onAddGoal={() => setIsAddModalOpen(true)}
        />
      </div>

      {isCurrentDay && (
        <>
          <AddGoalButton onClick={() => setIsAddModalOpen(true)} />
          <AddGoalForm
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={addGoal}
          />
        </>
      )}
    </div>
  );
}
