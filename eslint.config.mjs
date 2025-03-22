import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  eslintPluginPrettierRecommended,
  { files: ['src/**/*.{js,mjs,cjs,ts}'] },
  tseslint.configs.recommended,
  {
    rules: {
      // 可依個人喜好調整
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          parser: 'typescript',
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
        },
      ],
      'brace-style': [
        'error',
        '1tbs',
        { allowSingleLine: true },
      ],
      // 三元運算是會衝突
      // 'indent': [
      //   'error',
      //   2,
      //   {
      //     SwitchCase: 1,
      //     ignoredNodes: ['PropertyDefinition']
      //   },
      // ]
    },
    ignores: [
      'node_modules/',
      'dist/',
      'poc.*',
      // 'eslint.config.{js,mjs,cjs,ts}',
    ],
  },
]);
