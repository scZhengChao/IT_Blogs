# 4. 在Java中操作Redis

## 目录

- [4.1 介绍](#41-介绍)

### 4.1 介绍

前面我们讲解了Redis的常用命令，这些命令是我们操作Redis的基础，那么我们在java程序中应该如何操作Redis呢？这就需要使用Redis的Java客户端，就如同我们使用JDBC操作MySQL数据库一样。

Redis 的 Java 客户端很多，官方推荐的有三种：

- Jedis
- Lettuce
- Redisson

Spring 对 Redis 客户端进行了整合，提供了 Spring Data Redis，在Spring Boot项目中还提供了对应的Starter，即 spring-boot-starter-data-redis。

![](./image/image_DKs1NF4BAb.png)

![](./image/image_ut2jCfWKFg.png)

[4.2 Jedis(理解)](<./4.2 Jedis(理解)/index.md> "4.2 Jedis(理解)")

[4.3 Spring Data Redis(掌握)](<./4.3 Spring Data Redis(掌握)/index.md> "4.3 Spring Data Redis(掌握)")
