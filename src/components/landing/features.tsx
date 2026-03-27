"use client";

import { motion } from "framer-motion";
import { BookOpen, Target, Trophy, BarChart3, Heart, Zap, Sparkles, Brain } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import type { TranslationKey } from "@/lib/i18n";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Features() {
  const { t } = useLocale();

  const features = [
    { icon: Brain, titleKey: "features2.ai.title", descKey: "features2.ai.desc", painKey: "features2.ai.pain", color: "bg-warm/10 text-warm" },
    { icon: Trophy, titleKey: "features2.gamification.title", descKey: "features2.gamification.desc", painKey: "features2.gamification.pain", color: "bg-gold/10 text-gold-foreground" },
    { icon: BarChart3, titleKey: "features2.dashboard.title", descKey: "features2.dashboard.desc", painKey: "features2.dashboard.pain", color: "bg-success/10 text-success" },
    { icon: Heart, titleKey: "features2.family.title", descKey: "features2.family.desc", painKey: "features2.family.pain", color: "bg-destructive/10 text-destructive" },
    { icon: BookOpen, titleKey: "features2.physical.title", descKey: "features2.physical.desc", painKey: "features2.physical.pain", color: "bg-primary/10 text-primary" },
    { icon: Zap, titleKey: "features2.setup.title", descKey: "features2.setup.desc", painKey: "features2.setup.pain", color: "bg-warm/10 text-warm" },
  ];

  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm/8 border border-warm/15 text-sm mb-6">
            <Sparkles className="w-4 h-4 text-warm" />
            <span className="text-warm font-medium">{t("features2.badge")}</span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("features2.title1")}{" "}
            <span className="text-gradient">{t("features2.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {t("features2.subtitle")}
          </p>
        </motion.div>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-14 py-4"
        >
          {(["stat1", "stat2", "stat3"] as const).map((key) => (
            <div key={key} className="text-center">
              <div className="text-lg font-bold text-warm">{t(`features2.${key}.value` as TranslationKey)}</div>
              <p className="text-[11px] text-muted-foreground">{t(`features2.${key}.label` as TranslationKey)}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.titleKey}
              variants={item}
              className="group bg-card rounded-2xl border border-border/60 p-7 hover:shadow-lg hover:shadow-primary/5 hover:border-border transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t(feature.titleKey as TranslationKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {t(feature.descKey as TranslationKey)}
              </p>
              <span className="inline-block text-[10px] font-medium text-warm/80 bg-warm/6 px-2.5 py-1 rounded-full">
                {t(feature.painKey as TranslationKey)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
