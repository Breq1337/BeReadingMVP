"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";
import { Lightbulb, BookOpen, ArrowDown } from "lucide-react";

export function SolutionBridge() {
  const { t } = useLocale();

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-warm/6 rounded-full blur-3xl" />
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
            {t("solution.label")}
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("solution.title1")}{" "}
            <span className="text-gradient">{t("solution.titleHighlight")}</span>
            {t("solution.title2")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {t("solution.subtitle")}
          </p>
        </motion.div>

        {/* Visual concept: Physical + Digital = Magic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/8 flex items-center justify-center mb-4">
              <BookOpen className="w-10 h-10 text-primary/70" />
            </div>
            <h3 className="text-base font-semibold mb-2">{t("solution.physical.title")}</h3>
            <p className="text-sm text-muted-foreground">{t("solution.physical.desc")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-warm to-gold flex items-center justify-center mb-4 shadow-lg shadow-warm/20">
              <span className="text-2xl font-bold text-white">+</span>
            </div>
            <h3 className="text-base font-semibold mb-2 text-warm">{t("solution.layer.title")}</h3>
            <p className="text-sm text-muted-foreground">{t("solution.layer.desc")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-success/8 flex items-center justify-center mb-4">
              <Lightbulb className="w-10 h-10 text-success/70" />
            </div>
            <h3 className="text-base font-semibold mb-2">{t("solution.purpose.title")}</h3>
            <p className="text-sm text-muted-foreground">{t("solution.purpose.desc")}</p>
          </motion.div>
        </div>

        {/* Transition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-base text-muted-foreground mb-4">{t("solution.transition")}</p>
          <a
            href="#features"
            className="group inline-flex items-center gap-2 text-sm font-medium text-warm hover:text-foreground transition-colors"
          >
            {t("solution.cta")}
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
