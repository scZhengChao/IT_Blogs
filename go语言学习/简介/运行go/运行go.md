# 运行go

## 目录

- [1. 基本运行方式](#1-基本运行方式)
  - [（1）运行单个 Go 文件](#1运行单个-Go-文件)
  - [（2）运行整个项目（自动编译并运行）](#2运行整个项目自动编译并运行)
- [2. 编译后运行](#2-编译后运行)
  - [（1）编译为可执行文件](#1编译为可执行文件)
  - [（2）交叉编译（其他平台）](#2交叉编译其他平台)
- [3. 项目结构示例](#3-项目结构示例)
- [4. 使用 Go Modules（推荐）](#4-使用-Go-Modules推荐)
  - [（1）初始化模块](#1初始化模块)
  - [（2）添加依赖](#2添加依赖)
  - [（3）整理依赖](#3整理依赖)
- [5. 常用开发命令](#5-常用开发命令)
  - [（1）格式化代码](#1格式化代码)
  - [（2）代码静态分析](#2代码静态分析)
  - [（3）运行测试](#3运行测试)
  - [（4）安装工具（全局）](#4安装工具全局)
- [6. 开发环境设置](#6-开发环境设置)
  - [（1）安装 Go](#1安装-Go)
  - [（2）环境变量检查](#2环境变量检查)
- [7. 完整的开发流程示例](#7-完整的开发流程示例)
  - [步骤 1：创建项目](#步骤-1创建项目)
  - [步骤 2：编写代码](#步骤-2编写代码)
  - [步骤 3：运行程序](#步骤-3运行程序)
  - [步骤 4：添加测试](#步骤-4添加测试)

## **1. 基本运行方式**

### **（1）运行单个 Go 文件**

```go 
go run main.go
```


### **（2）运行整个项目（自动编译并运行）**

```go 
go run .
```


或指定具体文件：

```go 
go run *.go
```


## **2. 编译后运行**

### **（1）编译为可执行文件**

```markdown 
# 编译为当前系统的可执行文件
go build -o myapp main.go

# 运行编译后的程序
./myapp
```


### **（2）交叉编译（其他平台）**

```go 
# 编译为 Windows
GOOS=windows GOARCH=amd64 go build -o myapp.exe main.go

# 编译为 Linux
GOOS=linux GOARCH=amd64 go build -o myapp main.go

# 编译为 macOS
GOOS=darwin GOARCH=amd64 go build -o myapp main.go
```


## **3. 项目结构示例**

假设有以下项目结构：

```go 
myproject/
├── go.mod
├── main.go
└── utils/
    └── helper.go
```


​**​main.go​**​：

```go 
package main

import (
    "fmt"
    "myproject/utils"
)

func main() {
    fmt.Println("Hello, Go!")
    utils.Helper()
}
```


**utils/helper.go​**​：

```go 
package utils

import "fmt"

func Helper() {
    fmt.Println("Helper function")
}
```


**运行命令​**​：

```bash 
cd myproject
go run .
```


## **4. 使用 Go Modules（推荐）**

### **（1）初始化模块**

```markdown 
# 创建新项目
mkdir myapp && cd myapp
go mod init myapp
```


### **（2）添加依赖**

```go 
# 自动下载并添加依赖到 go.mod
go get github.com/gin-gonic/gin
```


### **（3）整理依赖**

```go 
go mod tidy
```


## **5. 常用开发命令**

### **（1）格式化代码**

```go 
go fmt ./...
```


### **（2）代码静态分析**

```go 
go vet ./...
```


### **（3）运行测试**

```markdown 
# 运行所有测试
go test ./...

# 运行具体测试文件
go test -v main_test.go

# 显示测试覆盖率
go test -cover ./...
```


### **（4）安装工具（全局）**

```go 
go install golang.org/x/tools/gopls@latest
```


## **6. 开发环境设置**

### **（1）安装 Go**

- **下载**：从 [golang.org/dl下载对应版本](http://golang.org/dl下载对应版本 "golang.org/dl下载对应版本")
- **验证安装**：

```go 
go version
```


### **（2）环境变量检查**

```markdown 
# 检查 GOPATH（旧版本需要）
echo $GOPATH

# 检查 GOROOT
echo $GOROOT

# 检查 PATH 是否包含 Go
echo $PATH | grep go

```


## **7. 完整的开发流程示例**

### **步骤 1：创建项目**

```markdown 
mkdir hello-world && cd hello-world
go mod init hello-world
```


### **步骤 2：编写代码**

创建 `main.go`：

```go 
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    fmt.Printf("Go version: %s\n", goVersion())
}

func goVersion() string {
    return "1.21.0" // 实际中可以从 runtime.Version() 获取
}
```


### **步骤 3：运行程序**

```markdown 
# 方式1：直接运行
go run main.go

# 方式2：编译后运行
go build -o hello
./hello
```


### **步骤 4：添加测试**

创建 `main_test.go`：

```go 
package main

import "testing"

func TestGoVersion(t *testing.T) {
    version := goVersion()
    if version == "" {
        t.Error("Expected version string")
    }
}
```


运行测试：

```go 
go test -v
```
