"use client";

import Link from "next/link";
import { Fingerprint, Smartphone, BarChart3, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";

interface MvpModule {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

export function LiveMvp() {
  const { t } = useTranslation();

  const modules: MvpModule[] = [
    {
      icon: <Fingerprint className="size-6" />,
      title: t.landing.liveMvpCódigo,
      description: t.landing.liveMvpCódigoDesc,
      href: "/demo/simenti",
    },
    {
      icon: <Smartphone className="size-6" />,
      title: t.landing.liveMvpUssd,
      description: t.landing.liveMvpUssdDesc,
      href: "/demo/ussd",
    },
    {
      icon: <BarChart3 className="size-6" />,
      title: t.landing.liveMvpDashboard,
      description: t.landing.liveMvpDashboardDesc,
      href: "/demo/dashboard",
    },
  ];

  return (
    <section id="live-mvp" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 text-center sm:mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t.landing.liveMvpLabel}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.landing.liveMvpTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {t.landing.liveMvpDescription}
          </p>
        </div>

        {/* Module cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {modules.map((mod) => (
            <Card
              key={mod.title}
              className="group border-border/60 py-0 transition-colors hover:border-border"
            >
              <CardContent className="flex flex-col p-6 sm:p-8">
                {/* Icon and status */}
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl border border-border/60 bg-muted/50 text-foreground">
                    {mod.icon}
                  </div>
                  <Badge
                    variant="outline"
                    className="border-primary/20 bg-primary/10 text-[10px] font-semibold uppercase tracking-wider text-primary"
                  >
                    {t.landing.liveMvpStatus}
                  </Badge>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground">
                  {mod.title}
                </h3>

                {/* Description */}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {mod.description}
                </p>

                {/* CTA */}
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="mt-6 w-full justify-center gap-1.5 border-border/60"
                >
                  <Link href={mod.href}>
                    {t.landing.liveMvpTryIt}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
