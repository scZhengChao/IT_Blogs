import fs from 'node:fs';
import path from 'node:path';
import type { RspressPlugin } from '@rspress/core';

/**
 * Emit old article URLs after SSG, keeping migration aliases out of the React
 * route table and search index. Internal Markdown always links to current pages.
 */
export function contentRedirectsPlugin(): RspressPlugin {
  return {
    name: 'content-redirects',

    /** Only production output needs static compatibility pages. */
    afterBuild(config, isProd) {
      if (!isProd) return;

      const output = path.resolve(config.outDir || 'doc_build');
      const redirects: Record<string, string> = JSON.parse(
        fs.readFileSync(path.resolve('scripts/content-redirects.json'), 'utf8'),
      );
      const base = `/${(config.base || '/').replace(/^\/+|\/+$/g, '')}`
        .replace(/\/$/, '');

      /** Reject traversal and require physical HTML paths under the build root. */
      function htmlPath(route: string) {
        if (!route.startsWith('/') || route.startsWith('//')) {
          throw new Error(`[content-redirects] Invalid route: ${route}`);
        }
        const relative = route.slice(1) + (route.endsWith('/') ? 'index.html' : '');
        const full = path.resolve(output, relative);
        if (!full.startsWith(`${output}${path.sep}`) || !full.endsWith('.html')) {
          throw new Error(`[content-redirects] Invalid output: ${route}`);
        }
        return full;
      }

      let emitted = 0;
      for (const [previous, current] of Object.entries(redirects)) {
        if (previous === current) continue;
        const source = htmlPath(previous);
        const target = htmlPath(current);
        // Validate before writing: never overwrite a real page or emit a chain.
        if (fs.existsSync(source) || !fs.existsSync(target)) {
          throw new Error(`[content-redirects] Collision or missing target: ${previous} -> ${current}`);
        }

        const destination = encodeURI(`${base}${current}`)
          .replace(/["'<>]/g, char => `%${char.charCodeAt(0).toString(16)}`);
        const escaped = destination.replace(/&/g, '&amp;');
        const scriptTarget = JSON.stringify(destination).replace(/</g, '\\u003c');
        const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0;url=${escaped}">
<link rel="canonical" href="${escaped}">
<title>Page moved</title>
<script>location.replace(${scriptTarget} + location.search + location.hash);</script>
</head><body><a href="${escaped}">Continue to this page</a></body></html>
`;
        fs.mkdirSync(path.dirname(source), { recursive: true });
        fs.writeFileSync(source, html);
        emitted++;
      }
      console.log(`[content-redirects] Emitted ${emitted} static redirects`);
    },
  };
}
