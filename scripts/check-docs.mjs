import fs from 'node:fs';
import path from 'node:path';
import { inventory, root, references, localUrl, resolveLocal, route, isPage } from './docs-lib.mjs';

const data = inventory();
const files = new Set(data.files);
const errors = [];
const routes = new Map();
const indexLinks = new Map();
const expectedChildren = new Map();
let localReferences = 0;
const built = process.argv.includes('--built');
const output = path.resolve('doc_build');
const bundledImage = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i;

/** Each index must expose its direct pages and child directory entrances. */
for (const file of data.pages) {
  const directory = path.posix.dirname(file);
  const isIndex = /^index\.mdx?$/i.test(path.posix.basename(file));
  if (file === 'index.md' || file === 'index.mdx') continue;
  const owner = isIndex ? path.posix.dirname(directory) : directory;
  if (!expectedChildren.has(owner)) expectedChildren.set(owner, new Set());
  expectedChildren.get(owner).add(file);
}

/** Resolve a public route to its physical HTML file, including index routes. */
function outputFile(url) {
  return path.join(output, url.replace(/^\/+/, '') + (url.endsWith('/') ? 'index.html' : ''));
}

for (const dir of data.contentDirs) {
  if (!files.has(path.posix.join(dir, 'index.md')) && !files.has(path.posix.join(dir, 'index.mdx'))) {
    errors.push(`${dir || '.'}: missing index.md`);
  }
  if (dir.split('/').some(part => part !== part.trim())) {
    errors.push(`${dir}: leading/trailing whitespace in directory name`);
  }
  if (dir.split('/').some(part => part.endsWith('.d.ts') || /^_[^_]/.test(part))) {
    errors.push(`${dir}: directory matches Rspress route exclusions`);
  }
}

for (const file of data.pages) {
  const publicRoute = route(file);
  const key = publicRoute.toLocaleLowerCase();
  if (routes.has(key)) errors.push(`${file}: route collides with ${routes.get(key)}`);
  routes.set(key, file);
  if (/[!'?#]/.test(file)) errors.push(`${file}: reserved character in page path`);
  if (built && !fs.existsSync(outputFile(publicRoute))) errors.push(`${file}: HTML output missing`);

  const text = fs.readFileSync(path.join(root, file), 'utf8');
  const linkedPages = new Set();
  for (const ref of references(text)) {
    const local = localUrl(ref.url);
    if (!local) continue;
    localReferences++;
    const target = resolveLocal(file, local.pathname, files);
    if (!target) {
      errors.push(`${file}:${ref.line}: missing target ${ref.url}`);
      continue;
    }
    linkedPages.add(target);
    // Rspress can normalize ./folder/ to /folder.html, which does not exist on
    // a static host. Source Markdown should explicitly reference its index.
    if (local.pathname.endsWith('/') && !local.pathname.startsWith('/')) {
      errors.push(`${file}:${ref.line}: use an explicit index.md link: ${ref.url}`);
    }
    const attachment = target.split('/').includes('assets');
    if (!isPage(target) && !attachment) {
      errors.push(`${file}:${ref.line}: attachment outside local assets/: ${target}`);
    }
    if (
      built
      && attachment
      && !bundledImage.test(target)
      && !fs.existsSync(path.join(output, target))
    ) {
      errors.push(`${file}:${ref.line}: attachment output missing: ${target}`);
    }
  }
  if (/^index\.mdx?$/i.test(path.posix.basename(file))) {
    indexLinks.set(path.posix.dirname(file), linkedPages);
  }
}

for (const [directory, expected] of expectedChildren) {
  const linked = indexLinks.get(directory);
  if (!linked) continue;
  for (const file of expected) {
    if (!linked.has(file)) errors.push(`${directory}/index.md: missing child entry ${file}`);
  }
}

if (built) {
  const redirects = JSON.parse(fs.readFileSync('scripts/content-redirects.json', 'utf8'));
  for (const [old, next] of Object.entries(redirects)) {
    if (!fs.existsSync(outputFile(old))) errors.push(`Redirect missing: ${old}`);
    if (!fs.existsSync(outputFile(next))) errors.push(`Redirect target missing: ${next}`);
  }
}

console.log(JSON.stringify({
  pages: data.pages.length,
  directories: data.contentDirs.size,
  localReferences,
  maxDirectoryDepth: Math.max(...[...data.contentDirs].map(dir => dir ? dir.split('/').length : 0)),
  builtOutputChecked: built,
  errors: errors.length,
}, null, 2));
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
}
