import { configs, plugins, rules } from '@/index';
import { legacyConfigs } from '@/legacy/configs';

import type { Linter } from 'eslint';

/**
 * The eslint.config.mjs setups that `create-airbnb-x-config` generates, built from the public API.
 * (`@eslint/js`, `@eslint/compat` and prettier are left out, they are not part of this package.)
 */

const base = [plugins.stylistic, plugins.importX, ...configs.base.recommended] as Linter.Config[];

const typescript = [plugins.typescriptEslint, ...configs.base.typescript] as Linter.Config[];

const reactPlugins = [plugins.react, plugins.reactHooks, plugins.reactA11y] as Linter.Config[];

export const extendedProfiles = {
  'base js': base,
  'base js + strict import': [...base, rules.base.importsStrict],
  'base ts': [...base, ...typescript],
  'base ts + strict typescript': [...base, ...typescript, rules.typescript.typescriptEslintStrict],
  'react js': [...base, ...reactPlugins, ...configs.react.recommended],
  'react js + strict react': [
    ...base,
    ...reactPlugins,
    ...configs.react.recommended,
    rules.react.strict,
  ],
  'react ts': [
    ...base,
    ...reactPlugins,
    ...configs.react.recommended,
    ...typescript,
    ...configs.react.typescript,
  ],
  'next js': [...base, ...reactPlugins, plugins.next, ...configs.next.recommended],
  'next ts': [
    ...base,
    ...reactPlugins,
    plugins.next,
    ...configs.next.recommended,
    ...typescript,
    ...configs.next.typescript,
  ],
  'node js': [...base, plugins.node, ...configs.node.recommended],
  'node ts': [...base, plugins.node, ...configs.node.recommended, ...typescript],
} as Record<string, Linter.Config[]>;

export const legacyProfiles = {
  'legacy base': [...legacyConfigs.base.recommended],
  'legacy base ts': [...legacyConfigs.base.recommended, ...legacyConfigs.base.typescript],
  'legacy react': [...legacyConfigs.react.recommended],
  'legacy react + hooks': [...legacyConfigs.react.recommended, ...legacyConfigs.react.hooks],
  'legacy react ts': [...legacyConfigs.react.recommended, ...legacyConfigs.react.typescript],
} as Record<string, Linter.Config[]>;
