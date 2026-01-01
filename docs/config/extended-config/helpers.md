# Helpers {#helpers}

The `helpers` object provides a set of reusable utilities designed to simplify ESLint configuration and reduce duplication across JavaScript and TypeScript setups.
These helpers focus on **file extensions**, **development-only file patterns**, and **import resolver settings**, ensuring consistent behavior across different environments and frameworks.

| Helper              | Purpose                                          |
| ------------------- | ------------------------------------------------ |
| `extensions`        | Centralized extension & file pattern definitions |
| `getDevDepsList`    | Dev-only file globs for import rules             |
| `getImportSettings` | Import resolver & extension settings             |

## extensions {#extensions}

A centralized collection of file extensions and glob patterns used across the configuration.

- Defines **JavaScript** and **TypeScript** file extensions
- Provides **React-aware** extensions (`.jsx`, `.tsx`)
- Exposes glob patterns for ESLint targeting
- Ensures consistent extension handling across rules, resolvers, and configs

### Example {#extensions-example}

```ts
import { helpers } from 'eslint-config-airbnb-extended';

const { jsFiles, tsFiles } = helpers;

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

- Automatically adapts extensions based on the selected language
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
type GetImportSettingsParams = {
  javascript: boolean;
  typescript: boolean;
  jsx: boolean;
};
```

- Configures **Node** and **TypeScript** import resolvers
- Automatically selects extensions based on:
  - JavaScript vs TypeScript
  - React / JSX usage

- Adds TypeScript-specific parsing and type resolution when enabled

### Example {#get-import-settings-example}

```ts
import { getImportSettings } from '@/helpers';

export default [
  {
    settings: getImportSettings({
      javascript: false,
      typescript: true,
      jsx: true,
    }),
  },
];
```
