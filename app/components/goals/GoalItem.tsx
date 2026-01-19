"use client";

import type { GoalWithStatus } from "@/app/lib/db/types";
import { Checkbox } from "@/app/components/ui/Checkbox";
import { useTranslation } from "@/app/lib/i18n";

interface GoalItemProps {
  goal: GoalWithStatus;
  onToggle: () => void;
  disabled?: boolean;
}

export function GoalItem({ goal, onToggle, disabled }: GoalItemProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-all dark:border-zinc-800 dark:bg-zinc-900 ${
        goal.isCompletedToday ? "opacity-75" : ""
      }`}
    >
      <Checkbox
        checked={goal.isCompletedToday}
        onChange={onToggle}
        disabled={disabled}
      />
      <span
        className={`flex-1 text-zinc-900 transition-all dark:text-zinc-100 ${
          goal.isCompletedToday
            ? "text-zinc-400 line-through dark:text-zinc-500"
            : ""
        }`}
      >
        {goal.title}
      </span>
      {goal.type === "repeated" && (
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          {t.goals.daily}
        </span>
      )}
    </div>
  );
}
