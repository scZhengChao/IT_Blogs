# 静态方法

编写泛型类时，要特别注意，**泛型类型**\*\*`<T>`\*\***不能用于静态方法**。例如：

```typescript 
public class Pair<T> {
    private T first;
    private T last;
    public Pair(T first, T last) {
        this.first = first;
        this.last = last;
    }
    public T getFirst() { ... }
    public T getLast() { ... }

    // 对静态方法使用<T>:
    public static Pair<T> create(T first, T last) {
        return new Pair<T>(first, last);
    }
}

```


上述代码会导致编译错误，我们**无法在静态方法**`create()`的**方法参数和返回类型上使用泛型类型**`T`。

有些同学在网上搜索发现，可以在`static`修饰符后面加一个`<T>`，编译就能通过：

```java 
public class Pair<T> {
    private T first;
    private T last;
    public Pair(T first, T last) {
        this.first = first;
        this.last = last;
    }
    public T getFirst() { ... }
    public T getLast() { ... }

    // 可以编译通过:
    public static <T> Pair<T> create(T first, T last) {
        return new Pair<T>(first, last);
    }
}

```


但实际上，这个`<T>`和`Pair<T>`类型的`<T>`已经没有任何关系了。

对于静态方法，我们**可以单独改写为“泛型”方法，只需要使用另一个类型即可**。对于上面的`create()`静态方法，我们应该把它改为另一种泛型类型，例如，`<K>`：

```java 
public class Pair<T> {
    private T first;
    private T last;
    public Pair(T first, T last) {
        this.first = first;
        this.last = last;
    }
    public T getFirst() { ... }
    public T getLast() { ... }

    //  静态泛型方法应该使用其他类型区分:
     public static <K> Pair<K> create(K first, K last) {
        return new Pair<K>(first, last);
    }
}
```


这样**才能清楚地将静态方法的泛型类型和实例类型的泛型类型区分开。**
