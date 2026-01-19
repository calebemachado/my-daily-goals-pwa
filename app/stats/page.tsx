"use client";

import { useState } from "react";
import { useDB } from "@/app/hooks/useDB";
import { useStats } from "@/app/hooks/useStats";
import type { PeriodType } from "@/app/lib/db/stats";
import { PeriodSelector } from "@/app/components/stats/PeriodSelector";
import { StatCard } from "@/app/components/stats/StatCard";
import { CompletionChart } from "@/app/components/stats/CompletionChart";
import { BottomNav } from "@/app/components/navigation/BottomNav";

export default function StatsPage() {
  const [periodType, setPeriodType] = useState<PeriodType>("monthly");

  const { isReady } = useDB();
  const { stats, isLoading, totals } = useStats({ periodType });

  if (!isReady || isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 px-4 pb-24 pt-16 dark:bg-black">
        <div className="mx-auto w-full max-w-lg">
          <div className="mb-6 h-8 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mb-6 flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 w-24 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
          <div className="mb-6 flex gap-3">
            <div className="h-24 flex-1 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-24 flex-1 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="h-64 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-4 pb-24 pt-16 dark:bg-black">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Statistics
        </h1>

        <div className="mb-6">
          <PeriodSelector selected={periodType} onChange={setPeriodType} />
        </div>

        <div className="mb-6 flex gap-3">
          <StatCard
            title="Goals Completed"
            value={totals.completed}
            subtitle={`of ${totals.total} possible`}
          />
          <StatCard
            title="Completion Rate"
            value={`${totals.rate}%`}
            subtitle="overall average"
          />
        </div>

        <div className="mb-4">
          <h2 className="mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {periodType === "monthly" && "Goals completed per month"}
            {periodType === "quarterly" && "Goals completed per quarter"}
            {periodType === "semiannual" && "Goals completed per semester"}
            {periodType === "annual" && "Goals completed per year"}
          </h2>
          <CompletionChart data={stats} />
        </div>

        <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Breakdown
          </h3>
          <div className="space-y-2">
            {stats.map((stat) => (
              <div
                key={stat.period}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  {stat.label}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {stat.completed} completed
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      stat.rate >= 70
                        ? "text-green-600 dark:text-green-400"
                        : stat.rate >= 40
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {stat.rate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
