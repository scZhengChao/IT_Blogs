# BigDecimal

## 目录

- [保留小数](#保留小数)

```java 
超出double 类型的小数；

```


# 保留小数

> **除不尽的时候会抛异常**

```java 
public static void method2(){
        BigDecimal d = new BigDecimal("12412.44");
        BigDecimal d2 = new BigDecimal("124.24");
        BigDecimal d3 = d.divide(d2,2,BigDecimal.ROUND_CEILING);
        System.out.println(d3);
    }
```
