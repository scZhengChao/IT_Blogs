# JDBC封装

## 目录

- [utils](#utils)
- [使用](#使用)

# utils

```java 
package com.itheima.jdbc.util;

import java.sql.*;

//JDBC工具类（抽取并封装共性内容）
/*编写工具类：
  1、私有构造方法
  2、提供静态方法
*/
public class JdbcUtil {
    private static final String DRIVER = "com.mysql.jdbc.Driver";
    //数据库连接参数
    private static final String URL = "jdbc:mysql://127.0.0.1:3306/db5";
    private static final String NAME = "root";
    private static final String PASSWORD = "itheima";

    //注册驱动（仅注册1次）
    static {
        try {
            Class.forName(DRIVER);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    //数据库连接
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, NAME, PASSWORD);
    }

    //释放资源
    public static void close(Connection conn, Statement stmt) {
        close(conn, stmt, null);//方法重用
    }
    public static void close(Connection conn, Statement stmt, ResultSet rs) {
        try {
            if (rs != null) {
                rs.close();
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        try {
            if (stmt != null) {
                stmt.close();
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        try {
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
}。

```


# 使用

```java 
package com.itheima.jdbc.review;

import com.itheima.jdbc.util.JdbcUtil;
import org.junit.Test;

import java.sql.*;

public class JdbcTest1 {

    //查询数据
    @Test
    public void testSelect() throws ClassNotFoundException, SQLException {
        //1、注册驱动
        Class.forName("com.mysql.jdbc.Driver");//com.mysql.jdbc包名， Dirver是类名
        //2、连接数据库
        String url = "jdbc:mysql://127.0.0.1:3306/db5";//连接字符串
        Connection con = DriverManager.getConnection(url, "root", "itheima");
        //3、编写sql语句
        String sql = "select id,username ,password from user where username=? and password=?";
        //4、执行sql语句
        PreparedStatement pstmt = con.prepareStatement(sql);
        pstmt.setString(1, "admin");
        pstmt.setString(2, "123");
        ResultSet rs = pstmt.executeQuery();//执行查询操作，并返回查询的结果（封装在ResultSet对象中）
        //5、处理sql语句执行结果
        if (rs.next()) {
            System.out.print(rs.getString("id") + "\t");
            System.out.print(rs.getString("username") + "\t");
            System.out.println(rs.getString("password") + "\t");
            System.out.println("------------------------------------------");
        }
        //6、释放资源
        rs.close();
        pstmt.close();
        con.close();
    }

    //修改数据
    @Test
    public void testUpdate() {

        Connection conn = null;
        PreparedStatement pstmt = null;
        try {
            //通过jdbc工具类，获取到Connection连接对象
            conn = JdbcUtil.getConnection();

            //开启事务（手动事务）
            conn.setAutoCommit(false);

            //编写sql代码
            String sql = "update user set password=? where username=?";

            //执行sql语句
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, "123123");
            pstmt.setString(2, "admin");
            int rowCount = pstmt.executeUpdate();

           // System.out.println(1/0);


            //处理SQL执行结果
            if (rowCount > 0) {
                //提交事务
                conn.commit();
                System.out.println("数据修改成功");
            }
        } catch (Exception e) {
            try {
                conn.rollback();//回滚事务
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        } finally {
            //释放资源
            JdbcUtil.close(conn, pstmt);
        }
    }


    //删除数据
    @Test//注解只能书写在方法上
    public void testDelete() throws ClassNotFoundException, SQLException {
        Connection con = JdbcUtil.getConnection();
        //编写sql语句
        String sql = "delete from user where id=?";
        //执行sql语句
        PreparedStatement pstmt = con.prepareStatement(sql);
        pstmt.setInt(1, 5);
        int rowCount = pstmt.executeUpdate();
        //处理sql语句执行结果
        if (rowCount > 0) {
            System.out.println("数据删除成功!");
        }
        //释放资源
        JdbcUtil.close(con, pstmt);
    }


    //添加数据
    @Test//注解只能书写在方法上
    public void testInsert() throws ClassNotFoundException, SQLException {
        //1、注册驱动
        Class.forName("com.mysql.jdbc.Driver");//com.mysql.jdbc包名， Dirver是类名
        //2、连接数据库
        String url = "jdbc:mysql://127.0.0.1:3306/db5";//连接字符串
        Connection con = DriverManager.getConnection(url, "root", "itheima");
        //3、编写sql语句
        String sql = "insert intouser(username, password) values(?,?)";
        //4、执行sql语句
        PreparedStatement pstmt = con.prepareStatement(sql);
        pstmt.setString(1, "admin");
        pstmt.setString(2, "123");
        int rowCount = pstmt.executeUpdate();
        //5、处理sql语句执行结果
        if (rowCount > 0) {
            System.out.println("数据添加成功!");
        }
        //6、释放资源
        pstmt.close();
        con.close();
    }
}

```
