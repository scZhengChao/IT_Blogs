# StringBuilder

## 目录

- [StringBuffer 和 StringBuilder](#StringBuffer-和-StringBuilder)

`String` 会在常量池中**产生很多废弃的数据；**

![](./assets/image/image_B8MDDNNFlf.png)

##### StringBuffer 和 StringBuilder

![](./assets/image/image_UjpmPKauZb.png)

> &#x20;

```java title="StringBuilder"
StringBuilder str1= new StringBuilder("hello");
str1.append(",");
str1.append("zvssafs");
str1.delete(0,2).insert(4,"sasf");
str1.replace(4,8,"asfas");



```


![](./assets/image/image__hc_J6Utk_.png)
