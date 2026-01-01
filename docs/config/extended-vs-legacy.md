# Extended vs Legacy {#extended-vs-legacy}

`eslint-config-airbnb-extended` ships in two flavors. Both are **flat-config only** (no `.eslintrc*`) and work great with TypeScript, what differs is their philosophy and how opinionated they are.

::: tip NOTE

This package doesn’t support `.eslintrc*`. If you’re still on legacy config files, migrate to `eslint.config.mjs` first. See [migration guide](../migration/upgrade-to-extended) for detailed information.

:::

## Overview {#overview}

| Aspect     | **Extended**                                                                                   | **Legacy**                                                                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Purpose    | Modern, TypeScript-first, opinionated defaults for new and existing codebases                  | Provide **drop-in replacement** of the original Airbnb ESLint configurations using the new flat config format.                                |
| Strictness | Tighter defaults out of the box, pairs nicely with the optional **Strict Rules** add-on        | Conservative defaults, easier drop-in when migrating from old Airbnb configs                                                                  |
| TypeScript | Fully supported, encourages TS-aware patterns                                                  | Fully supported, fewer extra opinions                                                                                                         |
| Imports    | Uses `eslint-plugin-import-x` (faster fork of `eslint-plugin-import`) for modern import checks | Uses `eslint-plugin-import` to keep migration noise low                                                                                       |
| Styling    | Uses **ESLint Stylistic** for formatting-style rules you can autofix and tune                  | Uses `deprecated` ESLint styling rules for easy migration                                                                                     |
| Best for   | Teams who want a maintained, modernized successor to Airbnb with sensible opinions             | Teams moving from `airbnb`, `airbnb-base`, or `airbnb-typescript` configs who want to keep the same behavior initially and improve gradually. |

## Which one should I choose? {#which-one-i-choose}

Choose **Extended** if you:

- are starting fresh or ready to modernize,
- looking for TypeScript-aware checks along with a cleaner, more consistent import and style setup,
- plan to enable the **Strict Rules** bundle later for even tighter consistency.

Choose **Legacy** if you:

- are migrating from `airbnb`, `airbnb-base`, or `airbnb-typescript` configs and want minimal diffs first,
- have a large codebase and prefer a gentler, low-friction transition path,
- plan to adopt the Extended (or Strict rules) opinions gradually after migration.
