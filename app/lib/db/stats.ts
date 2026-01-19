import type { Goal, GoalCompletion } from "./types";
import { openDB } from "./index";

export async function getAllCompletions(): Promise<GoalCompletion[]> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("completions", "readonly");
    const store = transaction.objectStore("completions");
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getCompletionsInRange(
  startDate: string,
  endDate: string
): Promise<GoalCompletion[]> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("completions", "readonly");
    const store = transaction.objectStore("completions");
    const index = store.index("by-date");
    const range = IDBKeyRange.bound(startDate, endDate);
    const request = index.getAll(range);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getGoalsCreatedBefore(date: string): Promise<Goal[]> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("goals", "readonly");
    const store = transaction.objectStore("goals");
    const request = store.getAll();

    request.onsuccess = () => {
      const goals = request.result as Goal[];
      const filtered = goals.filter((goal) => {
        const createdDate = goal.createdAt.split("T")[0];
        return createdDate <= date;
      });
      resolve(filtered);
    };
    request.onerror = () => reject(request.error);
  });
}

export interface PeriodStats {
  period: string;
  label: string;
  completed: number;
  total: number;
  rate: number;
}

export type PeriodType = "monthly" | "quarterly" | "semiannual" | "annual";

function getMonthLabel(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short" });
}

function getQuarterLabel(quarter: number, year: number): string {
  return `Q${quarter} ${year}`;
}

function getSemesterLabel(semester: number, year: number): string {
  return `${semester === 1 ? "H1" : "H2"} ${year}`;
}

function getYearLabel(year: number): string {
  return year.toString();
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export async function getStatsForPeriod(
  periodType: PeriodType,
  year: number = new Date().getFullYear()
): Promise<PeriodStats[]> {
  const completions = await getAllCompletions();
  const goals = await getGoalsCreatedBefore(formatDate(new Date()));

  const stats: PeriodStats[] = [];

  if (periodType === "monthly") {
    for (let month = 0; month < 12; month++) {
      const startDate = formatDate(new Date(year, month, 1));
      const endDate = formatDate(
        new Date(year, month, getDaysInMonth(year, month))
      );

      const periodCompletions = completions.filter(
        (c) => c.date >= startDate && c.date <= endDate
      );

      const goalsForPeriod = goals.filter((g) => {
        const createdDate = g.createdAt.split("T")[0];
        return createdDate <= endDate && !g.isArchived;
      });

      const daysInMonth = getDaysInMonth(year, month);
      const repeatedGoals = goalsForPeriod.filter((g) => g.type === "repeated");
      const totalPossible = repeatedGoals.length * daysInMonth;

      const completed = periodCompletions.length;
      const rate = totalPossible > 0 ? (completed / totalPossible) * 100 : 0;

      stats.push({
        period: startDate,
        label: getMonthLabel(new Date(year, month, 1)),
        completed,
        total: totalPossible,
        rate: Math.round(rate),
      });
    }
  } else if (periodType === "quarterly") {
    for (let quarter = 1; quarter <= 4; quarter++) {
      const startMonth = (quarter - 1) * 3;
      const endMonth = startMonth + 2;

      const startDate = formatDate(new Date(year, startMonth, 1));
      const endDate = formatDate(
        new Date(year, endMonth, getDaysInMonth(year, endMonth))
      );

      const periodCompletions = completions.filter(
        (c) => c.date >= startDate && c.date <= endDate
      );

      const goalsForPeriod = goals.filter((g) => {
        const createdDate = g.createdAt.split("T")[0];
        return createdDate <= endDate && !g.isArchived;
      });

      let totalDays = 0;
      for (let m = startMonth; m <= endMonth; m++) {
        totalDays += getDaysInMonth(year, m);
      }

      const repeatedGoals = goalsForPeriod.filter((g) => g.type === "repeated");
      const totalPossible = repeatedGoals.length * totalDays;

      const completed = periodCompletions.length;
      const rate = totalPossible > 0 ? (completed / totalPossible) * 100 : 0;

      stats.push({
        period: startDate,
        label: getQuarterLabel(quarter, year),
        completed,
        total: totalPossible,
        rate: Math.round(rate),
      });
    }
  } else if (periodType === "semiannual") {
    for (let semester = 1; semester <= 2; semester++) {
      const startMonth = (semester - 1) * 6;
      const endMonth = startMonth + 5;

      const startDate = formatDate(new Date(year, startMonth, 1));
      const endDate = formatDate(
        new Date(year, endMonth, getDaysInMonth(year, endMonth))
      );

      const periodCompletions = completions.filter(
        (c) => c.date >= startDate && c.date <= endDate
      );

      const goalsForPeriod = goals.filter((g) => {
        const createdDate = g.createdAt.split("T")[0];
        return createdDate <= endDate && !g.isArchived;
      });

      let totalDays = 0;
      for (let m = startMonth; m <= endMonth; m++) {
        totalDays += getDaysInMonth(year, m);
      }

      const repeatedGoals = goalsForPeriod.filter((g) => g.type === "repeated");
      const totalPossible = repeatedGoals.length * totalDays;

      const completed = periodCompletions.length;
      const rate = totalPossible > 0 ? (completed / totalPossible) * 100 : 0;

      stats.push({
        period: startDate,
        label: getSemesterLabel(semester, year),
        completed,
        total: totalPossible,
        rate: Math.round(rate),
      });
    }
  } else if (periodType === "annual") {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear - 2; y <= currentYear; y++) {
      const startDate = formatDate(new Date(y, 0, 1));
      const endDate = formatDate(new Date(y, 11, 31));

      const periodCompletions = completions.filter(
        (c) => c.date >= startDate && c.date <= endDate
      );

      const goalsForPeriod = goals.filter((g) => {
        const createdDate = g.createdAt.split("T")[0];
        return createdDate <= endDate && !g.isArchived;
      });

      const isLeapYear = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
      const totalDays = isLeapYear ? 366 : 365;

      const repeatedGoals = goalsForPeriod.filter((g) => g.type === "repeated");
      const totalPossible = repeatedGoals.length * totalDays;

      const completed = periodCompletions.length;
      const rate = totalPossible > 0 ? (completed / totalPossible) * 100 : 0;

      stats.push({
        period: startDate,
        label: getYearLabel(y),
        completed,
        total: totalPossible,
        rate: Math.round(rate),
      });
    }
  }

  return stats;
}
