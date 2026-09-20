mybatis注解开发【掌握】

## 目录

- [1.1、概述  ](#11概述)
- [1.2、CRUD相关注解](#12CRUD相关注解)
- [1.3 搭建注解开发的Mybatis环境  ](#13-搭建注解开发的Mybatis环境)
- [增删改查](#增删改查)
- [主键回填](#主键回填)
- [别名](#别名)
- [模糊查询](#模糊查询)
- [动态sql](#动态sql)

1.1、概述

上述我们已经学习mybatis的**SQL映射文件可以使用xml的方式配置**，但是我们发现不同的用户模块接口都对应一个映射文件，并且在映射文件中书写sql语句也比较麻烦。所以Mybatis为用户提供了快速的开发方式，因为有时候**大量的XML配置文件的编写时非常繁琐**的，因此Mybatis也提供了更加简便的基于注解(Annnotation)的配置方式。

**注解配置的方式在很多情况下能够取代mybatis的映射文件，提高开发效率。**

# 1.2、CRUD相关注解

`@Insert`：保存 &#x20;
&#x20;        `Value`： sql语句（和xml的配置方式一模一样）
`@Update`：更新&#x20;
&#x20;        `Value` ：sql语句     &#x20;
`@Delete`: 删除
&#x20;        `Value` ：sql语句    &#x20;
`@Select`: 查询
&#x20;        `Value` ：sql语句 &#x20;
`@Options`：可选配置（获取主键）
&#x20;        `userGeneratedKeys`：开关,值为true表示可以获取主键  相当于select last\_insert\_id()
&#x20;        `keyProperty`     ：对象属性
&#x20;        `keyColumn`       : 列名&#x20;

1.3 搭建注解开发的Mybatis环境

【第一步】将`mybatis`全局配置文件`mybatis-config.xml`中**的mapper路径改为包扫描或者class路径；**

> 说明：因为没有了映射文件，所以我们**这里采用加载接口方式，需要告知mybatis哪个接口的方法上的注解需要被执行。**

```xml 
    <!--关联映射文件-->
    <mappers>
        <!--方式1 ：指定映射文件（通过映射文件关联Mapper接口）-->
     <!--   <mapper resource=""/>
           <mapper resource=""/>--> 

         <!--方式2 ： 指定扫描的包名（通过Mapper接口关联映射文件）-->
        <package name="com.itheima.dao"/>
     </mappers>


```


# 增删改查

```java 
package com.itheima.dao;

import com.itheima.pojo.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface UserMapper {

    /**
     * 添加用户
     * @param user   用户对象
     * @return       受影响行数
     */
     @Insert("INSERT INTO tb_user(user_name, password, name, age, sex) " +
            "VALUES (#{userName}, #{password}, #{name}, #{age}, #{sex})")
    public int addUser(User user);
 

    @Insert("INSERT INTO tb_user(user_name, password, name, age, sex) " +
            "VALUES (#{userName}, #{password}, #{name}, #{age}, #{sex})")
    //useGeneratedKeys=true ： 开启主键回填    keyColumn="表中的主键字段名"    keyProperty="实体类中的属性名"
    @Options(useGeneratedKeys = true , keyColumn = "id" , keyProperty = "id")
    public int addUserGetPK(User user);




     @Update("update tb_user set password = #{password} where user_name = #{username}")
     public int updatUser(@Param("username") String username,
                         @Param("password") String password);


    @Results(id="userMap",
            value = {
                    @Result(column = "user_id" , property = "id" , id = true),
                    @Result(column = "user_name" , property = "userName")
            }
    )
     @Select("select id AS user_id, user_name, password, name, age, sex from tb_user")
     public List<User> findAllUser();


    /**
     * 根据给定的名字，模糊查询用户数据
     * @param name    名字
     * @return        存储用户对象的集合
     */
//    @Select("select id, user_name AS userName, password, name, age,sex " +
//            "from tb_user " +
//            "where sex=1 AND name like concat('%',#{name},'%')")
    @SelectProvider(type = SqlProvider.class , method = "findUserByName2")//拼收组装后SQL语句
    public List<User> findUserByLike(@Param("name") String name);//name ="%张%"

}
```


# 主键回填

```java 
    @Insert("INSERT INTO tb_user(user_name, password, name, age, sex) " +
            "VALUES (#{userName}, #{password}, #{name}, #{age}, #{sex})")
    //useGeneratedKeys=true ： 开启主键回填    keyColumn="表中的主键字段名"    keyProperty="实体类中的属性名"
     @Options(useGeneratedKeys = true , keyColumn = "id" , keyProperty = "id")
     public int addUserGetPK(User user);
```


# 别名

![](image_2Zy2PeHeO9.png)

> 不用多表查询
> 多表： 一次查询多张表。xml &#x20;
> 多次：查询多次；注解

```java 
@Results(id="userMap",
        value = {
                @Result(column = "user_id" , property = "id" , id = true),
                @Result(column = "user_name" , property = "userName")
        }
)
@Select("select id AS user_id, user_name, password, name, age, sex from tb_user")
public List<User> findAllUser();

```


# 模糊查询

![](image_X3BFcVhM9f.png)

```java 
/**
     * 根据给定的名字，模糊查询用户数据
     * @param name    名字
     * @return        存储用户对象的集合
     */
    @Select("select id, user_name AS userName, password, name, age,sex " +
            "from tb_user " +
            "where sex=1 AND name like concat('%',#{name},'%')")
       public List<User> findUserByLike(@Param("name") String name);//name ="%张%"
```


# 动态sql

推荐xml形式开发动态sql

【需求】：查询男性用户，如果输入了用户名，按用户名模糊查询,如果没有输入用户名，就查询所有男性用户；&#x20;

在dao层下面新建

```java title="SqlProvider"
package com.itheima.dao;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.jdbc.SQL;

//拼接SQL语句
public class SqlProvider {


    public String findUserByName2(@Param("name") String name){
        //Mybatis提供了一个SQL类
         SQL sql = new SQL();
        //利用SQL类中提供的API方法，拼接SQL语句
        sql = sql.SELECT("id, user_name AS userName, password, name, age,sex").FROM("tb_user").WHERE("sex=1");
        if(name!=null){
            sql = sql.AND().WHERE("name like concat('%',#{name},'%')");
        }
        return sql.toString();
     }



    //返回拼接后的sql语句
    public String findUserByName(@Param("name") String name){
       String sql="select id, user_name AS userName, password, name, age,sex from tb_user  where sex=1 ";

      if(name !=null && !"".equals(name)){
          sql += " AND name like concat('%',#{name},'%')";
      }

       return sql;
    }
}
```


```java 
  @SelectProvider(type = SqlProvider.class , method = "findUserByName2")//拼收组装后SQL语句
    public List<User> findUserByLike(@Param("name") String name);//name ="%张%"。
```
