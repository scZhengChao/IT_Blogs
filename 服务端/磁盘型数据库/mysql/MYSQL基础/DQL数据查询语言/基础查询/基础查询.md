# 基础查询

## 目录

- [查询多个字段](#查询多个字段)
- [去除重复记录](#去除重复记录)
- [查询时给列、表指定别名需要使用AS关键字](#查询时给列表指定别名需要使用AS关键字)

# 查询多个字段

```sql 
SELECT 字段列表 FROM 表名;
// SELECT id, name ,age, sex, address FROM student;
SELECT * FROM 表名; -- 查询所有数据
```


# 去除重复记录

```sql 
SELECT DISTINCT 字段名,字段名,.. FROM 表名

// SELECT DISTINCT address 城市 FROM student;
```


# 查询时给列、表指定别名需要使用AS关键字

```sql 
SELECT
    字段名1 AS 别名,
    字段名2 AS 别名...
FROM
    表名;

SELECT
    字段名1 AS 别名,
    字段名2 AS 别名...
FROM
    表名 AS 表别名;

AS: AS 也可以省略 //
SELECT
    NAME AS 姓名,
    age AS 年龄
FROM
    student;


```


> **注意： 别名加上双引号**
