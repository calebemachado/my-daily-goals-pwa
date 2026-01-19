"use client";

import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  ComposedChart,
} from "recharts";
import type { PeriodStats } from "@/app/lib/db/stats";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/app/lib/i18n";

interface CompletionChartProps {
  data: PeriodStats[];
}

export function CompletionChart({ data }: CompletionChartProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="h-64 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
    );
  }

  const isDark = theme === "dark";

  const colors = {
    bar: isDark ? "#a1a1aa" : "#3f3f46",
    line: isDark ? "#fbbf24" : "#f59e0b",
    grid: isDark ? "#27272a" : "#e4e4e7",
    text: isDark ? "#a1a1aa" : "#71717a",
    tooltip: {
      bg: isDark ? "#18181b" : "#ffffff",
      border: isDark ? "#27272a" : "#e4e4e7",
    },
  };

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-zinc-500 dark:text-zinc-400">{t.stats.noDataAvailable}</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-64 w-full rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
    >
      {dimensions.width > 0 && dimensions.height > 0 ? (
        <ComposedChart
          data={data}
          width={dimensions.width - 32}
          height={dimensions.height - 32}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text, fontSize: 12 }}
            axisLine={{ stroke: colors.grid }}
            tickLine={{ stroke: colors.grid }}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: colors.text, fontSize: 12 }}
            axisLine={{ stroke: colors.grid }}
            tickLine={{ stroke: colors.grid }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            tick={{ fill: colors.text, fontSize: 12 }}
            axisLine={{ stroke: colors.grid }}
            tickLine={{ stroke: colors.grid }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.tooltip.bg,
              border: `1px solid ${colors.tooltip.border}`,
              borderRadius: "8px",
            }}
            labelStyle={{ color: colors.text }}
            formatter={(value, name) => {
              if (name === "rate") return [`${value}%`, t.stats.completionRate];
              return [value, t.stats.goalsCompleted];
            }}
          />
          <Bar
            yAxisId="left"
            dataKey="completed"
            fill={colors.bar}
            radius={[4, 4, 0, 0]}
            name="completed"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="rate"
            stroke={colors.line}
            strokeWidth={2}
            dot={{ fill: colors.line, strokeWidth: 0 }}
            name="rate"
          />
        </ComposedChart>
      ) : null}
    </div>
  );
}
