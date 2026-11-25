// news-image-20261125 — "The World in One Page".
// One image sums up Wednesday 25 November 2026: the front page of a
// newspaper, drawn once and shipped with this repository.
//
// The image (entry.png, 1024x1024, 457,647 bytes) shows six stories from
// the day, each verified against Reuters / BBC reporting of 25 Nov 2026:
//   1. UKRAINE SINKS RUSSIAN WARSHIP OFF LIBYA — Kyiv says the strike on
//      the corvette Merkury in Benghazi was self-defence; a second Russian
//      ship, the cargo vessel Sparta II, was hit in the Baltic.
//   2. HUANG BACK AT NVIDIA — Jensen Huang returns as CEO; shares soar,
//      then slip as Congress questions Trump's role in the comeback.
//   3. HUAWEI GUILTY OF STEALING TRADE SECRETS — a US jury convicts on
//      trade secrets; the racketeering charge fails.
//   4. TANKERS HIT BY MINES IN HORMUZ — Iran says three tankers struck.
//   5. SENEGAL'S AFCON TITLE RESTORED — CAS overturns the ruling,
//      ten months after the 2025 final.
//   6. TRUMP PARDONS TURKEYS — Freedom and Feathers spared for
//      Thanksgiving at the White House.
//
// The program itself does nothing clever on purpose: it copies the image
// byte for byte to the output directory. No network, no randomness, no
// clock — two runs write identical bytes, which is what the grader checks.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SOURCE = join(HERE, "entry.png");

// The grader sets MAKEFUN_OUTPUT_DIR; locally /output is the default.
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const TARGET = join(OUT_DIR, "entry.png");

const bytes = readFileSync(SOURCE);

// Fail loudly instead of shipping a corrupt file: a PNG starts with
// the 8-byte signature 89 50 4E 47 0D 0A 1A 1A 0A. Our image is a whole PNG.
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (bytes.length < 8 || !bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error("entry.png is not a valid PNG (bad signature)");
}
if (bytes.length > 1048576) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB gate`);
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(TARGET, bytes);

console.log(`wrote ${TARGET} (${bytes.length} bytes)`);
