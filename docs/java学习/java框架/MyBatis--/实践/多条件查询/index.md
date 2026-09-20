# 多条件查询

## 目录

- [多参](#多参)
  - [一](#一)
  - [二](#二)
  - [三](#三)
- [总结](#总结)

# 多参

#### 一

需要使用注解：

![](./assets/image/image_htwcPbvVWj.png)

```xml title="sql-xml"
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

```


```java title="dao-interfac"
/**
     * 根据条件，查询品牌数据
     *
     * @param brandName      品牌名称
     * @param companyName    企业名称
     * @param status         状态
     * @return               存储品牌信息的集合
     */
    //当方法中传递的参数有2个或以上时，需要使用@Param注解声明占位符参数
    public List<Brand> findBrandByCondition(@Param("brandName") String brandName,
                                            @Param("companyName") String companyName,
                                            @Param("status") int status);interface
                                            
                                            
```


#### 二

```java 
@Test
    public void testFindBrandByCondition3(){
        SqlSession sqlSession = MybatisUtil.openSession();

        //获取代理对象
        BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);

         //利用代理对象，调用方法
        Map map = new HashMap();
//        map.put("brandname","华为");
//        map.put("status",1);
       // map.put("companyname","华为技术有限公司");
         List<Brand> brandList = brandMapper.findBrandByCondition3(map);

        //释放资源
        MybatisUtil.closeSqlSession(sqlSession);

        //测试
        for (Brand b : brandList) {
            System.out.println(b);
        }
    }
```


#### 三

```java 
@Test
    public void testFindBrandByCondition2(){
        SqlSession sqlSession = MybatisUtil.openSession();

        //获取代理对象
        BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);

        //利用代理对象，调用方法
                   //释放资源
        MybatisUtil.closeSqlSession(sqlSession);

        //测试
        for (Brand b : brandList) {
            System.out.println(b);
        }
    }
```


# 总结

SQL语句设置多个参数有几种方式？
&#x20;  1） 散装参数：

&#x20;需要使用@Param("SQL中的参数名称")
&#x9;\* 使用麻烦  &#x20;

&#x20;2\)    实体类封装参数&#x9;

\* 只需要保证**SQL中的参数名 和 实体类属性名对应**上，即可设置成功   &#x20;

3\)    map集合

只需要保证SQL**中的参数名 和 map集合的键的名称对应**上，即可设置成功
