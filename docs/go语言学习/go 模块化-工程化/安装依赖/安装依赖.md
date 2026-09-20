# 安装依赖

## 目录

- [1. 下载所有依赖到本地缓存](#1-下载所有依赖到本地缓存)
- [2. 安装依赖的可执行工具（如 CLI 工具）](#2-安装依赖的可执行工具如-CLI-工具)
- [3. 同步依赖声明（推荐）](#3-同步依赖声明推荐)
- [4. 完整工作流示例](#4-完整工作流示例)
- [常见问题](#常见问题)
  - [Q1：go mod download 和 go mod tidy 的区别？](#Q1go-mod-download和go-mod-tidy的区别)
  - [Q2：如何强制重新下载所有依赖？](#Q2如何强制重新下载所有依赖)
  - [Q3：依赖下载太慢怎么办？](#Q3依赖下载太慢怎么办)
- [总结](#总结)

在 Go 中，​**​没有直接安装 ****`go.mod`**** 中所有依赖的单独命令​**​，因为 Go 的依赖管理是自动化的，通常在执行 `go build`、`go test` 或 `go run` 时会**自动下载所需的依赖**。不过，你可以通过以下步骤确保所有依赖被正确安装和缓存：

### **1. 下载所有依赖到本地缓存**

运行以下命令会下载 `go.mod` 中声明的所有依赖（包括间接依赖）到本地模块缓存（`$GOPATH/pkg/mod`）：

```go 
go mod download
```


**作用**：

- ∙下载所有依赖的指定版本（但不安装二进制工具）。
- ∙适合在 Docker 构建或多机器环境中预加载依赖。

**验证缓存**：

```go 
go clean -modcache  # 清理缓存（慎用）
ls $(go env GOPATH)/pkg/mod  # 查看已下载的依赖
```


### **2. 安装依赖的可执行工具（如 CLI 工具）**

如果 `go.mod` 中的某些依赖是**可执行工具**（例如 `golangci-lint`、`swag` 等），你需要显式安装它们：

```go 
go install <工具模块路径>@latest
# 示例：安装 golangci-lint
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
```


**安装后，二进制文件会存放在 ****`$GOPATH/bin`**** 目录（需确保该目录在 ****`PATH`**** 环境变量中）**。

### **3. 同步依赖声明（推荐）**

在修改 `go.mod` 或代码后，运行以下命令确保依赖状态一致：

```go 
go mod tidy
```


**作用**：

- ∙添加代码中实际需要的依赖。
- ∙移除 `go.mod` 中未使用的依赖。
- ∙更新 `go.sum` 中的哈希校验。

### **4. 完整工作流示例**

假设你刚克隆一个新项目，需要安装所有依赖：

```markdown 
# 1. 进入项目目录
cd your-project

# 2. 下载所有依赖到本地缓存
go mod download

# 3. 整理依赖（添加缺失的，删除未使用的）
go mod tidy

# 4. 安装项目所需的工具（如果有）
go install github.com/swaggo/swag/cmd/swag@latest

# 5. 编译或运行项目（会自动验证依赖）
go build
```


### **常见问题**

#### **Q1：****`go mod download`**** 和 ****`go mod tidy`**** 的区别？**

- ∙`go mod download`：仅下载依赖到缓存，不修改 `go.mod` 或 `go.sum`。
- ∙`go mod tidy`：分析代码，同步依赖声明（修改 `go.mod` 和 `go.sum`）。

#### **Q2：如何强制重新下载所有依赖？**

```go 
go clean -modcache  # 清理缓存
go mod download     # 重新下载
```


#### **Q3：依赖下载太慢怎么办？**

配置国内代理：

```go 
go env -w GOPROXY=https://goproxy.cn,direct
```


### **总结**

| **场景**​     | **命令**​                                   |
| ----------- | ----------------------------------------- |
| 下载所有依赖到本地缓存 | \`go mod download\`                       |
| 安装可执行工具     | \`go install <工具路径>@latest\`              |
| 同步依赖声明      | \`go mod tidy\`                           |
| 清理缓存并重新下载   | \`go clean -modcache && go mod download\` |

**关键点**：

- ∙Go 的依赖是**按需自动下载**的（通过 `go build`/`go test` 等触发）。
- ∙`go mod download` 适合预下载依赖（如 Docker 构建优化）。
- ∙始终在项目根目录运行这些命令！
