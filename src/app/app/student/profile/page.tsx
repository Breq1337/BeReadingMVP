"use client";

import { motion } from "framer-motion";
import { currentStudent, allBadges } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Flame, Star, Trophy, Zap } from "lucide-react";

const xpForNextLevel = (currentStudent.level + 1) * 200;
const earnedBadgeIds = currentStudent.badges.map((b) => b.id);

export default function StudentProfile() {
  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          My Profile
        </h1>
      </motion.div>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card rounded-2xl border border-border/60 p-8 mb-6 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">
          {currentStudent.avatar}
        </div>
        <h2 className="text-xl font-semibold mb-1">{currentStudent.name}</h2>
        <p className="text-sm text-muted-foreground mb-6">{currentStudent.grade}</p>

        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          <div>
            <div className="flex items-center justify-center gap-1 text-warm mb-1">
              <Flame className="w-4 h-4" />
              <span className="text-xl font-bold">{currentStudent.streak}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Streak</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-gold mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xl font-bold">{currentStudent.xp}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">XP</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-success mb-1">
              <Star className="w-4 h-4" />
              <span className="text-xl font-bold">{currentStudent.level}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Level</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-primary mb-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-xl font-bold">{currentStudent.booksCompleted}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Books</p>
          </div>
        </div>

        <div className="mt-6 max-w-sm mx-auto">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span>Level {currentStudent.level}</span>
            <span className="text-muted-foreground">{currentStudent.xp} / {xpForNextLevel} XP</span>
          </div>
          <Progress value={(currentStudent.xp / xpForNextLevel) * 100} className="h-2.5" />
        </div>
      </motion.div>

      {/* All badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card rounded-2xl border border-border/60 p-6"
      >
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-5">
          <Trophy className="w-4 h-4 text-warm" />
          Badge Collection
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {allBadges.map((badge) => {
            const earned = earnedBadgeIds.includes(badge.id);
            const earnedData = currentStudent.badges.find((b) => b.id === badge.id);
            return (
              <div
                key={badge.id}
                className={`flex items-center gap-3 rounded-xl p-4 border transition-all ${
                  earned
                    ? "bg-secondary/50 border-border/60"
                    : "bg-secondary/20 border-border/30 opacity-50"
                }`}
              >
                <span className={`text-2xl ${!earned ? "grayscale" : ""}`}>{badge.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                  {earnedData?.earnedAt && (
                    <p className="text-[10px] text-warm mt-0.5">
                      Earned {earnedData.earnedAt}
                    </p>
                  )}
                </div>
                {earned && <span className="text-success text-sm">✓</span>}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
