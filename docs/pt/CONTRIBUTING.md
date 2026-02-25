# Guia de Contribuicao / Contributing Guide


Obrigado pelo interesse em contribuir com o **GOV-GB**! Este projeto visa construir infraestrutura digital publica para a Guine-Bissau, e toda contribuicao e bem-vinda.

### Como Contribuir

#### 1. Reportar Problemas (Issues)

- Use o [GitHub Issues](https://github.com/anthropics/gov.gb/issues) para reportar bugs ou sugerir melhorias.
- Antes de criar uma issue, verifique se ja existe uma semelhante.
- Inclua o maximo de detalhes possivel: passos para reproduzir, comportamento esperado, screenshots.

#### 2. Propor Mudancas (Pull Requests)

1. **Fork** o repositorio.
2. Crie uma branch a partir de `main`:
   ```bash
   git checkout -b feat/minha-funcionalidade
   ```
3. Faca as suas alteracoes seguindo as convencoes do projeto.
4. Teste localmente:
   ```bash
   npm ci
   npm run lint
   npm run build
   ```
5. Faca commit com mensagens claras:
   ```bash
   git commit -m "feat: descricao curta da mudanca"
   ```
6. Envie a branch e abra um Pull Request.

#### 3. Convencoes de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

| Prefixo    | Uso                                      |
| ---------- | ---------------------------------------- |
| `feat:`    | Nova funcionalidade                      |
| `fix:`     | Correcao de bug                          |
| `docs:`    | Apenas documentacao                      |
| `style:`   | Formatacao (sem mudanca de logica)        |
| `refactor:`| Refatoracao de codigo                    |
| `test:`    | Adicao ou correcao de testes             |
| `chore:`   | Tarefas de manutencao (build, deps, etc) |

#### 4. Padroes de Codigo

- **TypeScript** obrigatorio para todo codigo novo.
- **ESLint** deve passar sem erros (`npm run lint`).
- Componentes React usam convencoes do **shadcn/ui**.
- Estilos via **Tailwind CSS** (evitar CSS customizado).
- Nomes de variaveis e funcoes em **ingles**.
- Comentarios e documentacao podem ser em **portugues ou ingles**.

#### 5. Estrutura de Branches

| Branch   | Proposito                          |
| -------- | ---------------------------------- |
| `main`   | Codigo estavel de producao         |
| `feat/*` | Novas funcionalidades              |
| `fix/*`  | Correcoes de bugs                  |
| `docs/*` | Alteracoes de documentacao         |

#### 6. Ambiente de Desenvolvimento

```bash
# Clonar o repositorio
git clone https://github.com/anthropics/gov.gb.git
cd gov.gb

# Instalar dependencias
npm ci

# Configurar variaveis de ambiente
cp .env.example .env.local
# Editar .env.local com suas credenciais Supabase

# Iniciar servidor de desenvolvimento
npm run dev
```

**Requisitos:** Node.js 20+, npm

#### 7. Idiomas e Traducoes

O projeto suporta 4 idiomas: Portugues (`pt`), Ingles (`en`), Kriolu (`kr`), Frances (`fr`).

Traducoes ficam em `src/lib/i18n/dictionaries.ts`. Ao adicionar texto visivel ao usuario, adicione a traducao em todos os 4 idiomas.

#### 8. Revisao de Codigo

Todas as contribuicoes passam por revisao. Buscamos:

- Codigo limpo e legivel.
- Sem vulnerabilidades de seguranca.
- Compatibilidade com arquitetura offline-first.
- Traducoes em todos os idiomas suportados.

