# 向下转型

和向上转型相反，如果把**一个父类类型强制转型为子类类型**，就是向下转型（downcasting）。例如：

```java 
Person p1 = new Student(); // upcasting, ok
Person p2 = new Person();
Student s1 = (Student) p1; // ok
Student s2 = (Student) p2; // runtime error! ClassCastException!

```


如果测试上面的代码，可以发现：

`Person`类型`p1`实际指向`Student`实例，`Person`类型变量`p2`实际指向`Person`实例。在向下转型的时候，把`p1`转型为`Student`会成功，因为`p1`确实指向`Student`实例，把`p2`转型为`Student`会失败，因为`p2`的实际类型是`Person`，不能把父类变为子类，**因为子类功能比父类多，多的功能无法凭空变出来。**

因此，向下转型很可能会失败。失败的时候，Java虚拟机会报`ClassCastException`。
