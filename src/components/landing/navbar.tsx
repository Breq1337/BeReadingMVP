"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Menu, X } from "lucide-react";
import { useLocale } from "@/lib/locale-context";
import { LanguageToggle } from "./language-toggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  const navLinks = [
    { href: "#features", label: t("nav.features") },
    { href: "#how-it-works", label: t("nav.howItWorks") },
    { href: "#for-schools", label: t("nav.forSchools") },
    { href: "#pricing", label: t("nav.pricing") },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
    >
      <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight">
            Be<span className="text-warm">Reading</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          <Link
            href="/app"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
          >
            {t("nav.login")}
          </Link>
          <Link
            href="/app"
            className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            {t("nav.cta")}
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-border/50 glass"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-base text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border/50 space-y-3">
                <LanguageToggle />
                <Link href="/app" className="block text-center text-sm font-medium py-2.5">
                  {t("nav.login")}
                </Link>
                <Link
                  href="/app"
                  className="block text-center text-sm font-medium bg-primary text-primary-foreground py-2.5 rounded-xl"
                >
                  {t("nav.cta")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
