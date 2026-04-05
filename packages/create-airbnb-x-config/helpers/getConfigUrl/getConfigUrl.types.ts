import type { ArgsOutput } from '@/helpers/getArgs/getArgs.types';

export type GetConfigUrlParams = Pick<
  ArgsOutput,
  'config' | 'language' | 'formatter' | 'strictConfig' | 'runtime' | 'legacyConfig'
>;

export interface GetConfigUrlOutput {
  path: string;
  url: string;
}

export type GetConfigUrl = (params: GetConfigUrlParams) => GetConfigUrlOutput | null;
