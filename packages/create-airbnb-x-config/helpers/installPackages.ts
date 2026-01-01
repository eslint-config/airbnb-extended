import spawn from 'cross-spawn';

import getCommands from '@/helpers/getCommands';

import type { InstallPackages } from '@/helpers/@types/installPackages.types';

/**
 * @see https://github.com/vercel/next.js/blob/canary/packages/create-next-app/helpers/install.ts
 */
const installPackages: InstallPackages = async (args) => {
  const [packageManager, ...commands] = getCommands(args);

  return new Promise((resolve, reject) => {
    const child = spawn(packageManager, commands, {
      stdio: 'inherit',
      env: {
        ...process.env,
        ADBLOCK: '1',
        // we set NODE_ENV to development as pnpm skips dev
        // dependencies when production
        NODE_ENV: 'development',
        DISABLE_OPENCOLLECTIVE: '1',
      },
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`${packageManager} ${commands.join(' ')}`, { cause: 'package-failed' }));
        return;
      }

      resolve();
    });
  });
};

export default installPackages;
