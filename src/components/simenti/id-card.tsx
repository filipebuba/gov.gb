'use client';

import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download, Shield } from 'lucide-react';
import type { Citizen } from '@/types';
import { useTranslation } from '@/hooks/use-translation';

interface IdCardProps {
  citizen: Citizen;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '---';
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-GW', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function IdCard({ citizen }: IdCardProps) {
  const { t } = useTranslation();
  const initials = getInitials(citizen.full_name);

  function formatGender(g: string): string {
    switch (g) {
      case 'M':
        return t.código.male;
      case 'F':
        return t.código.female;
      case 'O':
        return t.código.other;
      default:
        return g;
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Card container - standard ID card aspect ratio ~85.6mm x 53.98mm = 1.586:1 */}
      <div className="w-full max-w-[430px]">
        <div
          className="relative overflow-hidden rounded-xl border-2 border-green-600 shadow-lg"
          style={{ aspectRatio: '1.586 / 1' }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50/30 to-yellow-50/20" />

          {/* Flag stripe at very top: red | yellow | green */}
          <div className="relative flex h-2">
            <div className="flex-1 bg-red-600" />
            <div className="flex-1 bg-yellow-500" />
            <div className="flex-1 bg-green-600" />
          </div>

          {/* Card content */}
          <div className="relative flex h-[calc(100%-0.5rem)] flex-col justify-between p-3 sm:p-4">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-green-800 sm:text-xs">
                {t.código.republic}
              </h2>
              <p className="text-[9px] text-muted-foreground sm:text-[10px]">
                código ID &mdash; Identidade Digital
              </p>
            </div>

            {/* Main content area */}
            <div className="flex flex-1 items-center gap-3 pt-2 sm:gap-4">
              {/* Left: Photo placeholder */}
              <div className="flex shrink-0 flex-col items-center gap-1">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-green-600 bg-green-100 sm:h-20 sm:w-20">
                  {citizen.photo_url ? (
                    <img
                      src={citizen.photo_url}
                      alt={citizen.full_name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-bold text-green-800 sm:text-xl">
                      {initials}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Citizen details */}
              <div className="min-w-0 flex-1 space-y-1">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                    {t.código.nameField}
                  </p>
                  <p className="truncate text-sm font-semibold leading-tight text-foreground sm:text-base">
                    {citizen.full_name}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                  <div>
                    <p className="text-[8px] uppercase tracking-wider text-muted-foreground">
                      {t.código.birthField}
                    </p>
                    <p className="text-[10px] font-medium sm:text-xs">
                      {formatDate(citizen.birth_date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-wider text-muted-foreground">
                      {t.código.genderField}
                    </p>
                    <p className="text-[10px] font-medium sm:text-xs">
                      {formatGender(citizen.gender)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-wider text-muted-foreground">
                      {t.código.regionField}
                    </p>
                    <p className="text-[10px] font-medium sm:text-xs">{citizen.region}</p>
                  </div>
                  {citizen.tabanca && (
                    <div>
                      <p className="text-[8px] uppercase tracking-wider text-muted-foreground">
                        {t.código.tabancaField}
                      </p>
                      <p className="truncate text-[10px] font-medium sm:text-xs">
                        {citizen.tabanca}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom row: QR code left, ID number right */}
            <div className="flex items-end justify-between border-t border-green-200 pt-2">
              {/* QR Code */}
              <div className="flex items-center gap-2">
                <QRCodeSVG
                  value={citizen.código_id}
                  size={44}
                  level="M"
                  bgColor="transparent"
                  fgColor="#166534"
                />
                <div className="hidden sm:block">
                  <Shield className="h-3 w-3 text-green-600" />
                </div>
              </div>

              {/* código ID number */}
              <div className="text-right">
                <p className="text-[8px] uppercase tracking-wider text-muted-foreground">
                  código ID
                </p>
                <p className="font-mono text-sm font-bold tracking-wide text-green-800 sm:text-base">
                  {citizen.código_id}
                </p>
                <p className="text-[8px] text-muted-foreground">
                  {t.código.issued} {formatDate(citizen.created_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download button (visual only for MVP) */}
      <Button variant="outline" className="gap-2" disabled>
        <Download className="h-4 w-4" />
        {t.código.downloadCardSoon}
      </Button>
    </div>
  );
}
