# Getting Started {#getting-started}

A powerful ESLint configuration extending the popular Airbnb style guide, with added support for TypeScript. It comes with two core packages

- [`eslint-config-airbnb-extended`](../config/installation): Extends Airbnb's ESLint config to support TypeScript and custom rules.
- [`create-airbnb-x-config`](../cli/guide): A CLI tool to quickly set up and customize your ESLint configuration with the Airbnb Extended setup.

## Goodbye Legacy, Hello to Flat Config {#hello-to-flat-config}

This package is designed **exclusively for ESLint’s new Flat Config system**. Legacy `.eslintrc*` files are **not supported**.

If your project still relies on `.eslintrc`, you should continue using the older Airbnb packages. By focusing only on Flat Config, this package stays **modern, lightweight, and future-proof**.

## Note {#note}

This package was created by taking reference from the following ESLint configuration packages:

- [`eslint-config-airbnb-base`](https://www.npmjs.com/package/eslint-config-airbnb-base)
- [`eslint-config-airbnb`](https://www.npmjs.com/package/eslint-config-airbnb)
- [`eslint-config-airbnb-typescript`](https://www.npmjs.com/package/eslint-config-airbnb-typescript)

These packages are no longer maintained. To ensure continued compatibility and keep up-to-date with the latest versions of dependencies, I have updated the dependencies and extended their functionality, resulting in the creation of the `eslint-config-airbnb-extended` package, which is actively maintained and fully supports TypeScript.

## Migration {#migration}

Please refer to the [migration guide](../migration/upgrade-to-extended) for more details.
