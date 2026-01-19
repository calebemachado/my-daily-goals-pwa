"use client";

import { useEffect, useState } from "react";
import { openDB } from "@/app/lib/db";

export function useDB() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    openDB()
      .then(() => setIsReady(true))
      .catch((err) => setError(err));
  }, []);

  return { isReady, error };
}
