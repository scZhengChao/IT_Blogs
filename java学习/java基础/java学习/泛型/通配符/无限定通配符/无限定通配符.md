# 无限定通配符

我们已经讨论了`<? extends T>`和`<? super T>`作为方法参数的作用。实际上，`Java`的泛型**还允许使用无限定通配符**（`Unbounded Wildcard Type`），即只定义一个`?`：

```java 
void sample(Pair<?> p) {
}

```


因为`<?>`通配符既没有`extends`，也没有`super`，因此：

- 不允许调用`set(T)`方法并传入引用（`null`除外）；\*\* null 是所有类型的子类型\*\*
- 不允许调用`T get()`方法并获取`T`引用（只能获取`Object`引用）。\*\* object 是所有类型的父类型\*\*

**换句话说，既不能读，也不能写，那只能做一些**\*\*`null`\*\***判断：**

```java 
static boolean isNull(Pair<?> p) {
    return p.getFirst() == null || p.getLast() == null;
}

```


大多数情况下，可以引入泛型参数`<T>`消除`<?>`通配符：

```java 
static <T> boolean isNull(Pair<T> p) {
    return p.getFirst() == null || p.getLast() == null;
}

```


`<?>`**通配符有一个独特的特点**，就是：\*\*`Pair<?>`****是所有****`Pair<T>`\*\***的超类：**

```java 
public class Main {
    public static void main(String[] args) {
        Pair<Integer> p = new Pair<>(123, 456);
        Pair<?> p2 = p; // 安全地向上转型
        System.out.println(p2.getFirst() + ", " + p2.getLast());
    }
}

class Pair<T> {
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
    public void setFirst(T first) {
        this.first = first;
    }
    public void setLast(T last) {
        this.last = last;
    }
}

```


上述代码是可以正常编译运行的，因为`Pair<Integer>`是`Pair<?>`的子类，可以安全地向上转型。
