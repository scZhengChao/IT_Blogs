# 不变类

**所有的包装类型都是不变类**。我们查看`Integer`的源码可知，它的核心代码如下：

```java 
public final class Integer {
    private final int value;
}

```


因此，**一旦创建了**\*\*`Integer`****对象，该对象就是不变的****。\*\*

对两个`Integer`实例进行比较要特别注意：**绝对不能用**\*\*`==`比较，**因为`Integer`是引用类型，**必须使用****`equals()`\*\***比较：**

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
