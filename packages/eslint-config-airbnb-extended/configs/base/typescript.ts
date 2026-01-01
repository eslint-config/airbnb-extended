import typescriptConfig from '@/configs/typescript/config';
import baseTypescriptExtensionsConfig from '@/extensions/base/typescript';
import { defineConfigArray } from '@/utils';

const baseTypescriptConfig = defineConfigArray([
  ...Object.values(typescriptConfig),
  ...baseTypescriptExtensionsConfig,
]);

export default baseTypescriptConfig;
