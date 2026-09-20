# 外连接查询

## 目录

- [左外连接：
  ](#左外连接)
- [右外连接：](#右外连接)
- [练习](#练习)

![](./assets/image/image_xD5TJ_sNGI.png)

**外连接查询有两种方式：**

左外连接：

左外连接：左表中所有的记录都出现在结果中 **，如果右表没有匹配的记录，使用NULL填充。**

```sql 
select 列名 from 左表 left join 右表 on 从表.外键=主表.主键
```


![](./assets/image/image_KfSmwNTa5q.png)

# 右外连接：

右外连接：右表中所有的记录都出现在结果中，**如果左表没有对应的记录，使用NULL填充。**

```sql 
select 列名 from 左表 right join 右表 on 从表.外键=主表.主键 
```


![](./assets/image/image_SqZpsh7y5H.png)

# 练习

左外连接练习
需求1：查询所有的部门，以及该部门下面的员工

```sql 
select * from dept d left join emp e on d.id = e.dept_id;
```


右外连接练习
需求2：查询所有员工，以及员工所属的部门

```sql 
select * from dept d right join emp e on d.id = e.dept_id;
```


![](./assets/image/image_0ZRIEeXAyK.png)
