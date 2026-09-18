# 数据库基础

## 目录

- [数据库简介](#数据库简介)
  - [概念](#概念)
    - [索引：](#索引)
    - [数据表的列字段属性](#数据表的列字段属性)
- [安装和配置MySQL](#安装和配置MySQL)
  - [安装：](#安装)
  - [配置：](#配置)
  - [修改](#修改)
  - [在命令窗口使用MySQL](#在命令窗口使用MySQL)
  - [登录过程中出现1103报错:](#登录过程中出现1103报错)
  - [登录过程中出现1045报错:](#登录过程中出现1045报错)
  - [退出：](#退出)
  - [修改MySql提示符（头像）](#修改MySql提示符头像)
  - [MySql常用命令](#MySql常用命令)
  - [MySQL语句的规范：](#MySQL语句的规范)
  - [ 创建数据库：](#创建数据库)
  - [ 查看错误信息：](#查看错误信息)
  - [查看编码格式：](#查看编码格式)
  - [查看当前服务器下的数据库列表：](#查看当前服务器下的数据库列表)
  - [ 修改数据库：](#修改数据库)
  - [删除数据库：](#删除数据库)
  - [选择数据库：](#选择数据库)
  - [ 显示当前数据库：](#显示当前数据库)
  - [创建数据表(创建字段名)：](#创建数据表创建字段名)
  - [ 显示数据表列表：](#显示数据表列表)
  - [ 显示数据表的结构：](#显示数据表的结构)
  - [插入记录(创建字段下的数据)：](#插入记录创建字段下的数据)
  - [查找记录：](#查找记录)
  - [删除行](#删除行)
  - [修改数据表：](#修改数据表)
  - [eg:](#eg)

# 数据库简介

&#x20;     数据库是按照**数据结构来组织、存储和管理数据的仓库**，每个数据库都有一个或多个不同的API用于创建，访问，管理，搜索和复制所保存的数据。我们也可以将数据存储在文件中，但是在文件中读写数据速度相对较慢。所以我们使用**关系型数据库管理系统，来存储和管理大量的数据。**

     所谓**关系型数据库，是建立在关系模型基础上的数据库，** 借助与集合代数等数学概念和方法来处理数据库中的数据。其特点为：

1. 数据以表格形式出现；
2. 每行为各种记录的名称；
3. 每列为记录名称所对应的数据域；
4. 许多行和列组成一张表单；
5. 若干的表单组成database

&#x20;  &#x20;

## 概念

- 数据库：数据库是一**些关联表的集合**；
- 数据表：表是数据的矩阵，在一个数据表中的表看起**来像是一个简单的电子表格；**
- 列：一列数据元素，包含了相同的数据；
- 行：一行记录，是一组相关的数据；
- 冗余：存储两倍数据，冗余降低了性能，但提高了数据的安全性；

#### 索引：

- 主键：**是唯一的，一个数据表只能包含一个主键，可以用主键查询数据**；
- 外键：**用于关联两个表；**
- 复合键：将**多列作为一个索引键，一般用于复合索引。**
- 索引：使用索引可**以快速访问数据库表中的特定信息**，索引是对数据表中一列或多列的值进行排序的一种结构，类似书籍中的目录
- 参照完整性：参照完整性要求关系中不允许引用不存在的实体，与实体完整性是关系模型必须满足的完整性约束条件，目前的是保证数据的一致性。
- MySQL是一个开源的关系型数据库管理系统。目前属于Oracle公司。

#### 数据表的列字段属性

```sql 
int: 列类型
Unsigned：无符号的整数、声明了不能为负数；
自增：auto_increment,自动在上一条+1；
非空：not null,不给赋值就会报错

```


***

# 安装和配置MySQL

Typical是典型安装，Custom是自定义安装，Complete是完全安装，选择Typical典型安装

#### 安装：

- 链接: [https://pan.baidu.com/s/1LqQHXcOg27MRLzZEUdEJHA](https://pan.baidu.com/s/1LqQHXcOg27MRLzZEUdEJHA "https://pan.baidu.com/s/1LqQHXcOg27MRLzZEUdEJHA")
- 密码: 3rdc

&#x20;    勾选Launch the MySQL Instance Configuration Wizard，点击Finishi，出现配置向导界面，安装完成也可以打开安装目录，找到bin文件夹中的MySQLInstanceConfig.exe打开配置向导

#### 配置：

- 选择标准配置Standard Configuration
- 勾选设置全局路径
- 设置root用户密码
- 执行配置向导，等待完成
- 打开my.ini查询端口号port，默认为3306

#### 修改

- default-character-set=latin1  为  default-character-set=utf8
- character-set-server=latin1    为   character-set-server=utf8
- default-storage-engine=INNODB    为    default-storage-engine=MYISAM

#### 在命令窗口使用MySQL

- 启动：net start mysql
- 停止：net stop mysql
- 登录mysql参数：
  - mysql -V查看版本号
  - mysql -u指定用户名，如mysql -uroot
  - mysql -p指定密码，同上
  - mysql -P指定端口号，如mysql -P3306
  - mysql -h指定服务器名，如mysql -hlocalhost

#### 登录过程中出现1103报错:

- [https://blog.csdn.net/qwuiop123/article/details/52280156](https://blog.csdn.net/qwuiop123/article/details/52280156 "https://blog.csdn.net/qwuiop123/article/details/52280156")

#### 登录过程中出现1045报错:

- [https://blog.csdn.net/chaofei\_liang/article/details/70193824](https://blog.csdn.net/chaofei_liang/article/details/70193824 "https://blog.csdn.net/chaofei_liang/article/details/70193824")

#### 退出：

- exit
- quit
- &#x20;\q

#### 修改MySql提示符（头像）

- 登陆时mysql -uroot -p --prompt 提示符
- 登陆后使用prompt 提示符
- 提示符：
  - &#x20;\D     完整的日期
  - &#x20;\d     当前数据库
  - \h     服务器名称
  - \u     当前用户
    prompt \h@\u \d>>>

&#x20;   &#x20;

#### MySql常用命令

- SELECT VERSION();显示当前服务器版本
- SELECT NOW();显示当前日期时间
- SELECT USER();显示当前用户

#### MySQL语句的规范：

1. 关键字与函数名称全部大写
2. 数据库名称，表名称，字段名称全部小写
3. SQL语句必须以分号结尾

&#x20;&#x20;

####  创建数据库：

```sql 
CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name  
[DEFAULT] CHARACTER SET [=] charset_name     //设置编码方式
```


&#x20; &#x20;

####  查看错误信息：

```sql 
SHOW WARNINGS;
```


&#x20;

#### 查看编码格式：

```sql 
SHOW CREATE DATABASE db_name;
```


#### 查看当前服务器下的数据库列表：

```sql 
SHOW {DATABASES | SCHEMA};
```


####  修改数据库：

```sql 
ALTER {DATABASE | SCHEMA} [db_name]

[DEFAULT] CHARACTER SET [=] charset_name
```


#### 删除数据库：

```sql 
DROP {DATABASE | SCHEMA} [IF EXISTS] db_name;
```


#### 选择数据库：

```sql 
USE db_name;
```


####  显示当前数据库：

```sql 
 SELECT DATABASE();
```


   &#x20;

#### 创建数据表(创建字段名)：

```sql 
CREATE TABLE [IF NOT EXISTS] table_name (

     column_name data_type,

     ......

)
```


&#x20;   &#x20;

####  显示数据表列表：

```sql 
 SHOW TABLES [FROM db_name];
```


&#x20;

####  显示数据表的结构：

```sql 
SHOW COLUMNS FROM tb_name;
```


#### 插入记录(创建字段下的数据)：

```sql 
INSERT [INTO] tb_name [(col_name,...)] VALUES (val,...);
 
 
insert into `grade`表名 (列1,列2.。。不写默认all) values (值1,值11,..),(值2，值21,..),(值3，值31,..)...

例如：insert into `front_test` (`id`,`name`) values (123,'郎云松'),(456,'时石');

```


#### 查找记录：

```sql 
SELECT expr,... FROM tb_name;
```


#### 删除行

```sql 
delete from 表  where 条件

例如：DELETE FROM license_dev.license_handover WHERE id = 1;
```


#### 修改数据表：

- &#x20;添加列：

```sql 
添加一列：
ALTER TABLE tb_name ADD [COLUMN] column_name data_type [FIRST | AFTER column_name];
添加多列：
ALTER TABLE tb_name ADD [COLUMN] (column_name data_type,…);

```


- 删除列：

```sql 
删除一列：
ALTER TABLE tb_name DROP [COLUMN] column_name,
删除多列：
DROP [COLUMN] column_name,……

```


- &#x20; 插入记录INSERT：

```sql 
INSERT [INTO] tb_name [(column_name,…)] { VALUES |VALUE } ({expr | DEFAULT},…),(…),…

INSERT [INTO] tb_name SET column_name={expr | DEFAULT},…,…

INSERT [INTO] tb_name [(column_name,…)] SELECT …
```


- 更新记录UPDATE：

```sql 
UPDATE [LOW_PRIORITY] [IGNORE] tb_name SET column_name1={expr1 | DEFAULT} [, column_name2={expr2 | DEFAULT}]... [WHERE where_condition]


update 修改谁 set 修改1="xx",... where 条件确定行;
例如：update `student` set `name`="云松" where id=001;

```


#### eg:

```sql 
UPDATE users SET age = age + 5, sex = 2 WHERE username='TOM’;

//删除记录DELETE：
DELETE FROM tb_name [WHERE where_condition]
 
//排序：
SELECT * FROM stu ORDER BY 笔试 LIMIT 0,8

```


int
