"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getStatsForPeriod,
  type PeriodStats,
  type PeriodType,
} from "@/app/lib/db/stats";

interface UseStatsOptions {
  periodType: PeriodType;
  year?: number;
}

export function useStats({ periodType, year }: UseStatsOptions) {
  const [stats, setStats] = useState<PeriodStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getStatsForPeriod(periodType, year);
      setStats(data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setIsLoading(false);
    }
  }, [periodType, year]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const totals = stats.reduce(
    (acc, s) => ({
      completed: acc.completed + s.completed,
      total: acc.total + s.total,
    }),
    { completed: 0, total: 0 }
  );

  const overallRate =
    totals.total > 0 ? Math.round((totals.completed / totals.total) * 100) : 0;

  return {
    stats,
    isLoading,
    totals: {
      ...totals,
      rate: overallRate,
    },
    refreshStats: loadStats,
  };
}
