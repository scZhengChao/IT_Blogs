# 泛型数组

## 目录

- [安全使用](#安全使用)
- [创建方式一](#创建方式一)
- [创建方式二](#创建方式二)

我们可以声明带泛型的数组，**但不能用**\*\*`new`\*\***操作符创建带泛型的数组：**

```java 
Pair<String>[] ps = null; // ok
Pair<String>[] ps = new Pair<String>[2]; // compile error!

```


必须通过**强制转型实现带泛型的数组**：

```java 
@SuppressWarnings("unchecked")
Pair<String>[] ps = (Pair<String>[]) new Pair[2];

```


用泛型数组要特别小心，**因为数组实际上在运行期没有泛型，****编译器可以强制检查变量****`ps`，因为它的类型是泛型数组**。但是，编译器不会检查变量`arr`，因为它不是泛型数组。因为这两个**变量实际上指向同一个数组，** 所以，操作`arr`可能导致从`ps`获取元素时报错，**例如，以下代码演示了不安全地使用带泛型的数组：**

```java 
Pair[] arr = new Pair[2];
Pair<String>[] ps = (Pair<String>[]) arr;

ps[0] = new Pair<String>("a", "b");
arr[1] = new Pair<Integer>(1, 2);

// ClassCastException:
Pair<String> p = ps[1];
String s = p.getFirst();

```


# 安全使用

\*\*要安全地使用泛型数组，****必须扔掉****`arr`\*\***的引用：**

```java 
@SuppressWarnings("unchecked")
Pair<String>[] ps = (Pair<String>[]) new Pair[2];
```


上面的代码中 \*\*，由于拿****不到原始数组的引用，就只能对泛型数组****`ps`\*\***进行操作，这种操作就是安全的。**

**带泛型的数组实际上是编译器的类型擦除：**

```java 
Pair[] arr = new Pair[2];
Pair<String>[] ps = (Pair<String>[]) arr;

System.out.println(ps.getClass() == Pair[].class); // true

String s1 = (String) arr[0].getFirst();
String s2 = ps[0].getFirst();

```


# 创建方式一

所以**我们不能直接创建泛型数组`T[]`****，因为擦拭后代码变为****`Object[]`：**

```java 
// compile error:
public class Abc<T> {
    T[] createArray() {
        return new T[5];
    }
}

```


**必须借助**\*\*`Class<T>`\*\***来创建泛型数组：**

```java 
T[] createArray(Class<T> cls) {
    return (T[]) Array.newInstance(cls, 5);
}

```


# 创建方式二

> 谨慎

我们还可以利用**可变参数创建泛型数组**`T[]`：

```java 
public class ArrayHelper {
    @SafeVarargs
    static <T> T[] asArray(T... objs) {
        return objs;
    }
}

String[] ss = ArrayHelper.asArray("a", "b", "c");
Integer[] ns = ArrayHelper.asArray(1, 2, 3);

```
