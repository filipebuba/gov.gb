'use client';

import { PhoneSimulator } from '@/components/ussd/phone-simulator';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

export default function USSDDemoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Simulador USSD
        </h1>
        <p className="text-muted-foreground mt-1">
          Serviços governamentais via *244# — funciona em qualquer telemóvel de $10, sem internet.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <PhoneSimulator />

        <div className="max-w-md rounded-lg border bg-card p-4 text-sm">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
            <div>
              <p className="font-medium mb-1">Como funciona</p>
              <p className="text-muted-foreground">
                O USSD (Unstructured Supplementary Service Data) é uma tecnologia
                que funciona em qualquer telemóvel com rede GSM — sem necessidade
                de smartphone ou internet. O cidadão marca <Badge variant="secondary" className="mx-1 font-mono text-xs">*244#</Badge> e
                navega os serviços com as teclas numéricas.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center max-w-md">
          <div className="rounded-lg border p-3">
            <p className="text-2xl font-bold text-primary">$0</p>
            <p className="text-xs text-muted-foreground">Custo por sessão</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-2xl font-bold text-primary">2G</p>
            <p className="text-xs text-muted-foreground">Rede mínima</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-2xl font-bold text-primary">100%</p>
            <p className="text-xs text-muted-foreground">Telemóveis</p>
          </div>
        </div>
      </div>
    </div>
  );
}
