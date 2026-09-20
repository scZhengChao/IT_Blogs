# 继承树

> **只能单继承；但是可以多层继承；**

注意到我们在定义`Person`的时候，没有写`extends`。在Java中，**没有明确写**\*\*`extends`****的类，编译器会自动加上****`extends Object`****。所以，任何类，除了****`Object`，都会继承自某个类。\*\*下图是`Person`、`Student`的继承树：

![](./image/image_Fm0Lz22HwM.png)

Java**只允许一个class继承自一个类，因此，一个类有且仅有一个父类。** 只有`Object`特殊，它没有父类。
