# Config Typescript

This repo holds all the various configurations we need in our projects, to be easily shared and re-imported.

Additionally, it export a single executable that will check the version of a package.

## How to use

### Verifier script

The script has been made to fail or pass a CICD pipeline before uploading a package to npm: it verifies that the local package.json has a different version than the package hosted on npm.

It takes two arguments: the online version of a package, and the path the package.json

Example (please replace `@your/package` and `./your/package.json`);

```json filename="package.json"
{
  "scripts": {
    "verify": "npmjs-version-verify \"$(npm view @your/package version)\" ./your/package.json"
  }
}
```

### Peer deps

You will need to install the following packages:

```bash
yarn add -D @eslint-community/eslint-plugin-eslint-comments @eslint/compat @eslint/js @typescript-eslint/parser eslint eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-drizzle eslint-plugin-fp eslint-plugin-import-x eslint-plugin-jsdoc eslint-plugin-perfectionist eslint-plugin-prettier eslint-plugin-regexp eslint-plugin-security eslint-plugin-sonarjs eslint-plugin-unicorn eslint-plugin-vue prettier typescript typescript-eslint vue-eslint-parser
```

### ESLint

You will then need to create the file eslint.config.js on the root with the following lines:

```javascript
// @ts-check
// the source configs
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
import drizzle from 'eslint-plugin-drizzle';
// legacy linters
import { fixupPluginRules, fixupConfigRules } from '@eslint/compat';
import fpPlugin from 'eslint-plugin-fp';

// the ones we do
import astarEslint from '@ansearch/linters/eslint.config.js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...astarEslint,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      jsdoc: jsdocPlugin,
      regexp: regexpPlugin,
      // @ts-ignore
      fp: fixupPluginRules(fpPlugin),
      vue: vuePlugin,
      drizzle,
    },
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

      rules: {
        ...drizzle.configs.recommended.rules,
      },
    },
  },
);
```

Some rules can be particularly disruptive, here is the list of extensions used, and how we selected the rules:

- fp: encourage the use of functional programming, while leaving some room for non-fp code when needed.
- eslint-comments: todo and similar comment will create warnings, to help track them when running the linter
- import-x: to verify typescript imports and exports. It will enforce named exports to ease tree shaking.
- jsdoc: to force you documenting your code!
- perfectionist: to keep a visual hierarchy
- prettier: idem
- regexp: try avoiding problematic regex
- security: basic security linting
- sonarjs: idem
- unicorn: enforce consistent code
- vue: for vue projects

### Prettier

create a .prettierrc.js file and add:

```js
import astarConfig from '@ansearch/linters/prettier.js';

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...sharedConfig,
};

export default config;
```

### TSConfig

```json filename="tsconfig.json"
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@ansearch/linters/tsconfig.json"
}
```

### TSUP

tsup is used for transpiling node packages and apps

```ts filename="tsup.config.ts"
import { defineConfig } from 'tsup';
import config from '@ansearch/compilers/tsup.ts';

export default defineConfig({
  ...config,
});
```

### Rollup
