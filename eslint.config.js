// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const tseslint = require('typescript-eslint');

module.exports = defineConfig([
  expoConfig,
  tseslint.configs.recommended,
  {
    ignores: ['dist/*', '.pnp.cjs', '.pnp.loader.mjs', 'scripts/*'],
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      'import/no-named-as-default': 'off',
    },
  },
]);
