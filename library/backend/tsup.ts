import { defineConfig } from "tsup";
import config from "../../common/tsup.js";

export default defineConfig({
  ...config,
  splitting: false,
  format: ["esm", "cjs", "iife"],
  outDir: "lib",
});
