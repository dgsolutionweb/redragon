import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const js = readFileSync("script.js", "utf8");

const tests = [
  { ok: /id="bootScreen"/.test(html), name: "boot screen id exists" },
  { ok: /class="links"/.test(html), name: "links container exists" },
  { ok: css.includes("@keyframes pulse"), name: "pulse animation exists" },
  { ok: css.includes(".light-a"), name: "light beam effect exists" },
  { ok: js.includes("setTimeout(tick"), name: "boot animation timer exists" }
];

const failed = tests.filter((test) => !test.ok);
if (failed.length > 0) {
  for (const test of failed) {
    console.error(`Test failed: ${test.name}`);
  }
  process.exit(1);
}

console.log(`${tests.length} tests passed.`);
