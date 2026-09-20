# Throwable类中常用方法

## 目录

- [两种处理异常方式的小结](#两种处理异常方式的小结)
  - [抛出  throw throws](#抛出--throw-throws)
  - [捕获  try…catch    ](#捕获--trycatch)

**顶层父类**Throwable

- 子类Error；异常错误无法处理
- 子类Exception；可以使用异常错误解决；RunTimeException 继承了Exception类

**所以；它的成员方法大家都可以用；**

![](./image/image_Hpr9_vXX4O.png)

# 两种处理异常方式的小结

## 抛出  throw throws

在方法中，当传递的参数有误，没有继续运行下去的意义了，则采取抛出处理。表示让该方法结束运行。告诉调用者出现了问题。

捕获  try…catch

捕获：阻止异常的传递 , 能让代码继续往下运行。
