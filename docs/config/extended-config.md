# Extended Config {#extended-config}

The **Extended config** is a modern version of Airbnb’s ESLint setup, built for today’s **TypeScript** and **JavaScript** projects. It uses the latest **Flat Config format**, adds better support for **imports**, **styles**, and **TypeScript**, and is fully ready for **ESLint 9+**.

## Features {#features}

- **Optional Strict Rules** → Turn on extra checks for **imports**, **React**, and **TypeScript** when needed. See [Strict Rules](../customization/strict-rules.md).
- **Smarter Imports** → Uses `eslint-plugin-import-x` to detect invalid imports, enforce import order, and provide better TypeScript support compared to the old `eslint-plugin-import`.
- **Consistent Code Style** → Uses `@stylistic/eslint-plugin` for spacing, quotes, semicolons, and indentation. Replaces deprecated ESLint style rules.
- **Modern Node Support** → Replaces deprecated ESLint Node rules with `eslint-plugin-n`.
- **Next.js Best Practices** → Uses `@next/eslint-plugin-next` to enforce Next.js standards, catch common issues, and promote performance optimizations.
- **TypeScript Path Aliases** → Built-in `eslint-import-resolver-typescript` support for `tsconfig.json` paths to prevent false-positive import errors.

## Overview {#overview}

The **Extended package** in `eslint-config-airbnb-extended` provides four main exports:

- **Rules** → Core rule groups that enforce good coding practices and are used in configs.
- **Plugins** → External ESLint plugins used to power specific rules (e.g., React, TypeScript, Next.js).
- **Extensions** → Helper layers that bring together rules, parsers, and settings from recommended configs so you can build your own base config with full customization.
- **Configs** → Predefined sets of rules (built from rules + extensions) that map directly to the Airbnb family.

## Rules {#rules}

The `rules` are the **building blocks** of each config. Every config is just a collection of these rule groups.

### Base Rules {#base-rules}

