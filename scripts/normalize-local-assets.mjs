import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { visit } from 'unist-util-visit';

const DOCS_ROOT = path.resolve(process.cwd(), 'docs');
const APPLY_CHANGES = process.argv.includes('--write');
const MARKDOWN_PATTERN = /\.(md|mdx)$/i;

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function listFiles(directory) {
  const files = [];

  for (const entry of fs.readdirSync(directory, {
    withFileTypes: true,
  })) {
    if (entry.name.startsWith('.')) {
      continue;
    }

    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...listFiles(entryPath));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

function hasPathSegment(filePath, segment) {
  return path
    .relative(DOCS_ROOT, filePath)
    .split(path.sep)
    .slice(0, -1)
    .includes(segment);
}

/**
 * Markdown files in a literal `file` directory are download attachments.
 * Other Markdown files remain regular Rspress pages.
 */
function isAttachment(filePath) {
  return (
    !MARKDOWN_PATTERN.test(filePath) ||
    hasPathSegment(filePath, 'file')
  );
}

function hasIndexPage(directory) {
  return (
    fs.existsSync(path.join(directory, 'index.md')) ||
    fs.existsSync(path.join(directory, 'index.mdx'))
  );
}

/**
 * Associates an attachment with the nearest ancestor article or section.
 * This keeps assets beside their owning documentation instead of collecting
 * unrelated files in one root-level directory.
 */
function findOwnerDirectory(filePath) {
  let directory = path.dirname(filePath);

  while (
    directory !== DOCS_ROOT &&
    !hasIndexPage(directory)
  ) {
    directory = path.dirname(directory);
  }

  return directory;
}

function createAssetMap(files) {
  const assetMap = new Map();
  const targetPaths = new Set();

  for (const sourcePath of files.filter(isAttachment)) {
    if (hasPathSegment(sourcePath, 'assets')) {
      continue;
    }

    const ownerDirectory = findOwnerDirectory(sourcePath);
    const relativePath = path.relative(
      ownerDirectory,
      sourcePath,
    );
    const targetPath = path.join(
      ownerDirectory,
      'assets',
      relativePath,
    );

    if (targetPaths.has(targetPath)) {
      throw new Error(
        `Duplicate local asset target: ${targetPath}`,
      );
    }

    if (
      fs.existsSync(targetPath) &&
      sourcePath !== targetPath
    ) {
      throw new Error(
        `Local asset target already exists: ${targetPath}`,
      );
    }

    targetPaths.add(targetPath);
    assetMap.set(sourcePath, targetPath);
  }

  return assetMap;
}

function splitUrl(url) {
  const match = url.match(/^([^?#]*)([?#].*)?$/);

  return {
    pathname: match?.[1] || url,
    suffix: match?.[2] || '',
  };
}

function isExternalUrl(url) {
  return (
    /^[a-z][a-z\d+.-]*:/i.test(url) ||
    url.startsWith('//') ||
    url.startsWith('/') ||
    url.startsWith('#')
  );
}

function decodePathname(pathname) {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
}

function resolveLocalTarget(markdownFile, url) {
  const { pathname } = splitUrl(url);

  if (!pathname || isExternalUrl(url)) {
    return undefined;
  }

  return path.resolve(
    path.dirname(markdownFile),
    decodePathname(pathname),
  );
}

function toRelativeUrl(markdownFile, targetPath, suffix) {
  let relativePath = toPosix(
    path.relative(path.dirname(markdownFile), targetPath),
  );

  if (!relativePath.startsWith('.')) {
    relativePath = `./${relativePath}`;
  }

  return `${relativePath}${suffix}`;
}

function formatDestination(
  source,
  start,
  end,
  relativeUrl,
) {
  const alreadyWrapped =
    source[start - 1] === '<' &&
    source[end] === '>';
  const needsWrapper = /[\s()]/.test(relativeUrl);

  if (alreadyWrapped || !needsWrapper) {
    return relativeUrl;
  }

  return `<${relativeUrl}>`;
}

function applyReplacements(source, replacements) {
  return replacements
    .sort((left, right) => right.start - left.start)
    .reduce(
      (content, replacement) =>
        content.slice(0, replacement.start) +
        replacement.value +
        content.slice(replacement.end),
      source,
    );
}

/**
 * Rewrites only asset destinations identified by the Markdown AST. All prose,
 * code blocks, spacing, and unrelated Markdown syntax remain byte-for-byte
 * unchanged.
 */
function rewriteAssetReferences(markdownFile, assetMap) {
  const source = fs.readFileSync(markdownFile, 'utf8');
  const tree = fromMarkdown(source);
  const replacements = [];
  const replacementRanges = new Set();

  function addUrlReplacement(node, url) {
    const sourcePath = resolveLocalTarget(
      markdownFile,
      url,
    );
    const targetPath =
      sourcePath && assetMap.get(sourcePath);

    if (!targetPath) {
      return;
    }

    const nodeSource = source.slice(
      node.position.start.offset,
      node.position.end.offset,
    );
    const relativeStart = nodeSource.indexOf(url);

    if (relativeStart < 0) {
      return;
    }

    const start =
      node.position.start.offset + relativeStart;
    const end = start + url.length;
    const replacementKey = `${start}:${end}`;

    if (replacementRanges.has(replacementKey)) {
      return;
    }

    const { suffix } = splitUrl(url);
    const relativeUrl = toRelativeUrl(
      markdownFile,
      targetPath,
      suffix,
    );

    replacements.push({
      start,
      end,
      value: formatDestination(
        source,
        start,
        end,
        relativeUrl,
      ),
    });
    replacementRanges.add(replacementKey);
  }

  visit(tree, node => {
    if (
      (node.type === 'image' ||
        node.type === 'link' ||
        node.type === 'definition') &&
      typeof node.url === 'string'
    ) {
      addUrlReplacement(node, node.url);
      return;
    }

    if (
      node.type !== 'html' ||
      typeof node.value !== 'string'
    ) {
      return;
    }

    const rewrittenHtml = node.value.replace(
      /\b(src|href)=(["'])(.*?)\2/gi,
      (attribute, name, quote, url) => {
        const sourcePath = resolveLocalTarget(
          markdownFile,
          url,
        );
        const targetPath =
          sourcePath && assetMap.get(sourcePath);

        if (!targetPath) {
          return attribute;
        }

        const { suffix } = splitUrl(url);
        return `${name}=${quote}${toRelativeUrl(
          markdownFile,
          targetPath,
          suffix,
        )}${quote}`;
      },
    );

    if (rewrittenHtml !== node.value) {
      replacements.push({
        start: node.position.start.offset,
        end: node.position.end.offset,
        value: rewrittenHtml,
      });
    }
  });

  if (replacements.length > 0 && APPLY_CHANGES) {
    fs.writeFileSync(
      markdownFile,
      applyReplacements(source, replacements),
    );
  }

  return replacements.length;
}

function moveAssets(assetMap) {
  for (const [sourcePath, targetPath] of assetMap) {
    fs.mkdirSync(path.dirname(targetPath), {
      recursive: true,
    });
    fs.renameSync(sourcePath, targetPath);
  }
}

function removeEmptyDirectories(directory) {
  if (path.basename(directory) === 'assets') {
    return;
  }

  for (const entry of fs.readdirSync(directory, {
    withFileTypes: true,
  })) {
    if (entry.isDirectory()) {
      removeEmptyDirectories(path.join(directory, entry.name));
    }
  }

  if (
    directory !== DOCS_ROOT &&
    fs.readdirSync(directory).length === 0
  ) {
    fs.rmdirSync(directory);
  }
}

function main() {
  const files = listFiles(DOCS_ROOT);
  const assetMap = createAssetMap(files);
  const markdownPages = files.filter(filePath =>
    MARKDOWN_PATTERN.test(filePath) &&
    !isAttachment(filePath),
  );
  let referencesUpdated = 0;
  let markdownFilesUpdated = 0;

  for (const markdownFile of markdownPages) {
    const count = rewriteAssetReferences(
      markdownFile,
      assetMap,
    );

    referencesUpdated += count;
    markdownFilesUpdated += Number(count > 0);
  }

  if (APPLY_CHANGES) {
    moveAssets(assetMap);
    removeEmptyDirectories(DOCS_ROOT);
  }

  console.log(JSON.stringify({
    mode: APPLY_CHANGES ? 'write' : 'dry-run',
    assetsMoved: assetMap.size,
    markdownAttachmentsMoved: [...assetMap.keys()]
      .filter(filePath => MARKDOWN_PATTERN.test(filePath))
      .length,
    markdownFilesUpdated,
    referencesUpdated,
  }, null, 2));
}

main();
