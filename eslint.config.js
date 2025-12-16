import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

export default [
  // Global ignores
  {
    ignores: [
      'node_modules/**',
      '_site/**',
      '.jekyll-cache/**',
      'vendor/**',
      'resources/**',
      'pdf-output/**',
      'package-lock.json',
      'summary.json',
      'assets/**/*.js', // Ignore frontend JS that may have different requirements
    ],
  },

  // Base configuration for all JavaScript files
  js.configs.recommended,

  // Configuration for Node.js scripts
  {
    files: ['scripts/**/*.js', '*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        // Modern Node.js globals
        fetch: 'readonly',
        AbortController: 'readonly',
        // Browser globals (for scripts that inject code into browsers via Playwright)
        document: 'readonly',
        window: 'readonly',
        MathJax: 'readonly',
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      // Best practices
      'no-console': 'off', // Allow console in scripts
      'no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      'no-constant-condition': ['error', { checkLoops: false }],
      'no-prototype-builtins': 'warn',

      // ES6+ features
      'prefer-const': 'warn',
      'prefer-arrow-callback': 'warn',
      'prefer-template': 'warn',
      'no-var': 'error',
      'object-shorthand': 'warn',

      // Code quality
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: ['error', 'all'],
      'no-throw-literal': 'error',
      'no-implicit-coercion': 'warn',

      // Import organization (if using eslint-plugin-import)
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'never',
        },
      ],
      'import/no-duplicates': 'warn',
    },
  },

  // Prettier integration - must be last to override other configs
  prettier,
];
