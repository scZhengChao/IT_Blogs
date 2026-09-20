# 成员内部类

## 目录

- [Inner Class](#Inner-Class)
  - [获取实例](#获取实例)
  - [作用域](#作用域)

* 内部类隐藏在外部类之内，更好的实现了信息隐藏。不允许随意访问；
* 内部类在外部使用时，\*\*无法直接实例化，需要借由外部类信息才能完成实例化  \*\*
* 内部类的**访问修饰符**，**可以任意，但是访问范围会受到影响**
* 内部类可以直接访问外部类的成员；如果出现同名属性，优先访问内部类中定义的
* 可以使用**外部类.this.成员**的方式，访问外部类中同名的信息
* **外部类访问内部类信息**，**需要通过内部类实例**，无法直接访问
* 内部类编译后.class文件命名：`外部类$内部类.class`

### Inner Class

如果一个类定义在另一个类的内部，这个类就是Inner Class：

```java 
class Outer {
    class Inner {
        // 定义了一个Inner Class
    }
}

```


上述定义的`Outer`是一个普通类，而`Inner`是一个Inner Class，它与普通类有个最大的不同 **，就是Inner Class的实例不能单独存在，必须依附于一个Outer Class的实例。示例代码如下：**

```java 
// inner class
public class Main {
    public static void main(String[] args) {
         Outer outer = new Outer("Nested"); // 实例化一个Outer
        Outer.Inner inner = outer.new Inner(); // 实例化一个Inner
         inner.hello();
    }
}

class Outer {
    private String name;

    Outer(String name) {
        this.name = name;
    }

    class Inner {
        void hello() {
             System.out.println("Hello, " + Outer.this.name);
         }
    }
}
```


观察上述代码，要实例化一个`Inner`，我们必须首先创建一个`Outer`的实例，然后，调用`Outer`实例的`new`来创建`Inner`实例：

```java 
Outer.Inner inner = outer.new Inner();

```


这是\*\*因为Inner Class除了有一个`this`****指向它自己，还隐含地持有一个Outer Class实例，可以用****`Outer.this`\*\***访问这个实例**。所以，**实例化一个Inner Class不能脱离Outer实例。**

Inner Class和普通Class相比，除了能引用Outer实例外，**还有一个额外的“特权”**，就是可以\*\*修改Outer Class的`private`****字段，**因为**Inner Class的作用域在Outer Class内部**，**所以能访问Outer Class的****`private`\*\***字段和方法**。

观察Java编译器编译后的`.class`文件可以发现，`Outer`类被编译为`Outer.class`，而`Inner`类被编译为\*\*`Outer$Inner.class`。\*\*​

##### 获取实例

```java 
public class Person {
    class Heart {
        private int num = 10;
    }
}

Person.Heart herat = new Person().new Heart()
```


##### 作用域

- 优先取内部类；找不到就取外部类
- 内部类如**何取外部类的属性**

```java 

class Person {
    private String name = "张三";
    int num = 30; // 外部类成员变量
    class Heart {
        private int rate; // 60~75
        int num = 20; // 内部类成员变量
        public void beats() {
            int num = 10; // 内部类方法中的局部变量
            // 访问局部变量
            System.out.println(num); // 10
            // 访问本类成员变量
            System.out.println(this.num); // 20
            // 访问外部类成员变量
            System.out.println(Person.this.num); // 30
        }
    }
}
```
