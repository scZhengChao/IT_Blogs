# 转型注意instance

## 目录

- [Java 14](#Java-14)

* `instanceof`实际上判断一个**变量所指向的实例是否是指定类型，或者这个类型的子类**
* **变量所指向的实例是否是指定类型，或者这个类型的子类**。
* **一个引用变量为**\*\*`null`****，那么对任何****`instanceof`****的判断都为****`false`。\*\*​

为了避免向下转型出错，Java提供了`instanceof`操作符，可**以先判断一个实例究竟是不是某种类型：**

```java 
Person p = new Person();
System.out.println(p instanceof Person); // true
System.out.println(p instanceof Student); // false

Student s = new Student();
 System.out.println(s instanceof Person); // true
System.out.println(s instanceof Student); // true 

Student n = null;
System.out.println(n instanceof Student); // false
```


`instanceof`实际上判断一个**变量所指向的实例是否是指定类型，或者这个类型的子类**。如果**一个引用变量为`null`****，那么对任何****`instanceof`****的判断都为****`false`。**

利用`instanceof`，在向下转型前可以先判断：

```java 
Person p = new Student();
if (p instanceof Student) {
    // 只有判断成功才会向下转型:
    Student s = (Student) p; // 一定会成功
}

```


# Java 14

从Java 14开始，判断`instanceof`后，**可以直接转型为指定变量，避免再次强制转型**。例如，对于以下代码：

```java 
Object obj = "hello";
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.toUpperCase());
}

```


可以改写如下：

```java 
// instanceof variable:
public class Main {
    public static void main(String[] args) {
        Object obj = "hello";
        if (obj instanceof String s) {
            // 可以直接使用变量s:
            System.out.println(s.toUpperCase());
        }
    }
}

```


这种使用`instanceof`的写法更加简洁。
