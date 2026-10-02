---
name: add-plugin-rule
description: Fix the "<Plugin> Updated with <rule>" build error from script/checkUpdates.ts by adding a new or deprecated plugin rule to the right rules/ file. Use when `pnpm build` or `pnpm config:build` fails in the prebuild check, or after upgrading an ESLint plugin.
---

# Add a new plugin rule

`packages/eslint-config-airbnb-extended/script/checkUpdates.ts` runs before every build. It fails when a bundled plugin adds or removes a rule that our `rules/` files don't list.

## 1. Find the rule

Run the check on its own:

```bash
pnpm --filter eslint-config-airbnb-extended check:updates
```

The error names the plugin and rule, e.g. `Next Plugin Updated with no-location-assign-relative-destination`. It stops at the first plugin that fails, so run it again after each fix.

## 2. Learn what the rule does

Read the rule's docs and source in `node_modules` (e.g. `meta.docs.description`, `meta.docs.url`, `meta.deprecated`). Don't guess.

## 3. Pick the file

Look in `script/checkUpdates.ts` to see which rule objects are checked for that plugin. Then:

| Rule state               | Put it in                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| Active                   | The matching active set, e.g. `nextBaseRules` in `rules/next/nextBase.ts`                |
| Deprecated by the plugin | The `deprecated*` set in the same file (e.g. `deprecatedReactBaseRules`), set to `'off'` |
| Experimental (stylistic) | The `experimental*` set, if the file has one                                             |

Only touch `rules/` for the Extended config. **Never change `legacy/`**, which mirrors the original Airbnb configs one-to-one.

## 4. Add the rule

Match the existing style: one-line comment, docs link, then the rule. Keep the order of nearby rules.

```ts
// Prevent usage of <head> element.
// https://nextjs.org/docs/messages/no-head-element
'@next/next/no-head-element': 'warn',
```

Choosing the level:

- Follow the plugin's own `recommended` config when it has one.
- Use `'off'` when the rule needs type info we don't enable, or clearly clashes with Airbnb style.
- If unsure, use the plugin's recommended level and say so in the PR description. The maintainer decides.

## 5. Verify

```bash
pnpm config:build
pnpm script:lint --filter=eslint-config-airbnb-extended
```

If a new rule changes behavior users will see, mention it in the PR and check whether `docs/` needs an update.
