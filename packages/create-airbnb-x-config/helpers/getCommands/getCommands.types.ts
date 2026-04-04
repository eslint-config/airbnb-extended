import type { ArgsOutput } from '@/helpers/getArgs/getArgs.types';

export type GetCommandsParams = Pick<ArgsOutput, 'formatter' | 'packageManager'>;

export type GetCommands = (args: GetCommandsParams) => string[];
