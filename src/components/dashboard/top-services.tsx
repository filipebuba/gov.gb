'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

interface TopServicesProps {
  data: { name: string; count: number }[];
}

const BAR_COLORS = [
  'bg-emerald-500',
  'bg-blue-500',
  'bg-amber-500',
  'bg-purple-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-orange-500',
  'bg-indigo-500',
];

export function TopServices({ data }: TopServicesProps) {
  const { t } = useTranslation();

  const sorted = useMemo(
    () => [...data].sort((a, b) => b.count - a.count),
    [data]
  );

  const maxCount = useMemo(
    () => Math.max(...sorted.map((s) => s.count), 1),
    [sorted]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t.dashboard.topServices}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {sorted.map((service, index) => {
            const percentage = (service.count / maxCount) * 100;
            const barColor = BAR_COLORS[index % BAR_COLORS.length];

            return (
              <div key={service.name} className="flex items-center gap-3">
                {/* Rank */}
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                  {index + 1}
                </span>

                {/* Name + Bar */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex items-baseline justify-between gap-2">
                    <p className="truncate text-sm font-medium text-foreground">
                      {service.name}
                    </p>
                    <span className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
                      {service.count}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {sorted.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              {t.dashboard.noDataAvailable}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
