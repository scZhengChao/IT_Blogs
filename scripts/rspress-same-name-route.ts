import fs from 'node:fs';
import path from 'node:path';
import type { RspressPlugin } from '@rspress/core';

interface SameNamePage {
    routePath: string;
    filepath: string;
    relativePath: string;
}

function scanSameNamePages(
    rootDir: string,
): SameNamePage[] {
    const result: SameNamePage[] = [];

    function walk(currentDir: string) {
        const entries = fs.readdirSync(
            currentDir,
            {
                withFileTypes: true,
            },
        );

        for (const entry of entries) {
            if (entry.name.startsWith('.')) {
                continue;
            }

            const fullPath = path.join(
                currentDir,
                entry.name,
            );

            if (entry.isDirectory()) {
                walk(fullPath);
                continue;
            }

            if (!entry.isFile()) {
                continue;
            }

            if (
                !entry.name
                    .toLowerCase()
                    .endsWith('.md')
            ) {
                continue;
            }

            const fileName = path.basename(
                entry.name,
                '.md',
            );

            const parentName =
                path.basename(currentDir);

            if (fileName !== parentName) {
                continue;
            }

            const relativePath = path
                .relative(rootDir, fullPath)
                .split(path.sep)
                .join('/');

            const routeParts =
                relativePath.split('/');

            routeParts.pop();

            const routePath =
                '/' +
                routeParts.join('/') +
                '/';

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
            const root =
                config.root || 'docs';

            const rootDir = path.resolve(
                process.cwd(),
                root,
            );

            if (!fs.existsSync(rootDir)) {
                throw new Error(
                    `[same-name-route] 文档目录不存在：${rootDir}`,
                );
            }

            pages =
                scanSameNamePages(rootDir);

            console.log(
                `[same-name-route] 找到 ${pages.length} 个同名 Markdown 页面`,
            );

            return {
                ...config,

                route: {
                    ...config.route,

                    exclude: [
                        ...(config.route?.exclude || []),

                        ...pages.map(
                            page => page.relativePath,
                        ),
                    ],
                },
            };
        },

        addPages() {
            return pages.map(page => {
                /*
                 * Rspack treats "!" in a module request as a loader separator.
                 * Passing such an absolute path through `filepath` truncates the
                 * request and makes it resolve as ".md". Supplying the source as
                 * `content` lets Rspress compile it from a safe temporary path
                 * without changing the historical Markdown file.
                 */
                if (page.filepath.includes('!')) {
                    return {
                        routePath: page.routePath,
                        content: fs.readFileSync(
                            page.filepath,
                            'utf8',
                        ),
                    };
                }

                return {
                    routePath: page.routePath,
                    filepath: page.filepath,
                };
            });
        },

        routeServiceGenerated(routeService) {
            /*
             * Rspress 2.0.22 emits route metadata as single-quoted JavaScript
             * literals. A historical path containing an apostrophe therefore
             * produces invalid virtual-routes.js. Keep the original route data
             * intact and only replace its generated literals with JSON strings.
             */
            const generateRoutesCodeByRouteMeta =
                routeService.generateRoutesCodeByRouteMeta.bind(
                    routeService,
                );

            routeService.generateRoutesCodeByRouteMeta = (
                routes: Array<{
                    routePath: string;
                    relativePath: string;
                    lang: string;
                    version: string;
                }>,
            ) => {
                let code =
                    generateRoutesCodeByRouteMeta(routes);

                for (const route of routes) {
                    code = code
                        .replace(
                            `{ path: '${route.routePath}',`,
                            `{ path: ${JSON.stringify(
                                route.routePath,
                            )},`,
                        )
                        .replace(
                            `filePath: '${route.relativePath}',`,
                            `filePath: ${JSON.stringify(
                                route.relativePath,
                            )},`,
                        )
                        .replace(
                            `lang: '${route.lang}',`,
                            `lang: ${JSON.stringify(
                                route.lang,
                            )},`,
                        )
                        .replace(
                            `version: '${route.version}' }`,
                            `version: ${JSON.stringify(
                                route.version,
                            )} }`,
                        );
                }

                return code;
            };
        },
    };
}
