# where 和 on的区别

where&#x20;

条件；不能使用聚合函数;   可以用于单表查询；也可以用于多表查询。

on

条件： 通常用来消除笛卡尔集； 仅用于多表查询；

where 和 on 都可以用来消除笛卡尔集

区别

where 在多表连接查询后；消除笛卡尔集

on在多表连接查询时；消除笛卡尔集；

多表查询时推荐

select ... from  table1 inner join table2 on ....&#x20;
