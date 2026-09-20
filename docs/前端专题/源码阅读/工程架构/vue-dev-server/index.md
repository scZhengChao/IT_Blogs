# vue-dev-server

## 目录

- [对 .vue 结尾的文件进行处理](#对-vue-结尾的文件进行处理)
  - [readSource 读取文件资源](#readSource-读取文件资源)
- [对 .js 结尾的文件进行处理](#对-js-结尾的文件进行处理)
  - [transformModuleImports 转换 import 引入](#transformModuleImports-转换-import-引入)
- [对 /\_\_modules/ 开头的文件进行处理](#对-__modules-开头的文件进行处理)
  - [loadPkg 加载包（这里只支持Vue文件）](#loadPkg-加载包这里只支持Vue文件)
- [总结](#总结)

[https://github1s.com/vuejs/vue-dev-server/blob/HEAD/middleware.js](https://github1s.com/vuejs/vue-dev-server/blob/HEAD/middleware.js "https://github1s.com/vuejs/vue-dev-server/blob/HEAD/middleware.js")

[ 尤雨溪几年前开发的“玩具 vite”，才100多行代码，却十分有助于理解 vite 原理 - 掘金 1. 学会 vite 简单原理 2. 学会使用 VSCode 调试源码 3. 学会如何编译 Vue 单文件组件 4. 学会如何使用 recast 生成 ast 转换文件 5. 如何加载包文件等 https://juejin.cn/post/7021306258057592862](https://juejin.cn/post/7021306258057592862 " 尤雨溪几年前开发的“玩具 vite”，才100多行代码，却十分有助于理解 vite 原理 - 掘金 1. 学会 vite 简单原理 2. 学会使用 VSCode 调试源码 3. 学会如何编译 Vue 单文件组件 4. 学会如何使用 recast 生成 ast 转换文件 5. 如何加载包文件等 https://juejin.cn/post/7021306258057592862")

我们可以找到`vue-dev-server/middleware.js`，查看这个中间件函数的概览。

```typescript 
// vue-dev-server/middleware.js

const vueMiddleware = (options = defaultOptions) => {
  // 省略
  return async (req, res, next) => {
    // 省略
    // 对 .vue 结尾的文件进行处理
    if (req.path.endsWith('.vue')) {
    // 对 .js 结尾的文件进行处理
    } else if (req.path.endsWith('.js')) {
    // 对 /__modules/ 开头的文件进行处理
    } else if (req.path.startsWith('/__modules/')) {
    } else {
      next()
    }
  }
}
exports.vueMiddleware = vueMiddleware
```


`vueMiddleware` 最终返回一个函数。这个函数里主要做了四件事：

- 对 `.vue` 结尾的文件进行处理
- 对 `.js` 结尾的文件进行处理
- 对 `/__modules/` 开头的文件进行处理

如果不是以上三种情况，执行 `next` 方法，把控制权交给下一个中间件

### 对 .vue 结尾的文件进行处理

```typescript 
if (req.path.endsWith('.vue')) {
  const key = parseUrl(req).pathname
  let out = await tryCache(key)

  if (!out) {
    // Bundle Single-File Component
    const result = await bundleSFC(req)
    out = result
    cacheData(key, out, result.updateTime)
  }

  send(res, out.code, 'application/javascript')
}
```


bundleSFC 编译单文件组件

这个函数，根据 [@vue/component-compiler](https://link.juejin.cn/?target=https://github.com/vuejs/vue-component-compiler "@vue/component-compiler") 转换单文件组件，最终返回浏览器能够识别的文件。

```typescript 
const vueCompiler = require('@vue/component-compiler')
async function bundleSFC (req) {
  const { filepath, source, updateTime } = await readSource(req)
  const descriptorResult = compiler.compileToDescriptor(filepath, source)
  const assembledResult = vueCompiler.assemble(compiler, filepath, {
    ...descriptorResult,
    script: injectSourceMapToScript(descriptorResult.script),
    styles: injectSourceMapsToStyles(descriptorResult.styles)
  })
  return { ...assembledResult, updateTime }
}
```


#### readSource 读取文件资源

这个函数主要作用：根据请求获取文件资源。返回文件路径 `filepath`、资源 `source`、和更新时间 `updateTime`。

```typescript 
const path = require('path')
const fs = require('fs')
const readFile = require('util').promisify(fs.readFile)
const stat = require('util').promisify(fs.stat)
const parseUrl = require('parseurl')
const root = process.cwd()

async function readSource(req) {
  const { pathname } = parseUrl(req)
  const filepath = path.resolve(root, pathname.replace(/^\//, ''))
  return {
    filepath,
    source: await readFile(filepath, 'utf-8'),
    updateTime: (await stat(filepath)).mtime.getTime()
  }
}

exports.readSource = readSource
```


### 对 .js 结尾的文件进行处理

```typescript 
if (req.path.endsWith('.js')) {
  const key = parseUrl(req).pathname
  let out = await tryCache(key)

  if (!out) {
    // transform import statements
    // 转换 import 语句 
    // import Vue from 'vue'
    // => import Vue from "/__modules/vue"
    const result = await readSource(req)
    out = transformModuleImports(result.source)
    cacheData(key, out, result.updateTime)
  }

  send(res, out, 'application/javascript')
}
```


针对 `vue-dev-server/test/main.js` 转换

```typescript 
import Vue from 'vue'
import App from './test.vue'

new Vue({
  render: h => h(App)
}).$mount('#app')

```


```typescript 
import Vue from "/__modules/vue"
import App from './test.vue'

new Vue({
  render: h => h(App)
}).$mount('#app')

```


#### transformModuleImports 转换 import 引入

[recast](https://link.juejin.cn/?target=https://github.com/benjamn/recast "recast")

[validate-npm-package-name](https://link.juejin.cn/?target=https://github.com/npm/validate-npm-package-name "validate-npm-package-name")

```typescript 
const recast = require('recast')
const isPkg = require('validate-npm-package-name')

function transformModuleImports(code) {
  const ast = recast.parse(code)
  recast.types.visit(ast, {
    visitImportDeclaration(path) {
      const source = path.node.source.value
      // ast visitor钩子；找到import 导入声明 并且不是./ 开头的npm 包
      if (!/^\.\/?/.test(source) && isPkg(source)) {
        path.node.source = recast.types.builders.literal(`/__modules/${source}`)
      }
      this.traverse(path)
    }
  })
  return recast.print(ast).code
}

exports.transformModuleImports = transformModuleImports

```


也就是针对 `npm` 包转换。 这里就是 `"/__modules/vue"`

```typescript 
import Vue from 'vue' => import Vue from "/__modules/vue"
```


### 对 /\_\_modules/ 开头的文件进行处理

```typescript 
import Vue from "/__modules/vue"
```


这段代码最终返回的是读取路径 `vue-dev-server/node_modules/vue/dist/vue.esm.browser.js` 下的文件。

```typescript 
if (req.path.startsWith('/__modules/')) {
  // 
  const key = parseUrl(req).pathname
  const pkg = req.path.replace(/^\/__modules\//, '')

  let out = await tryCache(key, false) // Do not outdate modules
  if (!out) {
    out = (await loadPkg(pkg)).toString()
    cacheData(key, out, false) // Do not outdate modules
  }

  send(res, out, 'application/javascript')
}
```


#### loadPkg 加载包（这里只支持Vue文件）

目前只支持 `Vue` 文件，也就是读取路径 `vue-dev-server/node_modules/vue/dist/vue.esm.browser.js` 下的文件返回。

```typescript 
// vue-dev-server/loadPkg.js
const fs = require('fs')
const path = require('path')
const readFile = require('util').promisify(fs.readFile)

async function loadPkg(pkg) {
  if (pkg === 'vue') {
    // 路径
    // vue-dev-server/node_modules/vue/dist
    const dir = path.dirname(require.resolve('vue'))
    const filepath = path.join(dir, 'vue.esm.browser.js')
    return readFile(filepath)
  }
  else {
    // TODO
    // check if the package has a browser es module that can be used
    // otherwise bundle it with rollup on the fly?
    throw new Error('npm imports support are not ready yet.')
  }
}

exports.loadPkg = loadPkg
```


## 总结

![](./assets/image/image_8IR-pHZ5R7.png)

浏览器支持原生 `type=module` 模块请求加载。`vue-dev-server` 对其拦截处理，返回浏览器支持内容，因为无需打包构建，所以速度很快。

```typescript 
<script type="module">
    import './main.js'
</script>

```
