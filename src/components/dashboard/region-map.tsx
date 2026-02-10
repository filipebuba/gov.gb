'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

interface RegionMapProps {
  data: { region: string; count: number }[];
}

/**
 * Simplified SVG paths representing Guinea-Bissau's 9 regions.
 * Positioned to approximate the real geography:
 *   - Coastal regions on the west, inland regions to the east
 *   - Bolama-Bijagos as islands to the southwest
 *   - Bissau and Biombo are small regions on the central-west coast
 */
const REGION_PATHS: { name: string; path: string; labelX: number; labelY: number }[] = [
  {
    name: 'Cacheu',
    path: 'M 60,30 L 120,25 L 140,45 L 135,70 L 100,75 L 70,65 L 50,55 Z',
    labelX: 95,
    labelY: 50,
  },
  {
    name: 'Oio',
    path: 'M 120,25 L 190,20 L 210,40 L 200,70 L 170,80 L 135,70 L 140,45 Z',
    labelX: 165,
    labelY: 50,
  },
  {
    name: 'Bafata',
    path: 'M 190,20 L 270,15 L 290,40 L 280,80 L 240,90 L 200,70 L 210,40 Z',
    labelX: 240,
    labelY: 50,
  },
  {
    name: 'Biombo',
    path: 'M 70,65 L 100,75 L 105,100 L 85,110 L 60,100 L 55,80 Z',
    labelX: 80,
    labelY: 90,
  },
  {
    name: 'Bissau',
    path: 'M 100,75 L 135,70 L 140,95 L 130,110 L 105,100 Z',
    labelX: 118,
    labelY: 92,
  },
  {
    name: 'Gabu',
    path: 'M 270,15 L 360,20 L 370,70 L 355,120 L 300,130 L 280,80 L 290,40 Z',
    labelX: 320,
    labelY: 70,
  },
  {
    name: 'Quinara',
    path: 'M 105,100 L 130,110 L 140,95 L 170,80 L 200,70 L 240,90 L 230,130 L 190,150 L 140,145 L 110,130 Z',
    labelX: 168,
    labelY: 118,
  },
  {
    name: 'Tombali',
    path: 'M 110,130 L 140,145 L 190,150 L 230,130 L 240,90 L 280,80 L 300,130 L 280,170 L 220,185 L 150,180 L 100,160 Z',
    labelX: 195,
    labelY: 160,
  },
  {
    name: 'Bolama-Bijagos',
    path: 'M 20,115 L 50,108 L 60,100 L 55,80 L 45,90 L 30,95 Z M 15,130 L 45,125 L 50,140 L 35,148 Z M 10,155 L 35,152 L 38,165 L 18,168 Z',
    labelX: 35,
    labelY: 130,
  },
];

/** Map region display names (with diacritics) to SVG path names (without diacritics). */
function normalizeRegion(region: string): string {
  return region
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z-]/g, '');
}

/** Interpolate from light green to dark green based on a 0-1 value. */
function getRegionColor(ratio: number): string {
  // Light: hsl(145, 40%, 88%) => Dark: hsl(155, 60%, 30%)
  const h = 145 + ratio * 10;
  const s = 40 + ratio * 20;
  const l = 88 - ratio * 58;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function getRegionTextColor(ratio: number): string {
  return ratio > 0.45 ? '#fff' : '#1a3a2a';
}

const LEGEND_STEPS = 5;

export function RegionMap({ data }: RegionMapProps) {
  const { t } = useTranslation();
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const maxCount = useMemo(
    () => Math.max(...data.map((d) => d.count), 1),
    [data]
  );

  const regionLookup = useMemo(() => {
    const map = new Map<string, number>();
    data.forEach((d) => {
      map.set(normalizeRegion(d.region), d.count);
    });
    return map;
  }, [data]);

  function getCount(svgName: string): number {
    return regionLookup.get(normalizeRegion(svgName)) ?? 0;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t.dashboard.regionMap}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
          {/* SVG Map */}
          <div className="flex-1">
            <svg
              viewBox="0 0 390 200"
              className="w-full"
              role="img"
              aria-label={t.dashboard.mapAria}
            >
              {/* Water background */}
              <rect
                x="0"
                y="0"
                width="390"
                height="200"
                fill="hsl(205, 45%, 94%)"
                rx="8"
              />

              {/* Region shapes */}
              {REGION_PATHS.map((region) => {
                const count = getCount(region.name);
                const ratio = count / maxCount;
                const isHovered = hoveredRegion === region.name;

                return (
                  <g
                    key={region.name}
                    onMouseEnter={() => setHoveredRegion(region.name)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className="cursor-pointer"
                  >
                    <path
                      d={region.path}
                      fill={getRegionColor(ratio)}
                      stroke={isHovered ? '#065f46' : '#94a3b8'}
                      strokeWidth={isHovered ? 2 : 0.8}
                      className="transition-all duration-200"
                    />
                    <text
                      x={region.labelX}
                      y={region.labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={getRegionTextColor(ratio)}
                      fontSize={region.name === 'Bolama-Bijagos' ? 7 : 8}
                      fontWeight={isHovered ? 700 : 500}
                      className="pointer-events-none select-none"
                    >
                      {region.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hover tooltip */}
            {hoveredRegion && (
              <div className="mt-2 text-center text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {hoveredRegion}
                </span>
                {' -- '}
                {getCount(hoveredRegion).toLocaleString('pt-GW')} {t.dashboard.registeredCitizens}
              </div>
            )}
            {!hoveredRegion && (
              <div className="mt-2 text-center text-sm text-muted-foreground">
                {t.dashboard.hoverRegion}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex flex-row items-center gap-3 lg:flex-col lg:items-start lg:gap-1.5 lg:pt-2">
            <p className="text-xs font-medium text-muted-foreground">
              {t.dashboard.citizensLabel}
            </p>
            <div className="flex items-center gap-1.5 lg:flex-col lg:items-start">
              {Array.from({ length: LEGEND_STEPS }).map((_, i) => {
                const ratio = i / (LEGEND_STEPS - 1);
                const value = Math.round(maxCount * ratio);
                return (
                  <div
                    key={i}
                    className="flex items-center gap-1.5"
                  >
                    <div
                      className="size-3.5 rounded-sm border border-border/60"
                      style={{ backgroundColor: getRegionColor(ratio) }}
                    />
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
