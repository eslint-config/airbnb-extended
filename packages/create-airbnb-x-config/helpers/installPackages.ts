import spawn from 'cross-spawn';

import { getCommands } from '@/helpers/getCommands';

import { GetCommandsParams } from '@/helpers/getCommands/getCommands.types';

/**
 * @see https://github.com/vercel/next.js/blob/canary/packages/create-next-app/helpers/install.ts
 */
export const installPackages = async (args: GetCommandsParams): Promise<void> => {
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
