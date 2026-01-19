"use client";

import type { PeriodType } from "@/app/lib/db/stats";
import { useTranslation } from "@/app/lib/i18n";

interface PeriodSelectorProps {
  selected: PeriodType;
  onChange: (period: PeriodType) => void;
}

const periodKeys: PeriodType[] = ["monthly", "quarterly", "semiannual", "annual"];

export function PeriodSelector({ selected, onChange }: PeriodSelectorProps) {
  const { t } = useTranslation();

  const getLabel = (period: PeriodType) => {
    switch (period) {
      case "monthly":
        return t.stats.monthly;
      case "quarterly":
        return t.stats.quarterly;
      case "semiannual":
        return t.stats.semiannual;
      case "annual":
        return t.stats.annual;
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {periodKeys.map((period) => (
        <button
          key={period}
          onClick={() => onChange(period)}
          className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            selected === period
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          }`}
        >
          {getLabel(period)}
        </button>
      ))}
    </div>
  );
}
