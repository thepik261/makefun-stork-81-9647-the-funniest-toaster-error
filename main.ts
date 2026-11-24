// The Funniest Toaster Error Message — make.fun entry.
// A deadpan toaster error message, written to /output/entry.txt.
// Pure Node stdlib, deterministic, no network, no input.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MESSAGE =
  "ERROR: I did not burn it. You abandoned it. There is a difference.";

const OUT_DIR = "/output";
const ENTRY_FILENAME = "entry.txt";
const MAX_CHARS = 120;
const MIN_CHARS = 1;

function entryPath(): string {
  return join(OUT_DIR, ENTRY_FILENAME);
}

function charCount(text: string): number {
  return [...text].length;
}

function validate(text: string): void {
  const len = charCount(text);
  if (len < MIN_CHARS || len > MAX_CHARS) {
    throw new Error(`entry must be ${MIN_CHARS}-${MAX_CHARS} chars, got ${len}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
}

function ensureOutputDir(): void {
  mkdirSync(OUT_DIR, { recursive: true });
}

function writeEntry(text: string): void {
  ensureOutputDir();
  writeFileSync(entryPath(), text + "\n", { encoding: "utf8", mode: 0o644 });
}

function main(): void {
  // The gate counts characters; the message is fixed, so this never fails
  // in practice, but it guards against accidental edits pushing it over 120.
  validate(MESSAGE);
  writeEntry(MESSAGE);
}

main();
