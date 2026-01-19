export function generateId(): string {
  return crypto.randomUUID();
}

export function getTodayString(): string {
  return new Date().toLocaleDateString("en-CA"); // Returns YYYY-MM-DD
}

export function getDateString(date: Date): string {
  return date.toLocaleDateString("en-CA");
}

export function formatDisplayDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  const today = getTodayString();
  const yesterday = getDateString(
    new Date(Date.now() - 24 * 60 * 60 * 1000)
  );

  if (dateString === today) {
    return "Today";
  }
  if (dateString === yesterday) {
    return "Yesterday";
  }

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function addDays(dateString: string, days: number): string {
  const date = new Date(dateString + "T00:00:00");
  date.setDate(date.getDate() + days);
  return getDateString(date);
}

export function isToday(dateString: string): boolean {
  return dateString === getTodayString();
}
