"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Compass, Trophy, User, BarChart3, Users, Home, Shield, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/locale-context";

type Role = "student" | "teacher" | "family" | "admin";

export function MobileNav({ role }: { role: Role }) {
  const pathname = usePathname();
  const { t } = useLocale();

  const mobileNav: Record<Role, { label: string; icon: typeof BookOpen; href: string }[]> = {
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
    ],
  };

  const items = mobileNav[role];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/60">
      <div className="flex items-center justify-around py-2 px-2">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== `/app/${role}` && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors min-w-[60px]",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
