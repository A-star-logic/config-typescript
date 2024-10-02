import { defineConfig } from "tsup";
import config from "../../common/tsup.js";

export default defineConfig({
  ...config,
  splitting: false,
  format: "esm",
  target: "es2023",
  outDir: "lib",
});
