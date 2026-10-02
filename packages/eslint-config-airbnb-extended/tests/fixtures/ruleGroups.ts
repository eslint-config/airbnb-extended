import fs from 'node:fs';
import path from 'node:path';

export const packageRoot = path.resolve(import.meta.dirname, '../..');

export type RuleGroupKind = 'active' | 'deprecated' | 'experimental';

export interface RuleGroup {
  /** `rules/react/react.ts` */
  file: string;
  /** `reactBaseRules` */
  exportName: string;
  kind: RuleGroupKind;
  /** `true` for `defineConfigObject` exports, `false` for plain rule maps (`*InternalRules`). */
  isConfigObject: boolean;
  /** Exported value as it is. */
  value: Record<string, unknown>;
  /** The map of `ruleId -> setting`. */
  rules: Record<string, unknown>;
}

const walk = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });

export const listFiles = (folder: string): string[] =>
  walk(path.join(packageRoot, folder))
    .filter((file) => file.endsWith('.ts') && !file.endsWith('.d.ts'))
    .map((file) => path.relative(packageRoot, file).split(path.sep).join('/'))
    .sort((a, b) => a.localeCompare(b));

const getKind = (exportName: string): RuleGroupKind => {
  if (exportName.startsWith('deprecated')) return 'deprecated';
  if (exportName.startsWith('experimental')) return 'experimental';
  return 'active';
};

/** Loads every export of every file inside `rules/` or `legacy/rules/` (except the index), so new files are covered automatically. */
export const loadRuleGroups = async (folder = 'rules'): Promise<RuleGroup[]> => {
  const files = listFiles(folder).filter((file) => file !== `${folder}/index.ts`);

  const groups = await Promise.all(
    files.map(async (file) => {
      const module = (await import(path.join(packageRoot, file))) as Record<string, unknown>;

      return Object.entries(module).map(([exportName, value]): RuleGroup => {
        const record = value as Record<string, unknown>;
        const isConfigObject = 'rules' in record && 'name' in record;

        return {
          file,
          exportName,
          kind: getKind(exportName),
          isConfigObject,
          value: record,
          rules: (isConfigObject ? record.rules : record) as Record<string, unknown>,
        };
      });
    }),
  );

  return groups.flat();
};
