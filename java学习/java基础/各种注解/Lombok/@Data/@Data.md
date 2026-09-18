# @Data

## 目录

- [一、核心作用](#一核心作用)
- [二、基本用法](#二基本用法)
  - [1. 简单示例](#1-简单示例)
  - [2. 配合其他 Lombok 注解使用](#2-配合其他-Lombok-注解使用)
- [三、高级用法](#三高级用法)
  - [1. 排除特定字段](#1-排除特定字段)
  - [2. 只读对象（只有getter）](#2-只读对象只有getter)
- [四、使用场景](#四使用场景)
- [五、注意事项](#五注意事项)
- [六、与其他 Lombok 注解关系](#六与其他-Lombok-注解关系)
- [七、IDE 支持](#七IDE-支持)

`@Data`是 Lombok 提供的一个组合注解，用于自动生成 Java Bean 的样板代码，极大简化 POJO (Plain Old Java Object) 类的编写。

## 一、核心作用

`@Data`注解会自动生成以下内容：

1. **所有字段的 getter 方法**
2. **所有非 final 字段的 setter 方法**
3. **toString() 方法**
4. **equals() 和 hashCode() 方法**
5. **无参构造器**（如果没有其他构造器）

## 二、基本用法

### 1. 简单示例

```java 
import lombok.Data;

@Data
public class User {
    private Long id;
    private String username;
    private String email;
    private Integer age;
}
```


等效于手动编写的：

```java 
public class User {
    // 字段...
    
    // 构造器
    public User() {}
    
    // getters
    public Long getId() { return this.id; }
    public String getUsername() { return this.username; }
    // 其他getter...
    
    // setters
    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    // 其他setter...
    
    // toString
    public String toString() {
        return "User(id=" + this.id + ", username=" + this.username + /*...*/ ")";
    }
    
    // equals 和 hashCode
    public boolean equals(Object o) { /*...*/ }
    public int hashCode() { /*...*/ }
}
```


### 2. 配合其他 Lombok 注解使用

```java 
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {
    private Long id;
    private String name;
    private BigDecimal price;
}
```


## 三、高级用法

### 1. 排除特定字段

```java 
@Data
public class Employee {
    private Long id;
    private String name;
    
    @ToString.Exclude  // 排除toString
    @EqualsAndHashCode.Exclude  // 排除equals和hashCode
    private String salary;
}
```


### 2. 只读对象（只有getter）

```java 
@Data
public class ReadOnlyData {
    @Getter(AccessLevel.PUBLIC)
    @Setter(AccessLevel.NONE)  // 不生成setter
    private final String id;
    
    private String value;
}
```


## 四、使用场景

1. **DTO/VO 对象**：数据传输/值对象
2. **实体类**：JPA/Hibernate 实体
3. **配置类**：配置属性类
4. **测试类**：测试数据对象

## 五、注意事项

1. **不可变类**：如果需要不可变类，应使用`@Value`注解
2. **继承问题**：`equals`/`hashCode`默认不会考虑父类字段
3. **JPA 实体**：
   - 避免在双向关联中使用`@Data`（可能导致栈溢出）
   - 推荐使用`@Getter`和`@Setter`替代
4. **性能考虑**：
   - 自动生成的`toString()`可能包含不必要字段
   - 自动生成的`equals()`/`hashCode()`可能不是最优实现

## 六、与其他 Lombok 注解关系

`@Data`实质上是以下注解的组合：

```java 
@ToString
@Getter
@Setter
@RequiredArgsConstructor
@EqualsAndHashCode
```


## 七、IDE 支持

1. **IntelliJ IDEA**：需安装 Lombok 插件
2. **Eclipse**：需安装 Lombok 插件并配置
3. **编译要求**：项目中需要包含 Lombok 依赖

Maven 依赖：

```xml 
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.24</version> <!-- 使用最新版本 -->
    <scope>provided</scope>
</dependency>
```


@Data 注解极大提高了开发效率，减少了样板代码，但在复杂场景下可能需要更精细的控制，此时可以考虑使用 Lombok 的其他单独注解。
