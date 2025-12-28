import { configs, plugins, rules } from 'eslint-config-airbnb-extended';

const customTSESLintConfig = [
  // TypeScript ESLint Plugin
  plugins.typescriptEslint,
  // Airbnb Base TypeScript Config
  ...configs.base.typescript,
  // Airbnb TypeScript ESLint Strict Rules
  rules.typescript.typescriptEslintStrict,
];

export default customTSESLintConfig;
