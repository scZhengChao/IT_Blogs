import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

import {
  inventory,
  localUrl,
  references,
  resolveLocal,
  root,
} from './docs-lib.mjs';

const REPOSITORY = 'scZhengChao/IT_Blogs';
const TAG = 'assets-v1';
const RELEASE_ASSETS_URL =
  `https://github.com/${REPOSITORY}/releases/expanded_assets/${TAG}`;
const IMAGE_PATTERN = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i;
const apply = process.argv.includes('--apply');

function sha256(file) {
  return crypto
    .createHash('sha256')
    .update(fs.readFileSync(file))
    .digest('hex');
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

async function releaseAssets() {
  const response = await fetch(RELEASE_ASSETS_URL);
  if (!response.ok) {
    throw new Error(
      `Cannot read Release assets: ${response.status} ${response.statusText}`,
    );
  }

  const html = await response.text();
  const assets = [];
  for (const match of html.matchAll(/<li\b[\s\S]*?<\/li>/gi)) {
    const item = match[0];
    const href = item.match(
      /href="([^"]*\/releases\/download\/assets-v1\/[^"]+)"/i,
    )?.[1];
    const digest = item.match(/sha256:([a-f\d]{64})/i)?.[1];
    if (!href || !digest) continue;
    assets.push({
      digest: digest.toLowerCase(),
      url: new URL(decodeHtml(href), 'https://github.com').href,
    });
  }
  return assets;
}

const data = inventory();
const sourceFiles = new Set(data.files);
const attachments = data.files.filter(file =>
  file.split('/').includes('assets') && !IMAGE_PATTERN.test(file));
const remoteAssets = await releaseAssets();
const remoteByDigest = new Map(
  remoteAssets.map(asset => [asset.digest, asset.url]),
);

const migration = attachments.map(file => {
  const absolutePath = path.join(root, file);
  const digest = sha256(absolutePath);
  return {
    file,
    absolutePath,
    bytes: fs.statSync(absolutePath).size,
    digest,
    url: remoteByDigest.get(digest),
    references: [],
  };
});
const migrationByFile = new Map(
  migration.map(item => [item.file, item]),
);

const missingAssets = migration.filter(item => !item.url);
if (missingAssets.length) {
  throw new Error(
    `${missingAssets.length} local attachments are missing from Release ${TAG}:\n`
      + missingAssets.map(item => item.file).join('\n'),
  );
}

const pageTexts = new Map();
for (const page of data.pages) {
  const text = fs.readFileSync(path.join(root, page), 'utf8');
  pageTexts.set(page, text);
  for (const reference of references(text)) {
    const local = localUrl(reference.url);
    if (!local) continue;
    const target = resolveLocal(page, local.pathname, sourceFiles);
    const item = migrationByFile.get(target);
    if (!item) continue;
    item.references.push({
      page,
      start: reference.start,
      end: reference.end,
      suffix: local.suffix,
    });
  }
}

const unreferenced = migration.filter(item => item.references.length === 0);
if (unreferenced.length) {
  throw new Error(
    `Refusing to delete ${unreferenced.length} unreferenced attachments:\n`
      + unreferenced.map(item => item.file).join('\n'),
  );
}

const bytes = migration.reduce((total, item) => total + item.bytes, 0);
const summary = {
  mode: apply ? 'apply' : 'dry-run',
  release: `https://github.com/${REPOSITORY}/releases/tag/${TAG}`,
  releaseAssets: remoteAssets.length,
  localAttachments: migration.length,
  uniqueContent: new Set(migration.map(item => item.digest)).size,
  references: migration.reduce(
    (total, item) => total + item.references.length,
    0,
  ),
  bytes,
  MiB: Number((bytes / 1024 / 1024).toFixed(2)),
};

if (!apply) {
  console.log(JSON.stringify({
    ...summary,
    next: 'npm run migrate:attachments -- --apply',
  }, null, 2));
  process.exit(0);
}

const replacementsByPage = new Map();
for (const item of migration) {
  for (const reference of item.references) {
    if (!replacementsByPage.has(reference.page)) {
      replacementsByPage.set(reference.page, []);
    }
    replacementsByPage.get(reference.page).push({
      start: reference.start,
      end: reference.end,
      value: item.url + reference.suffix,
    });
  }
}

for (const [page, replacements] of replacementsByPage) {
  let text = pageTexts.get(page);
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    text = text.slice(0, replacement.start)
      + replacement.value
      + text.slice(replacement.end);
  }
  fs.writeFileSync(path.join(root, page), text);
}

for (const item of migration) {
  fs.rmSync(item.absolutePath);
}

for (const directory of data.directories
  .filter(item => item.split('/').includes('assets'))
  .sort((a, b) => b.length - a.length)) {
  const absolutePath = path.join(root, directory);
  if (
    fs.existsSync(absolutePath)
    && fs.readdirSync(absolutePath).length === 0
  ) {
    fs.rmdirSync(absolutePath);
  }
}

console.log(JSON.stringify({
  ...summary,
  changedPages: replacementsByPage.size,
  removedLocalAttachments: migration.length,
}, null, 2));
