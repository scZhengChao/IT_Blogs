MyBatis介绍

## 目录

- [什么是MyBatis？  ](#什么是MyBatis)
- [持久层  ](#持久层)
- [框架  ](#框架)
- [JDBC 缺点  ](#JDBC-缺点)
- [MyBatis  ](#MyBatis--)
- [mybatis框架整体架构  ](#mybatis框架整体架构)
- [orm](#orm)
- [总结](#总结)

什么是MyBatis？

- MyBatis 是一款**优秀的持久层框架，用于简化 JDBC 开发**
- MyBatis 本是 Apache 的一个开源项目iBatis, 2010年这个项目**由apache software foundation 迁移到了google code，** 并且改名为MyBatis 。2013年11月迁移到Github
- 官网：[https://mybatis.org/mybatis-3/zh/index.html](https://mybatis.org/mybatis-3/zh/index.html "https://mybatis.org/mybatis-3/zh/index.html")

持久层

- 负责将数据到**保存到数据库的那一层代码**
- JavaEE三层架构 **：表现层、业务层、持久层**

框架

- 框架就是一个半成品软件，是一套可重用的、通用的、软件基础代码模型
- 在框架的基础之上构建软件编写更加高效、规范、通用、可扩展

JDBC 缺点

![](./assets/image/image_YM8DSdQYOU.png)

# MyBatis &#x20;

![](./assets/image/image_wcwlrww6tK.png)

mybatis框架整体架构

![](./assets/image/image_GvZ5W447u4.png)

# orm

MyBatis的ORM(Object Relational Mapping **对象关系映射**)方式

![](./assets/image/image_kEuEH_l_RC.png)

# 总结

1、mybatis解决了三层(web,service,dao)中哪一层的问题？

**dao**

2、mybatis框架是对什么技术进行的封装？

**JDBC**
