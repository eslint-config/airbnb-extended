---
description: 'ESLint plugins bundled with eslint-config-airbnb-extended: Stylistic, import-x, n, React, React Hooks, JSX a11y, Next.js and typescript-eslint.'
---

# Plugins {#plugins}

The **plugins** are external packages that add extra linting power to ESLint. They provide the actual rules for different ecosystems like **React**, **Next.js**, and **TypeScript**. Without these plugins, the rules cannot run. Each plugin brings its own set of checks to improve code quality and consistency.

| Key                        | Package                                                                                  | Purpose                    |
| -------------------------- | ---------------------------------------------------------------------------------------- | -------------------------- |
| `plugins.stylistic`        | **[@stylistic/eslint-plugin](https://eslint.style)**                                     | Styling & formatting rules |
| `plugins.importX`          | **[eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x)**            | Import/export validation   |
| `plugins.node`             | **[eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n)**               | Node.js best practices     |
| `plugins.react`            | **[eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)**             | React-specific linting     |
| `plugins.reactHooks`       | **[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)** | Rules of Hooks             |
| `plugins.reactA11y`        | **[eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)**       | Accessibility for JSX      |
| `plugins.next`             | **[@next/eslint-plugin-next](https://nextjs.org/docs/app/api-reference/config/eslint)**  | Next.js-specific linting   |
| `plugins.typescriptEslint` | **[@typescript-eslint](https://typescript-eslint.io)**                                   | TypeScript linting support |

### Example {#plugins-example}

```ts
import { plugins } from 'eslint-config-airbnb-extended';

export default [
  // Stylistic plugin
  plugins.stylistic,
  // TypeScript ESLint plugin
  plugins.typescriptEslint,
];
```
