# 多维数组

## 目录

- [二维数组](#二维数组)

二维数组概述

- 二维数组：元素为**一维数组**的数组
- 二维数组中存的是**一维数组的地址；**

定义格式：

- 数据类型\[]\[] 变量名； `int[][] arr`;
- 数据类型 变量名\[]\[]； `int arr[][]`;
- 数据类型\[] 变量名\[]； `int[] arr[]`;

```java 
public class ArrayDemo5 {
    public static void main(String[] args) {
        // 二维数组的声明
        // 三种形式
        // 声明int类型的二维数组
        int[][] intArray;
        // 声明float类型的二维数组
        float floatArray[][];
        // 声明double类型的二维数组
        double[] doubleArray[];
        
         // 创建一个三行三列的int类型的数组 
        intArray = new int[3][3];
        System.out.println("intArray数组的第3行第2列的元素为：" + intArray[2][1]);
        // 为第2行第3个元素赋值为9
        intArray[1][2] = 9;
        System.out.println("intArray数组第2行第3列的元素为:" + intArray[1][2]);
        // 声明数组的同时进行创建
        char[][] ch = new char[3][5];
       
         // 静态初始化  
        int[][] arr = new int[][]{{1,2,3},{4,5},{6,7,8,9}};

    }
}
```


### 二维数组

二维数组就是数组的数组。定义一个二维数组如下

```java 
// 二维数组
public class Main {
    public static void main(String[] args) {
        int[][] ns = {
            { 1, 2, 3, 4 },
            { 5, 6, 7, 8 },
            { 9, 10, 11, 12 }
        };
        System.out.println(ns.length); // 3
    }
}

```


因为`ns`包含3个数组，因此，`ns.length`为`3`。实际上`ns`在内存中的结构如下：

![](./image/image__gQKhn_Mk5.png)

二维数组的**每个数组元素的长度并不要求相同，** 例如，可以这么定义`ns`数组：

```c# 
int[][] ns = {
    { 1, 2, 3, 4 },
    { 5, 6 },
    { 7, 8, 9 }
};

```


这个二维数组在内存中的结构如下：

![](./image/image_6tIRodf1RX.png)

要打印一个二维数组，可以使用两层嵌套的for循环：

```java 
for (int[] arr : ns) {
    for (int n : arr) {
        System.out.print(n);
        System.out.print(', ');
    }
    System.out.println();
}

```


或者使用Java标准库的`Arrays.deepToString()`：

```java 
// 二维数组
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[][] ns = {
            { 1, 2, 3, 4 },
            { 5, 6 },
            { 7, 8, 9 }
        };
        System.out. println(Arrays.deepToString(ns));
     }
}
```
