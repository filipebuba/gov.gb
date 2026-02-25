# Contributing Guide


Thank you for your interest in contributing to **GOV-GB**! This project aims to build digital public infrastructure for Guinea-Bissau, and all contributions are welcome.

### How to Contribute

#### 1. Reporting Issues

- Use [GitHub Issues](https://github.com/anthropics/gov.gb/issues) to report bugs or suggest improvements.
- Check for existing similar issues before creating a new one.
- Include as many details as possible: steps to reproduce, expected behavior, screenshots.

#### 2. Submitting Pull Requests

1. **Fork** the repository.
2. Create a branch from `main`:
   ```bash
   git checkout -b feat/my-feature
   ```
3. Make your changes following project conventions.
4. Test locally:
   ```bash
   npm ci
   npm run lint
   npm run build
   ```
5. Commit with clear messages:
   ```bash
   git commit -m "feat: short description of change"
   ```
6. Push your branch and open a Pull Request.

#### 3. Commit Conventions

We use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix     | Usage                                |
| ---------- | ------------------------------------ |
| `feat:`    | New feature                          |
| `fix:`     | Bug fix                              |
| `docs:`    | Documentation only                   |
| `style:`   | Formatting (no logic change)         |
| `refactor:`| Code refactoring                     |
| `test:`    | Adding or fixing tests               |
| `chore:`   | Maintenance (build, deps, etc)       |

#### 4. Code Standards

- **TypeScript** is required for all new code.
- **ESLint** must pass without errors (`npm run lint`).
- React components follow **shadcn/ui** conventions.
- Styles via **Tailwind CSS** (avoid custom CSS).
- Variable and function names in **English**.
- Comments and documentation may be in **Portuguese or English**.

#### 5. Branch Naming

| Branch   | Purpose                            |
| -------- | ---------------------------------- |
| `main`   | Stable production code             |
| `feat/*` | New features                       |
| `fix/*`  | Bug fixes                          |
| `docs/*` | Documentation changes              |

#### 6. Development Setup

```bash
# Clone the repository
git clone https://github.com/anthropics/gov.gb.git
cd gov.gb

# Install dependencies
npm ci

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

**Requirements:** Node.js 20+, npm

#### 7. Languages and Translations

The project supports 4 languages: Portuguese (`pt`), English (`en`), Kriolu (`kr`), French (`fr`).

Translations are in `src/lib/i18n/dictionaries.ts`. When adding user-facing text, include translations in all 4 languages.

#### 8. Code Review

All contributions go through review. We look for:

- Clean and readable code.
- No security vulnerabilities.
- Compatibility with offline-first architecture.
- Translations in all supported languages.
