/* cSpell: disable */
// @ts-check
import eslint from '@eslint/js';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import regexpPlugin from 'eslint-plugin-regexp';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import unicornPlugin from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import eslintPluginImportX from 'eslint-plugin-import-x';
import tsParser from '@typescript-eslint/parser';
import securityPlugin from 'eslint-plugin-security';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

// legacy linters
import { fixupPluginRules, fixupConfigRules } from '@eslint/compat';
import fpPlugin from 'eslint-plugin-fp';

export default tseslint.config(
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      jsdoc: jsdocPlugin,
      regexp: regexpPlugin,
      // @ts-ignore
      fp: fixupPluginRules(fpPlugin),
      vue: vuePlugin,
    },
  },
  {
    ignores: [
      '**/jest.config.js',
      'node_modules/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/fixtures/**',
      '**/coverage/**',
      '**/__snapshots__/**',
      '.nx/*',
      '.turbo/*',
      '.yarn/*',
      '**/.output/*',
      '**/.nuxt/*',
      '**/*.config.js',
      '**/*.config.ts',
      '**/vitest.shared.ts',
    ],
  },

  // extends ...
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  jsdocPlugin.configs['flat/recommended-typescript-error'],
  unicornPlugin.configs['flat/all'],
  prettierPlugin,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  securityPlugin.configs.recommended,
  // @ts-ignore
  ...fixupConfigRules(fpPlugin.configs.recommended),
  perfectionistPlugin.configs['recommended-natural'], //todo enable later
  sonarjsPlugin.configs.recommended,
  // @ts-ignore -- Typings are not in the library yet
  comments.recommended,

  // base config
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue'],
        parser: tsParser,
        sourceType: 'module',
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    linterOptions: { reportUnusedDisableDirectives: 2 },

    rules: {
      //
      // eslint-comments
      //
      '@eslint-community/eslint-comments/require-description': 2,

      //
      // eslint-plugin-perfectionist
      //
      'perfectionist/sort-imports': [2, { newlinesBetween: 'ignore' }],
      'sort-imports': 0, // required by perfectionist/sort-imports
      'import-x/order': 0, // required by perfectionist/sort-imports

      //
      // eslint
      //
      //'max-params': [1, 1], /unfortunately not granular enough, and picks up lambdas
      camelcase: [
        2,
        {
          properties: 'always',
          ignoreDestructuring: false,
          ignoreGlobals: false,
          allow: [
            'access_token',
            'id_token',
            'refresh_token',
            'client_id',
            'client_secret',
          ],
        },
      ],
      'no-console': 2,
      'arrow-body-style': [2, 'always'],
      // this rule tend to conflict with prettier
      indent: 0,
      'linebreak-style': [2, 'unix'],
      quotes: [2, 'single', { avoidEscape: true }],
      semi: [2, 'always'],
      'no-trailing-spaces': 1,
      'comma-dangle': [2, 'always-multiline'],
      'no-underscore-dangle': [2, { allow: ['_id', '_path'] }],
      'operator-linebreak': [
        2,
        'after',
        { overrides: { '?': 'before', ':': 'before' } },
      ],
      'max-len': [
        2,
        {
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreComments: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignorePattern: 'href="|@apply|text="',
        },
      ],
      'lines-between-class-members': [
        2,
        'always',
        { exceptAfterSingleLine: true },
      ],
      'object-curly-newline': 0, // disable this (cause issues, and prettier make sure this is consistent anyway)
      //'no-param-reassign': [2, { props: false }], // Make it compatible with vue

      //
      // typescript-eslint
      //
      // prevent empty objects, but allow "abstract" interfaces
      // '@typescript-eslint/no-empty-object-type': [
      //   2,
      //   { allowInterfaces: 'always' },
      // ],
      // flag any variable of function unused, except the ones that start with underscore
      '@typescript-eslint/no-unused-vars': [
        2,
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/require-await': 0, // better DX to put async everywhere -> easier refactor
      '@typescript-eslint/explicit-function-return-type': 2,
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true, allowBoolean: true, allowNullish: true },
      ],
      '@typescript-eslint/consistent-indexed-object-style': [
        'error',
        'index-signature',
      ],
      '@typescript-eslint/consistent-type-imports': 2,
      '@typescript-eslint/no-import-type-side-effects': 2,

      //
      // eslint-plugin-unicorn
      //
      'unicorn/no-null': 2,
      'unicorn/no-useless-undefined': 0, // this is in direct clash with consistent-return
      'unicorn/no-for-loop': 1, // to avoid today, and enforce whenever possible
      'unicorn/no-empty-file': 2,
      'unicorn/expiring-todo-comment': 0, // causes issues
      'no-warning-comments': [1, { terms: ['todo', 'fix', 'fixme'] }],
      'unicorn/prevent-abbreviations': [
        // allow to have e2e in filenames, and allow vuejs common names (props, attrs, etc)
        2,
        {
          ignore: ['.*-e2e.*', 'props', 'params', 'vite-env*'],
        },
      ],
      'unicorn/filename-case': [
        2,
        {
          case: 'kebabCase',
          ignore: [
            'App.vue', // don't wan't to deal with that
            'Prose.*\\.vue$', // ignore all the Nuxt-content overrides
          ],
        },
      ],

      //
      // eslint-plugin-import-x
      //
      'import-x/no-default-export': 2,

      //
      // eslint-plugin-fp
      //
      'fp/no-nil': 0, // conflict with unicorn
      'fp/no-unused-expression': 0, // cannot work with our style
      'fp/no-loops': 0, // unicorn is more granular than fp for which loops are allowed
      'fp/no-throw': 0,
      'fp/no-let': 0, // ESlint take care of flagging unused let
      'fp/no-mutating-methods': 0,
      'fp/no-mutation': 0,

      //
      // eslint-plugin-security
      //
      'security/detect-object-injection': 0, // very noisy, kept for CI to help code review

      //
      // eslint-plugin-sonarjs
      //
      'sonarjs/new-cap': 0, // can't edit this, and there are false positives; do this in code reviews
      'sonarjs/todo-tag': 1,
      'sonarjs/cognitive-complexity': 1, // interesting rule, but it should not be disruptive
      'sonarjs/no-small-switch': 1, // remove (use the recommended) when the codebase is more fledged out
      'sonarjs/no-vue-bypass-sanitization': 1, // remove (use the recommended) when the codebase is more fledged out
      'sonarjs/prefer-single-boolean-return': 1, // remove (use the recommended) when the codebase is more fledged out
    },
  },
  ////////////////
  // Frontend  //
  ///////////////
  {
    files: ['frontends/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,vue}'],
    rules: {
      //
      // eslint
      //
      'no-console': 1, // to change whenever possible

      //
      // eslint-plugin-fp
      //
      'fp/no-this': 0,

      //
      // vue
      //
      'vue/block-lang': [
        2,
        {
          script: {
            lang: 'ts',
          },
        },
      ],

      // enforce having template -> script -> style
      'vue/block-order': [
        2,
        {
          order: [['script', 'template'], 'style'],
        },
      ],

      // enforce new lines on single line tags and multiline tags
      'vue/block-tag-newline': [
        2,
        {
          singleline: 'always',
          multiline: 'always',
        },
      ],

      // enforce vue 3 setup scripts
      'vue/component-api-style': [1, ['script-setup']],

      // enforce kebab-case (consistent with our naming scheme)
      'vue/component-name-in-template-casing': [
        2,
        'kebab-case',
        {
          ignores: ['RouterView', 'Icon', 'RouterLink'],
        },
      ],

      // enforce event naming to be consistent with JS naming
      'vue/custom-event-name-casing': [2],
      // enforce TS in defines
      'vue/define-emits-declaration': 2,
      'vue/define-props-declaration': 2,
      // enforce same order of defines
      'vue/define-macros-order': [
        2,
        {
          order: ['defineProps', 'defineEmits'],
          defineExposeLast: true,
        },
      ],
      // enforce scoped style
      'vue/enforce-style-attribute': 2,
      // enforce button types
      'vue/html-button-has-type': 2,
      // modern tick style
      'vue/next-tick-style': 2,
      // prevent reactivity loss
      'vue/no-ref-object-reactivity-loss': 2,
      // you might want to re-think your code
      'vue/no-root-v-if': 2,
      // prevent style in html unless this is a binding
      'vue/no-static-inline-styles': [
        2,
        {
          allowBinding: true,
        },
      ],
      // secure html
      'vue/no-template-target-blank': 2,
      // prevent uncaught errors
      'vue/no-this-in-before-route-enter': 2,
      // no undefined/unused
      'vue/no-undef-properties': 2,
      'vue/no-unused-emit-declarations': 2,
      'vue/no-unused-properties': 2,
      'vue/no-unused-refs': 2,
      'vue/no-use-v-else-with-v-for': 2,
      'vue/no-useless-mustaches': 2,
      'vue/no-useless-v-bind': 2,
      'vue/no-v-text': 2,
      'vue/padding-line-between-blocks': 2,
      // use define instead of exports
      'vue/prefer-define-options': 2,
      'vue/prefer-prop-type-boolean-first': 2,
      'vue/prefer-separate-static-class': 2,
      'vue/prefer-true-attribute-shorthand': 2,
      'vue/require-emit-validator': 2,
      'vue/require-macro-variable-name': 2,
      // enforce documentation
      'vue/require-prop-comment': [
        'error',
        {
          type: 'JSDoc',
        },
      ],
      // better TS
      'vue/require-typed-object-prop': 2,
      'vue/require-typed-ref': 2,
      // consistent looping with JS
      'vue/v-for-delimiter-style': [2, 'of'],
      // consistent with JS variable notation
      'vue/attribute-hyphenation': [2, 'never'],
      'vue/attributes-order': 0, // done by perfectionist
      'vue/multi-word-component-names': 0, // not compatible with how the Nuxt router works
      // needed to not cause too many issues with nuxt
      'vue/no-undef-components': [
        2,
        {
          ignorePatterns: [
            'Nuxt.*',
            'Icon',
            'ContentDoc',
            'ContentList',
            'ContentRenderer',
          ],
        },
      ],
    },
  },
  {
    // Disable some rules in test files
    files: ['**/*.test.ts'],
    rules: {
      'no-console': 0,
      'no-restricted-syntax': 0,
      'unicorn/no-for-loop': 0,
      'unicorn/no-null': 0,
      '@typescript-eslint/restrict-template-expressions': 0,
      '@typescript-eslint/no-unsafe-assignment': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-unsafe-argument': 0,
      '@typescript-eslint/no-unsafe-call': 0,
      '@typescript-eslint/unbound-method': 0,
    },
  },
);
