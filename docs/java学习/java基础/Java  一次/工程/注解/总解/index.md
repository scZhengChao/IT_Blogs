# 总解

- 认知：
  - **注解单独使用，没有任何意义。**
  - **通常注解会配合反射技术一起使用，常用于框架技术**
- 注解的定义：

```java 
public @interface 注解名{
    数据类型 属性名();
    数据类型 属性名() default 默认值;
    数据类型[] 属性名();
}

 注解中的数据类型可以有哪些：
    1. 8种基本数据类型
    2. 枚举
    3. String
    4. Class
    5. 注解
    6. 以上所有类型的一维数组形式
```


- 注解的使用：

```java 
@注解名
public class 类{

    @注解名(属性名=值)
    private String 成员变量;

    @注解名    //@Test
    public void 成员方法(int 参数){

    }   
}

```


- 元注解：
  - 作用：限定注解的使用位置、注解的生命周期
    - @Target //指定注解的使用位置
    - @Retention //设定注解的生命周期
      - SOURCE : 只能在源码中使用 。 例：@Override
      - CLASS ：可以用于源码中、字节码文件中 【默认】
      - RUNTIME ： 可以用于源码、字节码文件、程序运行 例：@Test

注解解析（注解存在的意义）

```java 
注解解析的步骤：
1、获取一个对象（构造器Constructor、成员变量Field、成员方法Method）
2、判断对象上是否有指定的注解
```


```java 
对象上有注解后，获取注解对象中的属性值    
```


```java 
//API：
//判断某个对象(类、接口、成员变量、构造器、成员方法)上是否有使用注解
boolean flag = isAnnotationPresent(注解.class)

//获取某个对象上的注解对象
注解名  对象 =   getAnnotation(注解.class)   

数据类型 变量 = 注解对象.属性;    
```


- 实例

```java 
//前置铺垫：
一张数据表 对应 类
一行记录 对应 对象
一个字段 对应 成员变量

create table t_student
(
sname varchar(20),
sage int
);

//类
class Student{
  private String name;
  private int age;
}



```
