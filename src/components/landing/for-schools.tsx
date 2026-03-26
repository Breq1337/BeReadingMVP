"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, Home, Shield, CheckCircle2 } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { ConnectionIllustration } from "@/components/ui/illustrations";

export function ForSchools() {
  const { t } = useLocale();

  const audiences = [
    {
      icon: GraduationCap,
      title: t("schools.teachers.title"),
      subtitle: t("schools.teachers.subtitle"),
      benefits: [t("schools.teachers.b1"), t("schools.teachers.b2"), t("schools.teachers.b3"), t("schools.teachers.b4"), t("schools.teachers.b5")],
    },
    {
      icon: Users,
      title: t("schools.students.title"),
      subtitle: t("schools.students.subtitle"),
      benefits: [t("schools.students.b1"), t("schools.students.b2"), t("schools.students.b3"), t("schools.students.b4"), t("schools.students.b5")],
    },
    {
      icon: Home,
      title: t("schools.families.title"),
      subtitle: t("schools.families.subtitle"),
      benefits: [t("schools.families.b1"), t("schools.families.b2"), t("schools.families.b3"), t("schools.families.b4"), t("schools.families.b5")],
    },
    {
      icon: Shield,
      title: t("schools.admin.title"),
      subtitle: t("schools.admin.subtitle"),
      benefits: [t("schools.admin.b1"), t("schools.admin.b2"), t("schools.admin.b3"), t("schools.admin.b4"), t("schools.admin.b5")],
    },
  ];

  return (
    <section id="for-schools" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-medium text-warm uppercase tracking-wider mb-4">{t("schools.label")}</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            {t("schools.title1")}<br />{t("schools.title2")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("schools.subtitle")}</p>
          <ConnectionIllustration className="w-36 h-28 mx-auto mt-4 opacity-50" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audiences.map((audience, i) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border/60 p-8 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <audience.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{audience.title}</h3>
                  <p className="text-sm text-muted-foreground">{audience.subtitle}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {audience.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
