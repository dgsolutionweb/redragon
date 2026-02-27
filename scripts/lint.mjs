import { existsSync, readFileSync } from "node:fs";

const requiredFiles = ["index.html", "styles.css", "script.js"];
for (const file of requiredFiles) {
  if (!existsSync(file)) {
    console.error(`Missing required file: ${file}`);
    process.exit(1);
  }
}

const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");

const checks = [
  { ok: html.includes("boot-screen"), label: "boot screen markup" },
  { ok: html.includes("link-btn"), label: "link button markup" },
  { ok: css.includes("--red-main"), label: "red theme token" },
  { ok: css.includes("linear-gradient"), label: "gradient effects" }
];

const failed = checks.filter((item) => !item.ok);
if (failed.length > 0) {
  for (const item of failed) {
    console.error(`Lint gate failed: missing ${item.label}`);
  }
  process.exit(1);
}

console.log("Lint gate passed.");
