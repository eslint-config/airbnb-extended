export const configs = {
  EXTENDED: 'extended',
  LEGACY: 'legacy',
} as const;

export const languages = {
  JAVASCRIPT: 'javascript',
  TYPESCRIPT: 'typescript',
} as const;

export const formatters = {
  PRETTIER: 'prettier',
} as const;

export const runtimes = {
  REACT: 'react',
  REACT_ROUTER: 'react-router',
  REMIX: 'remix',
  NEXT: 'next',
  NODE: 'node',
} as const;

export const strictConfigs = {
  IMPORT: 'import',
  REACT: 'react',
  TYPESCRIPT: 'typescript',
} as const;

export const legacyConfigs = {
  BASE: 'base',
  REACT: 'react',
  REACT_HOOKS: 'react-hooks',
} as const;

export const packageManagers = {
  NPM: 'npm',
  YARN: 'yarn',
  PNPM: 'pnpm',
  BUN: 'bun',
} as const;

export const stringBooleans = {
  TRUE: 'true',
  FALSE: 'false',
} as const;

export const defaults = {
  config: configs.EXTENDED,
  language: languages.TYPESCRIPT,
  formatter: formatters.PRETTIER,
  strictConfig: false,
  legacyReactHooks: true,
  createEslintFile: true,
  skipInstall: false,
} as const;

// This constant is based on /apps/templates/lib/constants.ts
export const subFolders = {
  DEFAULT: 'default',
  STRICT: 'strict',
} as const;

export const eslintConfigName = 'eslint.config.mjs';

export const baseGithubUrl =
  'https://github.com/NishargShah/eslint-config-airbnb-extended/tree/master/apps/build-templates/templates';

export const baseGithubRawUrl =
  'https://raw.githubusercontent.com/NishargShah/eslint-config-airbnb-extended/refs/heads/master/apps/build-templates/templates';
