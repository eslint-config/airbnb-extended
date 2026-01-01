import type { ArgsOutput } from '@/helpers/@types/getArgs.types';

export type GetConfigUrlParams = Pick<
  ArgsOutput,
  'config' | 'language' | 'formatter' | 'strictConfig' | 'runtime' | 'legacyConfig'
>;

export interface GetConfigUrlOutput {
  path: string;
  url: string;
}

export type GetConfigUrl = (params: GetConfigUrlParams) => GetConfigUrlOutput | null;
