# 阻止继承

正常情况下，只要某个class\*\*没有`final`\*\***修饰符**，那么任何类都可以从该class继承。

从Java 15开始，允许使用`sealed`修饰class，并通过`permits`明确写出**能够从该class继承的子类名称。**

例如，定义一个`Shape`类：

```java 
public sealed class Shape permits Rect, Circle, Triangle {
    ...
}

```


上述`Shape`类就是一个`sealed`类，它只允许指定的3个类继承它。如果写：

```java 
public final class Rect extends Shape {...}

```


是没问题的，因为`Rect`出现在`Shape`的`permits`列表中。但是，如果定义一个`Ellipse`就会报错：

```java 
public final class Ellipse extends Shape {...}
// Compile error: class is not allowed to extend sealed class: Shape

```


原因是`Ellipse`并未出现在`Shape`的`permits`列表中。这种`sealed`类主要用于一些框架，防止继承被滥用。

`sealed`类在Java 15中目前是预览状态，要启用它，必须使用参数`--enable-preview`和`--source 15`。
