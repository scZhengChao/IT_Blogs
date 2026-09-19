import fs from 'node:fs';
import path from 'node:path';
import type { RspressPlugin } from '@rspress/core';

interface SameNamePage {
    routePath: string;
    filepath: string;
    relativePath: string;
}

function scanSameNamePages(rootDir: string): SameNamePage[] {
    const result: SameNamePage[] = [];

    function walk(currentDir: string) {
        const entries = fs.readdirSync(currentDir, {
            withFileTypes: true,
        });

        for (const entry of entries) {
            if (entry.name.startsWith('.')) continue;

            const fullPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                walk(fullPath);
                continue;
            }

            if (!entry.isFile()) continue;
            if (!entry.name.toLowerCase().endsWith('.md')) continue;

            const fileName = path.basename(entry.name, '.md');
            const parentName = path.basename(currentDir);

            // 只处理：
            //
            // foo/
            //   foo.md
            //
            if (fileName !== parentName) continue;

            const relativePath = path
                .relative(rootDir, fullPath)
                .split(path.sep)
                .join('/');

            const routeParts = relativePath.split('/');
            routeParts.pop();

            const routePath =
                '/' + routeParts.join('/') + '/';

            result.push({
                routePath,
                filepath: fullPath,
                relativePath,
            });
        }
    }

    walk(rootDir);

    return result;
}

export function sameNameRoutePlugin(): RspressPlugin {
    let pages: SameNamePage[] = [];

    return {
        name: 'same-name-route',

        config(config) {
            const root = config.root || 'docs';

            const rootDir = path.resolve(
                process.cwd(),
                root,
            );

            if (!fs.existsSync(rootDir)) {
                throw new Error(
                    `[same-name-route] 文档目录不存在：${rootDir}`,
                );
            }

            pages = scanSameNamePages(rootDir);

            console.log(
                `[same-name-route] 找到 ${pages.length} 个同名 Markdown 页面`,
            );

            /*
             * 排除原本的：
             *
             * rust学习/rust学习.md
             *          ↓
             * /rust学习/rust学习
             *
             * 改由 addPages 注册：
             *
             * /rust学习/
             */
            return {
                ...config,

                route: {
                    ...config.route,

                    exclude: [
                        ...(config.route?.exclude || []),
                        ...pages.map(page => page.relativePath),
                    ],
                },
            };
        },

        addPages() {
            return pages.map(page => {
                const content = fs.readFileSync(
                    page.filepath,
                    'utf8',
                );

                return {
                    routePath: page.routePath,
                    content,
                };
            });
        },
    };
}