# allowSyntheticDefaultImports&#x20;

## 目录

- [作用](#作用)
- [与esModuleInterop的关系](#与esModuleInterop的关系)
- [注意事项](#注意事项)

`allowSyntheticDefaultImports`是 TypeScript 的类型检查选项，它影响编译器如何处理默认导入（default imports）的类型检查。

## 作用

当设置为`true`时：

1. **允许使用**\*\*`import x from 'module'`****语法**，**即使模块没有显式定义****`e`\*\*`xport default`
2. **不会影响生成的 JavaScript 代码**，只影响类型检查
3. **使类型系统更宽松**，允许假设模块可能有默认导出

## 与`esModuleInterop`的关系

- `esModuleInterop`: 控制运行时行为，会生成额外的代码来确保 CommonJS 模块能正确作为 ES 模块导入
- `allowSyntheticDefaultImports`: 仅控制类型检查，不改变输出代码

当`esModuleInterop`为`true`时，`allowSyntheticDefaultImports`会自动被设为`true`。

## 注意事项

1. **单独使用时有风险**：如果运行时环境不支持合成默认导入，可能导致运行时错误
2. **与 Babel 配合**：如果使用 Babel 转译代码，Babel 会自动处理默认导入，此时可以安全使用此选项
3. **现代项目推荐**：通常与`esModuleInterop: true`一起使用

这个选项主要解决类型检查问题，让 TypeScript 允许你使用更简洁的 ES 模块导入语法，即使底层模块系统可能不完全支持。
