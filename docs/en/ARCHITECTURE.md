# Architecture


This document describes the **GOV-GB** technical architecture at system level.

### Overview

The project is a `Next.js` web application with demo modules for:

- digital identity (`simenti`);
- USSD access;
- public metrics dashboard.

### System Layers

- **Frontend**: App Router in `src/app` and UI modules in `src/components`.
- **Local state**: `Zustand` for flow simulation and browser persistence.
- **Data**: `Supabase` integration (SSR client and versioned SQL).
- **I18n**: dictionaries in `src/lib/i18n/dictionaries.ts`.

### Core Modules

- `src/components/simenti/*`: onboarding and identity representation.
- `src/components/ussd/*`: low-connectivity service experience.
- `src/components/dashboard/*`: operational and coverage metrics.
- `src/components/landing/*`: institutional narrative and strategic context.

### Data Flow (Summary)

1. User opens a route (`/`, `/demo/*`).
2. Components load local state and/or demo datasets.
3. Supabase integrations are accessed via `src/lib/supabase/*`.
4. UI renders indicators and localized content.

### Architectural Principles

- Functional-domain modularity.
- Offline-first behavior for demo flows.
- Separation of UI, state management, and data access.
- Incremental evolution with low coupling across modules.

### Key Technical Decisions

- `Next.js` App Router for route/layout composition.
- `TypeScript` for type safety and maintainability.
- `Tailwind CSS` for visual consistency and iteration speed.
- `Supabase` as persistence foundation and institutional growth path.
