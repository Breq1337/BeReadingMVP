"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";
import { ReadingPersonIllustration } from "@/components/ui/illustrations";

export function HowItWorks() {
  const { t } = useLocale();

  const steps = [
    { number: "01", title: t("how.step1.title"), description: t("how.step1.desc"), visual: "📚" },
    { number: "02", title: t("how.step2.title"), description: t("how.step2.desc"), visual: "📖" },
    { number: "03", title: t("how.step3.title"), description: t("how.step3.desc"), visual: "✨" },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-secondary/30 relative">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-medium text-warm uppercase tracking-wider mb-4">{t("how.label")}</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            {t("how.title1")}<br />{t("how.title2")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("how.subtitle")}</p>
          <ReadingPersonIllustration className="w-28 h-28 mx-auto mt-4 opacity-50" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative text-center"
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-border" />
              )}
              <div className="text-6xl mb-6">{step.visual}</div>
              <div className="text-xs font-mono text-warm mb-3 uppercase tracking-widest">
                Passo {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
