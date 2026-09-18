# 什么是 references

`tsconfig.json` 文件中的 `references` 字段来**管理项目的依赖关系和构建顺序**。`references` 字段允许在一个 `Monorepo` 或**多包项目中指定包之间的依赖关系，以确保正确的构建顺序和类型检查。**

同时它还有这些功能：

1. 增量编译：当使用项目引用时，TypeScript 编译器可以只编译那些自上次编译以来发生变化的项目。
2. 编辑器性能：使用项目引用可以改善编辑器的性能，因为编辑器可以仅加载需要的项目，从而减少内存占用并提高响应速度。
3. 支持引用目标的类型检查：通过 `Fork TS Checker` 等方式执行 ts 类型检查时，能同时检查到引用的项目的类型问题。

配置示例：

```json 
{
  "compilerOptions": { 
    "target": "es6",
    "module": "commonjs",
    "outDir": "dist",
    // alias
    "paths": {
      "@/*": ["src/*"]
    },
  },
  "references": [
    { "path": "./packages/package-a" },
    { "path": "./packages/package-b" }
  ]
}

```
