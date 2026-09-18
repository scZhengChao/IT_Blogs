# go.sum

## 目录

- [go.sum vs package-lock.json/yarn.lock](#gosum-vs-package-lockjsonyarnlock)
  - [共同点：](#共同点)
  - [差异对比：](#差异对比)
  - [示例 go.sum：](#示例gosum)

### **`go.sum`**\*\* vs ****`package-lock.json`****/`yarn.lock`\*\*

#### **共同点**：

- ∙都是 **锁文件**，用于确保依赖的确定性（避免不同环境安装不同版本）。
- ∙记录依赖包的完整哈希值，验证完整性。

#### **差异对比**：

| 特性          | Go 的 \`go.sum\`                      | npm 的 \`package-lock.json\` |
| ----------- | ------------------------------------ | --------------------------- |
| **文件内容**​   | 每个依赖包的哈希校验和（多行记录）                    | JSON 格式的依赖树 + 精确版本          |
| **生成逻辑**​   | 记录所有直接/间接依赖的哈希                       | 仅锁定当前安装的版本                  |
| **是否必须提交**​ | \*\*必须提交\*\*（否则无法验证依赖完整性）            | 推荐提交（但某些项目可选）               |
| **更新频率**​   | 每次 \`go get\` 或 \`go mod tidy\` 可能更新 | 仅 \`npm install\` 或显式更新时修改  |

#### **示例 `go.sum`**：

```go 
github.com/gin-gonic/gin v1.9.1 h1:4+fr/el88TOO3ewCnQDi8pk5gWcgh1Ct3tW06dWoXs=
github.com/gin-gonic/gin v1.9.1/go.mod h1:W7tXQiTsAiJ3G+6UbQ6+IiN3z6vXg+Q4DINk5Qk1lO8=
```
