MyBatis&#x20;
======

## 目录

- [资料](#资料)
- [案例代码](#案例代码)
- [解释](#解释)

[](./MyBatis介绍-/index.md)

[MyBatis 快速入门 Mapper 代理开发](<./MyBatis 快速入门 Mapper 代理开发/index.md> "MyBatis 快速入门 Mapper 代理开发")

[MyBatis 核心配置文件](<./MyBatis 核心配置文件/index.md> "MyBatis 核心配置文件")

[MyBatis映射文件配置](./MyBatis映射文件配置/index.md "MyBatis映射文件配置")

# 资料

[MyBatis.pptx](./assets/file/MyBatis_EVpaD550HO.pptx "MyBatis.pptx")

[MyBatis配置文件和映射文件笔记.md](./assets/file/MyBatis配置文件和映射文件笔记_SbTCqFqdIU.md "MyBatis配置文件和映射文件笔记.md")

[MyBatis-1.pptx](./assets/file/MyBatis-1_TMYedP6jZ4.pptx "MyBatis-1.pptx")

[Mybatis-2.pptx](./assets/file/Mybatis-2_dleKj8UrPN.pptx "Mybatis-2.pptx")

# 案例代码

[mybatis\_day01.zip](./assets/file/mybatis_day01_3kZniyo1_N.zip "mybatis_day01.zip")

```markdown 
Mybatis项目工程：
1、核心配置文件（1个）  ： 配置数据库连接参数、 配置和映射文件关联的参数
2、映射配置文件（多个） ： 编写SQL代码
3、Mybatis中的API ：
       SqlSessionFactory ：工厂类。就是为了创建SqlSession对象
       SqlSession ： 和数据库交互的类（执行SQL语句）


Mybatis框架技术的学习，就是以：核心配置文件、映射文件为主


核心配置文件：
   properties标签 ： 加载外部的资源配置文件
          属性 :  resource     指定要引入的外部配置文件路径
          在核心配置文件中，通过： ${key} 方式引入外部配置文件中的数据


   settings标签 ： mybatis中的核心设置标签 （功能比较多。 例：缓存 、驼峰映射、.....）
          子标签 ： setting
                     属性：name     设置名
                          value    设置的开关键

   typeAliases标签  ： 起别名 （长名字变为短名字）
           子标签 ： package  （要扫描哪个包）    包下的类全部起个别名。 格式：类名小写 or 保持原类名
                       name ： 指定要扫描的包


```


```xml title="mybatis-config.xml"
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
<!-- 根元素 -->
<configuration>

    <!--加载外部配置文件-->
    <properties resource="jdbc.properties"></properties>

    <!--开启驼峰映射 ： 把数据表中的带有下划线的字段，变为： Java的驼峰命名方式。 例： user_name => username 或 userName-->
    <settings>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>


    <!-- 设置别名 ： 把长名字变为短名字 -->
    <typeAliases>
        <!--扫描指定的包  , 把包下的所有的类，都起了别名。 别名格式：  全部小写 或 和类名一致 -->
        <package name="com.itheima.pojo"/>

       <!-- <typeAlias type="com.itheima.pojo.User" alias="User"></typeAlias>
        <typeAlias type="com.itheima.pojo.Student" alias="Student"></typeAlias>
        <typeAlias type="com.itheima.pojo.Teacher" alias="Teacher"></typeAlias>-->
    </typeAliases>



    <!-- 配置数据源（数据库连接） -->
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>


    <!-- 配置映射文件关联 -->
    <mappers>
        <mapper resource="com/itheima/dao/UserMapper.xml"/>
    </mappers>

</configuration>
```


# 解释

```java 
package com.itheima.test;

import com.itheima.dao.UserMapper;
import com.itheima.pojo.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class MybatisTest {

    @Test
    public void testFindAllUser() throws IOException {
        //配置文件路径
        String resource = "mybatis-config.xml";//核心配置文件
        //基于配置文件路径，创建字节输入流对象
        InputStream is = Resources.getResourceAsStream(resource);
        //创建SqlSessionFactory工厂类对象
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);

        //使用SqlSessionFactory工厂类,创建SqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession();

        //利用SqlSession对象，创建一个代理对象
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        /*
           Class[] interfaces = {UserMapper.class};

           Porxy.newProxyInstance(
                类加载器,
                interfaces,
                new InvocationHandler(){
                    //重写invoke方法
                    public Object  invoke( Object proxy , Method method , Object[] args ){
                          //读取相同目录下的UserMapper.xml

                          String methodName = method.getName(); //获取方法名

                          //xpath解析xml :    路径表达式  = //select[@id=findAllUser]

                          //解析出： select标签的resultType属性值
                          Class cls = Class.forName("com.itheima.pojo.User");

                          //解析出： select标签体内容（sql语句）  select id, username, birthday, sex, address from user
                          执行sql查询语句

                          //遍历查询结果
                            查询结果封装到User对象中
                    }
                }
           )
        * */

        //使用代理对象，调用方法查询用户数据
        List<User> userList = userMapper.findAllUser();

        //测试用户数据
        for (User user : userList) {
            System.out.println(user);
        }
    }
}

```


[编写会话工具类](./编写会话工具类/index.md "编写会话工具类")

[实践](IT/服务端/java学习/java框架/MyBatis--/实践/实践.md "实践")

[高级](IT/服务端/java学习/java框架/MyBatis--/高级/高级.md "高级")
