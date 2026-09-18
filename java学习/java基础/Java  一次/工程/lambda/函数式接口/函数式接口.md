# 函数式接口

## 目录

- [介绍](#介绍)

# 介绍

**只有一个抽象方法需要重写的接口，函数式接口**。

函数式接口是**允许**有**其他的非抽象方法**的存在例如**静态方法，默认方法，私有方法。**
为了标识接口是一个函数式接口，可以在接口之上加上一个注解 @`FunctionalInterface`  在JDK中 java.util.function 包中的所有接口都是函数式接口。我们学习线程时学习的Runnable也是函数式接口。

```java 
package com.lamda.demo1;

public class Test {
    public static void main(String[] args) {
        Swing swing = new Swing() {
            @Override
            public void swimg(){
                System.out.println("sasfasf");
            }
        };

        method(swing);
        // 使用lambda 简化代码
        method(()->{
            System.out.println("1111111");
        });

    }
    public static void method(Swing sw){
        sw.swimg();
    }
}

```
