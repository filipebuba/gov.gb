# Deployment


This document defines the **GOV-GB** deployment process across controlled environments.

### Environments

- `local`: development and initial validation.
- `staging`: technical and functional verification.
- `production`: institutional usage.

### Prerequisites

- `Node.js 20+`
- `npm`
- Environment variables configured:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Standard Deployment Flow

1. Run local validations:
   - `npm ci`
   - `npm run lint`
   - `npm run build`
2. Publish artifact (container or target platform).
3. Apply SQL migrations when required.
4. Validate critical routes and baseline telemetry.

### Docker Deployment

Build:

```bash
docker build -t gov-gb .
```

Run:

```bash
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_KEY \
  gov-gb
```

### Release Checklist

- Clean build.
- Lint with no critical errors.
- Correct environment variables.
- Applied and validated migrations.
- Working routes: `/`, `/demo`, `/demo/simenti`, `/demo/ussd`, `/demo/dashboard`.

### Rollback

If a regression happens:

1. Revert to the last stable version.
2. Reapply known-good configuration.
3. Log incident and root cause.
4. Fix before next rollout.
