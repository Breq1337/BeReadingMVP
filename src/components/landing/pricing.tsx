"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import type { TranslationKey } from "@/lib/i18n";

export function Pricing() {
  const { t } = useLocale();

  const plans = [
    {
      nameKey: "pricing2.pilot.name",
      priceKey: "pricing2.pilot.price",
      periodKey: null,
      descKey: "pricing2.pilot.desc",
      featureKeys: ["pricing2.pilot.f1", "pricing2.pilot.f2", "pricing2.pilot.f3", "pricing2.pilot.f4", "pricing2.pilot.f5", "pricing2.pilot.f6"],
      ctaKey: "pricing2.pilot.cta",
      highlighted: false,
    },
    {
      nameKey: "pricing2.school.name",
      priceKey: "pricing2.school.price",
      periodKey: "pricing2.school.period",
      descKey: "pricing2.school.desc",
      featureKeys: ["pricing2.school.f1", "pricing2.school.f2", "pricing2.school.f3", "pricing2.school.f4", "pricing2.school.f5", "pricing2.school.f6", "pricing2.school.f7"],
      ctaKey: "pricing2.school.cta",
      highlighted: true,
    },
    {
      nameKey: "pricing2.network.name",
      priceKey: "pricing2.network.price",
      periodKey: null,
      descKey: "pricing2.network.desc",
      featureKeys: ["pricing2.network.f1", "pricing2.network.f2", "pricing2.network.f3", "pricing2.network.f4", "pricing2.network.f5", "pricing2.network.f6"],
      ctaKey: "pricing2.network.cta",
      highlighted: false,
    },
  ];

  const guarantees = [
    { icon: ShieldCheck, titleKey: "pricing2.guarantee.title", descKey: "pricing2.guarantee.desc", color: "text-success" },
    { icon: Clock, titleKey: "pricing2.noContract.title", descKey: "pricing2.noContract.desc", color: "text-warm" },
    { icon: Sparkles, titleKey: "pricing2.onboarding.title", descKey: "pricing2.onboarding.desc", color: "text-gold-foreground" },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-medium text-warm uppercase tracking-wider mb-4">
            {t("pricing2.label")}
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("pricing2.title1")}{" "}
            <span className="text-gradient">{t("pricing2.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("pricing2.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.nameKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-2xl border p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground border-primary shadow-2xl shadow-primary/20 scale-[1.02]"
                  : "bg-card border-border/60 hover:shadow-lg hover:shadow-primary/5"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-warm text-warm-foreground text-xs font-semibold px-4 py-1 rounded-full">
                  {t("pricing2.popular")}
                </div>
              )}
              <h3 className="text-lg font-semibold mb-1">{t(plan.nameKey as TranslationKey)}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold">{t(plan.priceKey as TranslationKey)}</span>
                {plan.periodKey && (
                  <span className={`text-sm ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {t(plan.periodKey as TranslationKey)}
                  </span>
                )}
              </div>
              <p className={`text-sm mb-6 ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {t(plan.descKey as TranslationKey)}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.featureKeys.map((fk) => (
                  <li key={fk} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? "text-warm" : "text-success"}`} />
                    <span>{t(fk as TranslationKey)}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/app"
                className={`group flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-primary-foreground text-primary hover:opacity-90"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                {t(plan.ctaKey as TranslationKey)}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Risk removal guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {guarantees.map((g) => (
            <div key={g.titleKey} className="flex items-start gap-3 text-center md:text-left">
              <g.icon className={`w-6 h-6 ${g.color} shrink-0 mt-0.5`} />
              <div>
                <h4 className="text-sm font-semibold mb-1">{t(g.titleKey as TranslationKey)}</h4>
                <p className="text-xs text-muted-foreground">{t(g.descKey as TranslationKey)}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
