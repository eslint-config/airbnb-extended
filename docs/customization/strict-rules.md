---
title: 'Strict Rules: Imports, React, TypeScript'
description: 'Enable optional strict Airbnb ESLint rules for imports, React and TypeScript for tighter type safety and consistency.'
---

# Strict Rules {#strict-rules}

The `eslint-config-airbnb-extended` package comes with a set of **stricter ESLint rules** for `Imports`, `React`, and `TypeScript` that go beyond the default configuration.

By default, these rules are **not enabled**, so you can choose whether your project needs them. They are best suited for teams that want **maximum consistency, fewer edge-case bugs, and stronger guarantees** around code quality.

## How to Enable Strict Rules {#enable-strict-rules}

To enable strict rules, import them directly from the package:

::: code-group

```ts [eslint.config.mjs]
import { rules } from 'eslint-config-airbnb-extended';
```

:::

Then extend them in your ESLint configuration file (`eslint.config.mjs`):

::: code-group

```ts [eslint.config.mjs]
export default [
  // Your existing configs
  rules.base.importsStrict,
  rules.react.strict,
  rules.typescript.typescriptEslintStrict,
];
```

:::

This setup ensures that the strict rules are applied on top of your current configuration, without losing flexibility to override them later.

## What Do These Strict Rules Include? {#what-strict-rules-include}

#### 1. Strict Imports {#strict-imports-rules}

These rules are designed to keep your imports **organized, efficient, and predictable**.
Key features include:

- Enforcing a consistent and logical import order (e.g., external → internal → local modules), with type imports grouped separately.
- Differentiating clearly between **type imports** (`import type`) and **value imports**.
- Disallowing namespace imports (`import * as foo`).
- Disallowing anonymous default exports, so every export has a searchable name.

This ensures your codebase remains **clean and easy to navigate**, even as it scales.

---

#### 2. Strict React {#strict-react-rules}

These rules ensure React code stays **readable, predictable, and TypeScript-friendly**.
Key features include:

- Enforcing `key` props on list-rendered elements to prevent rendering bugs.
- Sorting JSX props for consistent readability across components.
- Disabling `prop-types` since TypeScript provides stronger typing guarantees.
- and many more...

This results in **more consistent React components** and fewer runtime issues.

---

#### 3. Strict TypeScript ESLint {#strict-typescript-rules}

These rules encourage **best practices in TypeScript** and protect against unsafe patterns.
Key features include:

- Disallowing `@ts-ignore` in favor of `@ts-expect-error`, making ignored errors intentional and visible.
- Banning the use of `any` to maintain strict typing guarantees.
- Disallowing non-null assertions (`!`) that can hide potential runtime errors.
- Encouraging modern TypeScript features like the **Nullish Coalescing Operator (`??`)** and **Optional Chaining (`?.`)**.
- and many more...

This keeps your TypeScript code **robust, maintainable, and future-proof**.

## When To Use Strict Rules? {#when-to-use-strict-rules}

Strict Rules is **ideal for teams or projects** that:

- Want maximum consistency across the codebase.
- Need stricter guarantees around type safety and React usage.
- Prefer a **"lint-first, catch bugs early"** development philosophy.

If your team values flexibility and faster prototyping, the default configuration may be sufficient. But if your goal is **production-grade reliability and long-term maintainability**, enabling Strict Rules is highly recommended.
