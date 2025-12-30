# Extensions {#extensions}

Normally, many plugins hide their **recommended configs**. That means if you want to build a fully custom config, you can’t access everything. Extensions solve this problem.

An **extension** = `rules + parser + settings` → combined into a reusable layer.
Now, every **Extended config** is built as `rules + extension = config`. This makes it easier to create your own **base config** with full customization.

### Available Extensions {#available-extensions}

| Extension   | Variant     | Description                                                                                                                            |
| ----------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Base**    | Recommended | Adds parser, resolver, and import settings for JavaScript. Disables legacy stylistic JS rules.                                         |
|             | TypeScript  | Adds parser, resolver, and import settings for TypeScript. Also disables JS rules not recommended by the TypeScript team.              |
| **React**   | Recommended | Adds parser, resolver, and import settings for React. Enables required ESLint and stylistic rules.                                     |
|             | TypeScript  | Adds parser, resolver, and import settings for TypeScript. Adjusts specific React rules to work better with TypeScript.                |
| **Next.js** | Recommended | Disables certain import rules based on Next.js best practices and also turns off React rules that are unnecessary in Next.js projects. |
| **Node**    | Recommended | Detects if the project uses CommonJS or ESM and adjusts rules accordingly.                                                             |
