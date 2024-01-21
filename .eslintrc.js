module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/*.ts'],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-use-before-define': ['error'],
        'no-use-before-define': 'off',
        'unicorn/require-post-message-target-origin': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'unicorn/consistent-destructuring': 'off',
        'no-empty-pattern': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'unicorn'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
        },
      },
    ],
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          args: false,
          params: false,
          props: false,
          ref: false,
        },
      },
    ],
  },
};
