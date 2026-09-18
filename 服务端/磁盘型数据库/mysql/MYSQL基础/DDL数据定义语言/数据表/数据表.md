# 数据表

## 目录

- [查询表](#查询表)
- [创建表  ](#创建表)
- [删除表](#删除表)
- [修改表](#修改表)
  - [修改表名](#修改表名)
  - [添加一列](#添加一列)
  - [修改数据类型](#修改数据类型)
  - [修改列名和数据类型](#修改列名和数据类型)
  - [删除列](#删除列)

# 查询表

查询当前数据库下所有表名称

```sql 
SHOW TABLES;
```


查询表结构

```sql 
DESC 表名称;
```


创建表

```sql 
CREATE TABLE 表名 (  字段名1  数据类型1,  字段名2  数据类型2,  …  字段名n  数据类型n);
```


> 注意：最后一行末尾，不能加逗号

```sql 
create table study (
     id int,
    name varchar(10),
    gender char(2),
    birthdate date,
    socre double,
    email varchar(64),
    tel varchar(20),
    state int
);
```


# 删除表

```sql 
DROP TABLE 表名;

//删除表时判断表是否存在
DROP TABLE IF EXISTS 表名;

```


# 修改表

## 修改表名

```sql 
ALTER TABLE 表名 RENAME TO 新的表名;
```


## 添加一列

```sql 
ALTER TABLE 表名 ADD 列名 数据类型;
```


## 修改数据类型

```sql 
ALTER TABLE 表名 MODIFY 列名 新数据类型;
```


## 修改列名和数据类型

```sql 

ALTER TABLE 表名 CHANGE 列名 新列名 新数据类型;

```


## 删除列

```sql 
ALTER TABLE 表名 DROP 列名;
```
