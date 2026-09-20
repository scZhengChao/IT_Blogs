# @babel/core

**@babel/core 包基于前面的包完成整个编译流程，从源码到目标代码，生成 sourcemap**，其语法形式如下：

```typescript 
// → 同步方法
transformSync(code, options); // => { code, map, ast }
transformFileSync(filename, options); // => { code, map, ast }
transformFromAstSync(parsedAst, sourceCode, options); // => { code, map, ast }
// → 异步方法
transformAsync('code();', options).then((result) => {});
transformFileAsync('filename.js', options).then((result) => {});
transformFromAstAsync(parsedAst, sourceCode, options).then((result) => {});

```
