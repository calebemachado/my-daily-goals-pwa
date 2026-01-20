"use client";

import { Modal } from "@/app/components/ui/Modal";
import { useTranslation } from "@/app/lib/i18n";
import type { GoalWithStatus } from "@/app/lib/db/types";

interface DeleteGoalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  goal: GoalWithStatus | null;
}

export function DeleteGoalDialog({
  isOpen,
  onClose,
  onConfirm,
  goal,
}: DeleteGoalDialogProps) {
  const { t } = useTranslation();

  if (!goal) return null;

  const isRepeated = goal.type === "repeated";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {t.goals.deleteGoal}
        </h2>

        <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
          {t.goals.deleteGoalConfirm}
        </p>

        <p className="mb-2 font-medium text-zinc-900 dark:text-zinc-100">
          &ldquo;{goal.title}&rdquo;
        </p>

        <div
          className={`mb-6 rounded-lg p-3 text-sm ${
            isRepeated
              ? "bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
              : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
          }`}
        >
          {isRepeated
            ? t.goals.deleteGoalWarningRepeated
            : t.goals.deleteGoalWarningOneTime}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-zinc-200 px-4 py-3 font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            {t.common.cancel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition-colors hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
          >
            {t.goals.delete}
          </button>
        </div>
      </div>
    </Modal>
  );
}
