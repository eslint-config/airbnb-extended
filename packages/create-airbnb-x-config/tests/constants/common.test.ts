import { describe, expect, it } from 'vitest';

import {
  baseGithubRawUrl,
  baseGithubUrl,
  configs,
  defaults,
  eslintConfigName,
  formatters,
  languages,
  legacyConfigs,
  packageManagers,
  runtimes,
  strictConfigs,
  stringBooleans,
  subFolders,
} from '@/constants/common';

describe('constants/common', () => {
  it('keeps the public option values stable', () => {
    expect({
      configs,
      languages,
      formatters,
      runtimes,
      strictConfigs,
      legacyConfigs,
      packageManagers,
      stringBooleans,
      subFolders,
    }).toMatchInlineSnapshot(`
      {
        "configs": {
          "EXTENDED": "extended",
          "LEGACY": "legacy",
        },
        "formatters": {
          "NONE": "none",
          "PRETTIER": "prettier",
        },
        "languages": {
          "JAVASCRIPT": "javascript",
          "TYPESCRIPT": "typescript",
        },
        "legacyConfigs": {
          "BASE": "base",
          "REACT": "react",
          "REACT_HOOKS": "react-hooks",
        },
        "packageManagers": {
          "BUN": "bun",
          "NPM": "npm",
          "PNPM": "pnpm",
          "YARN": "yarn",
        },
        "runtimes": {
          "NEXT": "next",
          "NODE": "node",
          "REACT": "react",
          "REACT_ROUTER": "react-router",
          "REMIX": "remix",
        },
        "strictConfigs": {
          "IMPORT": "import",
          "NONE": "none",
          "REACT": "react",
          "TYPESCRIPT": "typescript",
        },
        "stringBooleans": {
          "FALSE": "false",
          "TRUE": "true",
        },
        "subFolders": {
          "DEFAULT": "default",
          "STRICT": "strict",
        },
      }
    `);
  });

  it('keeps the prompt defaults stable', () => {
    expect(defaults).toStrictEqual({
      config: configs.EXTENDED,
      language: languages.TYPESCRIPT,
      formatter: formatters.PRETTIER,
      strictConfig: false,
      legacyReactHooks: true,
      createEslintFile: true,
      skipInstall: false,
    });
  });

  it('uses a default for every value that is part of the option lists', () => {
    expect(Object.values(configs)).toContain(defaults.config);
    expect(Object.values(languages)).toContain(defaults.language);
    expect(Object.values(formatters)).toContain(defaults.formatter);
  });

  it('writes the flat config file name', () => {
    expect(eslintConfigName).toBe('eslint.config.mjs');
  });

  it('points to the templates folder on the master branch', () => {
    expect(baseGithubUrl).toBe(
      'https://github.com/eslint-config/airbnb-extended/tree/master/apps/build-templates/templates',
    );
    expect(baseGithubRawUrl).toBe(
      'https://raw.githubusercontent.com/eslint-config/airbnb-extended/refs/heads/master/apps/build-templates/templates',
    );
  });

  it('has no trailing slash on the base urls', () => {
    expect(baseGithubUrl.endsWith('/')).toBe(false);
    expect(baseGithubRawUrl.endsWith('/')).toBe(false);
  });
});
