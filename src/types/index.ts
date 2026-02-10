// GOV-GB Core Types

export type Gender = 'M' | 'F' | 'O';
export type Channel = 'web' | 'ussd' | 'voice' | 'agent' | 'sms';
export type ServiceRequestStatus = 'pending' | 'processing' | 'completed' | 'rejected';
export type AgentStatus = 'active' | 'inactive' | 'suspended';
export type Locale = 'pt' | 'en' | 'kr' | 'fr';

export type Region =
  | 'Bissau'
  | 'Bafatá'
  | 'Biombo'
  | 'Bolama-Bijagós'
  | 'Cacheu'
  | 'Gabú'
  | 'Oio'
  | 'Quinara'
  | 'Tombali';

export const REGIONS: Region[] = [
  'Bissau',
  'Bafatá',
  'Biombo',
  'Bolama-Bijagós',
  'Cacheu',
  'Gabú',
  'Oio',
  'Quinara',
  'Tombali',
];

export interface Citizen {
  id: string;
  simenti_id: string;
  full_name: string;
  birth_date: string | null;
  gender: Gender;
  region: Region;
  tabanca: string | null;
  phone: string | null;
  photo_url: string | null;
  biometric_hash: string | null;
  registered_by: string | null;
  registered_offline: boolean;
  synced_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Agent {
  id: string;
  user_id: string | null;
  name: string;
  region: Region;
  phone: string;
  status: AgentStatus;
  citizens_registered: number;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  name_kr: string | null;
  category: string;
  description: string | null;
  requirements: string[];
  estimated_days: number | null;
  fee_xof: number | null;
  available_offline: boolean;
  ussd_code: string | null;
}

export interface ServiceRequest {
  id: string;
  citizen_id: string;
  service_id: string;
  status: ServiceRequestStatus;
  channel: Channel;
  agent_id: string | null;
  notes: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface AuditLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  actor_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface DashboardStats {
  totalCitizens: number;
  totalServices: number;
  totalAgents: number;
  totalRequests: number;
  citizensByRegion: { region: Region; count: number }[];
  requestsByChannel: { channel: Channel; count: number }[];
  registrationsByDay: { date: string; count: number }[];
  topServices: { name: string; count: number }[];
}

export interface USSDScreen {
  id: string;
  title: string;
  content: string;
  options: { key: string; label: string; next: string }[];
  input?: boolean;
  inputPlaceholder?: string;
}
