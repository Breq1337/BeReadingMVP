"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, Users } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function Hero() {
  const { t } = useLocale();

  const stats = [
    { value: "87%", label: t("hero.stat1") },
    { value: "3.2x", label: t("hero.stat2") },
    { value: "40+", label: t("hero.stat3") },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-warm/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm/10 border border-warm/20 text-sm text-warm-foreground mb-8"
          >
            <Sparkles className="w-4 h-4 text-warm" />
            <span>{t("hero.badge")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("hero.title1")}{" "}
            <span className="text-gradient">{t("hero.title2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/app"
              className="group flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl text-base font-semibold hover:opacity-90 transition-all hover:gap-3"
            >
              {t("hero.cta1")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-medium border border-border hover:bg-secondary transition-colors"
            >
              {t("hero.cta2")}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Product preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-20 md:mt-28 max-w-5xl mx-auto"
        >
          <div className="relative">
            <div className="bg-card rounded-3xl border border-border/60 shadow-xl shadow-primary/5 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-gold/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
                <span className="ml-4 text-xs text-muted-foreground font-mono">
                  bereading.app/aluno/jornada
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-secondary/50 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-20 rounded-lg bg-gradient-to-br from-warm/30 to-gold/20 flex items-center justify-center text-3xl">
                      📘
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {t("hero.currentlyReading")}
                      </p>
                      <h3 className="text-xl font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                        O Doador de Memórias
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">por Lois Lowry</p>
                      <div className="w-full bg-border rounded-full h-2.5">
                        <div className="bg-warm h-2.5 rounded-full transition-all" style={{ width: "61%" }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {t("app.chapter")} 14 {t("app.of")} 23 — 61% {t("app.complete")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-secondary/50 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-warm">12</div>
                    <div className="text-xs text-muted-foreground mt-1">{t("hero.dayStreak")}</div>
                  </div>
                  <div className="bg-secondary/50 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold">840</div>
                    <div className="text-xs text-muted-foreground mt-1">{t("hero.xpEarned")}</div>
                  </div>
                  <div className="bg-secondary/50 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-success">Nv.5</div>
                    <div className="text-xs text-muted-foreground mt-1">{t("hero.readerLevel")}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-secondary/50 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold" />
                    {t("hero.nextMission")}
                  </h4>
                  <span className="text-xs bg-gold/15 text-gold-foreground px-2.5 py-1 rounded-full font-medium">
                    +80 XP
                  </span>
                </div>
                <p className="text-sm font-medium mb-1">O Peso do Conhecimento</p>
                <p className="text-xs text-muted-foreground">
                  Jonas agora carrega memórias que ninguém mais tem. Se você pudesse carregar uma memória por toda a comunidade, qual seria?
                </p>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-4 md:-right-8 bg-card rounded-2xl border border-border shadow-lg p-4 hidden md:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium">{t("hero.missionComplete")}</p>
                <p className="text-xs text-muted-foreground">{t("hero.xpEarnedShort")}</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 md:-left-8 bg-card rounded-2xl border border-border shadow-lg p-4 hidden md:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-warm/15 flex items-center justify-center">
                <Users className="w-5 h-5 text-warm" />
              </div>
              <div>
                <p className="text-sm font-medium">Turma 7A</p>
                <p className="text-xs text-muted-foreground">{t("hero.classEngaged")}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
