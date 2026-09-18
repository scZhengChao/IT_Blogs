JDBC 快速入门

## 目录

- [0创建工程，导入驱动jar包](#0创建工程导入驱动jar包)
- [1.注册驱动](#1注册驱动)
- [2.获取连接](#2获取连接)
- [3.定义SQL语句](#3定义SQL语句)
- [4.获取执行SQL对象](#4获取执行SQL对象)
- [5.执行SQL](#5执行SQL)
- [6.处理返回结果](#6处理返回结果)
- [7.释放资源](#7释放资源)
- [例子](#例子)
  - [一](#一)

# 0创建工程，导入驱动jar包

![](image_FSP3h5FynI.png)

# 1.注册驱动

```java 
Class.forName("com.mysql.jdbc.Driver");
```


# 2.获取连接

```java 
Connection conn = DriverManager.getConnection(url, username, password);
```


# 3.定义SQL语句

```java 
String sql =  “select…” ;
```


# 4.获取执行SQL对象

```java 
Statement stmt = conn.createStatement();
```


# 5.执行SQL

```java 
stmt.executeQuery(sql);  
```


# 6.处理返回结果

# 7.释放资源

# 例子

## 一

```java 
package com.itheima.jdbc.quickstart;

import org.junit.Test;

import java.sql.*;

public class JdbcQuickStart {

    @Test
    public void quickStartTest() throws ClassNotFoundException, SQLException {
        //1、注册驱动 （确认要使用哪个数据库）
        Class.forName("com.mysql.jdbc.Driver"); //加载Driver类


        //2、连接数据库 （获取到一个数据库连接对象）
        String url ="jdbc:mysql://127.0.0.1:3306/db5";
        //String url ="jdbc:mysql://127.0.0.1:3306/db5?useUnicode=true&characterEncoding=utf8";//解决中文乱码
        Connection conn = DriverManager.getConnection(url, "root", "itheima");

        //3、编写SQL语句
        String sql="select id,username AS name,password from user";

        //4、把SQL语句发送给数据库 （数据库执行SQL代码，并返回执行结果）
        Statement stmt = conn.createStatement();//基于数据库连接对象，创建一个操作数据库的对象
        ResultSet rs = stmt.executeQuery(sql);//把sql代码发给数据库

        //5、处理SQL的执行结果
        while(rs != null && rs.next()){
            System.out.print(rs.getInt("id")+"\t");
            System.out.print(rs.getString("name")+"\t");
            System.out.println(rs.getString("password")+"\t");
            System.out.println("=======================================");
        }

        //6、释放资源（断开和数据库的连接）
        rs.close();
        stmt.close();
        conn.close();
    }

}

```


```java 
package com.JDBC;

import org.junit.Test;

import java.sql.*;

public class Start {
    @Test
    public void quickStart() throws ClassNotFoundException, SQLException {
        Class.forName ("com.mysql.jdbc.Driver");
        String url ="jdbc:mysql://localhost:3306/study";
        Connection conn = DriverManager.getConnection(url, "root", "xxxxx");
        String sql = "select * from student";
        Statement statement = conn.createStatement();
        ResultSet resultSet = statement.executeQuery(sql);
        while (resultSet.next()){
            System.out.println(resultSet.getInt("id") );
            System.out.println(resultSet.getString("name") );
        }
        resultSet.close();
        statement.close();
        conn.close();
    } 
}

```
