import reactConfig from '@/configs/react/config';
import reactRecommendedExtensionsConfig from '@/extensions/react/recommended';
import { defineConfigArray } from '@/utils';

const reactRecommendedConfig = defineConfigArray([
  ...Object.values(reactConfig),
  ...reactRecommendedExtensionsConfig,
]);

export default reactRecommendedConfig;
