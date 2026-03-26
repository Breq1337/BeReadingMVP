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
} from "lucide-react";
import Link from "next/link";

export default function TeacherDashboard() {
  const totalStudents = currentTeacher.classes.reduce((s, c) => s + c.studentCount, 0);
  const avgEngagement = Math.round(
    currentTeacher.classes.reduce((s, c) => s + c.engagementScore, 0) / currentTeacher.classes.length
  );

  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-sm text-muted-foreground mb-1">Good morning,</p>
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
          {currentTeacher.name}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{currentTeacher.school}</p>
      </motion.div>

      {/* Overview stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {[
          { icon: Users, label: "Total Students", value: totalStudents, color: "text-primary" },
          { icon: BookOpen, label: "Active Classes", value: currentTeacher.classes.length, color: "text-warm" },
          { icon: TrendingUp, label: "Avg Engagement", value: `${avgEngagement}%`, color: "text-success" },
          { icon: BarChart3, label: "Missions Created", value: 24, color: "text-gold-foreground" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-2xl border border-border/60 p-5">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Classes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">My Classes</h2>
          <Link href="/app/teacher/classes" className="text-xs text-warm flex items-center gap-1 hover:underline">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentTeacher.classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-card rounded-2xl border border-border/60 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">{cls.name}</h3>
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
                  {cls.engagementScore}% engaged
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                {cls.studentCount} students · {cls.activeBook}
              </p>
              <div className="mb-1.5">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Avg Progress</span>
                  <span className="font-medium">{cls.averageProgress}%</span>
                </div>
                <Progress value={cls.averageProgress} className="h-1.5" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Students needing attention */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-card rounded-2xl border border-border/60 p-6"
      >
        <h2 className="text-lg font-semibold mb-1">Class 7A — Student Overview</h2>
        <p className="text-xs text-muted-foreground mb-5">The Giver · 28 students</p>

        <div className="space-y-3">
          {classStudents.map((student) => (
            <div
              key={student.id}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
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
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  <span>{student.xp} XP</span>
                  <span>{student.streak}d streak</span>
                  <span>{student.missionsCompleted} missions</span>
                </div>
              </div>
              <div className="w-24 shrink-0">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{student.progress}%</span>
                </div>
                <Progress value={student.progress} className="h-1.5" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
