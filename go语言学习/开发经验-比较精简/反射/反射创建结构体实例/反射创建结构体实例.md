# 反射创建结构体实例

## 目录

- [第一部分：定义结构体](#第一部分定义结构体)
- [第二部分：定义方法](#第二部分定义方法)
- [第三部分：main 函数](#第三部分main-函数)
- [详细过程说明](#详细过程说明)

```go 
type Person struct {
   Name    string `json:"name"`
   Age     int    `json:"age"`
   Address string `json:"address"`
   money   int
}

func (p Person) Talk(msg string) string {
   return msg
}

func main() {
   // 创建结构体反射值
   rType := reflect.TypeOf(new(Person)).Elem()
   person := reflect.New(rType).Elem()
   fmt.Println(person.Interface())
}
```


这是一个使用 Go 语言反射（reflect）创建结构体实例的例子。我来详细解释每行代码的作用：

## 第一部分：定义结构体

```go 
type Person struct {
   Name    string `json:"name"`
   Age     int    `json:"age"`
   Address string `json:"address"`
   money   int
}
```


- 定义了一个 `Person`结构体
- 包含四个字段：
  - `Name`：公开字段，有 JSON 标签
  - `Age`：公开字段，有 JSON 标签
  - `Address`：公开字段，有 JSON 标签
  - `money`：私有字段（小写开头），无 JSON 标签

## 第二部分：定义方法

```go 
func (p Person) Talk(msg string) string {
   return msg
}
```


- 为 `Person`结构体定义了一个方法 `Talk`
- 接收一个字符串参数，返回相同的字符串
- 这是值接收者方法

## 第三部分：main 函数

```go 
func main() {
   // 创建结构体反射值
   rType := reflect.TypeOf(new(Person)).Elem()
```


- `new(Person)`：创建 `Person`类型的指针（`*Person`）
- `reflect.TypeOf()`：获取指针的反射类型
- `.Elem()`：获取指针指向的类型（`Person`）
- 最终 `rType`是 `Person`类型的反射类型

```go 
person := reflect.New(rType).Elem()
```


- `reflect.New(rType)`：根据类型 `Person`创建新值
  - 返回的是指向新零值的指针的 `reflect.Value`（`*Person`类型）
- `.Elem()`：获取指针指向的实际值（`Person`类型）
- 最终 `person`是 `Person`类型零值的 `reflect.Value`

```go 
fmt.Println(person.Interface())
}
```


- `person.Interface()`：将 `reflect.Value`转换回普通的接口类型
- `fmt.Println()`：打印结果
- 输出会是：`{ 0 0}`（因为所有字段都是零值）

## 详细过程说明

1. **创建类型信息**：
   - 先获取 `Person`的类型信息（`rType`）
   - 这包含了结构体字段、方法、标签等元数据
2. **创建实例**：
   - 通过 `reflect.New()`动态创建一个新的 `Person`实例
   - 这个实例的所有字段都被初始化为零值：
     - `Name`: ""（空字符串）
     - `Age`: 0
     - `Address`: ""
     - `money`: 0
3. **输出结果**：
   - 打印的是一个零值的 `Person`结构体
   - 注意：`money`字段虽然存在，但由于是私有的，在使用反射创建时也会被初始化
