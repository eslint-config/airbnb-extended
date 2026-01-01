import type { GetConfigUrlParams } from '@/helpers/@types/getConfigUrl.types';

export type CreateESLintConfigFile = (params: GetConfigUrlParams) => Promise<void>;
