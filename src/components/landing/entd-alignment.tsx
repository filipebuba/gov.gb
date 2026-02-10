"use client";

import {
  CheckCircle2,
  Monitor,
  TrendingUp,
  Users,
  Radio,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface Axis {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

export function EntdAlignment() {
  const { t } = useTranslation();

  const axes: Axis[] = [
    {
      icon: <Monitor className="size-5" />,
      title: t.landing.axis1,
      description: t.landing.axis1Desc,
      items: [
        t.landing.axis1Item1,
        t.landing.axis1Item2,
        t.landing.axis1Item3,
      ],
    },
    {
      icon: <TrendingUp className="size-5" />,
      title: t.landing.axis2,
      description: t.landing.axis2Desc,
      items: [
        t.landing.axis2Item1,
        t.landing.axis2Item2,
        t.landing.axis2Item3,
      ],
    },
    {
      icon: <Users className="size-5" />,
      title: t.landing.axis3,
      description: t.landing.axis3Desc,
      items: [
        t.landing.axis3Item1,
        t.landing.axis3Item2,
        t.landing.axis3Item3,
      ],
    },
    {
      icon: <Radio className="size-5" />,
      title: t.landing.axis4,
      description: t.landing.axis4Desc,
      items: [
        t.landing.axis4Item1,
        t.landing.axis4Item2,
        t.landing.axis4Item3,
      ],
    },
  ];

  return (
    <section className="relative py-20 sm:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 text-center sm:mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t.landing.alignmentBadge}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.landing.alignmentSubtitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {t.landing.alignmentDescription}
          </p>
        </div>

        {/* Axes grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {axes.map((axis) => (
            <div
              key={axis.title}
              className="group rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg sm:p-8"
            >
              {/* Header */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  {axis.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {axis.title}
                  </h3>
                </div>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                {axis.description}
              </p>

              {/* Checklist */}
              <ul className="space-y-3">
                {axis.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 shrink-0 text-primary" />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 flex items-center justify-center sm:mt-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-5 py-2.5 text-xs font-medium text-muted-foreground shadow-sm sm:text-sm">
            <span className="flex size-2 rounded-full bg-primary animate-pulse" />
            {t.landing.referenceDoc}
          </div>
        </div>
      </div>
    </section>
  );
}
