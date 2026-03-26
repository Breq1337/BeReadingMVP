"use client";

import { motion } from "framer-motion";
import { BookOpen, Target, Trophy, BarChart3, Heart, Zap } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { BookStackIllustration } from "@/components/ui/illustrations";

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
    { icon: Target, title: t("features.missions.title"), description: t("features.missions.desc"), color: "bg-warm/10 text-warm" },
    { icon: Trophy, title: t("features.gamification.title"), description: t("features.gamification.desc"), color: "bg-gold/10 text-gold-foreground" },
    { icon: BarChart3, title: t("features.dashboard.title"), description: t("features.dashboard.desc"), color: "bg-success/10 text-success" },
    { icon: Heart, title: t("features.family.title"), description: t("features.family.desc"), color: "bg-destructive/10 text-destructive" },
    { icon: BookOpen, title: t("features.physical.title"), description: t("features.physical.desc"), color: "bg-primary/10 text-primary" },
    { icon: Zap, title: t("features.setup.title"), description: t("features.setup.desc"), color: "bg-warm/10 text-warm" },
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
          <p className="text-sm font-medium text-warm uppercase tracking-wider mb-4">
            {t("features.label")}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            {t("features.title1")}
            <br />
            {t("features.title2")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {t("features.subtitle")}
          </p>
          <BookStackIllustration className="w-32 h-32 mx-auto mt-6 opacity-60" />
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group bg-card rounded-2xl border border-border/60 p-7 hover:shadow-lg hover:shadow-primary/5 hover:border-border transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
