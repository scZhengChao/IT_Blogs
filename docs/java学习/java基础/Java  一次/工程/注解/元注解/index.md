# 元注解

## 目录

- [常见的元注解有两个：  ](#常见的元注解有两个)
- [@Target](#Target)
- [@Retention](#Retention)
- [总结](#总结)

\*\*元注解：就是修饰注解的注解。 \*\*

常见的元注解有两个：

- @Target: 约束自定义注解只能在哪些地方使用，
- &#x20;@Retention：声明注解的生命周期       &#x20;

# @Target

@Target中可使用的值定义在ElementType枚举类中，常用值如下

- TYPE，类，接口
- &#x20;FIELD, 成员变量
- METHOD, 成员方法
- PARAMETER, 方法参数
- CONSTRUCTOR, 构造器
- LOCAL\_VARIABLE, 局部变量

# @Retention

@Retention中可使用的值定义在RetentionPolicy枚举类中，常用值如下

- SOURCE： 注解只作用在源码阶段，生成的字节码文件中不存在
- &#x20;CLASS：  注解作用在源码阶段，字节码文件阶段，运行阶段不存在，**默认值.**
- &#x20;RUNTIME：注解作用在源码阶段，字节码文件阶段，运行阶段（开发常用）

# 总结

元注解是什么？

- 修饰注解的注解
- &#x20;@Target约束自定义注解可以标记的范围。&#x20;
- @Retention用来约束自定义注解的存活范围。
