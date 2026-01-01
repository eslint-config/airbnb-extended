import type { GetCommandsParams } from '@/helpers/@types/getCommands.types';

export type InstallPackages = (args: GetCommandsParams) => Promise<void>;
