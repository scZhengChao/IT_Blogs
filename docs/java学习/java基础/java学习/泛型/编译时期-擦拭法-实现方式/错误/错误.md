# 错误

## 目录

- [不恰当的覆写方法](#不恰当的覆写方法)

### 不恰当的覆写方法

有些时候，一个看似正确定义的方法会无法通过编译。例如：

```java 
public class Pair<T> {
    public boolean equals(T t) {
        return this == t;
    }
}

```


这是因为，定义的`equals(T t)`方法实际上会被擦拭成`equals(Object t)`，而这个方法是继承自`Object`的，**编译器会阻止一个实际上会变成覆写的泛型方法定义。**

换个方法名，避开与`Object.equals(Object)`的冲突就可以成功编译：

```java 
public class Pair<T> {
    public boolean same(T t) {
        return this == t;
    }
}

```
