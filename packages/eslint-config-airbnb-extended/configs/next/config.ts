import { nextBaseRules } from '@/rules/next/nextBase';
import { nextCoreWebVitalsRules } from '@/rules/next/nextCoreWebVitals';

export const nextConfig = {
  base: nextBaseRules,
  coreWebVitals: nextCoreWebVitalsRules,
} as const;
