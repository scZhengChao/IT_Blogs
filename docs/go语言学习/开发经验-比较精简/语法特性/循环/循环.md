# 循环

## 目录

- [语句](#语句)
  - [for range](#for-range)
  - [break](#break)
  - [continue](#continue)

# 语句

在Go中，**仅有一种循环语句：`for`**；Go抛弃了`while`语句，`for`语句可以被当作`while`来使用。

语句格式如下

```c++ 
for init statement; expression; post statement {
  execute statement
}

```


当只保留循环条件时，就变成了`while`。

```typescript 
for expression {
  execute statement
}

```


这是一个死循环

```javascript 

for {
  execute statement
}


```


## for range

`for range`可以更加方便的**遍历一些可迭代的数据结构**，例如：数组，切片，字符串，映射表，通道。语句格式如下：

```go 
for index, value := range iterable {
  
}

```


`index`为可迭代数据结构的索引，`value`则是对应索引下的值，例如使用`for range`遍历一个字符串。

```go 
func main() {
   sequence := "hello world"
   for index, value := range sequence {
      fmt.Println(index, value)
   }
}

```


对于每一个种数据结构，`for range`的实现都可能不同，后续也会讲到，可以前往[Go - for statement](https://go.dev/ref/spec#For_statements "Go - for statement")以了解更多细节。

## break

`break`关键字会\*\*终止最内层的`for`****循环**，结合标签一起使用**可以达到终止外层循环的效果，\*\*例子如下：这是一个双循环

```go 
func main() {
Out:
  for i := 0; i < 10; i++ {
    for j := 0; j < 10; j++ {
      if i > j {
        break Out
      }
      fmt.Println(i, j)
    }
  }
}

```


输出

```markdown 
0 0
0 1
0 2
0 3
0 4
0 5
0 6
0 7
0 8
0 9

```


## continue

`continue`关键字会跳过**最内层循环的本次迭代**，直接进入下一次迭代，**结合标签使用可以达到跳过外层循环的效果**，例子如下

```go 
func main() {
Out:
  for i := 0; i < 10; i++ {
    for j := 0; j < 10; j++ {
      if i > j {
        continue Out
      }
            fmt.Println(i, j)
    }
  }
}

```


输出

```markdown 
0 0
0 1
0 2
0 3
0 4
0 5
0 6
0 7
0 8
0 9

```
