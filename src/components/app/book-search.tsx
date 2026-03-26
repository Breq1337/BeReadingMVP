"use client";

import { useState, useCallback } from "react";
import { Search, Loader2, BookOpen, ExternalLink } from "lucide-react";
import { searchBooks, type BookSearchResult } from "@/lib/open-library";
import { useLocale } from "@/lib/locale-context";
import Image from "next/image";

export function BookSearch() {
  const { t } = useLocale();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BookSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    const data = await searchBooks(query, 8);
    setResults(data);
    setLoading(false);
  }, [query]);

  return (
    <div>
      {/* Search bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder={t("app.searchBooks")}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-warm/50 transition-all"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          Buscar
        </button>
      </div>

      {/* Results */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-warm" />
          <span className="ml-3 text-sm text-muted-foreground">{t("app.searching")}</span>
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">{t("app.noResults")}</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground mb-4">
            {t("app.searchResults")} ({results.length}) — {t("app.poweredBy")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((book) => (
              <div
                key={book.id}
                className="bg-card rounded-2xl border border-border/60 p-5 hover:shadow-md transition-shadow flex gap-4"
              >
                {book.coverUrl ? (
                  <div className="w-16 h-24 rounded-lg overflow-hidden shrink-0 bg-secondary">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-24 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-muted-foreground/40" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold line-clamp-2">{book.title}</h4>
                  <p className="text-xs text-muted-foreground mb-1">{book.author}</p>
                  {book.year && (
                    <p className="text-[10px] text-muted-foreground">{book.year}</p>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {book.subjects.slice(0, 2).map((s) => (
                      <span key={s} className="text-[10px] bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">
                        {s}
                      </span>
                    ))}
                    {book.pages && (
                      <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">
                        {book.pages} pgs
                      </span>
                    )}
                  </div>
                  <button className="mt-3 flex items-center gap-1.5 text-xs font-medium text-warm hover:underline">
                    <BookOpen className="w-3 h-3" />
                    {t("app.assignToClass")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
