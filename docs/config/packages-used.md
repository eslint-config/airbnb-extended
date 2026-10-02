---
description: 'The ESLint plugins and resolvers behind eslint-config-airbnb-extended, including typescript-eslint, import-x, ESLint Stylistic and eslint-plugin-react.'
---

# Packages Used {#packages-used}

This configuration relies on a set of essential ESLint plugins that extend Airbnb’s base rules to support **TypeScript, React, Node.js, accessibility, and import handling**.

## Quick Overview {#overview}

| Package                                                                                                 | Purpose                    | Key Benefits                                                                                              |
| ------------------------------------------------------------------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------- |
| **[@stylistic/eslint-plugin](https://eslint.style)**                                                    | Styling & formatting rules | Ensures consistent code style (spacing, quotes, semicolons, indentation) directly in ESLint               |
| **[eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x)**                           | Import/export validation   | Detects invalid imports, enforces ordering, supports TypeScript better than legacy `eslint-plugin-import` |
| **[eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n)**                              | Node.js best practices     | Prevents use of deprecated APIs, enforces modern Node.js coding standards                                 |
| **[eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)**                            | React-specific linting     | Catches JSX errors, enforces prop validation, encourages React best practices                             |
| **[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)**                | Rules of Hooks             | Ensures hooks are used correctly and dependencies are properly declared                                   |
| **[eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)**                      | Accessibility for JSX      | Detects missing `alt` text, incorrect ARIA attributes, improves WCAG compliance                           |
| **[@next/eslint-plugin-next](https://nextjs.org/docs/app/api-reference/config/eslint)**                 | Next.js-specific linting   | Enforces Next.js best practices, catches common issues, and ensures consistency with official standards   |
| **[@typescript-eslint](https://typescript-eslint.io)**                                                  | TypeScript linting support | Adds type-aware rules, catches unsafe patterns, integrates TS with Airbnb config                          |
| **[eslint-import-resolver-typescript](https://github.com/import-js/eslint-import-resolver-typescript)** | TS import resolution       | Supports `tsconfig.json` path aliases, prevents false-positive import errors                              |

## Detailed Explanation {#detailed-explanation}

### 1. @stylistic/eslint-plugin {#stylistic-eslint-plugin}

Provides fine-grained styling and formatting rules, covering details like spacing, quotes, indentation, and semicolons. This ensures consistent formatting across JavaScript and TypeScript files without relying on an external formatter.

### 2. eslint-plugin-import-x {#eslint-plugin-import-x}

A modern fork of `eslint-plugin-import` with better TypeScript support and performance. It validates import/export syntax, detects duplicate or invalid imports, and enforces consistent ordering and grouping.

### 3. eslint-plugin-n {#eslint-plugin-n}

Focuses on Node.js best practices. It warns about deprecated APIs, incorrect callback usage, and ensures compatibility with the Node.js version defined in your project.

### 4. eslint-plugin-react {#eslint-plugin-react}

Linting rules tailored for React. It ensures JSX is valid, encourages best practices in both functional and class components, and enforces prop validation to prevent runtime issues.

### 5. eslint-plugin-react-hooks {#eslint-plugin-react-hooks}

Enforces React’s official **Rules of Hooks**. It prevents invalid hook usage (like calling hooks in loops or conditions) and ensures dependencies in hooks like `useEffect` are declared correctly.

### 6. eslint-plugin-jsx-a11y {#eslint-plugin-jsx-a11y}

Improves accessibility in React apps. It detects missing `alt` text on images, incorrect ARIA attributes, and highlights accessibility issues in JSX to help create inclusive apps.

### 7. @next/eslint-plugin-next {#eslint-plugin-next}

Enforces Next.js best practices and catches common issues with images, head, and scripts. It also promotes performance optimizations and keeps your project consistent with official Next.js standards.

### 8. @typescript-eslint {#typescript-eslint}

Provides ESLint support for TypeScript. It integrates with the type system to catch unsafe patterns, unused variables, and improves type safety while working seamlessly with Airbnb’s base rules.

### 9. eslint-import-resolver-typescript {#eslint-import-resolver-typescript}

Extends `eslint-plugin-import-x` to resolve TypeScript path aliases defined in `tsconfig.json`. Helps prevent false positives when working with custom alias-based imports.

## Why These Packages Together? {#why-packages-together}

By combining these packages, `eslint-config-airbnb-extended` achieves:

- Consistent **code style** across JavaScript & TypeScript (`@stylistic/eslint-plugin`).
- Safe and reliable **imports** (`eslint-plugin-import-x`, `eslint-import-resolver-typescript`).
- Strong **Node.js rules** (`eslint-plugin-n`).
- Best practices for **React & Hooks** (`eslint-plugin-react`, `eslint-plugin-react-hooks`).
- Improved **accessibility** (`eslint-plugin-jsx-a11y`).
- Enforces framework-specific best practices (`@next/eslint-plugin-next`)
- Full **TypeScript integration** (`typescript-eslint`).
