// Generates responsive WebP derivatives for every top-level image in
// public/images/ into public/images/responsive/<stem>-<width>.webp, and writes
// src/generated/responsiveImages.ts so components can reference only the
// widths that actually exist.
// Re-runnable: the generated directory is rebuilt so encoder/configuration
// changes and removed sources cannot leave stale derivatives behind.
// Usage: npm run generate:images
import { readdirSync, statSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, join, normalize } from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "public/images";
const OUT_DIR = "public/images/responsive";
const MANIFEST_PATH = "src/generated/responsiveImages.ts";
const WIDTHS = [480, 720, 1080, 1440];
const WEBP_QUALITY = 75;

const inputDir = new URL(`../${SOURCE_DIR}/`, import.meta.url).pathname;
const outputDir = new URL(`../${OUT_DIR}/`, import.meta.url).pathname;
if (basename(normalize(outputDir)) !== "responsive") {
  throw new Error(`Refusing to replace unexpected output directory: ${outputDir}`);
}
rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });
mkdirSync(new URL("../src/generated/", import.meta.url).pathname, { recursive: true });

const sources = readdirSync(inputDir)
  .filter((name) => /\.(png|jpe?g|webp)$/i.test(name))
  .filter((name) => statSync(join(inputDir, name)).isFile());

let created = 0;
const manifest = {};

for (const name of sources) {
  const stem = name.replace(/\.[^.]+$/, "");
  const sourcePath = join(inputDir, name);
  const pipeline = sharp(sourcePath);
  const metadata = await pipeline.metadata();
  if (!metadata.width) continue;

  const generated = [];
  for (const width of WIDTHS) {
    if (width >= metadata.width) continue;
    const outPath = join(outputDir, `${stem}-${width}.webp`);
    await pipeline
      .clone()
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outPath);
    created += 1;
    generated.push(width);
  }
  if (generated.length > 0) manifest[`/images/${name}`] = generated;
}

writeFileSync(MANIFEST_PATH, `export const responsiveWidths: Record<string, number[]> = ${JSON.stringify(manifest)};\n`);
console.log(`generate:images — ${created} created from ${sources.length} sources`);
console.log(`write:${MANIFEST_PATH}`);
