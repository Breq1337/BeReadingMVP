"use client";

import { motion } from "framer-motion";
import { BookOpen, Sparkles, Star, ArrowRight, Trophy, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { currentStudent, books, missions } from "@/lib/mock-data";
import { DailyQuote } from "@/components/app/daily-quote";
import { AIMissionGenerator } from "@/components/app/ai-mission-generator";
import { AnimatedFlame, AnimatedProgressRing, AnimatedBook } from "@/components/ui/animated-illustrations";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

const currentBook = books.find((b) => b.id === currentStudent.currentBookId)!;
const bookMissions = missions.filter((m) => m.bookId === currentStudent.currentBookId);
const nextMission = bookMissions.find((m) => !m.isCompleted);
const progressPercent = Math.round(
  (currentStudent.currentChapter / currentBook.totalChapters) * 100
);
const xpForNextLevel = (currentStudent.level + 1) * 200;
const xpProgress = Math.round((currentStudent.xp / xpForNextLevel) * 100);

export default function StudentJourney() {
  const { t } = useLocale();

  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      {/* Header with animated book */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <p className="text-sm text-muted-foreground mb-1">{t("app.welcomeBack")}</p>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {currentStudent.name.split(" ")[0]} ✨
          </h1>
        </div>
        <AnimatedBook className="w-24 h-20 hidden sm:block" />
      </motion.div>

      {/* Stats row — redesigned with animated elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {/* Streak with animated flame */}
        <div className="bg-card rounded-2xl border border-border/60 p-5 flex items-center justify-center">
          <AnimatedFlame streak={currentStudent.streak} />
        </div>

        {/* XP with ring */}
        <div className="bg-card rounded-2xl border border-border/60 p-4 flex flex-col items-center justify-center">
          <AnimatedProgressRing progress={xpProgress} size={80} />
          <p className="text-[10px] text-muted-foreground mt-2">
            {currentStudent.xp} / {xpForNextLevel} XP
          </p>
        </div>

        {/* Level */}
        <div className="bg-card rounded-2xl border border-border/60 p-5 text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center justify-center gap-1.5 text-success mb-1"
          >
            <Star className="w-6 h-6" />
            <span className="text-3xl font-bold">Nv.{currentStudent.level}</span>
          </motion.div>
          <p className="text-xs text-muted-foreground">{t("app.readerLevel")}</p>
        </div>

        {/* Books completed */}
        <div className="bg-card rounded-2xl border border-border/60 p-5 text-center">
          <div className="flex items-center justify-center gap-1.5 text-primary mb-1">
            <BookOpen className="w-6 h-6" />
            <span className="text-3xl font-bold">{currentStudent.booksCompleted}</span>
          </div>
          <p className="text-xs text-muted-foreground">{t("app.booksFinished")}</p>
        </div>
      </motion.div>

      {/* Current Book — premium card with cover area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card rounded-2xl border border-border/60 overflow-hidden mb-6"
      >
        <div className="bg-gradient-to-r from-primary/5 via-warm/5 to-gold/5 p-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
            📖 {t("app.currentlyReading")}
          </p>
          <div className="flex items-start gap-5">
            <div className="w-20 h-28 rounded-xl bg-gradient-to-br from-warm/30 to-gold/20 border border-warm/20 flex items-center justify-center text-4xl shadow-lg shadow-warm/10 shrink-0">
              {currentBook.cover}
            </div>
            <div className="flex-1 min-w-0">
              <h2
                className="text-xl font-semibold mb-0.5"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {currentBook.title}
              </h2>
              <p className="text-sm text-muted-foreground mb-1">
                {t("app.by")} {currentBook.author}
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="text-xs">
                  {currentBook.genre}
                </Badge>
                <Badge variant="secondary" className="text-xs capitalize">
                  {currentBook.difficulty}
                </Badge>
              </div>

              {/* Enhanced progress bar */}
              <div className="relative">
                <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-warm to-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                {/* Chapter markers */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">
                    {t("app.chapter")} {currentStudent.currentChapter} {t("app.of")}{" "}
                    {currentBook.totalChapters}
                  </span>
                  <span className="text-xs font-semibold text-warm">
                    {progressPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Mission Generator — THE KEY FEATURE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6"
      >
        <AIMissionGenerator
          bookTitle={currentBook.title}
          bookAuthor={currentBook.author}
          chapter={currentStudent.currentChapter}
          totalChapters={currentBook.totalChapters}
          studentName={currentStudent.name.split(" ")[0]}
          studentLevel={currentStudent.level <= 3 ? "iniciante" : currentStudent.level <= 6 ? "intermediário" : "avançado"}
        />
      </motion.div>

      {/* Daily Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mb-6"
      >
        <DailyQuote />
      </motion.div>

      {/* Next Mission (static) */}
      {nextMission && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card rounded-2xl border border-border/60 p-6 mb-6 hover:shadow-lg hover:shadow-warm/5 transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {t("app.nextManualMission")}
              </span>
            </div>
            <span className="text-xs bg-gold/15 text-gold-foreground px-2.5 py-1 rounded-full font-medium">
              +{nextMission.xpReward} XP
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2">{nextMission.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {nextMission.description}
          </p>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs capitalize">
              {nextMission.type}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {t("app.chapter")} {nextMission.chapter}
            </span>
          </div>
        </motion.div>
      )}

      {/* Mission Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="bg-card rounded-2xl border border-border/60 p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Trophy className="w-4 h-4 text-warm" />
            {t("app.missionProgress")}
          </h3>
          <Link
            href="/app/student/missions"
            className="text-xs text-warm flex items-center gap-1 hover:underline"
          >
            {t("app.viewAll")} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {bookMissions.map((mission) => (
            <div key={mission.id} className="flex items-center gap-3 text-sm">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  mission.isCompleted
                    ? "bg-success/15 text-success"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {mission.isCompleted ? "✓" : "○"}
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className={
                    mission.isCompleted
                      ? "text-muted-foreground line-through"
                      : ""
                  }
                >
                  {mission.title}
                </span>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">
                {t("app.cap")} {mission.chapter}
              </span>
              <span className="text-xs text-gold-foreground shrink-0">
                +{mission.xpReward}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Badges — enhanced grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-card rounded-2xl border border-border/60 p-6"
      >
        <h3 className="text-sm font-semibold mb-4">{t("app.yourBadges")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {currentStudent.badges.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 bg-gradient-to-r from-secondary/50 to-secondary/30 rounded-xl px-4 py-3 border border-border/30"
            >
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <p className="text-xs font-medium">{badge.name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
