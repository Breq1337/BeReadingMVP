"use client";

import { motion } from "framer-motion";
import { currentTeacher, classStudents } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Users,
  BookOpen,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  Target,
  Medal,
  FileText,
  UserCheck,
} from "lucide-react";
import { AnimatedProgressRing } from "@/components/ui/animated-illustrations";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

export default function TeacherDashboard() {
  const { t } = useLocale();
  const totalStudents = currentTeacher.classes.reduce((s, c) => s + c.studentCount, 0);
  const avgEngagement = Math.round(
    currentTeacher.classes.reduce((s, c) => s + c.engagementScore, 0) / currentTeacher.classes.length
  );
  const avgProgress = Math.round(
    currentTeacher.classes.reduce((s, c) => s + c.averageProgress, 0) / currentTeacher.classes.length
  );

  return (
    <div className="p-6 lg:p-10 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-sm text-muted-foreground mb-1">{t("app.goodMorning")}</p>
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {currentTeacher.name}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{currentTeacher.school}</p>
      </motion.div>

      {/* Top stats with visual impact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
      >
        <div className="bg-card rounded-2xl border border-border/60 p-5">
          <Users className="w-5 h-5 text-primary mb-3" />
          <div className="text-2xl font-bold">{totalStudents}</div>
          <p className="text-xs text-muted-foreground">{t("app.totalStudents")}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-5">
          <BookOpen className="w-5 h-5 text-warm mb-3" />
          <div className="text-2xl font-bold">{currentTeacher.classes.length}</div>
          <p className="text-xs text-muted-foreground">{t("app.activeClasses")}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-5">
          <TrendingUp className="w-5 h-5 text-success mb-3" />
          <div className="text-2xl font-bold">{avgEngagement}%</div>
          <p className="text-xs text-muted-foreground">{t("app.avgEngagement")}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-5">
          <Target className="w-5 h-5 text-gold-foreground mb-3" />
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">{t("app.missionsCreated")}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-5">
          <Sparkles className="w-5 h-5 text-warm mb-3" />
          <div className="text-2xl font-bold">156</div>
          <p className="text-xs text-muted-foreground">{t("app.aiMissionsGenerated")}</p>
        </div>
      </motion.div>

      {/* Two-column: Engagement ring + Class list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Engagement overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border/60 p-6 flex flex-col items-center justify-center"
        >
          <h3 className="text-sm font-semibold mb-4">{t("app.overallEngagement")}</h3>
          <AnimatedProgressRing progress={avgEngagement} size={140} />
          <div className="flex items-center gap-4 mt-4">
            <div className="text-center">
              <div className="text-lg font-bold text-success">
                {classStudents.filter((s) => s.status === "ahead").length}
              </div>
              <p className="text-[10px] text-muted-foreground">{t("app.aheadPlural")}</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-lg font-bold">
                {classStudents.filter((s) => s.status === "on-track").length}
              </div>
              <p className="text-[10px] text-muted-foreground">{t("app.onTrackPlural")}</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-lg font-bold text-destructive">
                {classStudents.filter((s) => s.status === "behind").length}
              </div>
              <p className="text-[10px] text-muted-foreground">{t("app.behindPlural")}</p>
            </div>
          </div>
        </motion.div>

        {/* Classes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t("app.myClasses")}</h2>
            <Link
              href="/app/teacher/classes"
              className="text-xs text-warm flex items-center gap-1 hover:underline"
            >
              {t("app.viewAll")} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {currentTeacher.classes.map((cls) => (
              <div
                key={cls.id}
                className="bg-card rounded-2xl border border-border/60 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold">{cls.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {cls.studentCount} {t("app.students")} · {cls.activeBook}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={`text-[10px] ${
                        cls.engagementScore >= 85
                          ? "bg-success/10 text-success"
                          : cls.engagementScore >= 70
                          ? "bg-warm/10 text-warm"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {cls.engagementScore}% {t("app.engaged")}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <Progress value={cls.averageProgress} className="h-2" />
                  </div>
                  <span className="text-xs font-medium w-10 text-right">
                    {cls.averageProgress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Students needing attention */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl border border-border/60 p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold">Turma 7A — {t("app.studentOverview")}</h2>
            <p className="text-xs text-muted-foreground">O Doador de Memórias · 28 {t("app.students")}</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-success">
              <div className="w-2 h-2 rounded-full bg-success" /> {t("app.ahead")}
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-warm" /> {t("app.onTrack")}
            </span>
            <span className="flex items-center gap-1 text-destructive">
              <div className="w-2 h-2 rounded-full bg-destructive" /> {t("app.behind")}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {classStudents.map((student) => (
            <div
              key={student.id}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                  student.status === "ahead"
                    ? "bg-success/10 text-success"
                    : student.status === "behind"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {student.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{student.name}</span>
                  {student.status === "behind" && (
                    <AlertCircle className="w-3.5 h-3.5 text-destructive" />
                  )}
                  {student.status === "ahead" && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                  )}
                </div>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-0.5">
                  <span>🔥 {student.streak}d</span>
                  <span>⚡ {student.xp} XP</span>
                  <span>🎯 {student.missionsCompleted} {t("app.missions").toLowerCase()}</span>
                </div>
              </div>
              <div className="w-28 shrink-0">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{Math.round((student.currentChapter / 23) * 100)}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      student.status === "ahead"
                        ? "bg-success"
                        : student.status === "behind"
                        ? "bg-destructive"
                        : "bg-warm"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round((student.currentChapter / 23) * 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick access to new features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <Link href="/app/teacher/students" className="bg-card rounded-2xl border border-border/60 p-5 hover:shadow-md transition-all group">
          <UserCheck className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="text-sm font-semibold">{t("app.studentAnalysis")}</h3>
          <p className="text-[10px] text-muted-foreground">{t("app.detailedPerformance")}</p>
        </Link>
        <Link href="/app/teacher/exercises" className="bg-card rounded-2xl border border-border/60 p-5 hover:shadow-md transition-all group">
          <FileText className="w-5 h-5 text-warm mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="text-sm font-semibold">{t("app.exercises")}</h3>
          <p className="text-[10px] text-muted-foreground">{t("app.exercisesDesc")}</p>
        </Link>
        <Link href="/app/teacher/olympics" className="bg-card rounded-2xl border border-border/60 p-5 hover:shadow-md transition-all group">
          <Medal className="w-5 h-5 text-gold-foreground mb-2 group-hover:scale-110 transition-transform" />
          <h3 className="text-sm font-semibold">{t("app.literaryOlympics")}</h3>
          <p className="text-[10px] text-muted-foreground">{t("app.literaryOlympicsDesc")}</p>
        </Link>
      </motion.div>

      {/* AI Insights card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-gradient-to-r from-warm/5 to-gold/5 rounded-2xl border border-warm/20 p-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-5 h-5 text-warm" />
          <h3 className="text-sm font-semibold">{t("app.aiInsights")}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card/80 rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-1">{t("app.needsAttention")}</p>
            <p className="text-sm font-semibold text-destructive">Pedro Santos, Gabriel Oliveira</p>
            <p className="text-[10px] text-muted-foreground mt-1">{t("app.noStreakBelow50")}</p>
          </div>
          <div className="bg-card/80 rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-1">{t("app.weekHighlights")}</p>
            <p className="text-sm font-semibold text-success">Maria Silva, Lucas Pereira</p>
            <p className="text-[10px] text-muted-foreground mt-1">{t("app.highStreaks")}</p>
          </div>
          <div className="bg-card/80 rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-1">{t("app.suggestion")}</p>
            <p className="text-sm font-semibold">{t("app.cap")} 15</p>
            <p className="text-[10px] text-muted-foreground mt-1">62%</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
