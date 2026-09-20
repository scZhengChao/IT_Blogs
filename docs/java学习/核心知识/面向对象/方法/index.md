# 方法

## 目录

- [可变参数](#可变参数)
- [参数绑定](#参数绑定)

### 可变参数

可变参数用`类型...`定义，可变参数相当于数组类型：

```java 
class Group {
    private String[] names;

    public void setNames(String... names) {
        this.names = names;
    }
}

```


上面的`setNames()`就定义了一个可变参数。调用时，可以这么写：

```java 
Group g = new Group();
g.setNames("Xiao Ming", "Xiao Hong", "Xiao Jun"); // 传入3个String
g.setNames("Xiao Ming", "Xiao Hong"); // 传入2个String
g.setNames("Xiao Ming"); // 传入1个String
g.setNames(); // 传入0个String

```


完全可以把可变参数改写为`String[]`类型：

```java 
class Group {
    private String[] names;

    public void setNames(String[] names) {
        this.names = names;
    }
}

```


但是，调用方需要自己先构造String\[]，比较麻烦。例如

```java 
Group g = new Group();
g.setNames(new String[] {"Xiao Ming", "Xiao Hong", "Xiao Jun"}); // 传入1个String[]

```


另一个问题是，调用方可以传入`null`：

```java 
Group g = new Group();
g.setNames(null);

```


而\*\*可变参数可以保证无法传入`null`，\*\*因为传入0个参数时，接收到的实际值是一个空数组而不是`null`。

### 参数绑定

- `基本类型 `值传递；
  - **基本类型参数的传递，是调用方值的复制。双方各自的后续修改，互不影响。**
- `引用类型` 址传递
  - **引用类型参数的传递，调用方的变量，和接收方的参数变量，指向的是同一个对象。双方任意一方对这个对象的修改，都会影响对方（因为指向同一个对象嘛）。**

[方法执行时的搜索机制与跨包调用](./方法执行时的搜索机制与跨包调用/index.md " 方法执行时的搜索机制与跨包调用")

[方法重载](./方法重载/index.md "方法重载")

[方法重写](./方法重写/index.md "方法重写")

[重写和重载](./重写和重载/index.md "重写和重载")

[可变参数](./可变参数/index.md "可变参数")
