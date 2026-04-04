# Installation {#installation}

Setting up `eslint-config-airbnb-extended` is simple and flexible. You can either use the automated **CLI tool** (`create-airbnb-x-config`) or perform a **manual installation** (not recommended).

We strongly suggest using the CLI tool since it ensures you always have the latest configuration and avoids unnecessary setup mistakes.

## Automate the Setup with `create-airbnb-x-config` {#with-cli}

The easiest way to get started is by running the CLI tool inside your project directory:

::: code-group

```sh [npm]
$ npx create-airbnb-x-config
```

```sh [yarn]
$ yarn dlx create-airbnb-x-config
```

```sh [pnpm]
$ pnpx create-airbnb-x-config
```

```sh [bun]
$ bunx create-airbnb-x-config
```

:::

This tool will guide you step by step, helping you configure ESLint quickly with the **Airbnb Extended setup**.

For a full list of options and advanced usage, check out the [guide](../cli/guide).

## Manual Installation (Not Recommended) {#manual-installation}

While you can install everything by hand, we **do not recommend it**. Manual installation requires you to:

- Identify all required packages
- Install them individually
- Keep them updated manually

This approach can lead to inconsistencies if new changes are introduced in the configuration.

If you still prefer this method, refer to the [Packages Used](./packages-used) section for a breakdown of dependencies.
