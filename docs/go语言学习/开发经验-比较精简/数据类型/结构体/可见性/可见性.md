# 可见性

## 目录

- [核心区别](#核心区别)
  - [1. 可导出字段（大写开头）✅](#1-可导出字段大写开头)
  - [2. 不可导出字段（小写开头）❌](#2-不可导出字段小写开头)
- [详细对比](#详细对比)
  - [访问控制示例](#访问控制示例)
  - [JSON 序列化影响](#JSON-序列化影响)
  - [反射访问差异](#反射访问差异)
- [实际应用场景](#实际应用场景)
  - [场景1：API 响应结构](#场景1API-响应结构)
  - [场景2：数据库模型](#场景2数据库模型)
  - [场景3：配置管理](#场景3配置管理)
- [总结](#总结)

`fmt.Println`在打印结构体时，**只会输出可导出的字段**

在 Go 语言中，结构体字段的大小写开头有**本质区别**，这决定了**可见性（Visibility）**，也就是可访问范围。

## 核心区别

### 1. 可导出字段（大写开头）✅

```go 
type Person struct {
    Name    string  // 可导出
    Age     int     // 可导出
    Address string  // 可导出
}
```


- **可以被包外访问**
- **可以被 JSON 序列化/反序列化**
- **可以通过反射获取和修改**
- **是公开的 API 接口**

### 2. 不可导出字段（小写开头）❌

```go 
type Person struct {
    name    string  // 不可导出
    age     int     // 不可导出
    money   int     // 不可导出
}
```


- **只能在当前包内访问**
- **JSON 默认不处理**
- **反射访问受限**
- **实现细节隐藏**

## 详细对比

### 访问控制示例

```go 
// 在包A中定义
package models

type User struct {
    Name    string  // 可导出
    age     int     // 不可导出
    Balance float64 // 可导出
}

// 在包B中导入使用
package main
import "models"

func main() {
    u := models.User{}
    u.Name = "Alice"     // ✅ 可以访问
    u.Balance = 100.0    // ✅ 可以访问
    // u.age = 25        // ❌ 编译错误：不可访问
}
```


### JSON 序列化影响

```go 
type Config struct {
    APIKey   string `json:"api_key"`
    Endpoint string `json:"endpoint"`
    secret   string // 没有 JSON 标签
}

func main() {
    c := Config{
        APIKey:   "abc123",
        Endpoint: "https://api.example.com",
        secret:   "my-secret",
    }
    
    jsonData, _ := json.Marshal(c)
    fmt.Println(string(jsonData))
    // 输出: {"api_key":"abc123","endpoint":"https://api.example.com"}
    // secret 字段不会出现在 JSON 中
}
```


### 反射访问差异

```go 
type Data struct {
    PublicField  string
    privateField string
}

func main() {
    d := Data{"public", "private"}
    v := reflect.ValueOf(d)
    t := reflect.TypeOf(d)
    
    fmt.Println("字段数量:", t.NumField())  // 输出: 2
    
    for i := 0; i < t.NumField(); i++ {
        field := t.Field(i)
        fmt.Printf("%s: 可导出=%v\n", 
            field.Name, 
            field.PkgPath == "")  // PkgPath 为空表示可导出
    }
    
    // 反射修改值
    pv := reflect.ValueOf(&d).Elem()
    pv.Field(0).SetString("new public")  // ✅ 可修改
    // pv.Field(1).SetString("new private")  // ❌ panic: 不能修改不可导出字段
}
```


## 实际应用场景

### 场景1：API 响应结构

```go 
type APIResponse struct {
    Status  int         `json:"status"`  // 客户端需要
    Message string      `json:"message"`  // 客户端需要
    Data    interface{} `json:"data"`     // 客户端需要
    
    requestID string    // 服务端内部使用
    latency   int64     // 监控使用
}
```


### 场景2：数据库模型

```go 
type User struct {
    ID        int       `json:"id" gorm:"primaryKey"`
    Username  string    `json:"username"`
    Email     string    `json:"email"`
    CreatedAt time.Time `json:"created_at"`
    
    passwordHash string  // 不暴露给客户端
    salt         string  // 内部使用
}
```


### 场景3：配置管理

```go 
type ServerConfig struct {
    Host string `yaml:"host"`  // 配置文件映射
    Port int    `yaml:"port"`
    
    adminToken string  // 从环境变量加载，不写入配置
    debugMode  bool    // 内部标记
}
```


## 总结

| 特性         | 大写开头     | 小写开头     |
| ---------- | -------- | -------- |
| 包外可见性      | ✅ 是      | ❌ 否      |
| JSON 序列化   | ✅ 默认包含   | ❌ 默认排除   |
| 反射可修改      | ✅ 是      | ❌ 否（有保护） |
| XML/YAML 等 | ✅ 是      | ❌ 否      |
| 设计意图       | 公开 API   | 实现细节     |
| 修改风险       | 高（破坏兼容性） | 低（内部修改）  |

**简单记忆**：

- **大写** = **公开** = 给**外部**用的
- **小写** = **私有** = **内部**实现细节

这是 Go 语言**封装性**的核心机制，有助于：

1. 最小化 API 接口
2. 隐藏实现细节
3. 防止误用
4. 保持向后兼容性
