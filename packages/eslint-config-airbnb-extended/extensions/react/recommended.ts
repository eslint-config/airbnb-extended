import getImportSettings from '@/helpers/getImportSettings';
import { styleInternalRules } from '@/rules/style';
import { allFiles, defineConfigArray, jsFiles } from '@/utils';

const dangleRules = styleInternalRules['no-underscore-dangle'];

const reactRecommendedExtensionsConfig = defineConfigArray([
  {
    name: 'airbnb/config/react-settings-extensions-configurations',
    files: jsFiles,
    settings: getImportSettings({ javascript: true, typescript: false, jsx: true }),
  },
  {
    name: 'airbnb/config/react-configurations',
    files: allFiles,
    rules: {
      // disallow dangling underscores in identifiers
      // https://eslint.org/docs/latest/rules/no-underscore-dangle
      // Allow Redux devtools variable
      'no-underscore-dangle': [
        dangleRules[0],
        {
          ...dangleRules[1],
          allow: [...dangleRules[1].allow, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'],
        },
      ],

      // enforce that class methods use "this"
      // https://eslint.org/docs/rules/class-methods-use-this
      // Class Methods can be used in React
      'class-methods-use-this': [
        'error',
        {
          exceptMethods: [
            'render',
            'getInitialState',
            'getDefaultProps',
            'getChildContext',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'componentDidUpdate',
            'componentWillUnmount',
            'componentDidCatch',
            'getSnapshotBeforeUpdate',
          ],
        },
      ],
    },
  },
  {
    name: 'airbnb/config/react-stylistic',
    files: allFiles,
    rules: {
      // specify whether double or single quotes should be used in JSX attributes
      // https://eslint.style/rules/js/jsx-quotes
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
    },
  },
  // @see https://github.com/jsx-eslint/eslint-plugin-react/issues/3671
  // FIXME: ONCE ALL REACT FORMATTING RULES ARE DEPRECATED, ENABLE THIS RULE
  // {
  //   name: 'airbnb/config/react-disable-legacy-stylistic-react-config',
  //   files: allFiles,
  //   ...getStylisticLegacyConfig('react'),
  // },
]);

export default reactRecommendedExtensionsConfig;
