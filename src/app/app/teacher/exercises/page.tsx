"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { exercises, classStudents } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText, Plus, CheckCircle2, Clock, AlertCircle, Send,
  ChevronDown, Star, ArrowLeft, Sparkles, X,
} from "lucide-react";
import Link from "next/link";

export default function TeacherExercises() {
  const [expandedExercise, setExpandedExercise] = useState<string | null>("ex1");
  const [gradingStudent, setGradingStudent] = useState<string | null>(null);
  const [gradeScore, setGradeScore] = useState("");
  const [gradeFeedback, setGradeFeedback] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const handleGrade = (submissionId: string) => {
    setGradingStudent(null);
    setGradeScore("");
    setGradeFeedback("");
  };

  return (
    <div className="p-6 lg:p-10 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <Link href="/app/teacher" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-3">
            <ArrowLeft className="w-3 h-3" /> Voltar ao Painel
          </Link>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Exercícios & Avaliações
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Crie, envie e avalie exercícios</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90">
          <Plus className="w-4 h-4" /> Novo Exercício
        </button>
      </motion.div>

      {/* Create exercise form */}
      <AnimatePresence>
        {showCreate && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="bg-card rounded-2xl border border-border/60 p-6 mb-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Criar Exercício
              </h2>
              <button onClick={() => setShowCreate(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Título</label>
                <input className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Ex: Compreensão — Cap. 6-10" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Turma</label>
                <select className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-secondary/30 text-sm">
                  <option>7A — Literatura</option>
                  <option>7B — Literatura</option>
                  <option>8A — Literatura</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Capítulo</label>
                <input type="number" className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-secondary/30 text-sm" placeholder="10" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Data de Entrega</label>
                <input type="date" className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-secondary/30 text-sm" />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-2 block">Questões</label>
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-secondary/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-muted-foreground">Questão {n}</span>
                      <select className="text-xs px-2 py-1 rounded-lg border border-border/60 bg-card">
                        <option>Múltipla Escolha</option>
                        <option>Dissertativa</option>
                        <option>Verdadeiro/Falso</option>
                      </select>
                      <input type="number" placeholder="Pontos" className="w-20 text-xs px-2 py-1 rounded-lg border border-border/60 bg-card" />
                    </div>
                    <input className="w-full px-3 py-2 rounded-lg border border-border/60 bg-card text-sm" placeholder="Digite a pergunta..." />
                  </div>
                ))}
              </div>
              <button className="mt-2 text-xs text-warm hover:underline">+ Adicionar questão</button>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90">
                <Send className="w-4 h-4" /> Publicar Exercício
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-secondary text-sm font-medium hover:bg-secondary/80">
                Salvar Rascunho
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-warm/10 text-warm text-sm font-medium hover:bg-warm/20">
                <Sparkles className="w-4 h-4" /> Gerar com IA
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exercise list */}
      {exercises.map((exercise) => {
        const isExpanded = expandedExercise === exercise.id;
        const submitted = exercise.submissions.length;
        const graded = exercise.submissions.filter((s) => s.status === "graded").length;
        const pending = submitted - graded;

        return (
          <motion.div key={exercise.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border/60 overflow-hidden mb-4">
            <button onClick={() => setExpandedExercise(isExpanded ? null : exercise.id)}
              className="w-full p-5 flex items-center gap-4 hover:bg-secondary/20 transition-colors text-left">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold">{exercise.title}</h3>
                <p className="text-[10px] text-muted-foreground">{exercise.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant="secondary" className={`text-[10px] ${
                  exercise.status === "published" ? "bg-success/10 text-success" : "bg-secondary"
                }`}>
                  {exercise.status === "published" ? "Publicado" : exercise.status === "draft" ? "Rascunho" : "Encerrado"}
                </Badge>
                {pending > 0 && (
                  <Badge className="text-[10px] bg-warm/10 text-warm border-0">{pending} para corrigir</Badge>
                )}
              </div>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden">
                  <div className="px-5 pb-5 border-t border-border/40 pt-4">
                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-3 mb-5">
                      <div className="bg-secondary/50 rounded-xl p-3 text-center">
                        <div className="text-lg font-bold">{exercise.questions.length}</div>
                        <p className="text-[10px] text-muted-foreground">Questões</p>
                      </div>
                      <div className="bg-secondary/50 rounded-xl p-3 text-center">
                        <div className="text-lg font-bold">{submitted}</div>
                        <p className="text-[10px] text-muted-foreground">Entregas</p>
                      </div>
                      <div className="bg-secondary/50 rounded-xl p-3 text-center">
                        <div className="text-lg font-bold text-success">{graded}</div>
                        <p className="text-[10px] text-muted-foreground">Corrigidos</p>
                      </div>
                      <div className="bg-secondary/50 rounded-xl p-3 text-center">
                        <div className="text-lg font-bold text-warm">{pending}</div>
                        <p className="text-[10px] text-muted-foreground">Pendentes</p>
                      </div>
                    </div>

                    {/* Submissions */}
                    <h4 className="text-xs font-semibold mb-3">Entregas</h4>
                    <div className="space-y-2">
                      {exercise.submissions.map((sub) => (
                        <div key={sub.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold shrink-0">
                            {sub.studentName.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium">{sub.studentName}</span>
                            <p className="text-[10px] text-muted-foreground">Entregue em {sub.submittedAt}</p>
                          </div>

                          {sub.status === "graded" ? (
                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <span className="text-sm font-bold text-success">{sub.score}/100</span>
                                <p className="text-[10px] text-muted-foreground">{sub.feedback}</p>
                              </div>
                              <CheckCircle2 className="w-4 h-4 text-success" />
                            </div>
                          ) : gradingStudent === sub.id ? (
                            <div className="flex items-center gap-2">
                              <input type="number" max={100} min={0}
                                value={gradeScore} onChange={(e) => setGradeScore(e.target.value)}
                                placeholder="Nota" className="w-16 px-2 py-1 rounded-lg border text-xs" />
                              <input value={gradeFeedback} onChange={(e) => setGradeFeedback(e.target.value)}
                                placeholder="Feedback" className="w-32 px-2 py-1 rounded-lg border text-xs" />
                              <button onClick={() => handleGrade(sub.id)}
                                className="px-3 py-1 rounded-lg bg-success text-white text-xs font-medium">
                                Salvar
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => setGradingStudent(sub.id)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-warm/10 text-warm text-xs font-medium hover:bg-warm/20">
                              <Star className="w-3 h-3" /> Corrigir
                            </button>
                          )}
                        </div>
                      ))}

                      {/* Students who haven't submitted */}
                      {classStudents
                        .filter((s) => !exercise.submissions.find((sub) => sub.studentId === s.id))
                        .slice(0, 3)
                        .map((s) => (
                          <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/10 opacity-60">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold shrink-0">{s.avatar}</div>
                            <span className="text-sm">{s.name}</span>
                            <Badge variant="secondary" className="text-[10px] ml-auto">Não entregou</Badge>
                          </div>
                        ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
