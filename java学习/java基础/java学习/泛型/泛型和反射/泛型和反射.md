# 泛型和反射

## 目录

- [小结](#小结)

**Java的部分反射API也是泛型。** 例如：`Class<T>`就是泛型：

```java 
// compile warning:
Class clazz = String.class;
String str = (String) clazz.newInstance();

// no warning:
Class<String> clazz = String.class;
String str = clazz.newInstance();

```


调用`Class`的`getSuperclass()`方法返回的`Class`类型是`Class<? super T>`：

```java 
Class<? super String> sup = String.class.getSuperclass();

```


构造方法`Constructor<T>`也是泛型：

```java 
Class<Integer> clazz = Integer.class;
Constructor<Integer> cons = clazz.getConstructor(int.class);
Integer i = cons.newInstance(123);
```


### 小结

部分反射API是泛型，例如：`Class<T>`，`Constructor<T>`；

可以声明带**泛型的数组，但不能直接创建带泛型的数组，必须强制转型；**

可以通过`Array.newInstance(Class<T>, int)`创建`T[]`数组，需要强制转型；

同时使用泛型和可变参数时需要特别小心。
