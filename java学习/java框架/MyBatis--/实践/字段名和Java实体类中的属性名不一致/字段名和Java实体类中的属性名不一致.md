# 字段名和Java实体类中的属性名不一致

## 目录

- [ResultMap](#ResultMap)

# ResultMap

```xml 
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
