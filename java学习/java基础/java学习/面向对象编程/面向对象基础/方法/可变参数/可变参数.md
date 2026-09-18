# 可变参数

## 目录

- [数组⇒可变参数（反过来不行）](#数组可变参数反过来不行)
- [重复定义](#重复定义)
- [优先级最低](#优先级最低)

* 可变参数列表：
  - 可变参数一定是方法中的**最后一个参数**
  - **数组可以传递给可变参数的方法，** 反之不行
  - 在重载中，含有**可变参数的方法是最后被选中的**；可变参数⇒数组

##### 数组⇒可变参数（反过来不行）

> **数组**可以传递给可变参数的方法；反过来不行；要数组必须得传数组

```java 
public void search(int n, int... a) {
    boolean flag = false;
    for (int a1 : a) {
        if (a1 == n) {
            flag = true;
            break;
        }
    }
    if (flag) {
        System.out.println("找到了！" + n);
    } else {
        System.out.println("没找到！" + n);
    }
}

public static void main(String[] args) {
    ArgsDemo1 ad1 = new ArgsDemo1();
     ad1.search(3, 1, 2, 3, 4, 5);
      int[] a = {1, 2, 3, 4, 5};
     ad1.search(3, a);
}
```


##### 重复定义

> **可变参数**和**同类型数组**   **认为是重复定义**；**而不是重载**
> 在方法定义中，认为**当前的两个search方法重复定义**，而不是重载！

```java 
//查找
 public void search(int n, int... a) {
     boolean flag = false;
    for (int a1 : a) {
        if (a1 == n) {
            flag = true;
            break;
        }
    }
    if (flag) {
        System.out.println("找到了！" + n);
    } else {
        System.out.println("没找到！" + n);
    }
}

 public void search(int n, int[] a) { 
}

public static void main(String[] args) {
    ArgsDemo1 ad1 = new ArgsDemo1();
    ad1.search(3, 1, 2, 3, 4, 5);
    int[] a = {1, 2, 3, 4, 5};
}
```


##### 优先级最低

> 重载时；条件满足的方法中；**可变参数优先级最低****可变参数列表所在的方法是最后被访问的。**

```java 
package com.imooc.method;

public class ArgsDemo3 {
    //可变参数列表所在的方法是最后被访问的。
    public int plus(int a, int b) {
        System.out.println("不带可变参数的方法被调用！");
        return a + b;
    }

    public int plus(int... a) {
        int sum = 0;
        for (int n : a) {
            sum = sum + n;
        }
        System.out.println("带可变参数的方法被调用！");
        return sum;
    }

    public static void main(String[] args) {
        ArgsDemo3 ad = new ArgsDemo3();
        System.out.println("和为：" + ad.plus(1, 2));
    }
}
```
