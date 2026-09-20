# 避免索引失效&#x20;

## 目录

- [1). 全值匹配 ，对索引中所有列都指定具体值。](#1-全值匹配-对索引中所有列都指定具体值)
- [2). 最左前缀法则](#2-最左前缀法则)
- [3).   右边的列，不能使用索引 。](#3---右边的列不能使用索引-)
- [4). 不要在索引列上进行运算操作，索引将失效。](#4-不要在索引列上进行运算操作索引将失效)
- [5).字符串不加单引号，造成索引失效。](#5字符串不加单引号造成索引失效)
- [6).用or分割开的条件， 如果or前的条件中的列有索引，而后面的列中没有索引，那么涉及的索引都不会被用到。](#6用or分割开的条件-如果or前的条件中的列有索引而后面的列中没有索引那么涉及的索引都不会被用到)
- [7). 以%开头的Like模糊查询，索引失效。](#7-以开头的Like模糊查询索引失效)
- [8). 如果MySQL评估使用索引比全表更慢，则不使用索引。](#8-如果MySQL评估使用索引比全表更慢则不使用索引)
- [9). in 走索引， not in 索引失效。](#9-in-走索引-not-in-索引失效)

### **1). 全值匹配****，对索引中所有列都指定具体值。**

该情况下，索引生效，执行效率高。

```sql 
explain select * from tb_seller where name='小米科技有限公司' and status='1' and address='上海市';

```


### 2). 最左前缀法则

如果索引了多列，这里指**的是复合索引(联合索引)，要遵守最左前缀法则**。指的是查询从索引的最左前列开始，并且不跳过索引中的列。

注意：如果条件中包含了复合索引的全部字段，那么可以不考虑前后顺序。

![](./image/image_19_9V_miA2.png)

匹配最左前缀法则，走索引：

```sql 
1.explain select * from tb_seller where name='小米科技有限公司'; -- key_len表示索引字段的长度即占字节个数，不同的编码表计算方式不一致
2.explain select * from tb_seller where name='小米科技有限公司' and status='1'; 
3.explain select * from tb_seller where name='小米科技有限公司' and status='1' and address='上海市';
```


**违反最左前缀法则 ， 索引失效：**

```sql 
4.explain select * from tb_seller where status='1';
5.explain select * from tb_seller where status='1' and address='上海市';

```


如果符合最左法**则，但是出现跳跃某一列，只有最左列索引生效：**

```sql 
.explain select * from tb_seller where name='小米科技有限公司' and address='上海市';

```


注意：上述sql语句跳跃了status这一列，所以上述sql语句只是对索引name生效，key\_len的结果403只是name索引的长度，而address索引字段并没有起到所以效果。

注意：如果条件中包含**了复合索引的全部字段，那么可以不考虑前后顺序。**

```sql 
explain select * from tb_seller where address='上海市' and status='1' and name='小米科技有限公司' ;

```


# **3).   右边的列，不能使用索引 。**

```sql 
1.explain select * from tb_seller where name='小米科技有限公司' and status='1' and address='上海市';
2.explain select * from tb_seller where name='小米科技有限公司' and status>'1' and address='上海市'; -- 只有name和status索引生效

```


```markdown 
参考为何失效：https://blog.csdn.net/weixin_52534279/article/details/119308663
```


根据前面的两个字段name ， status 查询是走索引的， 但是最后一个条件address 没有用到索引。

# **4). 不要在索引列上进行运算操作，索引将失效。**

```sql 
1.-- 3 表示索引 2 表示截取2个字符
select * from tb_seller where substring(name,3,2)='科技';

2.explain select * from tb_seller where substring(name,3,2)='科技';

```


# **5).****字符串不加单引号****，造成索引失效。**

```sql 
1.explain select * from tb_seller where name='小米科技有限公司' and status='1';
2.explain select * from tb_seller where name='小米科技有限公司' and status=1; -- 这里name索引字段生效，status索引字段是无效的

```


由于，在查询时，没有对字符串加单引号，MySQL的查询优化器，会自动的进行类型转换，造成索引失效。

# 6).用or分割开的条件， 如果or前的条件中的列有索引，而后面的列中没有索引，那么涉及的索引都不会被用到。

示例，name字段是索引列 ， 而createtime不是索引列，中间是or进行连接是不走索引的 ：

```sql 
1.explain select * from tb_seller where name='传智播客教育科技有限公司' and createtime = '2088-01-01 12:00:00';
2.explain select * from tb_seller where name='传智播客教育科技有限公司' or createtime = '2088-01-01 12:00:00';

```


# **7)****. 以%开头****的Like模糊查询，索引失效。**

如果仅仅是尾部模糊匹配，索引不会失效。如果是头部模糊匹配，索引失效。

```sql 
1.explain select * from tb_seller where name like '传智播客%';
2.explain select * from tb_seller where name like '%传智播客';
3.explain select * from tb_seller where name like '%传智播客%';

```


```markdown 
参考网站：https://ask.csdn.net/questions/1095456?utm_medium=distribute.pc_aggpage_search_result.none-task-ask_topic-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-1-1095456.pc_agg_new_rank&utm_term=%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%BF%E7%94%A8like+%E7%B4%A2%E5%BC%95%E4%BC%9A%E5%A4%B1%E6%95%88&spm=1000.2123.3001.4430
```


解决方案 ：通过覆盖索引来解决.

```sql 
1.explain select sellerid from tb_seller where name like '%传智播客%';
2.explain select sellerid,name from tb_seller where name like '%传智播客%';
3.explain select sellerid,name,status,address from tb_seller where name like '%传智播客%';
4.explain select sellerid,name,status,address,password from tb_seller where name like '%传智播客%';
```


说明：解决上述sql语句索引失效情况需要使用覆盖索引，而password子字段无索引，所以索引失效。

# **8). 如果MySQL评估使用索引比全表更慢，则不使用索引。**

```sql 
1.show index from tb_seller; -- 查看下索引
2.create index idx_address on tb_seller(address); -- 单独创建 address字段为索引
3.explain select * from tb_seller where address='北京市'; -- 走索引，反而效率更低，全表扫描
4.explain select * from tb_seller where address='上海市';
```


# **9). in 走索引， not in 索引失效。**

```sql 
1.explain select * from tb_seller where sellerid in('baidu','huawei','xiaomi');

2.explain select * from tb_seller where sellerid not in('baidu','huawei','xiaomi');

```


![](./image/image_YNJbMPSw3m.png)
