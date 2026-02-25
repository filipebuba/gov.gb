# Security Policy


This document describes how to report vulnerabilities in **GOV-GB** and the project's security principles.

### Scope

This policy covers:

- Web application (`src/`)
- Infrastructure and deployment configuration
- Scripts and SQL in `supabase/`

### Reporting Vulnerabilities

If you discover a vulnerability:

1. Do **not** open a public issue with sensitive details.
2. Email: `security@gov.gb` (placeholder).
3. Include:
   - technical description;
   - reproduction steps;
   - potential impact;
   - suggested mitigation (if available).

### Response Process

- Acknowledgment: within **72 hours**.
- Initial triage and severity assessment: within **7 days**.
- Fix plan and communication: based on risk and complexity.
- Public disclosure: after remediation and validation.

### Security Best Practices

- Never commit secrets or private keys.
- Use environment variables for credentials.
- Validate and sanitize user input.
- Apply least privilege in database access.
- Keep dependencies updated and review security advisories.

### Out of Scope

- Issues in local environments that cannot be reproduced.
- Reports without clear reproduction steps.
- Findings without practical security impact.
