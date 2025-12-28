/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '**/*': 'pnpm format',
  '**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}': 'pnpm lint',
  '**/*.{ts,tsx}': 'tsc-files --noEmit',
};
