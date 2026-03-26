"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

// NÍVEL 5 (continuação): EMPURRÃO FINAL
// Última chance de converter. Recapitula o valor, remove a última objeção,
// e cria senso de urgência com vagas limitadas para o piloto.

export function CTASection() {
  const { locale } = useLocale();
  const pt = locale === "pt";

  const bullets = pt
    ? [
        "Setup em menos de 1 semana",
        "Sem cartão de crédito para o piloto",
        "Suporte completo de onboarding",
      ]
    : [
        "Setup in less than 1 week",
        "No credit card for the pilot",
        "Full onboarding support",
      ];

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 md:px-16 md:py-24 text-center"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-warm/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            {/* Urgency badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm/20 border border-warm/30 text-sm text-primary-foreground/90 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-warm animate-pulse" />
              {pt
                ? "Vagas limitadas para piloto gratuito em 2026"
                : "Limited spots for free pilot in 2026"}
            </motion.div>

            <h2
              className="text-3xl md:text-5xl font-bold text-primary-foreground tracking-tight mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {pt ? (
                <>
                  Seus alunos vão ler o próximo capítulo.
                  <br />
                  <span className="text-warm">Por vontade própria.</span>
                </>
              ) : (
                <>
                  Your students will read the next chapter.
                  <br />
                  <span className="text-warm">By choice.</span>
                </>
              )}
            </h2>

            <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto mb-8">
              {pt
                ? "Junte-se às escolas que estão transformando a leitura obrigatória em paixão. Comece hoje — é grátis."
                : "Join the schools transforming mandatory reading into passion. Start today — it's free."}
            </p>

            {/* Quick bullets */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              {bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="flex items-center gap-2 text-sm text-primary-foreground/80"
                >
                  <CheckCircle2 className="w-4 h-4 text-warm" />
                  {bullet}
                </div>
              ))}
            </div>

            <Link
              href="/app"
              className="group inline-flex items-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-2xl text-base font-semibold hover:opacity-90 transition-all hover:gap-3"
            >
              {pt ? "Começar Piloto Gratuito" : "Start Free Pilot"}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <p className="text-xs text-primary-foreground/50 mt-4">
              {pt
                ? "Sem cartão. Sem contrato. 30 dias grátis com todas as funcionalidades."
                : "No card. No contract. 30 days free with all features."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
