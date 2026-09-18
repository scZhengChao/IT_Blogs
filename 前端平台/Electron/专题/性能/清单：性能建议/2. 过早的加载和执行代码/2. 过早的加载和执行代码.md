# 2. 过早的加载和执行代码

## 目录

- [为什么？](#为什么)
- [怎么做？](#怎么做)

如果你有非常繁重的初始化操作，**请考虑推迟进行**。 程序启动立刻查看应用执行的全部工作。 考虑按照用户操作的顺序将它们错开执行，而不是立刻执行所有的操作。

在传统的Node.js开发中，我们习惯将所有的`require()`语句放在代码顶部。 如果你目前正在使用相同的策略\_and\_并且使用你不需要立即加载的大型模块编写你的 Electron 应用程序，使用相同的策略并推迟到更适当的时机加载。

#### 为什么？

**加载模块是令人吃惊的繁重的操作，尤其是在Windows上。 当你的应用开始，不应该让用户等待当时不需要的操作。**

这似乎是显而易见的， 但许多应用程序在程序启动后可能会马上完成大量的 工作 -\*\* 如检查更新，正在下载稍后流程中使用的内容，或执行大型的磁盘I/O 操作。\*\*

让我们把Visual Studio Code作为一个例子。 当你打开一个文件，*它会立刻展示没有高亮任何代码的内容，优先实现和文本交互的功能。 一旦它完成了这项工作，它将继续让代码高亮。*

#### 怎么做？

让我们考虑一个示例，并假定您的应用程序正在以架空的`.foo`形式解析文件 。 为了做到这一点，它依赖同样架空的`foo-parserver` 模块。 **在传统的 Node.js 开发中，你可以写代码热加载依赖：**

```javascript 
const fs = require('node:fs')
const fooParser = require('foo-parser')

class Parser {
  constructor () {
    this.files = fs.readdirSync('.')
  }

  getParsedFiles () {
    return fooParser.parse(this.files)
  }
}

const parser = new Parser()

module.exports = { parser }
```


在上面的例子中，我们做了很多工作，一旦文件加载，我们就会立即执行。 我们需要立即获取解析的文件吗？ 或许我们可以晚一点再做这件事，当`getParsedFiles()` 真正的执行到的时候？

```javascript 
// "fs" is likely already being loaded, so the `require()` call is cheap
const fs = require('node:fs')

class Parser {
  async getFiles () {
    // Touch the disk as soon as `getFiles` is called, not sooner.
    // 此外，通过使用异步方法
    // 确保我们不会阻塞其他操作
    this.files = this.files || await fs.promises.readdir('.')

    return this.files
  }

  async getParsedFiles () {
    // 我们假设 foo-parser 是一个庞大且耗费资源的模块
    // 因此将这个工作推迟到我们真正需要解析文件时再进行
    // 由于require()带有模块缓存
    // require()调用只会有一次开销
    // 后续对getParsedFiles()的调用将会更快
    const fooParser = require('foo-parser')
    const files = await this.getFiles()

    return fooParser.parse(files)
  }
}

// 现在此操作的开销比我们之前的示例要低得多
const parser = new Parser()

module.exports = { parser }
```


**简而言之，只有当需要的时候才分配资源，而不是在你的应用启动时分配所有。**
