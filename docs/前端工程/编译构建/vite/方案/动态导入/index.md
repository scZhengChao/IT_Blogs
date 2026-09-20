# 动态导入

## 目录

- [动态导入](#动态导入)
  - [Glob 导入形式](#Glob-导入形式)
  - [多个匹配模式](#多个匹配模式)
  - [反面匹配模式](#反面匹配模式)
    - [具名导入](#具名导入)
    - [自定义查询](#自定义查询)
  - [Glob 导入注意事项](#Glob-导入注意事项)

## 动态导入

和 [glob 导入](https://cn.vitejs.dev/guide/features.html#glob-import "glob 导入") 类似，Vite 也支持带变量的动态导入。

```typescript 
const module = await import(./dir/${file}.js)
```


注意变量仅代表一层深的文件名。如果 `file` 是 `foo/bar`，导入将会失败。对于更进阶的使用详情，你可以使用 [glob 导入](https://cn.vitejs.dev/guide/features.html#glob-import "glob 导入") 功能。

**类似require.context**

Vite 支持使用特殊的 `import.meta.glob` 函数从文件系统导入多个模块：

```typescript 
const modules = import.meta.glob('./dir/*.js')

```


以上将会被转译为下面的样子：

```typescript 
// vite 生成的代码
const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
  './dir/bar.js': () => import('./dir/bar.js')
}

```


你可以遍历 `modules` 对象的 key 值来访问相应的模块：

```typescript 
for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod)
  })
}
```


匹配到的文件**默认是懒加载的**，通过动态导入实现，**并会在构建时分离为独立的 chunk**。如果你倾向于**直接引入所有的模块（**例如依赖于这些模块中的副作用首先被应用），你可以传入 **`{ eager: true }`**** 作为**第二个参数：

```typescript 
const modules = import.meta.glob('./dir/*.js', { eager: true })

```


以上会被转译为下面的样子：

```typescript 
// vite 生成的代码
import * as __glob__0_0 from './dir/foo.js'
import * as __glob__0_1 from './dir/bar.js'
const modules = {
  './dir/foo.js': __glob__0_0,
  './dir/bar.js': __glob__0_1
}

```


### Glob 导入形式

`import.meta.glob` **都支持以字符串形式导入文件**，类似于 [以字符串形式导入资源](https://vitejs.dev/guide/assets.html#importing-asset-as-string "以字符串形式导入资源")。在这里，我们使用了 [Import Reflection](https://github.com/tc39/proposal-import-reflection "Import Reflection") 语法对导入进行断言：

```typescript 
const modules = import.meta.glob('./dir/*.js', { as: 'raw' })

```


上面的代码会被转换为下面这样：

```typescript 
// code produced by vite（代码由 vite 输出）
const modules = {
  './dir/foo.js': 'export default "foo"\n',
  './dir/bar.js': 'export default "bar"\n'
}

```


`{ as: 'url' }` 还支持将资源作为 URL 加载。

### 多个匹配模式

第一个参数可以是一个 glob 数组，例如：

```typescript 
const modules = import.meta.glob(['./dir/*.js', './another/*.js'])

```


### 反面匹配模式

同样也支持反面 glob 匹配模式（以 `!` 作为前缀）。若要忽略结果中的一些文件，你可以添加“排除匹配模式”作为第一个参数：

```typescript 
const modules = import.meta.glob(['./dir/*.js', '!**/bar.js'])

// vite 生成的代码
const modules = {
  './dir/foo.js': () => import('./dir/foo.js')
}


```


#### 具名导入

也可能你只想要导入模块中的部分内容，那么可以利用 `import` 选项。

```typescript 
const modules = import.meta.glob('./dir/*.js', { import: 'setup' })

```


```typescript 
// vite 生成的代码
const modules = {
  './dir/foo.js': () => import('./dir/foo.js').then((m) => m.setup),
  './dir/bar.js': () => import('./dir/bar.js').then((m) => m.setup)
}

```


当与 eager 一同存在时，甚至可以对这些模块进行 tree-shaking。

```typescript 
const modules = import.meta.glob('./dir/*.js', { import: 'setup', eager: true })

```


```typescript 
// vite 生成的代码
import { setup as __glob__0_0 } from './dir/foo.js'
import { setup as __glob__0_1 } from './dir/bar.js'
const modules = {
  './dir/foo.js': __glob__0_0,
  './dir/bar.js': __glob__0_1
}

```


设置 `import` 为 `default` 可以加载默认导出。

```typescript 
const modules = import.meta.glob('./dir/*.js', {
  import: 'default',
  eager: true
})

```


```typescript 
// vite 生成的代码
import __glob__0_0 from './dir/foo.js'
import __glob__0_1 from './dir/bar.js'
const modules = {
  './dir/foo.js': __glob__0_0,
  './dir/bar.js': __glob__0_1
}

```


#### 自定义查询

你也可以使用 `query` 选项来提供对导入的自定义查询，以供其他插件使用。

```typescript 
const modules = import.meta.glob('./dir/*.js', {
  query: { foo: 'bar', bar: true }
})

```


```typescript 
// vite 生成的代码
const modules = {
  './dir/foo.js': () =>
    import('./dir/foo.js?foo=bar&bar=true').then((m) => m.setup),
  './dir/bar.js': () =>
    import('./dir/bar.js?foo=bar&bar=true').then((m) => m.setup)
}


```


### Glob 导入注意事项

请注意：

- 这只是**一个 Vite 独有的功能而不是一个 Web 或 ES 标准**
- 该 Glob 模式会被当成导入标识符：必须是相对路径（以 `./` 开头）或绝对路径（以 `/` 开头，相对于项目根目录解析）或一个别名路径（请看 [resolve.alias](https://cn.vitejs.dev/config/shared-options.html#resolve-alias "resolve.alias")[ 选项](https://cn.vitejs.dev/config/shared-options.html#resolve-alias " 选项"))。
- Glob 匹配是使用 [fast-glob](https://github.com/mrmlnc/fast-glob "fast-glob") 来实现的 —— 阅读它的文档来查阅 [支持的 Glob 模式](https://github.com/mrmlnc/fast-glob#pattern-syntax "支持的 Glob 模式")。
- 你还需注意，所有 `import.meta.glob` 的参数都必须以字面量传入。你 **不 可以在其中使用变量或表达式。**
