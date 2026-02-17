"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import type { Locale } from "@/lib/i18n/dictionaries";

const languages = [
  { code: "PT", locale: "pt" as Locale, label: "Português" },
  { code: "EN", locale: "en" as Locale, label: "English" },
  { code: "KR", locale: "kr" as Locale, label: "Kriol" },
  { code: "FR", locale: "fr" as Locale, label: "Français" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, locale, setLocale } = useTranslation();

  return (
    <header className="fixed top-1 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="mt-2 flex items-center justify-between rounded-2xl border border-white/10 bg-white/80 px-5 py-3 shadow-lg shadow-black/5 backdrop-blur-xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/favicon.svg"
              alt="GOV-GB"
              width={36}
              height={36}
              className="h-9 w-9"
            />
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-foreground">
                GOV-GB
              </span>
              <span className="hidden text-[10px] leading-none text-muted-foreground sm:block">
                {t.common.govDigital}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            <div className="flex items-center gap-0.5 rounded-lg bg-muted/60 p-1">
              <Globe className="ml-1.5 size-3.5 text-muted-foreground" />
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLocale(lang.locale)}
                  className={`rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-white hover:text-foreground hover:shadow-sm first:ml-1 ${locale === lang.locale ? 'bg-white text-foreground shadow-sm' : ''}`}
                  title={lang.label}
                >
                  {lang.code}
                </button>
              ))}
            </div>

            <div className="mx-2 h-6 w-px bg-border" />

            <Button asChild size="sm" className="rounded-lg font-semibold">
              <Link href="/demo">{t.common.tryDemo}</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="mt-2 animate-in fade-in slide-in-from-top-2 rounded-2xl border border-white/10 bg-white/95 p-4 shadow-lg backdrop-blur-xl md:hidden">
            <div className="mb-3 flex items-center justify-center gap-1 rounded-lg bg-muted/60 p-1.5">
              <Globe className="mr-1 size-3.5 text-muted-foreground" />
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLocale(lang.locale)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-white hover:text-foreground hover:shadow-sm ${locale === lang.locale ? 'bg-white text-foreground shadow-sm' : ''}`}
                  title={lang.label}
                >
                  {lang.code}
                </button>
              ))}
            </div>
            <Button asChild size="lg" className="w-full rounded-lg font-semibold">
              <Link href="/demo">{t.common.tryDemo}</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
