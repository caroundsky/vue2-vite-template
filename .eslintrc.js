module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
  rules: {
    'no-console': import.meta.env.MODE === 'production' ? 'error' : 'warn',
    'no-debugger': import.meta.env.MODE === 'production' ? 'error' : 'warn',
    'no-empty': ['error', { allowEmptyCatch: true }],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
}
