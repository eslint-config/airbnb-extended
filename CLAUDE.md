# CLAUDE.md

Guidance for Claude Code (and any AI coding agent) working in this repository.

This is an **open source project**. Most people opening it are outside contributors. Keep changes small, focused and easy to review.

## What this project is

`eslint-config-airbnb-extended` is a maintained successor to the unmaintained Airbnb ESLint configs (`eslint-config-airbnb`, `eslint-config-airbnb-base`, `eslint-config-airbnb-typescript`). It supports:

- ESLint 9+ **flat config only**. Legacy `.eslintrc*` is not supported.
- TypeScript, React, Next.js and Node.
- All plugins bundled ("batteries included"). Users install only `eslint` and this package.

Docs: https://eslint-airbnb-extended.nishargshah.dev (source in `docs/`).

## Repo layout

pnpm monorepo (`pnpm-workspace.yaml`):

| Path                                     | Package                               | Purpose                                                               |
| ---------------------------------------- | ------------------------------------- | --------------------------------------------------------------------- |
| `packages/eslint-config-airbnb-extended` | `eslint-config-airbnb-extended` (npm) | The ESLint config                                                     |
| `packages/create-airbnb-x-config`        | `create-airbnb-x-config` (npm)        | CLI that writes an `eslint.config.mjs` into a user's project          |
| `apps/build-templates`                   | private                               | Generates the `eslint.config.mjs` templates the CLI downloads         |
| `docs`                                   | private                               | VitePress docs site                                                   |
| `configs/*`                              | private                               | Shared eslint / prettier / lint-staged / tsconfig for every workspace |

## Branches and PRs

- **Always open PRs against `canary`.** Never target `master`.
- `master` holds released code. The CLI downloads templates from `master`, so template changes reach users only after a release.
- Fill in `.github/pull_request_template.md`.
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, ...

## Setup and commands

Use **pnpm only**. npm and yarn are blocked in `engines`. The Node version is in `.nvmrc`. The pnpm version is in `packageManager` in the root `package.json`.

```bash
pnpm install
pnpm build                  # build all workspaces (lint needs this: shared lint config imports the built package)
pnpm config:build           # build only the ESLint config package
pnpm cli:dev                # run the CLI from source
pnpm templates:build        # regenerate apps/build-templates/templates
pnpm docs:dev               # docs dev server
pnpm lint / pnpm lint:fix
pnpm format / pnpm format:fix
pnpm typecheck
pnpm script:lint --for=check                                      # prettier + eslint + tsc (pre-push hook)
pnpm script:lint --for=ci                                         # what CI runs, after `pnpm build`
pnpm script:lint --filter=create-airbnb-x-config --no-typecheck   # one workspace only
pnpm lint:inspector                                               # open @eslint/config-inspector
```

There is **no test suite**. A change is valid when build, lint, format and typecheck all pass. CI (`.github/workflows/validate-pr.yml`) runs `pnpm build` then `pnpm script:lint --for=ci`.

Git hooks: pre-commit runs `lint-staged`, pre-push runs `script:lint --for=check`.

## ESLint config package

Path: `packages/eslint-config-airbnb-extended`. Built with tsdown from two entries:

- `index.ts` → `eslint-config-airbnb-extended` (Extended config)
- `legacy.ts` → `eslint-config-airbnb-extended/legacy` (Legacy config)

Imports use the `@/` alias for the package root.

### Public API (`index.ts`)

| Export       | Shape                                                                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `configs`    | `configs.{base,react,next}.{recommended,typescript,all}`, `configs.node.recommended`                                                                                                    |
| `rules`      | `rules.base.*`, `rules.node.*`, `rules.react.*`, `rules.next.*`, `rules.typescript.*` (includes strict sets: `base.importsStrict`, `react.strict`, `typescript.typescriptEslintStrict`) |
| `extensions` | `extensions.{base,react}.{recommended,typescript}`, `extensions.{next,node}.recommended`                                                                                                |
| `plugins`    | `stylistic`, `importX`, `node`, `react`, `reactA11y`, `reactHooks`, `next`, `typescriptEslint`                                                                                          |
| `helpers`    | `extensions`, `getDevDepsList`, `getImportSettings`, `createAutoTypeScriptImportResolver`                                                                                               |

