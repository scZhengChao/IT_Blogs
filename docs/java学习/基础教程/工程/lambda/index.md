# lambda

## 目录

- [作用](#作用)
- [函数式编程](#函数式编程)
- [特点](#特点)

# 作用

> 作用：**简化程序中匿名内部类的书写**

![](./assets/image/image_vHcDV5AQAQ.png)

# 函数式编程

在数学中 \*\*，函数就是有输入量、输出量的一套计算方案，也就是“拿数据做操作”\*\*面向对象思想强调“必须通过对象的形式来做事情”函数式思想则尽量忽略面向对象的复杂语法：“强调做什么，而不是以什么形式去做”而我们要学习的Lambda表达式就是函数式思想的体现

![](./assets/image/image_wXNGuwTYOw.png)

[函数式接口](./函数式接口/index.md "函数式接口")

```java title="排序"
package com.lamda.demo1;

import java.util.ArrayList;
import java.util.Collections;

public class ListDemo {
    public static void main(String[] args) {
        ArrayList<Integer> arr = new ArrayList<>();
        Collections.addAll(arr,1,2,4,5,65);
        Collections.sort(arr,(Integer a,Integer b)->{
            return  b-a;
        });
        System.out.println(arr.toString());
    }
}

```


# 特点

- 只针对**函数式接口**。且接口中**只有抽象一个方法；**
- 只是为了**简化代码；**

[和匿名内部类的区别](./和匿名内部类的区别/index.md "和匿名内部类的区别")

[省略模式](./省略模式/index.md "省略模式")
