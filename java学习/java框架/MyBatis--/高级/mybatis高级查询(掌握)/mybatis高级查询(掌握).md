# mybatis高级查询(掌握)

## 目录

- [mybatis多表查询套路：  ](#mybatis多表查询套路--)
- [mybatis高级查询环境准备](#mybatis高级查询环境准备)
- [一对一查询](#一对一查询)
- [一对多](#一对多)

# mybatis多表查询套路： &#x20;

1. 基于需求编写SQL语句 &#x20;
2. 基于SQL语句的查询结果，分析类与类之间关联（建立实体类和实体类的关联） &#x20;

   1对1查询结果： \*\*在Order类中添加新属性：User对象  \*\*

   1对 多 查询结果： \*\*在User类中添加新属性： List\<Order>集合  \*\*
3. 在映射文件中，基于SQL查询结果，配置映射关联

# mybatis高级查询环境准备

表与表的关系:

- 一对一: ab两表的关系,由任意一张表维护(外键) 比如:b表维护ab的管理,那么在b表中创建一个字段aid;
- 一对多: ab两张表 比如:从a看是一个a对应b的多条数据,但是从b看是一个b只能对应一个a的数据;
- 多对多: ab两张表 比如:从a看是一个a对应b的多条数据,同时从b看是一个b对应a表的多条数据;

# 一对一查询

```xml 
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.itheima.dao.OrderMapper">
    <!-- resultMap标签：解决查询结果字段名和实体类属性名不致的问题；  解决多表查询关联映射 -->
     <resultMap id="orderMap" type="com.itheima.pojo.Order">
         <!--配置：查询结果和Order类的映射关联 -->
        <id column="order_id" property="id"></id>
        <result column="order_number" property="orderNumber"></result>

        <!-- 配置：1对1查询
             配置 ： 查询结果和User类的映射关联
        -->
         <association property="orderUser" javaType="com.itheima.pojo.User" autoMapping="true">
             <id column="user_id" property="id"></id>
            <result column="user_name" property="userName"></result>
        </association>
    </resultMap>

    <!-- 根据订单编号，查询订单信息及下单人信息 -->
    <select id="findOrderByNumber" resultMap="orderMap">
        select  tb_order.id AS order_id,
                tb_order.order_number,

                tb_user.id AS user_id, 
                tb_user.user_name,
               tb_user.password,
               tb_user.name,
               tb_user.sex,
               tb_user.age
        from tb_order inner join tb_user
             on tb_user.id=tb_order.user_id
        where tb_order.order_number= #{orderNumber}
    </select>



</mapper>
```


![](image_acbyeoeYCp.png)

# 一对多

```xml 
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.itheima.dao.UserMapper">
    <!--配置多表查询映射关系-->
     <resultMap id="userMap" type="com.itheima.pojo.User" autoMapping="true">
         <!--配置： 查询结果和User类的映射-->
        <id column="user_id" property="id"></id>
        <result column="user_name" property="userName"></result>

        <!--配置：1对多关系-->
         <collection property="orders"
                    javaType="java.util.List"
                    ofType="com.itheima.pojo.Order">
             <!--配置：查询结果和Order类的映射-->
            <id column="order_id" property="id"></id>
            <result column="order_number" property="orderNumber"></result>
        </collection>
    </resultMap>


    <!--根据用户id，查询用户信息和下单信息-->
    <select id="findUserById" resultMap="userMap">
        select tb_user.id  AS user_id,
               tb_user.user_name,
               tb_user.password,
               tb_user.name,
               tb_user.sex,
               tb_user.age,

               tb_order.id AS order_id,
               tb_order.order_number
        from tb_order
                 inner join tb_user
                            on tb_user.id = tb_order.user_id
        where tb_user.id = #{id}
    </select>


</mapper>
```


![](image_ucYNzR2zfa.png)
