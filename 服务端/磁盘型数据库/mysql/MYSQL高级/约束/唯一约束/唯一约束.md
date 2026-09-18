# 唯一约束

## 目录

- [作用：](#作用)
- [语法：](#语法)
- [练习](#练习)

# 作用：

被唯一约束的字段，**本列数据不允许出现重复数据，null除外，null可以出现多个。**

> 为啥有了主键还需要唯一约束
> **主键只能有一个；唯一约束可以有多个**

# 语法：

唯一约束需要使用关键字：`unique`

创建表时指定

```sql 
create table  表名(   
    字段名 字段类型 unique,    
    ......
);

```


已有表给指定字段添加唯一约束

```sql 
alter table 表名 add unique(字段);
```


# 练习

```sql 
练习 ：创建学生表,
包含字段 (id, name),
id设置为主键自增约束 ，name这一列设置唯一约束;

参考 ： CREATE TABLE st1 (
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(20) UNIQUE
);

-- 注意：唯一约束字段下允许存在多个null值
INSERT INTO st1 (name)
    VALUES (NULL);

INSERT INTO st1 (name)
    VALUES (NULL);


```
