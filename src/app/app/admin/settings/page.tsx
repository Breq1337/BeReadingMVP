"use client";

import { motion } from "framer-motion";
import { adminData } from "@/lib/mock-data";
import { Shield, Bell, Palette, Globe } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export default function AdminSettings() {
  const { t } = useLocale();

  const settings = [
    {
      icon: Shield,
      titleKey: "app.schoolProfile" as const,
      descKey: "app.schoolProfileDesc" as const,
      actionKey: "app.edit" as const,
    },
    {
      icon: Bell,
      titleKey: "app.notifications" as const,
      descKey: "app.notificationsDesc" as const,
      actionKey: "app.configure" as const,
    },
    {
      icon: Palette,
      titleKey: "app.branding" as const,
      descKey: "app.brandingDesc" as const,
      actionKey: "app.customize" as const,
    },
    {
      icon: Globe,
      titleKey: "app.integrations" as const,
      descKey: "app.integrationsDesc" as const,
      actionKey: "app.view" as const,
    },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          {t("app.settings")}
        </h1>
        <p className="text-sm text-muted-foreground">{adminData.schoolName}</p>
      </motion.div>

      <div className="space-y-4">
        {settings.map((setting, i) => (
          <motion.div
            key={setting.titleKey}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card rounded-2xl border border-border/60 p-6 flex items-center gap-5 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <setting.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold">{t(setting.titleKey)}</h3>
              <p className="text-xs text-muted-foreground">{t(setting.descKey)}</p>
            </div>
            <button className="text-xs font-medium text-warm hover:underline shrink-0">
              {t(setting.actionKey)}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
