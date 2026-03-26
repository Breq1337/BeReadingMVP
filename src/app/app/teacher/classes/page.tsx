"use client";

import { motion } from "framer-motion";
import { currentTeacher } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

export default function TeacherClasses() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          My Classes
        </h1>
        <p className="text-sm text-muted-foreground">
          {currentTeacher.classes.length} active classes
        </p>
      </motion.div>

      <div className="space-y-4">
        {currentTeacher.classes.map((cls, i) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-2xl border border-border/60 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">{cls.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {cls.studentCount} students · Reading: {cls.activeBook}
                </p>
              </div>
              <Badge
                variant="secondary"
                className={`${
                  cls.engagementScore >= 85
                    ? "bg-success/10 text-success"
                    : cls.engagementScore >= 70
                    ? "bg-warm/10 text-warm"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {cls.engagementScore}% engagement
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-secondary/50 rounded-xl p-3">
                <div className="text-lg font-bold">{cls.averageProgress}%</div>
                <p className="text-xs text-muted-foreground">Avg Progress</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-3">
                <div className="text-lg font-bold">{cls.studentCount}</div>
                <p className="text-xs text-muted-foreground">Students</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-3">
                <div className="text-lg font-bold">{cls.engagementScore}%</div>
                <p className="text-xs text-muted-foreground">Engagement</p>
              </div>
            </div>

            <Progress value={cls.averageProgress} className="h-2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
