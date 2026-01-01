export type Content = (string | Content)[];

type ContentFormatter = (content: Content, level?: number) => string[];

const contentFormatter: ContentFormatter = (content, level = 0) =>
  content.reduce<string[]>((acc, val) => {
    if (typeof val === 'string') {
      acc.push(`${' '.repeat(level * 2)}${val}`);
    }

    if (Array.isArray(val)) {
      acc.push(...contentFormatter(val, level + 1));
    }

    return acc;
  }, []);

export default contentFormatter;
