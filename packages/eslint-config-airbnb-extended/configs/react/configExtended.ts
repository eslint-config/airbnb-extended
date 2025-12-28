import reactConfig from '@/configs/react/config';
import reactStrictRules from '@/rules/react/reactStrict';

const reactConfigExtended = {
  ...reactConfig,
  strict: reactStrictRules,
} as const;

export default reactConfigExtended;
