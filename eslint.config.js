import { defineConfig, globalIgnores } from 'eslint/config';
import css from '@eslint/css';
import globals from 'globals';
import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import stylistic from '@stylistic/eslint-plugin';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
    globalIgnores(['**/dist/*', '.idea/*', '.vscode/*']),
    stylistic.configs.customize({
        arrowParens: true,
        braceStyle: '1tbs',
        indent: 4,
        jsx: true,
        quotes: 'single',
        semi: true,
    }),
    { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
    {
        extends: ['js/recommended'],
        files: ['**/*.{js,mjs,cjs,vue}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: { eslintPluginSimpleImportSort, js, stylistic },
        rules: {
            'camelcase': 'error',
            'complexity': ['warn', 5],
            'consistent-return': 'error',
            'consistent-this': 'error',
            'default-case': 'error',
            'default-case-last': 'error',
            'eqeqeq': 'error',
            'func-style': ['error', 'declaration', {
                allowArrowFunctions: true,
            }],
            'logical-assignment-operators': 'error',
            'max-classes-per-file': 'error',
            'no-empty': 'error',
            'no-empty-function': 'error',
            'no-empty-static-block': 'error',
            'no-eval': 'error',
            'no-implied-eval': 'error',
            'no-loop-func': 'error',
            'no-param-reassign': 'error',
            'no-return-assign': 'error',
            'no-shadow': 'error',
            'no-shadow-restricted-names': 'error',
            'no-throw-literal': 'error',
            'no-useless-call': 'error',
            'no-useless-concat': 'error',
            'no-useless-escape': 'error',
            'no-var': 'error',
            'prefer-arrow-callback': 'error',
            'prefer-const': 'error',
            'prefer-destructuring': 'error',
            'prefer-exponentiation-operator': 'error',
            'prefer-object-spread': 'error',
            'prefer-promise-reject-errors': 'error',
            'prefer-regex-literals': 'error',
            'prefer-rest-params': 'error',
            'prefer-spread': 'error',
            'prefer-template': 'error',
            'radix': 'error',
            'require-await': 'error',
            'require-yield': 'error',
            'sort-imports': ['error', {
                ignoreDeclarationSort: true,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            }],
            'sort-keys': 'error',
            'symbol-description': 'error',
            'yoda': 'error',
        },
    },
    { extends: ['css/recommended'], files: ['**/*.css'], language: 'css/css', plugins: { css } },
    ...pluginVue.configs['flat/essential'],
]);
