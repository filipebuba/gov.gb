# API e Integracoes / API and Integrations


Este documento define os contratos de integracao do **GOV-GB**.

### Estado Atual

No estado atual, o projeto opera majoritariamente com dados de demonstracao locais e estrutura SQL no `Supabase`.

### Integracao com Supabase

- Cliente browser: `src/lib/supabase/client.ts`
- Cliente server: `src/lib/supabase/server.ts`
- Schema inicial: `supabase/migrations/001_initial_schema.sql`
- Dados de seed: `supabase/seed.sql`

### Diretrizes de API

- Versionar contratos quando houver endpoints publicos.
- Manter naming consistente e tipado em TypeScript.
- Validar entrada e saida de dados.
- Evitar breaking changes sem plano de migracao.

### Modelo de Resposta (Recomendado)

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

### Seguranca de Integracao

- Nao expor chaves sensiveis no frontend.
- Aplicar principio de menor privilegio por papel/permissao.
- Registrar eventos criticos para auditoria.

### Roadmap de API

- Publicar especificacao OpenAPI inicial.
- Definir autenticacao e autorizacao por escopo.
- Introduzir versionamento explicito (`/v1`, `/v2`).

