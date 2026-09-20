# 初始化

## 目录

- [1. 基础用法（自动生成go.mod）](#1-基础用法自动生成gomod)
- [. 关键说明](#-关键说明)
- [二、自动生成 / 更新go.sum](#二自动生成--更新gosum)
  - [1. 安装依赖时自动生成](#1-安装依赖时自动生成)
  - [2. 其他自动触发go.sum 的场景](#2-其他自动触发gosum-的场景)
- [三、完整实操示例（从 0 到 1 自动生成两个文件）](#三完整实操示例从-0-到-1-自动生成两个文件)
- [四、补充：go.sum 的作用与注意事项](#四补充gosum-的作用与注意事项)

`go.mod`是 Go 模块的核心配置文件，初始化它的核心命令是`go mod init`，这是**手动触发但全自动完成**的初始化方式（Go 没有 “完全无命令自动生成” 的逻辑，因为需要指定模块名）。

#### 1. 基础用法（自动生成`go.mod`）

```markdown 
# 进入你的项目目录（先cd到代码所在文件夹）
cd /path/to/your/project

# 初始化go.mod，替换为你的模块名（通常是仓库地址/自定义名称）
go mod init example.com/your-project-name
```


执行后，项目目录会**自动生成**一个`go.mod` 文件，内容如下（自动填充模块名和 Go 版本）：

```go 
module example.com/your-project-name

go 1.21  // 自动匹配你当前安装的Go版本
```


#### . 关键说明

- 模块名可以是任意字符串（比如`myapp`），**但规范写法是「仓库地址 + 项目名」**（如`github.com/yourname/yourproject`）；
- 这一步是 “半自动”（需要敲命令），但 Go 会**全自动**完成`go.mod` 的创建和基础内容填充，无需手动编辑。

### 二、自动生成 / 更新`go.sum`

`go.sum`是依赖的校验和文件，**不会手动创建**，Go 会在你执行依赖相关命令时**自动生成 / 更新**它，核心触发场景有这些：

#### 1. 安装依赖时自动生成

当你的代码引入了外部依赖（比如`fmt`之外的包），执行以下命令会自动下载依赖，并生成`go.sum`：

```markdown 
# 下载并安装项目依赖（自动生成go.sum）
go mod tidy
```


`go mod tidy` 是最常用的命令：

- 分析代码中实际用到的依赖；
- **自动下载缺失的依赖，删除未使用的依赖**；
- **自动生成 / 更新**\*\*`go.sum`，记录所有依赖的版本和校验和。\*\*​

#### 2. 其他自动触发`go.sum` 的场景

除了`go mod tidy`，这些命令也会自动维护`go.sum`：

```go 
go build    # 编译项目时，自动下载依赖并更新go.sum
go run      # 运行项目时，自动下载依赖并更新go.sum
go get      # 手动添加依赖时（如 go get github.com/gin-gonic/gin），自动更新go.sum
go test     # 测试项目时，自动下载依赖并更新go.sum
```


### 三、完整实操示例（从 0 到 1 自动生成两个文件）

```markdown 
# 1. 创建项目目录并进入
mkdir my-go-project && cd my-go-project

# 2. 新建一个简单的go文件（引入外部依赖）
cat > main.go << EOF
package main

import (
    "fmt"
    "github.com/gin-gonic/gin"  // 外部依赖
)

func main() {
    r := gin.Default()
    r.GET("/", func(c *gin.Context) {
        c.String(200, "Hello Go Mod!")
    })
    fmt.Println("Server start...")
}
EOF

# 3. 初始化go.mod（自动生成）
go mod init my-go-project

# 4. 自动下载依赖并生成go.sum
go mod tidy
```


执行完后，你的项目目录会出现：

- `go.mod`：记录模块名、Go 版本、依赖列表；
- `go.sum`：记录所有依赖的校验和（自动生成，无需修改）。

### 四、补充：`go.sum` 的作用与注意事项

1. `go.sum` 是安全保障：确保你下载的依赖和作者发布的一致，防止被篡改；
2. 不要手动编辑`go.sum`：由 Go 自动维护，手动修改可能导致依赖校验失败；
3. 提交到版本库：`go.mod`和`go.sum` 都要提交到 Git 等版本库，确保协作开发时依赖一致。
