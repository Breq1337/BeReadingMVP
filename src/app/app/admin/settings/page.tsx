"use client";

import { motion } from "framer-motion";
import { adminData } from "@/lib/mock-data";
import { Shield, Bell, Palette, Globe } from "lucide-react";

const settings = [
  {
    icon: Shield,
    title: "School Profile",
    description: "Manage school name, logo, and contact information",
    action: "Edit",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure engagement alerts and weekly report emails",
    action: "Configure",
  },
  {
    icon: Palette,
    title: "Branding",
    description: "Customize colors and logo for your school's BeReading portal",
    action: "Customize",
  },
  {
    icon: Globe,
    title: "Integrations",
    description: "Connect with your school's existing systems (coming soon)",
    action: "View",
  },
];

export default function AdminSettings() {
  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          Settings
        </h1>
        <p className="text-sm text-muted-foreground">{adminData.schoolName}</p>
      </motion.div>

      <div className="space-y-4">
        {settings.map((setting, i) => (
          <motion.div
            key={setting.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card rounded-2xl border border-border/60 p-6 flex items-center gap-5 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <setting.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold">{setting.title}</h3>
              <p className="text-xs text-muted-foreground">{setting.description}</p>
            </div>
            <button className="text-xs font-medium text-warm hover:underline shrink-0">
              {setting.action}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
