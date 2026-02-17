"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Wifi, Globe2, FileX2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface StatItem {
  value: string;
  suffix?: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}

function AnimatedValue({
  value,
  suffix,
  inView,
}: {
  value: string;
  suffix?: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;

    // Extract the numeric part
    const cleanValue = value.replace(/[^0-9.]/g, "");
    const target = parseFloat(cleanValue);
    const prefix = value.startsWith("~") ? "~" : "";
    const hasDecimal = cleanValue.includes(".");

    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (step >= steps) {
        setDisplay(prefix + cleanValue);
        clearInterval(timer);
      } else {
        const formatted = hasDecimal
          ? current.toFixed(1)
          : Math.round(current).toString();
        setDisplay(prefix + formatted);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>
      {display}
      {suffix && <span className="text-2xl sm:text-3xl">{suffix}</span>}
    </span>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const { t } = useTranslation();

  const stats: StatItem[] = [
    {
      value: "2.2",
      suffix: "M",
      label: t.landing.statsPopulation,
      description: t.landing.statsPopulationDesc,
      icon: <Users className="size-5" />,
      color: "text-primary",
    },
    {
      value: "32",
      suffix: "%",
      label: t.landing.statsInternet,
      description: t.landing.statsInternetDesc,
      icon: <Wifi className="size-5" />,
      color: "text-gov-yellow",
    },
    {
      value: "170",
      suffix: "/193",
      label: t.landing.statsUnRank,
      description: t.landing.statsUnRankDesc,
      icon: <Globe2 className="size-5" />,
      color: "text-gov-red",
    },
    {
      value: "~500",
      suffix: "K",
      label: t.landing.statsNoId,
      description: t.landing.statsNoIdDesc,
      icon: <FileX2 className="size-5" />,
      color: "text-muted-foreground",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t.landing.statsContext}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.landing.statsHeading}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
            {t.landing.statsSubheading}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => (
            <Card
              key={stat.label}
              className="group relative overflow-hidden border-transparent bg-gradient-to-b from-card to-muted/30 py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                animationDelay: `${i * 100}ms`,
              }}
            >
              <CardContent className="flex flex-col items-center px-6 py-8 text-center">
                <div
                  className={`mb-4 flex size-11 items-center justify-center rounded-xl bg-muted/80 ${stat.color} transition-transform group-hover:scale-110`}
                >
                  {stat.icon}
                </div>
                <div className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                  <AnimatedValue
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {stat.label}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
