import nextBaseRules from '@/rules/next/nextBase';
import nextCoreWebVitalsRules from '@/rules/next/nextCoreWebVitals';

const nextConfig = {
  base: nextBaseRules,
  coreWebVitals: nextCoreWebVitalsRules,
} as const;

export default nextConfig;
