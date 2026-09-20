# 日期函数

## 目录

- [练习](#练习)

![](./assets/image/image_1-wkmrJhe0.png)

|                   |              |                                    |
| ----------------- | ------------ | ---------------------------------- |
| 函数名               | 描述           | 实例                                 |
| NOW() 和 SYSDATE() | 返回系统的当前日期和时间 | SELECT NOW(O); 或 SELECT SYSDATE(); |
| CURDATE()         | 返回当前日期       | SELECT CURDATEO);                  |
| CURTIMEO          | 返回当前系统时间     | SELECT CURTIME();                  |
| YEAR(d)           | 返回d的中的年份     | SELECT YEAR(NOWO);                 |
| MONTH(d)          | 返回d的中的月份     | SELECT MONTH(NOWO);                |
| DAY(d)            | 返回d中的日       | SELECT DAY(NOWO);                  |
| WEEK(d)           | 返回d为一年中的第几周  | SELECT WEEK(NOWO);                 |

# 练习

```sql 
select now();




// concat 字符串函数
select name,concat(month(birthday).,’月'，day(birthday),'日')as"生日”from student:

```
