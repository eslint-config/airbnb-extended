import { allFiles, defineConfigObject } from '@/utils';

const nextCoreWebVitalsRules = defineConfigObject({
  name: 'airbnb/config/next/core-web-vitals',
  files: allFiles,
  rules: {
    // Prevent usage of <a> elements to navigate to internal Next.js pages.
    // https://nextjs.org/docs/messages/no-html-link-for-pages
    '@next/next/no-html-link-for-pages': 'error',

    // Prevent synchronous scripts.
    // https://nextjs.org/docs/messages/no-sync-scripts
    '@next/next/no-sync-scripts': 'error',
  },
});

export default nextCoreWebVitalsRules;
