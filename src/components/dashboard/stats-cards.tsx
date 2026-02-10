'use client';

import { Users, FileText, UserCheck, ClipboardList } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { DashboardStats } from '@/types';
import { useTranslation } from '@/hooks/use-translation';

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const { t } = useTranslation();

  const cards = [
    {
      key: 'totalCitizens' as const,
      label: t.dashboard.totalCitizens,
      icon: Users,
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      accentColor: 'border-l-emerald-500',
    },
    {
      key: 'totalServices' as const,
      label: t.dashboard.totalServices,
      icon: FileText,
      bgColor: 'bg-blue-50 dark:bg-blue-950/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      accentColor: 'border-l-blue-500',
    },
    {
      key: 'totalAgents' as const,
      label: t.dashboard.activeAgents,
      icon: UserCheck,
      bgColor: 'bg-amber-50 dark:bg-amber-950/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
      accentColor: 'border-l-amber-500',
    },
    {
      key: 'totalRequests' as const,
      label: t.dashboard.totalRequests,
      icon: ClipboardList,
      bgColor: 'bg-purple-50 dark:bg-purple-950/40',
      iconColor: 'text-purple-600 dark:text-purple-400',
      accentColor: 'border-l-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const value = stats[card.key];

        return (
          <Card
            key={card.key}
            className={`border-l-4 ${card.accentColor} py-0 transition-shadow hover:shadow-md`}
          >
            <CardContent className="flex items-center gap-4 px-5 py-5">
              <div
                className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${card.bgColor}`}
              >
                <Icon className={`size-6 ${card.iconColor}`} />
              </div>
              <div className="min-w-0">
                <p className="text-3xl font-bold tracking-tight text-foreground">
                  {value.toLocaleString('pt-GW')}
                </p>
                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                  {card.label}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
