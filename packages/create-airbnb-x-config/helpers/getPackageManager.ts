import { detect } from 'package-manager-detector/detect';

import { packageManagers } from '@/constants';

import { PackageManagerType } from '@/constants/@types/index.types';

export const getPackageManager = async (): Promise<PackageManagerType> => {
  const pm = await detect();
  if (!pm) return packageManagers.NPM;

  const { name } = pm;

  if (name === packageManagers.PNPM) return packageManagers.PNPM;
  if (name === packageManagers.YARN) return packageManagers.YARN;
  if (name === packageManagers.BUN) return packageManagers.BUN;
  return packageManagers.NPM;
};
