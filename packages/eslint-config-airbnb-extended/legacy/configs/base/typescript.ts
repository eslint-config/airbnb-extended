import { legacyTypescriptConfig } from '@/legacy/configs/typescript/config';
import { defineConfigArray } from '@/utils';

export const legacyBaseTypescriptConfig = defineConfigArray(Object.values(legacyTypescriptConfig));
