# defer

## 目录

- [基本语法](#基本语法)
- [核心特性](#核心特性)
  - [1. 延迟执行](#1-延迟执行)
  - [2. 后进先出（LIFO）](#2-后进先出LIFO)
- [主要用途](#主要用途)
  - [1. 资源清理（最常见）](#1-资源清理最常见)
  - [2. 解锁互斥锁](#2-解锁互斥锁)
  - [3. 数据库连接关闭](#3-数据库连接关闭)
  - [4. HTTP 响应处理](#4-HTTP-响应处理)
- [高级用法](#高级用法)
  - [1. defer 与匿名函数](#1-defer-与匿名函数)
  - [2. 修改返回值](#2-修改返回值)
  - [3. 错误处理和恢复](#3-错误处理和恢复)
  - [4. 性能测量](#4-性能测量)
- [常见陷阱](#常见陷阱)
  - [陷阱1：循环中的 defer](#陷阱1循环中的-defer)
  - [陷阱2：参数立即求值](#陷阱2参数立即求值)
  - [陷阱3：nil 函数](#陷阱3nil-函数)
- [性能考虑](#性能考虑)
  - [基准测试](#基准测试)
- [defer 的执行时机](#defer-的执行时机)
- [实际应用案例](#实际应用案例)
  - [案例1：事务处理](#案例1事务处理)
  - [案例2：资源池](#案例2资源池)
  - [案例3：中间件模式](#案例3中间件模式)
- [defer 的最佳实践](#defer-的最佳实践)
- [特殊场景](#特殊场景)
  - [defer 与 os.Exit](#defer-与-osExit)
  - [defer 与 goroutine](#defer-与-goroutine)
- [总结](#总结)

`defer`是 Go 语言中一个**独特而强大**的关键字，用于**延迟执行**函数调用。它主要用于**资源清理、解锁、错误处**理等场景。

## 基本语法

```go 
func main() {
    defer fmt.Println("World")  // 延迟执行
    fmt.Println("Hello")
    // 输出: Hello
    //       World
}
```


## 核心特性

### 1. 延迟执行

```go 
func main() {
    fmt.Println("开始")
    
    defer fmt.Println("第一个defer")
    defer fmt.Println("第二个defer")
    defer fmt.Println("第三个defer")
    
    fmt.Println("结束")
    // 输出:
    // 开始
    // 结束
    // 第三个defer
    // 第二个defer
    // 第一个defer
}
```


**重要**：defer 语句**立即求值参数**，但函数**调用被推迟**。

```go 
func main() {
    i := 1
    defer fmt.Println("i =", i)  // 此时 i=1 被捕获
    i = 2
    fmt.Println("main i =", i)
    // 输出:
    // main i = 2
    // i = 1
}
```


### 2. 后进先出（LIFO）

多个 defer 按**逆序**执行（栈结构）：

```go 
func main() {
    for i := 0; i < 5; i++ {
        defer fmt.Println(i)  // 注意：这里捕获的是当前的 i
    }
    // 输出:
    // 4
    // 3
    // 2
    // 1
    // 0
}
```


## 主要用途

### 1. 资源清理（最常见）

```go 
// 文件操作
func readFile(filename string) error {
    file, err := os.Open(filename)
    if err != nil {
        return err
    }
    defer file.Close()  // 确保文件被关闭
    
    // 处理文件
    content, err := io.ReadAll(file)
    if err != nil {
        return err
    }
    
    fmt.Println(string(content))
    return nil
}
```


### 2. 解锁互斥锁

```go 
var mu sync.Mutex
var balance int

func Deposit(amount int) {
    mu.Lock()
    defer mu.Unlock()  // 确保一定会解锁
    
    balance += amount
    // 即使中间 panic 了，defer 也会执行解锁
}
```


### 3. 数据库连接关闭

```go 
func queryDatabase() error {
    db, err := sql.Open("mysql", "user:pass@/dbname")
    if err != nil {
        return err
    }
    defer db.Close()  // 确保数据库连接关闭
    
    rows, err := db.Query("SELECT * FROM users")
    if err != nil {
        return err
    }
    defer rows.Close()  // 确保结果集关闭
    
    for rows.Next() {
        // 处理每一行
    }
    return nil
}
```


### 4. HTTP 响应处理

```go 
func handler(w http.ResponseWriter, r *http.Request) {
    // 记录处理时间
    start := time.Now()
    defer func() {
        fmt.Printf("请求处理时间: %v\n", time.Since(start))
    }()
    
    // 业务逻辑
    w.Write([]byte("Hello World"))
}
```


## 高级用法

### 1. defer 与匿名函数

```go 
func main() {
    i := 0
    
    // 方式1：立即求值
    defer fmt.Println("i =", i)  // 输出: i = 0
    
    // 方式2：通过闭包访问最终值
    defer func() {
        fmt.Println("i =", i)  // 输出: i = 5
    }()
    
    i = 5
}
```


### 2. 修改返回值

```go 
func double(x int) (result int) {
    defer func() {
         result *= 2  // 可以修改命名返回值
     }()
    
    return x + 1
    // 实际执行:  result = x + 1 → defer执行: result *= 2
 }

func main() {
    fmt.Println(double(3))  // 输出: 8
    // 计算过程: 3+1=4 → 4 * 2=8
}
```


### 3. 错误处理和恢复

```go 
func safeDivide(a, b int) (result int, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("运行时错误: %v", r)
        }
    }()
    
    if b == 0 {
        panic("除数不能为零")
    }
    return a / b, nil
}

func main() {
    result, err := safeDivide(10, 0)
    if err != nil {
        fmt.Println("错误:", err)
    } else {
        fmt.Println("结果:", result)
    }
}
```


### 4. 性能测量

```go 
func expensiveOperation() {
    defer timeTrack(time.Now(), "expensiveOperation")
    
    // 耗时操作
    time.Sleep(2 * time.Second)
}

func timeTrack(start time.Time, name string) {
    elapsed := time.Since(start)
    fmt.Printf("%s 耗时: %s\n", name, elapsed)
}
```


## 常见陷阱

### 陷阱1：循环中的 defer

```go 
// ❌ 错误写法
func processFiles(filenames []string) error {
    for _, filename := range filenames {
        f, err := os.Open(filename)
        if err != nil {
            return err
        }
        defer f.Close()  // 所有文件直到函数结束才关闭！
        
        // 处理文件
    }
    return nil
     // 问题: 如果文件很多，会一直占用文件描述符 
}

// ✅ 正确写法
func processFiles(filenames []string) error {
    for _, filename := range filenames {
        if err := func() error {  // 使用闭包
            f, err := os.Open(filename)
            if err != nil {
                return err
            }
            defer f.Close()   // 这个defer在闭包结束时执行 
            
            // 处理文件
            return nil
        }(); err != nil {
            return err
        }
    }
    return nil
}
```


### 陷阱2：参数立即求值

```go 
func main() {
    x := 1
    defer func(n int) {
        fmt.Println("n =", n)  // 输出: n = 1
    }(x)
    
    x = 2
    // 参数 x 在 defer 语句执行时就已经确定了
}
```


### 陷阱3：nil 函数

```go 
func main() {
    var f func()
    defer f()   // ❌ panic: 调用 nil 函数 
    
    f = func() {
        fmt.Println("Hello")
    }
    // 注意: defer 时 f 已经是 nil
}
```


## 性能考虑

### 基准测试

```go 
func BenchmarkWithoutDefer(b *testing.B) {
    for i := 0; i < b.N; i++ {
        f := createFile()
        // 手动关闭
        closeFile(f)
    }
}

func BenchmarkWithDefer(b *testing.B) {
    for i := 0; i < b.N; i++ {
        f := createFile()
        defer closeFile(f)  // 有微小性能开销
    }
}
```


**性能影响**：

- defer 有**微小**的性能开销（约 50-100ns）
- 在大多数情况下可忽略不计
- 不要因为性能而避免使用 defer
- 代码清晰性和安全性更重要

## defer 的执行时机

```go 
func example() (result int) {
    // 1. 返回值赋值
    result = 10
    
    // 2. 执行 defer
    defer func() {
        result *= 2
    }()
    
    // 3. 返回
    return result
    // 实际返回: 20
}
```


详细执行顺序：

```go 
func complexExample() (x int) {
    defer fmt.Println("defer 1, x =", x)  // 第三步
    
    x = 1
    
    defer func() {
        fmt.Println("defer 2, x =", x)  // 第二步
    }()
    
    defer func(n int) {
        fmt.Println("defer 3, n =", n)  // 第一步
    }(x)
    
    x = 2
    return x
    // 输出:
    // defer 3, n = 1
    // defer 2, x = 2
    // defer 1, x = 0
}
```


## 实际应用案例

### 案例1：事务处理

```go 
func processTransaction(db *sql.DB) error {
    // 开始事务
    tx, err := db.Begin()
    if err != nil {
        return err
    }
    
    // 确保事务要么提交要么回滚
    defer func() {
        if p := recover(); p != nil {
            tx.Rollback()
            panic(p)  // 重新抛出 panic
        }
    }()
    
    // 执行多个操作
    if _, err := tx.Exec("UPDATE accounts SET balance = ..."); err != nil {
        tx.Rollback()
        return err
    }
    
    if _, err := tx.Exec("INSERT INTO logs ..."); err != nil {
        tx.Rollback()
        return err
    }
    
    // 提交事务
    return tx.Commit()
}
```


### 案例2：资源池

```go 
type Resource struct {
    id int
}

func (r *Resource) Close() error {
    fmt.Printf("关闭资源 %d\n", r.id)
    return nil
}

func useResource() error {
    // 从池中获取资源
    res := getResourceFromPool()
    
    // 确保资源放回池中
    defer func() {
        if err := res.Close(); err != nil {
            log.Printf("关闭资源失败: %v", err)
        }
        returnResourceToPool(res)
    }()
    
    // 使用资源
    return doWorkWithResource(res)
}
```


### 案例3：中间件模式

```go 
func withLogging(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        defer func() {
            log.Printf(
                "%s %s %s %v",
                r.Method,
                r.URL.Path,
                r.RemoteAddr,
                time.Since(start),
            )
        }()
        
        next(w, r)
    }
}

func withAuth(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        
        defer func() {
            // 清理认证相关的资源
            cleanupAuthResources()
        }()
        
        if !validateToken(token) {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        
        next(w, r)
    }
}
```


## defer 的最佳实践

1. **立即使用 defer**

```go 
// ✅ 好：打开后立即 defer
file, err := os.Open("data.txt")
if err != nil { return err }
defer file.Close()  // 马上写 defer

// ❌ 不好：最后再写 defer
file, err := os.Open("data.txt")
if err != nil { return err }
// ... 很多代码 ...
defer file.Close()  // 容易忘记
```


1. **每个资源一个 defer**

```go 
func process() error {
    f1, err := os.Open("file1.txt")
    if err != nil { return err }
    defer f1.Close()  // 单独处理

    f2, err := os.Open("file2.txt")
    if err != nil { return err }
    defer f2.Close()  // 单独处理

    // 而不是: defer func() { f1.Close(); f2.Close() }()
    return nil
}
```


1. **小心循环中的 defer**

```go 
// 使用函数包装
for _, item := range items {
    err := func() error {
        resource := acquireResource()
        defer releaseResource(resource)  // 在函数结束时执行

        return process(resource)
    }()
}
```


1. **命名返回值时明确处理**

```go 
func process() (err error) {
    resource, err := acquire()
    if err != nil {
        return
    }
    defer func() {
        // 在 defer 中可以修改 err
        if closeErr := resource.Close(); closeErr != nil && err == nil {
            err = closeErr
        }
    }()

    return nil
}
```


## 特殊场景

### defer 与 os.Exit

```go 
func main() {
    defer fmt.Println("这不会执行!")
    
    os.Exit(1)  // 立即退出，不执行 defer
    
    fmt.Println("这也不会执行")
}
```


### defer 与 goroutine

```go 
func main() {
    go func() {
        defer fmt.Println("goroutine 结束")  // 会执行
        // goroutine 代码
    }()
    
    time.Sleep(time.Millisecond)
    // 注意: main 函数退出时，不会等待 goroutine
}
```


## 总结

**defer 的核心价值**：

1. **确保清理**：资源一定会被释放
2. **简化代码**：减少重复的清理代码
3. **提高可读性**：资源获取和清理放在一起
4. **错误安全**：即使发生 panic 也能执行清理

**黄金法则**：

- 打开资源后**立即**写 defer
- defer 按**后进先出**顺序执行
- defer 的参数在**声明时求值**
- defer 可以**修改命名返回值**
- 在 defer 中**可以 recover panic**

记住：**"defer 不是免费的，但通常是值得的"**。在大多数情况下，代码的清晰性和安全性比微小的性能开销更重要。

[不会被 panic 影响](<./不会被 panic 影响/index.md> "不会被 panic 影响")
