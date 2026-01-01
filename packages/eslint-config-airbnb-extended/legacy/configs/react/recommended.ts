import legacyBaseRecommendedConfig from '@/legacy/configs/base/recommended';
import legacyReactConfig from '@/legacy/configs/react/config';
import { defineConfigArray } from '@/utils';

const legacyReactRecommendedConfig = defineConfigArray([
  ...legacyBaseRecommendedConfig,
  legacyReactConfig.base,
  legacyReactConfig.jsxA11y,
]);

export default legacyReactRecommendedConfig;
