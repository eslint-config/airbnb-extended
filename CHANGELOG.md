## 3.0.1 (2026-01-21)

### 🚀 Features

- Added renovate
- **docs:** Added `llms.txt`

### 🩹 Fixes

- Upgraded deps
- **eslint-config-airbnb-extended:** Fixed #57

### ❤️ Thank You

- Anton Khitrenovich @khitrenovich

## 3.0.0 (2026-01-01)

### 🚨 Breaking Change

- **Significantly smaller package** - the new version reduces the unpacked size by ~72% compared to the previous release
- **Node.js v16 support dropped** - v3 requires **Node 18.18 or higher**
- **ESM-only architecture** - the entire package now uses native ES modules
- **All batteries included** - everything you need ships out of the box
- **Redesigned CLI options** - aligned with clearer, more explicit configurations
- **Updated dependencies** - all packages are upgraded to their latest stable versions

For more details, see the [docs](https://eslint-airbnb-extended.nishargshah.dev/migration/upgrade-to-v3)

### 🚀 Repository migration

As part of this release, the project has moved from a **personal repository** to a dedicated **organization repository**:

- From: [https://github.com/NishargShah/eslint-config-airbnb-extended](https://github.com/NishargShah/eslint-config-airbnb-extended)
- To: [https://github.com/eslint-config/airbnb-extended](https://github.com/eslint-config/airbnb-extended)

### ❤️ Thank You

- Gualtiero @maiolica
- Alexey Immoreev @luixo
- Vida Xie @9romise
- Sam Garfinkel @sgarfinkel

## 2.3.3 (2025-11-29)

### 🩹 Fixes

- **eslint-config-airbnb-extended:** Upgraded deps
- **eslint-config-airbnb-extended:** Fixed #42 and #45

### ❤️ Thank You

- Anton Khitrenovich @khitrenovich
- Heath C @heath-freenome

## 2.3.2 (2025-10-11)

### 🩹 Fixes

- **eslint-config-airbnb-extended:** Upgraded deps
- **eslint-config-airbnb-extended:** Added support for `eslint-plugin-react-hooks` versions 6 and 7
- **eslint-config-airbnb-extended:** Updated `security.md`

### ❤️ Thank You

- Steven Sacks @stevensacks

## 2.3.1 (2025-09-10)

### 🚀 Features

- **docs:** Added detailed documentation for `Extended Config` and `Legacy Config`
- **eslint-config-airbnb-extended:** Updated Dependencies and Dev Dependencies

### 🩹 Fixes

- **eslint-config-airbnb-extended:** Fixed React TypeScript Extension issue
- **docs:** Added `@next/eslint-plugin-next` in `Package Used` section

## 2.3.0 (2025-09-07)

### ❤️ Released Documentation

- URL: https://eslint-airbnb-extended.nishargshah.dev

### 🚨 Breaking Change

- Requires `Node.js 16` or higher

### 🩹 Fixes

- **create-airbnb-x-config:** Fixed hook config issue
- **create-airbnb-x-config:** The `Own Customization` option has been removed, since we now provide complete documentation to reference.
- **eslint-config-airbnb-extended:** Fixed files issue ([#32](https://github.com/eslint-config/airbnb-extended/issues/32)).
- **docs:** Added changes of `CLI` in documentation.

### ❤️ Thank You

- synapxe-siang13 @synapxe-siang13
- David Tanner @DavidTanner

## 2.2.0 (2025-08-25)

### 🚨 Breaking Change

- **eslint-config-airbnb-extended:** Re-enabled the following formatting rules that were accidentally turned off during the `eslint-stylistic` integration:

  ```
  react/jsx-closing-bracket-location
  react/jsx-closing-tag-location
  react/jsx-curly-brace-presence
  react/jsx-curly-newline
  react/jsx-curly-spacing
  react/jsx-equals-spacing
  react/jsx-first-prop-new-line
  react/jsx-indent
  react/jsx-indent-props
  react/jsx-max-props-per-line
  react/jsx-one-expression-per-line
  react/jsx-pascal-case
  react/jsx-props-no-multi-spaces
  react/self-closing-comp
  react/jsx-tag-spacing
  react/jsx-wrap-multilines
  ```

### ❤️ Thank You

- Kilian Finger @KiwiKilian for raising the bug

## 2.1.2 (2025-07-03)

### 🩹 Fixes

- **create-airbnb-x-config:** Fixed #18 issue

### ❤️ Thank You

- Charlie Laabs @claabs for raising the bug

## 2.1.1 (2025-06-29)

### 🚀 Features

- **create-airbnb-x-config:** Added `strict` config option in CLI

## 2.1.0 (2025-06-17)

### 🚀 Features

- **eslint-config-airbnb-extended:** Added `extensions` feature for creating own config by yourself.

## 2.0.0 (2025-06-16)

### 🚀 Features

- **eslint-config-airbnb-extended:** Added `one-to-one` replacement for Airbnb ESLint configs
- **create-airbnb-x-config:** Added `one-to-one` replacement CLI options for Airbnb ESLint configs

### ❤️ Thank You

- Nicholas C. Zakas @nzakas for the idea

## 1.0.11 (2025-05-03)

### 🩹 Fixes

- **eslint-config-airbnb-extended:** Added `tailwind.config` file in `devDependencies` excluded list

## 1.0.10 (2025-05-03)

### 🩹 Fixes

- **create-airbnb-x-config:** Readded option to create `eslint.config.mjs` file
- **create-airbnb-x-config:** Resolved `packageRootPath` issue

## 1.0.9 (2025-04-29)

### 🩹 Fixes

- **create-airbnb-x-config:** Removed `eslint.config.mjs` create functionality temporary due to some weird issues

## 1.0.8 (2025-04-29)

### 🩹 Fixes

- **create-airbnb-x-config:** Resolved: `Template` not found issue from dist folder

## 1.0.7 (2025-04-29)

### 🩹 Fixes

- **create-airbnb-x-config:** Resolved: `package.json` issue

## 1.0.6 (2025-04-29)

### 🩹 Fixes

- **create-airbnb-x-config:** Resolved: `Template` not found issue

## 1.0.5 (2025-04-27)

### 🩹 Fixes

- **create-airbnb-x-config:** Detect Package Manager automatically, and based on that, it will install the package.
- **create-airbnb-x-config:** Added option to create `eslint.config.mjs` file
- **create-airbnb-x-config:** Removed `ts-node` and added `tsx`
- **eslint-config-airbnb-extended:** Removed `ts-node` and added `tsx`

## 1.0.4 (2025-04-27)

### 🩹 Fixes

- **eslint-config-airbnb-extended:** Updated README.md for `strictRules`
- **eslint-config-airbnb-extended:** Fixed: Javascript requires `typescript-eslint` for functioning ([#4](https://github.com/eslint-config/airbnb-extended/issues/4))

## 1.0.3 (2025-04-25)

### 🩹 Fixes

- **create-airbnb-x-config:** Prettier config changed due to `arrow-body-style` and `prefer-arrow-callback` issue, see [issue](https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#arrow-body-style-and-prefer-arrow-callback-issue)
- **create-airbnb-x-config:** Fixed `cursor` issue while `exiting`

## 1.0.2 (2025-04-25)

### 🩹 Fixes

- **eslint-config-airbnb-extended:** Fixed `node` import issue by adding `cjs` and `mjs` configurations
- **eslint-config-airbnb-extended:** Changed `no-unsupported-features/es-syntax` rule `severity` to `off`

## 1.0.1 (2025-04-24)

### 🩹 Fixes

- **eslint-config-airbnb-extended:** Fixed `getStylisticLegacyConfig` function, due to that many rules were not working
- **eslint-config-airbnb-extended:** Removed `no-unsafe-call` from `reactStrict`
- **eslint-config-airbnb-extended:** Changed value of `checksVoidReturn` for `no-misused-promises`
- **eslint-config-airbnb-extended:** Added README for `strictConfig`

## 1.0.0 (2025-04-23)

### 🚨 Breaking Change

- **eslint-config-airbnb-extended:** Added `files` in all rules and configs

### 🩹 Fixes

- **eslint-config-airbnb-extended:** Added `getImportSettings` function to get the settings of `import`

## 0.11.3 (2025-04-23)

### 🩹 Fixes

- **eslint-config-airbnb-extended:** Fixed `no-confusing-void-expression` rule for arrow function

## 0.11.2 (2025-04-23)

### 🩹 Fixes

- **eslint-config-airbnb-extended:** Fixed `files` issue in `typescriptEslintStrictRules`
- **eslint-config-airbnb-extended:** Fixed `tsExtensions` spreading issue
- **eslint-config-airbnb-extended:** Added/Removed some of the rules from `typescriptEslintStrictRules`

## 0.11.1 (2025-04-23)

### 🚀 Features

- **eslint-config-airbnb-extended:** Added `typescript-eslint` recommended and stylistic rules in `typescriptEslint` config
- **create-airbnb-x-config:** Added `prettier` functionality
- **create-airbnb-x-config:** Automated `templates` by the script
- **create-airbnb-x-config:** Added `templates` for prettier

## 0.11.0 (2025-04-22)

### 🚨 Breaking Change

- **eslint-config-airbnb-extended:** Changed `typescript-eslint` rules severity

### 🚀 Features

- **eslint-config-airbnb-extended:** Added `disableTypeChecked` config for javascript from `typescript-eslint`
- **eslint-config-airbnb-extended:** Added `typescriptEslintStrict` rules
- **eslint-config-airbnb-extended:** Added `typescript-eslint` function in `Check Updates`

### 🩹 Fixes

- **create-airbnb-x-config:** Changed `templates` configs

## 0.10.2 (2025-04-20)

### 🩹 Fixes

- **create-airbnb-x-config:** Added `tsConfigs` in `TypeScript` config
- **eslint-config-airbnb-extended:** Added `vite` config in dev dependencies allowed list

## 0.10.1 (2025-04-20)

### 🩹 Fixes

- **eslint-config-airbnb-extended:** Fixed `ignoreTypes` issue

## 0.10.0 (2025-04-20)

### 🚨 Breaking Change

- **eslint-config-airbnb-extended:** Changed `rules` keys

### 🚀 Features

- **eslint-config-airbnb-extended:** Added `stylistic` plugin of `javascript`, `typescript`, `jsx` and `plus`
- **eslint-config-airbnb-extended:** Added `stylistic` and `stylistic-plus` in base config
- **eslint-config-airbnb-extended:** Added `stylistic-disable-legacy` config
- **eslint-config-airbnb-extended:** Added `stylistic-react` in React config
- **eslint-config-airbnb-extended:** Added `stylistic-typescript` and `stylistic-typescript-plus` in TypeScript config
- **eslint-config-airbnb-extended:** Added `stylistic` function in `Check Updates`

### 🩹 Fixes

- **eslint-config-airbnb-extended:** moved `reactStrict` rules from `base` config to `react` config
- **create-airbnb-x-config:** Changed `templates` configs

## 0.9.3 (2025-04-17)

### 🩹 Fixes

- **eslint-config-airbnb-extended:** base rules typescript issue fixed

## 0.9.2 (2025-04-17)

### 🩹 Fixes

- **eslint-config-airbnb-extended:** fixed: Error: Cannot find module `<plugin>`

## 0.9.1 (2025-04-14)

### 🚀 Features

- **create-airbnb-x-config:** Added `@eslint/js` package for `eslint` recommended rules

### 🩹 Fixes

- **create-airbnb-x-config:** Added `@eslint/compat` package in commands

## 0.9.0 (2025-04-14)

### 🚨 Breaking Change

- **eslint-config-airbnb-extended:** Removed `next` plugin from next config

### 🚀 Features

- **eslint-config-airbnb-extended:** Added `next` plugin in `plugins`
- **eslint-config-airbnb-extended:** Added `next` rules
- **eslint-config-airbnb-extended:** `next` function added in `Check Updates`

### 🩹 Fixes

- **eslint-config-airbnb-extended:** folder structure changed for `configs`
- **create-airbnb-x-config:** Added `next` plugin in templates

## 0.8.0 (2025-04-14)

### 🚨 Breaking Change

- **eslint-config-airbnb-extended:** renamed `reactA11y` rule to `reactJsxA11y`
- **eslint-config-airbnb-extended:** moved `React` eslint rules (not the package rules) to `react/recommanded` config
- **eslint-config-airbnb-extended:** Removed `import-x` plugin from base config

### 🚀 Features

- **eslint-config-airbnb-extended:** Added `node` plugin in `plugins`
- **eslint-config-airbnb-extended:** Added `import-x` plugin in `plugins`
- **eslint-config-airbnb-extended:** `Check Updates` functionality added so in future if some new rule comes up then script can automatically check
- **eslint-config-airbnb-extended:** Added `eslint-inspector.config.mjs` for checking rules status

### 🩹 Fixes

- **eslint-config-airbnb-extended:** differentiate `deprecated` rules from all rules
- **eslint-config-airbnb-extended:** `node` config typo fixed (`n/no-unsupported-features/es-builtin` => `n/no-unsupported-features/es-builtins`)
- **create-airbnb-x-config:** Added `import-x` plugin in templates

## 0.7.0 (2025-04-13)

### 🚨 Breaking Change

- **eslint-config-airbnb-extended:** `node` config no longer extends `base` config

### 🚀 Features

- **eslint-config-airbnb-extended:** Added `eslint-plugin-n` for `node` config
- **create-airbnb-x-config:** Added `node` package name in commands list

### 🩹 Fixes

- **create-airbnb-x-config:** Removed `node` typescript config from `templates` folder as it not needed

## 0.6.0 (2025-04-13)

### 🚀 Features

- **create-airbnb-x-config:** Added `templates` folder.
- **create-airbnb-x-config:** Added `getConfigUrl` function to get the url for GitHub for selected config.

## 0.5.2 (2025-04-11)

### 🩹 Fixes

- **eslint-config-airbnb-extended:** Added `react-jsx-runtime` rules in next.js as it is not required those rules.
- **eslint-config-airbnb-extended:** Changed `react/require-default-props` rule and set `defaultProps` (default) in `functions`.
- **eslint-config-airbnb-extended:** Removed `boolean-prop-naming` from `reactStrict` config as it is very hard to maintain in live projects.

## 0.5.1 (2025-04-10)

### 🚀 Features

- **eslint-config-airbnb-extended:** Added `next` config

## 0.5.0 (2025-04-10)

### 🚨 Breaking Change

- **eslint-config-airbnb-extended:** `react` config no longer extends `base` config in `all` and `typescript`

### 🚀 Features

- **eslint-config-airbnb-extended:** Added `reactStricts` rules

### 🩹 Fixes

- **eslint-config-airbnb-extended:** Sorted all the rules alphabetically to match docs
- **eslint-config-airbnb-extended:** `typescript-eslint` rule deprecation issue fixed

## 0.4.0 (2025-04-09)

### 🚨 Breaking Change

- **eslint-config-airbnb-extended:** `react` config no longer extends `base` config
- **eslint-config-airbnb-extended:** Reduce package size from 1.34mb to 200kb around

### 🚀 Features

- **eslint-config-airbnb-extended:** Did 50% Code rewrite due to size issues but no breaking change
- **eslint-config-airbnb-extended:** Added `eslint-config-airbnb-extended` config for project linting
- **eslint-config-airbnb-extended:** Separate plugins from configs, Check FAQ section for why.

### 🩹 Fixes

- **eslint-config-airbnb-extended:** Added `-b` flag in `tsc` command
- **eslint-config-airbnb-extended:** Eslint issues resolved by adding `references` and `composite` options in tsconfig

## 0.3.1 (2025-04-08)

### 🩹 Fixes

- **eslint-config-airbnb-extended:** Resolved `npx` issue by adding `shebang` line

## 0.3.0 (2025-04-08)

### 🚨 Breaking Change

- **eslint-config-airbnb-extended:** Renamed `typescript-only` config to `typescript`
- **eslint-config-airbnb-extended:** Renamed `typescript` config to `all`

### 🚀 Features

- **eslint-config-airbnb-extended:** Added `node` config
- **eslint-config-airbnb-extended:** Added README.md
- **eslint-config-airbnb-extended:** Added MIGRATION.md
- **create-airbnb-x-config:** Added README.md

### ❤️ Thank You

- (docs) Thanks to ChatGPT :)

## 0.2.1 (2025-04-07)

### 🩹 Fixes

- **create-airbnb-x-config:** Resolved package manager issue

## 0.2.0 (2025-04-07)

### 🚀 Features

- **eslint-config-airbnb-extended:** Airbnb Setup added
- **eslint-config-airbnb-extended:** Next.js config added
- **create-airbnb-x-config:** CLI POC Completed

### 🩹 Fixes

- **eslint-config-airbnb-extended:** Removed changeset CLI
- **create-airbnb-x-config:** Removed changeset CLI

## 0.1.0 (2025-04-05)

### 🚀 Features

- **eslint-config-airbnb-extended:** Monorepo setup added
- **create-airbnb-x-config:** Monorepo setup added

### ❤️ Thank You

- Nisharg Shah @nishargshah
