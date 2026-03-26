"use client";

import { motion } from "framer-motion";
import { books, currentStudent } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle2 } from "lucide-react";

const completedBookIds = ["b2", "b5"]; // mock completed books

export default function StudentBooks() {
  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          My Books
        </h1>
        <p className="text-sm text-muted-foreground">
          {currentStudent.booksCompleted} books completed · 1 in progress
        </p>
      </motion.div>

      {/* Currently reading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
          Currently Reading
        </p>
        {(() => {
          const book = books.find((b) => b.id === currentStudent.currentBookId)!;
          const progress = Math.round((currentStudent.currentChapter / book.totalChapters) * 100);
          return (
            <div className="bg-card rounded-2xl border border-border/60 p-6 hover:shadow-lg hover:shadow-primary/5 transition-shadow">
              <div className="flex items-start gap-5">
                <div className="text-5xl shrink-0">{book.cover}</div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                    {book.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{book.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">{book.genre}</Badge>
                    <Badge variant="secondary" className="text-xs capitalize">{book.difficulty}</Badge>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-warm h-2 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Chapter {currentStudent.currentChapter} of {book.totalChapters} — {progress}%
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
      </motion.div>

      {/* All books */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
          Library
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {books.map((book) => {
            const isCompleted = completedBookIds.includes(book.id);
            const isCurrent = book.id === currentStudent.currentBookId;
            return (
              <div
                key={book.id}
                className={`bg-card rounded-2xl border border-border/60 p-5 transition-all hover:shadow-md ${
                  isCurrent ? "ring-2 ring-warm/30" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{book.cover}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold">{book.title}</h3>
                      {isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                    <div className="flex items-center gap-1.5">
                      <Badge variant="secondary" className="text-[10px]">{book.genre}</Badge>
                      {isCurrent && (
                        <Badge className="text-[10px] bg-warm/15 text-warm-foreground border-0">
                          Reading
                        </Badge>
                      )}
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
