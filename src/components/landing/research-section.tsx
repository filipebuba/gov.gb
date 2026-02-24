"use client";

import { useTranslation } from "@/hooks/use-translation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, BarChart2, ClipboardCheck } from "lucide-react";

interface ResearchEntry {
  title: string;
  description: string;
  date: string;
  type: string;
}

interface ResearchCategory {
  label: string;
  icon: React.ReactNode;
  entries: ResearchEntry[];
}

export function ResearchSection() {
  const { t } = useTranslation();

  const categories: ResearchCategory[] = [
    {
      label: t.landing.researchBaseline,
      icon: <BarChart2 className="size-4" />,
      entries: [
        {
          title: t.landing.researchEntry1Title,
          description: t.landing.researchEntry1Desc,
          date: t.landing.researchEntry1Date,
          type: t.landing.researchEntry1Type,
        },
        {
          title: t.landing.researchEntry2Title,
          description: t.landing.researchEntry2Desc,
          date: t.landing.researchEntry2Date,
          type: t.landing.researchEntry2Type,
        },
      ],
    },
    {
      label: t.landing.researchTechnical,
      icon: <FileText className="size-4" />,
      entries: [
        {
          title: t.landing.researchEntry3Title,
          description: t.landing.researchEntry3Desc,
          date: t.landing.researchEntry3Date,
          type: t.landing.researchEntry3Type,
        },
        {
          title: t.landing.researchEntry4Title,
          description: t.landing.researchEntry4Desc,
          date: t.landing.researchEntry4Date,
          type: t.landing.researchEntry4Type,
        },
      ],
    },
    {
      label: t.landing.researchMonitoring,
      icon: <ClipboardCheck className="size-4" />,
      entries: [
        {
          title: t.landing.researchEntry5Title,
          description: t.landing.researchEntry5Desc,
          date: t.landing.researchEntry5Date,
          type: t.landing.researchEntry5Type,
        },
        {
          title: t.landing.researchEntry6Title,
          description: t.landing.researchEntry6Desc,
          date: t.landing.researchEntry6Date,
          type: t.landing.researchEntry6Type,
        },
      ],
    },
  ];

  return (
    <section id="research" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 text-center sm:mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t.landing.researchLabel}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.landing.researchTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {t.landing.researchDescription}
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {categories.map((category) => (
            <div key={category.label}>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-md border border-border/60 bg-muted/50 text-muted-foreground">
                  {category.icon}
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  {category.label}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                {category.entries.map((entry) => (
                  <Card
                    key={entry.title}
                    className="border-border/60 py-0 transition-colors hover:border-border"
                  >
                    <CardContent className="p-5 sm:p-6">
                      <div className="mb-3 flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className="text-[10px] font-semibold uppercase tracking-wider"
                        >
                          {entry.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground/60">
                          {entry.date}
                        </span>
                      </div>
                      <h4 className="mb-2 text-sm font-bold text-foreground">
                        {entry.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {entry.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
