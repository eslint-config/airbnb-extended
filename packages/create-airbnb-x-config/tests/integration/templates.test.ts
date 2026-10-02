import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { getConfigUrl } from '@/helpers/getConfigUrl';
import { extendedCombinations, legacyCombinations } from '@/tests/fixtures/combinations';

/**
 * The CLI downloads `eslint.config.mjs` files from `apps/build-templates/templates`.
 * These tests keep both sides in sync:
 * - every answer the CLI can produce must point to a real template
 * - every generated template must be reachable from some CLI answer
 */

const templatesRoot = path.resolve(
  import.meta.dirname,
  '../../../../apps/build-templates/templates',
);

const listTemplates = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listTemplates(fullPath);
    return [path.relative(templatesRoot, fullPath).split(path.sep).join('/')];
  });

describe('integration/templates', () => {
  const templates = listTemplates(templatesRoot);
  const cliPaths = [...extendedCombinations, ...legacyCombinations].map(
    (params) => getConfigUrl(params)?.path ?? '',
  );

  it('finds the generated templates', () => {
    expect(templates.length).toBeGreaterThan(0);
  });

  it.each(cliPaths)('has a template for %s', (cliPath) => {
    expect(templates).toContain(cliPath);
  });

  it('has no template that the CLI can never ask for', () => {
    expect(templates.filter((template) => !cliPaths.includes(template))).toStrictEqual([]);
  });

  it('only contains eslint.config.mjs files', () => {
    expect(templates.filter((template) => !template.endsWith('/eslint.config.mjs'))).toStrictEqual(
      [],
    );
  });

  it('has no empty template', () => {
    for (const template of templates) {
      expect(fs.readFileSync(path.join(templatesRoot, template), 'utf8').trim()).not.toBe('');
    }
  });
});
