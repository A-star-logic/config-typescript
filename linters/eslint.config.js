/* cSpell: disable */
// @ts-check
export const config = [
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
      '**/.expo/**',
      '**/expo-env.d.ts',
      'worker-configuration.d.ts',
      '**/.wrangler/**',
      '**/env.d.ts',
      '**/*.cjs',
    ],
  },

  { ignores: ['.prettierrc*'] },

  // base config
  {
    files: ['**/*.{ts,tsx,mtsx}'],
    linterOptions: { reportUnusedDisableDirectives: 2 },

    rules: {
      //
      // eslint-plugin-drizzle
      //
      'drizzle/enforce-delete-with-where': [
        2,
        { drizzleObjectName: ['pgDatabase'] },
      ],
      'drizzle/enforce-update-with-where': [
        2,
        { drizzleObjectName: ['pgDatabase'] },
      ],

      //
      // eslint-comments
      //
      '@eslint-community/eslint-comments/require-description': 2,

      //
      // eslint-plugin-perfectionist
      //
      'perfectionist/sort-imports': [2, { newlinesBetween: 'ignore' }],

      //
      // eslint
      //
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
      'no-param-reassign': [2, { props: false }],
      'no-restricted-globals': [
        'error',
        'closed',
        'defaultStatus',
        'event',
        'frameElement',
        'frames',
        'length',
        'name',
        'opener',
        'parent',
        'self',
        'status',
        'top',
      ],

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
      '@typescript-eslint/return-await': [2, 'always'],
      '@typescript-eslint/max-params': [1, { max: 1 }],

      //
      // eslint-plugin-unicorn
      //
      'unicorn/no-null': 0, // creates tech debt for Drizzle
      'unicorn/no-useless-undefined': 0, // this is in direct clash with consistent-return
      'unicorn/no-for-loop': 1, // to avoid today, and enforce whenever possible
      'unicorn/no-empty-file': 2,
      'unicorn/expiring-todo-comment': 0, // causes issues
      'no-warning-comments': [1, { terms: ['todo', 'fix', 'fixme'] }],
      'unicorn/filename-case': [
        2,
        {
          case: 'kebabCase',
          ignore: ['App.*'],
        },
      ],
      'unicorn/prefer-global-this': 2,
      'unicorn/prefer-ternary': 0, // Too often this rule makes the code more complex
      'unicorn/no-asterisk-prefix-in-documentation-comments': 0, // breaks a very old JS convention
      'unicorn/consistent-boolean-name': 0, // borked
      'unicorn/comment-content': 0, // too noisy, little value
      'unicorn/max-nested-calls': 0, // annoying, little value
      'unicorn/prefer-temporal': 1, // Date has legitimate use cases
      'unicorn/no-manually-wrapped-comments': 0, // annoying, better check this in reviews anyway
      'unicorn/no-top-level-assignment-in-function': 0, // annoying, little value, better check this in reviews
      'unicorn/try-complexity': 0, // annoying, little value, better check this in reviews
      'unicorn/consistent-class-member-order': 0, // direct clash with the sort plugin
      'unicorn/no-top-level-side-effects': 0, // annoying, zero value
      'unicorn/prefer-split-limit': 0, // BS not even useful in our runtime
      'unicorn/prevent-abbreviations': 0, // clash with some conventions
      'unicorn/name-replacements': [
        2,
        {
          replacements: {
            util: false,
            utils: false,
            param: false,
            params: false,
            prev: false,
            prop: false,
            props: false,
            ref: false,
            refs: false,
          },
        },
      ],
      'unicorn/consistent-arrow-return-style': 0, // clash with arrow-body-style: always
      'unicorn/single-line-block-comment-style': 0, // annoying, little value
      'unicorn/no-barrel-files': 0, // Too many clashes, better check this in reviews anyway
      'unicorn/prefer-boolean-return': 0, // broken
      'unicorn/prefer-error-is-error': 0, // break typings
      'unicorn/no-unreadable-new-expression': 0, // annoying, little value
      'unicorn/prefer-iterator-to-array': 0, // not compatible with hermes engine
      'unicorn/prefer-iterator-concat': 0, // not compatible with hermes engine
      'unicorn/no-keyword-prefix': ['error', { disallowedPrefixes: ['new'] }], // clash with react className
      'unicorn/no-break-in-nested-loop': 0, // learn to code
      'unicorn/prefer-logical-operator-over-ternary': 0, // this rule breaks on false ?? true

      //
      // eslint-plugin-import-x
      //
      'import-x/no-default-export': 2,
      'import-x/namespace': 0, // not needed in a typescript only project with strict; also computationally expensive

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
      'fp/no-class': 0,
      'fp/no-this': 0,
      'fp/no-rest-parameters': 0, // too many false positives

      //
      // eslint-plugin-security
      //
      'security/detect-object-injection': 0, // very noisy, kept for CI to help code review

      //
      // eslint-plugin-sonarjs
      //
      'sonarjs/new-cap': 0, // can't edit this, and there are false positives; do this in code reviews
      'sonarjs/assertions-in-tests': 0, // broken / very slow
      'sonarjs/no-commented-code': 0, // broken / very slow
      'sonarjs/cognitive-complexity': 0, // DIY
      'sonarjs/no-small-switch': 0, // DIY
      'sonarjs/todo-tag': 0, // duplicate of unicorn
      'sonarjs/prefer-single-boolean-return': 0, // pure BS; documenting code is better
      'sonarjs/function-return-type': 0, // noisy, and already covered by other rules
      'sonarjs/use-type-alias': 0, // agaisnt our style
    },
  },
  ////////////////
  // Frontend  //
  ///////////////
  {
    files: ['frontends/**/*.{ts,tsx,mtsx}'],
    rules: {
      //
      // eslint-plugin-fp
      //
      'fp/no-this': 0,
      'fp/no-rest-parameters': 'off', // too many false positives
    },
  },
  {
    // specific rules for react native
    files: ['frontends/**/*.{tsx,mtsx}'],
    rules: {
      '@typescript-eslint/no-misused-promises': [
        2,
        { checksVoidReturn: { attributes: false } },
      ],
      'unicorn/no-array-sort': 0, // toSorted is not available in RN
      'import-x/no-default-export': 0,
    },
  },
  {
    // Disable some rules in test files
    files: ['**/*.test.ts'],
    rules: {
      'no-console': 0,
      'no-restricted-syntax': 0,
      'unicorn/no-for-loop': 0,
      '@typescript-eslint/restrict-template-expressions': 0,
      '@typescript-eslint/no-unsafe-assignment': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-unsafe-argument': 0,
      '@typescript-eslint/no-unsafe-call': 0,
      '@typescript-eslint/unbound-method': 0,
    },
  },

  ///////////
  // Tests //
  ///////////
  {
    files: ['**/tests/**'],
    rules: {
      'security/detect-non-literal-fs-filename': 0,
      'eslint/security/detect-non-literal-fs-filename': 0,
    },
  },
];
