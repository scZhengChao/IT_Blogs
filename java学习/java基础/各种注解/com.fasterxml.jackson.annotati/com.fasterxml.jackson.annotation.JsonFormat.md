# com.fasterxml.jackson.annotation.JsonFormat

## 目录

- [@JsonFormat注解详解](#JsonFormat注解详解)
  - [基本用法](#基本用法)
    - [1. 日期时间格式化](#1-日期时间格式化)
    - [2. 枚举类型格式化](#2-枚举类型格式化)
    - [3. 数字格式化](#3-数字格式化)
  - [高级特性](#高级特性)
    - [1. 区域设置（Locale）](#1-区域设置Locale)
    - [2. 与@JsonProperty组合使用](#2-与JsonProperty组合使用)
    - [3. 全局配置替代方案](#3-全局配置替代方案)
  - [常见应用场景](#常见应用场景)
  - [注意事项](#注意事项)
  - [替代方案](#替代方案)

# `@JsonFormat`注解详解

`@JsonFormat`是 Jackson 库提供的注解，用于控制 Java 对象与 JSON 之间的序列化/反序列化格式，特别适用于日期、时间、数字等类型的格式化。

## 基本用法

### 1. 日期时间格式化

```java 
public class Event {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date eventDate;
    
    // getter和setter
}
```


- `shape`：指定值的形状（STRING, NUMBER, ARRAY, OBJECT等）
- `pattern`：自定义格式模式（遵循SimpleDateFormat格式）
- `timezone`：指定时区

### 2. 枚举类型格式化

```java 
public class Order {
    @JsonFormat(shape = JsonFormat.Shape.OBJECT)
    private OrderStatus status;
}

enum OrderStatus {
    PENDING("待处理"),
    PROCESSING("处理中"),
    COMPLETED("已完成");
    
    private String desc;
    
    OrderStatus(String desc) {
        this.desc = desc;
    }
    
    public String getDesc() {
        return desc;
    }
}
```


### 3. 数字格式化

```java 
public class Product {
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private BigDecimal price;
    
    @JsonFormat(shape = JsonFormat.Shape.NUMBER, pattern = "#0.00")
    private Double discount;
}
```


## 高级特性

### 1. 区域设置（Locale）

```java 
@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "EEEE, MMMM dd, yyyy", locale = "zh_CN")
private Date chineseDate;
```


### 2. 与@JsonProperty组合使用

```java 
@JsonProperty("create_time")
@JsonFormat(pattern = "yyyy/MM/dd")
private Date createTime;
```


### 3. 全局配置替代方案

如果需要对所有日期使用相同格式，可以在配置中设置：

```java 
ObjectMapper mapper = new ObjectMapper();
mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd"));
```


## 常见应用场景

1. **API响应标准化**：统一日期时间格式

```java 
@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ssZ")
private Date timestamp;
```


1. **处理时区问题**

```java 
@JsonFormat(timezone = "America/New_York")
private Date nyTime;
```


1. **精确控制数字显示**

```java 
@JsonFormat(pattern = "#,##0.00")
private BigDecimal amount;
```


## 注意事项

1. **序列化与反序列化**：
   - `@JsonFormat`同时影响序列化（对象→JSON）和反序列化（JSON→对象）
   - 如果只需要控制其中一个方向，可以结合`@JsonSerialize`/`@JsonDeserialize`
2. **默认行为**：
   - 默认情况下，Jackson会将`Date`序列化为时间戳（long型）
   - 使用`@JsonFormat`可以改为可读的字符串格式
3. **性能考虑**：
   - 复杂的格式化模式可能影响性能
   - 对于高性能场景，考虑使用缓存或自定义序列化器
4. **与JSR-310时间类型的兼容性**：

```java 
@JsonFormat(pattern = "yyyy-MM-dd")
private LocalDate birthDate;
```


## 替代方案

1. **全局配置**：

```java 
// Spring Boot配置示例
@Bean
public Jackson2ObjectMapperBuilderCustomizer jsonCustomizer() {
    return builder -> {
        builder.simpleDateFormat("yyyy-MM-dd HH:mm:ss");
        builder.timeZone(TimeZone.getTimeZone("Asia/Shanghai"));
    };
}
```


1. **自定义序列化器**：

```java 
public class CustomDateSerializer extends JsonSerializer<Date> {
    @Override
    public void serialize(Date value, JsonGenerator gen, SerializerProvider provider) {
        // 自定义序列化逻辑
    }
}
```


`@JsonFormat`提供了灵活的方式来控制字段的序列化格式，特别适合需要精确控制日期、时间、数字等类型显示格式的应用场景。
