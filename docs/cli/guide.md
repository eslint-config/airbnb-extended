# CLI {#cli}

The `create-airbnb-x-config` tool helps you quickly scaffold an **ESLint configuration** based on the `eslint-config-airbnb-extended` presets.
It guides you through a series of prompts and generates a ready-to-use config tailored to your project.

## Installation {#installation}

You don’t need to install this tool globally. Just run it directly inside your project:

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

:::

## Guide {#guide}

When you run the CLI, it will guide you through several prompts to build the right ESLint setup.
Here’s what each step means:

---

### 1. Config Type {#config-type}

Choose the style of configuration you want:

- **Legacy →** A drop-in replacement for the original Airbnb ESLint configs, but in the new flat config format.
- **Extended →** A modern, TypeScript-friendly setup with opinionated defaults for both new and existing projects.

---

### 2. Are you using TypeScript? {#are-you-using-typescript}

- **Yes →** Adds TypeScript-related configs and plugins like `typescript-eslint` and `eslint-import-resolver-typescript`.
- **No →** Keeps the setup for plain JavaScript only.

---

### 3. Are you using Prettier? {#are-you-using-prettier}

- **Yes →** Integrates Prettier with `eslint-plugin-prettier` and `eslint-config-prettier` so formatting works directly in ESLint.

- **No →** Skips Prettier integration.

---

### Extended Config Prompts {#extended-prompts}

If you selected **Extended**, The CLI will **automatically include** `@stylistic/eslint-plugin` and `eslint-plugin-import-x`. The following questions apply only to **Extended** configs.

#### 4. Are you using? {#are-you-using-extended}

- **React/React Router →** Enables React-specific linting with support for hooks and accessibility rules, ensuring your React code follows best practices. It installs `eslint-plugin-react`, `eslint-plugin-react-hooks`, and `eslint-plugin-jsx-a11y`.

- **Next.js →** Extends the React setup with additional Next.js rules to catch framework-specific issues. It installs everything from React plus `@next/eslint-plugin-next`.

- **Node →** Adds Node.js-focused rules that enforce best practices and catch common issues in server-side code. It installs `eslint-plugin-n`.

#### 5. Do you want to add strict configs? {#add-strict-configs}

- **Yes →** You’ll be prompted to select which strict rule sets to apply: **Import**, **React**, or **TypeScript**.
- **No →** Keeps the default balanced configuration without strict rules.

---

### Legacy Config Prompts {#legacy-prompts}

If you selected **Legacy**, The CLI will **automatically include** `eslint-plugin-import`. The following questions apply only to **Legacy** configs.

#### 4. Are you using? {#are-you-using-legacy}

- **Base Config →** Installs `eslint-plugin-import` to handle module import/export rules and best practices. Use this if you only need a minimal setup without React-specific rules.

- **React Config →** Installs `eslint-plugin-react` and `eslint-plugin-jsx-a11y` to enforce React best practices and accessibility checks. Recommended if your project uses React for UI development.

#### 5. Are you using hooks? {#are-you-using-hooks}

- **Yes →** Installs `eslint-plugin-react-hooks` to enforce the rules of React hooks.
- **No →** Skips installing hook rules. Choose this if your React project doesn’t use hooks.

---

### Final Common Prompts {#final-prompts}

No matter which config type you choose, the CLI will end with these questions:

#### 6. Should I create an `eslint.config.mjs` file for you? {#create-eslint-config-mjs}

- **Yes →** Generates a ready-to-use config file based on your answers. At the end, you’ll also get a link labeled **Created Config** showing the template used.

- **No →** You’ll need to create it manually. A link labeled **Config** will be shown at the end with the template you can copy.

#### 7. Do you want to skip the package installation? {#skip-package-installation}

- **Yes →** Skips auto-installation. At the end, you’ll see a list of **Commands** you can run manually.
- **No →** Automatically installs everything for you. At the end, you’ll also see the **Executed Commands** for reference.

Here’s a polished rephrase in simpler, user-friendly language:

## Example Output {#example-output}

Once you finish answering the prompts, the CLI will show you a **ready-to-run command** that installs all the required dependencies using your preferred package manager.

Example installation command:

::: code-group

```sh [npm]
npm install -D eslint @eslint/compat @eslint/js eslint-config-airbnb-extended
```

```sh [yarn]
yarn add -D eslint @eslint/compat @eslint/js eslint-config-airbnb-extended
```

```sh [pnpm]
pnpm install -D eslint @eslint/compat @eslint/js eslint-config-airbnb-extended
```

:::

Example config file:

```txt
https://github.com/eslint-config/airbnb-extended/tree/master/apps/build-templates/templates/legacy/base/prettier/ts/default/eslint.config.mjs
```

## Optional Steps {#optional-steps}

1. Run the installation command if you didn’t skip dependency installation.
2. Check that `eslint.config.mjs` is created in your project’s root folder.
3. Add useful scripts in your `package.json` for quick linting:

::: code-group

```json [package.json]
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

:::
