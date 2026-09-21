import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

import {
  inventory,
  localUrl,
  references,
  relativeUrl,
  resolveLocal,
  root,
} from './docs-lib.mjs';

const QUALITY = 82;
const ALPHA_QUALITY = 100;
const CONCURRENCY = Math.max(1, Math.min(8, os.availableParallelism() - 1));
const data = inventory();
const sourceFiles = new Set(data.files);
const pngFiles = data.files.filter(file => /\.png$/i.test(file));
const conversions = new Map(
  pngFiles.map(file => [file, file.replace(/\.png$/i, '.webp')]),
);

function referenceUrl(page, target, suffix, angle) {
  if (!angle) return relativeUrl(page, target, suffix);
  const relative = path.posix.relative(path.posix.dirname(page), target);
  return (relative.startsWith('.') ? relative : `./${relative}`) + suffix;
}

function bytes(files) {
  return files.reduce(
    (total, file) => total + fs.statSync(path.join(root, file)).size,
    0,
  );
}

function assertNoTargetCollisions() {
  const targets = new Set();
  const collisions = [];
  for (const [source, target] of conversions) {
    if (targets.has(target) || (sourceFiles.has(target) && target !== source)) {
      collisions.push(`${source} -> ${target}`);
    }
    targets.add(target);
  }
  if (collisions.length) {
    throw new Error(`WebP target collision:\n${collisions.join('\n')}`);
  }
}

async function convert(source, target) {
  const sourcePath = path.join(root, source);
  const targetPath = path.join(root, target);
  const temporaryPath = `${targetPath}.tmp`;
  const input = sharp(sourcePath, {
    animated: true,
    limitInputPixels: false,
  });
  const sourceMetadata = await input.metadata();

  await input
    .webp({
      quality: QUALITY,
      alphaQuality: ALPHA_QUALITY,
      effort: 4,
      smartSubsample: true,
    })
    .toFile(temporaryPath);

  const outputMetadata = await sharp(temporaryPath, {
    animated: true,
    limitInputPixels: false,
  }).metadata();
  if (
    outputMetadata.format !== 'webp'
    || outputMetadata.width !== sourceMetadata.width
    || outputMetadata.pageHeight !== sourceMetadata.pageHeight
    || (outputMetadata.pages || 1) !== (sourceMetadata.pages || 1)
  ) {
    fs.rmSync(temporaryPath, { force: true });
    throw new Error(`Output verification failed: ${source}`);
  }
  fs.renameSync(temporaryPath, targetPath);
}

async function convertAll() {
  let cursor = 0;
  let completed = 0;
  async function worker() {
    while (cursor < pngFiles.length) {
      const index = cursor++;
      const source = pngFiles[index];
      await convert(source, conversions.get(source));
      completed++;
      if (completed % 250 === 0 || completed === pngFiles.length) {
        console.log(`Converted ${completed}/${pngFiles.length}`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
}

function updatePageReferences() {
  let changedPages = 0;
  let changedReferences = 0;
  const referencedImages = new Set();

  for (const page of data.pages) {
    const pagePath = path.join(root, page);
    const original = fs.readFileSync(pagePath, 'utf8');
    let updated = original;
    const replacements = [];

    for (const reference of references(original)) {
      const local = localUrl(reference.url);
      if (!local) continue;
      const target = resolveLocal(page, local.pathname, sourceFiles);
      const webpTarget = conversions.get(target)
        || (reference.angle && /\.webp$/i.test(target || '') ? target : undefined);
      if (!webpTarget) continue;
      if (conversions.has(target)) referencedImages.add(target);
      replacements.push({
        start: reference.start,
        end: reference.end,
        value: referenceUrl(page, webpTarget, local.suffix, reference.angle),
      });
    }

    for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
      updated = updated.slice(0, replacement.start)
        + replacement.value
        + updated.slice(replacement.end);
    }
    if (updated !== original) {
      fs.writeFileSync(pagePath, updated);
      changedPages++;
      changedReferences += replacements.length;
    }
  }

  return {
    changedPages,
    changedReferences,
    referencedImages: referencedImages.size,
    unreferencedImages: pngFiles.length - referencedImages.size,
  };
}

function removeSources() {
  for (const source of pngFiles) {
    fs.rmSync(path.join(root, source));
  }
}

assertNoTargetCollisions();
const sourceBytes = bytes(pngFiles);
await convertAll();
const outputBytes = bytes([...conversions.values()]);
const referenceSummary = updatePageReferences();
removeSources();
const savedBytes = sourceBytes - outputBytes;

console.log(JSON.stringify({
  convertedImages: pngFiles.length,
  quality: QUALITY,
  alphaQuality: ALPHA_QUALITY,
  concurrency: CONCURRENCY,
  sourceBytes,
  outputBytes,
  savedBytes,
  reductionPercent: sourceBytes
    ? Number((savedBytes / sourceBytes * 100).toFixed(2))
    : 0,
  ...referenceSummary,
}, null, 2));
