# 结构体标签

## 目录

- [关键点说明](#关键点说明)

在 Go 语言中，结构体字段后面跟着的 `` `json:"name"` ``这样的内容称为结构体标签（Struct Tags），它们为字段提供了元数据信息。

```go 
package main

import (
  "encoding/json"
  "fmt"
)

type Person struct {
  Name    string `json:"name"`    // 指定JSON字段名为"name"
  Age     int    `json:"age"`     // 指定JSON字段名为"age"
  Address string `json:"address"` // 指定JSON字段名为"address"
  money   int    // 没有标签，私有字段不会被JSON编码
}

func main() {
  p := Person{
    Name:    "张三",
    Age:     30,
    Address: "北京市",
    money:   5000,
  }

  // 序列化为JSON
  data, _ := json.Marshal(p)
  fmt.Println(string(data))
}
```


## 关键点说明

1. **json:"name"** 的作用：
   - 指定该字段在 JSON 序列化/反序列化时使用的名称
   - 在这个例子中，`Name`字段在 JSON 中会显示为 `"name"`
2. **标签语法**：
   - 使用反引号 `` ` ``包裹
   - 格式为 `key:"value"`，可以有多个键值对，用空格分隔
   - 常见的键有 `json`, `xml`, `bson`等
3. **示例输出**：
   - 上面的代码会输出类似：`{"name":"张三","age":30,"address":"北京市"}`
   - 注意 `money`字段因为是私有的（小写开头）且没有标签，所以不会被包含在 JSON 中
4. **其他用途**：
   - 除了 JSON，还可以用于 XML、数据库 ORM 等场景
   - 例如：`xml:"name"`, `bson:"name"`, `gorm:"column:name"`
5. **特殊值**：
   - `json:"-"`表示完全忽略该字段
   - `json:",omitempty"`表示如果字段为零值则不包含在 JSON 中

这种标签机制使得 Go 的结构体**可以灵活地适应各种序列化格式，而不需要改变结构体本身的字段命名。**
