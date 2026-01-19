"use client";

import { useTranslation } from "@/app/lib/i18n";
import type { Locale } from "@/app/lib/i18n";
import { useEffect, useState } from "react";

const languages: { code: Locale; flag: string }[] = [
  { code: "en", flag: "EN" },
  { code: "pt-BR", flag: "PT" },
];

export function LanguageSelector() {
  const { locale, setLocale } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800"
        aria-label="Select language"
      />
    );
  }

  const currentLang = languages.find((l) => l.code === locale);
  const nextLang = languages.find((l) => l.code !== locale);

  return (
    <button
      onClick={() => nextLang && setLocale(nextLang.code)}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800"
      aria-label="Select language"
      title={nextLang?.code === "pt-BR" ? "Portugues" : "English"}
    >
      {currentLang?.flag}
    </button>
  );
}
