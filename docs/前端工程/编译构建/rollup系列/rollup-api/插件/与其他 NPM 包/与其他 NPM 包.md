# 与其他 NPM 包

## 目录

- [@rollup/plugin-node-resolve\[\]](#rollupplugin-node-resolve)

在某个时刻，你的项目可能会依赖于从 NPM 安装到 `node_modules` 文件夹中的软件包。与 Webpack 和 Browserify 等其他打包程序不同，**Rollup 默认情况下不知道如何处理这些依赖项，我们需要添加一些配置。**

让我们添加一个名为 [**the-answer**](https://www.npmjs.com/package/the-answer "the-answer")的简单依赖项，它导出了生命、宇宙和一切问题的答案：

```markdown 
npm install the-answer# or `npm i the-answer` \{#or-npm-i-the-answer}
```


如果我们更新了 `src/main.js` 文件…

```javascript 
// src/main.jsimport answer from 'the-answer';export default function () {  console.log('the answer is ' + answer);}
```


…然后运行 Rollup…

```bash 
npm run build
```


…我们会看到这样的警告：

```html 
(!) Unresolved dependencieshttps://github.com/rollup/rollup/wiki/Troubleshooting#treating-module-as-external-dependencythe-answer (imported by main.js)
```


生成的 `bundle.js` 仍然可以在 Node.js 中使用，因为 `import` 声明会被转换为 CommonJS 的 `require` 语句，但是 `the-answer` 不会被包含在 bundle 中。为此，我们需要一个插件。

### @rollup/plugin-node-resolve\[]

[**@rollup/plugin-node-resolve**](https://github.com/rollup/plugins/tree/master/packages/node-resolve "@rollup/plugin-node-resolve")插件可以让 Rollup 找到外部模块。让我们安装它…

```javascript 
npm install --save-dev @rollup/plugin-node-resolve
```


…然后将它添加到我们的配置文件中：

这一次，当你运行 `npm run build` 时，不会发出警告 - bundle 包含了导入的模块。
