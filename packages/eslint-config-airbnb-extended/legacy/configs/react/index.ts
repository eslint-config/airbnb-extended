import legacyReactBaseConfig from '@/legacy/configs/react/base';
import legacyReactHooksConfig from '@/legacy/configs/react/hooks';
import legacyReactLegacyConfig from '@/legacy/configs/react/legacy';
import legacyReactRecommendedConfig from '@/legacy/configs/react/recommended';
import legacyReactTypescriptConfig from '@/legacy/configs/react/typescript';

const legacyReact = {
  legacy: legacyReactLegacyConfig,
  base: legacyReactBaseConfig,
  recommended: legacyReactRecommendedConfig,
  hooks: legacyReactHooksConfig,
  typescript: legacyReactTypescriptConfig,
} as const;

export default legacyReact;
