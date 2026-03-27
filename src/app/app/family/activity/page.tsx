"use client";

import { motion } from "framer-motion";
import { familyData } from "@/lib/mock-data";
import { BookOpen } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

export default function FamilyActivity() {
  const { t } = useLocale();

  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          {t("app.activityTimeline")}
        </h1>
        <p className="text-sm text-muted-foreground">{familyData.studentName}&apos;s {t("app.recentReadingActivity")}</p>
      </motion.div>

      <div className="space-y-4">
        {familyData.recentActivity.map((activity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-warm/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-warm" />
              </div>
              {i < familyData.recentActivity.length - 1 && (
                <div className="w-px flex-1 bg-border mt-2" />
              )}
            </div>
            <div className="bg-card rounded-2xl border border-border/60 p-5 flex-1 mb-2">
              <p className="text-sm font-medium mb-1">{activity.action}</p>
              <p className="text-xs text-muted-foreground">
                {activity.book} · {t("app.chapterLabel")} {activity.chapter}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
