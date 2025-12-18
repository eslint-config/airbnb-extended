import baseExtensions from '@/extensions/base';
import nextExtensions from '@/extensions/next';
import nodeExtensions from '@/extensions/node';
import reactExtensions from '@/extensions/react';

const extensions = {
  base: baseExtensions,
  react: reactExtensions,
  next: nextExtensions,
  node: nodeExtensions,
} as const;

export default extensions;
