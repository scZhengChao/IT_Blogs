# super通配符

## 目录

- [小结](#小结)

我们前面已经讲到了泛型的继承关系：`Pair<Integer>`不是`Pair<Number>`的子类。

考察下面的`set`方法：

```java 
void set(Pair<Integer> p, Integer first, Integer last) {
    p.setFirst(first);
    p.setLast(last);
}

```


传入`Pair<Integer>`是允许的，但是传入`Pair<Number>`是不允许的。

和`extends`通配符相反，这\*\*次，我们希望接受`Pair<Integer>`****类型，以及****`Pair<Number>`****、****`Pair<Object>`****，因为****`Number`****和****`Object`****是****`Integer`\*\***的父类**，`setFirst(Number)`和`setFirst(Object)`实际上允许接受`Integer`类型。

我们使用`super`通配符来改写这个方法：

```java 
void set(Pair<? super Integer> p, Integer first, Integer last) {
    p.setFirst(first);
    p.setLast(last);
}

```


注意到`Pair<? super Integer>`表示，**方法参数接受所有泛型类型为**`Integer`或`Integer`**父类的**\*\*`Pair`\*\***类型**。

下面的代码可以被正常编译：

```java 
public class Main {
    public static void main(String[] args) {
        Pair<Number> p1 = new Pair<>(12.3, 4.56);
        Pair<Integer> p2 = new Pair<>(123, 456);
        setSame(p1, 100);
        setSame(p2, 200);
        System.out.println(p1.getFirst() + ", " + p1.getLast());
        System.out.println(p2.getFirst() + ", " + p2.getLast());
    }

    static void setSame(Pair<? super Integer> p, Integer n) {
        p.setFirst(n);
        p.setLast(n);
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


考察`Pair<? super Integer>`的`setFirst()`方法，它的方法签名实际上是：

```java 
void setFirst(? super Integer);

```


因此，可以安全地传入`Integer`类型。

再考察`Pair<? super Integer>`的`getFirst()`方法，它的方法签名实际上是：

```typescript 
? super Integer getFirst();

```


这里注意到我们无法使用`Integer`类型来接收`getFirst()`的返回值，即下面的语句将无法通过编译：

```java 
Integer x = p.getFirst();

```


因为如果传入的实际类型是`Pair<Number>`，编译器无法将`Number`类型转型为`Integer`。

注意：**虽然**\*\*`Number`****是一个抽象类，我们无法直接实例化它**。但是，**即便****`Number`\*\***不是抽象类，这里仍然无法通过编译**。此外，传入`Pair<Object>`类型时，编译器也无法将`Object`类型转型为`Integer`。

**唯一可以接收**\*\*`getFirst()`****方法返回值的是****`Object`\*\***类型：**

```java 
Object obj = p.getFirst();
```


因此，使用`<? super Integer>`通配符表示：

- **允许调用**\*\*`set(? super Integer)`****方法传入****`Integer`\*\***的引用；**
- **不允许调用**\*\*`get()`****方法获得****`Integer`\*\***的引用。**

唯一例外是**可以获取`Object`****的引用：****`Object o = p.getFirst()`。**

换句话说，使用`<? super Integer>`通配符作为方法参数，**表示方法内部代码对于参数只能写，不能读。**

### 小结

使用类似`<? super Integer>`通配符作为方法参数时表示：

- 方法内部可以调用传入`Integer`引用的方法，例如：`obj.setFirst(Integer n);`；
- 方法内部无法调用获取`Integer`引用的方法（`Object`除外），例如：`Integer n = obj.getFirst();`。

即使用`super`通配符表示只能写不能读。

使用`extends`和`super`通配符要遵循PECS原则。

无限定通配符`<?>`很少使用，可以用`<T>`替换，同时它是所有`<T>`类型的超类。
