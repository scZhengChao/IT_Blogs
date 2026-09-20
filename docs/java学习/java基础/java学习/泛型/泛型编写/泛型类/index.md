# 泛型类

## 目录

- [多个泛型类型](#多个泛型类型)
  - [小结](#小结)

```java 
public class 类名<T,E>{
  private T 属性；
  public void method(E params){
    
  }
}


泛型类<Integer> 对象 = new 泛型类<Integer>() 
```


可以按照以下步骤来编写一个泛型类。

首先，按照某种类型，例如：`String`，来编写类：

```java 
public class Pair {
    private String first;
    private String last;
    public Pair(String first, String last) {
        this.first = first;
        this.last = last;
    }
    public String getFirst() {
        return first;
    }
    public String getLast() {
        return last;
    }
}

```


然后，标记所有的特定类型，这里是`String`，把特定类型`String`替换为`T`，并申明`<T>`：

```c# 
public class Pair<T> {
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


熟练后即可直接从`T`开始编写。

# 多个泛型类型

泛型还可以定义多种类型。例如，我们希望`Pair`不总是存储两个类型一样的对象，就可以使用类型`<T, K>`：

```c# 
public class Pair<T, K> {
    private T first;
    private K last;
    public Pair(T first, K last) {
        this.first = first;
        this.last = last;
    }
    public T getFirst() { ... }
    public K getLast() { ... }
}
```


使用的时候，需要指出两种类型：

```java 
Pair<String, Integer> p = new Pair<>("test", 123);

```


Java标准库的`Map<K, V>`就是使用两种泛型类型的例子。它对Key使用一种类型，对Value使用另一种类型。

### 小结

编写泛型时，需要定义泛型类型`<T>`；

静态方法不能引用泛型类型`<T>`，必须定义其他类型（例如`<K>`）来实现静态泛型方法；

泛型可以同时定义多种类型，例如`Map<K, V>`。