Changing any key here is a **breaking change** for users.

### Layers (low to high)

1. `plugins/`: wraps each third-party plugin as a config object. Plugins are kept separate from rules so users never hit "Cannot redefine plugin".
2. `rules/`: one file per rule group. Many files also export `deprecated*` and `experimental*` sets next to the active one.
3. `extensions/`: parser options, import resolver settings and file globs per target.
4. `configs/`: `rules + extensions = config`.
5. `helpers/`: public helpers. `getStylisticLegacyConfig` also lives here but is internal only.

### Rule file conventions

Every rule has a one-line comment and a docs link above it:

```ts
// Prevent usage of <head> element.
// https://nextjs.org/docs/messages/no-head-element
'@next/next/no-head-element': 'warn',
```

Keep rules in the same order as the surrounding rules (usually alphabetical).

### Plugin update check (common build failure)

`script/checkUpdates.ts` runs as `prebuild`. It compares the rules listed in `rules/` (active + `deprecated*` + `experimental*`) with each plugin's real rule list. **The build fails when a plugin adds or removes a rule**, for example:

```
Error: Next Plugin Updated with no-location-assign-relative-destination
```

Fix it by adding the rule (with comment + link) to the matching `rules/` file, or to its `deprecated*` set if the plugin deprecated it. See the `add-plugin-rule` skill in `.claude/skills/`.

### Legacy config

`legacy/` mirrors the original Airbnb packages one-to-one. Its purpose is parity, so **do not change legacy rule values** to "improve" them. New opinions go in the Extended config.

## CLI and templates

- `create-airbnb-x-config` asks questions (or reads flags), builds a template path such as `react/prettier/ts/strict/import-typescript/eslint.config.mjs`, and downloads that file from GitHub (`baseGithubRawUrl` in `packages/create-airbnb-x-config/constants/common/common.ts`). Path logic lives in `helpers/getConfigUrl`.
- CLI flags and their values live in `constants/common/common.ts` and `helpers/getProgramOptions`.
- `apps/build-templates` imports the CLI's constants and types through `@cli/constants` and `@cli/types`, so option names have one source of truth.
- Templates are **generated**. Change the generator in `apps/build-templates/lib/`, run `pnpm templates:build`, and commit the output. Never hand-edit files in `templates/`.

## Docs must stay in sync

Most code changes need a docs change. Check this table before you finish:

| If you change...                                               | Update...                                                                |
| -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Keys in `configs`, `rules`, `extensions`, `plugins`, `helpers` | `docs/config/extended-config/*.md`                                       |
| Strict rule sets                                               | `docs/customization/strict-rules.md`                                     |
| Legacy exports                                                 | `docs/config/legacy-config.md`                                           |
| CLI flags, prompts or install command                          | `docs/cli/guide.md`, `docs/cli/options.md`                               |
| Bundled plugins / dependencies                                 | `docs/config/packages-used.md`, `docs/config/extended-config/plugins.md` |
| Breaking changes                                               | `docs/migration/*`                                                       |

Docs rules:

- Code examples must use the public import (`from 'eslint-config-airbnb-extended'`), never the internal `@/` alias.
- Every page has a `description` in its frontmatter (used for SEO). Add one to new pages.
- New pages need a sidebar entry in `docs/.vitepress/config.ts`.

The `sync-docs` skill in `.claude/skills/` walks through a full check.

## Releases

Changesets (`.changeset/config.json`) keep both npm packages on the same version (`fixed`). Maintainers release with `pnpm pkg:prepare` then `pnpm pkg:publish`. Contributors do not need to publish.

## Don'ts

- Don't use npm or yarn.
- Don't commit `dist/` or `docs/.vitepress/dist`.
- Don't hand-edit generated templates.
- Don't add `.eslintrc*` support.
- Don't change public export keys or legacy rule values without a maintainer agreeing in an issue first.
