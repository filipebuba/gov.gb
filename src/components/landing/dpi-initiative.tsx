"use client";

import {
  Landmark,
  Network,
  GitBranch,
  Shield,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface Pillar {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function DpiInitiative() {
  const { t } = useTranslation();

  const pillars: Pillar[] = [
    {
      icon: <Landmark className="size-5" />,
      title: t.landing.dpiMandate,
      description: t.landing.dpiMandateDesc,
    },
    {
      icon: <Network className="size-5" />,
      title: t.landing.dpiArchitecture,
      description: t.landing.dpiArchitectureDesc,
    },
    {
      icon: <GitBranch className="size-5" />,
      title: t.landing.dpiOpenSource,
      description: t.landing.dpiOpenSourceDesc,
    },
    {
      icon: <Shield className="size-5" />,
      title: t.landing.dpiGovernance,
      description: t.landing.dpiGovernanceDesc,
    },
  ];

  return (
    <section id="initiative" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 text-center sm:mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t.landing.dpiLabel}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.landing.dpiTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {t.landing.dpiDescription}
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl border border-border/60 bg-card p-6 sm:p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border/60 bg-muted/50 text-foreground">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
