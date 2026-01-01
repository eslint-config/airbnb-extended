import type { ArgsOutput } from '@/helpers/@types/getArgs.types';

export type GetCommandsParams = Pick<ArgsOutput, 'formatter' | 'packageManager'>;

export type GetCommands = (args: GetCommandsParams) => string[];
