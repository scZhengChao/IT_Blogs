# 介绍

## 目录

- [3.1 提高操作数据库性能  ](#31-提高操作数据库性能)
- [3.2 演示-执行次数比较多的语句](#32-演示-执行次数比较多的语句)
  - [1.执行次数比较多的语句分类](#1执行次数比较多的语句分类)
  - [2.查询累计插入和返回数据条数，即查看当前数据库属于查询密集型还是修改密集型](#2查询累计插入和返回数据条数即查看当前数据库属于查询密集型还是修改密集型)
- [3.3 查看未优化SQL语句的执行效率](#33-查看未优化SQL语句的执行效率)

3.1 提高操作数据库性能

我们进入公司进行项目开发往往关注的是**业务需求和功能的实现**，但是随着项目运行的时间增加，数据量也就增加了，这时会影响到我们数据库的查询性能。所以**我们要提高操作数据库的性能**，有如下两种方式

- 硬优化：就是软优化之后性能还很低 **，只能采取硬优化，这是最后的步骤，就是公司花钱购买服务器**，在硬件上进行优化
- 软优化 :  在**操作和设计数据库方面上进行优化（学习）(表结构和sql语句)**

# 3.2 演示-执行次数比较多的语句

### 1.执行次数比较多的语句分类

- 1）查询密集型(DQL)
- &#x20;2）修改密集型(DML) 后面讲解

### 2.查询累计插入和返回数据条数，即查看当前数据库属于查询密集型还是修改密集型



```sql 
show global status like 'Innodb_rows%';
```


![](./assets/image/image_SNlpguQcv-.png)

# 3.3 查看未优化SQL语句的执行效率

准备千万级别数据:

```sql 
-- 1. 准备表
CREATE TABLE USER (
    id int,
    username varchar(32),
    password VARCHAR(32),
    sex varchar(6),
    email varchar(50)
);

-- 2. 创建存储过程，实现批量插入记录
DELIMITER $$
-- 声明存储过程的结束符号为$$
-- 可以将下面的存储过程理解为java中的一个方法，插入千万条数据之后，在调用存储过程
CREATE PROCEDURE auto_insert ()
BEGIN
DECLARE
    i int DEFAULT 1;
    START TRANSACTION;
    -- 开启事务
    WHILE (i <= 10000000)
    DO INSERT INTO USER
        VALUES (i, CONCAT('jackie', i), MD5(i), 'male', CONCAT('jackie', i, '@itcast.cn'));
    SET i = i + 1;
END WHILE;
    COMMIT;
    -- 提交
END $$
-- 声明结束
DELIMITER ;
    -- 重新声明分号为结束符号
    -- 3. 查看存储过程
    SHOW CREATE PROCEDURE auto_insert;
    -- 4. 调用存储过程
    CALL auto_insert ();

```


结果 : 上述sql大概运行10分钟左右,提前以执行!&#x20;

```sql 
-- 查询id是22的用户,测试查询耗时
SELECT
    *
FROM
    USER
WHERE
    id = 22;


```
