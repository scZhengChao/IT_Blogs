# 面向对象基础

## 目录

- [class和instance](#class和instance)

面向对象编程，是一种通过对象的方式，把现实世界映射到计算机模型的一种编程方法。

现实世界中，我们定义了“**人”这种抽象概念**，而具体的人则是“小明”、“小红”、“小军”等一个个具体的人。所以，“人”可以定义为一个类（class），**而具体的人则是实例（instance）**：

同样的， **“书”也是一种抽象的概念，所以它是类，** 而《Java核心技术》、《Java编程思想》、《Java学习笔记》则是实例：

### class和instance

所以，只要理解了class和instance的概念，基本上就明白了什么是面向对象编程。

**class是一种对象模版，它定义了如何创建实例，因此，class本身就是一种数据类型：**

![](https://liaoxuefeng.com/books/java/oop/basic/class.jpg)

而instance是对象实例，instance是根据class创建的实例，可以创建多个instance，每个instance类型相同，但各自属性可能不相同：

![](https://liaoxuefeng.com/books/java/oop/basic/instances.jpg)

![](./image/image_vvRKRRpe1P.png)

两个`instance`拥有`class`定义的`name`和`age`字段，且各自都有一份独立的数据，互不干扰。

[实例化过程](./实例化过程/index.md "实例化过程")

[方法](IT/服务端/java学习/java基础/java学习/面向对象编程/面向对象基础/方法/方法.md "方法")

[构造方法](IT/服务端/java学习/java基础/java学习/面向对象编程/面向对象基础/构造方法/构造方法.md "构造方法")

[匿名对象](./匿名对象/index.md "匿名对象")

[封装](IT/服务端/java学习/java基础/java学习/面向对象编程/面向对象基础/封装/封装.md "封装")

[继承](IT/服务端/java学习/java基础/java学习/面向对象编程/面向对象基础/继承/继承.md "继承")

[多态](./多态/index.md "多态")

[接口](IT/服务端/java学习/java基础/java学习/面向对象编程/面向对象基础/接口/接口.md "接口")

[静态字段和静态方法](./静态字段和静态方法/index.md "静态字段和静态方法")

[包](IT/服务端/java学习/java基础/java学习/面向对象编程/面向对象基础/包/包.md "包")

[作用域](IT/服务端/java学习/java基础/java学习/面向对象编程/面向对象基础/作用域/作用域.md "作用域")

[classpath和jar](./classpath和jar/index.md "classpath和jar")

[class版本](./class版本/index.md "class版本")

[模块](IT/服务端/java学习/java基础/java学习/面向对象编程/面向对象基础/模块/模块.md "模块")

[类](IT/服务端/java学习/java基础/java学习/面向对象编程/面向对象基础/类/类.md "类")
