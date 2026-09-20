import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

export const root = path.resolve('docs');
const parser = unified().use(remarkParse).use(remarkGfm);
export const isPage = name => /\.(md|mdx)$/i.test(name);

/** Assets are opaque downloads, including any Markdown inside archives/examples. */
export function inventory(directory = root) {
  const files = [];
  const directories = [];
  function walk(current) {
    directories.push(path.relative(root, current));
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile()) files.push(path.relative(root, full));
    }
  }
  walk(directory);
  const pages = files.filter(file => isPage(file) && !file.split('/').includes('assets'));
  const contentDirs = new Set(['']);
  for (const page of pages) {
    let dir = path.dirname(page);
    while (dir !== '.') {
      contentDirs.add(dir);
      dir = path.dirname(dir);
    }
  }
  return { files, pages, directories, contentDirs };
}

/** Use AST positions to exclude code examples and change URL text only. */
export function references(text) {
  const refs = [];
  function visit(node) {
    if (['link', 'image', 'definition'].includes(node.type) && localUrl(node.url)) {
      const start = node.position.start.offset;
      const snippet = text.slice(start, node.position.end.offset);
      let cursor = 0;
      if (node.type === 'definition') {
        cursor = snippet.indexOf(']:') + 2;
      } else {
        cursor = snippet.indexOf('[') + 1;
        let depth = 1;
        while (cursor < snippet.length && depth) {
          if (snippet[cursor] === '\\') { cursor += 2; continue; }
          if (snippet[cursor] === '[') depth++;
          if (snippet[cursor] === ']') depth--;
          cursor++;
        }
        while (/\s/.test(snippet[cursor] || '') && cursor < snippet.length) cursor++;
        if (snippet[cursor] !== '(') throw new Error(`Cannot locate URL: ${snippet}`);
        cursor++;
      }
      while (cursor < snippet.length && /\s/.test(snippet[cursor])) cursor++;
      const angle = snippet[cursor] === '<';
      if (angle) cursor++;
      const urlStart = cursor;
      let depth = 0;
      while (cursor < snippet.length) {
        const char = snippet[cursor];
        if (char === '\\') { cursor += 2; continue; }
        if (angle ? char === '>' : (/\s/.test(char) || (char === ')' && depth === 0))) break;
        if (char === '(') depth++;
        if (char === ')') depth--;
        cursor++;
      }
      refs.push({
        url: node.url, start: start + urlStart, end: start + cursor,
        line: node.position.start.line, kind: node.type, angle,
      });
    }
    if (node.type === 'html') {
      for (const match of node.value.matchAll(/\b(href|src)\s*=\s*(["'])(.*?)\2/gis)) {
        const offset = match.index + match[0].indexOf(match[2]) + 1;
        refs.push({
          url: match[3].replace(/&amp;/g, '&'),
          start: node.position.start.offset + offset,
          end: node.position.start.offset + offset + match[3].length,
          line: node.position.start.line, kind: 'html', angle: false,
        });
      }
    }
    for (const child of node.children || []) visit(child);
  }
  visit(parser.parse(text));
  return refs;
}

export function localUrl(url) {
  if (!url || /^(?:[a-z][a-z\d+.-]*:|\/\/|#|\?)/i.test(url)) return undefined;
  const at = url.search(/[?#]/);
  const pathname = at < 0 ? url : url.slice(0, at);
  try {
    return { pathname: decodeURIComponent(pathname), suffix: at < 0 ? '' : url.slice(at) };
  } catch {
    return { pathname, suffix: at < 0 ? '' : url.slice(at) };
  }
}

/** Resolve source paths and the .html/directory URLs emitted by Rspress. */
export function resolveLocal(source, pathname, files) {
  const candidate = path.posix.normalize(pathname.startsWith('/')
    ? pathname.slice(1)
    : path.posix.join(path.posix.dirname(source), pathname)).replace(/\/+$/, '');
  const stem = candidate.replace(/\.html$/, '');
  return [
    candidate, `${candidate}/index.md`, `${candidate}/index.mdx`,
    `${stem}.md`, `${stem}.mdx`,
  ].find(item => files.has(item));
}

export function route(file) {
  return `/${file.replace(/(?:^|\/)index\.(md|mdx)$/i, '/').replace(/^\/+/, '').replace(/\.(md|mdx)$/i, '.html')}`;
}

/** Keep Unicode readable; encode delimiters, spaces and Markdown parentheses. */
export function relativeUrl(source, target, suffix = '') {
  const relative = path.posix.relative(path.posix.dirname(source), target);
  return (relative.startsWith('.') ? relative : `./${relative}`)
    .split('/').map(part => part.replace(/[\s%?#()[\]'<>"`\\]/g, char =>
      encodeURIComponent(char).replace(/['()]/g, special =>
        `%${special.charCodeAt(0).toString(16).toUpperCase()}`))).join('/') + suffix;
}
