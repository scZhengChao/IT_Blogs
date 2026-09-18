# 在PHP中使用MySQL

## 目录

- [连接数据库管理系统函数：](#连接数据库管理系统函数)
- [选择数据库：](#选择数据库)
  - [ 查询语句（执行一条sql语句）：](#-查询语句执行一条sql语句)
  - [设置字符集：](#设置字符集)
  - [插入数据：](#插入数据)
  - [更新数据：](#更新数据)
  - [删除记录：](#删除记录)
  - [查询记录：](#查询记录)
  - [操作报错](#操作报错)
  - [断开数据库的函数：](#断开数据库的函数)

# 连接数据库管理系统函数：

```php 
$link = mysql_connect(host,username,password);
```


参数释义：

- host，mysql的主机名或ip地址
- usernane，mysql用户名
- pasword，mysql密码

返回值：

- 当连接成功时返回连接标识符
- 当连接失败时返回false

# 选择数据库：

```php 
mysql_select_db(数据库名称, $link);
```


- 参数2可选，当有多个mysql连接时，选择要操作的连接，默认为最近一次连接
- 选择成功返回true，选择失败返回false

&#x20;

#### &#x20;查询语句（执行一条sql语句）：

```php 
mysql_query(sql命令,$link);
```


- 参数2可选，当有多个mysql连接时，选择要操作的连接，默认为最近一次连接
- insert时，执行成功返回true，执行失败返回false

#### 设置字符集：

```php 
mysql_query("set names utf8");
```


#### 插入数据：

```php 
$query1 = "insert db_name(字段名) values(对应值)";
mysql_query($query1);

```


&#x20;        &#x20;

#### 更新数据：

```php 
$query2 = "update db_name set 字段名=值 where 条件";

mysql_query($query2);
```


&#x20;   &#x20;

#### 删除记录：

```php 
$query3 = "delete from db_name where 条件"
mysql_query($query3);
```


#### 查询记录：

```php 
$query4 = "select * from db_name";
$res = mysql_query($query4);
```


- 矩阵方式查看数据：

```php 
mysql_result($res,0,1);
mysql_fetch_array($res)

```


- 索引数组查看数据：

```php 
mysql_fetch_row($res);
```


- 关联数组查看数据：

```php 
mysql_fetch_assoc($res);
```


- 对象方式查看数据：

```php 
mysql_fetch_object($res);
```


          以上三种方式每次执行返回一条记录的数据，可配合循环多次执行，查询所有数据

&#x20;  &#x20;

#### 操作报错

```php 
 mysql_error( $link );

```


- 返回上一个mysql操作产生的文本报错
- 参数1可选，为要显示错误信息的mysql连接

#### 断开数据库的函数：

```php 
mysql_close($link);
```


- 断开连接，参数可选，为要断开连接的数据库
- 程序执行完毕自动断开，可省略不用
