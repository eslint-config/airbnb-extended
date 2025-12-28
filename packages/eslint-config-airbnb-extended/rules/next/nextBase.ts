import { allFiles, defineConfigObject } from '@/utils';

const nextBaseRules = defineConfigObject({
  name: 'airbnb/config/next/base',
  files: allFiles,
  rules: {
    // Enforce font-display behavior with Google Fonts.
    // https://nextjs.org/docs/messages/google-font-display
    '@next/next/google-font-display': 'warn',

    // Ensure preconnect is used with Google Fonts.
    // https://nextjs.org/docs/messages/google-font-preconnect
    '@next/next/google-font-preconnect': 'warn',

    // Enforce id attribute on next/script components with inline content.
    // https://nextjs.org/docs/messages/inline-script-id
    '@next/next/inline-script-id': 'error',

    // Prefer next/script component when using the inline script for Google Analytics.
    // https://nextjs.org/docs/messages/next-script-for-ga
    '@next/next/next-script-for-ga': 'warn',

    // Prevent assignment to the module variable.
    // https://nextjs.org/docs/messages/no-assign-module-variable
    '@next/next/no-assign-module-variable': 'error',

    // Prevent client components from being async functions.
    // https://nextjs.org/docs/messages/no-async-client-component
    '@next/next/no-async-client-component': 'warn',

    // Prevent usage of next/script's beforeInteractive strategy outside of pages/_document.js.
    // https://nextjs.org/docs/messages/no-before-interactive-script-outside-document
    '@next/next/no-before-interactive-script-outside-document': 'warn',

    // Prevent manual stylesheet tags.
    // https://nextjs.org/docs/messages/no-css-tags
    '@next/next/no-css-tags': 'warn',

    // Prevent importing next/document outside of pages/_document.js.
    // https://nextjs.org/docs/messages/no-document-import-in-page
    '@next/next/no-document-import-in-page': 'error',

    // Prevent duplicate usage of <Head> in pages/_document.js.
    // https://nextjs.org/docs/messages/no-duplicate-head
    '@next/next/no-duplicate-head': 'error',

    // Prevent usage of <head> element.
    // https://nextjs.org/docs/messages/no-head-element
    '@next/next/no-head-element': 'warn',

    // Prevent usage of next/head in pages/_document.js.
    // https://nextjs.org/docs/messages/no-head-import-in-document
    '@next/next/no-head-import-in-document': 'error',

    // Prevent usage of <a> elements to navigate to internal Next.js pages.
    // https://nextjs.org/docs/messages/no-html-link-for-pages
    '@next/next/no-html-link-for-pages': 'warn',

    // Prevent usage of <img> element due to slower LCP and higher bandwidth.
    // https://nextjs.org/docs/messages/no-img-element
    '@next/next/no-img-element': 'warn',

    // Prevent page-only custom fonts.
    // https://nextjs.org/docs/messages/no-page-custom-font
    '@next/next/no-page-custom-font': 'warn',

    // Prevent usage of next/script in next/head component.
    // https://nextjs.org/docs/messages/no-script-component-in-head
    '@next/next/no-script-component-in-head': 'error',

    // Prevent usage of styled-jsx in pages/_document.js.
    // https://nextjs.org/docs/messages/no-styled-jsx-in-document
    '@next/next/no-styled-jsx-in-document': 'warn',

    // Prevent synchronous scripts.
    // https://nextjs.org/docs/messages/no-sync-scripts
    '@next/next/no-sync-scripts': 'warn',

    // Prevent usage of <title> with Head component from next/document.
    // https://nextjs.org/docs/messages/no-title-in-document-head
    '@next/next/no-title-in-document-head': 'warn',

    // Prevent common typos in Next.js's data fetching functions
    // https://nextjs.org/docs/pages/building-your-application/data-fetching
    '@next/next/no-typos': 'warn',

    // Prevent duplicate polyfills from Polyfill.io.
    // https://nextjs.org/docs/messages/no-unwanted-polyfillio
    '@next/next/no-unwanted-polyfillio': 'warn',
  },
});

export default nextBaseRules;
