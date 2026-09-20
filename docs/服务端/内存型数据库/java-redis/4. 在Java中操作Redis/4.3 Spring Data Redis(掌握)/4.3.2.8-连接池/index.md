# 4.3.2.8 整合连接池(能够理解连接池参数即可)

关于redis连接池并没有什么效果，**配置好之后会优化获取连接性能。**

pom引入依赖：

```xml title="<!-- redis创建连接池，默认不会创建连接池 -->"
<!-- redis创建连接池，默认不会创建连接池 -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency
```


配置连接池：

```yaml 
# 配置redis环境
spring:
  redis:
    # 默认连接本地localhost,如果仅仅连接本地redis服务，则可不写
    host: 192.168.200.128
    # 默认端口是6379，则省略不写
    port: 6379
    # redis实例中分为16分片库，索引位从0~15，默认操纵的是0
    database: 0
    lettuce:
      pool:
        max-active: 8 # 连接池最大连接数（使用负值表示没有限制）
        max-wait: -1ms # 连接池最大阻塞等待时间（使用负值表示没有限制）
        max-idle: 8 # 连接池中的最大空闲连接
        min-idle: 1  # 连接池中的最小空闲连接

```
