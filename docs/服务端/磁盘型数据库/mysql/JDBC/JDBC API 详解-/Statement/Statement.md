# Statement

## 目录

- [Statement作用：  ](#Statement作用)
- [执行SQL语句  ](#执行SQL语句)

Statement作用：

- 执行SQL语句

执行SQL语句

```java 
int    executeUpdate(sql)：执行DML、DDL语句


```


返回值：

(1) DML语句影响的行数; 0 失败；

&#x20;(2) DDL语句执行后，执行成功返回 0

```java 
ResultSet    executeQuery(sql)：执行DQL 语句 


```


返回值： ResultSet 结果集对象&#x20;
