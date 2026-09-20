# 默认值约束

## 目录

- [作用：](#作用)
- [语法：](#语法)
- [练习](#练习)

# 作用：

被默认值约束的字段，相当于给字段添加默认值，**插入数据时如果字段没有被赋值,则使用默认值。**

> `null` 也**是数据值；**

# 语法：

\*\*默认值约束需要使用关键字： \*\***`default`**

创建表时指定

```sql 
CREATE TABLE 表名 (
    字段名 字段类型 DEFAULT 默认值 ， 
    其他字段
);


```


已有表给指定字段添加默认值约束

```sql 
ALTER TABLE 表名 modify 字段 类型 DEFAULT 默认值;


```


# 练习

创建学生表, 包含字段(id, name, address),id设置为主键自增约束，name这一列设置非空约束，address 设置地址默认值是广州
**参考：**

```sql 
CREATE TABLE st9 (
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(20) NOT NULL,
    address varchar(100) DEFAULT '上海'
);


```