| Rule Group         | Description                                                                  |
| ------------------ | ---------------------------------------------------------------------------- |
| **Best Practices** | Enforces common best practices to improve code quality and maintainability.  |
| **Errors**         | Helps catch runtime errors and unsafe patterns early.                        |
| **ES6**            | Provides rules specific to ES6+ syntax and features.                         |
| **Imports**        | Ensures proper import/export usage with `eslint-plugin-import`.              |
| **Imports Strict** | See [Strict Imports](../customization/strict-rules.md#strict-imports-rules). |
| **Strict**         | Enables strict mode rules.                                                   |
| **Style**          | Covers general code style rules such as spacing, quotes, and semicolons.     |
| **Stylistic**      | Uses `@stylistic/eslint-plugin` for consistent formatting.                   |
| **Variables**      | Validates variable declarations, usage, and scoping rules.                   |

### Node Rules {#node-rules}

| Rule Group                  | Description                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------- |
| **Base**                    | Core Node.js linting rules.                                                                     |
| **Globals**                 | Enforces using Node.js globals such as `console` and `process` directly without requiring them. |
| **Promises**                | Enforces using promise based variants of core modules such as `fs` and `dns` variant.           |
| **No Unsupported Features** | Prevents usage of Node features not supported in your target version.                           |

### React Rules {#react-rules}

| Rule Group            | Description                                                              |
| --------------------- | ------------------------------------------------------------------------ |
| **Base**              | Core React rules for JSX and component structure.                        |
| **JSX Accessibility** | Accessibility rules via `eslint-plugin-jsx-a11y` for inclusive UIs.      |
| **Hooks**             | Rules from `eslint-plugin-react-hooks` ensuring proper hook usage.       |
| **Stylistic**         | Ensures consistent styling inside JSX and React code.                    |
| **React Strict**      | See [Strict React](../customization/strict-rules.md#strict-react-rules). |

### Next.js Rules {#nextjs-rules}

| Rule Group          | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| **Base**            | Applies general Next.js linting best practices.                        |
| **Core Web Vitals** | Enforces performance and SEO improvements recommended by Next.js team. |

### TypeScript Rules {#typescript-rules}

| Rule Group                   | Description                                                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Base**                     | Adjusts ESLint by disabling rules covered by TypeScript and enabling ones that benefit from type-checking.                              |
| **Stylistic**                | Uses `@stylistic/eslint-plugin` to enforce consistent TypeScript code formatting.                                                       |
| **TypeScript ESLint**        | Rules powered by `typescript-eslint`.                                                                                                   |
| **Imports**                  | Activates `eslint-plugin-import-x` rules needed for TypeScript while disabling rules already covered by TypeScript to avoid redundancy. |
| **TypeScript ESLint Strict** | See [Strict TypeScript ESLint](../customization/strict-rules.md#strict-typescript-rules).                                               |

## Plugins {#plugins}

The **plugins** are external packages that add extra linting power to ESLint. They provide the actual rules for different ecosystems like **React**, **Next.js**, and **TypeScript**. Without these plugins, the rules cannot run. Each plugin brings its own set of checks to improve code quality and consistency.

Available plugins:

- `@stylistic/eslint-plugin`
- `eslint-plugin-import-x`
- `eslint-plugin-n`
- `eslint-plugin-react`
- `eslint-plugin-jsx-a11y`
- `eslint-plugin-react-hooks`
- `@next/eslint-plugin-next`
- `typescript-eslint`

## Extensions {#extensions}

Normally, many plugins hide their **recommended configs**. That means if you want to build a fully custom config, you can’t access everything. Extensions solve this problem.

An **extension** = `rules + parser + settings` → combined into a reusable layer.
Now, every **Extended config** is built as `rules + extension = config`. This makes it easier to create your own **base config** with full customization.

### Available Extensions {#available-extensions}

| Extension   | Variant     | Description                                                                                                                            |
| ----------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Base**    | Recommended | Adds parser, resolver, and import settings for JavaScript. Disables legacy stylistic JS rules.                                         |
|             | TypeScript  | Adds parser, resolver, and import settings for TypeScript. Also disables JS rules not recommended by the TypeScript team.              |
| **React**   | Recommended | Adds parser, resolver, and import settings for React. Enables required ESLint and stylistic rules.                                     |
|             | TypeScript  | Adds parser, resolver, and import settings for TypeScript. Adjusts specific React rules to work better with TypeScript.                |
| **Next.js** | Recommended | Disables certain import rules based on Next.js best practices and also turns off React rules that are unnecessary in Next.js projects. |
| **Node**    | Recommended | Detects if the project uses CommonJS or ESM and adjusts rules accordingly.                                                             |

## Configs {#configs}

**Configs** are ready-to-use collections of rule groups combined with extensions.
They give you a complete setup out of the box for different environments like **Base**, **React**, **Next.js**, and **Node**.
Each config has variants like **recommended**, **typescript**, and **all**, so you can pick exactly what fits your project.

### Available Configs #{available-configs}

- **Base**
  - **Recommended** → Includes Base rules (without **Imports Strict**) + the Base Recommended extension.
  - **TypeScript** → Includes TypeScript rules (without **TypeScript ESLint Strict**) + the Base TypeScript extension.
  - **All** → Combines both Base **Recommended** and **TypeScript** configs.

- **React**
  - **Recommended** → Includes React rules (without **React Strict**) + the React Recommended extension.
  - **TypeScript** → Includes React TypeScript extension.
  - **All** → Combines both React **Recommended** and **TypeScript** configs.

- **Next.js**
  - **Recommended** → Includes React Recommended config + Next.js rules + Next.js Recommended extension.
  - **TypeScript** → Uses the same React TypeScript config.
  - **All** → Combines both Next.js **Recommended** and **TypeScript** configs.

- **Node**
  - **Recommended** → Includes Node.js rules + the Node Recommended extension.
