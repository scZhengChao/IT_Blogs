# 日志框架

## 目录

- [优势](#优势)
- [体系结构规范](#体系结构规范)
- [总结](#总结)

# 优势

- 可以将系统执行的信息**选择性的记录到指定的位置**（控制台、文件中、数据库中）。
- 可以随时以**开关的形式控制是否记录日志**，无需修改源代码。

![](./image/image_888t86J5JY.png)

# 体系结构规范

![](./image/image_BoWIdkGZRo.png)

# 总结

1. 日志的规范是什么，常见的有几种形式。
   1. 日志规范大多是一些接口，提供给实现框架去设计的。
   2. 常见的规范是：
   3. Commons Logging
   4. Simple Logging Facade for Java
2. 日志的实现框架有哪些常见的？
   1. Log4J
   2. Logback(我们重点学习的，其他的都大同小异)

[Logback](./Logback/index.md "Logback")
