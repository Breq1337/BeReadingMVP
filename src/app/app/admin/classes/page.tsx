"use client";

import { motion } from "framer-motion";
import { adminData } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function AdminClasses() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          All Classes
        </h1>
        <p className="text-sm text-muted-foreground">{adminData.classMetrics.length} active classes</p>
      </motion.div>

      <div className="space-y-4">
        {adminData.classMetrics.map((cls, i) => (
          <motion.div
            key={cls.class}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card rounded-2xl border border-border/60 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-semibold">Class {cls.class}</h2>
                <p className="text-sm text-muted-foreground">{cls.teacher} · {cls.students} students</p>
              </div>
              <Badge
                variant="secondary"
                className={`${
                  cls.engagement >= 85
                    ? "bg-success/10 text-success"
                    : cls.engagement >= 70
                    ? "bg-warm/10 text-warm"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {cls.engagement}% engagement
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">Average Progress</span>
              <span className="font-medium">{cls.avgProgress}%</span>
            </div>
            <Progress value={cls.avgProgress} className="h-2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
