# Auto Boxing

## 目录

- [Integer](#Integer)
- [int→string](#intstring)
- [string → int](#string--int)
- [装箱](#装箱)
- [拆箱](#拆箱)

# Integer

> &#x20;默认初始值 是null

```java 
static Integer  valueOf(int i)
static Integer  valueOf(String s)

// 构造方法
Integer n = new Integer("199");  // 过时
Integer n2 = new Integer(12);  // // 过时

//静态方法
Integer n5 = Integer.valueOf(100);
Integer n6 = Integer.valueOf("100");


new Ingeter(100) == new Integer(100); // false

Integer t5 = 100; // 自动装箱
System.out.println(t5 == 100); //true。 自动拆箱 
Integer t6 = 100; // 等价=》 Integer.valueOf(100)
System.out.println(t6 == t5); // true; 


Integer five = 200;
System.out.println(five == 200);; // true
Integer six = 200;
System.out.println(five == six); // false

```


> **转谁就调用谁的方法**

因为`int`和`Integer`可以互相转换：

```java 
int i = 100;
Integer n = Integer.valueOf(i);
int x = n.intValue();

```


所以，Java编译器可以帮助我们自动在`int`和`Integer`之间转型：

```java 
Integer n = 100; // 编译器自动使用Integer.valueOf(int)
int x = n; // 编译器自动使用Integer.intValue()
```


**这种直接把**\*\*`int`****变为****`Integer`****的赋值写法，称为自动装箱（Auto Boxing），反过来，把****`Integer`****变为****`int`\*\***的赋值写法，称为自动拆箱（Auto Unboxing）。**

> 注意
> **自动装箱和自动拆箱只发生在编译阶段，目的是为了少写代码。**

装箱和拆箱会影响代码的执行效率，因为编译后的`class`代码是严格区分基本类型和引用类型的。并且，自动拆箱执行时可能会报`NullPointerException`：

```java 
// NullPointerException 
public class Main {
    public static void main(String[] args) {
        Integer n = null;
        int i = n;
    }
}
```


# int→string

```java 
String str = String.valueOf(100);
// 方式二；
String str = num + "";

```


# string → int

```java 
String str = "100";
Integer i = Integer.valueOf(str); // 装箱
int i2 = i.intValue(); // 拆箱


// 方式二
int num = Integer.parseInt(str);

```


# 装箱

把基本数据类型转换成包装类

```java title="装箱"
int t1 = 2;
 Integer t2 = t1;  // 自动
 
Integer t2 =  Integer.valueOf(t1);
 
Interger t3 = new Interger(t1) // 手动
```


```java 
Integer i = 100;
        i += 200;
        // 以下都死自动完成的；
        /**
         * li = i.intValue() + 200 // 底层拆箱
         * li = 300； // 装箱
         */
        System.out.println(i);
```


# 拆箱

```java title="拆箱"
int t2 = new Interger(1);  
int t5 =  t2.intValue()； // 拆箱
 
double t6 =  t2.doubleValue() // 1.0
```
