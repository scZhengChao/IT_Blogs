# 向上转型

如果一个引用变量的类型是`Student`，那么它可以指向一个`Student`类型的实例：

如果`Student`是从`Person`继承下来的，那么，一个引用类型为`Person`的变量，能否指向`Student`类型的实例？

```java 
Person p = new Student(); // ???

```


测试一下就可以发现，这种指向是允许的！

这是因为`Student`继承自`Person`，因此，它拥有`Person`的全部功能。`Person`类型的变量，如果指向`Student`类型的实例，对它进行操作，是没有问题的！

这种把一个**子类类型安全地变为父类类型的赋值，被称为向上转型（upcasting）。**

向上转型实际上是把一个**子类型安全地变为更加抽象的父类型：**

```java 
Student s = new Student();
Person p = s; // upcasting, ok
Object o1 = p; // upcasting, ok
Object o2 = s; // upcasting, ok

```


注意到继承树是`Student > Person > Object`，所以，可以把`Student`类型转型为`Person`，或者更高层次的`Object`。
