# @airbnb-extended/vitest-config

Shared Vitest configuration for the Airbnb Extended monorepo.

## Usage

```ts
// vitest.config.ts
import { defineBaseConfig } from '@airbnb-extended/vitest-config/base';

export default defineBaseConfig({
  name: 'my-package',
  root: import.meta.dirname,
  coverageInclude: ['helpers/**/*.ts'],
});
```

What it sets:

- `@/` alias to the package root
- tests in `tests/**/*.test.ts`
- `clearMocks` and `restoreMocks` on
- v8 coverage, without `*.types.ts` and `tests/**`
