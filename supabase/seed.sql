-- GOV-GB Seed Data for Demo
-- Run this after migrations to populate demo data

-- Insert demo agents
INSERT INTO agents (id, name, region, phone, status, citizens_registered) VALUES
  ('a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6', 'Samba Djaló', 'Gabú', '+245 955 111 222', 'active', 47),
  ('a2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 'Maria da Luz Costa', 'Bissau', '+245 966 333 444', 'active', 83),
  ('a3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8', 'Fodé Sissé', 'Bafatá', '+245 977 555 666', 'active', 31),
  ('a4d5e6f7-a8b9-c0d1-e2f3-a4b5c6d7e8f9', 'Djenabu Sané', 'Cacheu', '+245 955 777 888', 'active', 22),
  ('a5e6f7a8-b9c0-d1e2-f3a4-b5c6d7e8f9a0', 'Bubacar Cá', 'Oio', '+245 966 999 000', 'active', 15);

-- Insert demo services
INSERT INTO services (id, name, name_kr, category, description, requirements, estimated_days, fee_xof, available_offline, ussd_code) VALUES
  ('e1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Certidão de Nascimento', 'Sertidun di Nasimentu', 'Registo Civil', 'Emissão de certidão de nascimento para cidadãos guineenses.', ARRAY['Simenti ID', 'Testemunha maior de idade', 'Dados dos pais'], 5, 0, true, '*244*1*1#'),
  ('e2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 'Registo de Terreno', 'Registu di Teru', 'Propriedade', 'Registo de propriedade de terreno com geolocalização.', ARRAY['Simenti ID', 'Localização GPS', 'Aprovação do Régulo'], 30, 5000, true, '*244*1*2#'),
  ('e3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8', 'Consulta Médica', 'Konsulta Médiku', 'Saúde', 'Agendamento de consulta médica no centro de saúde regional.', ARRAY['Simenti ID'], 3, 0, false, '*244*2*1#'),
  ('e4d5e6f7-a8b9-c0d1-e2f3-a4b5c6d7e8f9', 'Cartão de Vacinação', 'Kartun di Vasinason', 'Saúde', 'Emissão de cartão de vacinação digital.', ARRAY['Simenti ID', 'Registos de vacinação'], 1, 0, true, '*244*2*2#'),
  ('e5e6f7a8-b9c0-d1e2-f3a4-b5c6d7e8f9a0', 'Matrícula Escolar', 'Matríkula Skolar', 'Educação', 'Inscrição em escola pública da região.', ARRAY['Simenti ID', 'Certidão de Nascimento', 'Dados do encarregado'], 7, 0, true, '*244*3*1#'),
  ('e6f7a8b9-c0d1-e2f3-a4b5-c6d7e8f9a0b1', 'Licença de Pesca', 'Lisensa di Peska', 'Economia', 'Licença para pesca artesanal costeira.', ARRAY['Simenti ID', 'Registo de embarcação'], 14, 10000, false, '*244*4*1#');

-- Insert demo citizens
INSERT INTO citizens (id, simenti_id, full_name, birth_date, gender, region, tabanca, phone, registered_by, registered_offline, synced_at) VALUES
  ('c1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'GOV-GB-2026-00001', 'Mamadu Baldé', '1985-03-15', 'M', 'Gabú', 'Sonaco', '+245 955 123 456', 'a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6', false, '2026-01-15 10:30:00+00'),
  ('c2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 'GOV-GB-2026-00002', 'Fatumata Djaló', '1992-07-22', 'F', 'Bissau', NULL, '+245 966 789 012', 'a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6', false, '2026-01-16 14:20:00+00'),
  ('c3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8', 'GOV-GB-2026-00003', 'Braima Sanhá', '1978-11-05', 'M', 'Bafatá', 'Bambadinca', '+245 977 345 678', 'a2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', true, '2026-01-18 08:45:00+00'),
  ('c4d5e6f7-a8b9-c0d1-e2f3-a4b5c6d7e8f9', 'GOV-GB-2026-00004', 'Aminata Camará', '2001-04-30', 'F', 'Cacheu', 'Canchungo', '+245 955 901 234', 'a2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', false, '2026-01-19 11:15:00+00'),
  ('c5e6f7a8-b9c0-d1e2-f3a4-b5c6d7e8f9a0', 'GOV-GB-2026-00005', 'Idrissa Mané', '1995-09-12', 'M', 'Oio', 'Mansôa', '+245 966 567 890', 'a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6', true, NULL),
  ('c6f7a8b9-c0d1-e2f3-a4b5-c6d7e8f9a0b1', 'GOV-GB-2026-00006', 'Cadijatu Vieira', '1988-12-25', 'F', 'Quinara', 'Fulacunda', '+245 977 678 901', 'a3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8', false, '2026-01-21 13:00:00+00'),
  ('c7a8b9c0-d1e2-f3a4-b5c6-d7e8f9a0b1c2', 'GOV-GB-2026-00007', 'Ussumane Embaló', '1970-06-08', 'M', 'Tombali', 'Catió', NULL, 'a3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8', true, '2026-01-22 07:30:00+00'),
  ('c8b9c0d1-e2f3-a4b5-c6d7-e8f9a0b1c2d3', 'GOV-GB-2026-00008', 'Sira Indjai', '1999-02-14', 'F', 'Biombo', 'Quinhámel', '+245 955 234 567', 'a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6', false, '2026-01-23 10:00:00+00'),
  ('c9c0d1e2-f3a4-b5c6-d7e8-f9a0b1c2d3e4', 'GOV-GB-2026-00009', 'Abubacar Dabó', '1983-08-19', 'M', 'Bolama-Bijagós', 'Bolama', '+245 966 890 123', 'a3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8', false, '2026-01-24 12:30:00+00'),
  ('c0d1e2f3-a4b5-c6d7-e8f9-a0b1c2d3e4f5', 'GOV-GB-2026-00010', 'Nené Ture', '2003-01-07', 'F', 'Gabú', 'Pitche', '+245 977 012 345', 'a2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', true, NULL);

-- Insert demo service requests
INSERT INTO service_requests (citizen_id, service_id, status, channel, agent_id, notes, completed_at) VALUES
  ('c1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'e1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'completed', 'agent', 'a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6', 'Certidão emitida com sucesso', '2026-01-21 14:00:00+00'),
  ('c2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 'e3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8', 'completed', 'web', NULL, NULL, '2026-01-20 10:00:00+00'),
  ('c3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8', 'e2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 'processing', 'ussd', 'a2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 'Aguardando aprovação do régulo', NULL),
  ('c4d5e6f7-a8b9-c0d1-e2f3-a4b5c6d7e8f9', 'e5e6f7a8-b9c0-d1e2-f3a4-b5c6d7e8f9a0', 'pending', 'agent', 'a4d5e6f7-a8b9-c0d1-e2f3-a4b5c6d7e8f9', NULL, NULL),
  ('c5e6f7a8-b9c0-d1e2-f3a4-b5c6d7e8f9a0', 'e4d5e6f7-a8b9-c0d1-e2f3-a4b5c6d7e8f9', 'completed', 'ussd', NULL, NULL, '2026-01-21 09:00:00+00'),
  ('c6f7a8b9-c0d1-e2f3-a4b5-c6d7e8f9a0b1', 'e6f7a8b9-c0d1-e2f3-a4b5-c6d7e8f9a0b1', 'processing', 'web', NULL, 'Documentação em análise', NULL);
