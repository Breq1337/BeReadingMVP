"use client";

import { motion } from "framer-motion";
import { missions, currentStudent, books } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Sparkles, MessageCircle, Brain, Target } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

const missionIcons = {
  checkpoint: Target,
  reflection: Brain,
  challenge: Sparkles,
  discussion: MessageCircle,
};

const currentBook = books.find((b) => b.id === currentStudent.currentBookId)!;
const bookMissions = missions.filter((m) => m.bookId === currentStudent.currentBookId);

export default function StudentMissions() {
  const { t } = useLocale();

  return (
    <div className="p-6 lg:p-10 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          {t("app.missions")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {currentBook.title} — {bookMissions.filter((m) => m.isCompleted).length} {t("app.of")}{" "}
          {bookMissions.length} {t("app.completed")}
        </p>
      </motion.div>

      {/* Mission timeline */}
      <div className="space-y-4">
        {bookMissions.map((mission, i) => {
          const Icon = missionIcons[mission.type];
          const isNext = !mission.isCompleted && (i === 0 || bookMissions[i - 1]?.isCompleted);

          return (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`relative bg-card rounded-2xl border p-6 transition-all ${
                isNext
                  ? "border-warm/40 shadow-md shadow-warm/10"
                  : mission.isCompleted
                  ? "border-border/40 opacity-75"
                  : "border-border/60"
              }`}
            >
              {/* Timeline connector */}
              {i < bookMissions.length - 1 && (
                <div className="absolute left-9 top-full w-px h-4 bg-border/60 z-10" />
              )}

              <div className="flex items-start gap-4">
                {/* Status icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    mission.isCompleted
                      ? "bg-success/15"
                      : isNext
                      ? "bg-warm/15"
                      : "bg-secondary"
                  }`}
                >
                  {mission.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <Icon
                      className={`w-5 h-5 ${
                        isNext ? "text-warm" : "text-muted-foreground"
                      }`}
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3
                      className={`font-semibold ${
                        mission.isCompleted ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {mission.title}
                    </h3>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${
                        mission.isCompleted
                          ? "bg-success/10 text-success"
                          : "bg-gold/15 text-gold-foreground"
                      }`}
                    >
                      {mission.isCompleted ? t("app.earned") : "+"}{mission.xpReward} XP
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {mission.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {mission.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {t("app.chapter")} {mission.chapter}
                    </span>
                    {isNext && (
                      <Badge className="text-xs bg-warm/15 text-warm-foreground border-0 ml-auto">
                        {t("app.upNext")}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
