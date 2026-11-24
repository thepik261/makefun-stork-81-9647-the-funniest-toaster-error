// The Funniest Toaster Error Message — make.fun entry.
// Writes a single deadpan error message to /output/entry.txt.
// Pure Node stdlib, deterministic, no network, no input.
import { mkdirSync, writeFileSync } from "node:fs";

const MESSAGE =
  "ERROR: I did not burn it. You abandoned it. There is a difference.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function main(): void {
  // Gate: the entry must be 1-120 characters of non-whitespace text.
  if (MESSAGE.length < 1 || MESSAGE.length > 120 || MESSAGE.trim().length === 0) {
    throw new Error(`entry must be 1-120 chars, got ${MESSAGE.length}`);
  }
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, MESSAGE + "\n", { encoding: "utf8", mode: 0o644 });
}

main();
