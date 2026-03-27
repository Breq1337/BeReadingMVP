"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { classStudents, currentTeacher } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Users, TrendingUp, TrendingDown, BookOpen, Target, Flame, Trophy,
  ChevronDown, ChevronUp, Clock, Star, BarChart3, AlertCircle, CheckCircle2,
  ArrowLeft, Brain, Zap,
} from "lucide-react";
import { AnimatedProgressRing } from "@/components/ui/animated-illustrations";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

export default function TeacherStudents() {
  const { t } = useLocale();
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "ahead" | "on-track" | "behind">("all");

  const filtered = filter === "all" ? classStudents : classStudents.filter((s) => s.status === filter);
  const avgXp = Math.round(classStudents.reduce((s, st) => s + st.xp, 0) / classStudents.length);
  const avgMissions = Math.round(classStudents.reduce((s, st) => s + (st.missionsCompleted || 0), 0) / classStudents.length);
  const avgScore = Math.round(classStudents.reduce((s, st) => s + (st.averageScore || 0), 0) / classStudents.length);

  return (
    <div className="p-6 lg:p-10 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Link href="/app/teacher" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-3">
          <ArrowLeft className="w-3 h-3" /> {t("app.backToDashboard")}
        </Link>
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
          {t("app.individualStudentAnalysis")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{t("app.class7A")} — {classStudents.length} alunos</p>
      </motion.div>

      {/* Class Averages */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-2xl border border-border/60 p-4 text-center">
          <Zap className="w-5 h-5 text-warm mx-auto mb-2" />
          <div className="text-xl font-bold">{avgXp}</div>
          <p className="text-[10px] text-muted-foreground">{t("app.avgXP")}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-4 text-center">
          <Target className="w-5 h-5 text-primary mx-auto mb-2" />
          <div className="text-xl font-bold">{avgMissions}</div>
          <p className="text-[10px] text-muted-foreground">{t("app.avgMissions")}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-4 text-center">
          <Star className="w-5 h-5 text-gold-foreground mx-auto mb-2" />
          <div className="text-xl font-bold">{avgScore}%</div>
          <p className="text-[10px] text-muted-foreground">{t("app.avgScore")}</p>
        </div>
        <div className="bg-card rounded-2xl border border-border/60 p-4 text-center">
          <Clock className="w-5 h-5 text-success mx-auto mb-2" />
          <div className="text-xl font-bold">{Math.round(classStudents.reduce((s, st) => s + (st.totalReadingMinutes || 0), 0) / classStudents.length)}m</div>
          <p className="text-[10px] text-muted-foreground">{t("app.avgReading")}</p>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {([
          { key: "all", label: t("app.all"), count: classStudents.length },
          { key: "ahead", label: t("app.aheadPlural"), count: classStudents.filter((s) => s.status === "ahead").length },
          { key: "on-track", label: t("app.onTrackPlural"), count: classStudents.filter((s) => s.status === "on-track").length },
          { key: "behind", label: t("app.behindPlural"), count: classStudents.filter((s) => s.status === "behind").length },
        ] as const).map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === f.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Student list with expandable details */}
      <div className="space-y-3">
        {filtered.map((student, i) => {
          const isExpanded = expandedStudent === student.id;
          const progress = Math.round((student.currentChapter / 23) * 100);

          return (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl border border-border/60 overflow-hidden"
            >
              <button
                onClick={() => setExpandedStudent(isExpanded ? null : student.id)}
                className="w-full p-5 flex items-center gap-4 hover:bg-secondary/20 transition-colors text-left"
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  student.status === "ahead" ? "bg-success/10 text-success" :
                  student.status === "behind" ? "bg-destructive/10 text-destructive" :
                  "bg-primary/10 text-primary"
                }`}>{student.avatar}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{student.name}</span>
                    {student.status === "behind" && <AlertCircle className="w-3.5 h-3.5 text-destructive" />}
                    {student.status === "ahead" && <CheckCircle2 className="w-3.5 h-3.5 text-success" />}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-0.5">
                    <span>🔥 {student.streak}d</span>
                    <span>⚡ {student.xp} XP</span>
                    <span>🎯 {student.missionsCompleted} missões</span>
                    <span>📊 {student.averageScore}%</span>
                  </div>
                </div>

                <div className="w-20 shrink-0 hidden sm:block">
                  <Progress value={progress} className="h-2" />
                  <p className="text-[10px] text-muted-foreground mt-1 text-right">{progress}%</p>
                </div>

                {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-border/40 pt-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                        <div className="bg-secondary/50 rounded-xl p-3 text-center">
                          <Flame className="w-4 h-4 text-destructive mx-auto mb-1" />
                          <div className="text-lg font-bold">{student.streak}</div>
                          <p className="text-[10px] text-muted-foreground">{t("app.streakDays")}</p>
                        </div>
                        <div className="bg-secondary/50 rounded-xl p-3 text-center">
                          <Zap className="w-4 h-4 text-warm mx-auto mb-1" />
                          <div className="text-lg font-bold">{student.xp}</div>
                          <p className="text-[10px] text-muted-foreground">{t("app.totalXpLabel")}</p>
                        </div>
                        <div className="bg-secondary/50 rounded-xl p-3 text-center">
                          <Star className="w-4 h-4 text-gold-foreground mx-auto mb-1" />
                          <div className="text-lg font-bold">{t("app.lvl")}{student.level}</div>
                          <p className="text-[10px] text-muted-foreground">{t("app.readerLevel")}</p>
                        </div>
                        <div className="bg-secondary/50 rounded-xl p-3 text-center">
                          <BookOpen className="w-4 h-4 text-primary mx-auto mb-1" />
                          <div className="text-lg font-bold">{student.booksCompleted}</div>
                          <p className="text-[10px] text-muted-foreground">{t("app.booksCompleteLabel")}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-secondary/30 rounded-xl p-4">
                          <h4 className="text-xs font-semibold mb-3 flex items-center gap-2">
                            <BarChart3 className="w-3.5 h-3.5" /> {t("app.performanceMetrics")}
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">{t("app.avgScore")}</span>
                              <span className="font-medium">{student.averageScore}%</span>
                            </div>
                            <Progress value={student.averageScore ?? 0} className="h-1.5" />
                            <div className="flex justify-between text-xs mt-2">
                              <span className="text-muted-foreground">{t("app.missionsCompleteLabel")}</span>
                              <span className="font-medium">{student.missionsCompleted}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">{t("app.readingTime")}</span>
                              <span className="font-medium">{student.totalReadingMinutes}min</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">{t("app.currentChapter")}</span>
                              <span className="font-medium">{student.currentChapter}/23</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-secondary/30 rounded-xl p-4">
                          <h4 className="text-xs font-semibold mb-3 flex items-center gap-2">
                            <Brain className="w-3.5 h-3.5" /> {t("app.aiAnalysis")}
                          </h4>
                          <div className="space-y-2">
                            {student.status === "behind" ? (
                              <>
                                <p className="text-xs text-destructive font-medium">Precisa de atenção</p>
                                <p className="text-[11px] text-muted-foreground">
                                  Streak zerado e progresso abaixo da média. Sugestão: conversa individual e missão adaptada ao nível.
                                </p>
                              </>
                            ) : student.status === "ahead" ? (
                              <>
                                <p className="text-xs text-success font-medium">Destaque da turma</p>
                                <p className="text-[11px] text-muted-foreground">
                                  Performance acima da média em todas as métricas. Pode ser monitor/tutor para colegas com dificuldade.
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="text-xs text-primary font-medium">No ritmo esperado</p>
                                <p className="text-[11px] text-muted-foreground">
                                  Progresso estável e consistente. Manter acompanhamento regular.
                                </p>
                              </>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary" className="text-[10px]">
                                vs média: {student.xp > avgXp ? "+" : ""}{student.xp - avgXp} XP
                              </Badge>
                              <Badge variant="secondary" className="text-[10px]">
                                {student.averageScore && student.averageScore > avgScore ? "Acima" : "Abaixo"} da média
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Email: {student.email}</span>
                        <span>·</span>
                        <span>Entrou em: {student.joinedAt}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
