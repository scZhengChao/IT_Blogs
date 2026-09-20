# make vs new

## 目录

- [1. make 函数概述](#1-make-函数概述)
- [2. 基本语法](#2-基本语法)
- [3. 用于不同数据类型的用法](#3-用于不同数据类型的用法)
- [4. make vs new](#4-make-vs-new)
- [5. 实际应用示例](#5-实际应用示例)
  - [5.1 切片的高效使用](#51-切片的高效使用)
  - [5.2 带缓冲的通道](#52-带缓冲的通道)
- [6. 注意事项](#6-注意事项)
- [7. 常见错误](#7-常见错误)

## 1. make 函数概述

`make`是 Go 语言中的一个内置函数，主要用于**创建并初始化** slice、map 和 channel 这三种引用类型的数据结构。

## 2. 基本语法

```typescript 
make(T, args...)
```


其中：

- `T`：类型（slice、map 或 channel）
- `args`：根据类型不同的参数

## 3. 用于不同数据类型的用法

[数组vs 切片](<./数组vs 切片/index.md> "数组vs 切片")

## 4. make vs new

| 特性   | make                | new           |
| ---- | ------------------- | ------------- |
| 适用类型 | slice, map, channel | 任意类型          |
| 返回值  | 初始化后的类型 T           | 指向类型的指针 \\\*T |
| 初始化  | 会进行初始化              | 返回零值的内存指针     |

```go 
// make 示例
slice := make([]int, 3)  // [0, 0, 0]

// new 示例
ptr := new([]int)        // 指向空切片的指针
*ptr = make([]int, 3)    // 需要额外初始化
```


## 5. 实际应用示例

### 5.1 切片的高效使用

```go 
// 预分配足够容量避免频繁扩容
func processData(data []int) []int {
    result := make([]int, 0, len(data)) // 预分配容量
    
    for _, value := range data {
        if value > 0 {
            result = append(result, value*2)
        }
    }
    return result
}
```


### 5.2 带缓冲的通道

```go 
func worker(ch chan<- int, wg *sync.WaitGroup) {
    defer wg.Done()
    for i := 0; i < 10; i++ {
        ch <- i
    }
}

func main() {
    ch := make(chan int, 5) // 缓冲通道提高性能
    var wg sync.WaitGroup
    
    wg.Add(1)
    go worker(ch, &wg)
    
    go func() {
        wg.Wait()
        close(ch)
    }()
    
    for value := range ch {
        fmt.Println(value)
    }
}
```


## 6. 注意事项

1. **零值问题**：make 创建的对象不是零值，而是初始化后的对象
2. **性能考虑**：合理设置容量可以减少内存分配次数
3. **类型安全**：make 是类型安全的，编译时会检查类型匹配

## 7. 常见错误

```go 
// 错误：对非引用类型使用 make
// var i int = make(int) // 编译错误

// 正确使用
var slice []int = make([]int, 5)
var m map[string]int = make(map[string]int)
var ch chan bool = make(chan bool)
```


`make`函数是 Go 语言中**管理动态数据结构的重要工具，正确使用可以显著提高程序性能和内存效率。**
