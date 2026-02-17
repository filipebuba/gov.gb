'use client';

import { DemoNav } from '@/components/demo/demo-nav';
import { useCitizenStore } from '@/stores/citizen-store';
import { useEffect } from 'react';

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { citizens, loadDemoData } = useCitizenStore();

  useEffect(() => {
    if (citizens.length === 0) {
      loadDemoData();
    }
  }, [citizens.length, loadDemoData]);

  return (
    <div className="min-h-screen bg-background">
      <DemoNav />
      <main className="page-transition">{children}</main>
    </div>
  );
}
