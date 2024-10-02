# Config Typescript

This repo holds all the various configurations we need in our projects, to be easily shared and re-imported.

Additionally, it export a single executable that will check the version of a package.

## What and where

Each subfolder exports config files for ESLint, Prettier, TSConfig and the bundlers/transpilers we use.

- __common__: For shared configuration. This is not exported.
- __backend & frontend__: For... backend code and web apps. The App folder is configured to transpile to ESM and `dist/` folders. The package folder is configured to transpile to ESM and `lib/` folders.
- __library__: For any SDK or external module: the code will be transpiled to ES and CJS to `lib/` folders.

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

### Prettier

### TSConfig

```json filename="tsconfig.json"
"extends": "@your-org/tsconfig/esm.json",

{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@ansearch/backend/tsconfig.json"
  // "extends": "@ansearch/frontend/tsconfig.json"
}
```

### TSUP

tsup is used for transpiling node packages and apps

```ts filename="tsup.config.ts"
import { defineConfig } from "tsup";
import config from "@ansearch/config/backend/app/tsup.ts";
// import config from "@ansearch/config/backend/package/tsup.ts";
// import config from "@ansearch/config/library/backend/tsup.ts";

export default defineConfig({
  ...config
});
```

### Rollup
