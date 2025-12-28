/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import legacyReactBaseConfig from '@/legacy/configs/react/base';
import legacyReactHooksConfig from '@/legacy/configs/react/hooks';
import legacyReactLegacyConfig from '@/legacy/configs/react/legacy';
import legacyReactRecommendedConfig from '@/legacy/configs/react/recommended';
import legacyReactTypescriptConfig from '@/legacy/configs/react/typescript';

import type { Linter } from 'eslint';

const legacyReact = {
  legacy: legacyReactLegacyConfig as Linter.Config[],
  base: legacyReactBaseConfig as Linter.Config[],
  recommended: legacyReactRecommendedConfig as Linter.Config[],
  hooks: legacyReactHooksConfig as Linter.Config[],
  typescript: legacyReactTypescriptConfig as Linter.Config[],
} as const;

export default legacyReact;
