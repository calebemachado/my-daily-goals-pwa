"use client";

import { useState, useRef, useEffect } from "react";
import type { GoalType } from "@/app/lib/db/types";
import { Input } from "@/app/components/ui/Input";
import { Modal } from "@/app/components/ui/Modal";
import { useTranslation } from "@/app/lib/i18n";

interface AddGoalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, type: GoalType) => void;
}

export function AddGoalForm({ isOpen, onClose, onAdd }: AddGoalFormProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<GoalType>("repeated");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), type);
      setTitle("");
      setType("repeated");
      onClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setType("repeated");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {t.goals.addNewGoal}
        </h2>

        <Input
          ref={inputRef}
          type="text"
          placeholder={t.goals.whatToAccomplish}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {t.goals.repeat}
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setType("repeated")}
              className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                type === "repeated"
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600"
              }`}
            >
              {t.goals.everyDay}
            </button>
            <button
              type="button"
              onClick={() => setType("one-time")}
              className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                type === "one-time"
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                  : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600"
              }`}
            >
              {t.goals.onlyToday}
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-lg border border-zinc-200 px-4 py-3 font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            {t.common.cancel}
          </button>
          <button
            type="submit"
            disabled={!title.trim()}
            className="flex-1 rounded-lg bg-zinc-900 px-4 py-3 font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {t.goals.addGoal}
          </button>
        </div>
      </form>
    </Modal>
  );
}
