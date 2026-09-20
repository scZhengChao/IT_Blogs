# 如何更好的与数据库交互？

## 目录

- [数据库](#数据库)
  - [  存储方式:                ](#--存储方式----------------)
- [TiDB](#TiDB)
- [原生或者orm](#原生或者orm)
  - [区别:](#区别)
  - [orm优势:](#orm优势)
  - [原则:](#原则)
- [连接池：](#连接池)

# **数据库**

**`mongodb`**\*\*   和   ​`mysql`\*\***对比  最大的区别**

| 名词 | mysql\&#x20;                 | mongoDb          |
| -- | ---------------------------- | ---------------- |
|    | database(库) \&#x20;          | database(库)      |
|    | table(表)                     | collection(集合)   |
|    | row(一条数据)                    | document(文档)     |
|    | column(字段)           \&#x20; | \&#x20;field(区域) |

### &#x20; 存储方式:               &#x20;

- mysql 二维表
- MongoDB json

# TiDB

TiDB，正是 NewSQL 的一个杰出代表！站在业务开发的视角，TiDB 最吸引人的几大特性是：

- 支持 MySQL 协议（开发接入成本低）；
- 100% 支持事务（数据一致性实现简单、可靠）；
- &#x20;无限水平拓展（不必考虑分库分表）

TiDB 在业务开发中是值得推广和实践的，但是 **，它毕竟不是传统的关系型数据库，以致我们对关系型数据库的一些使用经验和积累，在 TiDB 中是存在差异的，** 现主要阐述“事务”和“查询”两方面的差异。

tidb数据库和mysql的区别为：开发公司不同、事务更新机制不同、事务方式不同。

一、开发公司不同
1、tidb数据库：tidb数据库是北京的创业公司PingCAP的产品。
2、mysql：mysql是由瑞典MySQL AB 公司开发，属于 Oracle 旗下产品。

二、事务更新机制不同
1、tidb数据库：tidb数据库采用乐观锁机制来保证事务更新的一致性和持久性。
2、mysql：mysql采用redo log机制来保证事务更新的一致性和持久性。

三、事务方式不同
1、tidb数据库：tidb数据库使用的是扁平事务。
2、mysql：mysql使用的是分布式事务。

**TiDB 可随着你的业务增长而伸缩，只需要通过增加更多的机器来满足业务增长需要**

异步的 schema 调整
**TiDB scheme 可随时进行调整来满足需求，添加列和索引并不会影响进行中的操作**

一致性的分布式事务
你可以把 TiDB 想象成一个单机的 RDBMS，而事务可以在多服务器间进行，无需担心一致性问题。TiDB 让你的应用代码简单而且可靠.

# 原生或者orm

- **使用数据库的**自带的查询语言（比如SQL）
- **使用对象数据模型("ODM")或对象关系模型 ("ORM")。一个ODM或ORM对象代表的就是一个映射到底层数据库的数据对象比如说JSON对象。一些ORM对象是指定数据库的，一些则不然**

### **区别:**

- **使用SQL语言或者其他数据库支持的语言可以获得很好的性能。**
- **ODM则相对比较慢，****因为需要****代码去转换映射的对象和数据库中的格式**，所以他生成的**查询语句可能不够高效**（尤其是在ODM`为了支持不同的数据库后台，这时必须对数据库功能做出极大的妥协）
  `

### **orm优势:**

&#x20;   **使用ORM的优势在于程序员可以****一直关注与JavaScript 对象而不是数据库语义****，尤其是在****你需要和不同的数据库交互****（可能是同一应用，或不同应用）。ORM也提供了清晰方式去校验检查数据。**

### **原则:**

&#x20;  **使用ODM或ORM****可以降低开发和维护成本****，除非****你非常擅长原生查询语言****，****或对性能要求很高****，否则你都应该优先考虑使用ODM或ORM。**

# **连接池：**

&#x20;         数据库连接池负责**分配，管理和释放数据库连接**，它允许应用程序**重复使用一个现有的数据库连接**，而不是在重新建立一个；**释放空闲时间超过最大空闲时间的数据库连接来避免因为没有释放数据库连接而引起的数据库连接遗漏**。这项技术能明显提高对数据库操作的性能；

如何观察mysql连接：`mysqladmin -uroot -pexample processlist`

一个巧妙的js 模拟连接池并发过程：  （下面代码是完成一个释放一个；非连接池）

```javascript 
 const sleep = delay => new Promise(resolve => setTimeout(resolve, delay))  //延迟 
 const asyncFun = async (fun, curMax = 4, sum = 200) => {  //请求函数 最大连接池  总共请求数 
     let num = 0 
     let curNum = 0 
     console.log('beginTime:' + new Date().toLocaleString()) 
     const result = [] 
     while (num !== sum) {  // 没完成请求数之前 始终执行 
         if (curNum <= curMax) {  // 没到达最大并发数之前 始终进入if 内 模拟连接池上线 
             result.push(new Promise(async resolve => { 
                 console.log(`Process Run 并发数:${curNum} 完成:${num}/${sum} `) 
                 res = await fun()  // 等待连接空闲 被释放 
                 curNum--   //释放 
                 resolve(res) 
             })) 
             num++ 
             curNum++ 
         } else { 
             await sleep(10) 
         } 
     } 
     console.log('endTime:' + new Date().toLocaleString()) 
 } 
 module.exports = {asyncFun} 
 
 
 // 测试 
 // const test = async () => { 
 //     const delay = (Math.random() * 1000).toFixed() 
 //     await sleep(delay) 
 // } 
 // setTimeout(() => asyncFun(test, 4, 200)) 
 

```
