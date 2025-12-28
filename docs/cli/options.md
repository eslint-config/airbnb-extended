# Setup {#setup}

When you run the CLI, it launches an **interactive wizard**.
You’ll be asked a series of questions, for example:

```bash
✔ Are you using TypeScript? … No / Yes
```

Each answer updates the final ESLint setup for your project. If you prefer to skip the questions, you can pass **command-line options** to configure everything in one step:

::: code-group

```sh [npm]
$ npx create-airbnb-x-config --lang typescript --runtime react --pm pnpm
```

```sh [yarn]
$ yarn dlx create-airbnb-x-config --lang typescript --runtime react --pm pnpm
```

```sh [pnpm]
$ pnpx create-airbnb-x-config --lang typescript --runtime react --pm pnpm
```

:::

This example sets up ESLint with TypeScript + React rules and installs dependencies using pnpm.

## Options {#options}

Here’s the full list of options you can use:

### General {#general}

- `-v, --version` → Show the current CLI version.
- `-h, --help` → Display help info.

### Config {#config}

The following values are available for `--config`:

- `extended` → Use **extended configuration** (modern, TypeScript-first, opinionated defaults).
- `legacy` → Use **legacy configuration** (1:1 Airbnb replacement in flat config).

### Language {#language}

The following values are available for `--lang`:

- `typescript` → Setup for a **TypeScript** project.
- `javascript` → Setup for a **JavaScript** project.

### Formatter {#formatter}

The following values are available for `--formatter`:

- `prettier` → Add Prettier integration (`eslint-plugin-prettier`, `eslint-config-prettier`).

### Runtime {#runtime}

The following values are available for `--runtime`:

- `react` → Add React rules (`eslint-plugin-react`, `eslint-plugin-react-hooks`, and `eslint-plugin-jsx-a11y`).
- `remix` → Same as `react` runtime rules.
- `react-router` → Same as `react` runtime rules.
- `next` → Add Next.js rules (`@next/eslint-plugin-next`).
- `node` → Add Node.js rules (`eslint-plugin-n`).

### Strict Rules {#strict-rules}

The following values are available for `--strict`:

- `import` → Enable **strict Import** rules.
- `react` → Enable **strict React** rules.
- `typescript` → Enable **strict TypeScript** rules.

### Legacy Config Variants {#legacy-configs}

The following values are available for `--legacy`:

- `base` → Legacy Base config.
- `react` → Legacy React config.
- `react-hooks` → Legacy React Hooks config.

### Package Managers {#package-managers}

The following values are available for `--pm`:

- `npm` → Use npm for installs.
- `yarn` → Use Yarn for installs.
- `pnpm` → Use pnpm for installs.
- `bun` → Use Bun for installs.

### File & Install Options {#file-install-options}

- `--create-eslint-file` → Generate `eslint.config.mjs` automatically.
- `--skip-install` → Skip dependency installation (you’ll need to install them manually).

## Why use Options instead of Interactive Prompts? {#why-options}

While the **interactive mode** is great for first-time setup (because it guides you step by step), the **options (flags)** are better when:

1. **Speed** → You can skip all prompts and generate a config instantly with a single command.
2. **Consistency** → Perfect for teams/projects where everyone should use the same ESLint setup without relying on different answers in prompts.
3. **Automation** → Options can be used in scripts, CI pipelines, or project generators (like `create-*` tools) to auto-generate ESLint configs.
4. **Repeatability** → If you’re setting up multiple projects, you don’t need to click through prompts each time, just reuse the same command.
5. **Customization** → Options give you more fine-grained control (e.g., picking strict configs, skipping install, forcing a package manager) without extra steps.

::: tip

Interactive mode is great for learning and trying things out. Options are great for speed, automation, and team-wide consistency.

:::
