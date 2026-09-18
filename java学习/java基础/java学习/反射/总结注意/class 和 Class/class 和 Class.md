# class 和 Class

## 目录

- [class](#class)
- [Class](#Class)

这种通过`Class`实例获取`class`信息的方法**称为反射（Reflection）。**

# class

- 除了`int`等基本类型外，Java的其他类型全部都是`class`（包括`interface`）
- 我们可以得出结论：`class`（包括`interface`）的**本质是数据类型**（`Type`）。**无继承关系的数据类型无法赋值：**

```java 
Number n = new Double(123.456); // OK
String s = new Double(123.456); // compile error!
```


# Class

- 以`String`类为例 \*\*，当JVM加载`String`****类时，它首先读取****`String.class`****文件到内存，然后，为****`String`****类创建一个****`Class`\*\***实例并关联起来：**
- 注意：这里的`Class`类型是一个名叫`Class`的`class`。它长这样：

```java 
public final class Class {
    private Class() {}
}
```


- **这个**\*\*`Class`****实例是JVM内部创建的，如果我们查看JDK源码，可以发现****`Class`****类的****构造方法是`private`****，只有JVM能创建****`Class`实例，****我们自己的Java程序是无法创建****`Class`\*\***实例的。**
- **所以，JVM持有的每个**\*\*`Class`****实例都指向一个数据类型（****`class`****或****`interface`）：\*\*​
- **并在实例中保存了该**\*\*`class`****的所有信息，包括类名、包名、父类、实现的接口、所有方法、字段等，因此，如果获取了某个****`Class`****实例****，我们就可以通过这个`Class`****实例获取到该实例对应的****`class`\*\***的所有信息。**
- **因为**\*\*`Class`****实例在JVM中是唯一的，所以，上述方法获取的****`Class`****实例****是同一个实例\*\*
