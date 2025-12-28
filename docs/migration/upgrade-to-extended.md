# Migration Guide {#migration}

Migrating from the old Airbnb ESLint configs to **eslint-config-airbnb-extended** is straightforward, but there are a few key changes you need to be aware of, especially around ESLint’s new **Flat Config** system.

Follow these steps to safely migrate your project.

## 1. Uninstall Old Packages {#uninstall-old-packages}

Remove the following legacy Airbnb packages from your `package.json`:

- `eslint-config-airbnb-base`
- `eslint-config-airbnb`
- `eslint-config-airbnb-typescript`

You no longer need them, as `eslint-config-airbnb-extended` consolidates all of their functionality into a single modern config.

::: code-group

```sh [npm]
$ npm uninstall eslint-config-airbnb-base eslint-config-airbnb eslint-config-airbnb-typescript
```

```sh [yarn]
$ yarn remove eslint-config-airbnb-base eslint-config-airbnb eslint-config-airbnb-typescript
```

```sh [pnpm]
$ pnpm remove eslint-config-airbnb-base eslint-config-airbnb eslint-config-airbnb-typescript
```

:::

## 2. Migrate to Flat Config {#migrate-flat-config}

The extended config works **only with ESLint’s Flat Config system**.
This means you cannot use legacy `.eslintrc.*` files anymore. Instead, your project root will use `eslint.config.mjs`.

If you're still using `.eslintrc`, follow ESLint’s official [migration guide](https://eslint.org/docs/latest/use/configure/migration-guide) and ESLint’s blog posts on the new config system [Part 1](https://eslint.org/blog/2022/08/new-config-system-part-1/) and [Part 2](https://eslint.org/blog/2022/08/new-config-system-part-2/).

## 3. Follow Installation Steps {#follow-installation-steps}

Once your project is ready for Flat Config, Follow the [installation steps](../config/installation) to add the new config to your project.

## 4. Update `import/*` Rules {#update-rules}

One important change in this package is the switch from the `import/*` rules to `import-x/*`.

::: code-group

```js [eslint.config.mjs]
"import/no-unresolved": "off" // [!code --]
"import-x/no-unresolved": "off" // [!code ++]
```

:::

Why the change?
See the explanation [here](../config/faq#faq).

## 5. Verify and Clean Up {#verify-clean-up}

Once migration is complete:

- Run `eslint .` and check that the linter works without errors.
- Remove any unused ESLint-related dependencies that may still be lingering.
- Commit your changes so the whole team benefits from the new setup.

## All Done! {#all-done}

Your project is now using the **modern, TypeScript-ready Airbnb Extended config** with ESLint 9+.
Enjoy a cleaner, more consistent codebase without the hassle of outdated configs!
