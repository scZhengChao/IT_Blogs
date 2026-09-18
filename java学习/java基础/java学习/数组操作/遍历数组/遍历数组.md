# 遍历数组

## 目录

- [打印数组内容](#打印数组内容)
- [嵌套循环](#嵌套循环)

通过`for`循环就**可以遍历数**组。因为数组的每个元素都可以通过索引来访问，因此，使用标准的`for`循环可以完成一个数组的遍历：

```java 
// 遍历数组
public class Main {
    public static void main(String[] args) {
        int[] ns = { 1, 4, 9, 16, 25 };
        for (int i=0; i<ns.length; i++) {
            int n = ns[i];
            System.out.println(n);
        }
    }
}

```


第二种方式是使用`for each`循环，直接迭代数组的每个元素：(**增强**\*\*`for`\*\***循环**)

```java 
// 遍历数组
public class Main {
    public static void main(String[] args) {
        int[] ns = { 1, 4, 9, 16, 25 };
        for (int n : ns) {
            System.out.println(n);
        }
    }
}

```


### 打印数组内容

直接打印数组变量，得到的是数组在JVM中的引用地址：

```java 
int[] ns = { 1, 1, 2, 3, 5, 8 };
System.out.println(ns); // 类似 [I@7852e922

```


这并没有什么意义，因为我们希望打印的数组的元素内容。因此，使用`for each`循环来打印它：

```java 
int[] ns = { 1, 1, 2, 3, 5, 8 };
for (int n : ns) {
    System.out.print(n + ", ");
}

```


使用`for each`循环打印也很麻烦。**幸好Java标准库提供了**\*\*`Arrays.toString()`，可以快速打印数组内容 \*\*：

```java 
// 遍历数组
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] ns = { 1, 1, 2, 3, 5, 8 };
        System.out.println(Arrays.toString(ns));
    }
}

```


# 嵌套循环

可以**退出外层循环；嵌套；**

```java 
wc:for (int i = 0; i < arr.length; i++) {
      for (int j = 0; j < arr[i].length; j++) {
          int x = r.nextInt(arr.length);
          int y = r.nextInt(arr[x].length);
          int temp = arr[i][j];
          arr[i][j]=arr[x][y];
          arr[x][y]=temp;
          break wc;
      }
  } 
```
