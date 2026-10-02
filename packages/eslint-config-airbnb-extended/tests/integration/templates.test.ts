import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import * as extended from '@/index';
import * as legacy from '@/legacy';
import { packageRoot } from '@/tests/fixtures/ruleGroups';

/**
 * The generated `eslint.config.mjs` templates (apps/build-templates) use the public api of this package.
 * If a plugin, a config or a rule group is renamed or removed here, the templates (and the CLI) break.
 * These tests read every template and check that everything it uses still exists.
 */

const templatesRoot = path.resolve(packageRoot, '../../apps/build-templates/templates');

const listTemplates = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? listTemplates(fullPath) : [fullPath];
  });

const templates = listTemplates(templatesRoot)
  .filter((file) => file.endsWith('eslint.config.mjs'))
  .map((file) => ({
    name: path.relative(templatesRoot, file).split(path.sep).join('/'),
    source: fs.readFileSync(file, 'utf8'),
  }));

const withoutCommentsAndImports = (source: string) =>
  source
    .replaceAll(/\/\*[\s\S]*?\*\//g, '')
    .replaceAll(/^\s*\/\/.*$/gm, '')
    .replaceAll(/^import[\s\S]*?;$/gm, '');

const getPath = (root: unknown, parts: string[]): unknown =>
  parts.reduce<unknown>(
    (value, key) => (value as Record<string, unknown> | undefined)?.[key],
    root,
  );

describe('integration/templates', () => {
  it('finds the generated templates', () => {
    expect(templates.length).toBeGreaterThan(0);
  });

  describe.each(templates)('$name', ({ name, source }) => {
    const isLegacy = name.startsWith('legacy/');
    const api: Record<string, unknown> = isLegacy ? { ...legacy } : { ...extended };

    it('imports from the right entry of this package', () => {
      const entry = isLegacy
        ? 'eslint-config-airbnb-extended/legacy'
        : 'eslint-config-airbnb-extended';

      expect(source).toContain(`from '${entry}'`);
      expect(source).not.toContain(
        isLegacy ? "from 'eslint-config-airbnb-extended';" : 'eslint-config-airbnb-extended/legacy',
      );
    });

    it('only imports names that the package exports', () => {
      const match = new RegExp(
        String.raw`import \{([^}]+)\} from '${isLegacy ? 'eslint-config-airbnb-extended/legacy' : 'eslint-config-airbnb-extended'}';`,
      ).exec(source);
      const imported = (match?.[1] ?? '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

      expect(imported.length).toBeGreaterThan(0);
      expect(imported.filter((item) => !(item in api))).toStrictEqual([]);
    });

    it('only uses configs, plugins and rules that exist', () => {
      const code = withoutCommentsAndImports(source);
      const references = [
        ...code.matchAll(/(?<=^|[^\w.]|\.\.\.)(configs|plugins|rules)((?:\.[A-Za-z0-9]+)+)/g),
      ].map((match) => match[0]);

      expect(references.length).toBeGreaterThan(0);

      const missing = references.filter((reference) => {
        const [root = '', ...parts] = reference.split('.');
        return getPath(api[root], parts) === undefined;
      });

      expect(missing).toStrictEqual([]);
    });

    it('spreads config arrays and does not spread config objects', () => {
      const code = withoutCommentsAndImports(source);
      const spread = [...code.matchAll(/\.\.\.(configs(?:\.[A-Za-z0-9]+)+)/g)].map(
        (match) => match[1] ?? '',
      );

      for (const reference of spread) {
        const [root = '', ...parts] = reference.split('.');
        expect(Array.isArray(getPath(api[root], parts)), reference).toBe(true);
      }
    });
  });
});
