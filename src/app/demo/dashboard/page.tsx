'use client';

import { getDemoStats } from '@/lib/demo-data';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { RegistrationChart } from '@/components/dashboard/registration-chart';
import { RegionMap } from '@/components/dashboard/region-map';
import { ChannelChart } from '@/components/dashboard/channel-chart';
import { TopServices } from '@/components/dashboard/top-services';
import { useTranslation } from '@/hooks/use-translation';

const stats = getDemoStats();

export default function DashboardDemoPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t.dashboard.title}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t.dashboard.demoSubtitle}
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Charts Row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <RegistrationChart data={stats.registrationsByDay} />
        <RegionMap data={stats.citizensByRegion} />
      </div>

      {/* Bottom Row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChannelChart data={stats.requestsByChannel} />
        <TopServices data={stats.topServices} />
      </div>
    </div>
  );
}
