"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

// NÍVEL 1: INCONSCIENTE → Hook emocional provocativo
// O visitante não sabe que tem um problema. Precisamos PARAR o scroll.

export function Hero() {
  const { locale } = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-warm/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gold/8 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Provocative stat — stops the scroll */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-destructive/8 border border-destructive/15 text-sm mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-muted-foreground">
              {locale === "pt"
                ? "70% dos alunos brasileiros não leem um livro inteiro por ano"
                : "70% of Brazilian students don't finish a single book per year"}
            </span>
          </motion.div>

          {/* Headline — emotional, not feature-based */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1] mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {locale === "pt" ? (
              <>
                E se seus alunos{" "}
                <span className="text-gradient">quisessem</span>
                <br />
                ler o próximo capítulo?
              </>
            ) : (
              <>
                What if your students{" "}
                <span className="text-gradient">wanted</span>
                <br />
                to read the next chapter?
              </>
            )}
          </motion.h1>

          {/* Subheadline — bridges to problem awareness */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 text-balance leading-relaxed"
          >
            {locale === "pt"
              ? "A maioria das escolas tenta forçar a leitura com cobranças e provas. O resultado? Alunos que leem por obrigação — e esquecem tudo."
              : "Most schools try to force reading with tests and pressure. The result? Students who read out of obligation — and forget everything."}
          </motion.p>

          {/* CTA — subtle at this stage, curiosity-driven */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col items-center gap-6"
          >
            <a
              href="#problema"
              className="group flex items-center gap-2 text-base font-medium text-warm hover:text-foreground transition-colors"
            >
              {locale === "pt" ? "Existe outro caminho" : "There is another way"}
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
