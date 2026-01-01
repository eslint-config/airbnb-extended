/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '**/*': 'pnpm root:format',
  '**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}': 'pnpm root:lint',
};
