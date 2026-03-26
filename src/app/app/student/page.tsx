"use client";

import { motion } from "framer-motion";
import { BookOpen, Flame, Sparkles, Star, ArrowRight, Trophy, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { currentStudent, books, missions } from "@/lib/mock-data";
import { DailyQuote } from "@/components/app/daily-quote";
import Link from "next/link";

const currentBook = books.find((b) => b.id === currentStudent.currentBookId)!;
const bookMissions = missions.filter((m) => m.bookId === currentStudent.currentBookId);
const nextMission = bookMissions.find((m) => !m.isCompleted);
const progressPercent = Math.round(
  (currentStudent.currentChapter / currentBook.totalChapters) * 100
);

// XP needed for next level
const xpForNextLevel = (currentStudent.level + 1) * 200;
const xpProgress = Math.round((currentStudent.xp / xpForNextLevel) * 100);

export default function StudentJourney() {
  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-sm text-muted-foreground mb-1">Welcome back,</p>
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
          {currentStudent.name.split(" ")[0]} ✨
        </h1>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        <div className="bg-card rounded-2xl border border-border/60 p-5 text-center">
          <div className="flex items-center justify-center gap-1.5 text-warm mb-1">
            <Flame className="w-5 h-5" />
            <span className="text-2xl font-bold">{currentStudent.streak}</span>
          </div>
          <p className="text-xs text-muted-foreground">Day Streak</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-5 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Zap className="w-5 h-5 text-gold" />
            <span className="text-2xl font-bold">{currentStudent.xp}</span>
          </div>
          <p className="text-xs text-muted-foreground">Total XP</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-5 text-center">
          <div className="flex items-center justify-center gap-1.5 text-success mb-1">
            <Star className="w-5 h-5" />
            <span className="text-2xl font-bold">Lv.{currentStudent.level}</span>
          </div>
          <p className="text-xs text-muted-foreground">Reader Level</p>
        </div>
      </motion.div>

      {/* Level progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-card rounded-2xl border border-border/60 p-5 mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Level {currentStudent.level}</span>
          <span className="text-xs text-muted-foreground">
            {currentStudent.xp} / {xpForNextLevel} XP
          </span>
        </div>
        <Progress value={xpProgress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          {xpForNextLevel - currentStudent.xp} XP until Level {currentStudent.level + 1}
        </p>
      </motion.div>

      {/* Current Book */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card rounded-2xl border border-border/60 p-6 mb-6"
      >
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
          Currently Reading
        </p>
        <div className="flex items-start gap-5">
          <div className="text-5xl shrink-0">{currentBook.cover}</div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold mb-0.5" style={{ fontFamily: "var(--font-heading)" }}>
              {currentBook.title}
            </h2>
            <p className="text-sm text-muted-foreground mb-1">by {currentBook.author}</p>
            <Badge variant="secondary" className="text-xs mb-4">
              {currentBook.genre}
            </Badge>
            <div className="w-full bg-secondary rounded-full h-2.5 mb-2">
              <div
                className="bg-warm h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Chapter {currentStudent.currentChapter} of {currentBook.totalChapters}
              </span>
              <span className="text-xs font-medium text-warm">{progressPercent}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next Mission */}
      {nextMission && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card rounded-2xl border border-border/60 p-6 mb-6 hover:shadow-lg hover:shadow-primary/5 transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Next Mission
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
              Chapter {nextMission.chapter}
            </span>
          </div>
        </motion.div>
      )}

      {/* Mission Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="bg-card rounded-2xl border border-border/60 p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Trophy className="w-4 h-4 text-warm" />
            Mission Progress
          </h3>
          <Link
            href="/app/student/missions"
            className="text-xs text-warm flex items-center gap-1 hover:underline"
          >
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {bookMissions.map((mission) => (
            <div
              key={mission.id}
              className="flex items-center gap-3 text-sm"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  mission.isCompleted
                    ? "bg-success/15 text-success"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {mission.isCompleted ? "✓" : "○"}
              </div>
              <div className="flex-1 min-w-0">
                <span className={mission.isCompleted ? "text-muted-foreground line-through" : ""}>
                  {mission.title}
                </span>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">
                Ch. {mission.chapter}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Daily Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6"
      >
        <DailyQuote />
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="bg-card rounded-2xl border border-border/60 p-6"
      >
        <h3 className="text-sm font-semibold mb-4">Your Badges</h3>
        <div className="flex flex-wrap gap-3">
          {currentStudent.badges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center gap-2 bg-secondary/50 rounded-xl px-4 py-2.5"
            >
              <span className="text-xl">{badge.icon}</span>
              <div>
                <p className="text-xs font-medium">{badge.name}</p>
                <p className="text-[10px] text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
