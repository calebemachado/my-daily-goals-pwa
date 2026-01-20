"use client";

import type { GoalWithStatus } from "@/app/lib/db/types";
import { Checkbox } from "@/app/components/ui/Checkbox";
import { useTranslation } from "@/app/lib/i18n";

interface GoalItemProps {
  goal: GoalWithStatus;
  onToggle: () => void;
  onDelete?: (goal: GoalWithStatus) => void;
  disabled?: boolean;
}

export function GoalItem({
  goal,
  onToggle,
  onDelete,
  disabled,
}: GoalItemProps) {
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
      {!disabled && onDelete && (
        <button
          onClick={() => onDelete(goal)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          aria-label={t.goals.deleteGoal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
        </button>
      )}
    </div>
  );
}
