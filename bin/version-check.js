import fs from "node:fs";

if (!process.argv[2] && !process.argv[3]) {
  console.log("Missing input");
  process.exit(1);
}

if (process.argv[3].includes("package.json") === false) {
  console.log("The second argument should be the path to package.json");
  process.exit(1);
}

const loadJSON = (path) =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const pkg = loadJSON(process.argv[3]);

if (process.argv[2] === pkg.version) {
  console.log("Failure");
  process.exit(1);
}
process.exit(0);
