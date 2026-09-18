# 管道（Channel）

## 目录

- [基本概念](#基本概念)
  - [1. 创建管道](#1-创建管道)
  - [2. 基本操作](#2-基本操作)
- [管道类型对比](#管道类型对比)
- [实际使用示例](#实际使用示例)
  - [1. 协程间通信](#1-协程间通信)
  - [2. 生产消费者模式](#2-生产消费者模式)
  - [3. 超时控制](#3-超时控制)
  - [4. 多路复用（select）](#4-多路复用select)
- [管道特性详解](#管道特性详解)
  - [1. 阻塞行为](#1-阻塞行为)
  - [2. 管道关闭](#2-管道关闭)
  - [3. range 遍历管道](#3-range-遍历管道)
  - [4. 单向管道](#4-单向管道)
- [常见模式](#常见模式)
  - [1. Worker Pool](#1-Worker-Pool)
  - [2. 扇入（Fan-in）](#2-扇入Fan-in)
  - [3. 扇出（Fan-out）](#3-扇出Fan-out)
  - [4. 超时和取消](#4-超时和取消)
- [管道与互斥锁的对比](#管道与互斥锁的对比)
- [最佳实践](#最佳实践)
- [常见陷阱](#常见陷阱)
- [总结](#总结)

管道（Channel）是 Go 语言中用于**协程（goroutine）间通信**的核心数据类型，是实现**CSP（Communicating Sequential Processes）并发模型**的关键。

## 基本概念

### 1. 创建管道

```go 
// 1. 声明管道（零值为 nil）
var ch chan int

// 2. 创建无缓冲管道
ch1 := make(chan int)         // 读写都会阻塞
ch2 := make(chan int, 0)      // 同上，容量为0

// 3. 创建有缓冲管道
ch3 := make(chan int, 10)     // 容量为10

// 4. 创建只读/只写管道
var readOnly <-chan int       // 只能从管道读
var writeOnly chan<- int      // 只能向管道写
```


**参数说明：**

- 缓冲大小（bufferSize）：通道的缓冲区容量（可选，默认为 0，即无缓冲）

### 2. 基本操作

```go 
ch := make(chan int, 3)

// 发送数据
ch <- 1
ch <- 2
ch <- 3
// ch <- 4  // 此时会阻塞（缓冲区已满）

// 接收数据
x := <-ch     // x = 1
y := <-ch     // y = 2
z := <-ch     // z = 3
// w := <-ch  // 此时会阻塞（缓冲区为空）

// 关闭管道
close(ch)
```


## 管道类型对比

| 特性   | 无缓冲管道            | 有缓冲管道               |
| ---- | ---------------- | ------------------- |
| 创建   | \`make(chan T)\` | \`make(chan T, n)\` |
| 容量   | 0                | n > 0               |
| 发送阻塞 | 直到有接收者           | 缓冲区满时               |
| 接收阻塞 | 直到有发送者           | 缓冲区空时               |
| 同步性  | 强同步              | 弱同步                 |

## 实际使用示例

### 1. 协程间通信

```go 
func worker(id int, jobs <-chan int, results chan<- int) {
    for job := range jobs {  // 从 jobs 管道接收
        fmt.Printf("Worker %d processing job %d\n", id, job)
        time.Sleep(time.Second)
        results <- job * 2  // 向 results 管道发送
    }
}

func main() {
    jobs := make(chan int, 10)
    results := make(chan int, 10)
    
    // 启动3个worker
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }
    
    // 发送5个任务
    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)  // 关闭jobs管道，告知worker没有更多任务
    
    // 收集结果
    for r := 1; r <= 5; r++ {
        result := <-results
        fmt.Println("Result:", result)
    }
}
```


### 2. 生产消费者模式

```go 
func producer(ch chan<- int) {
    for i := 0; i < 5; i++ {
        fmt.Println("Producing:", i)
        ch <- i
        time.Sleep(100 * time.Millisecond)
    }
    close(ch)  // 生产完成，关闭管道
}

func consumer(ch <-chan int) {
    for item := range ch {  // 自动检测管道关闭
        fmt.Println("Consuming:", item)
        time.Sleep(200 * time.Millisecond)
    }
}

func main() {
    ch := make(chan int, 2)  // 缓冲大小为2
    go producer(ch)
    consumer(ch)
}
```


### 3. 超时控制

```go 
func doWork() string {
    time.Sleep(2 * time.Second)
    return "work done"
}

func main() {
    ch := make(chan string, 1)
    
    go func() {
        ch <- doWork()
    }()
    
    select {
    case result := <-ch:
        fmt.Println("Success:", result)
    case <-time.After(1 * time.Second):  // 1秒超时
        fmt.Println("Timeout!")
    }
}
```


### 4. 多路复用（select）

```go 
func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)
    
    go func() {
        time.Sleep(1 * time.Second)
        ch1 <- "from ch1"
    }()
    
    go func() {
        time.Sleep(2 * time.Second)
        ch2 <- "from ch2"
    }()
    
    for i := 0; i < 2; i++ {
        select {
        case msg1 := <-ch1:
            fmt.Println("Received:", msg1)
        case msg2 := <-ch2:
            fmt.Println("Received:", msg2)
        }
    }
}
```


## 管道特性详解

### 1. 阻塞行为

```go 
// 无缓冲管道的阻塞示例
func main() {
    ch := make(chan int)  // 无缓冲
    
    go func() {
        fmt.Println("Goroutine sending...")
        ch <- 42
        fmt.Println("Sent!")  // 会阻塞直到主协程接收
    }()
    
    time.Sleep(2 * time.Second)
    fmt.Println("Main receiving...")
    val := <-ch
    fmt.Println("Received:", val)
}
```


### 2. 管道关闭

```go 
func main() {
    ch := make(chan int, 3)
    ch <- 1
    ch <- 2
    close(ch)  // 关闭管道
    
    // 关闭后仍可读取剩余数据
    fmt.Println(<-ch)  // 1
    fmt.Println(<-ch)  // 2
    
    // 读取空管道
    v, ok := <-ch
    fmt.Println(v, ok)  // 0 false（零值，false表示管道已关闭）
    
    // 向已关闭管道发送会 panic
    // ch <- 3  // panic: send on closed channel
}
```


### 3. range 遍历管道

```go 
func main() {
    ch := make(chan int, 3)
    ch <- 1
    ch <- 2
    ch <- 3
    close(ch)  // 必须关闭，否则 range 会一直等待
    
    for value := range ch {  // 自动检测关闭
        fmt.Println(value)
    }
    // 输出: 1 2 3
}
```


### 4. 单向管道

```go 
func produce(ch chan<- int) {  // 只写管道
    for i := 0; i < 5; i++ {
        ch <- i
    }
    close(ch)
}

func consume(ch <-chan int) {  // 只读管道
    for n := range ch {
        fmt.Println(n)
    }
}

func main() {
    ch := make(chan int, 2)
    go produce(ch)  // 转换为 chan<- int
    consume(ch)     // 转换为 <-chan int
}
```


## 常见模式

### 1. Worker Pool

```go 
func workerPool() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)
    
    // 启动worker
    for w := 1; w <= 5; w++ {
        go func(id int) {
            for job := range jobs {
                fmt.Printf("Worker %d processing job %d\n", id, job)
                results <- job * 2
            }
        }(w)
    }
    
    // 发送任务
    for j := 1; j <= 20; j++ {
        jobs <- j
    }
    close(jobs)
    
    // 收集结果
    for r := 1; r <= 20; r++ {
        <-results
    }
}
```


### 2. 扇入（Fan-in）

```go 
func fanIn(input1, input2 <-chan string) <-chan string {
    ch := make(chan string)
    go func() { for { ch <- <-input1 } }()
    go func() { for { ch <- <-input2 } }()
    return ch
}
```


### 3. 扇出（Fan-out）

```go 
func fanOut(input <-chan int, outputs []chan<- int) {
    for i := range input {
        for _, out := range outputs {
            out <- i
        }
    }
}
```


### 4. 超时和取消

```go 
func operationWithTimeout(duration time.Duration) (string, error) {
    ch := make(chan string, 1)
    
    go func() {
        time.Sleep(duration)
        ch <- "result"
    }()
    
    select {
    case res := <-ch:
        return res, nil
    case <-time.After(2 * time.Second):
        return "", fmt.Errorf("timeout after 2 seconds")
    }
}
```


## 管道与互斥锁的对比

| 场景      | 推荐                  | 原因               |
| ------- | ------------------- | ---------------- |
| 协程间传递数据 | Channel             | CSP 模型，避免共享内存    |
| 保护共享变量  | Mutex               | 简单直接             |
| 通知事件    | Channel             | \`close(ch)\`可广播 |
| 资源池     | Channel             | 天然适合（如连接池）       |
| 状态同步    | WaitGroup + Channel | 组合使用             |

```go 
// 使用 Channel 替代 Mutex
type Counter struct {
    ch chan int
}

func NewCounter() *Counter {
    c := &Counter{ch: make(chan int, 1)}
    c.ch <- 0  // 初始值
    return c
}

func (c *Counter) Inc() {
    val := <-c.ch
    val++
    c.ch <- val
}

func (c *Counter) Value() int {
    val := <-c.ch
    c.ch <- val
    return val
}
```


## 最佳实践

1. **谁创建，谁关闭**

```go 
// 生产者负责关闭
func producer() <-chan int {
    ch := make(chan int)
    go func() {
        defer close(ch)  // 确保关闭
        for i := 0; i < 10; i++ {
            ch <- i
        }
    }()
    return ch
}
```


1. **避免泄漏**

```go 
// 错误的例子 - 可能泄漏
func leaky() {
    ch := make(chan int)
    go func() {
        ch <- 1
        // 如果没有人接收，这个协程会永远阻塞
    }()
    // 忘记接收，协程泄漏
}
```


1. **使用 select 避免阻塞**

```go 
func safeSend(ch chan<- int, value int) bool {
    select {
    case ch <- value:
        return true
    default:  // 不阻塞
        return false
    }
}
```


1. **管道作为一等公民**

```go 
// 管道可以作为参数、返回值、结构体字段
type Server struct {
    requests  chan Request
    responses chan Response
    stop      chan struct{}
}
```


## 常见陷阱

1. **向 nil 管道发送/接收**：永远阻塞
2. **关闭已关闭的管道**：panic
3. **向已关闭管道发送**：panic
4. **range 不关闭的管道**：死锁
5. **多个接收者竞争**：需设计好协作

## 总结

管道是 Go 并发编程的核心，特点包括：

- ✅ **类型安全**：`chan T`只能传输类型 `T`
- ✅ **线程安全**：内置并发安全
- ✅ **阻塞/同步**：简化协程同步
- ✅ **组合性强**：可作为一等公民传递
- ✅ **CSP 模型**："不要通过共享内存来通信，而应该通过通信来共享内存"

记住黄金法则：**管道的发送和接收是原子操作，多个协程同时访问是安全的，但关闭需要谨慎处理****。** ​

[nil 通道](<nil 通道.md> "nil 通道")
