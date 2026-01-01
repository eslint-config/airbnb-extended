import { detect } from 'package-manager-detector/detect';

import { packageManagers } from '@/constants';

import type { GetPackageManager } from '@/helpers/@types/getPackageManager.types';

const getPackageManager: GetPackageManager = async () => {
  const pm = await detect();
  if (!pm) return packageManagers.NPM;

  const { name } = pm;

  if (name === packageManagers.PNPM) return packageManagers.PNPM;
  if (name === packageManagers.YARN) return packageManagers.YARN;
  if (name === packageManagers.BUN) return packageManagers.BUN;
  return packageManagers.NPM;
};

export default getPackageManager;
