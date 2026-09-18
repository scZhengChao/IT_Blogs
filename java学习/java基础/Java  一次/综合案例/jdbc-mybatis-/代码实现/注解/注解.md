# 注解

```java title="@Select"
//查询时使用的注解
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Select {
    String[] value();
}
```


```java title="@ResultType"
//查询结果的封装类型
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface ResultType {
    String value();
}

```
