# GOV-GB

Plataforma de Governo Digital da Guiné-Bissau, com foco em identidade digital, inclusão por USSD e monitorização pública de indicadores.

## Visao Geral

O projeto demonstra uma infraestrutura digital pública com tres modulos principais:

- `código ID`: registo de cidadaos e geracao de identidade digital.
- `USSD`: simulacao de acesso a servicos publicos sem internet.
- `Dashboard`: visualizacao de metricas operacionais e de cobertura.

Rotas principais:

- `/` landing institucional.
- `/demo` hub de demonstracao.
- `/demo/NHA` modulo de identidade.
- `/demo/ussd` simulador USSD.
- `/demo/dashboard` painel de metricas.

## Stack Tecnologica

- `Next.js 16` (App Router)
- `React 19` + `TypeScript`
- `Tailwind CSS 4`
- `Zustand` (estado local com persistencia)
- `Supabase` (cliente SSR e estrutura de banco)
- `Recharts` (graficos do dashboard)

## Requisitos

- `Node.js 20+`
- `npm` (ou outro gestor compativel)

## Configuracao Local

1. Instalar dependencias:

```bash
npm ci
```

2. Criar arquivo `.env.local` na raiz:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA
```

3. Executar em desenvolvimento:

```bash
npm run dev
```

4. Abrir:

```text
http://localhost:3000
```

## Scripts Disponiveis

- `npm run dev`: inicia ambiente de desenvolvimento.
- `npm run build`: gera build de producao.
- `npm run start`: sobe aplicacao em modo producao.
- `npm run lint`: executa lint com ESLint.

## Banco de Dados (Supabase)

SQL disponivel em:

- `supabase/migrations/001_initial_schema.sql`
- `supabase/seed.sql`

Fluxo sugerido:

1. Executar a migration inicial no projeto Supabase.
2. Aplicar `seed.sql` para popular dados de demonstracao.

## Docker

O repositorio inclui `Dockerfile` multi-stage.

Build da imagem:

```bash
docker build -t gov-gb .
```

Executar container:

```bash
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA \
  gov-gb
```

## Estrutura de Pastas

```text
src/
  app/                 # rotas e layouts (App Router)
  components/          # componentes de UI e modulos
  hooks/               # hooks customizados
  lib/                 # utilitarios, i18n, dados demo, supabase
  stores/              # estado global (zustand)
  types/               # tipos TypeScript
supabase/
  migrations/          # schema SQL
  seed.sql             # dados de demonstracao
public/                # assets estaticos
```

## Observacoes

- O projeto inclui suporte multi-idioma (`pt`, `en`, `kr`, `fr`).
- A demo usa dados locais e persistencia no navegador para simulacao offline-first.

## Documentacao

- [README.md](README.md)
- [LICENSE (Apache-2.0)](LICENSE)
- [NOTICE](NOTICE)
- [Contributing (PT)](docs/pt/CONTRIBUTING.md)
- [Contributing (EN)](docs/en/CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [Docs Index](docs/README.md)
- [Documentos em Portugues](docs/pt)
- [Documents in English](docs/en)
