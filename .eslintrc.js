module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended','plugin:jest/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react','jest'],
  rules: {
    // 'linebreak-style': [
    // 	'error',
    // 	'unix'
    // ],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/prop-types': 0,
    'react/display-name': 0,
  }
};
