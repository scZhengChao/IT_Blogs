# glob

## 目录

- [前端工程化之强大的glob语法](#前端工程化之强大的glob语法)
  - [基础语法](#基础语法)
    - [分隔符和片段](#分隔符和片段)
    - [单个星号](#单个星号)
    - [问号](#问号)
    - [中括号](#中括号)
    - [惊叹号](#惊叹号)
  - [扩展语法](#扩展语法)
    - [两个星号](#两个星号)
    - [大括号](#大括号)
    - [小括号](#小括号)

[ glob - npmGitDownloads the most correct and second fastest glob implementation in JavaScript. Latest version: 10.3.12, last published: a month ago. Start using glob in your project by running \`npm i glob\`. There are 31489 o https://www.npmjs.com/package/glob](https://www.npmjs.com/package/glob " glob - npmGitDownloads the most correct and second fastest glob implementation in JavaScript. Latest version: 10.3.12, last published: a month ago. Start using glob in your project by running `npm i glob`. There are 31489 o https://www.npmjs.com/package/glob")

glob 在webpack中对文件的路径处理非常之方便，比如当搭建多页面应用时就可以使用glob对页面需要打包文件的路径进行很好的处理。

```javascript 
// load using import
import { glob, globSync, globStream, globStreamSync, Glob } from 'glob'
// or using commonjs, that's fine, too
const {
  glob,
  globSync,
  globStream,
  globStreamSync,
  Glob,
} = require('glob')

// the main glob() and globSync() resolve/return array of filenames

// all js files, but don't look in node_modules
const jsfiles = await glob('**/*.js', { ignore: 'node_modules/**' })

// pass in a signal to cancel the glob walk
const stopAfter100ms = await glob('**/*.css', {
  signal: AbortSignal.timeout(100),
})

// multiple patterns supported as well
const images = await glob(['css/*.{png,jpeg}', 'public/*.{png,jpeg}'])

// but of course you can do that with the glob pattern also
// the sync function is the same, just returns a string[] instead
// of Promise<string[]>
const imagesAlt = globSync('{css,public}/*.{png,jpeg}')

// you can also stream them, this is a Minipass stream
const filesStream = globStream(['**/*.dat', 'logs/**/*.log'])

// construct a Glob object if you wanna do it that way, which
// allows for much faster walks if you have to look in the same
// folder multiple times.
const g = new Glob('**/foo', {})
// glob objects are async iterators, can also do globIterate() or
// g.iterate(), same deal
for await (const file of g) {
  console.log('found a foo file:', file)
}
// pass a glob as the glob options to reuse its settings and caches
const g2 = new Glob('**/bar', g)
// sync iteration works as well
for (const file of g2) {
  console.log('found a bar file:', file)
}

// you can also pass withFileTypes: true to get Path objects
// these are like a Dirent, but with some more added powers
// check out http://npm.im/path-scurry for more info on their API
const g3 = new Glob('**/baz/**', { withFileTypes: true })
g3.stream().on('data', path => {
  console.log(
    'got a path object',
    path.fullpath(),
    path.isDirectory(),
    path.readdirSync().map(e => e.name)
  )
})

// if you use stat:true and withFileTypes, you can sort results
// by things like modified time, filter by permission mode, etc.
// All Stats fields will be available in that case. Slightly
// slower, though.
// For example:
const results = await glob('**', { stat: true, withFileTypes: true })

const timeSortedFiles = results
  .sort((a, b) => a.mtimeMs - b.mtimeMs)
  .map(path => path.fullpath())

const groupReadableFiles = results
  .filter(path => path.mode & 0o040)
  .map(path => path.fullpath())

// custom ignores can be done like this, for example by saying
// you'll ignore all markdown files, and all folders named 'docs'
const customIgnoreResults = await glob('**', {
  ignore: {
    ignored: p => /\.md$/.test(p.name),
    childrenIgnored: p => p.isNamed('docs'),
  },
})

// another fun use case, only return files with the same name as
// their parent folder, plus either `.ts` or `.js`
const folderNamedModules = await glob('**/*.{ts,js}', {
  ignore: {
    ignored: p => {
      const pp = p.parent
      return !(p.isNamed(pp.name + '.ts') || p.isNamed(pp.name + '.js'))
    },
  },
})

// find all files edited in the last hour, to do this, we ignore
// all of them that are more than an hour old
const newFiles = await glob('**', {
  // need stat so we have mtime
  stat: true,
  // only want the files, not the dirs
  nodir: true,
  ignore: {
    ignored: p => {
      return new Date() - p.mtime > 60 * 60 * 1000
    },
    // could add similar childrenIgnored here as well, but
    // directory mtime is inconsistent across platforms, so
    // probably better not to, unless you know the system
    // tracks this reliably.
  },
})

```


# 前端工程化之强大的glob语法

glob 在正则出现之前就有了，主要用于匹配文件路径，例如大名鼎鼎的 [gulp](https://link.juejin.cn?target=https://gulpjs.com/ "gulp") 就使用了 glob 规则来匹配、查找并处理各种后缀的文件。在前端工程化的过程中，不可避免地会用 Node.js 来读取文件，例如想找到 `src` 目录下所有 `js` 和 `jsx` 文件，代码应该怎么写呢？首先安装依赖包：

```javascript 
yarn add glob

```


然后 3 行代码搞定：

```javascript 
const glob = require('glob')
const files = glob.sync('src/**/*.js{,x}')
console.log(files)

```


有没有感觉很强大呢？更重要的是 glob 语法在命令行就支持，不需要安装任何依赖，例如老板让你创建 `a1.js` 到 `a9.js`、`b1.js` 到 `b9.js` 这 18 个测试文件的话，怎么操作？一个个创建的话太傻了，glob 一句话就搞定：

```javascript 
$ touch {a,b}{1..9}.js
$ ls
a1.js a3.js a5.js a7.js a9.js b2.js b4.js b6.js b8.js
a2.js a4.js a6.js a8.js b1.js b3.js b5.js b7.js b9.js

```


更更更重要的是，glob 的语法非常简单，只要记住下面7个符号代表的含义就能掌握了：

- 基础语法：`/`、`*`、`?`、`[]`
- 拓展语法：`**`、`{}`、`()`

接下来就逐个解释一下：

## 基础语法

***

### 分隔符和片段

**概念**：分隔符是 `/`，通过 `split('/')` 得到的数组每一项是片段。

**示例**：

- `src/index.js` 有两个片段，分别是 `src` 和 `index.js`
- `src/**/*.js` 有三个片段，分别是 `src`、`**` 和 `*.js`

### 单个星号

**概念**：单个星号 `*` 用于匹配单个片段**中的零个或多个字符。**

**示例**：

- `src/*.js` 表示 `src` 目录下所有以 `js` 结尾的文件，但是不能匹配 `src` 子目录中的文件，例如 `src/login/login.js`
- `/home/*/.bashrc` 匹配所有用户的 .bashrc 文件

> **需要注意的是，****`*`**** 不能匹配分隔符 ****`/`****，也就是说不能跨片段匹配字符。**

### 问号

**概念**：问号 `?` 匹配单个片段**中的单个字符。**

**示例**：

- `test/?at.js` 匹配形如 `test/cat.js`、`test/bat.js` 等所有3个字符且后两位是 `at` 的 js 文件，但是不能匹配 `test/flat.js`
- `src/index.??` 匹配 `src` 目录下以 index 打头，后缀名是两个字符的文件，例如可以匹配 `src/index.js` 和 `src/index.md`，但不能匹配 `src/index.jsx`

### 中括号

**概念**：同样是匹配单个片段中的单个字符，但是字符集只能从括号内选择，如果字符集内有 `-`，表示范围。

**示例**：

- `test/[bc]at.js` 只能匹配 `test/bat.js` 和 `test/cat.js`
- `test/[c-f]at.js` 能匹配 `test/cat.js`、`test/dat.js`、`test/eat.js` 和 `test/fat.js`

### 惊叹号

**概念**：表示取反，即排除那些去掉惊叹号之后能够匹配到的文件。

**示例**

- `test/[!bc]at.js` 不能匹配 `test/bat.js` 和 `test/cat.js`，但是可以匹配 `test/fat.js`
- `!test/tmp/**'` 排除 `test/tmp` 目录下的所有目录和文件

## 扩展语法

基础语法非常简单好记，但是功能非常局限，为了丰富 glob 的功能，衍生了下面三种扩展语法：

### 两个星号

**概念**：两个星号 `**` 可以跨片段匹配零个或多个字符，也就是说 `**` 是递归匹配所有文件和目录的，**如果后面有分隔符，即 ****`**/`**** 的话，则表示只递归匹配所有目录（不含隐藏目录）。**

- `/var/log/**` 匹配 `/var/log` 目录下所有文件和文件夹，以及文件夹里面所有子文件和子文件夹
- `/var/log/**/*.log` 匹配 `/var/log` 及其子目录下的所有以 `.log` 结尾的文件
- `/home/*/.ssh/**/*.key` 匹配所有用户的 `.ssh` 目录及其子目录内的以 `.key` 结尾的文件

### 大括号

**概念**：匹配\*\*大括号内的所有模式，模式之间用逗号进行分隔，支持大括号嵌套，支持用 ****`..`**** 匹配连续的字符，\*\*即 `{start..end}` 语法。

**示例**：

- `a.{png,jp{,e}g}` 匹配 `a.png`、`a.jpg`、`a.jpeg`
- `{a..c}{1..2}` 匹配 `a1 a2 b1 b2 c1 c2`

> 注意：`{}` 与 `[]` 有一**个很重要的区别：如果匹配的文件不存在，****`[]`**** 会失去模式的功能，变成一个单纯的字符串，而 ****`{}`**** 依然可以展开。**

### 小括号

**概念**：**小括号必须跟在 ****`?`****、****`*`****、****`+`****、****`@`****、****`!`**** 后面使用，且小括号里面的内容是一组以 ****`|`**** 分隔符的模式集合**，例如：`abc|a?c|ac*`。

**示例**：

- `?(pattern|pattern|pattern)`：匹配0次或1次给定的模式
- `*(pattern|pattern|pattern)`：匹配0次或多次给定的模式
- `+(pattern|pattern|pattern)`：匹配1次或多次给定的模式
- `@(pattern|pattern|pattern)`：严格匹配给定的模式
- `!(pattern|pattern|pattern)`：匹配非给定的模式

[webpack 多页面应用自动打包配置](<webpack 多页面应用自动打包配置.md> "webpack 多页面应用自动打包配置")
