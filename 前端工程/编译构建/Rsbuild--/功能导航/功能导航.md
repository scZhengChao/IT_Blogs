# 功能导航

## 目录

- [功能导航](#功能导航)
  - [#JavaScript 编译](#JavaScript-编译)
  - [#CSS 编译](#CSS-编译)
  - [#HTML 编译](#HTML-编译)
  - [#Server](#Server)
  - [#UI 框架](#UI-框架)
  - [#静态资源](#静态资源)
  - [#性能和调试](#性能和调试)

# 功能导航

在这里，你可以了解到 Rsbuild 支持的主要功能。

## [#](https://rsbuild.rs/zh/guide/start/features#javascript-编译 "#")JavaScript 编译

| 功能            | 描述                                             | 相关链接                                                                                                                                                                                |
| ------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rspack        | 默认使用 Rspack 作为打包工具                             | \\-   \[配置 Rspack]\(<https://rsbuild.rs/zh/guide/configuration/rspack> "配置 Rspack")                                                                                                 |
| SWC 编译        | 默认通过 SWC 对 JavaScript 和 TypeScript 代码进行转译和压缩   | \\-   \[配置 SWC]\(<https://rsbuild.rs/zh/guide/configuration/swc> "配置 SWC")                                                                                                          |
| TS 编译         | 默认通过 SWC 编译 TS 文件                              | \\-   \[TypeScript 转译]\(<https://rsbuild.rs/zh/guide/basic/typescript#typescript-转译> "TypeScript 转译")                                                                               |
| 代码压缩          | 默认在生产模式构建时开启代码压缩                               | \\-   \[output.minify]\(<https://rsbuild.rs/zh/config/output/minify> "output.minify")                                                                                               |
| Polyfill 注入   | 可选功能，注入 core-js 等 polyfill                     | \\-   \[浏览器兼容性]\(<https://rsbuild.rs/zh/guide/advanced/browser-compatibility> "浏览器兼容性") \\-   \[output.polyfill]\(<https://rsbuild.rs/zh/config/output/polyfill> "output.polyfill") |
| SourceMap 生成  | 默认在开发模式生成 SourceMap                            | \\-   \[output.sourceMap]\(<https://rsbuild.rs/zh/config/output/source-map> "output.sourceMap")                                                                                     |
| 文件别名          | 可选功能，通过 alias 设置文件别名                           | \\-   \[路径别名]\(<https://rsbuild.rs/zh/guide/advanced/alias> "路径别名") \\-   \[resolve.alias]\(<https://rsbuild.rs/zh/config/resolve/alias> "resolve.alias")                           |
| Babel 编译      | 可选功能，通过 Babel 对 JavaScript 和 TypeScript 代码进行转译 | \\-   \[Babel 插件]\(<https://rsbuild.rs/zh/plugins/list/plugin-babel> "Babel 插件")                                                                                                    |
| Node 产物       | 可选功能，构建运行在 Node.js 环境的产物                       | \\-   \[Node 产物]\(<https://rsbuild.rs/zh/config/output/target#node-产物> "Node 产物")                                                                                                   |
| Web Workers   | 可选功能，使用 Web Workers                            | \\-   \[Web Workers]\(<https://rsbuild.rs/zh/guide/basic/web-workers> "Web Workers")                                                                                                |
| 浏览器范围         | 可选功能，通过 browserslist 来设置 Web 应用需要兼容的浏览器范围      | \\-   \[浏览器范围]\(<https://rsbuild.rs/zh/guide/advanced/browserslist> "浏览器范围")                                                                                                        |
| 兼容性检查         | 可选功能，分析构建产物中是否存在当前浏览器范围下不兼容的高级语法               | \\-   \[@rsbuild/plugin-check-syntax]\(<https://github.com/rspack-contrib/rsbuild-plugin-check-syntax> "@rsbuild/plugin-check-syntax")                                              |
| 注入环境变量        | 可选功能，向代码中注入环境变量或表达式                            | \\-   \[环境变量]\(<https://rsbuild.rs/zh/guide/advanced/env-vars> "环境变量")                                                                                                              |
| Node polyfill | 可选功能，在浏览器端注入 Node 核心模块的 polyfills              | \\-   \[Node Polyfill 插件]\(<https://github.com/rspack-contrib/rsbuild-plugin-node-polyfill> "Node Polyfill 插件")                                                                     |
| TS 类型检查       | 可选功能，运行 type checker 检查代码中的类型问题                | \\-   \[类型检查]\(<https://rsbuild.rs/zh/guide/basic/typescript#类型检查> "类型检查")                                                                                                          |
| 模块联邦          | 可选功能，动态加载模块，并共享依赖关系                            | \\-   \[模块联邦]\(<https://rsbuild.rs/zh/guide/advanced/module-federation> "模块联邦")                                                                                                     |

## [#](https://rsbuild.rs/zh/guide/start/features#css-编译 "#")CSS 编译

| 功能               | 描述                              | 相关链接                                                                                                                                                                                |
| ---------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lightning CSS    | 默认启用，使用 Lightning CSS 降级 CSS 语法 | \\-   \[CSS]\(<https://rsbuild.rs/zh/guide/styling/css-usage> "CSS")                                                                                                                |
| Tailwind CSS     | 可选功能，使用 Tailwind CSS            | \\-   \[Tailwind CSS]\(<https://rsbuild.rs/zh/guide/styling/tailwindcss> "Tailwind CSS")                                                                                            |
| UnoCSS           | 可选功能，使用 UnoCSS                  | \\-   \[UnoCSS]\(<https://rsbuild.rs/zh/guide/styling/unocss> "UnoCSS")                                                                                                             |
| PostCSS 转换       | 可选功能，开启 PostCSS 转换              | \\-   \[CSS]\(<https://rsbuild.rs/zh/guide/styling/css-usage> "CSS") \\-   \[tools.postcss]\(<https://rsbuild.rs/zh/config/tools/postcss> "tools.postcss")                          |
| Sass 预处理器        | 可选功能，编译 Sass/Scss 文件            | \\-   \[CSS]\(<https://rsbuild.rs/zh/guide/styling/css-usage> "CSS") \\-   \[Sass 插件]\(<https://rsbuild.rs/zh/plugins/list/plugin-sass> "Sass 插件")                                  |
| Less 预处理器        | 可选功能，编译 Less 文件                 | \\-   \[CSS]\(<https://rsbuild.rs/zh/guide/styling/css-usage> "CSS") \\-   \[Less 插件]\(<https://rsbuild.rs/zh/plugins/list/plugin-less> "Less 插件")                                  |
| Stylus 预处理器      | 可选功能，编译 Stylus 文件               | \\-   \[CSS]\(<https://rsbuild.rs/zh/guide/styling/css-usage> "CSS") \\-   \[Stylus 插件]\(<https://rsbuild.rs/zh/plugins/list/plugin-stylus> "Stylus 插件")                            |
| CSS Modules 编译   | 默认支持编译 CSS Modules 文件           | \\-   \[CSS Modules]\(<https://rsbuild.rs/zh/guide/styling/css-modules> "CSS Modules") \\-   \[tools.cssLoader]\(<https://rsbuild.rs/zh/config/tools/css-loader> "tools.cssLoader") |
| CSS Modules 类型提示 | 可选功能，生成 CSS Modules 的类型定义文件     | \\-   \[Typed CSS Modules 插件]\(<https://github.com/rspack-contrib/rsbuild-plugin-typed-css-modules> "Typed CSS Modules 插件")                                                         |
| CSS 压缩           | 默认在生产模式构建时开启 CSS 压缩             | \\-   \[CSS]\(<https://rsbuild.rs/zh/guide/styling/css-usage> "CSS")                                                                                                                |
| 内联 CSS 到 JS 中    | 可选功能，将 CSS 文件内联到 JS 文件中         | \\-   \[CSS]\(<https://rsbuild.rs/zh/guide/styling/css-usage> "CSS") \\-   \[output.injectStyles]\(<https://rsbuild.rs/zh/config/output/inject-styles> "output.injectStyles")       |

## [#](https://rsbuild.rs/zh/guide/start/features#html-编译 "#")HTML 编译

| 功能         | 描述                      | 相关链接                                                                                                                                                                                            |
| ---------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 设置标题       | 设置 HTML 的\`\<title>\`标签 | \\-   \[设置页面标题]\(<https://rsbuild.rs/zh/guide/basic/html-template#设置页面标题> "设置页面标题") \\-   \[html.title]\(<https://rsbuild.rs/zh/config/html/title> "html.title")                                |
| 设置 meta    | 设置 HTML 的\`\<meta>\`标签  | \\-   \[设置 meta 标签]\(<https://rsbuild.rs/zh/guide/basic/html-template#设置-meta-标签> "设置 meta 标签") \\-   \[html.meta]\(<https://rsbuild.rs/zh/config/html/meta> "html.meta")                       |
| 设置 favicon | 设置 favicon 图标           | \\-   \[设置页面图标]\(<https://rsbuild.rs/zh/guide/basic/html-template#设置页面图标> "设置页面图标") \\-   \[html.favicon]\(<https://rsbuild.rs/zh/config/html/favicon> "html.favicon")                          |
| 设置 app 图标  | 设置 Web 应用的图标            | \\-   \[设置页面图标]\(<https://rsbuild.rs/zh/guide/basic/html-template#设置页面图标> "设置页面图标") \\-   \[html.appIcon]\(<https://rsbuild.rs/zh/config/html/app-icon> "html.appIcon")                         |
| EJS 模板     | 可选功能，使用 EJS 模板语法        | \\-   \[模板引擎 - EJS]\(<https://rsbuild.rs/zh/guide/basic/html-template#ejs> "模板引擎 - EJS")                                                                                                        |
| Pug 模板引擎   | 可选功能，使用 Pug 模板语法        | \\-   \[Pug 插件]\(<https://github.com/rspack-contrib/rsbuild-plugin-pug> "Pug 插件")                                                                                                               |
| 内联 JS 文件   | 可选功能，将 JS 内联到 HTML 中    | \\-   \[静态资源内联]\(<https://rsbuild.rs/zh/guide/optimization/inline-assets> "静态资源内联") \\-   \[output.inlineScripts]\(<https://rsbuild.rs/zh/config/output/inline-scripts> "output.inlineScripts") |
| 内联 CSS 文件  | 可选功能，将 CSS 内联到 HTML 中   | \\-   \[静态资源内联]\(<https://rsbuild.rs/zh/guide/optimization/inline-assets> "静态资源内联") \\-   \[output.inlineStyles]\(<https://rsbuild.rs/zh/config/output/inline-styles> "output.inlineStyles")    |

## [#](https://rsbuild.rs/zh/guide/start/features#server "#")Server

| 功能        | 描述                           | 相关链接                                                                                            |
| --------- | ---------------------------- | ----------------------------------------------------------------------------------------------- |
| Public 目录 | 默认将 public 目录作为静态资源服务的文件夹    | \\-   \[server.publicDir]\(<https://rsbuild.rs/zh/config/server/public-dir> "server.publicDir") |
| SSR       | 可选功能，实现服务端渲染                 | \\-   \[服务端渲染]\(<https://rsbuild.rs/zh/guide/advanced/ssr> "服务端渲染")                             |
| 请求代理      | 可选功能，将请求代理到指定的服务上            | \\-   \[server.proxy]\(<https://rsbuild.rs/zh/config/server/proxy> "server.proxy")              |
| 打开页面      | 可选功能，在启动 server 时自动在浏览器中打开页面 | \\-   \[server.open]\(<https://rsbuild.rs/zh/config/server/open> "server.open")                 |
| HTTPS     | 可选功能，开启 server 对 HTTPS 的支持   | \\-   \[server.https]\(<https://rsbuild.rs/zh/config/server/https> "server.https")              |
| 自定义中间件    | 可选功能，使用自定义的中间件               | \\-   \[中间件]\(<https://rsbuild.rs/zh/guide/basic/server#中间件> "中间件")                             |

## [#](https://rsbuild.rs/zh/guide/start/features#ui-框架 "#")UI 框架

| 功能            | 描述                        | 相关链接                                                                                                                                    |
| ------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| React         | 可选功能，开启 React JSX 语法编译    | \\-   \[React 插件]\(<https://rsbuild.rs/zh/plugins/list/plugin-react> "React 插件")                                                        |
| React Refresh | 可选功能，开启 React Refresh 热更新 | \\-   \[模块热更新]\(<https://rsbuild.rs/zh/guide/advanced/hmr> "模块热更新") \\-   \[dev.hmr]\(<https://rsbuild.rs/zh/config/dev/hmr> "dev.hmr") |
| SVGR          | 可选功能，转换 SVG 为 React 组件    | \\-   \[SVGR 插件]\(<https://rsbuild.rs/zh/plugins/list/plugin-svgr> "SVGR 插件")                                                           |
| Vue 3 SFC     | 可选功能，开启 Vue 3 SFC 单文件组件编译 | \\-   \[Vue 插件]\(<https://rsbuild.rs/zh/plugins/list/plugin-vue> "Vue 插件")                                                              |
| Vue 3 JSX     | 可选功能，开启 Vue 3 JSX 语法编译    | \\-   \[Vue JSX 插件]\(<https://github.com/rspack-contrib/rsbuild-plugin-vue-jsx> "Vue JSX 插件")                                           |
| Vue 2 SFC     | 可选功能，开启 Vue 2 SFC 单文件组件编译 | \\-   \[Vue 2 插件]\(<https://github.com/rspack-contrib/rsbuild-plugin-vue2> "Vue 2 插件")                                                  |
| Vue 2 JSX     | 可选功能，开启 Vue 2 JSX 语法编译    | \\-   \[Vue 2 JSX 插件]\(<https://github.com/rspack-contrib/rsbuild-plugin-vue2-jsx> "Vue 2 JSX 插件")                                      |
| Svelte        | 可选功能，开启 Svelte 组件编译       | \\-   \[Svelte 插件]\(<https://rsbuild.rs/zh/plugins/list/plugin-svelte> "Svelte 插件")                                                     |
| Solid         | 可选功能，开启 Solid JSX 语法编译    | \\-   \[Solid 插件]\(<https://rsbuild.rs/zh/plugins/list/plugin-solid> "Solid 插件")                                                        |

## [#](https://rsbuild.rs/zh/guide/start/features#静态资源 "#")静态资源

| 功能             | 描述                         | 相关链接                                                                                                                                                                                          |
| -------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 图片资源           | 支持在代码中引用图片资源               | \\-   \[静态资源]\(<https://rsbuild.rs/zh/guide/basic/static-assets> "静态资源")                                                                                                                      |
| 字体资源           | 支持在代码中引用字体资源               | \\-   \[静态资源]\(<https://rsbuild.rs/zh/guide/basic/static-assets> "静态资源")                                                                                                                      |
| 视频资源           | 支持在代码中引用视频资源               | \\-   \[静态资源]\(<https://rsbuild.rs/zh/guide/basic/static-assets> "静态资源")                                                                                                                      |
| Wasm 资源        | 支持在代码中引用 WebAssembly 资源    | \\-   \[引用 Wasm 资源]\(<https://rsbuild.rs/zh/guide/basic/wasm-assets> "引用 Wasm 资源")                                                                                                            |
| Node addons    | 支持在代码中引用 Node.js addons    | \\-   \[Node addons]\(<https://rsbuild.rs/zh/config/output/target#node-addons> "Node addons")                                                                                                 |
| 静态资源内联         | 默认将体积较小的图片等资源内联到 JS 中      | \\-   \[静态资源内联]\(<https://rsbuild.rs/zh/guide/optimization/inline-assets> "静态资源内联") \\-   \[output.dataUriLimit]\(<https://rsbuild.rs/zh/config/output/data-uri-limit> "output.dataUriLimit") |
| 清理静态资源         | 每次开始构建前，自动清理 dist 目录下的静态资源 | \\-   \[output.cleanDistPath]\(<https://rsbuild.rs/zh/config/output/clean-dist-path> "output.cleanDistPath")                                                                                  |
| 拷贝静态资源         | 可选功能，将静态资源拷贝到 dist 目录下     | \\-   \[output.copy]\(<https://rsbuild.rs/zh/config/output/copy> "output.copy")                                                                                                               |
| 生成 manifest 文件 | 可选功能，生成\`manifest.json\`文件 | \\-   \[output.manifest]\(<https://rsbuild.rs/zh/config/output/manifest> "output.manifest")                                                                                                   |

## [#](https://rsbuild.rs/zh/guide/start/features#性能和调试 "#")性能和调试

| 功能              | 描述                                   | 相关链接                                                                                                                                                                                               |
| --------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 代码拆分            | Rsbuild 中内置了多种拆包策略，自动将代码包拆分为体积适中的文件  | \\-   \[代码拆分]\(<https://rsbuild.rs/zh/guide/optimization/code-splitting> "代码拆分") \\-   \[performance.chunkSplit]\(<https://rsbuild.rs/zh/config/performance/chunk-split> "performance.chunkSplit") |
| 展示产物体积          | 在生产模式构建后，默认展示所有静态资源的体积信息             | \\-   \[performance.printFileSize]\(<https://rsbuild.rs/zh/config/performance/print-file-size> "performance.printFileSize")                                                                        |
| 分析构建流程          | 可选功能，使用 Rsdoctor 分析构建流程              | \\-   \[使用 Rsdoctor]\(<https://rsbuild.rs/zh/guide/debug/rsdoctor> "使用 Rsdoctor")                                                                                                                  |
| 分析产物体积          | 可选功能，通过 Bundle Analyzer 分析产物体积       | \\-   \[performance.bundleAnalyze]\(<https://rsbuild.rs/zh/config/performance/bundle-analyze> "performance.bundleAnalyze")                                                                         |
| 移除 console      | 可选功能，移除代码中的\`console.\[methodName]\` | \\-   \[performance.removeConsole]\(<https://rsbuild.rs/zh/config/performance/remove-console> "performance.removeConsole")                                                                         |
| 优化 moment.js 体积 | 可选功能，移除 moment.js 多余的 locale 文件      | \\-   \[performance.removeMomentLocale]\(<https://rsbuild.rs/zh/config/performance/remove-moment-locale> "performance.removeMomentLocale")                                                         |
| 移除重复包           | 可选功能，移除重复引用的 npm 包                   | \\-   \[resolve.dedupe]\(<https://rsbuild.rs/zh/config/resolve/dedupe> "resolve.dedupe")                                                                                                           |
| 组件库按需引入         | 可选功能，按需引入组件库的代码和样式                   | \\-   \[source.transformImport]\(<https://rsbuild.rs/zh/config/source/transform-import> "source.transformImport")                                                                                  |
| 图片压缩            | 可选功能，对引用的图片资源进行压缩处理                  | \\-   \[Image compress 插件]\(<https://github.com/rspack-contrib/rsbuild-plugin-image-compress> "Image compress 插件")                                                                                 |
| Preload         | 可选功能，对资源进行预加载                        | \\-   \[performance.preload]\(<https://rsbuild.rs/zh/config/performance/preload> "performance.preload")                                                                                            |
| Prefetch        | 可选功能，对资源进行预获取                        | \\-   \[performance.prefetch]\(<https://rsbuild.rs/zh/config/performance/prefetch> "performance.prefetch")                                                                                         |
| Preconnect      | 可选功能，对资源进行预连接                        | \\-   \[performance.preconnect]\(<https://rsbuild.rs/zh/config/performance/preconnect> "performance.preconnect")                                                                                   |
| DNS prefetch    | 可选功能，对资源进行 DNS 预获取                   | \\-   \[performance.dnsPrefetch]\(<https://rsbuild.rs/zh/config/performance/dns-prefetch> "performance.dnsPrefetch")                                                                               |
