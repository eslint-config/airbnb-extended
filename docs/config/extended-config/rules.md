# Rules {#rules}

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
