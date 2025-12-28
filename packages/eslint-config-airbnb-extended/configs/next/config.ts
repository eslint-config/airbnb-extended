import nextBaseRules from '@/rules/next/nextBase';
import nextCoreWebVitalsRules from '@/rules/next/nextCoreWebVitals';

import type { Linter } from 'eslint';

const nextConfig = {
  base: nextBaseRules as Linter.Config,
  coreWebVitals: nextCoreWebVitalsRules as Linter.Config,
} satisfies Record<string, Linter.Config>;

export default nextConfig;
