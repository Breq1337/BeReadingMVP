"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";
import { AlertTriangle, Clock, Eye, BookX } from "lucide-react";
import type { TranslationKey } from "@/lib/i18n";

export function ProblemSection() {
  const { t } = useLocale();

  const pains = [
    { icon: BookX, roleKey: "problem.student.role" as TranslationKey, painKey: "problem.student.pain" as TranslationKey, statKey: "problem.student.stat" as TranslationKey },
    { icon: Clock, roleKey: "problem.teacher.role" as TranslationKey, painKey: "problem.teacher.pain" as TranslationKey, statKey: "problem.teacher.stat" as TranslationKey },
    { icon: Eye, roleKey: "problem.family.role" as TranslationKey, painKey: "problem.family.pain" as TranslationKey, statKey: "problem.family.stat" as TranslationKey },
    { icon: AlertTriangle, roleKey: "problem.school.role" as TranslationKey, painKey: "problem.school.pain" as TranslationKey, statKey: "problem.school.stat" as TranslationKey },
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
            {t("problem.label")}
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("problem.title1")}
            <br />
            <span className="text-muted-foreground">{t("problem.title2")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("problem.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pains.map((pain, i) => (
            <motion.div
              key={pain.roleKey}
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
                  <h3 className="text-base font-semibold mb-2">{t(pain.roleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {t(pain.painKey)}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive/70 bg-destructive/8 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive/60" />
                    {t(pain.statKey)}
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
