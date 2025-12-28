import legacyTypescriptConfig from '@/legacy/configs/typescript/config';
import { defineConfigArray } from '@/utils';

const legacyBaseTypescriptConfig = defineConfigArray(Object.values(legacyTypescriptConfig));

export default legacyBaseTypescriptConfig;
