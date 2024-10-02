import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts", "!src/**/*.spec.ts", "!src/**/*.test.ts"],
  sourcemap: true,
  treeshake: true,
  clean: true,
  minify: true,
});
