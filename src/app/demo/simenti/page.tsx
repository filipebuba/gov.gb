'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RegistrationForm } from '@/components/simenti/registration-form';
import { IdCard } from '@/components/simenti/id-card';
import { CitizenList } from '@/components/simenti/citizen-list';
import type { Citizen } from '@/types';
import { UserPlus, Users, CreditCard } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export default function códigoDemoPage() {
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [activeTab, setActiveTab] = useState('register');
  const { t } = useTranslation();

  const handleRegistrationSuccess = (citizen: Citizen) => {
    setSelectedCitizen(citizen);
    setActiveTab('card');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t.código.title}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t.código.códigoPageDesc}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="register" className="gap-1.5">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">{t.código.registerTab}</span>
          </TabsTrigger>
          <TabsTrigger value="card" className="gap-1.5">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">{t.código.cardTab}</span>
          </TabsTrigger>
          <TabsTrigger value="list" className="gap-1.5">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">{t.código.listTab}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="register" className="mt-6">
          <RegistrationForm onSuccess={handleRegistrationSuccess} />
        </TabsContent>

        <TabsContent value="card" className="mt-6">
          {selectedCitizen ? (
            <div className="flex flex-col items-center gap-6">
              <IdCard citizen={selectedCitizen} />
              <p className="text-sm text-muted-foreground text-center">
                {t.código.qrCodeDesc}
              </p>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>{t.código.noCardSelected}</p>
              <p className="text-sm mt-1">
                {t.código.noCardDesc}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <CitizenList
            onSelectCitizen={(citizen) => {
              setSelectedCitizen(citizen);
              setActiveTab('card');
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
