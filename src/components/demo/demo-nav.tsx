'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Fingerprint,
  Smartphone,
  BarChart3,
  Home,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCitizenStore } from '@/stores/citizen-store';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';

export function DemoNav() {
  const pathname = usePathname();
  const { isOffline, setOffline, pendingSync, syncPending } = useCitizenStore();
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { href: '/demo', label: t.common.home, icon: Home },
    { href: '/demo/código', label: 'código ID', icon: Fingerprint },
    { href: '/demo/ussd', label: 'USSD *244#', icon: Smartphone },
    { href: '/demo/dashboard', label: t.common.dashboard, icon: BarChart3 },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleOffline = () => {
    if (isOffline) {
      setOffline(false);
      syncPending();
    } else {
      setOffline(true);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="mr-2 flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Image
                src="/favicon.svg"
                alt="GOV-GB"
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="hidden sm:inline text-sm font-semibold text-foreground">GOV-GB</span>
            </Link>

            <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      size="sm"
                      className={cn(
                        'h-8 gap-1.5 text-xs sm:text-sm',
                        isActive && 'shadow-sm'
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {mounted && pendingSync.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {pendingSync.length} {t.common.pending}{pendingSync.length > 1 ? 's' : ''}
              </Badge>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleOffline}
              className={cn(
                'h-8 gap-1.5 text-xs',
                isOffline && 'border-destructive text-destructive'
              )}
            >
              {isOffline ? (
                <>
                  <WifiOff className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{t.common.offline}</span>
                </>
              ) : (
                <>
                  <Wifi className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{t.common.online}</span>
                </>
              )}
            </Button>

            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 text-xs"
            >
              DEMO
            </Badge>
          </div>
        </div>
      </div>
    </nav>
  );
}
