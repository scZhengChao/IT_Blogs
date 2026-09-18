# 数据库

## 目录

- [查询](#查询)
- [创建](#创建)
- [删除](#删除)
- [使用数据库](#使用数据库)

# 查询

```sql 
SHOW DATABASES;
```


# 创建

```sql title="创建数据库"
CREATE DATABASE 数据库名称;

// 创建数据库(判断，如果不存在则创建)
CREATE DATABASE IF NOT EXISTS 数据库名称;


// 根据查询的结果，创建新表（表结构和要查询的数据表结构一模一样）
create table db4.student As select from dbl.student;


```


# 删除

```sql title="删除数据库(判断，如果存在则删除)
"
DROP DATABASE 数据库名称;


DROP DATABASE IF EXISTS 数据库名称;

```


# 使用数据库

```sql 
SELECT DATABASE();

USE 数据库名称;

```
