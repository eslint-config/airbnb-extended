import { defineConfig } from 'tsdown';

import type { UserConfig } from 'tsdown';

export default defineConfig((options) => {
  const { watch } = options;

  const common = {
    dts: true,
    outDir: 'dist',
    platform: 'node',
    treeshake: !watch,
    minify: !watch,
    nodeProtocol: true,
    unbundle: true,
  } satisfies UserConfig;

  return [
    {
      ...common,
      entry: 'index.ts',
      format: ['cjs', 'esm'],
    },
    {
      ...common,
      entry: 'legacy.ts',
      format: 'cjs',
    },
  ];
});
