import { typescriptConfig } from '@/configs/typescript/config';
import { baseTypescriptExtensionsConfig } from '@/extensions/base/typescript';
import { defineConfigArray } from '@/utils';

export const baseTypescriptConfig = defineConfigArray([
  ...Object.values(typescriptConfig),
  ...baseTypescriptExtensionsConfig,
]);
