'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
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

function formatPersonalNumber(code: string): string {
  const digits = code.replace(/\D/g, '');
  if (digits.length >= 11) {
    const v = digits.slice(0, 11);
    return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9, 11)}`;
  }
  return code;
}

/** Inline SVG: Guinea-Bissau black star */
function GBStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GBEmblem({ size = 40 }: { size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full border-2 border-[#CE1126]/60 bg-white"
      style={{ width: size, height: size }}
    >
      <GBStar className="h-[55%] w-[55%] text-[#1a1a1a]" />
    </div>
  );
}

export function IdCard({ citizen }: IdCardProps) {
  const { t } = useTranslation();
  const initials = getInitials(citizen.full_name);
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');

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
      {/* Side toggle */}
      <div className="flex items-center rounded-full border border-gray-200 bg-white p-0.5 shadow-sm">
        <button
          type="button"
          onClick={() => setActiveSide('front')}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            activeSide === 'front'
              ? 'bg-[#CE1126] text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          aria-pressed={activeSide === 'front'}
        >
          Frente
        </button>
        <button
          type="button"
          onClick={() => setActiveSide('back')}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            activeSide === 'back'
              ? 'bg-[#CE1126] text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          aria-pressed={activeSide === 'back'}
        >
          Verso
        </button>
      </div>

      {/* ──────── FRONT ──────── */}
      {activeSide === 'front' && (
        <div className="w-full" style={{ maxWidth: 680 }}>
          <div
            className="relative overflow-hidden rounded-2xl shadow-xl"
            style={{ aspectRatio: '1.586' }}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fafcfa] via-white to-[#f5f8f5]" />
            <div className="absolute inset-0 opacity-[0.03] [background-size:20px_20px] [background-image:repeating-conic-gradient(#009739_0%_25%,transparent_0%_50%)]" />

            {/* Flag stripe left */}
            <div className="absolute left-0 top-0 bottom-0 w-[7%] bg-[#CE1126]">
              <div className="flex h-full items-center justify-center">
                <GBStar className="h-4 w-4 text-black/90" />
              </div>
            </div>

            {/* Top/bottom accent bars */}
            <div className="absolute left-[7%] right-0 top-0 h-1 bg-gradient-to-r from-[#FCD116] via-[#FCD116] to-[#009739]" />
            <div className="absolute left-[7%] right-0 bottom-0 h-1 bg-gradient-to-r from-[#009739] via-[#009739] to-[#FCD116]" />

            {/* DEMO watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="rotate-[-14deg] text-[42px] font-black tracking-[0.3em] text-[#CE1126]/[0.06]">
                DEMO
              </p>
            </div>

            {/* Content — all relative, flex-based */}
            <div className="relative h-full flex flex-col" style={{ paddingLeft: '9%', paddingRight: '2.5%', paddingTop: '3%', paddingBottom: '2%' }}>
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GBEmblem size={32} />
                  <div>
                    <p className="text-[10px] font-bold uppercase leading-tight tracking-wider text-[#1a1a1a] sm:text-xs">
                      {t.código.republic}
                    </p>
                    <p className="text-[7px] font-medium uppercase tracking-wide text-[#009739] sm:text-[9px]">
                      Bilhete de Identidade Digital
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[7px] uppercase tracking-widest text-gray-400">NHA ID</p>
                  <p className="font-mono text-[11px] font-bold tracking-wide text-[#1a1a1a] sm:text-[13px]">
                    {citizen.código_id}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-1.5 h-px bg-gradient-to-r from-[#CE1126]/30 via-[#FCD116]/40 to-[#009739]/30" />

              {/* Body — 3 columns */}
              <div className="flex flex-1 gap-3 min-h-0">
                {/* Photo column */}
                <div className="flex flex-col gap-1 shrink-0" style={{ width: '18%' }}>
                  <div className="flex flex-1 items-center justify-center overflow-hidden rounded-md border-2 border-gray-200 bg-gray-50">
                    {citizen.photo_url ? (
                      <img
                        src={citizen.photo_url}
                        alt={citizen.full_name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-bold text-gray-400">{initials}</span>
                    )}
                  </div>
                  <div className="rounded border border-gray-200 bg-white px-1 py-px text-center">
                    <p className="text-[6px] uppercase tracking-wider text-gray-400">Assinatura</p>
                    <div className="mt-0.5 h-px w-full bg-gray-300" />
                  </div>
                </div>

                {/* Fields column */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <p className="text-[6px] font-semibold uppercase tracking-widest text-gray-400 sm:text-[7px]">
                      {t.código.nameField}
                    </p>
                    <p className="truncate text-[12px] font-bold leading-tight text-[#1a1a1a] sm:text-sm">
                      {citizen.full_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-[6px] font-semibold uppercase tracking-widest text-gray-400 sm:text-[7px]">
                      Registro Geral
                    </p>
                    <p className="font-mono text-[10px] font-semibold text-[#1a1a1a] sm:text-xs">
                      {formatPersonalNumber(citizen.código_id)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2">
                    <div>
                      <p className="text-[6px] font-semibold uppercase tracking-widest text-gray-400 sm:text-[7px]">
                        {t.código.birthField}
                      </p>
                      <p className="text-[10px] font-medium text-[#1a1a1a] sm:text-xs">
                        {formatDate(citizen.birth_date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[6px] font-semibold uppercase tracking-widest text-gray-400 sm:text-[7px]">
                        {t.código.genderField}
                      </p>
                      <p className="text-[10px] font-medium text-[#1a1a1a] sm:text-xs">
                        {formatGender(citizen.gender)}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2">
                    <div>
                      <p className="text-[6px] font-semibold uppercase tracking-widest text-gray-400 sm:text-[7px]">
                        Naturalidade
                      </p>
                      <p className="text-[10px] font-medium text-[#1a1a1a] sm:text-xs">
                        {citizen.region}
                      </p>
                    </div>
                    <div>
                      <p className="text-[6px] font-semibold uppercase tracking-widest text-gray-400 sm:text-[7px]">
                        {t.código.tabancaField}
                      </p>
                      <p className="truncate text-[10px] font-medium text-[#1a1a1a] sm:text-xs">
                        {citizen.tabanca || '---'}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-0.5">
                    <div className="grid grid-cols-2 gap-x-2">
                      <div>
                        <p className="text-[6px] font-semibold uppercase tracking-widest text-gray-400 sm:text-[7px]">Emissão</p>
                        <p className="text-[9px] font-medium text-[#1a1a1a] sm:text-[11px]">{formatDate(citizen.created_at)}</p>
                      </div>
                      <div>
                        <p className="text-[6px] font-semibold uppercase tracking-widest text-gray-400 sm:text-[7px]">Válido Até</p>
                        <p className="text-[9px] font-medium text-[#1a1a1a] sm:text-[11px]">{formatDate(citizen.created_at)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR column */}
                <div className="flex flex-col items-center justify-center gap-1 shrink-0 rounded-lg border border-gray-200 bg-white p-1.5" style={{ width: '18%' }}>
                  <QRCodeSVG
                    value={citizen.código_id}
                    size={70}
                    level="Q"
                    bgColor="#ffffff"
                    fgColor="#1a1a1a"
                    includeMargin
                  />
                  <p className="text-center text-[6px] font-semibold uppercase tracking-widest text-gray-400">
                    Verificação
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1 text-[6px] uppercase tracking-[0.1em] text-gray-400">
                <span>República da Guiné-Bissau</span>
                <span className="flex items-center gap-0.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#CE1126]" />
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FCD116]" />
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#009739]" />
                </span>
                <span className="font-semibold">Documento Demonstrativo</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────── BACK ──────── */}
      {activeSide === 'back' && (
        <div className="w-full" style={{ maxWidth: 680 }}>
          <div
            className="relative overflow-hidden rounded-2xl shadow-xl"
            style={{ aspectRatio: '1.586' }}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fafcfa] via-white to-[#f5f8f5]" />
            <div className="absolute inset-0 opacity-[0.03] [background-size:20px_20px] [background-image:repeating-conic-gradient(#009739_0%_25%,transparent_0%_50%)]" />

            {/* Top/bottom accent bars */}
            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#CE1126] via-[#FCD116] to-[#009739]" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#009739] via-[#FCD116] to-[#CE1126]" />

            {/* Content */}
            <div className="relative h-full flex flex-col p-3 sm:p-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-1.5">
                <div className="flex items-center gap-1.5">
                  <GBEmblem size={24} />
                  <p className="text-[8px] font-bold uppercase tracking-wider text-[#1a1a1a] sm:text-[10px]">
                    NHA ID
                  </p>
                </div>
                <p className="font-mono text-[8px] font-bold text-[#1a1a1a] sm:text-[10px]">
                  {citizen.código_id}
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-[#CE1126]/30 via-[#FCD116]/40 to-[#009739]/30" />

              {/* Body: QR left + info right */}
              <div className="flex flex-1 items-center justify-center gap-6 min-h-0 py-2">
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <QRCodeSVG
                    value={`NHA:${citizen.código_id}:${citizen.id}`}
                    size={76}
                    level="Q"
                    bgColor="#ffffff"
                    fgColor="#1a1a1a"
                    includeMargin
                  />
                  <p className="text-center text-[6px] font-semibold uppercase tracking-widest text-gray-400">
                    QR de Validação
                  </p>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-[6px] font-semibold uppercase tracking-widest text-gray-400 sm:text-[7px]">
                      Órgão Emissor
                    </p>
                    <p className="text-[10px] font-medium text-[#1a1a1a] sm:text-[12px]">
                      Plataforma NHA ID
                    </p>
                  </div>
                  <div>
                    <p className="text-[6px] font-semibold uppercase tracking-widest text-gray-400 sm:text-[7px]">
                      Data de Emissão
                    </p>
                    <p className="text-[10px] font-medium text-[#1a1a1a] sm:text-[12px]">
                      {formatDate(citizen.created_at)}
                    </p>
                  </div>
                  <div className="rounded border border-[#FCD116]/40 bg-[#FCD116]/5 px-2 py-1">
                    <p className="text-[7px] leading-snug text-gray-500">
                      Documento demonstrativo.
                      <br />
                      Não substitui documentos oficiais.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between text-[5px] uppercase tracking-[0.1em] text-gray-400 sm:text-[6px]">
                <span>Governança Digital Inclusiva</span>
                <span className="flex items-center gap-0.5">
                  <span className="inline-block h-1 w-1 rounded-full bg-[#CE1126]" />
                  <span className="inline-block h-1 w-1 rounded-full bg-[#FCD116]" />
                  <span className="inline-block h-1 w-1 rounded-full bg-[#009739]" />
                </span>
                <span className="font-semibold">NHA ID</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download button */}
      <Button variant="outline" className="gap-2" disabled>
        <Download className="h-4 w-4" />
        {t.código.downloadCardSoon}
      </Button>
    </div>
  );
}
