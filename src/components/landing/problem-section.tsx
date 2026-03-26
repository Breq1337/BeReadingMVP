"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";
import { AlertTriangle, Clock, Eye, BookX } from "lucide-react";

// NÍVEL 2: CONSCIENTE DO PROBLEMA
// Agora o visitante sabe que existe um problema. Vamos AGRAVAR a dor
// mostrando que ele sente isso todo dia — e que o custo de não agir é real.

export function ProblemSection() {
  const { locale } = useLocale();
  const pt = locale === "pt";

  const pains = [
    {
      icon: BookX,
      role: pt ? "O aluno" : "The student",
      pain: pt
        ? "Lê por obrigação. Não se conecta com o livro. Entrega resumos copiados. Não vê sentido."
        : "Reads out of obligation. Doesn't connect with the book. Copies summaries. Sees no point.",
      stat: pt ? "82% dizem que 'não gostam de ler'" : "82% say they 'don't like reading'",
    },
    {
      icon: Clock,
      role: pt ? "O professor" : "The teacher",
      pain: pt
        ? "Gasta horas corrigindo fichas de leitura genéricas. Não sabe quem realmente leu. Sente que está falando sozinho."
        : "Spends hours grading generic reading sheets. Doesn't know who actually read. Feels like talking to walls.",
      stat: pt ? "4h/semana em correção manual" : "4h/week on manual grading",
    },
    {
      icon: Eye,
      role: pt ? "A família" : "The family",
      pain: pt
        ? "Não sabe o que o filho está lendo. Descobre que não leu só na prova. Quer ajudar mas não sabe como."
        : "Doesn't know what their child is reading. Only discovers they didn't read at test time. Wants to help but doesn't know how.",
      stat: pt ? "91% querem mais visibilidade" : "91% want more visibility",
    },
    {
      icon: AlertTriangle,
      role: pt ? "A escola" : "The school",
      pain: pt
        ? "Investe em programa de leitura mas não tem métricas. Não consegue provar impacto para os pais. Perde alunos para escolas com propostas mais inovadoras."
        : "Invests in reading programs but has no metrics. Can't prove impact to parents. Loses students to schools with more innovative proposals.",
      stat: pt ? "0 métricas de engajamento" : "0 engagement metrics",
    },
  ];

  return (
    <section id="problema" className="py-24 md:py-32 bg-secondary/30 relative">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-medium text-destructive/80 uppercase tracking-wider mb-4">
            {pt ? "O problema real" : "The real problem"}
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {pt ? (
              <>
                Todos sofrem com a leitura.
                <br />
                <span className="text-muted-foreground">Ninguém fala sobre isso.</span>
              </>
            ) : (
              <>
                Everyone struggles with reading.
                <br />
                <span className="text-muted-foreground">Nobody talks about it.</span>
              </>
            )}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {pt
              ? "O ciclo é sempre o mesmo: a escola manda ler, o aluno finge que leu, o professor não tem como verificar, e a família só descobre quando a nota sai."
              : "The cycle is always the same: the school assigns reading, the student pretends they read, the teacher can't verify, and the family only finds out when grades come out."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pains.map((pain, i) => (
            <motion.div
              key={pain.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border/60 p-7 hover:shadow-lg hover:shadow-destructive/5 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-destructive/8 flex items-center justify-center shrink-0 group-hover:bg-destructive/12 transition-colors">
                  <pain.icon className="w-5 h-5 text-destructive/70" />
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-2">{pain.role}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {pain.pain}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive/70 bg-destructive/8 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive/60" />
                    {pain.stat}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
