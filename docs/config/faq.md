# FAQ {#faq}

Here are some of the most common questions and clarifications about using `eslint-config-airbnb-extended`. This section will help you understand differences, setup tips, and design decisions behind the package.

## 1. Does this package support `.eslintrc` configs? {#legacy-support}

No. This package is designed exclusively for the **Flat Config system** introduced in ESLint 9.
The legacy `.eslintrc` format is now **deprecated** and will not receive further updates or improvements.

If your project still depends on `.eslintrc`, we recommend continuing with the older Airbnb packages, see [Note](../guide/getting-started#note).

If you’d like to migrate to the Flat Config format instead, follow our [Migration Guide](../migration/upgrade-to-extended).

## 2. Difference between Extended vs Legacy Config {#extended-vs-legacy}

See the detailed comparison [here](./extended-vs-legacy).

## 3. How to Configure for a Monorepo? {#configure-monorepo}

Monorepo setups often include multiple apps or packages under a single repository. ESLint configuration can be tricky in such environments.

Here are your options:

1. **Install per package** – Run the installation command inside each sub-folder (e.g., `/apps/web`, `/apps/api`) where you want to apply the config. This keeps things isolated and easy to manage.
2. **Install once at the root** – Alternatively, you can install the config at the root of the repo and share it across packages. In this case, you’ll need to customize the `eslint.config.mjs` file to include overrides for different folders.

::: tip

If you skip the the package installation in the CLI, the CLI will generate a set of ready-to-use commands based on your selection, so you can copy-paste and adapt them to your monorepo’s structure.

:::

## 4. Why did we switch from `import` to `import-x`? {#import-vs-import-x}

We moved from [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import) to [`eslint-plugin-import-x`](https://www.npmjs.com/package/eslint-plugin-import-x) because it is a **superior, modern alternative**.

Key reasons:

- **Better TypeScript support** – Provides more accurate and reliable linting for TS files.
- **Actively maintained** – Frequent updates and bug fixes, unlike the original `import` plugin which is less active.
- **Fewer open issues** – More stable and trustworthy in production projects.
- **Performance improvements** – Lightweight and optimized for faster linting.

In short, `import-x` is the **community-recommended successor** to `import` and ensures your project stays future-proof.

## 5. Why are `plugins` separated from the `config` in this package? {#why-separated-plugins}

If you’ve ever used multiple ESLint configs together, you may have run into this frustrating error:

::: danger Error

Config "package": Key "plugins": Cannot redefine plugin "key".

:::

This happens because ESLint doesn’t allow multiple configs to define the same plugin name. If shared configs **bundle plugins inside them**, conflicts are unavoidable.

To solve this, **our package separates the plugin definitions**:

- The config focuses only on **rules and settings**.
- The plugins are exported separately via the `plugins` export.

This design has several **benefits**:

- No plugin redefinition errors when combining configs.
- Works seamlessly with other ESLint configs (official or community).
- Gives developers flexibility: import only the plugins you need.

For more details on the plugins used, refer to [Packages Used](./packages-used).
