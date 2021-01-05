module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  globals: {
    window: true,
    document: true,
    next: true,
    describe: true,
    test: true,
    expect: true,
    ctx: true,
    extra: true,
    it: true,
    jest: true,
    beforeEach: true,
  },
  plugins: ['eslint-comments', 'unicorn', 'react-hooks'],
  rules: {
    'react/state-in-constructor': 0,
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/sort-comp': 1,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    'generator-star-spacing': 0,
    'function-paren-newline': 0,
    'import/no-unresolved': [2, { ignore: ['^@/', 'react-dom'] }],
    'import/order': 'warn',
    'import/no-extraneous-dependencies': [
      2,
      {
        optionalDependencies: true,
        devDependencies: [
          '**/tests/**.{ts,js,jsx,tsx}',
          '**/_test_/**.{ts,js,jsx,tsx}',
          '**/**.test.{ts,js,jsx,tsx}',
          '**/example/**.{ts,js,jsx,tsx}',
          '**/examples/**.{ts,js,jsx,tsx}',
        ],
      },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'linebreak-style': 0,
    'no-prototype-builtins': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': [0, 'camel-case'],
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    // Use function hoisting to improve code readability
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    'unicorn/prevent-abbreviations': 'off',
    'import/no-cycle': 0,
    'react-hooks/rules-of-hooks': 'error',
    // issue https://github.com/facebook/react/issues/15204
    'react-hooks/exhaustive-deps': 'off',
    // Conflict with prettier
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': 0,
    'object-curly-newline': 0,
    'implicit-arrow-linebreak': 0,
    'operator-linebreak': 0,
    'eslint-comments/no-unlimited-disable': 1,
    'no-param-reassign': 1,
    'space-before-function-paren': 0,
    'import/extensions': 0,
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
    "no-unused-vars": "warn"
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    },
    polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
  },
};


// git commit的钩子函数
// "husky": {
//   "hooks": {
//     "pre-commit": "npm run lint-staged"
//   }
// },
