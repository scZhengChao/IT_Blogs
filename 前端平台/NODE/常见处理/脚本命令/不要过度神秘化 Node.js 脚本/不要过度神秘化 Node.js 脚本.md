# 不要过度神秘化 Node.js 脚本

## 目录

- [如何运行Node.js脚本](#如何运行Nodejs脚本)
- [如何引入第三方Node.js包](#如何引入第三方Nodejs包)
- [实现晨会上的功能](#实现晨会上的功能)

有些人可能会误解 Node.js 脚本，认为它是用 Node.js 编写的。他们可能会觉得如果不懂 Node.js 的语法就无法编写 Node.js 脚本，感觉会写 Node.js 脚本就很神秘。实际上，Node.js 脚本只是在 Node.js 环境中运行的 JavaScript 脚本而已。

> Node.js是一个基于Chrome V8引擎的JavaScript运行时环境，使得您可以在服务器端运行JavaScript代码。

在Node.js环境中，您可以编写JavaScript脚本来执行各种任务，比如文件操作、网络通信、数据处理等。这些脚本可以被称为Node.js脚本，因为它们是在Node.js环境中运行的JavaScript代码，仅此而已，没有什么神秘的。

在前端工程中，Node.js 脚本最常用于文件操作，比如读取、写入、删除、新建文件等等操作。

## 如何运行Node.js脚本

非常简单，只要你的电脑中有装 Node.js，随便找个地方创建一个 `index.js` 文件，然后在文件中写入以下代码：

```javascript 
console.log('我是一个Node.js脚本');

```


接着，打开命令行工具，并进入该文件所在的目录。最后，在命令行中输入 `node ./index.js` 并按下回车键。你将会在命令行工具中看到输出 `我是一个Node.js脚本`。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6768e8e061614b2ab60b57912d523bff~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=437\&h=107\&s=6195\&e=png\&b=000000)

如果你想将这个 Node.js 脚本作为 npm 脚本运行，可以将其添加到 `package.json` 文件中的 `scripts` 部分。假设你的脚本文件相对于 `package.json` 的路径是 `./scripts/index.js`，你可以添加以下内容到 `package.json` 的 `scripts` 部分：

```javascript 
"scripts": {
  "my-script": "node ./scripts/index.js"
}

```


这样，你就创建了一个名为 `my-script` 的自定义脚本，可以通过在命令行中输入 `npm run my-script` 来运行你的 Node.js 脚本。

## 如何引入第三方Node.js包

要实现晨会中所说的功能，首先得对工程中的文件进行操作，虽然可以直接使用 Node.js 内置的 `fs` 模块来实现，但是为了避免处理文件操作时出现的常见错误和边界情况，同时确保跨平台兼容性。还是选择 `fs-extra` 这个第三方 Node.js 包来进行文件操作，那我们该如何引入呢？

首先要看 Node.js 的版本，在 12 版本之前，只支持 `require()` 函数来引入。在 12 版本之后，就可以使用 ES6 的 `import` 语法来引入。但需要在 `package.json` 文件中设置 `"type": "module"`。如果这样设置不方便，还可以将 Node.js 脚本的后缀改为 `.mjs`。

我的 Node.js 版本是 16.14，所以采用 ES6 的 `import` 语法来引入。

首先，在组件工程的根目录下创建一个名为`scripts`的文件夹，并在其中创建一个名为`autoExport.mjs`的文件。

接着，在工程的`package.json`文件中的`scripts`部分添加以下内容：

```javascript 
"scripts": {
  "export": "node ./scripts/autoExport.mjs"
}

```


在 `autoExport.mjs` 文件中添加如下代码，引入 `fs-extra` 这个第三方 Node.js 包。

```javascript 
import fs from 'fs-extra';

```


## 实现晨会上的功能

要实现晨会上的功能非常简单，只需要利用 `fs-extra` 中 `readdir` 和 `writeFile` 这个两个方法就可以实现。

- `readdir`：读取目录下的文件名和文件夹名称。
- `writeFile`：往文件中写入内容。

```javascript 
import fs from 'fs-extra';

fs.readdir('./src/components')
  .then(res => {
    if (Array.isArray(res)) {
      let exportStr = '';
      res.forEach(item => {
        exportStr = `${exportStr}\n export { default as ${item} } from './components/${item}';`;
      });
      fs.writeFile('./src/index.export.ts', exportStr);
    }
  })
  .catch(
    err => console.error(err)
  );

```


当然以上的代码，太过理想化了，要增加对`components`文件夹中的文件和文件夹名称的检查。只有符合大驼峰命名规范且包含 `index.tsx` 文件的文件夹才会被添加到导出文件中。这样可以确保只有符合要求的组件会被导出，避免处理不符合要求的文件夹。

所以还要用 `fs-extra` 中 `lstatSync` 和 `existsSync` 这个两个方法来实现优化。

- `lstatSync`：用于获取文件或文件夹的状态信息，包括文件类型、大小、权限等，它会返回一个 `fs.Stats` 对象，可以通过这个对象获取文件或文件夹的各种属性。其对象的一个方法属性`isDirectory`，可以用于检查指定路径是否为一个文件夹。
- `existsSync`： 用于检查指定路径的文件或文件夹是否存在。它会返回一个布尔值，如果文件或文件夹存在则返回 `true`，否则返回 `false`。

```javascript 
import fs from 'fs-extra';

fs.readdir('./src/components')
  .then(files => {
    if (Array.isArray(files)) {
      let exportStr = '';
      files.forEach(item => {
        // 检查是否为文件夹且文件夹名称符合大驼峰命名规范且包含index.tsx文件
        if (
            fs.lstatSync(`./src/components/${item}`).isDirectory() &&
            /^[A-Z][a-zA-Z]*$/.test(item) &&
            fs.existsSync(`./src/components/${item}/index.tsx`)
          ) {
            exportStr = `${exportStr}\nexport { default as ${item} } from './components/${item}';`;
          }
      });

      fs.writeFile('./src/index.export.ts', exportStr);
  })
  .catch(err => console.error(err));

```
