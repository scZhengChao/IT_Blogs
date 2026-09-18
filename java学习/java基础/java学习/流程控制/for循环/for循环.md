# for循环

## 目录

- [灵活使用for循环](#灵活使用for循环)
- [for each循环](#for-each循环)

除了`while`和`do while`循环，Java使用最广泛的是`for`循环。

`for`循环的功能非常强大，它使用计数器实现循环。`for`循环会先初始化计数器，然后，在每次循环前检测循环条件，在每次循环后更新计数器。计数器变量通常命名为`i`。

```java 
// for
public class Main {
    public static void main(String[] args) {
        int sum = 0;
        for (int i=1; i<=100; i++) {
            sum = sum + i;
        }
        System.out.println(sum);
    }
}

```


```typescript 
for (初始条件; 循环检测条件; 循环后更新计数器) {
    // 执行语句
}

```


注意`for`循环的初始化计数器总是会被执行，并且`for`循环也可能循环0次。

使用`for`循环时，**千万不要在循环体内修改计数器！在循环体中修改计数器常常导致莫名其妙的逻辑错误**。对于下面的代码：

```java 
// for
public class Main {
    public static void main(String[] args) {
        int[] ns = { 1, 4, 9, 16, 25 };
        for (int i=0; i<ns.length; i++) {
            System.out.println(ns[i]);
            i = i + 1;
        }
    }
}

```


如果希望只访问索引号为偶数的数组元素，应该把`for`循环改写为：

```java 
int[] ns = { 1, 4, 9, 16, 25 };
for (int i=0; i<ns.length; i=i+2) {
    System.out.println(ns[i]);
}

```


使用`for`循环时，计数器变量`i`要尽量定义在`for`循环中：如果变量`i`定义在`for`循环外：

```java 
int[] ns = { 1, 4, 9, 16, 25 };
int i;
for (i=0; i<ns.length; i++) {
    System.out.println(ns[i]);
}
// 仍然可以使用i
int n = i;

```


那么，退出`for`循环后，变量`i`仍然可以被访问，**这就破坏了变量应该把访问范围缩到最小的原则。**

### 灵活使用for循环

`for`循环还可以缺少初始化语句、循环条件和每次循环更新语句，例如：

```c++ 
// 不设置结束条件:
for (int i=0; ; i++) {
    ...
}
```


```c 
// 不设置结束条件和更新语句:
for (int i=0; ;) {
    ...
}
```


```c 
// 什么都不设置:
for (;;) {
    ...
}
```


通常不推荐这样写，但是，某些情况下，是可以省略`for`循环的某些语句的。

### for each循环

`for`循环经常用来遍历数组，因为通过计数器可以根据索引来访问数组的每个元素：

但是，很多时候，我们实际上**真正想要访问的是数组每个元素的值。** Java还提供了另一种for each循环，它可以更简单地遍历数组：

```java 
// for each
public class Main {
    public static void main(String[] args) {
        int[] ns = { 1, 4, 9, 16, 25 };
        for (int n : ns) {
            System.out.println(n);
        }
    }
}

```


和`for`循环相比，`for each`循环的变量n不再是计数器，而是直接对应到数组的每个元素。`for each`循环的写法也更简洁。但是，`for each`循环无法指定遍历顺序，也无法获取数组的索引。

除了数组外，`for each`循环能够遍历所**有“可迭代”的数据类型，** 包括后面会介绍的`List`、`Map`等。
