"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";
import type { TranslationKey } from "@/lib/i18n";

export function ImpactMetrics() {
  const { t } = useLocale();

  const stats = [
    { valueKey: "impact.stat1.value", labelKey: "impact.stat1.label", color: "text-warm" },
    { valueKey: "impact.stat2.value", labelKey: "impact.stat2.label", color: "text-success" },
    { valueKey: "impact.stat3.value", labelKey: "impact.stat3.label", color: "text-primary" },
    { valueKey: "impact.stat4.value", labelKey: "impact.stat4.label", color: "text-gold-foreground" },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-warm/4 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-medium text-warm uppercase tracking-wider mb-4">
            {t("impact.label")}
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("impact.title1")}
            <br />
            <span className="text-muted-foreground">{t("impact.title2")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("impact.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.valueKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border/60 p-6 text-center hover:shadow-lg hover:shadow-primary/5 transition-all"
            >
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                {t(stat.valueKey as TranslationKey)}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-snug">
                {t(stat.labelKey as TranslationKey)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-[11px] text-muted-foreground/60"
        >
          {t("impact.note")}
        </motion.p>
      </div>
    </section>
  );
}
