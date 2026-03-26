"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { currentTeacher } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Users, Plus, Link2, Copy, CheckCircle2, Clock, X, ArrowLeft,
  Settings, Calendar, BookOpen,
} from "lucide-react";
import Link from "next/link";

export default function TeacherClasses() {
  const [showCreate, setShowCreate] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [inviteExpiry, setInviteExpiry] = useState("7");

  const copyInviteLink = (code: string) => {
    const link = `${typeof window !== "undefined" ? window.location.origin : ""}/join/${code}`;
    navigator.clipboard.writeText(link);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <Link href="/app/teacher" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-3">
            <ArrowLeft className="w-3 h-3" /> Voltar ao Painel
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            Minhas Turmas
          </h1>
          <p className="text-sm text-muted-foreground">{currentTeacher.classes.length} turmas ativas</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90">
          <Plus className="w-4 h-4" /> Nova Turma
        </button>
      </motion.div>

      {/* Create class form */}
      <AnimatePresence>
        {showCreate && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="bg-card rounded-2xl border border-border/60 p-6 mb-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Criar Nova Turma</h2>
              <button onClick={() => setShowCreate(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Nome da Turma</label>
                <input className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Ex: 7C — Literatura" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Série</label>
                <select className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-secondary/30 text-sm">
                  <option>6º Ano</option>
                  <option>7º Ano</option>
                  <option>8º Ano</option>
                  <option>9º Ano</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Livro Ativo</label>
                <select className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-secondary/30 text-sm">
                  <option>O Doador de Memórias — Lois Lowry</option>
                  <option>Extraordinário — R.J. Palacio</option>
                  <option>O Pequeno Príncipe — Saint-Exupéry</option>
                  <option>Fahrenheit 451 — Ray Bradbury</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Validade do Convite</label>
                <select value={inviteExpiry} onChange={(e) => setInviteExpiry(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-secondary/30 text-sm">
                  <option value="3">3 dias</option>
                  <option value="7">7 dias</option>
                  <option value="14">14 dias</option>
                  <option value="30">30 dias</option>
                  <option value="90">90 dias</option>
                </select>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Link2 className="w-4 h-4 text-warm" />
                <span className="text-xs font-medium">Como funciona o convite?</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Ao criar a turma, um link de convite único será gerado. Envie o link para seus alunos — eles se cadastram com email pessoal ou acadêmico.
                Somente quem tiver o link pode entrar na turma. Você pode configurar a validade do link.
              </p>
            </div>

            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90">
              <Plus className="w-4 h-4" /> Criar Turma e Gerar Link
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Class list */}
      <div className="space-y-4">
        {currentTeacher.classes.map((cls, i) => (
          <motion.div key={cls.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-2xl border border-border/60 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">{cls.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {cls.studentCount} alunos · Lendo: {cls.activeBook}
                </p>
              </div>
              <Badge variant="secondary" className={`${
                cls.engagementScore >= 85 ? "bg-success/10 text-success" :
                cls.engagementScore >= 70 ? "bg-warm/10 text-warm" :
                "bg-destructive/10 text-destructive"
              }`}>
                {cls.engagementScore}% engajamento
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-secondary/50 rounded-xl p-3">
                <div className="text-lg font-bold">{cls.averageProgress}%</div>
                <p className="text-xs text-muted-foreground">Progresso Médio</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-3">
                <div className="text-lg font-bold">{cls.studentCount}</div>
                <p className="text-xs text-muted-foreground">Alunos</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-3">
                <div className="text-lg font-bold">{cls.engagementScore}%</div>
                <p className="text-xs text-muted-foreground">Engajamento</p>
              </div>
            </div>

            <Progress value={cls.averageProgress} className="h-2 mb-4" />

            {/* Invite link section */}
            <div className="bg-secondary/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-warm" />
                  <div>
                    <p className="text-xs font-medium">Link de Convite</p>
                    <p className="text-[10px] text-muted-foreground">
                      Código: {cls.inviteCode} · Válido até {cls.inviteExpiry}
                    </p>
                  </div>
                </div>
                <button onClick={() => copyInviteLink(cls.inviteCode!)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    copiedCode === cls.inviteCode
                      ? "bg-success/10 text-success"
                      : "bg-warm/10 text-warm hover:bg-warm/20"
                  }`}>
                  {copiedCode === cls.inviteCode ? (
                    <><CheckCircle2 className="w-3 h-3" /> Copiado!</>
                  ) : (
                    <><Copy className="w-3 h-3" /> Copiar Link</>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
