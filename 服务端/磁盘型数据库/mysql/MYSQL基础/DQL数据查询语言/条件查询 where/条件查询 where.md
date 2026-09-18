# 条件查询 where

## 目录

- [条件查询语法](#条件查询语法)
- [条件](#条件)
- [注意](#注意)
- [查询案例](#查询案例)
  - [查询age不等于20岁的学生](#查询age不等于20岁的学生)
  - [查询age大于35且性别为男的学生(两个条件同时满足)](#查询age大于35且性别为男的学生两个条件同时满足)
  - [查询age大于35或性别为男的学生(两个条件其中一个满足)](#查询age大于35或性别为男的学生两个条件其中一个满足)
  - [使用in完成查询id是1或3或5的学生](#使用in完成查询id是1或3或5的学生)
  - [查询id不是1或3或5的学生](#查询id不是1或3或5的学生)
  - [范围    ](#范围)
  - [模糊查询like](#模糊查询like)

# 条件查询语法

```sql 
SELECT 字段列表 FROM 表名 WHERE 条件列表;
```


# 条件

![](image_NtXomahszt.png)

# 注意

- ` null` 值

# 查询案例

##### 查询age不等于20岁的学生

```sql 
SELECT * FROM student3 WHERE age!=20;SELECT * FROM student3 WHERE age<>20;
```


##### 查询age大于35且性别为男的学生(两个条件同时满足)

```sql 
SELECT * FROM student3 WHERE  age>35 AND sex='男';
```


##### 查询age大于35或性别为男的学生(两个条件其中一个满足)

```sql 
SELECT * FROM student333 WHERE age>35 OR sex='男';
```


##### 使用in完成查询id是1或3或5的学生

```sql 
SELECT * FROM student3 WHERE id IN (1,3,5);
```


##### 查询id不是1或3或5的学生

```sql 
SELECT * FROM student3 WHERE id NOT IN (1,3,5);
```


##### 范围&#xD;

```sql 
BETWEEN 值1 AND 值2 -- 表示从值1到值2范围，包头又包尾比如：age BETWEEN 80 AND 100相当于： age>=80 && age<=100 
```


查询english成绩大于等于75，且小于等于90的学生

```sql 
SELECT * FROM student3 WHERE english>=75 AND english<=90;SELECT * FROM student3 WHERE english BETWEEN 75 AND 90;
```


##### 模糊查询like

```sql 
SELECT * FROM 表名 WHERE 字段名 LIKE '通配符字符串’;


```


满足通配符字符串规则的数据就会显示出来所谓的通配符字符串就是含有通配符的字符串
MySQL通配符有两个：

- \*\*%: 表示零个一个多个字符(任意多个字符)  \*\*
- **\_: 表示一个字符**

```sql 
//查询姓马的学生
SELECT * FROM student3 WHERE NAME LIKE '马%';

// 查询姓名中包含'德'字的学生
SELECT * FROM student3 WHERE NAME LIKE '%德%';

// 查询姓马，且姓名有三个字的学生
SELECT * FROM student3 WHERE NAME LIKE '马__';

```
