export function generateId(): string {
  return crypto.randomUUID();
}

export function getTodayString(): string {
  return new Date().toLocaleDateString("en-CA"); // Returns YYYY-MM-DD
}

export function getDateString(date: Date): string {
  return date.toLocaleDateString("en-CA");
}

export function formatDisplayDate(
  dateString: string,
  locale: "en" | "pt-BR" = "en"
): string {
  const date = new Date(dateString + "T00:00:00");
  const today = getTodayString();
  const yesterday = getDateString(
    new Date(Date.now() - 24 * 60 * 60 * 1000)
  );

  const todayLabel = locale === "pt-BR" ? "Hoje" : "Today";
  const yesterdayLabel = locale === "pt-BR" ? "Ontem" : "Yesterday";

  if (dateString === today) {
    return todayLabel;
  }
  if (dateString === yesterday) {
    return yesterdayLabel;
  }

  return date.toLocaleDateString(locale, {
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
