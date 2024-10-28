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

### ESLint

You will need to install the following packages:

- ESLint
- eslint-config-prettier
- eslint-import-resolver-typescript
- @typescript-eslint/parser

You will then need to create the file eslint.config.js on the root with the following lines:

```javascript
// @ts-check
import astarEslint from '@ansearch/linters/eslint.config.js';
import tseslint from 'typescript-eslint';

export default tseslint.config(...astarEslint);
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
import astarConfig from '@ansearch/linters/prettier.js'

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
import { defineConfig } from "tsup";
import config from "@ansearch/compilers/tsup.ts";

export default defineConfig({
  ...config
});
```

### Rollup
