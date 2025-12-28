/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '**/*': 'pnpm self:format',
  '**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}': 'pnpm self:lint',
};
