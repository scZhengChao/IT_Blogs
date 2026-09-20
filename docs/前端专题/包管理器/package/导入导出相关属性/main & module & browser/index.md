# main & module & browser

除了type外，package.json中还有main,module和browser 3个字段来定义npm包的入口文件。

- main : 定义了 npm 包的入口文件，cjs规范
- module : 定义 npm 包的 ESM 规范的入口文件，必须是 `ES Module (ESM)`格式（`.mjs`或 `.esm.js`）。
- browser : 定义 npm 包在 browser 环境下的入口文件；可以是 `UMD`、`IIFE`或 `ESM`，取决于打包方式。

目前三种规范 `esm` 、`cjs` 、`umd` 占据主流，其中：

- `esm` ：现代 ECMA 规范，摇树性能好，首推使用
- `cjs` ：[node](https://so.csdn.net/so/search?q=node\&spm=1001.2101.3001.7020 "node") 使用的 require 规范，无摇树
- `umd` ：支持 `cjs` 和 `amd` 规范，自动挂载导出到 [global](https://so.csdn.net/so/search?q=global\&spm=1001.2101.3001.7020 "global") ，一般用在浏览器中

一般情况下他们在 `package.json` 中的对应字段如下：

| 字段        | 规范    |
| --------- | ----- |
| `main`    | `cjs` |
| `module`  | `esm` |
| `browser` | `umd` |

我们来看一下这3个字段的使用场景，以及**同时存在这3个字段时的优先级**。我们假设有一个npm包为demo1,

```javascript 
---- dist 
  -- index.browser.js 
  -- index.browser.mjs 
  -- index.js 
  -- index.mjs

```


其package.json中同时指定了main,module和browser这3个字段，

```javascript 
- "main": "dist/index.js", // main 
- "module": "dist/index.mjs", // module
// browser 可定义成和 main/module 字段一一对应的映射对象，也可以直接定义为字符串 

- "browser": { 
    - "./dist/index.js": "./dist/index.browser.js",    // browser+cjs 
    - "./dist/index.mjs": "./dist/index.browser.mjs" // browser+mjs
 },
- "browser": "./dist/index.browser.js" // browser
```


我们在项目中引用这个npm包：

```react tsx 
import demo from 'demo'
```


模块的加载循序为：***browser+mjs > module > browser+cjs > main***

大部分构建工具默认的加载顺序，比如webapck、esbuild等等。可以通过相应的配置修改这个加载顺序，不过大部分场景，我们还是会遵循默认的加载顺序。
