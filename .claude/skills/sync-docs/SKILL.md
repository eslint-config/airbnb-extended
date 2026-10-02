---
name: sync-docs
description: Check that the VitePress docs in docs/ match the real exports, rules and CLI options in the code, then fix any drift. Use after changing public exports, rule sets, plugins or CLI flags, or when asked to audit the docs.
---

# Sync docs with code

The docs site lives in `docs/` (VitePress). Treat the code as the source of truth. Fix the docs to match it. If the code looks wrong instead, say so and ask before changing code.

## 1. Compare each area

| Docs page                                   | Source of truth                                                                                                |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `docs/config/extended-config/configs.md`    | `packages/eslint-config-airbnb-extended/configs/*/index.ts` and `*/recommended.ts`, `*/typescript.ts`          |
| `docs/config/extended-config/rules.md`      | `configs/*/config.ts` and `configs/*/configExtended.ts` (these build `rules`)                                  |
| `docs/config/extended-config/extensions.md` | `extensions/*/index.ts`                                                                                        |
| `docs/config/extended-config/plugins.md`    | `plugins/index.ts`                                                                                             |
| `docs/config/extended-config/helpers.md`    | `helpers/index.ts`, `helpers/*.ts`, `utils/extensions.ts`                                                      |
| `docs/customization/strict-rules.md`        | `rules/importsStrict.ts`, `rules/react/reactStrict.ts`, `rules/typescript/typescriptEslintStrict.ts`           |
| `docs/config/legacy-config.md`              | `legacy/configs/**/index.ts`, `legacy/rules/index.ts`                                                          |
| `docs/config/packages-used.md`              | `dependencies` in `packages/eslint-config-airbnb-extended/package.json`                                        |
| `docs/cli/options.md`                       | `packages/create-airbnb-x-config/constants/common/common.ts`, `helpers/getProgramOptions/getProgramOptions.ts` |
| `docs/cli/guide.md`                         | `packages/create-airbnb-x-config/index.ts` (prompts), `helpers/getCommands/getCommands.ts` (install command)   |

For each one, check:

- Every export key in code appears in the docs, and the docs list no key that doesn't exist.
- Code examples would actually run. They import from `'eslint-config-airbnb-extended'` (never `@/...`) and use real key paths, e.g. `helpers.extensions.jsFiles`, not `helpers.jsFiles`.
- Claims about behavior match the code (e.g. "strict imports include X" means X is really in `importsStrict.ts`).
- Counts and lists in prose match ("five main exports").

## 2. Check site-wide items

- Every `.md` page under `docs/` (except `index.md`) has a `description` in its frontmatter.
- Every page has a sidebar entry in `docs/.vitepress/config.ts`, and every sidebar link points to a real page.
- The contributing guide says PRs go against `canary`.

## 3. Verify

`pnpm build` must run first, because docs lint imports the built config package.

```bash
pnpm build
pnpm script:lint --filter=@airbnb-extended/docs
pnpm docs:build
```

## 4. Report

List each mismatch you found as `file:line → what was wrong → what you changed`. List any code bugs separately, without fixing them.
