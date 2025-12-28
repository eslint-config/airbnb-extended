/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import nodeRecommendedConfig from '@/configs/node/recommended';

import type { Linter } from 'eslint';

const node = {
  recommended: nodeRecommendedConfig as Linter.Config[],
} as const;

export default node;
