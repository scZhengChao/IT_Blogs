# 2. Redis的数据类型【重点】

## 目录

- [1、数据类型介绍](#1数据类型介绍)
  - [1.1Redis的5种数据类型](#11Redis的5种数据类型)

### 1、数据类型介绍

#### 1.1Redis的5种数据类型

redis是一种高级的key-value的存储系统，**键是string类型，其中value支持五种数据类型**，对于键和值的描述如下所示：

**键(key)：**

【1】键不能重复

【2】作用：标识存储的数据

【3】数据类型：string

【4】命名规则：

1）不能太长：因为查询的效率低，查询起来不方便

2）不能太短：容易重复，同时可读性也差

3）按照规范：HEIMA\_STU\_LIST

**值(value)：** ​**支持5种数据类型**

| 值的数据类型          | 值的格式说明                          |
| --------------- | ------------------------------- |
| string          | 字符串类型，类似于Java中String            |
| hash            | 由键值对组成，类似于Java中Map              |
| list            | 列表类型，类似于Java中List，元素是存取有序，可以重复。 |
| set             | 集合类型，类似于Java中Set，元素是存取无序，不可重复   |
| sorted set/zset | 有序的集合类型，每个元素有一个分数用来决定它的顺序。      |

![](./assets/image/image_SyBbLkl8VE.png)

[2、string类型的操作命令](./2、string类型的操作命令/index.md "2、string类型的操作命令")

[3、hash类型的操作命令](./3、hash类型的操作命令/index.md "3、hash类型的操作命令")

[4、list类型的操作命令](./4、list类型的操作命令/index.md "4、list类型的操作命令")

[5、set类型的操作命令](./5、set类型的操作命令/index.md "5、set类型的操作命令")

[6. zset/sorted set类型的操作命令](<./6. zset-sorted set类型的操作命令/index.md> "6. zset/sorted set类型的操作命令")
