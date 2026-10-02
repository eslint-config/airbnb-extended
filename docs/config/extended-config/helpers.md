---
description: 'Helper utilities for Airbnb ESLint flat config: file extensions, dev dependency globs, import-x resolver settings and a monorepo-aware TypeScript resolver.'
---

# Helpers {#helpers}

The `helpers` object provides a set of reusable utilities designed to simplify ESLint configuration and reduce duplication across JavaScript and TypeScript setups.
These helpers focus on **file extensions**, **development-only file patterns**, and **import resolver settings**, ensuring consistent behavior across different environments and frameworks.

| Helper                               | Purpose                                              |
| ------------------------------------ | ---------------------------------------------------- |
| `extensions`                         | Centralized extension & file pattern definitions     |
| `getDevDepsList`                     | Dev-only file globs for import rules                 |
| `getImportSettings`                  | Import resolver & extension settings                 |
| `createAutoTypeScriptImportResolver` | TypeScript resolver with per-file tsconfig discovery |

## extensions {#extensions}

A centralized collection of file extensions and glob patterns used across the configuration.

- Defines **JavaScript** and **TypeScript** file extensions
- Provides **React-aware** extensions (`.jsx`, `.tsx`)
- Exposes glob patterns for ESLint targeting
- Ensures consistent extension handling across rules, resolvers, and configs

### Example {#extensions-example}

```ts
import { helpers } from 'eslint-config-airbnb-extended';

const { jsFiles, tsFiles } = helpers.extensions;

export default [
  {
    files: [...jsFiles, ...tsFiles],
  },
];
```

## getDevDepsList(language) {#get-dev-deps-list}

Returns a list of glob patterns that should be treated as **development-only files** for ESLint import rules.

```ts
type GetDevDepsList = (language: 'javascript' | 'typescript') => string[];
```

- Generates file patterns for:
  - Test files
  - Mocks
  - Config files (Jest, Vite, Webpack, ESLint, etc.)

- Covers both JavaScript and TypeScript file extensions, so mixed projects work with either value
- Helps configure rules like `import-x/no-extraneous-dependencies`

### Example {#get-dev-deps-list-example}

```ts
import { helpers } from 'eslint-config-airbnb-extended';

const { getDevDepsList } = helpers;

export default [
  {
    rules: {
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: getDevDepsList('typescript'),
        },
      ],
    },
  },
];
```

## getImportSettings(params) {#get-import-settings}

Generates ESLint `settings` for `eslint-plugin-import-x` with proper resolvers and extensions.

```ts
import type { TypeScriptResolverOptions } from 'eslint-import-resolver-typescript';

type GetImportSettingsParams = {
  javascript: boolean;
  typescript: boolean;
  jsx: boolean;
  typescriptResolver?: TypeScriptResolverOptions;
};
```

- Configures **Node** and **TypeScript** import resolvers
- Automatically selects extensions based on:
  - JavaScript vs TypeScript
  - React / JSX usage

- Adds TypeScript-specific parsing and type resolution when enabled
- `typescriptResolver` forwards extra options to `eslint-import-resolver-typescript`, merged over the default `{ alwaysTryTypes: true }`

### Example {#get-import-settings-example}

```ts
import { helpers } from 'eslint-config-airbnb-extended';

export default [
  {
    settings: helpers.getImportSettings({
      javascript: false,
      typescript: true,
      jsx: true,
    }),
  },
];
```

### Monorepo Example {#get-import-settings-monorepo-example}

Path aliases are resolved automatically per linted file (see [`createAutoTypeScriptImportResolver`](#create-auto-typescript-import-resolver)), so monorepos need no extra configuration. Use `typescriptResolver` only to pin a package to a specific tsconfig, e.g. a non-standard name or location:

```ts
// apps/web/eslint.config.js
import { fileURLToPath } from 'node:url';

import { configs, helpers } from 'eslint-config-airbnb-extended';

export default [
  ...configs.next.typescript,
  {
    settings: helpers.getImportSettings({
      javascript: false,
      typescript: true,
      jsx: true,
      typescriptResolver: {
        project: fileURLToPath(new URL('tsconfig.json', import.meta.url)),
      },
    }),
  },
];
```

## createAutoTypeScriptImportResolver(options?) {#create-auto-typescript-import-resolver}

A drop-in replacement for `createTypeScriptImportResolver` from `eslint-import-resolver-typescript` that picks the `tsconfig.json` **closest to each linted file** instead of relying on the process working directory. All prebuilt configs and `getImportSettings` use it internally, so monorepos work out of the box.

```ts
import type { TypeScriptResolverOptions } from 'eslint-import-resolver-typescript';

type CreateAutoTypeScriptImportResolver = (options?: TypeScriptResolverOptions) => NewResolver;
```

- Discovers the nearest `tsconfig.json` per linted file by walking up from the file's directory, and caches one underlying resolver per discovered tsconfig
- In monorepos where sibling packages declare the same path alias (e.g. `@/*`), this guarantees imports never resolve across package boundaries — otherwise a single editor ESLint session can resolve one app's alias through another app's tsconfig, producing false `import-x/no-unresolved`, `import-x/extensions`, and `import-x/no-extraneous-dependencies` errors
- Files with no `tsconfig.json` anywhere up the tree fall back to the resolver's default behavior, so single-repo setups are unaffected
- `options` are forwarded to every underlying resolver, merged over the default `{ alwaysTryTypes: true }`
- Passing an explicit `options.project` disables the automatic discovery and behaves exactly like `createTypeScriptImportResolver({ alwaysTryTypes: true, ...options })`

### Example {#create-auto-typescript-import-resolver-example}

The prebuilt configs already use this resolver, so reach for it directly only when building custom `import-x` settings:

```ts
import { helpers } from 'eslint-config-airbnb-extended';
import { createNodeResolver } from 'eslint-plugin-import-x';

export default [
  {
    settings: {
      'import-x/resolver-next': [
        createNodeResolver(),
        helpers.createAutoTypeScriptImportResolver(),
      ],
    },
  },
];
```
