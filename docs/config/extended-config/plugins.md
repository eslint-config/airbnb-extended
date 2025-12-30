# Plugins {#plugins}

The **plugins** are external packages that add extra linting power to ESLint. They provide the actual rules for different ecosystems like **React**, **Next.js**, and **TypeScript**. Without these plugins, the rules cannot run. Each plugin brings its own set of checks to improve code quality and consistency.

| Package                                                                                  | Purpose                    |
| ---------------------------------------------------------------------------------------- | -------------------------- |
| **[@stylistic/eslint-plugin](https://eslint.style)**                                     | Styling & formatting rules |
| **[eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x)**            | Import/export validation   |
| **[eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n)**               | Node.js best practices     |
| **[eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)**             | React-specific linting     |
| **[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)** | Rules of Hooks             |
| **[eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)**       | Accessibility for JSX      |
| **[@next/eslint-plugin-next](https://nextjs.org/docs/app/api-reference/config/eslint)**  | Next.js-specific linting   |
| **[@typescript-eslint](https://typescript-eslint.io)**                                   | TypeScript linting support |

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
