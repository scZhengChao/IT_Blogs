# 自动化API文档

[ JSDoc 入门 | JSDoc 中文文档 | JSDoc 中文网 JSDoc 3 是一个用于 JavaScript 的 API 文档生成器，类似于 Javadoc 或 phpDocumentor，可以将文档注释直接添加到源代码中，JSDoc 工具将扫描您的源代码并为您生成一个 HTML 文档网站。 https://www.jsdoc.com.cn/](https://www.jsdoc.com.cn/ " JSDoc 入门 | JSDoc 中文文档 | JSDoc 中文网 JSDoc 3 是一个用于 JavaScript 的 API 文档生成器，类似于 Javadoc 或 phpDocumentor，可以将文档注释直接添加到源代码中，JSDoc 工具将扫描您的源代码并为您生成一个 HTML 文档网站。 https://www.jsdoc.com.cn/")

私以为一个好的 **JS** 插件决不能没有一份文档，如果别人使用你的插件，他不可能去查看源码才知道这个插件有哪些方法，是做什么的，要传哪些参数等。这里我们使用 **JSDoc** 来创建 **API文档**，它使用简单，只需要在代码中编写规范的**注释**，即能根据注释自动生成文档，一举多得，非常优雅！

```typescript 
npm install --save-dev jsdoc open
```


修改 **package.json**，增加一条脚本命令：

```typescript 
.......
"scripts": {
    ......
    "doc": "jsdoc dist/main.es.js && node server.js"
},
```


根目录下创建文件 server.js：

```typescript 
var open = require('open');
open(`out/index.html`); // 这是apidoc默认生成的路径，这里只是为了自动打开网页
```


好了，现在可以使用 `npm run doc` 命令来生成文档了，依然是举个栗子🌰，我们在**src**目录下添加一个文件 `ArrayDelSome.js`：

```typescript 
/**
 *
 * @desc 对象数组去重
 * @param {Array} arr
 * @param {String} 对象中相同的关键字(如id)
 * @return {Array} 返回新数组，eg: ArrayDelSome([{id: 1},{id: 2},{id: 1}], 'id') -> 返回: [{id: 1},{id: 2}]
 */
function ArrayDelSome(arr, key) {
  const map = new Map()
  return arr.filter((x) => !map.has(x[key]) && map.set(x[key], true))
}

export default ArrayDelSome
```


> 本例只演示最基础的用法，**JSDoc**有许多类型注释大家可以自行搜索学习下，不过本例最基本的这几个注释依旧是够用的。

运行 `npm run doc`，将会打开一个网页，可以查看我们刚写的工具函数：

![](image_xPj8Fye4Pd.png)

> 注意在生成文当前需要先进行过 **rollup** 的打包，且不能开启去注释之类的插件，因为上面的例子实际是对 `dist/` 目录下的最终文件进行文档编译的。
