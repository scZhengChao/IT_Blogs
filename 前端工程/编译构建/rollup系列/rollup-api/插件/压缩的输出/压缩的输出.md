# 压缩的输出

> npm install --save-dev @rollup/plugin-terser

编辑你的 `rollup.config.mjs` 文件，添加另一个最小化压缩的输出。我们选择 `iife` 作为格式。该格式会将代码封装起来，以便可以通过浏览器中的 `script` 标签使用，同时避免与其他代码产生不必要的交互。由于设置了一个导出，因此我们需要提供一个全局变量的名称，该变量将由我们的产物创建，以便其他代码可以通过此变量访问我们的导出。

```javascript 
// rollup.config.mjs
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

// ---cut-start---
/** @type {import('rollup').RollupOptions} */
// ---cut-end---
export default {
  input: 'src/main.js',
  output: [
    {
      file: 'bundle.js',
      format: 'cjs'
    },
    {
      file: 'bundle.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()]
    }
  ],
  plugins: [json()]
};
```
