"use client";

import type { PeriodType } from "@/app/lib/db/stats";

interface PeriodSelectorProps {
  selected: PeriodType;
  onChange: (period: PeriodType) => void;
}

const periods: { value: PeriodType; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "semiannual", label: "Semi-annual" },
  { value: "annual", label: "Annual" },
];

export function PeriodSelector({ selected, onChange }: PeriodSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => onChange(period.value)}
          className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            selected === period.value
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
