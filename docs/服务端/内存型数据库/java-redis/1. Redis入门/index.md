# 1. Redis入门

## 目录

- [1.1 Redis简介](#11-Redis简介)
  - [【1】为什么学习Redis](#1为什么学习Redis)
  - [【2】Redis介绍](#2Redis介绍)
- [1.2 使用Redis能做什么](#12-使用Redis能做什么)

### 1.1 Redis简介

#### 【1】为什么学习Redis

![](./assets/image/image_yJyF7lPH9n.png)

Redis是一个基于**内存**的key-value结构数据库。它是「**Re**mote**Di**ctionary**S**ervice」的首字母缩写，也就是「远程字典服务-remote dictionary server」。

- [ ] **基于内存存储，读写性能高**

![](./assets/image/image_RoMKXzVPSZ.png)

- [ ] 适合存储热点数据（热点商品、资讯、新闻）

![](./assets/image/image_hrb1iOcOxP.png)

- [ ] 企业应用广泛

![](./assets/image/image_XGS-rkxBfc.png)

#### 【2】Redis介绍

Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker. 翻译为：Redis是一个**开源的内存中的数据结构存储系统，它可以用作：数据库、缓存等。**

官网：[https://redis.io](https://redis.io/ "https://redis.io")

中文网[https://www.redis.net.cn/](https://www.redis.net.cn/ "https://www.redis.net.cn/")

Redis是用C语言开发的一个开源的高性能键值对(key-value)数据库，官方提供的数据是可以达到10万+的QPS（**Queries-per-second每秒内查询次数**）。它存储的`value`类型比较丰富，也被称为结构化的NoSql数据库。

`NoSql（Not Only SQL）`，不仅仅是`SQL`，泛指**非关系型数据库(数据之间没有关系)**。NoSql数据库并不是要取代关系型数据库，而是关系型数据库的补充。

关系型数据库(RDBMS)：

- Mysql
- Oracle
- DB2
- SQLServer

非关系型数据库(NoSql)：

- Redis
- Mongo db
- MemCached

[**https://db-engines.com/**](https://db-engines.com/ "https://db-engines.com/")**(数据库排行榜)**

![](./assets/image/image_7iWC6kHK2o.png)

### 1.2 使用Redis能做什么

- 数据缓存 ★
- 消息队列

  .........

![](./assets/image/image_qO8tgjwS3R.png)
