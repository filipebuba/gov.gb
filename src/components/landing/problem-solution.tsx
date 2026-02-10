"use client";

import {
  AlertTriangle,
  XCircle,
  Clock,
  Ban,
  CheckCircle2,
  Fingerprint,
  Smartphone,
  BarChart3,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export function ProblemSolution() {
  const { t } = useTranslation();

  const challenges = [
    {
      icon: <XCircle className="size-5 text-gov-red" />,
      text: t.landing.challenge1,
    },
    {
      icon: <Ban className="size-5 text-gov-red" />,
      text: t.landing.challenge2,
    },
    {
      icon: <Clock className="size-5 text-gov-red" />,
      text: t.landing.challenge3,
    },
    {
      icon: <AlertTriangle className="size-5 text-gov-red" />,
      text: t.landing.challenge4,
    },
  ];

  const solutions = [
    {
      icon: <Fingerprint className="size-5 text-primary" />,
      text: t.landing.solution1,
    },
    {
      icon: <Smartphone className="size-5 text-primary" />,
      text: t.landing.solution2,
    },
    {
      icon: <BarChart3 className="size-5 text-primary" />,
      text: t.landing.solution3,
    },
    {
      icon: <CheckCircle2 className="size-5 text-primary" />,
      text: t.landing.solution4,
    },
  ];

  return (
    <section id="problem-solution" className="relative py-20 sm:py-28">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 text-center sm:mb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t.landing.challengeAndResponse}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.landing.fromProblemToSolution}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* The Challenge */}
          <div className="relative">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gov-red/10">
                <AlertTriangle className="size-5 text-gov-red" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                  {t.landing.problemTitle}
                </h3>
                <div className="mt-0.5 h-0.5 w-12 rounded-full bg-gov-red" />
              </div>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t.landing.challengeDesc}
            </p>

            <ul className="space-y-4">
              {challenges.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-gov-red/10 bg-gov-red/[0.03] p-4 transition-colors hover:bg-gov-red/[0.06]"
                >
                  <span className="mt-0.5 shrink-0">{item.icon}</span>
                  <span className="text-sm leading-relaxed text-foreground/80">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* The Solution */}
          <div className="relative">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <CheckCircle2 className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                  {t.landing.solutionTitle}
                </h3>
                <div className="mt-0.5 h-0.5 w-12 rounded-full bg-primary" />
              </div>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t.landing.solutionDesc}
            </p>

            <ul className="space-y-4">
              {solutions.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-primary/10 bg-primary/[0.03] p-4 transition-colors hover:bg-primary/[0.06]"
                >
                  <span className="mt-0.5 shrink-0">{item.icon}</span>
                  <span className="text-sm leading-relaxed text-foreground/80">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
