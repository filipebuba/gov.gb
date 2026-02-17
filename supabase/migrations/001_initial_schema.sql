-- GOV-GB Initial Schema
-- Digital Government Platform for Guinea-Bissau

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- AGENTES COMUNITÁRIOS
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  phone TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  citizens_registered INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- CIDADÃOS (código ID)
CREATE TABLE citizens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  código_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  birth_date DATE,
  gender TEXT CHECK (gender IN ('M', 'F', 'O')),
  region TEXT NOT NULL,
  tabanca TEXT,
  phone TEXT,
  photo_url TEXT,
  biometric_hash TEXT,
  registered_by UUID REFERENCES agents(id),
  registered_offline BOOLEAN DEFAULT false,
  synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- SERVIÇOS GOVERNAMENTAIS
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_kr TEXT,
  category TEXT NOT NULL,
  description TEXT,
  requirements TEXT[],
  estimated_days INT,
  fee_xof NUMERIC,
  available_offline BOOLEAN DEFAULT false,
  ussd_code TEXT
);

-- PEDIDOS DE SERVIÇO
CREATE TABLE service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  citizen_id UUID REFERENCES citizens(id),
  service_id UUID REFERENCES services(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'rejected')),
  channel TEXT CHECK (channel IN ('web', 'ussd', 'voice', 'agent', 'sms')),
  agent_id UUID REFERENCES agents(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- AUDIT LOG (Transparência)
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  actor_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_citizens_código_id ON citizens(código_id);
CREATE INDEX idx_citizens_region ON citizens(region);
CREATE INDEX idx_citizens_created_at ON citizens(created_at);
CREATE INDEX idx_service_requests_citizen_id ON service_requests(citizen_id);
CREATE INDEX idx_service_requests_status ON service_requests(status);
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);

-- Row Level Security
ALTER TABLE citizens ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Public read access for services (they're public info)
CREATE POLICY "Services are publicly readable"
  ON services FOR SELECT
  USING (true);

-- Agents can read all citizens
CREATE POLICY "Authenticated users can read citizens"
  ON citizens FOR SELECT
  TO authenticated
  USING (true);

-- Agents can insert citizens
CREATE POLICY "Authenticated users can insert citizens"
  ON citizens FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Agents can read their own profile
CREATE POLICY "Agents can read own profile"
  ON agents FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Service requests readable by authenticated
CREATE POLICY "Authenticated users can read service requests"
  ON service_requests FOR SELECT
  TO authenticated
  USING (true);

-- Audit log readable by authenticated
CREATE POLICY "Authenticated users can read audit log"
  ON audit_log FOR SELECT
  TO authenticated
  USING (true);
