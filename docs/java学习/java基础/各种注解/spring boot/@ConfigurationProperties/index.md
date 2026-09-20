# @ConfigurationProperties

## 目录

- [一、基本作用](#一基本作用)
- [二、基本用法](#二基本用法)
  - [1. 简单示例](#1-简单示例)
  - [2. 嵌套属性](#2-嵌套属性)
- [三、高级特性](#三高级特性)
  - [1. 集合类型支持](#1-集合类型支持)
  - [2. 验证支持](#2-验证支持)
  - [3. 宽松绑定](#3-宽松绑定)
- [四、激活方式](#四激活方式)
  - [1. 通过 @EnableConfigurationProperties 激活](#1-通过-EnableConfigurationProperties-激活)
  - [2. 通过 @Component 激活](#2-通过-Component-激活)
- [五、最佳实践](#五最佳实践)
- [六、与 @Value 对比](#六与-Value-对比)

`@ConfigurationProperties`是 Spring Boot 提供的一个强大注解，**用于将外部配置（如 application.properties/yml 文件）绑定到 Java 对象上。**

## 一、基本作用

1. **批量配置注入**：将多个相关配置属性一次性注入到一个Bean中
2. **类型安全**：提供强类型的配置访问
3. **配置分组**：将分散的配置按功能分组管理
4. **自动转换**：自动将字符串配置转换为目标类型（如List、Map等）

## 二、基本用法

### 1. 简单示例

```java 
@Configuration
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private String name;
    private int version;
    private boolean production;
    
    // getters and setters 必须提供
}
```


对应 application.properties:

```yaml 
app.name=MyApplication
app.version=2
app.production=true
```


### 2. 嵌套属性

```java 
public class DatabaseConfig {
    private String url;
    private String username;
    private String password;
    // getters/setters
}

@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private DatabaseConfig database;
    // getter/setter
}
```


对应 application.yml:

```yaml 
app:
  database:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: secret
```


## 三、高级特性

### 1. 集合类型支持

```java 
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private List<String> servers;
    private Map<String, String> metadata;
    // getters/setters
}
```


配置示例:

```javascript 

app.servers[0]=server1.example.com
app.servers[1]=server2.example.com
app.metadata.key1=value1
app.metadata.key2=value2


```


### 2. 验证支持

结合`@Validated`进行配置验证:

```java 
@Configuration
@ConfigurationProperties(prefix = "app")
@Validated
public class AppConfig {
    @NotNull
    private String name;
    
    @Min(1)
    @Max(100)
    private int version;
}
```


### 3. 宽松绑定

支持多种属性命名风格自动匹配:

```yaml 
app.project-name=MyProject  # 对应 projectName 字段
app.project_name=MyProject # 同样有效
```


## 四、激活方式

### 1. 通过 @EnableConfigurationProperties 激活

```java 
@SpringBootApplication
@EnableConfigurationProperties(AppConfig.class)
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
```


### 2. 通过 @Component 激活

```java 
@Component
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    // ...
}
```


## 五、最佳实践

1. **集中管理**：将相关配置集中到一个类中
2. **提供默认值**：在字段声明时提供合理的默认值
3. **不可变配置**：考虑使用`@ConstructorBinding`(Spring Boot 2.2+)
4. **文档注释**：为配置属性添加详细注释说明用途和格式

## 六、与 @Value 对比

| 特性   | @ConfigurationPrope rties | @Value |
| ---- | ------------------------- | ------ |
| 批量绑定 | 支持                        | 不支持    |
| 松散绑定 | 支持                        | 不支持    |
| 类型安全 | 强类型                       | 需自行转换  |
| 复杂类型 | 支持(List,Map等)             | 有限支持   |
| 验证支持 | 支持                        | 不支持    |
| 适用场景 | 多个相关属性                    | 单个简单属性 |

`@ConfigurationProperties`是 Spring Boot 应用管理配置的推荐方式，特别适合复杂配置场景。
