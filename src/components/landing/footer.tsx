"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Heart, ExternalLink } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="relative border-t border-border/60">
      {/* Flag stripe */}
      <div className="flag-stripe" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Main message */}
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Image
              src="/favicon.svg"
              alt="GOV-GB"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-lg font-bold text-foreground">GOV-GB</span>
          </div>

          <p className="mx-auto max-w-md text-base font-medium leading-relaxed text-foreground sm:text-lg">
            {t.landing.footerBuiltWith}{" "}
            <span className="text-primary">Open-source.</span>
            <br />
            {t.landing.footerForGb}
          </p>

          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            {t.landing.footerAlignedWith}{" "}
            <span className="font-medium text-foreground/70">UNDP</span>,{" "}
            <span className="font-medium text-foreground/70">World Bank</span>,
            e{" "}
            <span className="font-medium text-foreground/70">UNU-EGOV</span>.
          </p>
        </div>

        {/* Links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/demo"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
          >
            {t.common.tryDemo}
            <ExternalLink className="size-3.5" />
          </Link>

          <a
            href="https://github.com/nicfrfrfr/gov.gb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Github className="size-4" />
            GitHub
          </a>
        </div>

        {/* Divider */}
        <div className="mx-auto mt-10 max-w-xs border-t border-border/40" />

        {/* Bottom */}
        <div className="mt-6 flex flex-col items-center gap-2 text-center">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            {t.landing.footerMadeWith}
            <Heart className="size-3 fill-gov-red text-gov-red" />
            {t.landing.footerForGb2}
          </p>
          <p className="text-xs text-muted-foreground/60">
            &copy; {year} GOV-GB. {t.landing.footerLicense}
          </p>
        </div>
      </div>
    </footer>
  );
}
