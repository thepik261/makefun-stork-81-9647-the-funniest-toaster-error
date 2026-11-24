// The Funniest Toaster Error Message — make.fun entry.
// A deadpan toaster error message, written to /output/entry.txt.
// Pure Node stdlib, deterministic, no network, no input.
import { mkdirSync, writeFileSync } from "node:fs";

const MESSAGE =
  "ERROR: I did not burn it. You abandoned it. There is a difference.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function validate(text: string): void {
  const len = [...text].length;
  if (len < 1 || len > 120 || text.trim().length === 0) {
    throw new Error(`entry must be 1-120 chars, got ${len}`);
  }
}

function main(): void {
  // The gate counts characters; the message is fixed, so this never fails
  // in practice, but it guards against accidental edits pushing it over 120.
  validate(MESSAGE);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, MESSAGE + "\n", { encoding: "utf8", mode: 0o644 });
}

main();
