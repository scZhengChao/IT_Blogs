# 重写

在继承关系中，**子类如果定义了一个与父类方法签名完全相同的方法，被称为覆写（Override）。**

在子类`Student`中，覆写这个`run()`方法：

```typescript 
class Student extends Person {
    @Override
    public void run() {
        System.out.println("Student.run");
    }
}

```


`Override`和`Overload`不同的是 **，如果方法签名不同，就是Overload，Overload方法是一个新方法**；如果**方法签名相同，并且返回值也相同，就是`Override`。**

> 注意
> **方法名相同，方法参数相同，但方法返回值不同，也是不同的方法。在Java程序中，出现这种情况，编译器会报错。**

```java 
class Person {
    public void run() { … }
}

class Student extends Person {
    // 不是Override，因为参数不同:
    public void run(String s) { … }
    // 不是Override，因为返回值不同:
    public int run() { … }
}

```


**加上@Override可以让编译器帮助检查是否进行了正确的覆写**。希望进行覆写，但是不小心写错了方法签名，编译器会报错。

```java 
// override
public class Main {
    public static void main(String[] args) {
    }
}

class Person {
    public void run() {}
}

public class Student extends Person {
    @Override // Compile error!
    public void run(String s) {}
}

```


但是`@Override`**不是必需的。**

在上一节中，我们已经知道，引用变量的声明类型可能与其实际类型不符，例如：

```java 
Person p = new Student();

```


现在，我们考虑一种情况，如果子类覆写了父类的方法：

```java 
// override
public class Main {
    public static void main(String[] args) {
        Person p = new Student();
        p.run(); // 应该打印Person.run还是Student.run?
    }
}

class Person {
    public void run() {
        System.out.println("Person.run");
    }
}

class Student extends Person {
    @Override
    public void run() {
        System.out.println("Student.run");
    }
}

```


那么，一个实际类型为`Student`，引用类型为`Person`的变量，调用其`run()`方法，调用的是`Person`还是`Student`的`run()`方法？

运行一下上面的代码就可以知道，实际上调用的方法是`Student`的`run()`方法。因此可得出结论：

Java的实例方法调用是基于运行时的实际类型的动态调用，而非变量的声明类型。

这个非常重要的特性在面向对象编程中称之为多态。它的英文拼写非常复杂：Polymorphic。

[覆写Object方法](./覆写Object方法/index.md "覆写Object方法")

[super](./super/index.md "super")

[final](./final/index.md "final")

[static](./static/index.md "static")
