// Indonesia in Numbers — entry program (Node 22, standard library only).
// The site lives in app/ as plain static files (HTML, CSS, vanilla JS, no build
// step, no network). This program hands it in: it copies app/ and screenshots/
// from beside this file into the output directory and writes dossier.json with
// the vendored make.fun library. vendor/makefun-frontend.ts is the kit's copy,
// left unchanged — the scorer rebuilds the dossier with its own copy and the
// two must match byte for byte.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
cpSync(join(here, 'app'), join(outDir, 'app'), { recursive: true });
mkdirSync(join(outDir, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(outDir, 'screenshots'), { recursive: true });
}

// Caps from the competition gate: at most 4 screenshots of 256 KiB each, at
// most 993 files / 16 MiB in app/, and the dossier text capped at 160 KiB so
// the judge's outline is not truncated.
writeFileSync(
  join(outDir, 'dossier.json'),
  buildDossier(outDir, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
