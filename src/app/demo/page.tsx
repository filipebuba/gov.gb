'use client';

import Link from 'next/link';
import {
  Fingerprint,
  Smartphone,
  BarChart3,
  ArrowRight,
  Shield,
  Globe,
  WifiOff,
  Zap,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/use-translation';

export default function DemoPage() {
  const { t } = useTranslation();

  const modules = [
    {
      href: '/demo/NHA',
      icon: Fingerprint,
      title: 'código ID',
      description: t.demo.códigoModuleDesc,
      badge: t.demo.identityBadge,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      href: '/demo/ussd',
      icon: Smartphone,
      title: t.demo.ussdModuleTitle,
      description: t.demo.ussdModuleDesc,
      badge: t.demo.inclusionBadge,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      href: '/demo/dashboard',
      icon: BarChart3,
      title: t.demo.dashboardModuleTitle,
      description: t.demo.dashboardModuleDesc,
      badge: t.demo.governanceBadge,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
  ];

  const features = [
    {
      icon: WifiOff,
      title: t.demo.offlineFirst,
      desc: t.demo.offlineFirstDesc,
    },
    {
      icon: Shield,
      title: t.demo.secure,
      desc: t.demo.secureDesc,
    },
    {
      icon: Globe,
      title: t.demo.multilingual,
      desc: t.demo.multilingualDesc,
    },
    {
      icon: Zap,
      title: t.demo.fast,
      desc: t.demo.fastDesc,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <Badge className="mb-4" variant="secondary">
          {t.demo.modeBadge}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t.demo.exploreTitle}
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          {t.demo.exploreDesc}
        </p>
      </div>

      {/* Module Cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-12">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link key={mod.href} href={mod.href} className="group">
              <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 group-hover:border-primary/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`rounded-lg p-2.5 ${mod.bgColor} ${mod.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {mod.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{mod.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {mod.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    {t.common.explore}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Features Grid */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold text-center mb-6">
          {t.demo.techFeatures}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="text-center p-4 rounded-lg border bg-card"
              >
                <Icon className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="font-medium text-sm">{feat.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Start */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <div>
            <h3 className="font-semibold">{t.demo.recommendedFlow}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {t.demo.flowDescription}
            </p>
          </div>
          <Link href="/demo/NHA">
            <Button className="gap-2 whitespace-nowrap">
              {t.demo.startcódigo}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
