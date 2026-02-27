import { spawnSync } from "node:child_process";

const filesToCheck = ["script.js", "scripts/lint.mjs", "scripts/typecheck.mjs", "scripts/test.mjs"];

for (const file of filesToCheck) {
  const result = spawnSync(process.execPath, ["--check", file], { stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("Typecheck gate passed.");
