# ESM 和 CJS 的困境

## 目录

- [ESM 和 CJS 的困境](#ESM-和-CJS-的困境)

### ESM 和 CJS 的困境

> 以下参考自 [Node 模块之战：为什么 CommonJS 和 ES Modules 无法共存](https://redfin.engineering/node-modules-at-war-why-commonjs-and-es-modules-cant-get-along-9617135eeca1 "Node 模块之战：为什么 CommonJS 和 ES Modules 无法共存")。

1. 你不能 `require()` ESM 脚本；你只能导入 ESM 脚本，像这样：`import {foo} from 'foo'`
2. CJS 脚本不能使用静态 `import` 语句，如上所示。
3. ESM 脚本可以 `import` CJS 脚本，但只能使用**默认导入**语法 `import _ from 'lodash'`，而不能使用**命名导入**语法 `import {shuffle} from 'lodash'`，如果 CJS 脚本使用命名导出，这会很麻烦。（不过，有时 Node 会不可预料 地猜出你的意思！）
4. ESM 脚本可以 `require()` CJS 脚本，即使是命名导出，但通常不值得这样做，因为这需要更多的模板代码，而且最糟糕的是，像 webpack 和 Rollup 这样的打包工具不知道/不会处理使用 `require()` 的 ESM 脚本。
5. CJS 是默认的；你需要选择加入 ESM 模式。你可以通过将脚本从 `.js` 重命名为 `.mjs` 来选择性开启 ESM 模式。或者，你可以在 `package.json` 中设置 `"type": "module"`，然后通过将脚本从 `.js` 重命名为 `.cjs` 来选择性关闭 ESM。（你甚至可以通过在单个子目录中放置一行 `{"type": "module"}` `package.json` 来调整它。）
