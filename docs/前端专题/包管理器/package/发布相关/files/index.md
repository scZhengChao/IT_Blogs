# files

## 目录

- [基本用法](#基本用法)
- [注意事项](#注意事项)

**声明有哪些文件，是需要作为依赖项，保留下来。**
不然，执行`npm publish`进行发布时，这些文件是会自动屏蔽上传的。
同理，也可以使用`.npmignore`文件进行配置。

```json 
"files": [
    "dist/*.js",
    "lib"
]

```


如果没有files字段声明，则这些文件，都不会保留，npm包将不能使用。

详细可见：[.npmignore](../../../npm/配置/-npmignore/index.md ".npmignore")

在 `package.json`中，`files`字段用于指定哪些文件或目录应该被包含在发布的 npm 包中。如果你只想发布特定的文件或目录，可以在 `package.json`中配置 `files`字段。

### 基本用法

```json 
{
  "name": "your-package",
  "version": "1.0.0",
  "files": [
    "dist",
    "lib",
    "index.js",
    "README.md"
  ]
}
```


这样配置后，`npm publish`时只会包含 `dist`、`lib`、`index.js`和 `README.md`，其他文件会被忽略。

### 注意事项

1. **默认包含的文件**（即使不在 `files`中也会被发布）：
   - `package.json`
   - `README.md`、`CHANGELOG.md`、`LICENSE`等文档文件
   - `main`字段指定的入口文件（如 `index.js`）
2. **排除文件**：
   - 可以使用 `.npmignore`文件来排除特定文件（类似于 `.gitignore`）
   - 如果同时存在 `.npmignore`和 `files`，`.npmignore`的规则优先级更高

&#x20; 3.**常用模式​**​：

```json 
"files": [
  "dist/**/*",  // 包含 dist 目录下的所有文件
  "src/*.js",   // 包含 src 目录下的所有 .js 文件
  "types/**/*.d.ts"  // 包含 types 目录下的所有 .d.ts 文件
]
```


1. **最佳实践**：
   - 通常只发布编译后的代码（如 `dist`或 `lib`目录）
   - 不发布测试文件、配置文件或源代码（除非是源码包）
