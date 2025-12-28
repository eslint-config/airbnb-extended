import importXPluginConfig from '@/plugins/importXPlugin';
import nextPlugin from '@/plugins/nextPlugin';
import nodePlugin from '@/plugins/nodePlugin';
import reactA11yPlugin from '@/plugins/reactA11yPlugin';
import reactHooksPlugin from '@/plugins/reactHooksPlugin';
import reactPlugin from '@/plugins/reactPlugin';
import stylisticPlugin from '@/plugins/stylisticPlugin';
import typescriptEslintPlugin from '@/plugins/typescriptEslintPlugin';

const plugins = {
  stylistic: stylisticPlugin,
  importX: importXPluginConfig,
  node: nodePlugin,
  react: reactPlugin,
  reactA11y: reactA11yPlugin,
  reactHooks: reactHooksPlugin,
  next: nextPlugin,
  typescriptEslint: typescriptEslintPlugin,
} as const;

export default plugins;
