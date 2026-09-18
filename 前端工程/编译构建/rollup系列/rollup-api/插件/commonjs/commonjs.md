# commonjs

`rollup.js` 编译源码中的模块引用默认只支持 ES6+的模块方式 `import/export`。然而大量的 `npm` 模块是基于 `CommonJS` 模块方式，这就导致了大量 `npm` 模块不能直接编译使用。

需要添加 @rollup/plugin-commonjs 插件来支持基于 CommonJS 模块方式 npm 包。

> 安装： yarn add @rollup/plugin-commonjs -D

```typescript 
import commonjs from "@rollup/plugin-commonjs";

export default {
  plugins: [commonjs()],
};
```


更新 src/foo.js：

```typescript 
module.exports = {
  text: "hello world!",
};
```
