'use client';

import { useState, useMemo } from 'react';
import { useCitizenStore } from '@/stores/citizen-store';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, MapPin, Users, Clock } from 'lucide-react';
import type { Citizen, Region } from '@/types';
import { REGIONS } from '@/types';
import { IdCard } from './id-card';
import { useTranslation } from '@/hooks/use-translation';

const ALL_REGIONS = 'all';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-GW', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function formatGenderShort(g: string): string {
  switch (g) {
    case 'M':
      return 'M';
    case 'F':
      return 'F';
    case 'O':
      return 'O';
    default:
      return g;
  }
}

interface CitizenListProps {
  onSelectCitizen?: (citizen: Citizen) => void;
}

export function CitizenList({ onSelectCitizen }: CitizenListProps = {}) {
  const citizens = useCitizenStore((s) => s.citizens);
  const pendingSync = useCitizenStore((s) => s.pendingSync);
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>(ALL_REGIONS);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = citizens;

    // Region filter
    if (regionFilter !== ALL_REGIONS) {
      result = result.filter((c) => c.region === regionFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.full_name.toLowerCase().includes(q) ||
          c.simenti_id.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q) ||
          (c.tabanca && c.tabanca.toLowerCase().includes(q))
      );
    }

    return result;
  }, [citizens, searchQuery, regionFilter]);

  const pendingCount = pendingSync.length;

  function handleToggleExpand(citizen: Citizen) {
    const isExpanding = expandedId !== citizen.id;
    setExpandedId((prev) => (prev === citizen.id ? null : citizen.id));
    if (isExpanding && onSelectCitizen) {
      onSelectCitizen(citizen);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Search and filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t.simenti.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={regionFilter} onValueChange={setRegionFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={t.simenti.allRegions} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_REGIONS}>{t.simenti.allRegions}</SelectItem>
            {REGIONS.map((r) => (
              <SelectItem key={r} value={r}>
                <MapPin className="mr-1 h-3 w-3" />
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 rounded-lg border bg-muted/50 px-4 py-2.5 text-sm">
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{t.simenti.total} {filtered.length}</span>
          {filtered.length !== citizens.length && (
            <span className="text-muted-foreground">/ {citizens.length}</span>
          )}
        </div>
        {pendingCount > 0 && (
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-amber-500" />
            <span className="text-amber-700">{t.simenti.pendingCount} {pendingCount}</span>
          </div>
        )}
      </div>

      {/* Citizens list */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground/40" />
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              {citizens.length === 0
                ? t.simenti.noCitizensRegistered
                : t.simenti.noResultsFound}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {citizens.length === 0
                ? t.simenti.registerFirst
                : t.simenti.adjustFilters}
            </p>
          </CardContent>
        </Card>
      ) : (
        <ScrollArea className="h-[520px]">
          <div className="space-y-2 pr-3">
            {filtered.map((citizen) => (
              <CitizenCard
                key={citizen.id}
                citizen={citizen}
                isExpanded={expandedId === citizen.id}
                isPending={pendingSync.some((p) => p.id === citizen.id)}
                onToggle={() => handleToggleExpand(citizen)}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

interface CitizenCardProps {
  citizen: Citizen;
  isExpanded: boolean;
  isPending: boolean;
  onToggle: () => void;
}

function CitizenCard({ citizen, isExpanded, isPending, onToggle }: CitizenCardProps) {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden rounded-lg border bg-card transition-all">
      {/* Compact row */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50"
      >
        {/* Avatar with initials */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-800">
          {citizen.full_name
            .split(/\s+/)
            .slice(0, 2)
            .map((w) => w[0]?.toUpperCase() ?? '')
            .join('')}
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-medium">{citizen.full_name}</p>
            {isPending && (
              <Badge variant="outline" className="shrink-0 border-amber-300 text-amber-600 text-[10px] px-1.5 py-0">
                {t.simenti.pendingBadge}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-mono">{citizen.simenti_id}</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {citizen.region}
            </span>
          </div>
        </div>

        {/* Registration date */}
        <div className="hidden shrink-0 text-right sm:block">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.simenti.registration}</p>
          <p className="text-xs text-muted-foreground">{formatDate(citizen.created_at)}</p>
        </div>

        {/* Gender badge */}
        <Badge variant="secondary" className="shrink-0 text-[10px]">
          {formatGenderShort(citizen.gender)}
        </Badge>
      </button>

      {/* Expanded: ID Card */}
      {isExpanded && (
        <div className="border-t bg-muted/30 p-4">
          <IdCard citizen={citizen} />
        </div>
      )}
    </div>
  );
}
