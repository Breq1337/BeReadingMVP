"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

export function Pricing() {
  const { t } = useLocale();

  const plans = [
    {
      name: t("pricing.pilot.name"),
      price: t("pricing.pilot.price"),
      period: t("pricing.pilot.period"),
      description: t("pricing.pilot.desc"),
      features: [t("pricing.pilot.f1"), t("pricing.pilot.f2"), t("pricing.pilot.f3"), t("pricing.pilot.f4"), t("pricing.pilot.f5")],
      cta: t("pricing.pilot.cta"),
      highlighted: false,
    },
    {
      name: t("pricing.school.name"),
      price: "R$ 12",
      period: t("pricing.school.period"),
      description: t("pricing.school.desc"),
      features: [t("pricing.school.f1"), t("pricing.school.f2"), t("pricing.school.f3"), t("pricing.school.f4"), t("pricing.school.f5"), t("pricing.school.f6"), t("pricing.school.f7")],
      cta: t("pricing.school.cta"),
      highlighted: true,
    },
    {
      name: t("pricing.network.name"),
      price: t("pricing.network.price"),
      period: t("pricing.network.period"),
      description: t("pricing.network.desc"),
      features: [t("pricing.network.f1"), t("pricing.network.f2"), t("pricing.network.f3"), t("pricing.network.f4"), t("pricing.network.f5"), t("pricing.network.f6")],
      cta: t("pricing.network.cta"),
      highlighted: false,
    },
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
          <p className="text-sm font-medium text-warm uppercase tracking-wider mb-4">{t("pricing.label")}</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            {t("pricing.title1")}<br />{t("pricing.title2")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
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
                  {t("pricing.popular")}
                </div>
              )}
              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className={`text-sm ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.period}</span>
              </div>
              <p className={`text-sm mb-6 ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? "text-warm" : "text-success"}`} />
                    <span>{feature}</span>
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
                {plan.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
