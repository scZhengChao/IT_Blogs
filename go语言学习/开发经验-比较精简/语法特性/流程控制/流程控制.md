# 流程控制

## 目录

- [switch](#switch)
  - [label](#label)
  - [goto](#goto)

# switch

通过`fallthrough`**关键字来继续执行相邻的下一个分支。**

```go 
func main() {
   num := 2
   switch {
   case num >= 0 && num <= 1:
      num++
   case num > 1:
      num--
      fallthrough / / 执行完该分支后，会继续执行下一个分支
    case num < 0:
      num += num
   }
   fmt.Println(num)
}
```


## label

标签语句，给一个代码块打上标签，可以是`goto`，`break`，`continue`的目标。例子如下：

```go 
func main() {
  A: 
    a := 1
  B:
    b := 2
}

```


单纯的使用标签是没有任何意义的，需要结合其他关键字来进行使用。

## goto

`goto`将**控制权**传递给在**同一函数**中**对应标签**的语句，示例如下

```go 
func main() {
   a := 1
   if a == 1 {
      goto A
   } else {
      fmt.Println("b")
   }
A:
   fmt.Println("a")
}

```


在实际应用中`goto`用的很少，跳来跳去的很降低代码可读性，性能消耗也是一个问题。
