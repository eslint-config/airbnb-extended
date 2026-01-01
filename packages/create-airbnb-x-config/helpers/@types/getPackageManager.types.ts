import type { PackageManagerType } from '@/constants/@types/index.types';

export type GetPackageManager = () => Promise<PackageManagerType>;
