"use client";

import { motion } from "framer-motion";
import { adminData } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  BarChart3,
  Clock,
} from "lucide-react";

export default function AdminOverview() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1" style={{ fontFamily: "var(--font-heading)" }}>
          School Overview
        </h1>
        <p className="text-sm text-muted-foreground">{adminData.schoolName}</p>
      </motion.div>

      {/* Key metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {[
          { icon: Users, label: "Total Students", value: adminData.totalStudents, color: "text-primary" },
          { icon: GraduationCap, label: "Active Classes", value: adminData.totalClasses, color: "text-warm" },
          { icon: TrendingUp, label: "Platform Engagement", value: `${adminData.platformEngagement}%`, color: "text-success" },
          { icon: Clock, label: "Avg Session", value: `${adminData.averageSessionMinutes}min`, color: "text-gold-foreground" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-2xl border border-border/60 p-5">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Secondary metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        <div className="bg-card rounded-2xl border border-border/60 p-5 text-center">
          <div className="text-3xl font-bold text-warm">{adminData.weeklyActiveUsers}</div>
          <p className="text-xs text-muted-foreground mt-1">Weekly Active Users</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-5 text-center">
          <div className="text-3xl font-bold">{adminData.totalTeachers}</div>
          <p className="text-xs text-muted-foreground mt-1">Teachers</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-5 text-center">
          <div className="text-3xl font-bold text-success">{adminData.activeBooksCount}</div>
          <p className="text-xs text-muted-foreground mt-1">Active Books</p>
        </div>
      </motion.div>

      {/* Class breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl border border-border/60 p-6 mb-6"
      >
        <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-warm" />
          Class Performance
        </h2>
        <p className="text-xs text-muted-foreground mb-5">Engagement and progress by class</p>

        <div className="space-y-4">
          {adminData.classMetrics.map((cls) => (
            <div key={cls.class} className="flex items-center gap-4">
              <div className="w-12 text-sm font-semibold">{cls.class}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{cls.teacher} · {cls.students} students</span>
                  <span className="font-medium">{cls.avgProgress}%</span>
                </div>
                <Progress value={cls.avgProgress} className="h-2" />
              </div>
              <Badge
                variant="secondary"
                className={`text-[10px] w-20 justify-center ${
                  cls.engagement >= 85
                    ? "bg-success/10 text-success"
                    : cls.engagement >= 70
                    ? "bg-warm/10 text-warm"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {cls.engagement}%
              </Badge>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top books */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-card rounded-2xl border border-border/60 p-6"
      >
        <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Top Books
        </h2>
        <p className="text-xs text-muted-foreground mb-5">Most used books across classes</p>

        <div className="space-y-3">
          {adminData.topBooks.map((book, i) => (
            <div key={book.title} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
              <span className="text-lg font-bold text-muted-foreground w-6">{i + 1}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">{book.title}</p>
                <p className="text-xs text-muted-foreground">{book.classes} classes using</p>
              </div>
              <Badge variant="secondary" className="text-xs">{book.avgEngagement}% engagement</Badge>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
