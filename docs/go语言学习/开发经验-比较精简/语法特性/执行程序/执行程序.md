# 执行程序

## 目录

- [go build](#go-build)
- [运行单个指定 Go 文件](#运行单个指定-Go-文件)
- [运行整个项目（自动编译并运行](#运行整个项目自动编译并运行)
- [编译后运行](#编译后运行)
- [交叉编译](#交叉编译)
  - [使用 Go Modules（推荐）](#使用-Go-Modules推荐)
    - [（1）初始化模块](#1初始化模块)
    - [（2）添加依赖](#2添加依赖)
    - [（3）整理依赖](#3整理依赖)

# `go build`

在hello目录下执行：`go build`

`go`编译器会去 `GOPATH`的`src`目录下查找你要编译的`hello`项目

编译得到的**可执行文件会保存在执行编译命令的当前目录下**，如果是`windows`平台会在当前目录下找到`hello.exe`可执行文件。

我们还可以使用-o参数来指定编译后可执行文件的名字。

`go build -o heiheihei.exe`

# **运行单个指定 Go 文件**

```go 
go run main.go
```


# **运行整个项目（自动编译并运行**

```go 
go run .
```


# **编译后运行**

```markdown 
# 编译为当前系统的可执行文件
go build -o myapp main.go

# 运行编译后的程序
./myapp
```


# 交叉编译

```markdown 
# 编译为 Windows
GOOS=windows GOARCH=amd64 go build -o myapp.exe main.go

# 编译为 Linux
GOOS=linux GOARCH=amd64 go build -o myapp main.go

# 编译为 macOS
GOOS=darwin GOARCH=amd64 go build -o myapp main.go
```


## **使用 Go Modules（推荐）**

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
