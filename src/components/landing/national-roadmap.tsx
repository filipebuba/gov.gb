"use client";

import { useTranslation } from "@/hooks/use-translation";
import { Badge } from "@/components/ui/badge";

type PhaseStatus = "completed" | "in-progress" | "planned";

interface Phase {
  title: string;
  description: string;
  period: string;
  status: PhaseStatus;
  statusLabel: string;
  items: string[];
}

const statusStyles: Record<PhaseStatus, { dot: string; badge: string }> = {
  completed: {
    dot: "bg-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
  },
  "in-progress": {
    dot: "bg-gov-yellow",
    badge: "bg-gov-yellow/10 text-gov-yellow border-gov-yellow/20",
  },
  planned: {
    dot: "bg-muted-foreground/40",
    badge: "bg-muted text-muted-foreground border-border",
  },
};

export function NationalRoadmap() {
  const { t } = useTranslation();

  const phases: Phase[] = [
    {
      title: t.landing.roadmapPhase1,
      description: t.landing.roadmapPhase1Desc,
      period: "Q1–Q2 2025",
      status: "completed",
      statusLabel: t.landing.roadmapCompleted,
      items: [
        t.landing.roadmapPhase1Item1,
        t.landing.roadmapPhase1Item2,
        t.landing.roadmapPhase1Item3,
      ],
    },
    {
      title: t.landing.roadmapPhase2,
      description: t.landing.roadmapPhase2Desc,
      period: "Q3–Q4 2025",
      status: "in-progress",
      statusLabel: t.landing.roadmapInProgress,
      items: [
        t.landing.roadmapPhase2Item1,
        t.landing.roadmapPhase2Item2,
        t.landing.roadmapPhase2Item3,
      ],
    },
    {
      title: t.landing.roadmapPhase3,
      description: t.landing.roadmapPhase3Desc,
      period: "2026",
      status: "planned",
      statusLabel: t.landing.roadmapPlanned,
      items: [
        t.landing.roadmapPhase3Item1,
        t.landing.roadmapPhase3Item2,
        t.landing.roadmapPhase3Item3,
      ],
    },
    {
      title: t.landing.roadmapPhase4,
      description: t.landing.roadmapPhase4Desc,
      period: "2027",
      status: "planned",
      statusLabel: t.landing.roadmapPlanned,
      items: [
        t.landing.roadmapPhase4Item1,
        t.landing.roadmapPhase4Item2,
        t.landing.roadmapPhase4Item3,
      ],
    },
  ];

  return (
    <section id="roadmap" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 text-center sm:mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t.landing.roadmapLabel}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.landing.roadmapTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {t.landing.roadmapDescription}
          </p>
          <p className="mt-2 text-xs text-muted-foreground/60">
            {t.landing.roadmapLastUpdated}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border sm:left-6" />

          <div className="space-y-10">
            {phases.map((phase, index) => {
              const styles = statusStyles[phase.status];
              return (
                <div key={index} className="relative pl-12 sm:pl-16">
                  {/* Status dot */}
                  <div
                    className={`absolute left-2.5 top-1 size-3 rounded-full border-2 border-background ${styles.dot} sm:left-4.5`}
                  />

                  {/* Phase card */}
                  <div className="rounded-xl border border-border/60 bg-card p-5 sm:p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-foreground sm:text-lg">
                        {phase.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-semibold uppercase tracking-wider ${styles.badge}`}
                      >
                        {phase.statusLabel}
                      </Badge>
                    </div>

                    <p className="mb-1 text-xs font-medium text-muted-foreground/60">
                      {phase.period}
                    </p>

                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {phase.description}
                    </p>

                    <ul className="space-y-1.5">
                      {phase.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-foreground/70"
                        >
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/30" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
