# 缓存

```java 
// == or equals?
public class Main {
    public static void main(String[] args) {
        Integer x = 127;
        Integer y = 127;
        Integer m = 99999;
        Integer n = 99999;
        System.out.println("x == y: " + (x==y)); // true
        System.out.println("m == n: " + (m==n)); // false
        System.out.println("x.equals(y): " + x.equals(y)); // true
        System.out.println("m.equals(n): " + m.equals(n)); // true
    }
}

```


仔细观察结果的童鞋可以发现，`==` 比较，较小的两个相同的`Integer`返回`true`，较大的两个相同的`Integer`返回`false`，这是因为`Integer`是不变类，编译器把`Integer x = 127;`自动变为`Integer x = Integer.valueOf(127);`，**为了节省内存，`Integer.valueOf()`****对于较小的数，始终返回相同的实例**，因此，`==`比较“恰好”为`true`，但我们**绝不能**因为Java标准库的`Integer`**内部有缓存优化**就用`==`比较，**必须用**\*\*`equals()`****方法比较两个****`Integer`\*\*。

> 最佳实践
> 按照语义编程，而不是针对特定的底层实现去“优化”。

因为`Integer.valueOf()`可能始终返回同一个`Integer`实例，因此，在我们自己创建`Integer`的时候，以下两种方法：

- 方法1：`Integer n = new Integer(100);`
- 方法2：`Integer n = Integer.valueOf(100);`

**方法2更好，因为**方法1总是创建新的`Integer`实例，**方法2把内部优化留给**\*\*`Integer`的实现者去做，\*\*即使在当前版本没有优化，也有可能在下一个版本进行优化。

我们把能**创建“新”对象的静态方法称为静态工厂方法**。`Integer.valueOf()`**就是静态工厂方法**，它**尽可能地返回缓存的实例以节省内存。**

> 最佳实践
> 创建新对象时，优先**选用静态工厂方法而不是new操作符。**

如果我们考察`Byte.valueOf()`方法的源码，可以看到，标准库返回的`Byte`实例**全部是缓存实例，但调用者并不关心静态工厂方法以何种方式创建新实例还是直接返回缓存的实例。**

参考：

[常量池](../../../../../java基础/java内存图解/常量池/index.md "常量池")
