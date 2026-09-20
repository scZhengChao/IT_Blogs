# MyBatis 核心配置文件

## 目录

- [MyBatis 核心配置文件](#MyBatis-核心配置文件)
- [1 properties(属性)  ](#1-properties属性)
  - [总结](#总结)
- [2 settings(设置)  ](#2-settings设置)
  - [总结](#总结)
- [3 typeAliases(类型别名)  ](#3-typeAliases类型别名)
- [4 typeHandlers和environments(了解)](#4-typeHandlers和environments了解)
  - [1)typeHandlers(类型处理器)【了解】](#1typeHandlers类型处理器了解)
  - [2)environments【了解】    ](#2environments了解)
- [5 mappers(映射器)  ](#5-mappers映射器)
- [总结](#总结)

# MyBatis 核心配置文件

\*\*mybatis-config.xml，是MyBatis的全局配置文件，包含****全局配置信息，如数据库连接参数、插件等****。整个框架中只需要一个即可。&#x20;\*\*

参考:[https://mybatis.org/mybatis-3/zh/configuration.html](https://mybatis.org/mybatis-3/zh/configuration.html "https://mybatis.org/mybatis-3/zh/configuration.html")

```markdown 
1、mybatis全局配置文件是mybatis框架的核心配置，整个框架只需一个；
2、mybatis全局配置文件中的配置顺序：注意如果配置多项，必须按照以下顺序进行配置
    properties：属性配置
    settings：设置
    typeAliases：类型别名设置
    typeHandlers：类型处理器
    enviroments：环境配置
        environment（环境变量）
        transactionManager（事务管理器）
        dataSource（数据源）
    mappers：映射器

```


1 properties(属性)

1.作用：

- 加载外部的java资源文件（properties文件）；

2.使用<`properties`>标签的方式

- 通过`properties`标签 `resource`属性引入加载外部`properties`文件;
- 使用`${key}`获取设置的属性值；

![](./assets/image/image_Kzh4BkyZZR.png)

##### 总结

1.properties标签作用?

- 定义全局变量;

2.定义全局变量方式？

- 外部引入(推荐)

> \<properties resource="外部配置文件路径"/>

2 settings(设置)

&#x20;\*\*`settinngs`\*\***是 ****`MyBatis`**** 中极为重要的调整设置，它们会改变 ****`MyBatis`**** 的运行时行为。**

![](./assets/image/image_33nP-fP3Jx.png)

说明：&#x20;`settings`参数有很多，我们先学习驼峰匹配`mapUnderscoreToCamelCase`,翻译过来就是映射下划线到驼峰式命名。

![](./assets/image/image_9bbucKVz9k.png)

##### 总结

&#x20;1.开启驼峰自动映射的配置和作用?

- 配置

```xml 
<setttings>        <setting name="mapUnderscoreToCamelCase" value="true"/></setttings>
```


- 作用
  - 自动将表中字段比如:**user\_name 映射到pojo属性:userName**,
    无需给sql中字段取别名;

3 typeAliases(类型别名)

类型别名是给**类的全限定名称(包名.类名) 取一个短名称。存在**的意义仅在于用来**减少类完全限定名的冗余。** (仅仅用于xml)

![](./assets/image/image_n-ki0JMVaA.png)

可以通过设置一些短名来代替全限定名

方式：使用`typeAliases`标**签的子标签package包扫描映射别名(推荐)；**

![](./assets/image/image_ofNBCCvJxW.png)

**Mybatis内置别名**

右侧为常见的 Java 类型内建的相应的类型别名。它们都是不区分大小写的，注意对基本类型名称重复采取的特殊命名风格。

> 说明:
> 基本类型别名是  **\_基本类型**  名称;
> 包装类型别名时\*\* 包装类首字母小写\*\*;

![](./assets/image/image_8JaGnDdrrL.png)

# 4 typeHandlers和environments(了解)

#### 1)typeHandlers(类型处理器)【了解】

&#x20;MyBatis 在设置预处理语句（PreparedStatement）中的参数或从结果集中取出一个值时， 都会用**类型处理器**将获取到的\*\*值以合适的方式转换成 Java 类型。\*\*下表描述了一些默认的类型处理器。

![](./assets/image/image_v8E57qg2l1.png)

#### 2)environments【了解】&#xD;

MyBatis 可以配置成**适应多种环境，例如，开发、测试和生产环境需要有不同的配置** \*\*；\*\*尽管可以配置多个环境，每个 SqlSessionFactory 实例只能选择其一。虽然，这种方式也可以做到很方便的分离多个环境，但是实际使用场景下，我们更多的是选择使用spring来管理数据源，来做到环境的分离。

&#x20;父标签： environments（环境配置）

子标签：

&#x20;        environment（环境变量）
&#x20;        transactionManager（事务管理器）
&#x20;        dataSource（数据源）&#x20;

```xml 
<!--mybatis环境的配置-->
    <!--
        五、 environments（数据库环境配置）
                开发过程中会使用第三方的连接池：druid,C3P0
                Spring框架管理连接池
    -->
    <!--<environments default="test">-->
    <environments default="development">
        <!--通常我们只需要配置一个就可以了， id是环境的名字 -->
        <environment id="development">
            <!--事务管理器：由JDBC来管理-->
            <transactionManager type="JDBC"/>
            <!--数据源的配置：mybatis自带的连接池-->
            <dataSource type="POOLED">
                <!--
                    这里的value="${driver}"  driver 是子标签property的name属性值
                -->
                <property name="driver" value="${driver}"/>
                <property name="url" value="jdbc:mysql://localhost:3306/db4"/>
                <property name="username" value="root"/>
                <property name="password" value="1234"/>
            </dataSource>
        </environment>


        <!--通常我们只需要配置一个就可以了， id是环境的名字 -->
        <environment id="test">
            <!--事务管理器：由JDBC来管理-->
            <transactionManager type="JDBC"/>
            <!--数据源的配置：mybatis自带的连接池-->
            <dataSource type="POOLED">
                <!--
                    这里的value="${driver}"  driver 是子标签property的name属性值
                -->
                <property name="driver" value="${driver}"/>
                <property name="url" value="jdbc:mysql://localhost:3306/db4"/>
                <property name="username" value="root"/>
                <property name="password" value="12345"/>
            </dataSource>
        </environment>
    </environments>

```


```java 
    @Test
    public void queryById( ) throws Exception {
        //获取mapper接口的动态代理实现

        //1、从xml中构建SqlSessionFactory
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        //这里指定了环境为test
//        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream,"test");
        //build不方法不指定环境就使用默认的 <environments default="development">
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        //2、获取SqlSession
        SqlSession sqlSession = sqlSessionFactory.openSession();

        //3、获取UserMapper接口的动态代理对象
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);

        User user = userMapper.queryById(1);
        System.out.println("user = " + user);
    }

```


5 mappers(映射器)

Mappers标签作用：提供了关联加载xml映射文件的配置功能；

使用方式：

1、加载XML映射文件，关联UserMapper.java接口

\*\*【1】\<mapper resource="UserMapper.xml"/> 从resources下加载映射文件；
\*\*​     说明:如果项目采用基于xml的开发模式,建议使用方式1开发;

2、加载接口，关联映射文件
​\*\*   条件：1、接口名和映射文件名保持一致；2、路径保持一致；
【2】批量加载class：\<package name="com.heima.mybatis.dao"/>\*\*

> 说明:如果基于注解开发的开发的话,推荐使用方式2开发

![](./assets/image/image_et0dOu9Lbi.png)

# 总结

1.开发中常用的2种加载xml映射文件的方式?

①通过resource属性 **,相对路径加载(基于xml开发推荐的)**
eg:

```xml 
<mappers>          <mapper resource="xml的相对路径"/></mappers>
```


②通过package扫包方式(基于注解开发推荐使用)
&#x20;约束条件:
&#x20;     1\*\* 接口名称与xml映射文件名称要一致;
&#x20;     2 接口路径与xml映射文件路径也要一致;
\*\*eg:

```xml 
<mappers>
        <package name="接口的包路径"/>
</mappers>
```


2.基于package扫描的原理?

通过package指定接口的路径之后,mybatis就会加载这个包下的接口 **,获取接口的名称,因为接口名称和路径与xml**一致,所以也就获取xml映射文件;
