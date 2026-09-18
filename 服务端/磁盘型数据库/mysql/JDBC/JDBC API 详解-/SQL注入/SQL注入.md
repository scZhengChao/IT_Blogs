# SQL注入

## 目录

- [1 什么是SQL注入](#1-什么是SQL注入)
- [1.获取PreparedStatement对象  ](#1获取PreparedStatement对象)
- [操作步骤：  ](#操作步骤)
  - [步骤一：](#步骤一)
  - [步骤二：](#步骤二)
  - [步骤三、](#步骤三)
- [PreparedStatement 原理  ](#PreparedStatement-原理)
  - [PreparedStatement 好处：](#PreparedStatement-好处)
  - [PrparedStatement 原理：](#PrparedStatement-原理)

# 1 什么是SQL注入

- 由于没有对用户输入进行充分检查，**而SQL又是拼接而成，在用户输入参数时，在参数中添加一些SQL 关键**字，达到改变SQL运行结果的目的，也可以完成恶意攻击。
- 简单来说就是：用户在页面**提交数据的时候人为的添加一些特殊字符，使得sql语句的结构发生了变化，最终可以在没有用户名或者密码的情况下进行登录。**

1.获取PreparedStatement对象

`PreparedStatement`是`Statement`的**子接口**，可以防止`sql`注入问题。可以通过`Connection`接口中的`prepareStatement(sql)`方法获得`PreparedStatement`的对象。

```java 
//创建一个 PreparedStatement 对象来将参数化的 SQL 语句发送到数据库 PreparedStatement prepareStatement(String sql) throws SQLException;
```


> 注意：**sql提前创建好的，sql语句中需要参数。使用？进行占位，比如：**`select *from user where username=? and password = ?;`

操作步骤：

#### 步骤一：

```java 
PreparedStatement  pstmt =  conn.prepareStatement(sql); -----需要你事先传递sql模板。如果sql需要参数，使用？进行占位。
```


#### 步骤二：

设置参数（执行sql之前）：

```java 
pstmt.setXXX(int index, 要放入的值) 
-----根据不同类型的数据进行方法的选择。第一个参数index表示的是？出现的位置。从1开始计数，有几个问号，就需要传递几个参数。

```


方法的参数说明：

- 第一个参数：int index ;表示的是问号出现的位置。 问号是从1开始计数
- 第二个参数：给问号的位置传入的值。

#### 步骤三、

执行，不需要在传递sql了。

```java 
pstmt.executeQuery();---执行select
pstmt.executeUpdate();---执行insert，delete，update
```


PreparedStatement 原理

#### PreparedStatement 好处：

- 预编译SQL，性能更高
- **防止SQL注入**：**将敏感字符进行转义**

#### PrparedStatement 原理：

- 在获取PreparedStatement对象时，**将sql语句发送给mysql服务器进行检查，编译（这些步骤很耗时）**
- **执行时就不用再进行这些步骤了，速度更快**
- **如果sql模板一样，则只需要进行一次检查、编译**

![](image_UWmppPzmUu.png)
