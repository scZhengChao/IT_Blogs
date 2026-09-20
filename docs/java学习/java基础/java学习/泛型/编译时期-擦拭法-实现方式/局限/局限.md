# 局限

## 目录

- [局限一](#局限一)
- [局限二](#局限二)
- [局限三](#局限三)
- [局限四](#局限四)

### 局限一

局限一：`<T>`**不能是基本类型**，例如`int`，因为实际类型是`Object`，`Object`**类型无法持有基本类型：**

```java 
Pair<int> p = new Pair<>(1, 2); // compile error!

```


### 局限二

局限二：无法取得带泛型的`Class`。观察以下代码：

```java 
public class Main {
    public static void main(String[] args) {
        Pair<String> p1 = new Pair<>("Hello", "world");
        Pair<Integer> p2 = new Pair<>(123, 456);
        Class c1 = p1.getClass();
        Class c2 = p2.getClass();
        System.out.println(c1==c2); // true
        System.out.println(c1==Pair.class); // true
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
}
```


因为`T`是`Object`，我们对`Pair<String>`和`Pair<Integer>`类型获取`Class`时，获取到的是同一个`Class`，也就是`Pair`类的`Class`。

换句话说，**所有泛型实例，无论**\*\*`T`****的类型是什么，****`getClass()`****返回同一个****`Class`****实例，因为编译后它们全部都是****`Pair<Object>`。\*\*​

### 局限三

局限三：无法判断带泛型的类型：

```java 
Pair<Integer> p = new Pair<>(123, 456);
// Compile error:
if (p instanceof Pair<String>) {
}

```


原因和前面一样，并不存在`Pair<String>.class`，而是只有唯一的`Pair.class`。

### 局限四

局限四：不能实例化`T`类型：

```java 
public class Pair<T> {
    private T first;
    private T last;
    public Pair() {
        // Compile error:
        first = new T();
        last = new T();
    }
}

```


上述代码无法通过编译，因为构造方法的两行语句：

```typescript 
first = new T();
last = new T();

```


擦拭后实际上变成了：

```javascript 
first = new Object();
last = new Object();

```


这样一来，创建`new Pair<String>()`和创建`new Pair<Integer>()`就全部成了`Object`，显然编译器要阻止这种类型不对的代码。

**要实例化**\*\*`T`****类型，我们必须借助额外的****`Class<T>`\*\***参数：**

```java 
public class Pair<T> {
    private T first;
    private T last;
    public Pair(Class<T> clazz) {
        first = clazz.newInstance();
        last = clazz.newInstance();
    }
}

```


上述代码借助`Class<T>`参数并通过反射来实例化`T`类型，使用的时候，也必须传入`Class<T>`。例如：

```java 
Pair<String> pair = new Pair<>(String.class);

```


因为传入了`Class<String>`的实例，所以我们借助`String.class`就可以实例化`String`类型。
