# go.mod

## 目录

- [共同点：](#共同点)
- [差异对比：](#差异对比)
- [示例 go.mod：](#示例gomod)

**`go.mod`**\*\* vs \*\*​**`package.json`**

#### **共同点**：

- 都是 **模块/项目依赖的声明文件**，定义了项目名称、依赖包及其版本范围。
- 支持语义化版本（SemVer）规范。

#### **差异对比**：

| 特性          | Go 的 \`go.mod\`                                           | npm 的 \`package.json\`           |
| ----------- | --------------------------------------------------------- | -------------------------------- |
| **文件格式**​   | 简单的文本格式（类似 \`go\` 语法）                                     | JSON 格式                          |
| **模块名称**​   | 首行声明 \`module 模块名\`（如 \`module github.com/your/project\`） | \`"name": "your-project"\`       |
| **依赖版本声明**​ | 直接指定版本（如 \`v1.2.3\`）或分支/commit                            | 支持版本范围（如 \`^1.2.3\`、\`\~1.2.0\`） |
| **间接依赖**​   | 通过 \`// indirect\` 注释标记                                   | 自动嵌套在 \`node\_modules\` 中        |
| **版本管理方式**​ | 最小版本选择（MVS）算法                                             | 默认安装最新兼容版本（可锁定）                  |
| **生成方式**​   | \`go mod init\` + \`go get\`                              | \`npm init\` + \`npm install\`   |

#### **示例 `go.mod`**：

```go 
module github.com/your/project

go 1.20  // 声明 Go 版本

require (
    github.com/gin-gonic/gin v1.9.1
    github.com/lib/pq v1.10.9 // indirect
)
```


[go.mod 中的 go 的版本](<./go.mod 中的 go 的版本/index.md> "go.mod 中的 go 的版本")
