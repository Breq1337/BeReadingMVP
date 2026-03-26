"use client";

import { motion } from "framer-motion";
import { books } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { BookSearch } from "@/components/app/book-search";
import { useLocale } from "@/lib/locale-context";

export default function TeacherLibrary() {
  const { t } = useLocale();

  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          {t("app.bookLibrary")}
        </h1>
        <p className="text-sm text-muted-foreground">
          Busque livros reais pela Open Library ou use os títulos da plataforma
        </p>
      </motion.div>

      {/* Real book search via Open Library API */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          🌐 Buscar na Open Library
        </h2>
        <BookSearch />
      </motion.div>

      {/* Platform books */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold mb-4">Livros da Plataforma</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.06 }}
              className="bg-card rounded-2xl border border-border/60 p-6 hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{book.cover}</div>
              <h3 className="text-base font-semibold mb-0.5" style={{ fontFamily: "var(--font-heading)" }}>
                {book.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">
                {book.description}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="text-[10px]">{book.genre}</Badge>
                <Badge variant="secondary" className="text-[10px] capitalize">{book.difficulty}</Badge>
                <Badge variant="secondary" className="text-[10px]">{book.totalChapters} cap.</Badge>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-sm font-medium py-2.5 rounded-xl transition-colors">
                <BookOpen className="w-4 h-4" />
                {t("app.assignToClass")}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
