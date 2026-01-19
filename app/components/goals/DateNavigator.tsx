"use client";

import { formatDisplayDate, getTodayString } from "@/app/lib/db/utils";
import { useTranslation } from "@/app/lib/i18n";

interface DateNavigatorProps {
  currentDate: string;
  onDateChange: (date: string) => void;
}

export function DateNavigator({
  currentDate,
  onDateChange,
}: DateNavigatorProps) {
  const { t, locale } = useTranslation();
  const today = getTodayString();
  const isToday = currentDate === today;

  const goToPreviousDay = () => {
    const date = new Date(currentDate + "T00:00:00");
    date.setDate(date.getDate() - 1);
    onDateChange(date.toLocaleDateString("en-CA"));
  };

  const goToNextDay = () => {
    const date = new Date(currentDate + "T00:00:00");
    date.setDate(date.getDate() + 1);
    onDateChange(date.toLocaleDateString("en-CA"));
  };

  const goToToday = () => {
    onDateChange(today);
  };

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={goToPreviousDay}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800"
        aria-label={t.dates.previousDay}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-600 dark:text-zinc-400"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <div className="flex flex-col items-center">
        <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {formatDisplayDate(currentDate, locale)}
        </span>
        {!isToday && (
          <button
            onClick={goToToday}
            className="mt-1 text-sm text-zinc-500 underline transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            {t.dates.goToToday}
          </button>
        )}
      </div>

      <button
        onClick={goToNextDay}
        disabled={isToday}
        className={`flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 transition-colors dark:border-zinc-800 ${
          isToday
            ? "cursor-not-allowed opacity-30"
            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }`}
        aria-label={t.dates.nextDay}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-600 dark:text-zinc-400"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
