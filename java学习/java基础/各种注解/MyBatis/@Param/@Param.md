# @Param

## 目录

- [一、核心作用](#一核心作用)
- [二、基本用法](#二基本用法)
  - [1. 在 MyBatis Mapper 接口中使用](#1-在-MyBatis-Mapper-接口中使用)
  - [2. 对应 XML 映射文件](#2-对应-XML-映射文件)
- [三、使用场景](#三使用场景)
  - [1. 必须使用的情况](#1-必须使用的情况)
  - [2. 可以省略的情况](#2-可以省略的情况)
- [四、高级用法](#四高级用法)
  - [1. 与动态 SQL 结合](#1-与动态-SQL-结合)
  - [2. 与注解式 SQL 结合](#2-与注解式-SQL-结合)
- [五、注意事项](#五注意事项)
- [六、常见错误](#六常见错误)
- [七、最佳实践](#七最佳实践)

`@Param`是 MyBatis 框架提供的一个注解，主要用于解决**接口方法中多个参数与 SQL 语句参数的**映射问题。

## 一、核心作用

1. **参数命名绑定**：为**方法参数指定名称，使 SQL 中可以通过名称引用**
2. **多参数映射**：当接口方法有多个参数时，**明确参数与 SQL 的对应关系**
3. **提高可读性**：使 SQL 中的参数引用更加清晰明确

## 二、基本用法

### 1. 在 MyBatis Mapper 接口中使用

```java 
public interface UserMapper {
    // 单参数场景（可以省略@Param）
    User selectById(@Param("id") Long id);
    
    // 多参数场景（必须使用@Param）
    List<User> selectByAgeAndName(
        @Param("minAge") Integer minAge, 
        @Param("maxAge") Integer maxAge,
        @Param("name") String name);
}
```


### 2. 对应 XML 映射文件

```xml 
<!-- 单参数查询 -->
<select id="selectById" resultType="User">
    SELECT * FROM user WHERE id = #{id}
</select>

<!-- 多参数查询 -->
<select id="selectByAgeAndName" resultType="User">
    SELECT * FROM user 
    WHERE age BETWEEN #{minAge} AND #{maxAge}
    AND name LIKE CONCAT('%', #{name}, '%')
</select>
```


## 三、使用场景

### 1. 必须使用的情况

- 方法有多个参数时
- 参数用\*\*在动态 SQL 中 (****`<if>`****,`<foreach>`\*\***等)**
- 使用**注解方式开发（无 XML）**

### 2. 可以省略的情况

- 方**法只有一个参数且不是集合/数组**
- **参数是 JavaBean 或 Map**

## 四、高级用法

### 1. 与动态 SQL 结合

```xml 
<select id="searchUsers" resultType="User">
    SELECT * FROM user
    <where>
        <if test="name != null">
            AND name = #{name}
        </if>
        <if test="roles != null and roles.size() > 0">
            AND role IN
            <foreach item="role" collection="roles" open="(" separator="," close=")">
                #{role}
            </foreach>
        </if>
    </where>
</select>
```


对应接口：

```java 
List<User> searchUsers(
    @Param("name") String name,
    @Param("roles") List<String> roles);
```


### 2. 与注解式 SQL 结合

```java 
@Select("SELECT * FROM user WHERE name = #{name} AND age = #{age}")
User findByNameAndAge(
    @Param("name") String name,
    @Param("age") Integer age);
```


## 五、注意事项

1. **参数名一致性**：X\*\*ML 中的`#{}`****必须与****`@Param`\*\***指定的名称一致**
2. **基本类型参数**：**基本类型(int, long等)建议都使用**\*\*`@Param`\*\*
3. **集合/数组处理**：**集合类型在动态 SQL 中必须指定**\*\*`@Param`\*\*
4. **与 Spring 的 @RequestParam 区别**：
   - \*\*`@Param`\*\***是 MyBatis 注解**
   - \*\*`@RequestParam`\*\***是 Spring MVC 注解**

## 六、常见错误

1. **缺少 @Param 导致异常**：

```java 
org.apache.ibatis.binding.BindingException: 
Parameter 'XXX' not found. Available parameters are [arg1, arg0, param1, param2]
```


1. &#x20;**名称不匹配**：

```java 
// 接口定义
User selectByName(@Param("userName") String name);

<!-- XML 错误使用 -->
SELECT * FROM user WHERE name = #{name}  <!-- 应该用 userName -->
```


## 七、最佳实践

1. **保持命名一致**：SQL 中的参数名与`@Param`名称完全一致
2. **明确语义**：使用有意义的参数名而非简单类型名
3. **多参数必加**：当方法参数≥2个时，始终使用`@Param`
4. **配合文档**：复杂参数添加注释说明

`@Param`是 MyBatis 开发中处理多参数情况的利器，合理使用可以使 SQL 映射更加清晰可靠。
