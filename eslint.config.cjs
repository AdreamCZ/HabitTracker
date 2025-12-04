const js = require('@eslint/js');
const nextConfig = require('eslint-config-next/core-web-vitals');
const tseslint = require('typescript-eslint');
const preferArrowPlugin = require('eslint-plugin-prefer-arrow');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  // Base recommended configs
  js.configs.recommended,
  ...nextConfig,

  // Global ignores
  {
    ignores: [
      '.eslintrc.cjs',
      'eslint.config.cjs',
      'prettierrc.js',
      'tailwind.config.ts',
      'postcss.config.mjs',
      'next.config.ts',
      '**/*.md',
      '**/*.html',
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      'drizzle/**',
    ],
  },

  // Prettier config to disable conflicting rules
  prettierConfig,

  // Main configuration for all JS/TS/JSX/TSX files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'prefer-arrow': preferArrowPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          paths: ['src'],
        },
        typescript: {
          extensionAlias: {
            '.js': ['.ts', '.tsx', '.d.ts', '.js'],
            '.jsx': ['.tsx', '.d.ts', '.jsx'],
            '.cjs': ['.cts', '.d.cts', '.cjs'],
            '.mjs': ['.mts', '.d.mts', '.mjs'],
          },
        },
      },
    },
    rules: {
      // Prettier
      'prettier/prettier': 'error',
      // Turn off prettier related formatting rules
      indent: 'off',
      quotes: 'off',
      'linebreak-style': 'off',
      semi: 'off',
      'comma-dangle': 'off',
      'arrow-body-style': 'off',
      // General code-quality rules (non-formatting)
      'no-template-curly-in-string': ['error'],
      'no-var': 'error',
      'no-useless-rename': 'error',
      'object-shorthand': ['error', 'always'],
      eqeqeq: ['error', 'always'],
      'dot-notation': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'prefer-arrow/prefer-arrow-functions': 'error',
      // React
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': 'off',
      'react/jsx-curly-spacing': 'off',
      'react/jsx-equals-spacing': 'off',
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-no-useless-fragment': 'error',
      'react/display-name': 'off',
      // Typescript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { args: 'all', argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      // Import
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
        },
      ],
    },
  },

  // Override for TSX files - disable prop-types
  {
    files: ['**/*.tsx'],
    rules: {
      'react/prop-types': 'off',
    },
  },
];