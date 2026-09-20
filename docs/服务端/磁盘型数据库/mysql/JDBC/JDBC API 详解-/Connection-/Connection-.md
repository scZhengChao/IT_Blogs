Connection

## 目录

- [Connection(数据库连接对象)作用：](#Connection数据库连接对象作用)
- [1.获取执行 SQL 的对象](#1获取执行-SQL-的对象)
- [2.事务管理](#2事务管理)

# Connection(数据库连接对象)作用：

1. 获取执行 SQL 的对象
2. 管理事务

# 1.获取执行 SQL 的对象

- 普通执行SQL对象

```java 
Statement    createStatement()

```


- 预编译SQL的执行SQL对象：防止SQL注入

```java 
PreparedStatement    prepareStatement​ (sql)

```


# 2.事务管理

- MySQL 事务管理

```sql 
开启事务：BEGIN; / START TRANSACTION;提交事务：COMMIT;回滚事务：ROLLBACK;MySQL默认自动提交事务
```


- JDBC 事务管理：Connection接口中定义了3个对应的方法

```java 
开启事务：setAutoCommit(boolean autoCommit)：true为自动提交事务；false为手动提交事务，即为开启事务
提交事务：commit()
回滚事务：rollback() 

```
