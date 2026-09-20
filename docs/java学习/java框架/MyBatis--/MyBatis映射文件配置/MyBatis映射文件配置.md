# MyBatis映射文件配置

## 目录

- [1.select标签](#1select标签)
- [2.insert标签  ](#2insert标签)
- [3.update标签  ](#3update标签)
  - [1)定义接口方法    ](#1定义接口方法)
  - [2)绑定映射文件    ](#2绑定映射文件)
- [4.delete标签  ](#4delete标签)
  - [1)定义接口方法    ](#1定义接口方法)
  - [2)映射文件绑定接口方法    ](#2映射文件绑定接口方法)

Mapper**映射文件中定义了操作数据库的sql**,每一个\*\*sql都被包含在一个statement中。****映射文件是****`mybatis`操作数据库的核心。      \*\*​

- `SQL` 映射文件只有很少的几个顶级元素（按照应被定义的顺序列出）：&#x20;

![](image_R01uHa7o3P.png)

说明：
\*\*映射文件中需要直接书写SQL语句对数据库进行操作，对数据库操作SQL语句主要有CRUD这四类。
\*\*这四类对应到映射文件中的配置为四类标签：`select`，`insert`,`update`，`delete` 。

# 1.select标签

select标签属性:

![](image_n9OukWzDLg.png)

练习1:查询id是1的用户信息;

```java 
 //根据id查询
User queryById(Integer id); 
```


2\)xml文件sql绑定接口方法

```xml 
<select id="queryById" resultType= "user" parameterType= "int“ >    select * from user where id = #{id}</select>
```


3\)测试

```java 

public class MyBatisTest01 {   private static UserMapper userMapper;    @BeforeClass    public static void berofeClass() throws Exception {        String resource = "mybatis-config.xml";        InputStream inputStream = Resources.getResourceAsStream(resource);        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);        SqlSession sqlSession = sqlSessionFactory.openSession(true);        userMapper = sqlSession.getMapper(UserMapper.class);    }    @Test    public void queryById() throws Exception {        User user = userMapper.queryById(1);        System.out.println( "user = “  + user);    } }

```


![](image_zZ_JMWvBC8.png)

> **注意：入参类型可以不写；会自动推导**

2.insert标签

![](image_nZ6bOElsjM.png)

> \*\*说明:#{username},#{birthday},#{sex},#{address} 大括号里面的值必须和pojo的实体类User类中的属性名一致，否则会报错。
>
> 注意事项:Mybatis默认事务手动提交,可设置事务自动提交:\*\*

```java 
SqlSession sqlSession = sqlSessionFactory.openSession(true);//或者手动提交sqlSession.commit();
```


练习：向数据库添加用户1\)定义接口方法：

```java 
/** * 添加用户 * 返回值时影响的行数 * @param user * @return */
Integer addUser(User user);

```


![](image__4vcVnIttj.png)

![](image_2aJbz9UqqP.png)

> sqlSession.close()

```sql title="sql-xml"
<!—插入数据-->
    <insert id="addBrand">
        insert into tb_brand (brand_name, company_name, ordered, description, status)
        values (#{brandName}, #{companyName}, #{ordered}, #{description}, #{status})
    </insert>

```


```java title="test "
@Test
    public void testAddBrand(){
        SqlSession sqlSession = MybatisUtil.openSession();//默认事务：手动提交

        //获取代理对象
        BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);

        //创建Brand对象
        Brand brand = new Brand();
        brand.setCompanyName("苹果股份");
        brand.setBrandName("苹果");
        brand.setStatus(1);
        brand.setDescription("好用");
        brand.setOrdered(9);
        //利用代理对象调用方法
        int rowCount = brandMapper.addBrand(brand);

        if(rowCount>0){
            sqlSession.commit();
            System.out.println("添加成功!");
        }
        //释放资源
        sqlSession.close();
    } 
```


3.update标签

![](image_AYD0WYyvXX.png)

### 1)定义接口方法&#xD;

```typescript 
/** * 更新用户 * @param user * @return */
void updateUser(User user);

```


### 2)绑定映射文件&#xD;

```xml 
<update id="updateUser">    
update user set user_name=#{username},birthday=#{birthday},sex=#{sex},address=    #{address} where id=#{id}
</update>

```


![](image_V_4zJOI0QI.png)

![](image_As6Lk7Krt0.png)

4.delete标签

![](image_wKVGtbu7IQ.png)

### 1)定义接口方法&#xD;

```typescript 
/** * 根据id删除用户 * @param id */
void deleteById(Integer id);

```


### 2)映射文件绑定接口方法&#xD;

```sql 
<delete id="deleteById">    
   delete from user where id=#{id}
</delete>

```


![](image_wwMYWdPGLO.png)

![](image_-ruDrYnL2z.png)
