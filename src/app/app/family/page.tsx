"use client";

import { motion } from "framer-motion";
import { familyData } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Flame, Clock, TrendingUp, Heart } from "lucide-react";

const weeklyPercent = Math.round(
  (familyData.weeklyReadingMinutes / familyData.weeklyGoalMinutes) * 100
);
const bookProgress = Math.round(
  (familyData.currentChapter / familyData.totalChapters) * 100
);

export default function FamilyOverview() {
  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="text-sm text-muted-foreground mb-1">Hello, {familyData.parentName}</p>
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
          {familyData.studentName}&apos;s Reading Journey
        </h1>
      </motion.div>

      {/* Summary cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-card rounded-2xl border border-border/60 p-5">
          <Clock className="w-5 h-5 text-warm mb-2" />
          <div className="text-2xl font-bold">{familyData.weeklyReadingMinutes}</div>
          <p className="text-xs text-muted-foreground">Min this week</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-5">
          <Flame className="w-5 h-5 text-destructive mb-2" />
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">Day Streak</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-5">
          <BookOpen className="w-5 h-5 text-primary mb-2" />
          <div className="text-2xl font-bold">{bookProgress}%</div>
          <p className="text-xs text-muted-foreground">Book Progress</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-5">
          <TrendingUp className="w-5 h-5 text-success mb-2" />
          <div className="text-2xl font-bold">Lv.5</div>
          <p className="text-xs text-muted-foreground">Reader Level</p>
        </div>
      </motion.div>

      {/* Current book */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl border border-border/60 p-6 mb-6"
      >
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Currently Reading</p>
        <div className="flex items-start gap-5">
          <div className="text-5xl">{familyData.currentBook.cover}</div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
              {familyData.currentBook.title}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">by {familyData.currentBook.author}</p>
            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">
                  Chapter {familyData.currentChapter} of {familyData.totalChapters}
                </span>
                <span className="font-medium text-warm">{bookProgress}%</span>
              </div>
              <Progress value={bookProgress} className="h-2" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Weekly reading chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-card rounded-2xl border border-border/60 p-6 mb-6"
      >
        <h3 className="text-sm font-semibold mb-4">This Week&apos;s Reading</h3>
        <div className="flex items-end justify-between gap-2 h-32">
          {familyData.weeklyStreakData.map((day) => {
            const height = day.minutes > 0 ? Math.max(20, (day.minutes / 35) * 100) : 8;
            return (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground">{day.minutes}m</span>
                <div
                  className={`w-full rounded-lg transition-all ${
                    day.minutes > 0 ? "bg-warm/70" : "bg-secondary"
                  }`}
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] text-muted-foreground">{day.day}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {familyData.weeklyReadingMinutes} / {familyData.weeklyGoalMinutes} min goal
          </span>
          <span className="text-xs font-medium text-warm">{weeklyPercent}%</span>
        </div>
        <Progress value={weeklyPercent} className="h-1.5 mt-2" />
      </motion.div>

      {/* Recent activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl border border-border/60 p-6"
      >
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Heart className="w-4 h-4 text-warm" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {familyData.recentActivity.map((activity, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-warm mt-1.5 shrink-0" />
              <div>
                <p className="text-sm">{activity.action}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.book} · Chapter {activity.chapter} · {activity.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
