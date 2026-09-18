# 切片原理

## 目录

- [数据结构](#数据结构)

在了解切片的结构之前，通过几个案例来引入问题，通常会认为**数组是值类型，切片是引用类型**，或者说**切片本身可以看作一个指针，指针指向的正是底层数组。**

```go 
func main() {
   slice := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}
   println(&slice)
   println(&slice[0])
}

```


前者是切片指针的地址，后者是切片底层数组的地址。

```text 
0xc000059f58
0xc000059f08

```


官方文档中有说明使用`append`函数给切片添加元素时，**当切片容量不足时，会创建一个新的底层数组。**

```go 
func main() {
   slice := make([]int, 0, 0)
   println(slice)
   println(&slice)
   slice = append(slice, 1)
   println(slice)
   println(&slice)
}


```


```6502 assembly 
[0/0]0xc000059f50
0xc000059f58     
[1/1]0xc000088000
0xc000059f58     

```


`println(slice)`输出指针所指向的地址，而`&slice`则是指针的地址，切片的初始容量为0，当添加一个元素后，因容量不足，就会分配一个新的底层数组，所以在添加前后，切片指向的是两个不同的底层数组。那如果接下来这种情况呢？

```go 
func main() {
  slice := []int{1, 2}
  println(slice)
  println(&slice)
  add(slice)
  println(slice)
  println(&slice)
}

func add(s []int) {
  println(s)
  println(&s)
  s = append(s, 1, 2, 3, 4, 5, 6, 7, 8)
  println(s)
  println(&s)
}

```


```text 
[2/2]0xc000059f30  
0xc000059f40       
[2/2]0xc000059f30  
0xc000059f58       
[10/10]0xc0000180f0
0xc000059f58       
[2/2]0xc000059f30  
0xc000059f40   

```


初始的`slice`容量只有2，指向的底层数组地址为`0xc000059f30` ，`slice`的地址为`0xc000059f40` ，**由于Go中的函数参数是值传递的**，所以形参`s`拷贝了`slice`的值，**而**\*\*`slice`****的值就是底层数组的地址**，所以`slice`和`s`指向的都是同一个底层数组。而后使用`append`函数添加了9个元素，**由于容量不足，于是Go给****`s`****分配了一个新的底层数组，于是****`s`****指向的底层数组地址变为****`0xc0000180f0`，但是改变形参的值，完全不会影响到实参的值，因为两者本身的内存地址不同，\*\*这导致了`slice`指向的底层数组地址依旧是`0xc000059f30`，结果就是`add`函数并没有将元素成功添加进`slice`。

继续思考一个问题，那如果容量足够呢？看下面的一个例子，将切片的初始容量设置为了10000。

```go 
func main() {
  slice := make([]int, 2, 10000)
  println(slice)
  println(&slice)
  println(len(slice))
  add(slice)
  println(slice)
  println(&slice)
  println(len(slice))
  fmt.Println(slice)
}

func add(s []int) {
  println(s)
  println(&s)
  println(len(s))
  s = append(s, 1, 2, 3, 4, 5, 6, 7, 8)
  println(s)
  println(&s)
  println(len(s))
  fmt.Println(s)
}

```


```6502 assembly 
[2/10000]0xc00011a000 
0xc000115f58          
2                     
[2/10000]0xc00011a000 
0xc000115f18          
2                     
[10/10000]0xc00011a000
0xc000115f18          
10                    
[0 0 1 2 3 4 5 6 7 8] 
[2/10000]0xc00011a000 
0xc000115f58          
2                     
[0 0]    

```


从理论上来说，容量足够，就不会扩容，也就不会分配新数组，那元素应该可以添加成功。但是结果中可以看出，尽管全程操作的底层数组都是同一个，`add`函数执行完后，从原切片的角度来看依旧没有成功添加。在整个过程中，有一个点很关键，那就是长度的变化，在`add`函数内部，添加元素后的切片长度为10，而在函数执行完后，原切片的长度依旧为2，**这就导致了都是同一个底层数组，但是输出的元素却不同，而究竟为何会如此，这就引出了本节真正的内容，切片的原理。**

## 数据结构

事实上，切片其实是一个结构体，该类型为`runtime.slice`。

```go 
type slice struct {
  array unsafe.Pointer
  len   int
  cap   int
}

```


该结构体是不对外暴露的，官方提供了一个对外暴露的版本，`reflect.SliceHeader`。

```go 
type SliceHeader struct {
  Data uintptr
  Len  int
  Cap  int
}

```


后者才是切片的运行时表示，因此就可以通过`unsafe.Pointer`来访问其字段和底层数组，同一个底层数组可以被多个切片引用。

```go 
func main() {
   slice := []int{1, 2, 3, 4, 5}
   arr := *(*[5]int)(unsafe.Pointer((*(*reflect.SliceHeader)(unsafe.Pointer(&slice))).Data))
   fmt.Println(arr[0])
}

```


```go 
1
```


再回去看之前的案例，通过Pointer直接访问底层数组

```go 
func main() {
  slice := make([]int, 2, 10000)
  add(slice)
  fmt.Println(len(slice))
  p := unsafe.Pointer((*reflect.SliceHeader)(unsafe.Pointer(&slice)).Data)
  for i := 0; i < 10; i++ {
    fmt.Printf("%d ", *(*int)(unsafe.Add(p, uintptr(i)*unsafe.Sizeof(int(0)))))
  }
}

func add(s []int) {
  s = append(s, 1, 2, 3, 4, 5, 6, 7, 8)
  fmt.Println(len(s))
}

```


切片`slice`与切片`s`是两个不同的切片结构体，函数参数是值传递的，因此`s`是`slice`的值拷贝，但是它们指向的都是同一个底层数组，在`add`函数中向切片`s`添加了8个元素，由于容量足够而没有扩容，所以操作的都是同一个底层数组，因此底层数组也确确实实的被修改了，**`append`****函数的返回值是一新的切片结构体，于是对于切片****`s`****而言，长度被更新了，但是这对于作为实参的切片****`slice`****而言一点影响也没有，它认为底层数组的元素数量依旧是2个，所以无论是通过索引取值还是遍历都无法访问长度以外的元素，当下标大于1的时候也会抛出****`panic`**。为了证明一点可以使用`unsafe` 操作通过内存地址来访问底层数组，通过输出结果可以发现，尽管`slice`显示的长度只有2，但底层数组的有效元素个数确实为10，并且可以通过指针运算直接读取。就算持有相同的数组引用，即便长度相同，也无法访问到数组的其余元素，这是切片的安全性的体现，使用切片的调用者只需要关注切片层面，不需要关注底层数组的变化。

```text 
10
2                   
0 0 1 2 3 4 5 6 7 8 

```


也可以手动更换切片底层数组

```go 
func main() {
   slice := make([]int, 2, 10000)
   fmt.Println(len(slice))
   arr := [5]int{9, 8, 7, 6, 5}
   (*reflect.SliceHeader)(unsafe.Pointer(&slice)).Data = uintptr(unsafe.Pointer(&arr))
   fmt.Println(len(slice))
   fmt.Println(slice[0])
}

```


可以看到指向一个新的底层数组后，通过切片获取的元素也发生变化。

```text 
2
2
9

```
