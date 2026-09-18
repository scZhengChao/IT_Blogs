# 结构体打印为什么不是类似json形式

## 目录

- [默认打印格式](#默认打印格式)
- [不同的打印方式](#不同的打印方式)
  - [1. 默认方式（不显示字段名）](#1-默认方式不显示字段名)
  - [2. 显示字段名的方式](#2-显示字段名的方式)
  - [3. 详细的 Go 语法表示](#3-详细的-Go-语法表示)
- [为什么不是 JSON？](#为什么不是-JSON)
- [如果想输出 JSON](#如果想输出-JSON)
- [历史背景](#历史背景)
- [总结](#总结)

## 默认打印格式

```go 
p := Person{}
fmt.Println(p)  // 输出: { 0 }
```


这不是 JSON 格式，而是 Go 的默认结构体格式化输出。Go 的 `fmt`包在打印结构体时：

1. **不显示字段名****，只显示值**​
2. \*\*用花括号 ​`{}`\*\***包裹**
3. **用空格分隔各个值**
4. **只显示可导出的字段**

## 不同的打印方式

### 1. 默认方式（不显示字段名）

```go 
fmt.Println(p)        // { 0 }
fmt.Printf("%v\n", p) // { 0 }
```


### 2. 显示字段名的方式

```go 
fmt.Printf("%+v\n", p)
// 输出: {Name: Age:0 Address:}
// 注意：money 字段仍然不显示
```


### 3. 详细的 Go 语法表示

```go 
fmt.Printf("%#v\n", p)
// 输出: main.Person{Name:"", Age:0, Address:"", money:0}
// 这里 money 会显示（在 %#v 中）
```


## 为什么不是 JSON？

有几个原因：

1. **设计哲学不同**：
   - `fmt`包是**通用格式化工具**，不是专门为 JSON 设计的
   - JSON 是**数据交换格式**，`fmt`是**调试/显示工具**
2. **目的不同**：

```go 
// fmt 用于调试/日志
fmt.Printf("Person: %+v\n", p)  // 调试查看

// encoding/json 用于数据交换
jsonBytes, _ := json.Marshal(p)  // 网络传输/存储
fmt.Println(string(jsonBytes))    // {"name":"","age":0,"address":""}
```


1. **性能考虑**：
   - `fmt`的默认格式更简单快速
   - JSON 序列化需要处理更多细节（标签、类型转换等）

## 如果想输出 JSON

需要显式使用 `encoding/json`：

```go 
func main() {
    p := Person{
        Name:    "张三",
        Age:     25,
        Address: "北京",
    }
    
    // 默认打印
    fmt.Println("默认:", p)                    // {张三 25 北京}
    
    // 带字段名打印
    fmt.Printf("带字段名: %+v\n", p)           // {Name:张三 Age:25 Address:北京}
    
    // JSON 格式
    jsonData, _ := json.MarshalIndent(p, "", "  ")
    fmt.Println("JSON格式:")
    fmt.Println(string(jsonData))
    // 输出:
    // {
    //   "name": "张三",
    //   "age": 25,
    //   "address": "北京"
    // }
}
```


## 历史背景

这种设计源于 Go 的 C 语言传统和 Unix 哲学：

- 简单为主，不默认包含额外信息
- 需要更多信息时使用更详细的格式说明符
- 与 Go 的 `%v`、`%+v`、`%#v`层次化设计一致

## 总结

| 打印方式                     | 显示字段名     | 适合用途 | 私有字段 |
| ------------------------ | --------- | ---- | ---- |
| \`fmt.Println(p)\`       | 否         | 快速查看 | 不显示  |
| \`fmt.Printf("%+v", p)\` | 是         | 调试   | 不显示  |
| \`fmt.Printf("%#v", p)\` | 是         | 完整信息 | 显示   |
| \`json.Marshal(p)\`      | 是（JSON标签） | 数据交换 | 不序列化 |

所以回答你的问题：**Go 默认不显示字段名是为了简洁**，但可以通过 `%+v`来显示，或者用 `encoding/json`获得真正的 JSON 格式。
