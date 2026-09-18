# 谨慎使用泛型可变参数

在上面的例子中，我们看到，通过：

```java 
static <T> T[] asArray(T... objs) {
    return objs;
}

```


似乎可以安全地创建一个泛型数组。但实际上，这种方法非常危险。以下代码来自《Effective Java》的示例：

```java 
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        String[] arr = asArray("one", "two", "three");
        System.out.println(Arrays.toString(arr));
        // ClassCastException:
        String[] firstTwo = pickTwo("one", "two", "three");
        System.out.println(Arrays.toString(firstTwo));
    }

    static <K> K[] pickTwo(K k1, K k2, K k3) {
        return asArray(k1, k2);
    }

    static <T> T[] asArray(T... objs) {
        return objs;
    }
}

```


直接调用`asArray(T...)`似乎没有问题，**但是在另一个方法中，我们返回一个泛型数组就会产生**`ClassCastException`，原因**还是因为擦拭法**，在`pickTwo()`方法内部，编译器无法检测`K[]`的正确类型，因此返回了`Object[]`。

如果仔细观察，可以**发现编译器对所有可变泛型参数都会发出警告，除非确认完全没有问题**，才可以用`@SafeVarargs`消除警告。

> 注意
> 如果在**方法内部创建了泛型数组，最好不要将它返回给外部使用。**

更详细的解释请参考《[Effective Java](https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/ "Effective Java")》“Item 32: Combine generics and varargs judiciously”。
