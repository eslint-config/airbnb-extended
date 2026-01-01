# Legacy Config {#legacy-config}

The **Legacy Config** is designed for teams who want a **One-To-One/Drop-In Replacement** for the original Airbnb ESLint configs, but with support for **Flat Config** (ESLint 9+).

Instead of rewriting rules, this mode focuses on **parity and smooth migration**. If your team already uses:

- `eslint-config-airbnb`
- `eslint-config-airbnb-base`
- `eslint-config-airbnb-typescript`

You can switch to `eslint-config-airbnb-extended/legacy` with **minimal diffs** while being future-ready.

## Overview {#overview}

The `legacy` entrypoint provides:

- **Configs** → Predefined sets of rules that map directly to the Airbnb family.
- **Rules** → Core rule groups that enforce good coding practices and are used in configs.

This ensures your project setup is familiar, stable, and ESLint 9-ready.

## Configs {#configs}

The configs mirror the original Airbnb packages, making migration straightforward.

### 1. For [`eslint-config-airbnb-base`](https://www.npmjs.com/package/eslint-config-airbnb-base) {#for-eslint-config-airbnb-base}

Use this if you want **only JavaScript base rules** without React or TypeScript.

::: code-group

```ts [eslint.config.mjs]
import { configs } from 'eslint-config-airbnb-extended/legacy';

// Equivalent to airbnb-base/legacy
export default [...configs.base.legacy];

// Equivalent to airbnb-base
export default [...configs.base.recommended];
```

:::

### 2. For [`eslint-config-airbnb`](https://www.npmjs.com/package/eslint-config-airbnb) {#for-eslint-config-airbnb}

Use this when working with **React**. It provides a one-to-one mapping with all the standard Airbnb React presets, including `hooks`.

::: code-group

```ts [eslint.config.mjs]
import { configs } from 'eslint-config-airbnb-extended/legacy';

// Equivalent to airbnb/legacy
export default [...configs.react.legacy];

// Equivalent to airbnb/base
export default [...configs.react.base];

// Equivalent to airbnb
export default [...configs.react.recommended];

// Equivalent to airbnb/hooks
export default [...configs.react.hooks];
```

:::

### 3. For [`eslint-config-airbnb-typescript`](https://www.npmjs.com/package/eslint-config-airbnb-typescript) {#for-eslint-config-airbnb-typescript}

Use this if you’re on **TypeScript** and want the Airbnb TypeScript rules, but in **Flat Config format** without breaking compatibility.

::: code-group

```ts [eslint.config.mjs]
import { configs } from 'eslint-config-airbnb-extended/legacy';

// Equivalent to airbnb-typescript/base
export default [...configs.base.typescript];

// Equivalent to airbnb-typescript
export default [...configs.react.typescript];
```

:::

## Rules {#rules}

The `rules` are the building blocks of `configs`. Each config combines these rule groups.

### Base Rules {#base-rules}

| Rule Group         | Description                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| **Best Practices** | Enforces common best practices to improve code quality and maintainability. |
| **Errors**         | Helps catch runtime errors and unsafe patterns early.                       |
| **ES6**            | Provides rules specific to ES6+ syntax and features.                        |
| **Imports**        | Ensures proper import/export usage with `eslint-plugin-import`.             |
| **Node**           | Includes Node.js-specific rules for server-side development.                |
| **Strict**         | Enables strict mode rules.                                                  |
| **Style**          | Covers general code style rules such as spacing, quotes, and semicolons.    |
| **Variables**      | Validates variable declarations, usage, and scoping rules.                  |

### React Rules {#react-rules}

| Rule Group            | Description                                                         |
| --------------------- | ------------------------------------------------------------------- |
| **Base**              | Core React rules for JSX and component structure.                   |
| **JSX Accessibility** | Accessibility rules via `eslint-plugin-jsx-a11y` for inclusive UIs. |
| **Hooks**             | Rules from `eslint-plugin-react-hooks` ensuring proper hook usage.  |

### TypeScript Rules {#typescript-rules}

| Rule Group    | Description                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------- |
| **Base**      | Core TypeScript linting rules for types, syntax, and consistency.                                          |
| **Overrides** | Adjusts ESLint by disabling rules covered by TypeScript and enabling ones that benefit from type-checking. |
| **Settings**  | Additional config values for TypeScript resolver and parser options.                                       |

## Why Legacy Config Exists {#why-legacy-config-exists}

- **1:1 replacements** → drop-in equivalents of Airbnb configs.
- **Flat Config ready** → works with ESLint 9 and beyond.
- **Migration path** → lets you start simple, then move to `extended` or `strict` configs later.
- **Less churn** → developers see fewer rule changes when upgrading.

If you’re upgrading a project that **already relies on Airbnb configs**, start with **Legacy Config** to make the transition safe and low-friction. Once you’re stable, you can move on to **Extended** (modernized rules) or even **Strict Mode** for maximum consistency.
