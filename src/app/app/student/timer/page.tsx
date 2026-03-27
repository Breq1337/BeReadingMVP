"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, BookOpen, Clock, Trophy, Flame } from "lucide-react";
import { currentStudent, books } from "@/lib/mock-data";
import { useLocale } from "@/lib/locale-context";

export default function ReadingTimer() {
  const { t } = useLocale();
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionGoal] = useState(25 * 60); // 25 min default
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = Math.min((seconds / sessionGoal) * 100, 100);
  const currentBook = books.find((b) => b.id === currentStudent.currentBookId)!;

  return (
    <div className="p-6 lg:p-10 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-center" style={{ fontFamily: "var(--font-heading)" }}>
          {t("app.readingSession")}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-10">
          {t("app.readingSessionDesc")}
        </p>
      </motion.div>

      {/* Current book info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border/60 p-5 mb-8 flex items-center gap-4">
        <div className="text-3xl">{currentBook.cover}</div>
        <div>
          <p className="text-sm font-semibold">{currentBook.title}</p>
          <p className="text-xs text-muted-foreground">{t("app.chapter")} {currentStudent.currentChapter} {t("app.of")} {currentBook.totalChapters}</p>
        </div>
      </motion.div>

      {/* Timer circle */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
        className="flex flex-col items-center mb-10">
        <div className="relative w-64 h-64">
          <svg className="w-64 h-64 -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="4" className="text-secondary" />
            <motion.circle
              cx="100" cy="100" r="88" fill="none"
              stroke="url(#timerGrad)" strokeWidth="6" strokeLinecap="round"
              strokeDasharray={553}
              animate={{ strokeDashoffset: 553 - (553 * progress) / 100 }}
              transition={{ duration: 0.5 }}
            />
            <defs>
              <linearGradient id="timerGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--warm))" />
                <stop offset="100%" stopColor="hsl(var(--gold))" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold tracking-tight font-mono">{formatTime(seconds)}</span>
            <span className="text-xs text-muted-foreground mt-1">{t("app.goalMin")} {Math.floor(sessionGoal / 60)} {t("app.min")}</span>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <button
          onClick={() => { setSeconds(0); setIsRunning(false); }}
          className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
        >
          <RotateCcw className="w-5 h-5 text-muted-foreground" />
        </button>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
            isRunning ? "bg-destructive text-white shadow-destructive/20" : "bg-warm text-white shadow-warm/20"
          }`}
        >
          {isRunning ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
        </button>
        <button className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center opacity-0 pointer-events-none">
          <Clock className="w-5 h-5" />
        </button>
      </div>

      {/* Session stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl border border-border/60 p-4 text-center">
          <Clock className="w-5 h-5 text-warm mx-auto mb-2" />
          <div className="text-lg font-bold">{currentStudent.totalReadingMinutes}m</div>
          <p className="text-[10px] text-muted-foreground">{t("app.totalAccumulated")}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-4 text-center">
          <Flame className="w-5 h-5 text-destructive mx-auto mb-2" />
          <div className="text-lg font-bold">{currentStudent.streak}d</div>
          <p className="text-[10px] text-muted-foreground">{t("app.streakDays")}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-4 text-center">
          <Trophy className="w-5 h-5 text-gold-foreground mx-auto mb-2" />
          <div className="text-lg font-bold">+{Math.floor(seconds / 60) * 2}</div>
          <p className="text-[10px] text-muted-foreground">{t("app.xpThisSession")}</p>
        </div>
      </motion.div>
    </div>
  );
}
