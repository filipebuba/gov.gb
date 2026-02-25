# API and Integrations


This document defines **GOV-GB** integration contracts.

### Current State

At the current stage, the project is mostly powered by local demo data and SQL structure in `Supabase`.

### Supabase Integration

- Browser client: `src/lib/supabase/client.ts`
- Server client: `src/lib/supabase/server.ts`
- Initial schema: `supabase/migrations/001_initial_schema.sql`
- Seed data: `supabase/seed.sql`

### API Guidelines

- Version contracts when exposing public endpoints.
- Keep naming consistent and typed in TypeScript.
- Validate input and output payloads.
- Avoid breaking changes without a migration plan.

### Recommended Response Model

```json
{
  "data": {},
  "error": null,
  "meta": {
    "requestId": "uuid",
    "timestamp": "ISO-8601"
  }
}
```

### Integration Security

- Do not expose sensitive keys in frontend code.
- Enforce least privilege by role/permission.
- Log critical events for auditability.

### API Roadmap

- Publish initial OpenAPI specification.
- Define authentication and scope-based authorization.
- Introduce explicit versioning (`/v1`, `/v2`).
