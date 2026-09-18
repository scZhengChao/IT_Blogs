# MyBatis 快速入门 Mapper 代理开发

## 目录

- [使用 Mapper 代理方式完成入门案例  ](#使用-Mapper-代理方式完成入门案例)
- [入门案例：常见错误  ](#入门案例常见错误)
- [总结](#总结)
- [sql-xml](#sql-xml)
- [config-xml](#config-xml)

使用 Mapper 代理方式完成入门案例

1. 创建user表，添加数据
2. 创建maven工程，导入坐标
3. 编写 MyBatis 核心配置文件  -- > 替换连接信息 解决硬编码问题
4. 定义与SQL**映射文件同名**的Mapper接口，并且将Mapper接口和SQL映射文件放置**在同一目录下**
5. 编写 SQL 映射文件,设置**SQL映射文件的namespace属性为Mapper接口全限定名**
6. 在 Mapper 接口中定义方法，方法名就是SQL映射文件中sql语句的id，并保持参数类型和返回值类型一致
7. 编码
   1. **定义POJO类**
   2. **加载核心配置文件，获取 SqlSessionFactory 对象**
   3. **获取 SqlSession 对象**
   4. **通过 SqlSession 的 getMapper方法获取 Mapper接口的代理对象**
   5. **调用对应方法完成sql的执行**
   6. **释放资源**

![](image_x66Wjwo8fu.png)

![](image_QpHWm8IsVj.png)

入门案例：常见错误

- 在映射文件userManager.xml中的resultType位置没有书写类的全名

![](image_zrC2MXrJY8.png)

# 总结

1. `mybatis`框架的核心组件?

- `SqlSessionFactoryBuilder`;会话工厂构造类创建会话工厂对象
- `SqlSessionFactory`：会话工厂类创建会话对象
- `SqlSession`：会话类

1. 入门程序开发流程？

【1】从xml文件中构建：`SqlSessionFactory`&#x9;【2】从SqlSessionFactory中获取：`SqlSession`&#x9;【3】通过SqlSession执行映射文件文件中的sql语句

# sql-xml

```xml title="sql-xml"
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

 <mapper namespace="com.itheima.dao.BrandMapper">
     <sql id="brandFields">
        id,
        brand_name AS brandName ,
        company_name AS companyName ,
        ordered,
        description,
        status
    </sql>

    <!-- 使用resultMap解决查询结果中的字段名和Java实体类中的属性名不一致的问题 -->
    <resultMap id="brandMap" type="com.itheima.pojo.Brand" autoMapping="true">
        <!-- id标签 ： 配置数据表的主键字段和实体类中的属性映射 -->
        <id column="id" property="id"></id>
        <!-- result标签 ： 配置数据表中非主键字段和实体类的属性映射 -->
        <result column="brand_name" property="brandName"></result>
        <result column="company_name" property="companyName"></result>
    </resultMap>


    <!--删除数据：批量删除-->
    <delete id="deleteBrandByIds">
        delete from tb_brand
        where id in
        <foreach collection="ids" item="id" separator="," open="(" close=")">
            #{id}
        </foreach>
    </delete>


    <!--修改数据-->
    <update id="updateBrand">
        update tb_brand
        <set>
            <if test="brandName!=null">
                brand_name= #{brandName},
            </if>
            <if test="companyName!=null">
                company_name =#{companyName},
            </if>
            <if test="ordered!=null">
                ordered =#{ordered},
            </if>
            <if test="description!=null">
                description=#{description},
            </if>
            <if test="status!=null">
                status=#{status}
            </if>
        </set>
        where id = #{id}
    </update>


    <!--插入数据-->
    <insert id="addBrand">
        insert into tb_brand (brand_name, company_name, ordered, description, status)
        values (#{brandName}, #{companyName}, #{ordered}, #{description}, #{status})
    </insert>


    <!--根据条件查询品牌数据-->
    <select id="findBrandByCondition" resultMap="brandMap">
        SELECT id,
        brand_name,
        company_name,
        ordered,
        description,
        status
        FROM tb_brand
        WHERE 1=1
        <if test="brandName != null">
            AND brand_name = #{brandName}
        </if>
        <if test="companyName != null">
            AND company_name = #{companyName}
        </if>
        <if test="status != null">
            AND status = #{status}
        </if>
    </select>


    <select id="findBrandByCondition2" resultMap="brandMap">
        SELECT id,
        brand_name,
        company_name,
        ordered,
        description,
        status
        FROM tb_brand
        <where>
            <if test="brandName != null">
                AND brand_name = #{brandName}
            </if>
            <if test="companyName != null">
                AND company_name = #{companyName}
            </if>
            <if test="status != null">
                AND status = #{status}
            </if>
        </where>
    </select>

    <select id="findBrandByCondition3" resultMap="brandMap">
        SELECT id,
        brand_name,
        company_name,
        ordered,
        description,
        status
        FROM tb_brand
        <where>
            <choose>
                <when test="brandname != null">
                    AND brand_name = #{brandname}
                </when>
                <when test="companyname != null">
                    AND company_name = #{companyname}
                </when>
                <when test="status != null">
                    AND status = #{status}
                </when>
            </choose>
        </where>

    </select>


    <!--查询所有数据-->
    <select id="findAllBrand" resultMap="brandMap">
        SELECT id,
               brand_name,
               company_name,
               ordered,
               description,
               status
        FROM tb_brand
    </select>

    <!--根据id查询一行数据-->
    <select id="findBrandById" resultType="com.itheima.pojo.Brand">
        SELECT id,
               brand_name   AS brandName,
               company_name AS companyName,
               ordered,
               description,
               status
        FROM tb_brand
        WHERE id = #{id}
    </select>

</mapper>
```


# config-xml

```xml 
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--导入外部配置文件-->
    <properties resource="jdbc.properties"></properties>

    <!--配置环境-->
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

    <!--关联映射文件-->
    <mappers>
       <!-- <mapper resource="com/itheima/dao/BrandMapper.xml"/>
        <mapper resource="com/itheima/dao/OrderMapper.xml"/>-->
        <package name="com.itheima.dao"/>
    </mappers>

</configuration>
```
