# equals 和 toString

## 目录

- [equals](#equals)
- [toString](#toString)

# equals

1、继承 `Object`中的`equals`方法时，比较的是\*\*两个引用是否指向同一个对象
\*\*2、子类可以通过重写`equals`方法的形式，**改变比较的内容**

> string 的 equals 方法判断的不再是引用；而是值；
> **自己重写**（强制转换）

![](image_of4FERMj6H.png)

# toString

1、**输出对象名时**，默认会直接**调用类**中的`toString`
2、继承`Object`中的`toString`方法时，输出对象的**字符串**表示形式：**类型信息+@+地址信**
