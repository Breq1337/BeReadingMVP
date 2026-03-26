"use client";

import { useLocale } from "@/lib/locale-context";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <button
      onClick={() => setLocale(locale === "pt" ? "en" : "pt")}
      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-lg hover:bg-secondary"
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4" />
      <span className="text-xs font-medium uppercase">{locale === "pt" ? "EN" : "PT"}</span>
    </button>
  );
}
