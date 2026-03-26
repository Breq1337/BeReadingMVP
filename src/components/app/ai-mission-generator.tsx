"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  Target,
  Brain,
  Lightbulb,
  MessageCircle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Send,
} from "lucide-react";
import { AnimatedBrain } from "@/components/ui/animated-illustrations";

interface GeneratedQuestion {
  type: "checkpoint" | "reflection" | "challenge" | "discussion";
  title: string;
  description: string;
  options?: string[];
  correctAnswer?: string;
  xpReward: number;
  hint?: string;
  prompt?: string;
  deliverable?: string;
  discussionGuide?: string;
}

const typeConfig = {
  checkpoint: { icon: Target, color: "bg-primary/10 text-primary", label: "Quiz" },
  reflection: { icon: Brain, color: "bg-warm/10 text-warm", label: "Reflexão" },
  challenge: { icon: Lightbulb, color: "bg-gold/10 text-gold-foreground", label: "Desafio" },
  discussion: { icon: MessageCircle, color: "bg-success/10 text-success", label: "Discussão" },
};

interface AIMissionGeneratorProps {
  bookTitle: string;
  bookAuthor: string;
  chapter: number;
  totalChapters: number;
  studentName: string;
  studentLevel?: string;
}

export function AIMissionGenerator({
  bookTitle,
  bookAuthor,
  chapter,
  totalChapters,
  studentName,
  studentLevel = "intermediário",
}: AIMissionGeneratorProps) {
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedQ, setExpandedQ] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [textResponses, setTextResponses] = useState<Record<number, string>>({});
  const [submittedQ, setSubmittedQ] = useState<Set<number>>(new Set());

  const generateQuestions = async () => {
    setLoading(true);
    setError(null);
    setQuestions([]);
    setSelectedAnswers({});
    setTextResponses({});
    setSubmittedQ(new Set());

    try {
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookTitle,
          bookAuthor,
          chapter,
          totalChapters,
          studentName,
          studentLevel,
        }),
      });

      if (!res.ok) throw new Error("Falha ao gerar questões");

      const data = await res.json();
      setQuestions(data.questions);
      setExpandedQ(0);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckpointAnswer = (qIndex: number, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: answer }));
  };

  const handleSubmit = (qIndex: number) => {
    setSubmittedQ((prev) => new Set(prev).add(qIndex));
  };

  return (
    <div className="bg-card rounded-2xl border border-border/60 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-warm/5 to-gold/5 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warm/15 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-warm" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Missões IA — Capítulo {chapter}</h3>
              <p className="text-xs text-muted-foreground">
                Questões personalizadas para {studentName} · {bookTitle}
              </p>
            </div>
          </div>
          <button
            onClick={generateQuestions}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {loading ? "Gerando..." : questions.length > 0 ? "Regerar" : "Gerar Missões"}
          </button>
        </div>
      </div>

      {/* Loading state */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col items-center py-12"
          >
            <AnimatedBrain className="w-24 h-24 mb-4" />
            <p className="text-sm text-muted-foreground">A IA está analisando o capítulo {chapter}...</p>
            <p className="text-xs text-muted-foreground mt-1">
              Criando questões personalizadas para {studentName}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <div className="p-6">
          <div className="flex items-center gap-2 text-destructive text-sm">
            <XCircle className="w-4 h-4" />
            {error}
          </div>
        </div>
      )}

      {/* Questions */}
      {!loading && questions.length > 0 && (
        <div className="divide-y divide-border/40">
          {questions.map((q, i) => {
            const config = typeConfig[q.type];
            const Icon = config.icon;
            const isExpanded = expandedQ === i;
            const isSubmitted = submittedQ.has(i);
            const isCheckpoint = q.type === "checkpoint";
            const selectedAnswer = selectedAnswers[i];
            const isCorrect = isCheckpoint && selectedAnswer === q.correctAnswer;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Question header */}
                <button
                  onClick={() => setExpandedQ(isExpanded ? null : i)}
                  className="w-full p-5 flex items-center gap-4 hover:bg-secondary/30 transition-colors text-left"
                >
                  <div className={`w-10 h-10 rounded-xl ${config.color} flex items-center justify-center shrink-0`}>
                    {isSubmitted ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {config.label}
                      </span>
                      <span className="text-[10px] bg-gold/15 text-gold-foreground px-2 py-0.5 rounded-full">
                        +{q.xpReward} XP
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold truncate">{q.title}</h4>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pl-19">
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed pl-14">
                          {q.description}
                        </p>

                        {/* Checkpoint with options */}
                        {isCheckpoint && q.options && (
                          <div className="space-y-2 mb-4 pl-14">
                            {q.options.map((opt, oi) => {
                              const letter = opt.charAt(0);
                              const isSelected = selectedAnswer === letter;
                              const showResult = isSubmitted;
                              const isRight = letter === q.correctAnswer;

                              return (
                                <button
                                  key={oi}
                                  onClick={() => !isSubmitted && handleCheckpointAnswer(i, letter)}
                                  disabled={isSubmitted}
                                  className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-all ${
                                    showResult && isRight
                                      ? "border-success bg-success/10 text-success"
                                      : showResult && isSelected && !isRight
                                      ? "border-destructive bg-destructive/10 text-destructive"
                                      : isSelected
                                      ? "border-warm bg-warm/10"
                                      : "border-border/60 hover:border-border hover:bg-secondary/30"
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                            {isSubmitted && !isCorrect && q.hint && (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xs text-warm mt-2 flex items-center gap-1.5"
                              >
                                <Lightbulb className="w-3 h-3" />
                                Dica: {q.hint}
                              </motion.p>
                            )}
                          </div>
                        )}

                        {/* Text response for reflection/challenge/discussion */}
                        {!isCheckpoint && (
                          <div className="pl-14">
                            {q.prompt && (
                              <p className="text-xs text-warm mb-2 italic">{q.prompt}</p>
                            )}
                            {q.deliverable && (
                              <p className="text-xs text-muted-foreground mb-2">
                                Entrega: {q.deliverable}
                              </p>
                            )}
                            {q.discussionGuide && (
                              <p className="text-xs text-muted-foreground mb-2 italic">
                                Guia: {q.discussionGuide}
                              </p>
                            )}
                            <textarea
                              value={textResponses[i] || ""}
                              onChange={(e) =>
                                setTextResponses((prev) => ({ ...prev, [i]: e.target.value }))
                              }
                              disabled={isSubmitted}
                              placeholder="Escreva sua resposta aqui..."
                              className="w-full min-h-[100px] px-4 py-3 rounded-xl border border-border/60 bg-secondary/30 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-warm/50 disabled:opacity-60"
                            />
                          </div>
                        )}

                        {/* Submit button */}
                        {!isSubmitted && (
                          <div className="pl-14 mt-3">
                            <button
                              onClick={() => handleSubmit(i)}
                              disabled={
                                isCheckpoint ? !selectedAnswer : !(textResponses[i]?.trim())
                              }
                              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
                            >
                              <Send className="w-3.5 h-3.5" />
                              Enviar Resposta
                            </button>
                          </div>
                        )}

                        {/* Success state */}
                        {isSubmitted && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pl-14 mt-3 flex items-center gap-2 text-success text-sm"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="font-medium">
                              +{q.xpReward} XP! Missão completada!
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {!loading && questions.length === 0 && !error && (
        <div className="p-8 text-center">
          <AnimatedBrain className="w-20 h-20 mx-auto mb-4 opacity-50" />
          <p className="text-sm text-muted-foreground mb-1">
            A IA vai gerar missões personalizadas para você
          </p>
          <p className="text-xs text-muted-foreground">
            Baseadas no livro, capítulo e seu nível de leitura
          </p>
        </div>
      )}
    </div>
  );
}
