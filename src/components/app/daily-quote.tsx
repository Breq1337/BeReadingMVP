"use client";

import { useEffect, useState } from "react";
import { getDailyQuote } from "@/lib/open-library";
import { Quote } from "lucide-react";

export function DailyQuote() {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null);

  useEffect(() => {
    getDailyQuote().then(setQuote);
  }, []);

  if (!quote) return null;

  return (
    <div className="bg-card rounded-2xl border border-border/60 p-6">
      <div className="flex items-start gap-3">
        <Quote className="w-5 h-5 text-warm shrink-0 mt-0.5" />
        <div>
          <p className="text-sm italic text-muted-foreground leading-relaxed">
            &ldquo;{quote.text}&rdquo;
          </p>
          <p className="text-xs text-warm mt-2 font-medium">— {quote.author}</p>
        </div>
      </div>
    </div>
  );
}
