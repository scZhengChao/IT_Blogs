# 反射

什么是反射？

反射就是`Reflection`，`Java`的反射是指程序在**运行期可以拿到一个对象的所有信息**。

正常情况下，如果我们要调用一个对象的方法，或者访问一个对象的字段，通常会传入对象实例：

```java 
// Main.java
import com.itranswarp.learnjava.Person;

public class Main {
    String getFullName(Person p) {
        return p.getFirstName() + " " + p.getLastName();
    }
}

```


但是，如果不能获得`Person`类，只有一个`Object`实例，比如这样：

```typescript 
String getFullName(Object obj) {
    return ???
}

```


怎么办？有童鞋会说：强制转型啊！

```java 
String getFullName(Object obj) {
    Person p = (Person) obj;
    return p.getFirstName() + " " + p.getLastName();
}

```


强制转型的时候，你会发现一个问题：**编译上面的代码，仍然需要引用**`Person`类。不然，去掉`import`语句，你看能不能编译通过？

所以，反射是**为了解决在运行期，对某个实例一无所知的情况下，如何调用其方法。**

![](./assets/image/image_Q0w8zAEBc1.png)

[](./反射概述-/index.md)

[Class类](./Class类/index.md "Class类")

[访问字段](./访问字段/index.md "访问字段")

[调用方法](./调用方法/index.md "调用方法")

[调用构造方法](./调用构造方法/index.md "调用构造方法")

[获取继承关系](./获取继承关系/index.md "获取继承关系")

[动态代理](IT/服务端/java学习/java基础/java学习/反射/动态代理/动态代理.md "动态代理")

[总结注意](IT/服务端/java学习/java基础/java学习/反射/总结注意/总结注意.md "总结注意")
