# redis在项目中配置

## 目录

- [redis在docker中的安装](#redis在docker中的安装)
- [依赖](#依赖)
- [配置](#配置)
- [自定义Bean](#自定义Bean)

# redis在docker中的安装

[docker安装redis](docker安装redis.md "docker安装redis")

# 依赖

```xml 
<!--redis场景依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!-- redis创建连接池，默认不会创建连接池 -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>

```


# 配置

```yaml title="定义application-cache.yml文件专门配置缓存信息"
spring:
  # 配置缓存
  redis:
    host: 192.168.188.130
    port: 6379
    database: 0 #Redis数据库索引（默认为0）
    lettuce:
      pool:
        max-active: 8 # 连接池最大连接数（使用负值表示没有限制）
        max-wait: -1ms # 连接池最大阻塞等待时间（使用负值表示没有限制）
        max-idle: 8 # 连接池中的最大空闲连接
        min-idle: 1  # 连接池中的最小空闲连接
    timeout: PT10S # 连接超时时间


```


&#x20;说明：由于application主配置文件在后**续会写入很多其它配置信息，这会导致主配置臃肿难以维护**，所以我们把不同的信息独立配置，这样就降低了维护成本；

在主配置文件中激活配置：

```yaml 
spring.profiles.active=cache

```


# 自定义Bean

```java 
package com.zc.stock.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * 自定义redis的序列化方式；避免使用默认的jdk序列化 方式
 * jdk序列化方式问题
 *  1.阅读体验很差
 *  2.序列化后体积很大；占用过多内存
 */
@Configuration
public class RedisCacheConfig {
    /**
     * 配置redisTemplate bean，自定义数据的序列化的方式
     * @param redisConnectionFactory 连接redis的工厂，底层有场景依赖启动时，自动加载
     * @return
     * 自定义模版对象；要保证bean的名称叫redisTemplate；否则场景依赖会自动装配；导致相同类型的bean出现多个；
     */

    @Bean
    public RedisTemplate redisTemplate(@Autowired RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String,Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);
        //2.为不同的数据结构设置不同的序列化方案
        //设置key序列化方式
        template.setKeySerializer(new StringRedisSerializer());
        //设置value序列化方式
        template.setValueSerializer(new Jackson2JsonRedisSerializer<>(Object.class));
        //设置hash中field字段序列化方式
        template.setHashKeySerializer(new StringRedisSerializer());
        //设置hash中value的序列化方式
        template.setHashValueSerializer(new Jackson2JsonRedisSerializer<>(Object.class));
        //5.初始化参数设置
        template.afterPropertiesSet();
        return template;

    }
} 

```
