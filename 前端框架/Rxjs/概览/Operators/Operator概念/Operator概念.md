# Operator概念

采用**函数式编程风格的纯函数** (`pure function`)，使用像 `map`、`filter`、`concat`、`flatMap` 等这样的操作符来处理集合。也正因为他的纯函数定义，所以我们可以**知道调用任意的操作符时都不会改变已存在的`Observable`****实例，而是会在原有的基础上返回一个新的****`Observable`。**

> 尽管 `RxJS` 的根基是 `Observable`，**但最有用的还是它的操作符**\*\*。操作符是允许****复杂的异步代码以声明式****的方式进行轻松组合\*\*的基础代码单元。

![](image_UWCpeIwMC0.png)

[实现一个Operator](实现一个Operator.md "实现一个Operator")

[实例操作符-静态操作符](实例操作符-静态操作符.md "实例操作符-静态操作符")
