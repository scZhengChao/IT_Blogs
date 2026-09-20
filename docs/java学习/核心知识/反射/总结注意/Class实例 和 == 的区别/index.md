# Class实例 和 == 的区别

注意一下`Class`实例比较和`instanceof`的差别：

```java 
Integer n = new Integer(123);

boolean b1 = n instanceof Integer; // true，因为n是Integer类型
boolean b2 = n instanceof Number; // true，因为n是Number类型的子类

boolean b3 = n.getClass() == Integer.class; // true，因为n.getClass()返回Integer.class
Class c1 = n.getClass();
Class c2 = Number.class;
boolean b4 = c1 == c2; // false，因为Integer.class != Number.class

```


用`instanceof`**不但匹配指定类型，还匹配指定类型的子类**。而用`==`判断`class`实例**可以精确地判断数据类型**，**但不能作子类型比较。**

通常情况下，我们应该用`instanceof`判断数据类型，**因为面向抽象编程的时候，我们不关心具体的子类型**。只有在需要精确判断一个类型是不是某个`class`的时候，我们才使用`==`判断`class`实例。
