"use client";

import { motion } from "framer-motion";
import { missions } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Plus, Target, Brain, Sparkles, MessageCircle } from "lucide-react";

const missionIcons = {
  checkpoint: Target,
  reflection: Brain,
  challenge: Sparkles,
  discussion: MessageCircle,
};

export default function TeacherMissions() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            Mission Library
          </h1>
          <p className="text-sm text-muted-foreground">
            Create and manage reading missions for your classes
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          New Mission
        </button>
      </motion.div>

      {/* Mission types overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {[
          { type: "checkpoint", label: "Checkpoints", count: 8, icon: Target, color: "text-primary bg-primary/10" },
          { type: "reflection", label: "Reflections", count: 12, icon: Brain, color: "text-warm bg-warm/10" },
          { type: "challenge", label: "Challenges", count: 6, icon: Sparkles, color: "text-gold-foreground bg-gold/10" },
          { type: "discussion", label: "Discussions", count: 4, icon: MessageCircle, color: "text-success bg-success/10" },
        ].map((t) => (
          <div key={t.type} className="bg-card rounded-2xl border border-border/60 p-5">
            <div className={`w-10 h-10 rounded-xl ${t.color} flex items-center justify-center mb-3`}>
              <t.icon className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold">{t.count}</div>
            <p className="text-xs text-muted-foreground">{t.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Missions list */}
      <div className="space-y-3">
        {missions.map((mission, i) => {
          const Icon = missionIcons[mission.type];
          return (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="bg-card rounded-2xl border border-border/60 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold">{mission.title}</h3>
                    <span className="text-xs text-muted-foreground shrink-0">+{mission.xpReward} XP</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{mission.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px] capitalize">{mission.type}</Badge>
                    <span className="text-[10px] text-muted-foreground">Chapter {mission.chapter}</span>
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
