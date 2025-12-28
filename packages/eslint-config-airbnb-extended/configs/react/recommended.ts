import reactConfig from '@/configs/react/config';
import reactRecommendedExtensionsConfig from '@/extensions/react/recommended';

import type { Linter } from 'eslint';

const reactRecommendedConfig = [
  ...Object.values(reactConfig),
  ...reactRecommendedExtensionsConfig,
] as Linter.Config[];

export default reactRecommendedConfig;
