import { nodeConfig } from '@/configs/node/config';
import { nodeRecommendedExtensionsConfig } from '@/extensions/node/recommended';
import { defineConfigArray } from '@/utils';

export const nodeRecommendedConfig = defineConfigArray([
  ...Object.values(nodeConfig),
  ...nodeRecommendedExtensionsConfig,
]);
