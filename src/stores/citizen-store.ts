'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Citizen, Region } from '@/types';
import { demoCitizens } from '@/lib/demo-data';
import { generatecódigoId } from '@/lib/simenti';

interface CitizenStore {
  citizens: Citizen[];
  isDemo: boolean;
  isOffline: boolean;
  pendingSync: Citizen[];

  // Actions
  loadDemoData: () => void;
  addCitizen: (data: Omit<Citizen, 'id' | 'código_id' | 'created_at' | 'updated_at' | 'synced_at' | 'registered_offline'>) => Citizen;
  getCitizen: (id: string) => Citizen | undefined;
  getCitizenBycódigo: (códigoId: string) => Citizen | undefined;
  searchCitizens: (query: string) => Citizen[];
  filterByRegion: (region: Region) => Citizen[];
  setOffline: (offline: boolean) => void;
  syncPending: () => void;
}

export const useCitizenStore = create<CitizenStore>()(
  persist(
    (set, get) => ({
      citizens: [],
      isDemo: false,
      isOffline: false,
      pendingSync: [],

      loadDemoData: () => {
        set({ citizens: [...demoCitizens], isDemo: true });
      },

      addCitizen: (data) => {
        const now = new Date().toISOString();
        const isOffline = get().isOffline;
        const newCitizen: Citizen = {
          ...data,
          id: crypto.randomUUID(),
          código_id: generatecódigoId(),
          registered_offline: isOffline,
          synced_at: isOffline ? null : now,
          created_at: now,
          updated_at: now,
        };

        set((state) => ({
          citizens: [newCitizen, ...state.citizens],
          pendingSync: isOffline
            ? [...state.pendingSync, newCitizen]
            : state.pendingSync,
        }));

        return newCitizen;
      },

      getCitizen: (id) => {
        return get().citizens.find((c) => c.id === id);
      },

      getCitizenBycódigo: (códigoId) => {
        return get().citizens.find((c) => c.código_id === códigoId);
      },

      searchCitizens: (query) => {
        const q = query.toLowerCase();
        return get().citizens.filter(
          (c) =>
            c.full_name.toLowerCase().includes(q) ||
            c.código_id.toLowerCase().includes(q) ||
            c.region.toLowerCase().includes(q) ||
            (c.tabanca && c.tabanca.toLowerCase().includes(q))
        );
      },

      filterByRegion: (region) => {
        return get().citizens.filter((c) => c.region === region);
      },

      setOffline: (offline) => {
        set({ isOffline: offline });
      },

      syncPending: () => {
        const now = new Date().toISOString();
        set((state) => ({
          citizens: state.citizens.map((c) =>
            state.pendingSync.find((p) => p.id === c.id)
              ? { ...c, synced_at: now, registered_offline: false }
              : c
          ),
          pendingSync: [],
        }));
      },
    }),
    {
      name: 'gov-gb-citizens',
      partialize: (state) => ({
        citizens: state.citizens,
        pendingSync: state.pendingSync,
        isOffline: state.isOffline,
      }),
    }
  )
);
