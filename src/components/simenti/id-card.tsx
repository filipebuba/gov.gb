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

function formatPhone(phone: string | null): string {
  if (!phone) return '---';
  return phone.replace(/(\+\d{3})(\d{2,3})(\d{2,3})(\d{2,3})/, '$1 $2 $3 $4');
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
      <div className="flex items-center rounded-md border border-[#2f668a]/35 bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setActiveSide('front')}
          className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
            activeSide === 'front'
              ? 'bg-[#1f5e86] text-white'
              : 'text-[#1f5e86] hover:bg-[#eaf3f8]'
          }`}
          aria-pressed={activeSide === 'front'}
        >
          Frente
        </button>
        <button
          type="button"
          onClick={() => setActiveSide('back')}
          className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
            activeSide === 'back'
              ? 'bg-[#1f5e86] text-white'
              : 'text-[#1f5e86] hover:bg-[#eaf3f8]'
          }`}
          aria-pressed={activeSide === 'back'}
        >
          Verso
        </button>
      </div>

      {activeSide === 'front' && (
      <div className="w-full max-w-[760px]">
        <div
          className="relative overflow-hidden rounded-xl border border-[#1f5e86] shadow-lg"
          style={{ aspectRatio: '1.586 / 1' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_30%,rgba(20,110,165,0.18),transparent_38%),radial-gradient(circle_at_76%_72%,rgba(12,138,88,0.15),transparent_44%),linear-gradient(125deg,#f6fafc,#eef4f9_55%,#f8fbfd)]" />
          <div className="absolute inset-0 opacity-20 [background-size:10px_10px] [background-image:linear-gradient(to_right,#1f5e8615_1px,transparent_1px),linear-gradient(to_bottom,#1f5e8615_1px,transparent_1px)]" />
          <div className="absolute left-0 top-0 h-full w-7 bg-gradient-to-b from-[#2f7ba8] via-[#215f88] to-[#1d5479]" />
          <div className="absolute left-0 top-0 h-full w-2 bg-[#7fbfdf]/50" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="rotate-[-14deg] text-[34px] font-bold tracking-[0.24em] text-[#1f5e86]/10 sm:text-[54px]">
              DEMO
            </p>
          </div>

          <div className="relative h-full pl-8 pr-3 pt-2 pb-2 sm:pl-10 sm:pr-4 sm:pt-3 sm:pb-3">
            <div className="flex items-start justify-between border-b border-[#1f5e86]/30 pb-2 sm:pb-3">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full border border-[#1f5e86]/50 bg-white/70 text-[11px] font-bold text-[#1f5e86] sm:h-12 sm:w-12 sm:text-xs">
                  GB
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase leading-tight tracking-wide text-[#19506f] sm:text-[12px]">
                    {t.código.republic}
                  </p>
                  <p className="text-[9px] leading-tight text-[#2f5e76] sm:text-[10px]">
                    Simenti ID — Carteira de Identidade Digital
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[8px] uppercase tracking-wide text-[#4a6a7d] sm:text-[9px]">
                  Documento de Identificacao
                </p>
                <p className="font-mono text-[11px] font-bold tracking-[0.1em] text-[#173f56] sm:text-[12px]">
                  {citizen.código_id}
                </p>
              </div>
            </div>

            <div className="grid h-[calc(100%-70px)] grid-cols-[84px_1fr_92px] gap-2 pt-2 sm:grid-cols-[108px_1fr_120px] sm:gap-3 sm:pt-3">
              <div className="flex flex-col gap-1">
                <div className="flex h-[94px] w-[74px] items-center justify-center overflow-hidden rounded-md border border-[#265f84]/45 bg-white/70 sm:h-[116px] sm:w-[96px]">
                  {citizen.photo_url ? (
                    <img
                      src={citizen.photo_url}
                      alt={citizen.full_name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-bold text-[#1c5b80] sm:text-2xl">
                      {initials}
                    </span>
                  )}
                </div>
                <div className="rounded-sm border border-[#2d6388]/40 bg-white/70 px-1 py-0.5 text-center">
                  <p className="text-[7px] uppercase tracking-wide text-[#4a6a7d] sm:text-[8px]">
                    Assinatura
                  </p>
                  <div className="mt-1 h-[1px] w-full bg-[#346b8f]/45" />
                </div>
              </div>

              <div className="min-w-0">
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  <div className="col-span-2">
                    <p className="text-[7px] uppercase tracking-wide text-[#4a6a7d] sm:text-[8px]">
                      {t.código.nameField}
                    </p>
                    <p className="truncate text-[11px] font-semibold leading-tight text-[#142f3f] sm:text-[14px]">
                      {citizen.full_name}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[7px] uppercase tracking-wide text-[#4a6a7d] sm:text-[8px]">
                      Registro Geral
                    </p>
                    <p className="font-mono text-[10px] font-medium text-[#142f3f] sm:text-[12px]">
                      {formatPersonalNumber(citizen.código_id)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[7px] uppercase tracking-wide text-[#4a6a7d] sm:text-[8px]">
                      {t.código.birthField}
                    </p>
                    <p className="text-[10px] font-medium text-[#142f3f] sm:text-[12px]">
                      {formatDate(citizen.birth_date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[7px] uppercase tracking-wide text-[#4a6a7d] sm:text-[8px]">
                      {t.código.genderField}
                    </p>
                    <p className="text-[10px] font-medium text-[#142f3f] sm:text-[12px]">
                      {formatGender(citizen.gender)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[7px] uppercase tracking-wide text-[#4a6a7d] sm:text-[8px]">
                      Naturalidade
                    </p>
                    <p className="text-[10px] font-medium text-[#142f3f] sm:text-[12px]">
                      {citizen.region}
                    </p>
                  </div>
                  <div>
                    <p className="text-[7px] uppercase tracking-wide text-[#4a6a7d] sm:text-[8px]">
                      {t.código.tabancaField}
                    </p>
                    <p className="truncate text-[10px] font-medium text-[#142f3f] sm:text-[12px]">
                      {citizen.tabanca || '---'}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[7px] uppercase tracking-wide text-[#4a6a7d] sm:text-[8px]">
                      Orgao Emissor
                    </p>
                    <p className="text-[10px] font-medium text-[#142f3f] sm:text-[12px]">
                      Plataforma Simenti ID
                    </p>
                  </div>
                </div>
                <div className="mt-2 border-t border-[#2f668a]/30 pt-1">
                  <p className="text-[7px] uppercase tracking-wide text-[#4a6a7d] sm:text-[8px]">
                    Valido Ate
                  </p>
                  <p className="text-[10px] font-medium text-[#142f3f] sm:text-[12px]">
                    {formatDate(citizen.created_at)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-between rounded-md border border-[#2f668a]/35 bg-white/70 p-1.5 sm:p-2">
                <QRCodeSVG
                  value={citizen.código_id}
                  size={74}
                  level="Q"
                  bgColor="#ffffff"
                  fgColor="#123e57"
                  includeMargin
                  className="sm:h-[86px] sm:w-[86px]"
                />
                <div className="w-full border-t border-[#2f668a]/30 pt-1 text-center">
                  <p className="text-[7px] uppercase tracking-wide text-[#4a6a7d] sm:text-[8px]">
                    Emissao
                  </p>
                  <p className="text-[9px] font-medium text-[#142f3f] sm:text-[10px]">
                    {formatDate(citizen.created_at)}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-8 right-0 flex items-center justify-between border-t border-[#2f668a]/35 bg-white/55 px-2 py-1 text-[7px] uppercase tracking-[0.08em] text-[#2c5b74] sm:left-10 sm:px-3 sm:text-[8px]">
              <span>Carteira de Identidade Digital</span>
              <span className="font-semibold">Documento Demonstrativo</span>
            </div>
          </div>
        </div>
      </div>
      )}

      {activeSide === 'back' && (
      <div className="w-full max-w-[760px]">
        <div
          className="relative overflow-hidden rounded-xl border border-[#1f5e86] shadow-lg"
          style={{ aspectRatio: '1.586 / 1' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_28%,rgba(20,110,165,0.18),transparent_38%),radial-gradient(circle_at_24%_72%,rgba(12,138,88,0.14),transparent_44%),linear-gradient(125deg,#f8fbfd,#edf4f8_55%,#f7fbfd)]" />
          <div className="absolute inset-0 opacity-20 [background-size:10px_10px] [background-image:linear-gradient(to_right,#1f5e8615_1px,transparent_1px),linear-gradient(to_bottom,#1f5e8615_1px,transparent_1px)]" />

          <div className="relative h-full p-3 sm:p-4">
            <div className="flex items-center justify-between border-b border-[#1f5e86]/30 pb-2">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#1b4e6b] sm:text-xs">
                Simenti ID — Verso
              </p>
              <p className="font-mono text-[10px] font-bold text-[#17415a] sm:text-xs">
                {citizen.código_id}
              </p>
            </div>

            <div className="grid h-[calc(100%-56px)] grid-cols-[1fr_120px] gap-3 pt-2 sm:grid-cols-[1fr_150px] sm:gap-4 sm:pt-3">
              <div className="grid content-start gap-2 sm:gap-3">
                <div className="rounded-md border border-[#2f668a]/35 bg-white/70 p-2 sm:p-3">
                  <p className="text-[8px] uppercase tracking-wide text-[#4a6a7d] sm:text-[9px]">
                    Verificacao Digital
                  </p>
                  <p className="mt-1 text-[10px] leading-snug text-[#17384d] sm:text-[12px]">
                    Este cartao e uma credencial digital do ecossistema Simenti.
                    O QR code permite validacao rapida do identificador do cidadao.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-md border border-[#2f668a]/35 bg-white/70 p-2">
                    <p className="text-[7px] uppercase tracking-wide text-[#4a6a7d] sm:text-[8px]">
                      Nome do Titular
                    </p>
                    <p className="truncate text-[10px] font-medium text-[#17384d] sm:text-[12px]">
                      {citizen.full_name}
                    </p>
                  </div>
                  <div className="rounded-md border border-[#2f668a]/35 bg-white/70 p-2">
                    <p className="text-[7px] uppercase tracking-wide text-[#4a6a7d] sm:text-[8px]">
                      Contacto
                    </p>
                    <p className="text-[10px] font-medium text-[#17384d] sm:text-[12px]">
                      {formatPhone(citizen.phone)}
                    </p>
                  </div>
                  <div className="rounded-md border border-[#2f668a]/35 bg-white/70 p-2">
                    <p className="text-[7px] uppercase tracking-wide text-[#4a6a7d] sm:text-[8px]">
                      Data de Emissao
                    </p>
                    <p className="text-[10px] font-medium text-[#17384d] sm:text-[12px]">
                      {formatDate(citizen.created_at)}
                    </p>
                  </div>
                  <div className="rounded-md border border-[#2f668a]/35 bg-white/70 p-2">
                    <p className="text-[7px] uppercase tracking-wide text-[#4a6a7d] sm:text-[8px]">
                      Canal de Registo
                    </p>
                    <p className="text-[10px] font-medium text-[#17384d] sm:text-[12px]">
                      Plataforma Digital
                    </p>
                  </div>
                </div>

                <div className="rounded-md border border-[#2f668a]/35 bg-white/70 p-2">
                  <p className="text-[8px] uppercase tracking-wide text-[#4a6a7d] sm:text-[9px]">
                    Observacao
                  </p>
                  <p className="text-[9px] leading-snug text-[#17384d] sm:text-[11px]">
                    Documento demonstrativo para experiencia digital cidada.
                    Nao substitui documentos fisicos oficiais emitidos por autoridade estatal.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-md border border-[#2f668a]/35 bg-white/70 p-2 sm:gap-3 sm:p-3">
                <QRCodeSVG
                  value={`SIMENTI:${citizen.código_id}:${citizen.id}`}
                  size={100}
                  level="Q"
                  bgColor="#ffffff"
                  fgColor="#123e57"
                  includeMargin
                  className="sm:h-[122px] sm:w-[122px]"
                />
                <p className="text-center text-[8px] uppercase tracking-wide text-[#355f77] sm:text-[9px]">
                  QR de Validacao
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-[#2f668a]/35 bg-white/55 px-3 py-1 text-[7px] uppercase tracking-[0.08em] text-[#2c5b74] sm:text-[8px]">
              <span>Governanca Digital Inclusiva</span>
              <span className="font-semibold">Simenti ID</span>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Download button (visual only for MVP) */}
      <Button variant="outline" className="gap-2" disabled>
        <Download className="h-4 w-4" />
        {t.código.downloadCardSoon}
      </Button>
    </div>
  );
}
