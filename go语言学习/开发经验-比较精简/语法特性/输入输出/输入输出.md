# 输入输出

## 目录

- [输出](#输出)
- [输入](#输入)

## 输出

输出一句`Hello 世界!`，比较常用的有三种方法，第一种是调用`os.Stdout`

```go 
os.Stdout.WriteString("Hello 世界!")

```


**第二种是使用内置函数println**

```scala 
println("Hello 世界!")

```


第三种也是\*\*最推荐的一种就是调用`fmt`****包下的****`Println`\*\***函数**

```go 
fmt.Println("Hello 世界!")

```


`fmt.Println`会用到反射，因此输出的内容通常更容易使人阅读，不过性能很差强人意。

## 输入

输入的话是通常使用`fmt`包下提供的三个函数

```go 
// 扫描从os.Stdin读入的文本，根据空格分隔，换行也被当作空格
func Scan(a ...any) (n int, err error) 

// 与Scan类似，但是遇到换行停止扫描
func Scanln(a ...any) (n int, err error)

// 根据格式化的字符串扫描
func Scanf(format string, a ...any) (n int, err error)

```


需要注意的是，Go中输入的默认分隔符号是空格，下面看几个例子：

```go 
func main() {
   var s, s2 string
   fmt.Scan(&s, &s2)
   fmt.Println(s, s2)
}

```


```text 
a
b
a b

```


使用`fmt.Scanln`

```go 
func main() {
  var s, s2 string
  fmt.Scanln(&s, &s2)
  fmt.Println(s, s2)
}
```


```markdown 
a b
a b

```


使用`fmt.Scanf`

```go 
func main() {
   var s, s2, s3 string
   scanf, err := fmt.Scanf("%s %s \n %s", &s, &s2, &s3)
   if err != nil {
      fmt.Println(scanf, err)
   }
   fmt.Println(s)
   fmt.Println(s2)
   fmt.Println(s3)
}

```


```text 
aa bb
cc
aa
bb
cc

```
