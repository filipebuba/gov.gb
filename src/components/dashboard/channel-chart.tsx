'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

interface ChannelChartProps {
  data: { channel: string; count: number }[];
}

const CHANNEL_COLORS: Record<string, string> = {
  agent: '#10b981',
  ussd: '#f59e0b',
  web: '#3b82f6',
  sms: '#8b5cf6',
  voice: '#ef4444',
};

const FALLBACK_COLOR = '#6b7280';

export function ChannelChart({ data }: ChannelChartProps) {
  const { t } = useTranslation();

  function CustomTooltip({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: { value: number; payload: { channel: string } }[];
    label?: string;
  }) {
    if (!active || !payload?.length) return null;

    return (
      <div className="rounded-lg border bg-card px-3 py-2 shadow-md">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-sm font-bold text-foreground">
          {payload[0].value} {t.dashboard.requests}
        </p>
      </div>
    );
  }

  // Sort by count descending for the horizontal bar chart
  const sorted = [...data].sort((a, b) => b.count - a.count);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t.dashboard.channelChart}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sorted}
              layout="vertical"
              margin={{ top: 0, right: 24, left: 0, bottom: 0 }}
            >
              <XAxis
                type="number"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                stroke="var(--color-muted-foreground)"
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="channel"
                tick={{ fontSize: 13, fontWeight: 500 }}
                tickLine={false}
                axisLine={false}
                stroke="var(--color-muted-foreground)"
                width={56}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-muted)', opacity: 0.4 }} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={28}>
                {sorted.map((entry) => (
                  <Cell
                    key={entry.channel}
                    fill={CHANNEL_COLORS[entry.channel] ?? FALLBACK_COLOR}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
