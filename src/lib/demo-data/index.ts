import type { DashboardStats, ServiceRequest, Region } from '@/types';
import { demoCitizens } from './citizens';
import { demoAgents } from './agents';
import { demoServices } from './services';

export { demoCitizens } from './citizens';
export { demoAgents } from './agents';
export { demoServices } from './services';

export const demoServiceRequests: ServiceRequest[] = [
  {
    id: 'f1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6',
    citizen_id: demoCitizens[0].id,
    service_id: demoServices[0].id,
    status: 'completed',
    channel: 'agent',
    agent_id: demoAgents[0].id,
    notes: 'Certidão emitida com sucesso',
    created_at: '2026-01-16T09:00:00Z',
    completed_at: '2026-01-21T14:00:00Z',
  },
  {
    id: 'f2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7',
    citizen_id: demoCitizens[1].id,
    service_id: demoServices[2].id,
    status: 'completed',
    channel: 'web',
    agent_id: null,
    notes: null,
    created_at: '2026-01-17T11:00:00Z',
    completed_at: '2026-01-20T10:00:00Z',
  },
  {
    id: 'f3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8',
    citizen_id: demoCitizens[2].id,
    service_id: demoServices[1].id,
    status: 'processing',
    channel: 'ussd',
    agent_id: demoAgents[2].id,
    notes: 'Aguardando aprovação do régulo',
    created_at: '2026-01-18T15:00:00Z',
    completed_at: null,
  },
  {
    id: 'f4d5e6f7-a8b9-c0d1-e2f3-a4b5c6d7e8f9',
    citizen_id: demoCitizens[3].id,
    service_id: demoServices[4].id,
    status: 'pending',
    channel: 'agent',
    agent_id: demoAgents[3].id,
    notes: null,
    created_at: '2026-01-22T08:30:00Z',
    completed_at: null,
  },
  {
    id: 'f5e6f7a8-b9c0-d1e2-f3a4-b5c6d7e8f9a0',
    citizen_id: demoCitizens[4].id,
    service_id: demoServices[3].id,
    status: 'completed',
    channel: 'ussd',
    agent_id: null,
    notes: null,
    created_at: '2026-01-20T14:00:00Z',
    completed_at: '2026-01-21T09:00:00Z',
  },
  {
    id: 'f6f7a8b9-c0d1-e2f3-a4b5-c6d7e8f9a0b1',
    citizen_id: demoCitizens[5].id,
    service_id: demoServices[5].id,
    status: 'processing',
    channel: 'web',
    agent_id: null,
    notes: 'Documentação em análise',
    created_at: '2026-01-23T10:00:00Z',
    completed_at: null,
  },
  {
    id: 'f7a8b9c0-d1e2-f3a4-b5c6-d7e8f9a0b1c2',
    citizen_id: demoCitizens[6].id,
    service_id: demoServices[0].id,
    status: 'completed',
    channel: 'agent',
    agent_id: demoAgents[2].id,
    notes: null,
    created_at: '2026-01-22T16:00:00Z',
    completed_at: '2026-01-27T11:00:00Z',
  },
  {
    id: 'f8b9c0d1-e2f3-a4b5-c6d7-e8f9a0b1c2d3',
    citizen_id: demoCitizens[7].id,
    service_id: demoServices[2].id,
    status: 'pending',
    channel: 'sms',
    agent_id: null,
    notes: null,
    created_at: '2026-01-25T07:45:00Z',
    completed_at: null,
  },
];

export function getDemoStats(): DashboardStats {
  const citizensByRegion: { region: Region; count: number }[] = [
    { region: 'Bissau', count: 83 },
    { region: 'Gabú', count: 62 },
    { region: 'Bafatá', count: 45 },
    { region: 'Cacheu', count: 38 },
    { region: 'Oio', count: 31 },
    { region: 'Biombo', count: 22 },
    { region: 'Quinara', count: 18 },
    { region: 'Tombali', count: 14 },
    { region: 'Bolama-Bijagós', count: 9 },
  ];

  return {
    totalCitizens: 322,
    totalServices: demoServices.length,
    totalAgents: demoAgents.length,
    totalRequests: 187,
    citizensByRegion,
    requestsByChannel: [
      { channel: 'agent', count: 89 },
      { channel: 'ussd', count: 52 },
      { channel: 'web', count: 31 },
      { channel: 'sms', count: 11 },
      { channel: 'voice', count: 4 },
    ],
    registrationsByDay: [
      { date: '2026-01-19', count: 8 },
      { date: '2026-01-20', count: 12 },
      { date: '2026-01-21', count: 15 },
      { date: '2026-01-22', count: 9 },
      { date: '2026-01-23', count: 18 },
      { date: '2026-01-24', count: 22 },
      { date: '2026-01-25', count: 14 },
      { date: '2026-01-26', count: 27 },
      { date: '2026-01-27', count: 31 },
      { date: '2026-01-28', count: 19 },
      { date: '2026-01-29', count: 35 },
      { date: '2026-01-30', count: 28 },
      { date: '2026-01-31', count: 42 },
      { date: '2026-02-01', count: 38 },
    ],
    topServices: [
      { name: 'Certidão de Nascimento', count: 67 },
      { name: 'Consulta Médica', count: 43 },
      { name: 'Cartão de Vacinação', count: 31 },
      { name: 'Matrícula Escolar', count: 28 },
      { name: 'Registo de Terreno', count: 12 },
      { name: 'Licença de Pesca', count: 6 },
    ],
  };
}
