# 判断函数\_Case When

## 目录

- [介绍  ](#介绍)
- [格式](#格式)
  - [1.格式一：简单Case函数 ](#1格式一简单Case函数-)
  - [1.格式二：CASE 搜索函数](#1格式二CASE-搜索函数)
  - [case...when和select语句一起使用的格式
    ](#casewhen和select语句一起使用的格式)
- [注意](#注意)

介绍

1.case when语句，\*\*用于计算条件列表并返回多个可能结果表达式之一。
\*\*2.CASE 具有两种格式：
1）简单`CASE` 函数将某个表达式与一组简单表达式进行比较以确定结果。
&#x9;2）`CASE` 搜索函数计算一组布尔表达式以确定结果。&#x20;

# 格式

### 1.格式一：简单Case函数&#x20;

```sql 
CASE 表达式1
WHEN 表达式2 THEN 表达式3
WHEN 表达式4 THEN  表达式5......
ELSE
    表达式6
END

```


```sql 
CASE sex
WHEN '1' THEN
    '男'
WHEN '2' THEN
    '女'
ELSE
    '其他'
END



SELECT
    id,
    name,
    CASE sex when 1 then '男' when 2 then '女'
ELSE
    '保密'
  END AS gender,
    age
FROM
    USER;


```


> 1.当CASE后面的表达式1和下面WHEN后面任何的表达式相等就会返回对应THEN后面的表达式;
> 2.如果CASE后面的表达式1和下面WHEN后面任何的表达式都不相等就会返回ELSE后面的表达式;

### 1.格式二：CASE 搜索函数

```sql 
CASE 
WHEN 条件表达式1 THEN
    表达式2
WHEN 条件表达式3 THEN
    表达式4......
ELSE
    表达式5
END

```


```sql 
CASE 
WHEN sex = '1' THEN '男'
WHEN sex = '2' THEN '女'
ELSE
    '其他'
END
```


### case...when和select语句一起使用的格式&#xA;

```sql 
-- 简单Case函数 select 字段1,字段2,          CASE 字段3          WHEN 值1 THEN 返回新值          WHEN 值1 THEN 返回新值          .....          ELSE '其他’         END as 给字段3重新命名即别名from 表名where ....group by ...order by...limit ...
```


```sql 
-- CASE 搜索函数
select 字段1,字段2,
            CASE
            WHEN 条件表达式 THEN 返回新值
            WHEN 条件表达式 THEN 返回新值
             .....
            ELSE '其他’
            END as 给要查询的字段重新命名即别名
from 表名
where ....
group by ...
order by...
limit ... 

```


# 注意

- 如果上述两种**格式都不指定ELSE,并且都不满足条件则返回null**
- 要起别名；否则就会**拿整个语句作为别名**
