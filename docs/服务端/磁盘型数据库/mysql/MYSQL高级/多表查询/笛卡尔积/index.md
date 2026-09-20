# 笛卡尔积

## 目录

- [除笛卡尔积方式](#除笛卡尔积方式)
- [练习：](#练习)

![](./assets/image/image_v3SR6ij2ta.png)

- **多张表的每行数据进行了交叉查询；**
- **多张表查询时每张表的每条数据组合成的数据结果集，叫做笛卡尔积**

我们发现不是\*\*所有的数据组合都是有用的，只有员工表.dept\_id = \*\*[**部门表.id**](http://xn--co2a07oz8d.id "部门表.id") 的数据才是有用的。**所以需要通过条件过滤掉没用的数据**， 消

# 除笛卡尔积方式

> **条件：从表.外键 = 主表.主键**

# 练习：

查询所有的员工和所有的部门

```sql 
select * from emp,dept where emp.dept_id = dept.id;

```


查询孙悟空的信息及其部门信息。
&#x20;

```sql 
SELECT
    *
FROM
    emp e,
    dept d
WHERE
    e.dept_id = d.id
    AND e.id = 1;


```
