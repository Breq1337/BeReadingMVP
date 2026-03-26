"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { olympiads, currentTeacher } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy, Medal, Star, Users, Calendar, Flame, Plus,
  ChevronRight, BookOpen, Crown, ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function TeacherOlympics() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="p-6 lg:p-10 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <Link href="/app/teacher" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-3">
            <ArrowLeft className="w-3 h-3" /> Voltar ao Painel
          </Link>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Olimpíadas Literárias
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Organize competições de leitura entre turmas</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Nova Olimpíada
        </button>
      </motion.div>

      {/* Create form */}
      {showCreate && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-warm/20 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-warm" /> Criar Nova Olimpíada
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Nome da Olimpíada</label>
              <input className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-warm/50" placeholder="Ex: II Olimpíada Literária" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Livro Base</label>
              <select className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-secondary/30 text-sm">
                <option>O Doador de Memórias</option>
                <option>Extraordinário</option>
                <option>Fahrenheit 451</option>
                <option>O Pequeno Príncipe</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Data Início</label>
              <input type="date" className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-secondary/30 text-sm" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Data Fim</label>
              <input type="date" className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-secondary/30 text-sm" />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-xs text-muted-foreground mb-2 block">Turmas Participantes</label>
            <div className="flex gap-2 flex-wrap">
              {currentTeacher.classes.map((cls) => (
                <label key={cls.id} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 text-xs cursor-pointer hover:bg-secondary/30">
                  <input type="checkbox" className="rounded" defaultChecked={cls.id === "c1" || cls.id === "c2"} />
                  {cls.name}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="text-xs text-muted-foreground mb-2 block">Rodadas</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {["Quiz Relâmpago", "Redação Criativa", "Debate em Equipe", "Projeto Artístico"].map((r) => (
                <label key={r} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 text-xs cursor-pointer hover:bg-secondary/30">
                  <input type="checkbox" className="rounded" defaultChecked />
                  {r}
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-2.5 rounded-xl bg-warm text-white text-sm font-semibold hover:opacity-90">
              Criar Olimpíada
            </button>
            <button onClick={() => setShowCreate(false)} className="px-5 py-2.5 rounded-xl bg-secondary text-sm font-medium hover:bg-secondary/80">
              Cancelar
            </button>
          </div>
        </motion.div>
      )}

      {/* Active Olympiads */}
      {olympiads.map((olympiad, oi) => (
        <motion.div key={olympiad.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: oi * 0.1 }} className="bg-card rounded-2xl border border-border/60 overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-warm/5 to-gold/5 p-6 border-b border-border/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-warm/15 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-warm" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{olympiad.name}</h2>
                  <p className="text-xs text-muted-foreground">{olympiad.description}</p>
                </div>
              </div>
              <Badge className={`${
                olympiad.status === "active" ? "bg-success/10 text-success" :
                olympiad.status === "upcoming" ? "bg-warm/10 text-warm" :
                "bg-secondary text-muted-foreground"
              } border-0`}>
                {olympiad.status === "active" ? "Em Andamento" : olympiad.status === "upcoming" ? "Em Breve" : "Finalizada"}
              </Badge>
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {olympiad.startDate} — {olympiad.endDate}</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {olympiad.classes.length} turmas</span>
              <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {olympiad.rounds.length} rodadas</span>
            </div>
          </div>

          {/* Rounds */}
          <div className="p-6 border-b border-border/40">
            <h3 className="text-sm font-semibold mb-3">Rodadas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {olympiad.rounds.map((round) => (
                <div key={round.id} className={`rounded-xl border p-3 ${
                  round.status === "active" ? "border-warm bg-warm/5" :
                  round.status === "completed" ? "border-success/30 bg-success/5" :
                  "border-border/60"
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-medium text-muted-foreground">{round.type}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      round.status === "active" ? "bg-warm animate-pulse" :
                      round.status === "completed" ? "bg-success" :
                      "bg-secondary"
                    }`} />
                  </div>
                  <p className="text-xs font-medium">{round.name}</p>
                  <p className="text-[10px] text-muted-foreground">{round.maxPoints} pontos</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="p-6">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Medal className="w-4 h-4 text-warm" /> Ranking
            </h3>
            <div className="space-y-2">
              {olympiad.leaderboard.map((entry, i) => (
                <div key={entry.studentId} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/30 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    i === 0 ? "bg-warm/15 text-warm" :
                    i === 1 ? "bg-secondary text-foreground" :
                    i === 2 ? "bg-warm/8 text-warm/70" :
                    "bg-secondary/50 text-muted-foreground"
                  }`}>
                    {i < 3 ? <Crown className="w-4 h-4" /> : i + 1}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium">{entry.studentName}</span>
                    <span className="text-[10px] text-muted-foreground ml-2">{entry.className}</span>
                  </div>
                  <div className="text-sm font-bold text-warm">{entry.totalPoints} pts</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
