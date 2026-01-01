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
- **Helpers** → Reusable utilities for managing ESLint extensions, dev-only file patterns, and import resolver settings across JS and TS projects.
