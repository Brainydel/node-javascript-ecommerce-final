module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-nested-ternary': 0,
    'no-use-before-define': 0,
  },
};
