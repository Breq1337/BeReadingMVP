"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Compass, Trophy, User, BarChart3, Users, Home, Settings, GraduationCap, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/locale-context";
import { LanguageToggle } from "@/components/landing/language-toggle";

type Role = "student" | "teacher" | "family" | "admin";

interface SidebarNavProps {
  role: Role;
}

export function SidebarNav({ role }: SidebarNavProps) {
  const pathname = usePathname();
  const { t } = useLocale();

  const navConfig: Record<Role, { label: string; icon: typeof BookOpen; href: string }[]> = {
    student: [
      { label: t("sidebar.journey"), icon: Compass, href: "/app/student" },
      { label: t("sidebar.myBooks"), icon: BookOpen, href: "/app/student/books" },
      { label: t("sidebar.missions"), icon: Trophy, href: "/app/student/missions" },
      { label: t("sidebar.profile"), icon: User, href: "/app/student/profile" },
    ],
    teacher: [
      { label: t("sidebar.dashboard"), icon: BarChart3, href: "/app/teacher" },
      { label: t("sidebar.classes"), icon: Users, href: "/app/teacher/classes" },
      { label: t("sidebar.missions"), icon: Trophy, href: "/app/teacher/missions" },
      { label: t("sidebar.library"), icon: BookOpen, href: "/app/teacher/library" },
    ],
    family: [
      { label: t("sidebar.overview"), icon: Home, href: "/app/family" },
      { label: t("sidebar.activity"), icon: BookOpen, href: "/app/family/activity" },
    ],
    admin: [
      { label: t("sidebar.overview"), icon: Shield, href: "/app/admin" },
      { label: t("sidebar.classes"), icon: GraduationCap, href: "/app/admin/classes" },
      { label: t("sidebar.settings"), icon: Settings, href: "/app/admin/settings" },
    ],
  };

  const portalLabels: Record<Role, string> = {
    student: t("sidebar.studentPortal"),
    teacher: t("sidebar.teacherPortal"),
    family: t("sidebar.familyPortal"),
    admin: t("sidebar.adminPortal"),
  };

  const roleLabels: Record<Role, string> = {
    student: t("sidebar.student"),
    teacher: t("sidebar.teacher"),
    family: t("sidebar.family"),
    admin: t("sidebar.admin"),
  };

  const items = navConfig[role];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-border/60 bg-sidebar min-h-screen">
      <div className="p-6 border-b border-border/60">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">
            Be<span className="text-warm">Reading</span>
          </span>
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{portalLabels[role]}</span>
          <LanguageToggle />
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== `/app/${role}` && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/60">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 px-2">
          {t("sidebar.switchRole")}
        </p>
        <div className="space-y-1">
          {(["student", "teacher", "family", "admin"] as Role[]).map((r) => (
            <Link
              key={r}
              href={`/app/${r}`}
              className={cn(
                "block px-3 py-1.5 rounded-lg text-xs transition-colors",
                role === r ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {roleLabels[r]}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
