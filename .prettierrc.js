import sharedConfig from './linters/prettier.js'

/**
 * @type {import("prettier").Config}
 */
const config = {
    ...sharedConfig,
  };
  
  export default config;