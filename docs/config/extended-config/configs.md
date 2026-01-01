# Configs {#configs}

**Configs** are ready-to-use collections of rule groups combined with extensions.
They give you a complete setup out of the box for different environments like **Base**, **React**, **Next.js**, and **Node**.
Each config has variants like **recommended**, **typescript**, and **all**, so you can pick exactly what fits your project.

## Base Config {#base-config}

| Variant         | Description                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------- |
| **Recommended** | Includes Base rules (without **Imports Strict**) + the Base Recommended extension.                |
| **TypeScript**  | Includes TypeScript rules (without **TypeScript ESLint Strict**) + the Base TypeScript extension. |
| **All**         | Combines both Base **Recommended** and **TypeScript** configs.                                    |

### Example {#base-example}

```ts
import { configs } from 'eslint-config-airbnb-extended';

export default [
  // Base recommended config
  ...configs.base.recommended,
  // Base TypeScript config
  ...configs.base.typescript,
];
```

## React Config {#react-config}

| Variant         | Description                                                                        |
| --------------- | ---------------------------------------------------------------------------------- |
| **Recommended** | Includes React rules (without **React Strict**) + the React Recommended extension. |
| **TypeScript**  | Includes React TypeScript extension.                                               |
| **All**         | Combines both React **Recommended** and **TypeScript** configs.                    |

### Example {#react-example}

```ts
import { configs } from 'eslint-config-airbnb-extended';

export default [
  // React recommended config
  ...configs.react.recommended,
  // React TypeScript config
  ...configs.react.typescript,
];
```

## Next.js Config {#nextjs-config}

| Variant         | Description                                                                        |
| --------------- | ---------------------------------------------------------------------------------- |
| **Recommended** | Includes React Recommended config + Next.js rules + Next.js Recommended extension. |
| **TypeScript**  | Uses the same React TypeScript config.                                             |
| **All**         | Combines both Next.js **Recommended** and **TypeScript** configs.                  |

### Example {#nextjs-example}

```ts
import { configs } from 'eslint-config-airbnb-extended';

export default [
  // Next.js recommended config
  ...configs.next.recommended,
  // Next.js TypeScript config
  ...configs.next.typescript,
];
```

## Node Config {#node-config}

| Variant         | Description                                              |
| --------------- | -------------------------------------------------------- |
| **Recommended** | Includes Node.js rules + the Node Recommended extension. |

### Example {#node-example}

```ts
import { configs } from 'eslint-config-airbnb-extended';

export default [
  // Node recommended config
  ...configs.node.recommended,
];
```
