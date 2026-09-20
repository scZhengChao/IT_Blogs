# 原理和特性

## 目录

- [原理](#原理)
- [特性](#特性)
  - [1、隔离性（Isolation）](#1隔离性Isolation)
  - [2、持久性(Durability)](#2持久性Durability)
  - [3、原子性(Atomicity)&#x20;    ](#3原子性Atomicity-)
  - [4、一致性(Consistency)    ](#4一致性Consistency)

# 原理

![](./image/image_kZVJ-gJpPt.png)

# 特性

数据库的事务必须具备`ACID`特性，`ACID`是指 `Atomicity`（原子性）、`Consistensy`（一致性）、`Isolation`（隔离性）和`Durability`（持久性）的英文缩写。&#x20;

### 1、隔离性（Isolation）

> 一个链接会生成多个临时文件

\*\*多个用户并发的访问数据库时，一个用户的事务不能被其他用户的事务干扰，多个并发的事务之间要相互隔离。 \*\*

![](./image/image_ObcDEJCDpI.png)

### 2、持久性(Durability)

\*\*当事务提交或回滚后，数据库会持久化的保存数据。 \*\*

![](./image/image_3VKJtbCmQ0.png)

### 3、原子性(Atomicity) &#xD;

\*\*原子是不可分割的最小操作单位，事务要么同时成功，要么同时失败。。 \*\*

最小逻辑单元；不能在拆分

### 4、一致性(Consistency)&#xD;

**事务操作前后，数据总量不变**

![](./image/image_lVE_qbaZnn.png)
