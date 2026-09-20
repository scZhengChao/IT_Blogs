# 自定义注解

## 目录

- [格式  ](#格式)
  - [属性类型必须](#属性类型必须)
- [案例](#案例)
  - [一](#一)
- [特殊属性](#特殊属性)

格式

自定义注解就是自己做一个注解来使用。

```java 
public @interface 注解名称 { 
  public 属性类型 属性名() default 默认值; 
}
```


![](./image/image_LPCZ-tfdx1.png)

## 属性类型必须

- 8**种数据数据类型**
- **String，Class，注解类型，枚举类**
- **以上类型的一维数组形式**

# 案例

## 一

```java 
package com.itheima.demo1;

//自定义注解
public @interface MyAnnotation {
    //在注解中只能定义属性：  public 属性类型  属性名() default 默认值

    /* 属性类型必须是以下范围之一：
       1、 8种基本数据类型
       2、 String类型
       3、 Class类型
       4、 枚举类型
       5、 注解类型
       6、 以上所有类型的一维数组形式。  例： String[] 、Class[]
    * */

    public String name();
    public double price() default 99.0;
}

```


```java 
package com.itheima.demo1;

@MyAnnotation(name = "测试") //没有指定prive属性，默认就使用：99.0
public class TestAnnotation {

    @MyAnnotation(name = "数据",price = 123)
    private String name;


    @MyAnnotation(name = "构造方法")
    public TestAnnotation(){
    }

    @MyAnnotation(name = "成员方法", price = 100)
    public void method(@MyAnnotation(name = "参数") String msg){

    }
}。

```


# 特殊属性

- value属性，如果只有一个value属性的情况下，**使用value属性的时候可以省略value名称不写!!**
- 但是如果有多个属性,  **且多个属性没有默认值，那么value名称是不能省略的。**

```java 
package com.itheima.demo2;

//自定义注解
public @interface Book {
    //属性
    public String value();
    public double price() default 99.0; //有默认价格
    public String[] author(); //有多个作者
}

```


```java 
package com.itheima.demo2;

import org.junit.Test;

@Book(value = "Java高级开发", author = {"黑马", "老唐", "小杨"})

 //@Book("Java高级开发")//如果自定义注解仅有一个value属性，且其他属性都有默认值的情况下，可以省略value属性
 public class BookTest {



    @Test //只能书写在方法上
    public void testMethod(){

    }
}
```
