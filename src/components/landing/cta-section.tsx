"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export function CTASection() {
  const { t } = useLocale();

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
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground tracking-tight mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              {t("cta.title1")}<br />{t("cta.title2")}
            </h2>
            <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto mb-10">{t("cta.subtitle")}</p>
            <Link
              href="/app"
              className="group inline-flex items-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-2xl text-base font-semibold hover:opacity-90 transition-all hover:gap-3"
            >
              {t("cta.button")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
