"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen, Mail, CheckCircle2, ArrowRight, Shield, Loader2,
  XCircle, Users, GraduationCap, ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { useLocale } from "@/lib/locale-context";

interface ClassInfo {
  classId: string;
  className: string;
  grade: string;
  teacher: string;
  school: string;
  activeBook: string;
  studentCount: number;
}

type PageState = "loading" | "form" | "joining" | "success" | "error";

export default function JoinClass({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pageState, setPageState] = useState<PageState>("loading");
  const [classInfo, setClassInfo] = useState<ClassInfo | null>(null);
  const [errorType, setErrorType] = useState<string>("");

  // Validate invite code on mount
  useEffect(() => {
    async function validateCode() {
      try {
        const res = await fetch(`/api/join?code=${encodeURIComponent(code)}`);
        if (res.ok) {
          const data = await res.json();
          setClassInfo(data);
          setPageState("form");
        } else {
          const data = await res.json();
          setErrorType(data.error || "unknown");
          setPageState("error");
        }
      } catch {
        setErrorType("network");
        setPageState("error");
      }
    }
    validateCode();
  }, [code]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPageState("joining");

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, name, email }),
      });

      if (res.ok) {
        setPageState("success");
      } else {
        const data = await res.json();
        setErrorType(data.error || "unknown");
        setPageState("error");
      }
    } catch {
      setErrorType("network");
      setPageState("error");
    }
  };

  const getErrorMessage = () => {
    switch (errorType) {
      case "invalid_code": return t("join.invalidCode");
      case "expired_code": return t("join.expiredCode");
      default: return t("join.errorGeneric");
    }
  };

  // Loading state
  if (pageState === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">{t("join.validating")}</p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (pageState === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl border border-border/60 p-8 max-w-md text-center"
        >
          <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            Oops!
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {getErrorMessage()}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setPageState("loading"); setErrorType(""); window.location.reload(); }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90"
            >
              {t("join.submit")}
            </button>
            <Link href="/" className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" /> {t("join.backToHome")}
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Success state
  if (pageState === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-2xl border border-border/60 p-8 max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            {t("join.successTitle")}
          </h1>
          <p className="text-sm text-muted-foreground mb-2">
            {t("join.successDesc")}
          </p>
          {classInfo && (
            <p className="text-xs text-warm font-medium mb-6">
              {classInfo.className} · {classInfo.school}
            </p>
          )}
          <Link href="/app/student" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90">
            {t("join.goToJourney")} <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  // Form state
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl border border-border/60 p-8 max-w-md w-full"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              Be<span className="text-warm">Reading</span>
            </h1>
            <p className="text-xs text-muted-foreground">{t("join.title")}</p>
          </div>
        </div>

        {/* Class info card */}
        {classInfo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-primary/5 via-warm/5 to-gold/5 rounded-xl p-4 mb-6 border border-border/40"
          >
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">{t("join.classInfo")}</p>
            <h2 className="text-base font-semibold mb-2">{classInfo.className}</h2>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{t("join.teacher")}: {classInfo.teacher}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t("join.currentBook")}: {classInfo.activeBook}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                <span>{classInfo.studentCount} {t("join.studentsEnrolled")}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Invite code display */}
        <div className="bg-secondary/50 rounded-xl p-3 mb-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground">{t("join.inviteCode")}</p>
            <p className="text-sm font-mono font-bold">{code}</p>
          </div>
          <CheckCircle2 className="w-4 h-4 text-success" />
        </div>

        {/* Form */}
        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">{t("join.fullName")}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder={t("join.namePlaceholder")}
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">{t("join.email")}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/60 bg-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder={t("join.emailPlaceholder")}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">{t("join.emailHint")}</p>
          </div>

          <button
            type="submit"
            disabled={!email || !name || pageState === "joining"}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {pageState === "joining" ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> {t("join.joining")}</>
            ) : (
              <>{t("join.submit")} <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        <div className="flex items-center gap-2 mt-4 text-[10px] text-muted-foreground">
          <Shield className="w-3 h-3" />
          <span>{t("join.securityNote")}</span>
        </div>
      </motion.div>
    </div>
  );
}
