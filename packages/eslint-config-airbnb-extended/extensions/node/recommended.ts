import nodePlugin from 'eslint-plugin-n';

import { nodeNoUnsupportedFeaturesInternalRules } from '@/rules/node/nodeNoUnsupportedFeatures';
import { allFiles, defineConfigArray } from '@/utils';

const flatNodeConfig = nodePlugin.configs['flat/recommended'];
const flatModuleConfig = nodePlugin.configs['flat/recommended-module'];
const flatScriptConfig = nodePlugin.configs['flat/recommended-script'];

const nodeRecommendedExtensionsConfig = defineConfigArray([
  {
    name: 'airbnb/config/node-configurations',
    files: allFiles,
    ...(flatNodeConfig
      ? {
          languageOptions: flatNodeConfig.languageOptions,
          rules: {
            'n/no-unsupported-features/es-syntax':
              flatNodeConfig.rules?.['n/no-unsupported-features/es-syntax'] ??
              nodeNoUnsupportedFeaturesInternalRules['n/no-unsupported-features/es-syntax'],
          },
        }
      : null),
  },
  {
    name: 'airbnb/config/node-configurations-for-module',
    files: ['**/*.mjs', '**/*.mts'],
    ...(flatModuleConfig
      ? {
          languageOptions: flatModuleConfig.languageOptions,
          rules: {
            'n/no-unsupported-features/es-syntax':
              flatModuleConfig.rules?.['n/no-unsupported-features/es-syntax'] ??
              nodeNoUnsupportedFeaturesInternalRules['n/no-unsupported-features/es-syntax'],
          },
        }
      : null),
  },
  {
    name: 'airbnb/config/node-configurations-for-script',
    files: ['**/*.cjs', '**/*.cts'],
    ...(flatScriptConfig
      ? {
          languageOptions: flatScriptConfig.languageOptions,
          rules: {
            'n/no-unsupported-features/es-syntax':
              flatScriptConfig.rules?.['n/no-unsupported-features/es-syntax'] ??
              nodeNoUnsupportedFeaturesInternalRules['n/no-unsupported-features/es-syntax'],
          },
        }
      : null),
  },
]);

export default nodeRecommendedExtensionsConfig;
