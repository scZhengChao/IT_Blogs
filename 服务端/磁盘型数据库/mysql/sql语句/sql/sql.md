# sql

## 目录

- [使用CREATE 语句创建索引](#使用CREATE-语句创建索引)
- [批量更新](#批量更新)
- [查询](#查询)
  - [LIKE](#LIKE)
  - [NOT](#NOT)
  - [IS NOT NULL](#IS-NOT-NULL)
  - [order by](#order-by)
  - [between](#between)
  - [in](#in)
  - [top](#top)
  - [ AND  OR](#-AND-OR)
  - [limit](#limit)
  - [DISTINCT ](#DISTINCT)
- [函数](#函数)
  - [1.普通函数](#1普通函数)
  - [2.聚合函数](#2聚合函数)
- [别名](#别名)
- [连表查询](#连表查询)
- [分组：](#分组)

# 使用CREATE 语句创建索引

```sql 
CREATE INDEX index_name ON table_name(column_name,column_name) include(score)
普通索引


CREATE UNIQUE INDEX index_name ON table_name (column_name) ;
非空索引

CREATE PRIMARY KEY INDEX index_name ON table_name (column_name) ;
主键索引
 
 
使用ALTER TABLE语句创建索引
alter table table_name add index index_name (column_list) ;
alter table table_name add unique (column_list) ;
alter table table_name add primary key (column_list) ;


删除索引
drop index index_name on table_name ;
alter table table_name drop index index_name ;
alter table table_name drop primary key ;
```


# 批量更新

```sql 
 每条记录相同的更新
update xxx set name='abc',addtime='' where id in (1,2,3,4,5)
update xxx set name='abc',addtime='' where id = xxx and b=xx

每条记录不同的更新
UPDATE mytable 
    SET myfield = CASE id 
        WHEN 1 THEN 'value'
        WHEN 2 THEN 'value'
        WHEN 3 THEN 'value'
    END,
      myfield2 = CASE id 
        WHEN 1 THEN 'value'
        WHEN 2 THEN 'value'
        WHEN 3 THEN 'value'
    END
WHERE id IN (1,2,3)
```


# 查询

## LIKE

如果表达式与模式匹配，则LIKE运算符返回true。 否则它返回false。&#x20;

LIKE运算符通常用于[SELECT](http://www.yiibai.com/sql/sql-select.html "SELECT")，[UPDATE](http://www.yiibai.com/sql/sql-update.html "UPDATE")或[DELETE](http://www.yiibai.com/sql/sql-delete.html "DELETE")语句的WHERE子句中。&#x20;

要构造模式，请使用两个SQL通配符：&#x20;

- **%百分号匹配零个，一个或多个字符。**
- **\_下划线符号匹配单个字符。**

| 模式                | 含义                             |
| ----------------- | ------------------------------ |
| LIKE 'Yii%'       | 匹配以Yii开始的字符串                   |
| LIKE '%su'        | 匹配以su结尾的字符串                    |
| LIKE '%ch%        | 匹配包含ch的字符串                     |
| LIKE 'Luc \_'     | 以Luc开始，后面只有一个字符，例如：Lucy，Lucc等  |
| LIKE '\_cy'       | 以cy结尾，前面只有一个字符，例如：Lcy，ucy等     |
| LIKE '%yiibai \_' | 包含yiibai，以任意数量的字符开头，最多以一个字符结尾。 |
| LIKE '\_yiibai%'  | 包含yiibai，最多以一个字符开头，以任意数量的字符结尾。 |

```sql 
 SELECT
    employee_id,
    first_name,
    last_name
FROM
    employees
WHERE
    first_name LIKE 'Sh%';


SELECT
    employee_id,
    first_name,
    last_name
FROM
    employees
WHERE
    first_name LIKE '%na';

SELECT
    employee_id,
    first_name,
    last_name
FROM
    employees
WHERE
    last_name LIKE '%en%';


以下语句检索名字以Jo开头且后跟最多2个字符的员工：
SELECT
    employee_id,
    first_name,
    last_name
FROM
    employees
WHERE
    first_name LIKE 'Jo__';


以下语句选择名字以任意数字开头且后跟最多一个字符的员工。
SELECT
    employee_id,
    first_name,
    last_name
FROM
    employees
WHERE
    first_name LIKE '%are_';


```


## NOT

要否定LIKE运算符的结果，可以使用NOT运算符，如下所示：

```sql 
 要查找名字以M开头但不以Ma开头的所有员工，请使用以下语句：
SELECT
    employee_id, first_name, last_name
FROM
    employees
WHERE
    first_name LIKE 'M%'
AND first_name NOT LIKE 'Ma%'
ORDER BY
    first_name;

```


## **IS NOT NULL**

```sql 
  select * fom 'event' where project='阿三哥' AND  href_url  IS NOT NULL ORDER BY time
```


- 如果是空字符串就  字段名 `= '' `
- 如果是`不等于`空字符   字段名` <> ''`  ;
- **如果是 null值  就是  字段名**\*\*`  is null  `或者 \*\*​**`not null`**

## order by

```sql 
select * from 数据表 where 字段名=字段值o rder by 字段名 desc
select * from 数据表 where 字段名 like '%字段值%' order by 字段名 desc

```


- 默认升序ASC
- desc 降序

## between

```sql 
select * from 数据表 where字段名between 值1 and 值2
```


## in

```sql 
select * from 数据表 where 字段名 in ('值1','值2','值3')

select s.name,s.id from student s where s.score in (select p.name from photo p)

```


**event in ('page\_xhr','xhr\_err)   或者**的意思；其中取一个

## top

```sql 
select top 10 * from 数据表 where字段名=字段值 order by 字段名  desc
select top 10 * from 数据表 order by 字段名 desc

```


## \*\* AND  OR\*\*​

`且 / `**`或`**

## limit

\*\*LIMIT 100  查询100条 \*\*  限制条数

```sql 
limit x,n   --偏移x条数，显示n条
// 每页10 条；下面就是 第一页；第二页；第三页
// 没有第二个参数就是 限制多少条;没有偏移量

select * from student order by name desc limit 0,10;    
select * from student order by name desc limit 10,10;
select * from student order by name desc limit 20,10;

```


## \*\*DISTINCT \*\*​

**去重**

```sql 
SELECT DISTINCT 字段名 FROM 表    
SELECT DISTINCT 列名 FROM 表名;

```


# 函数

普通函数和聚合函数:

功能：

- 普通函数：普通函数是对**单个数据**项进行操作和转换的函数，例如对字符串进行处理、日期计算、数学运算等。
- 聚合函数：聚合函数用于对**一组数据**进行统计和汇总操作。它们可以用于查询中的汇总查询，并在结果中返回单个值。如计算总数、平均值、最大值、最小值等。

使用方式：

- 普通函数：普通函数可以直接在SELECT语句、WHERE语句、ORDER BY语句等中使用。它们通常对每一行数据进行处理。（任意地方都可以使用）
- 聚合函数：聚合函数通常用在查询列中，也常与GROUP BY语句结合使用，对具有相同属性值（进行分组）的数据进行统计计算。聚合函数对整个分组的数据进行操作。（只有在Select查询结果中使用）

### 1.普通函数

- 数字相关

```sql 
abs(x)--绝对值,
ceiling()--向上取整
floor()--向下取整,
rand()--返回0-1的随机数
sign()--判断一个数的符号，负数返回-1，正数返回1

```


- 字符串相关

```sql 
concat("","")--连接字符串
insert("a",x,y,"b")--a的字符串中从x开始的y个字符串替换为b
char_length("")--返回字符串的长度
lower('')--变成小写，upper()--变成大写
replace(字段,'a','b')，将字段中的a替换为b
substring_index(str,'xx',num) 把字符串按xx分割，去第num次出现xx前的所有字符

AND LENGTH(STR) < 20     根据字段的长度查询

```


- 其他

```sql 
DATE(xx)--转换为某一天
MD5(xx)
current_date()--获得当前日期
now()获得当前时间点

```


### 2.聚合函数

- 常用函数

```sql 
SUM(字段) AVG()、MAX()、MIN()
count(字段/1/*)：查询列行数,字段会忽略null，*和1基本上差不多

SELECT id SUM(字段名) AS 别名 form ‘events’
SELECT id AVG(字段名) AS 别名 form ‘events’
SELTECT id,COUNT(*) from 'events'  

```


- 分组group by

分组后，生成的聚合函数的值会根据分组数量有多行结果，select可以查询分组列的值，groupBy的值也可以被普通函数包裹

```sql 
SELECT 列1, 列2, ..., 列n,聚合函数...
FROM 表名
WHERE 条件
GROUP BY 列1, 列2, ..., 列n;

例子：
select count(s.id),abs(s.name) as 计数 from student s group by abs(s.name);
```


# 别名

```sql 
select  s.id from （select id from  'events' where project='bota' and id IN (select id from 'events')）s
```


```sql 
SELECT id SUM(字段名) AS 别名 form ‘events’
```


# 连表查询

```sql 
select  s.id from （select id from  'events' where project='bota' and id IN (select id from 'events')）s
```


```sql 
select * from student s join photo p on s.id = p.student_id;

```


- student s ;  s 是 student  的别名
- join  连表查询
- photo  p ; p 是 photo  的别名
- on  等同于 where

```sql 
select photo_url from student s join photo p on s.id = p.student_id where s.score = 100;

```


- 自连表

```sql 
select s.id,s.name,s.score,s.age from student s where s.age = s.score-90;

```


# **分组：**

```sql 
GROUP BY id HAVING COUNT(1）>10

```
