"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { books, currentStudent } from "@/lib/mock-data";
import { searchBooks, type BookSearchResult } from "@/lib/open-library";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle2, Search, Loader2, Plus, BookMarked, Smartphone, X } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

const completedBookIds = ["b2", "b5"];

export default function StudentBooks() {
  const { t } = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BookSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookSearchResult | null>(null);
  const [bookType, setBookType] = useState<"physical" | "digital">("physical");
  const [addedBooks, setAddedBooks] = useState<BookSearchResult[]>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    const results = await searchBooks(searchQuery, 20);
    setSearchResults(results);
    setSearching(false);
  };

  const handleAddBook = () => {
    if (selectedBook) {
      setAddedBooks((prev) => [...prev, selectedBook]);
      setSelectedBook(null);
      setShowAddModal(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            {t("app.myBooks")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {currentStudent.booksCompleted} {t("app.booksCompleted")} · 1 {t("app.inProgress")}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          {t("app.addBook")}
        </button>
      </motion.div>

      {/* Add Book Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card rounded-2xl border border-border/60 w-full max-w-2xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-border/40">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                    {t("app.addNewBook")}
                  </h2>
                  <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Book type selector */}
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => setBookType("physical")}
                    className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      bookType === "physical" ? "border-warm bg-warm/5" : "border-border/60 hover:border-border"
                    }`}
                  >
                    <BookMarked className={`w-5 h-5 ${bookType === "physical" ? "text-warm" : "text-muted-foreground"}`} />
                    <div className="text-left">
                      <p className="text-sm font-medium">{t("app.physicalBook")}</p>
                      <p className="text-[10px] text-muted-foreground">{t("app.physicalBookDesc")}</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setBookType("digital")}
                    className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      bookType === "digital" ? "border-primary bg-primary/5" : "border-border/60 hover:border-border"
                    }`}
                  >
                    <Smartphone className={`w-5 h-5 ${bookType === "digital" ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="text-left">
                      <p className="text-sm font-medium">{t("app.digitalCatalog")}</p>
                      <p className="text-[10px] text-muted-foreground">{t("app.digitalCatalogDesc")}</p>
                    </div>
                  </button>
                </div>

                {/* Search */}
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder={t("app.searchPlaceholder")}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/60 bg-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-warm/50"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    disabled={searching || !searchQuery.trim()}
                    className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50"
                  >
                    {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : t("app.search")}
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">{t("app.openLibraryNote")}</p>
              </div>

              {/* Search Results */}
              <div className="overflow-y-auto max-h-[45vh] p-4">
                {searching && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">{t("app.searchingBooks")}</span>
                  </div>
                )}

                {!searching && searchResults.length > 0 && (
                  <div className="space-y-2">
                    {searchResults.map((book) => (
                      <button
                        key={book.id}
                        onClick={() => setSelectedBook(book)}
                        className={`w-full flex items-start gap-4 p-3 rounded-xl border text-left transition-all ${
                          selectedBook?.id === book.id
                            ? "border-warm bg-warm/5"
                            : "border-border/40 hover:border-border hover:bg-secondary/30"
                        }`}
                      >
                        {book.coverUrl ? (
                          <img src={book.coverUrl} alt={book.title} className="w-12 h-16 rounded-lg object-cover shrink-0" />
                        ) : (
                          <div className="w-12 h-16 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                            <BookOpen className="w-5 h-5 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">{book.title}</h4>
                          <p className="text-xs text-muted-foreground">{book.author}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {book.year && <span className="text-[10px] text-muted-foreground">{book.year}</span>}
                            {book.pages && <span className="text-[10px] text-muted-foreground">{book.pages} {t("app.pages")}</span>}
                            {book.subjects.length > 0 && (
                              <Badge variant="secondary" className="text-[10px]">{book.subjects[0]}</Badge>
                            )}
                          </div>
                        </div>
                        {selectedBook?.id === book.id && (
                          <CheckCircle2 className="w-5 h-5 text-warm shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {!searching && searchResults.length === 0 && searchQuery && (
                  <p className="text-center text-sm text-muted-foreground py-8">
                    {t("app.noResultsTryAgain")}
                  </p>
                )}
              </div>

              {/* Add button */}
              {selectedBook && (
                <div className="p-4 border-t border-border/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-xs capitalize">
                        {bookType === "physical" ? `📖 ${t("app.physical")}` : `📱 ${t("app.digital")}`}
                      </Badge>
                      <span className="text-sm font-medium">{selectedBook.title}</span>
                    </div>
                    <button
                      onClick={handleAddBook}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-warm text-white text-sm font-semibold hover:opacity-90"
                    >
                      <Plus className="w-4 h-4" />
                      {t("app.addToMyList")}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Currently reading */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">📖 {t("app.currentlyReading")}</p>
        {(() => {
          const book = books.find((b) => b.id === currentStudent.currentBookId)!;
          const progress = Math.round((currentStudent.currentChapter / book.totalChapters) * 100);
          return (
            <div className="bg-card rounded-2xl border border-border/60 p-6 hover:shadow-lg hover:shadow-primary/5 transition-shadow">
              <div className="flex items-start gap-5">
                <div className="w-16 h-22 rounded-xl bg-gradient-to-br from-warm/30 to-gold/20 border border-warm/20 flex items-center justify-center text-4xl shadow-lg shadow-warm/10 shrink-0">
                  {book.cover}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>{book.title}</h2>
                    <Badge variant="secondary" className="text-[10px] capitalize">{book.type || "physical"}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{t("app.by")} {book.author}</p>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{book.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">{book.genre}</Badge>
                    <Badge variant="secondary" className="text-xs capitalize">{book.difficulty}</Badge>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                    <motion.div className="bg-gradient-to-r from-warm to-gold h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1 }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{t("app.chapter")} {currentStudent.currentChapter} {t("app.of")} {book.totalChapters} — {progress}%</p>
                </div>
              </div>
            </div>
          );
        })()}
      </motion.div>

      {/* Recently Added */}
      {addedBooks.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">{t("app.recentlyAdded")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addedBooks.map((book) => (
              <div key={book.id} className="bg-card rounded-2xl border border-warm/20 p-4 flex items-start gap-4">
                {book.coverUrl ? (
                  <img src={book.coverUrl} alt={book.title} className="w-14 h-20 rounded-lg object-cover shrink-0" />
                ) : (
                  <div className="w-14 h-20 rounded-lg bg-secondary flex items-center justify-center shrink-0 text-2xl">📚</div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold truncate">{book.title}</h3>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                  <Badge variant="secondary" className="text-[10px] mt-2">{t("app.new")}</Badge>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Library */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">{t("app.library")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {books.map((book) => {
            const isCompleted = completedBookIds.includes(book.id);
            const isCurrent = book.id === currentStudent.currentBookId;
            return (
              <div key={book.id} className={`bg-card rounded-2xl border border-border/60 p-5 transition-all hover:shadow-md ${isCurrent ? "ring-2 ring-warm/30" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className="text-3xl shrink-0">{book.cover}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold">{book.title}</h3>
                      {isCompleted && <CheckCircle2 className="w-4 h-4 text-success shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge variant="secondary" className="text-[10px]">{book.genre}</Badge>
                      <Badge variant="secondary" className="text-[10px] capitalize">{book.type || "physical"}</Badge>
                      {isCurrent && <Badge className="text-[10px] bg-warm/15 text-warm-foreground border-0">{t("app.reading")}</Badge>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
