"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-border/60 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">
                Be<span className="text-warm">Reading</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("footer.desc")}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">{t("footer.product")}</h4>
            <ul className="space-y-2.5">
              {[t("nav.features"), t("nav.howItWorks"), t("nav.pricing"), t("nav.forSchools")].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">{t("footer.company")}</h4>
            <ul className="space-y-2.5">
              {[t("footer.about"), t("footer.blog"), t("footer.careers"), t("footer.contact")].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-2.5">
              {[t("footer.privacy"), t("footer.terms"), t("footer.lgpd")].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} BeReading. {t("footer.rights")}
          </p>
          <p className="text-xs text-muted-foreground">{t("footer.madeIn")}</p>
        </div>
      </div>
    </footer>
  );
}
