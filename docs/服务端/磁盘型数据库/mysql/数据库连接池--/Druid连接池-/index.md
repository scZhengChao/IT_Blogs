Druid连接池

## 目录

- [Druid连接池](#Druid连接池)
  - [配置参数](#配置参数)
  - [Druid连接池基本使用    ](#Druid连接池基本使用)
- [Driud使用步骤  ](#Driud使用步骤)
  - [1.导入jar包 druid-1.1.12.jar](#1导入jar包-druid-1112jar)
  - [2.定义配置文件，定义参数](#2定义配置文件定义参数)
  - [3.加载配置文件](#3加载配置文件)
  - [4.加载配置文件](#4加载配置文件)
  - [5. 获取连接](#5-获取连接)
  - [6. 执行SQL语句](#6-执行SQL语句)
  - [7. 关闭资源,归还连接](#7-关闭资源归还连接)
- [案例](#案例)
  - [一](#一)
  - [二](#二)

* Druid(德鲁伊)
  - Druid连接池是阿里巴巴开源的数据库连接池项目&#x20;
  - 功能强大，性能优秀，是Java语言最好的数据库连接池之一
  - Druid是阿里巴巴开发的号称为监控而生的数据库连接池(可以监控访问数据库的性能) ，**Druid是目前最好的数据库连接池**。在功能、性能、扩展性方面，都超过其他数据库连接池。Druid已经在阿里巴巴部署了超过600个应用，经过一年多生产环境大规模部署的严苛考验。如：一年一度的双十一活动，每年春运的抢火车票。

# Druid连接池

## 配置参数

![](./image/image_Ssg6NQjChW.png)

Druid连接池基本使用

- 核心类：DruidDataSourceFactory
- 获取数据源的方法：使用com.alibaba.druid.pool.DruidDataSourceFactory类中的静态方法：

```java 
//创建一个连接池，连接池的参数使用properties中的数据public static DataSource createDataSource(Properties properties);
```


我们可以看到`Druid`**连接池在创建的时候需要**一个`Properties`对象来设置参数，所以我们使用`properties`文件来保存对应的参数。

Druid连接池的配置文件名称随便，放到src目录或者项目根目录下面加载`druid.properties`文件内容：

```yaml 
# 数据库连接参数
url=jdbc:mysql://localhost:3306/day05
username=root
password=1234
driverClassName=com.mysql.jdbc.Driver

```


Driud使用步骤

#### 1.导入jar包 druid-1.1.12.jar

![](./image/image_iD4Kfhpp88.png)

#### 2.定义配置文件，定义参数

```markdown 
# 数据库连接参数

url=jdbc:mysql://localhost:3306/day05
username=root
password=1234
driverClassName=com.mysql.jdbc.Driver

```


#### 3.加载配置文件

```java 
InputStream in = DruidDemo.class.getClassLoader().getResourceAsStream("druid.properties");
Properties prop = new Properties();
prop.load(in);

```


#### 4.加载配置文件

```java 
 //使用DruidDataSourceFactory工厂类构建连接池DataSource dataSource = DruidDataSourceFactory.createDataSource(prop);
```


#### 5. 获取连接

```java 
//从连接池对象中获取连接对象
Connection conn = dataSource.getConnection();
```


#### 6. 执行SQL语句

#### 7. 关闭资源,归还连接

```java 
//释放资源
rs.close();
stm.close();

//将连接对象规划给连接池
conn.close();

```


# 案例

### 一

```java 
package com.druid;

import com.alibaba.druid.pool.DruidDataSourceFactory;
import org.junit.Test;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Properties;

public class DruidTest {
    @Test
    public void testDruid() throws Exception {
        Properties prop = new Properties();
        prop.load(new FileInputStream("druid.properties" ));
        System.out.println(prop);
        DataSource dataSource = DruidDataSourceFactory.createDataSource(prop);
        Connection conn = dataSource.getConnection();
        String sql = "select *  from student";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        while (rs.next()){
            System.out.println(rs.getInt("id")) ;
            System.out.println(rs.getString("name"));
            System.out.println("=================");
        }
        rs.close();
        pstmt.close();
        conn.close();

    }
}

```


### 二

```java 
package com.itheima.druid.example;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

//dao层
public class BrandDao {

    //查询所有
    public List<Brand> findAllBrand() throws Exception {
        //使用Properties读取配置文件
        Properties properties = new Properties();
        //加载并读取配置文件
        InputStream is = this.getClass().getClassLoader().getResourceAsStream("jdbc.properties");
        properties.load(is);
        //创建数据库连接池对象
        DataSource dataSource = DruidDataSourceFactory.createDataSource(properties);
        //基于数据库连接池，获取一个Connection对象
        Connection conn = dataSource.getConnection();

        //编写sql语句
        String sql="select id, brand_name, company_name, ordered, description, status from tb_brand";
        //执行SQL语句
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();

        List<Brand> brandList = new ArrayList<>(); //集合对象
        //处理sql执行结果
        while(rs.next()){
            int id = rs.getInt("id");
            String brandName = rs.getString("brand_name");
            String companyName = rs.getString("company_name");
            int ordered = rs.getInt("ordered");
            String description = rs.getString("description");
            int status = rs.getInt("status");

            //把取出的数据封装到Brand对象中
            Brand brand = new Brand(id,brandName,companyName,ordered,description,status);

            //把brand对象存储到集合中
            brandList.add(brand);
        }
        //释放资源
        rs.close();//存储在ResultSet对象中的查询结果全部消失了
        pstmt.close();
        conn.close();

        //返回存储商品品牌对象的集合
        return brandList;
    }






    //添加
    public int addBrand(Brand brand){
        return 0;
    }

    //修改
    public int updateBrand(Brand brand){
        return 0;
    }

    //删除
    public int deleteBrand(Brand brand){
        return 0;
    }

}

```
