module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    // 'indent': [
    // 	'error',
    // 	'tab'
    // ],
    // 'linebreak-style': [
    // 	'error',
    // 	'unix'
    // ],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/prop-types': 0
  }
};
