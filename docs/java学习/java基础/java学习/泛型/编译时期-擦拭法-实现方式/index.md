# 编译时期-擦拭法-实现方式

## 目录

- [小结](#小结)

泛型是一种类似”模板代码“的技术，不同语言的泛型实现方式不一定相同。

Java语言的泛型实现方式是擦拭法（Type Erasure）。

所谓擦拭法是指，**虚拟机对泛型其实一无所知，所有的工作都是编译器做的。**

例如，我们编写了一个泛型类`Pair<T>`，这是编译器看到的代码：

```c# 
public class Pair<T> {
    private T first;
    private T last;
    public Pair(T first, T last) {
        this.first = first;
        this.last = last;
    }
    public T getFirst() {
        return first;
    }
    public T getLast() {
        return last;
    }
}

```


而**虚拟机根本不知道泛型。这是虚拟机执行的代码：**

```java 
public class Pair {
    private Object first;
    private Object last;
    public Pair(Object first, Object last) {
        this.first = first;
        this.last = last;
    }
    public Object getFirst() {
        return first;
    }
    public Object getLast() {
        return last;
    }
}

```


因此，Java使用擦拭法实现泛型，导致了：

- **编译器把类型**\*\*`<T>`****视为****`Object`；\*\*​
- **编译器根据**\*\*`<T>`\*\***实现安全的强制转型。**

使用泛型的时候，我们**编写的代码也是编译器看到的代码：**

```java 
Pair<String> p = new Pair<>("Hello", "world");
String first = p.getFirst();
String last = p.getLast();

```


**而虚拟机执行的代码并没有泛型：**

```java 
Pair p = new Pair("Hello", "world");
String first = (String) p.getFirst();
String last = (String) p.getLast();

```


所以，`Java`**的泛型是由编译器在编译时实行的，编译器内部永远把所有类型**\*\*`T`****视为****`Object`****处理**，但是，在需要**转型的时候，编译器会根据`T`\*\***的类型自动为我们实行安全地强制转型。**

了解了`Java`泛型的实现方式——擦拭法，我们就知道了`Java`**泛型的局限**：

### 小结

Java的泛型是采用擦拭法实现的；

**擦拭法决定了泛型**\*\*`<T>`：\*\*​

- **不能是基本类型，例如：****`int`****；**
- **不能获取带泛型类型的**\*\*`Class`****，例如：****`Pair<String>.class`；\*\*​
- **不能判断带泛型类型的类型，例如：****`x instanceof Pair<String>`****；**
- **不能实例化**\*\*`T`****类型，例如：****`new T()`。\*\*​

**泛型方法要防止重复定义方法，例如：****`public boolean equals(T obj)`****；**

**子类可以获取父类的泛型类型**\*\*`<T>`。\*\*​

[局限](./局限/index.md "局限")

[错误](IT/服务端/java学习/java基础/java学习/泛型/编译时期-擦拭法-实现方式/错误/错误.md "错误")
