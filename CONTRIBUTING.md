# Guia de Contribuicao / Contributing Guide

> Guias completos:
> PT: `docs/pt/CONTRIBUTING.md` | EN: `docs/en/CONTRIBUTING.md`

## Portugues

### Como contribuir

1. Abra uma issue descrevendo bug/melhoria.
2. Crie branch a partir de `main` (`feat/*`, `fix/*`, `docs/*`).
3. Implemente e valide localmente:
   - `npm ci`
   - `npm run lint`
   - `npm run build`
4. Abra Pull Request com contexto, impacto e testes executados.

### Como abrir issues

- Use titulo objetivo e reproduzivel.
- Inclua passos para reproduzir, resultado esperado e resultado atual.
- Quando possivel, adicione screenshot/logs e ambiente (OS, Node, navegador).

### Padrao de codigo

- TypeScript obrigatorio para codigo novo.
- ESLint sem erros.
- Nomes de variaveis/funcoes em ingles.
- UI e estilos seguindo convencoes do projeto (React + Tailwind).
- Commits no padrao Conventional Commits (`feat:`, `fix:`, `docs:`, etc.).

## English

### How to contribute

1. Open an issue describing the bug/improvement.
2. Create a branch from `main` (`feat/*`, `fix/*`, `docs/*`).
3. Implement and validate locally:
   - `npm ci`
   - `npm run lint`
   - `npm run build`
4. Open a Pull Request with context, impact, and tests executed.

### How to open issues

- Use a clear and reproducible title.
- Include repro steps, expected result, and current result.
- When possible, add screenshots/logs and environment details (OS, Node, browser).

### Code standards

- TypeScript is required for new code.
- ESLint must pass with no errors.
- Variable/function names in English.
- UI and styling should follow project conventions (React + Tailwind).
- Use Conventional Commits (`feat:`, `fix:`, `docs:`, etc.).
