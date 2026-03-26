"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Mail, CheckCircle2, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function JoinClass({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setJoined(true);
  };

  if (joined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl border border-border/60 p-8 max-w-md text-center"
        >
          <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            Bem-vindo(a) à turma!
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Você foi adicionado(a) com sucesso. Acesse o painel do aluno para começar sua jornada de leitura.
          </p>
          <Link href="/app/student" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90">
            Ir para Minha Jornada <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl border border-border/60 p-8 max-w-md w-full"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              Be<span className="text-warm">Reading</span>
            </h1>
            <p className="text-xs text-muted-foreground">Entrar na Turma</p>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-xl p-4 mb-6">
          <p className="text-xs text-muted-foreground mb-1">Código do convite</p>
          <p className="text-sm font-mono font-bold">{code}</p>
        </div>

        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Nome Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Seu nome completo"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/60 bg-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="seu.email@escola.com"
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Use seu email pessoal ou acadêmico</p>
          </div>

          <button type="submit" disabled={!email || !name}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity">
            Entrar na Turma
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center gap-2 mt-4 text-[10px] text-muted-foreground">
          <Shield className="w-3 h-3" />
          <span>Apenas quem possui o link de convite pode se cadastrar nesta turma.</span>
        </div>
      </motion.div>
    </div>
  );
}
