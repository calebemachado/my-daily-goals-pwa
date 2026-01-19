"use client";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="flex-1 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
      <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        {value}
      </p>
      {subtitle && (
        <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}
