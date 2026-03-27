"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import type { TranslationKey } from "@/lib/i18n";

export function CTASection() {
  const { t } = useLocale();

  const bulletKeys: TranslationKey[] = ["cta2.bullet1", "cta2.bullet2", "cta2.bullet3"];

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
              {t("cta2.badge")}
            </motion.div>

            <h2
              className="text-3xl md:text-5xl font-bold text-primary-foreground tracking-tight mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t("cta2.title1")}
              <br />
              <span className="text-warm">{t("cta2.titleHighlight")}</span>
            </h2>

            <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto mb-8">
              {t("cta2.subtitle")}
            </p>

            {/* Quick bullets */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              {bulletKeys.map((key) => (
                <div key={key} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                  <CheckCircle2 className="w-4 h-4 text-warm" />
                  {t(key)}
                </div>
              ))}
            </div>

            <Link
              href="/app"
              className="group inline-flex items-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-2xl text-base font-semibold hover:opacity-90 transition-all hover:gap-3"
            >
              {t("cta2.button")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <p className="text-xs text-primary-foreground/50 mt-4">
              {t("cta2.note")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
