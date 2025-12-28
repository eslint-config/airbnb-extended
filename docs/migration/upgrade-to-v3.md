# Upgrade to v3 {#upgrade-to-v3}

Version **v3** is the biggest upgrade so far, introducing several long-awaited improvements and structural changes.

### What’s new in v3

- **Significantly smaller package** — the new version reduces the unpacked size by ~72% compared to the previous release.
- **ESM-only architecture** - the entire package now uses native ES modules
- **Redesigned CLI options** - aligned with clearer, more explicit configurations
- **Updated dependencies** - all packages are upgraded to their latest stable versions
- **All batteries included** - everything you need ships out of the box

…and much much more

### Repository migration

As part of this release, the project has moved from a **personal repository**
to a dedicated **organization repository**:

- From: [https://github.com/NishargShah/eslint-config-airbnb-extended](https://github.com/NishargShah/eslint-config-airbnb-extended)
- To: [https://github.com/eslint-config/airbnb-extended](https://github.com/eslint-config/airbnb-extended)

This change ensures better long-term maintenance and community collaboration.

## Config {#config}

- **The config is now ESM-only** - You must use an environment that supports **native ES modules** to run the config.

- **Batteries included** - All required ESLint plugins and resolvers are bundled internally, so no additional plugins are needed. You only need to install:
  - `eslint`
  - `eslint-config-airbnb-extended`

  You should **remove** the following packages if they are already installed, as they are now included by default:
  - `@next/eslint-plugin-next`
  - `@stylistic/eslint-plugin`
  - `eslint-import-resolver-typescript`
  - `eslint-plugin-import-x`
  - `eslint-plugin-jsx-a11y`
  - `eslint-plugin-react`
  - `eslint-plugin-react-hooks`
  - `typescript-eslint`
  - `eslint-plugin-n`
  - `eslint-plugin-import` (legacy)

  ::: code-group

  ```sh [npm]
  npm uninstall @next/eslint-plugin-next @stylistic/eslint-plugin eslint-import-resolver-typescript eslint-plugin-import-x eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks typescript-eslint eslint-plugin-n eslint-plugin-import
  ```

  ```sh [yarn]
  yarn remove @next/eslint-plugin-next @stylistic/eslint-plugin eslint-import-resolver-typescript eslint-plugin-import-x eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks typescript-eslint eslint-plugin-n eslint-plugin-import
  ```

  ```sh [pnpm]
  pnpm uninstall @next/eslint-plugin-next @stylistic/eslint-plugin eslint-import-resolver-typescript eslint-plugin-import-x eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks typescript-eslint eslint-plugin-n eslint-plugin-import
  ```

  :::

## CLI {#cli}

- **CLI is now ESM-only** - You must run the CLI in an environment that supports **native ES modules**.

- **Node.js v16 support dropped** - v3 requires **Node 18 or higher**.

- **Redesigned CLI options** - Many flags have been renamed or restructured for better consistency.

### CLI Options {#cli-options}

Refer to the table to update your existing scripts or commands.

| Category                   | Old Command                   | New Command              |
| -------------------------- | ----------------------------- | ------------------------ |
| **Config Type**            | `--extended`                  | `--config extended`      |
|                            | `--legacy`                    | `--config legacy`        |
| **Language**               | `--ts`, `--typescript`        | `--lang typescript`      |
|                            | `--js`, `--javascript`        | `--lang javascript`      |
| **Prettier**               | `--prettier`                  | `--formatter prettier`   |
| **Frameworks & Runtimes**  | `--react`                     | `--runtime react`        |
|                            | `--react-router`              | `--runtime react-router` |
|                            | `--remix`                     | `--runtime remix`        |
|                            | `--next`                      | `--runtime next`         |
|                            | `--node`                      | `--runtime node`         |
| **Strict Rules**           | `--strict-import-config`      | `--strict import`        |
|                            | `--strict-react-config`       | `--strict react`         |
|                            | `--strict-typescript-config`  | `--strict typescript`    |
| **Legacy Config Variants** | `--legacy-base-config`        | `--legacy base`          |
|                            | `--legacy-react-config`       | `--legacy react`         |
|                            | `--legacy-react-hooks-config` | `--legacy react-hooks`   |
| **Package Managers**       | `--use-npm`                   | `--pm npm`               |
|                            | `--use-yarn`                  | `--pm yarn`              |
|                            | `--use-pnpm`                  | `--pm pnpm`              |
|                            | `--use-bun`                   | `--pm bun`               |
