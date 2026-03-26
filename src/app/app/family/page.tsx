"use client";

import { motion } from "framer-motion";
import { familyData, currentStudent } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen, Flame, Clock, TrendingUp, Heart, Star, Trophy,
  Target, BarChart3, Sparkles, CheckCircle2, ArrowUp, ArrowDown,
  Calendar, Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimatedProgressRing, AnimatedFlame } from "@/components/ui/animated-illustrations";

const weeklyPercent = Math.round(
  (familyData.weeklyReadingMinutes / familyData.weeklyGoalMinutes) * 100
);
const bookProgress = Math.round(
  (familyData.currentChapter / familyData.totalChapters) * 100
);

export default function FamilyOverview() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-sm text-muted-foreground mb-1">Olá, {familyData.parentName}</p>
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
          Jornada de Leitura de {familyData.studentName}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">{familyData.className} · {familyData.teacherName}</p>
      </motion.div>

      {/* Hero stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-2xl border border-border/60 p-5 flex flex-col items-center justify-center">
          <AnimatedFlame streak={currentStudent.streak} />
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-4 flex flex-col items-center justify-center">
          <AnimatedProgressRing progress={weeklyPercent} size={80} />
          <p className="text-[10px] text-muted-foreground mt-2">{familyData.weeklyReadingMinutes} / {familyData.weeklyGoalMinutes} min</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-5 text-center">
          <Star className="w-5 h-5 text-gold-foreground mx-auto mb-2" />
          <div className="text-2xl font-bold">Nv.{currentStudent.level}</div>
          <p className="text-xs text-muted-foreground">Nível Leitor</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-5 text-center">
          <Trophy className="w-5 h-5 text-warm mx-auto mb-2" />
          <div className="text-2xl font-bold">{familyData.classRank}º</div>
          <p className="text-xs text-muted-foreground">de {familyData.classSize} na turma</p>
        </div>
      </motion.div>

      {/* Current book — premium card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl border border-border/60 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-primary/5 via-warm/5 to-gold/5 p-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">📖 Lendo Agora</p>
          <div className="flex items-start gap-5">
            <div className="w-16 h-22 rounded-xl bg-gradient-to-br from-warm/30 to-gold/20 border border-warm/20 flex items-center justify-center text-4xl shadow-lg shadow-warm/10 shrink-0">
              {familyData.currentBook.cover}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                {familyData.currentBook.title}
              </h2>
              <p className="text-sm text-muted-foreground mb-3">por {familyData.currentBook.author}</p>
              <div className="w-full bg-secondary rounded-full h-3 overflow-hidden mb-2">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-warm to-gold"
                  initial={{ width: 0 }} animate={{ width: `${bookProgress}%` }} transition={{ duration: 1 }} />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Capítulo {familyData.currentChapter} de {familyData.totalChapters}</span>
                <span className="font-semibold text-warm">{bookProgress}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Próximo marco: {familyData.nextMilestone}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Two column: Performance + Comparisons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Detailed stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border/60 p-6">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" /> Desempenho Detalhado
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">XP Total</span>
                <span className="font-medium">{currentStudent.xp} XP</span>
              </div>
              <Progress value={Math.min((currentStudent.xp / 1500) * 100, 100)} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Missões Completas</span>
                <span className="font-medium">{currentStudent.missionsCompleted} / 20</span>
              </div>
              <Progress value={((currentStudent.missionsCompleted || 0) / 20) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Nota Média</span>
                <span className="font-medium">{currentStudent.averageScore}%</span>
              </div>
              <Progress value={currentStudent.averageScore ?? 0} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Livros Concluídos</span>
                <span className="font-medium">{currentStudent.booksCompleted}</span>
              </div>
              <Progress value={(currentStudent.booksCompleted / 5) * 100} className="h-2" />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Tempo Total de Leitura</span>
              <span className="font-medium">{currentStudent.totalReadingMinutes}min ({Math.round((currentStudent.totalReadingMinutes || 0) / 60)}h)</span>
            </div>
          </div>
        </motion.div>

        {/* vs Class average */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-card rounded-2xl border border-border/60 p-6">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-success" /> Comparativo com a Turma
          </h3>
          <div className="space-y-5">
            {[
              {
                label: "Leitura Semanal",
                student: familyData.comparisons.readingVsClass.student,
                avg: familyData.comparisons.readingVsClass.classAvg,
                unit: "min",
              },
              {
                label: "XP Total",
                student: familyData.comparisons.xpVsClass.student,
                avg: familyData.comparisons.xpVsClass.classAvg,
                unit: "XP",
              },
              {
                label: "Missões Completas",
                student: familyData.comparisons.missionsVsClass.student,
                avg: familyData.comparisons.missionsVsClass.classAvg,
                unit: "",
              },
            ].map((comp) => {
              const diff = comp.student - comp.avg;
              const isAbove = diff > 0;
              return (
                <div key={comp.label}>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-muted-foreground">{comp.label}</span>
                    <span className={`flex items-center gap-1 font-medium ${isAbove ? "text-success" : "text-destructive"}`}>
                      {isAbove ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {isAbove ? "+" : ""}{diff} {comp.unit}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-secondary rounded-full h-2.5 overflow-hidden">
                      <div className="h-full bg-warm rounded-full" style={{ width: `${Math.min((comp.student / (comp.avg * 1.5)) * 100, 100)}%` }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground w-20 text-right">
                      {comp.student} vs {comp.avg} {comp.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Weekly reading chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl border border-border/60 p-6 mb-6">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-warm" /> Leitura da Semana
        </h3>
        <div className="flex items-end justify-between gap-2 h-32">
          {familyData.weeklyStreakData.map((day) => {
            const height = day.minutes > 0 ? Math.max(20, (day.minutes / 35) * 100) : 8;
            return (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground font-medium">{day.minutes}m</span>
                <motion.div
                  className={`w-full rounded-lg ${day.minutes > 0 ? "bg-gradient-to-t from-warm to-gold" : "bg-secondary"}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                />
                <span className="text-[10px] text-muted-foreground">{day.day}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {familyData.weeklyReadingMinutes} / {familyData.weeklyGoalMinutes} min meta semanal
          </span>
          <span className="text-xs font-medium text-warm">{weeklyPercent}%</span>
        </div>
        <Progress value={weeklyPercent} className="h-1.5 mt-2" />
      </motion.div>

      {/* Recent Missions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="bg-card rounded-2xl border border-border/60 p-6 mb-6">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" /> Últimas Missões
        </h3>
        <div className="space-y-3">
          {familyData.recentMissions.map((mission, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
              <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">{mission.title}</p>
                <p className="text-[10px] text-muted-foreground">{mission.date}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-success">{mission.score}%</span>
                <p className="text-[10px] text-warm">+{mission.xp} XP</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl border border-border/60 p-6 mb-6">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold-foreground" /> Conquistas de {familyData.studentName}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {currentStudent.badges.map((badge) => (
            <div key={badge.id} className="flex items-center gap-3 bg-gradient-to-r from-secondary/50 to-secondary/30 rounded-xl px-4 py-3 border border-border/30">
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <p className="text-xs font-medium">{badge.name}</p>
                <p className="text-[10px] text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent activity */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        className="bg-card rounded-2xl border border-border/60 p-6">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Heart className="w-4 h-4 text-warm" /> Atividade Recente
        </h3>
        <div className="space-y-4">
          {familyData.recentActivity.map((activity, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${activity.xp > 0 ? "bg-warm" : "bg-primary/40"}`} />
              <div className="flex-1">
                <p className="text-sm">{activity.action}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.book} · Capítulo {activity.chapter} · {activity.date}
                </p>
              </div>
              {activity.xp > 0 && (
                <span className="text-xs font-medium text-warm shrink-0">+{activity.xp} XP</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
