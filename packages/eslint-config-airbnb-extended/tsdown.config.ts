import { defineConfig } from 'tsdown';

export default defineConfig((options) => {
  const { watch } = options;

  return {
    entry: ['index.ts', 'legacy.ts'],
    dts: true,
    format: 'esm',
    outDir: 'dist',
    platform: 'node',
    treeshake: !watch,
    minify: !watch,
    exports: true,
    nodeProtocol: true,
    unbundle: true,
  };
});
