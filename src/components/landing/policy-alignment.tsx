"use client";

import { useTranslation } from "@/hooks/use-translation";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PolicyStatus = "Implemented" | "In Development" | "Planned";

interface PolicyRow {
  strategy: string;
  requirement: string;
  module: string;
  status: PolicyStatus;
}

const statusBadgeStyles: Record<PolicyStatus, string> = {
  Implemented: "bg-primary/10 text-primary border-primary/20",
  "In Development": "bg-gov-yellow/10 text-gov-yellow border-gov-yellow/20",
  Planned: "bg-muted text-muted-foreground border-border",
};

export function PolicyAlignment() {
  const { t } = useTranslation();

  const rows: PolicyRow[] = [
    {
      strategy: t.landing.policyRow1Strategy,
      requirement: t.landing.policyRow1Requirement,
      module: t.landing.policyRow1Module,
      status: "Implemented" as PolicyStatus,
    },
    {
      strategy: t.landing.policyRow2Strategy,
      requirement: t.landing.policyRow2Requirement,
      module: t.landing.policyRow2Module,
      status: "Implemented" as PolicyStatus,
    },
    {
      strategy: t.landing.policyRow3Strategy,
      requirement: t.landing.policyRow3Requirement,
      module: t.landing.policyRow3Module,
      status: "In Development" as PolicyStatus,
    },
    {
      strategy: t.landing.policyRow4Strategy,
      requirement: t.landing.policyRow4Requirement,
      module: t.landing.policyRow4Module,
      status: "In Development" as PolicyStatus,
    },
    {
      strategy: t.landing.policyRow5Strategy,
      requirement: t.landing.policyRow5Requirement,
      module: t.landing.policyRow5Module,
      status: "Implemented" as PolicyStatus,
    },
    {
      strategy: t.landing.policyRow6Strategy,
      requirement: t.landing.policyRow6Requirement,
      module: t.landing.policyRow6Module,
      status: "In Development" as PolicyStatus,
    },
    {
      strategy: t.landing.policyRow7Strategy,
      requirement: t.landing.policyRow7Requirement,
      module: t.landing.policyRow7Module,
      status: "Planned" as PolicyStatus,
    },
    {
      strategy: t.landing.policyRow8Strategy,
      requirement: t.landing.policyRow8Requirement,
      module: t.landing.policyRow8Module,
      status: "Planned" as PolicyStatus,
    },
  ];

  return (
    <section id="policy" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 text-center sm:mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t.landing.policyLabel}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.landing.policyTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {t.landing.policyDescription}
          </p>
        </div>

        {/* Policy table */}
        <div className="rounded-xl border border-border/60 bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:px-6">
                  {t.landing.policyStrategy}
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:px-6">
                  {t.landing.policyRequirement}
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:px-6">
                  {t.landing.policyModule}
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:px-6">
                  {t.landing.policyStatus}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  className={`border-border/40 ${index % 2 === 0 ? "bg-muted/20" : ""}`}
                >
                  <TableCell className="px-4 py-3 text-sm font-medium text-foreground sm:px-6">
                    {row.strategy}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-muted-foreground sm:px-6">
                    {row.requirement}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-foreground/80 sm:px-6">
                    {row.module}
                  </TableCell>
                  <TableCell className="px-4 py-3 sm:px-6">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-semibold ${statusBadgeStyles[row.status]}`}
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
