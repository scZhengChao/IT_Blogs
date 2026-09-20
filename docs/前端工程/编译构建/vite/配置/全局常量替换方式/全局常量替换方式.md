# 全局常量替换方式

## 目录

- [define](#define)

## define

- **类型：** `Record<string, string>`

**定义全局常量替换方式**。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。

- 从 `2.0.0-beta.70` 开始，`string `值会以原始表达式形式使用，所以如果定义了一个字符串常量，它需要被显式地打引号。（例如使用 `JSON.stringify`）
- 为了与 [esbuild 的行为](https://esbuild.github.io/api/#define "esbuild 的行为")保持一致，表达式必须为一个 JSON 对象（null、boolean、number、string、数组或对象），亦或是一个单独的标识符。
- 替换只会在匹配到周围不是其他字母、数字、`_` 或 `$` 时执行。

[https://cn.vitejs.dev/config/shared-options.html#define](https://cn.vitejs.dev/config/shared-options.html#define "https://cn.vitejs.dev/config/shared-options.html#define")

```javascript 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __TRUE__: 'true',
  },
})


//d.ts
declare const __static:String
declare const __userApi:String

```
