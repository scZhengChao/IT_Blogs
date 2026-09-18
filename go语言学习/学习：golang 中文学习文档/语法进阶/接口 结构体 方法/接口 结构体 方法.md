# 接口 结构体 方法

## 目录

- [正确的理解：](#正确的理解)
- [具体关系：](#具体关系)
- [更清晰的比喻：](#更清晰的比喻)
- [另一个例子：](#另一个例子)

## 正确的理解：

**接口定义行为规范**（方法签名）

**结构体（或其他类型）实现这些方法**，从而满足接口

## 具体关系：

```typescript 
// 1. 定义接口（行为规范）
type Person interface {
    Say(string) string
    Walk(int)
}

// 2. 定义结构体
type Student struct {
    Name string
}

// 3. 结构体实现接口的方法
func (s Student) Say(words string) string {
    return s.Name + "说: " + words
}

func (s Student) Walk(distance int) {
    fmt.Printf("%s 走了 %d 米\n", s.Name, distance)
}

// 4.  现在 Student 结构体自动实现了 Person 接口
```


## 更清晰的比喻：

- **接口**就像一份"职位要求"（需要会编程、会设计）
- **结构体**就像"求职者"
- **实现方法**就像求职者具备了这些技能
- 当**结构体具备了接口要求的所有方法，就相当于"符合职位要求"**

## 另一个例子：

```go 

```


**总结**：接口定义"需要做什么"，结构体通过实现方法来定义"具体怎么做"。
