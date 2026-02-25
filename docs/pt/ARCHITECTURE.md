# Arquitetura / Architecture


Este documento descreve a arquitetura tecnica do **GOV-GB** em nivel de sistema.

### Visao Geral

O projeto e uma aplicacao web baseada em `Next.js` com modulos de demonstracao para:

- identidade digital (`NHA`);
- acesso USSD;
- dashboard de indicadores.

### Camadas do Sistema

- **Frontend**: App Router em `src/app` e componentes em `src/components`.
- **Estado local**: `Zustand` para simulacao de fluxos e persistencia local.
- **Dados**: integracao com `Supabase` (cliente SSR e SQL versionado).
- **I18n**: dicionarios em `src/lib/i18n/dictionaries.ts`.

### Modulos Principais

- `src/components/NHA/*`: onboarding e representacao de identidade.
- `src/components/ussd/*`: experiencia de servicos sem internet.
- `src/components/dashboard/*`: metricas operacionais e cobertura.
- `src/components/landing/*`: narrativa institucional e alinhamento estrategico.

### Fluxo de Dados (Resumo)

1. Usuario acessa uma rota (`/`, `/demo/*`).
2. Componentes carregam estado local e/ou dados de demo.
3. Integracoes com Supabase sao acessadas via `src/lib/supabase/*`.
4. UI renderiza indicadores e estados localizados por idioma.

### Principios Arquiteturais

- Modularidade por dominio funcional.
- Offline-first para fluxos demonstrativos.
- Separacao entre interface, estado e acesso a dados.
- Evolucao incremental com baixo acoplamento entre modulos.

### Decisoes Tecnicas Relevantes

- `Next.js` App Router para composicao de rotas e layouts.
- `TypeScript` para seguranca de tipos e manutencao.
- `Tailwind CSS` para consistencia visual e velocidade de iteracao.
- `Supabase` como base para persistencia e evolucao institucional.

