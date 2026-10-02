/**
 * Turns an ESLint config (object or array) into plain, stable data for snapshots.
 * Plugins, parsers and resolvers are huge and circular, so they are reduced to a label.
 */

type Plain = null | boolean | number | string | Plain[] | { [key: string]: Plain };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const labelOf = (value: Record<string, unknown>, fallback: string): string => {
  const meta = value.meta as { name?: string } | undefined;
  const name = meta?.name ?? (value.name as string | undefined);

  return name ? `[${fallback}: ${name}]` : `[${fallback}]`;
};

export const serialize = (value: unknown, parentKey = '', seen = new WeakSet<object>()): Plain => {
  if (value === null || value === undefined) return null;
  if (typeof value === 'function') return `[Function ${value.name}]`.replace(/ \]$/, ']');
  if (typeof value === 'bigint' || typeof value === 'symbol') return String(value);
  if (typeof value !== 'object') return value as boolean | number | string;

  if (seen.has(value)) return '[Circular]';

  if (Array.isArray(value)) {
    seen.add(value);
    const result = value.map((item) => serialize(item, parentKey, seen));
    seen.delete(value);
    return result;
  }

  if (value instanceof RegExp) return String(value);

  if (isRecord(value)) {
    if (parentKey === 'parser') return labelOf(value, 'parser');
    if (parentKey === 'plugins') {
      return Object.fromEntries(
        Object.entries(value).map(([key, plugin]) => [
          key,
          isRecord(plugin) ? labelOf(plugin, 'plugin') : '[plugin]',
        ]),
      );
    }
    if (typeof value.resolve === 'function') return labelOf(value, 'resolver');

    seen.add(value);
    const result = Object.fromEntries(
      Object.entries(value)
        .filter(([, item]) => item !== undefined)
        .map(([key, item]) => [key, serialize(item, key, seen)]),
    );
    seen.delete(value);

    return result;
  }

  return String(value);
};
