# Implantacao / Deployment


Este documento define o processo de implantacao do **GOV-GB** em ambientes controlados.

### Ambientes

- `local`: desenvolvimento e validacao inicial.
- `staging`: homologacao tecnica e funcional.
- `production`: uso institucional.

### Pre-requisitos

- `Node.js 20+`
- `npm`
- Variaveis de ambiente configuradas:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Fluxo de Deploy (Padrao)

1. Executar validacoes locais:
   - `npm ci`
   - `npm run lint`
   - `npm run build`
2. Publicar artefato (container ou plataforma alvo).
3. Aplicar migracoes SQL quando necessario.
4. Validar rotas criticas e telemetria basica.

### Deploy com Docker

Build:

```bash
docker build -t gov-gb .
```

Run:

```bash
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA \
  gov-gb
```

### Checklist de Release

- Build sem erros.
- Lint sem erros criticos.
- Variaveis de ambiente corretas.
- Migracoes aplicadas e validadas.
- Rotas `/`, `/demo`, `/demo/NHA`, `/demo/ussd`, `/demo/dashboard` funcionais.

### Rollback

Em caso de regressao:

1. Reverter para versao estavel anterior.
2. Reaplicar configuracoes conhecidas.
3. Registrar incidente e causa raiz.
4. Corrigir antes de novo rollout.

