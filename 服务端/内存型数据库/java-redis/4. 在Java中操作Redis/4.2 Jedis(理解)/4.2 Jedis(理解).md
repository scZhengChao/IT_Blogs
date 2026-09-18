# 4.2 Jedis(理解)

## 目录

- [4.2 Jedis(理解)](#42-Jedis理解)
  - [1.Jedis使用介绍](#1Jedis使用介绍)
  - [2. Jedis类常用方法](#2-Jedis类常用方法)
  - [3、案例：Jedis的基本操作](#3案例Jedis的基本操作)
    - [目标](#目标)
    - [操作步骤：](#操作步骤)

### 4.2 Jedis(理解)

#### 1.Jedis使用介绍

Jedis 是 Redis 的 Java 版本的客户端实现。

maven坐标：

```xml 
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>2.8.0</version>
</dependency>

```


使用 Jedis 操作 Redis 的步骤：

1. 获取连接
2. 执行操作
3. 关闭连接

#### 2. Jedis类常用方法

注：每个方法就是redis中的命令名，方法的参数就是命令的参数。

在每次访问Redis数据库的时候，都需要创建一个Jedis对象。每个Jedis对象似于JDBC中Connection对象，类似于mybatis中session对象。

| **连接和关闭**​                  | **功能**​                                                  |
| --------------------------- | -------------------------------------------------------- |
| **new Jedis(host, port)** ​ | 创建Jedis连接对象，参数： \&#x20; host: 服务器地址 \&#x20; port：端口号6379 |
| **void close()** ​          | 关闭连接                                                     |

| **对string操作的方法**​                  | **说明**​     |
| ---------------------------------- | ----------- |
| **set(String key,String value)** ​ | 添加字符串类型的键和值 |
| **String get(String key)** ​       | 通过键得到字符串的值  |
| **del(String ... keys)** ​         | 删除一个或多个键    |

| **对hash操作的方法**​                                  | **说明**​              |
| ------------------------------------------------ | -------------------- |
| **hset(String key,String field,String value)** ​ | 添加一个hash类型的键，字段和值    |
| **Maphgetall(String key)** ​                     | 通过一个键得到所有的字段和值，返回Map |

| **对list操作的方法**​                                   | **说明**​        |
| ------------------------------------------------- | -------------- |
| **lpush(String key,String...values)** ​           | 从左边添加多个值到list中 |
| **List\lrange(String key,long start,long end)** ​ | 通过键得到指定范围的元素   |

| **对set操作的方法**​                         | **说明**​      |
| -------------------------------------- | ------------ |
| **sadd(String key,String...values)** ​ | 添加一个或多个元素    |
| **Set\smembers(String key)** ​         | 通过键得到集合所有的元素 |

| 对zset操作的方法                                          | 说明          |
| --------------------------------------------------- | ----------- |
| **zadd(String key, double score, String member)** ​ | 添加一个键，分数和值  |
| **Set\zrange(String key, long start, long end)** ​  | 查询一个指定范围的元素 |

#### 3、案例：Jedis的基本操作

##### 目标

使用Jedis上面的方法来访问Redis，向服务器中写入字符串、hash和list类型，并且取出打印到控制台上。

##### 操作步骤：

**1.导入依赖**

```xml 
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>2.8.0</version>
</dependency>

```


**2.创建测试类，书写操作redis数据库的代码，代码一共分为三步：**

【1】创建jedis对象，连接redis数据库服务器 new Jedis(host,port)

【2】 操作数据

【3】 关闭连接

【1.下面是操作字符串数据的代码】：

```java 
package com.itheima.sh.jedis_test_01;

import org.junit.Test;
import redis.clients.jedis.Jedis;

import java.util.List;

public class JedisTest01 {
    /*
        jedis入门
     */
    @Test
    public void test01(){
        //1.创建jedis对象，连接redis数据库服务器 new Jedis(host,port)
        Jedis jedis = new Jedis("127.0.0.1",6379);
        //2.操作数据
        //【1】字符串
        jedis.set("username", "柳岩");
        //获取
        String username = jedis.get("username");
        System.out.println("username = " + username);
        //一次性添加多个数据 mset(key1,value1,key2,value2,...)
        jedis.mset("addr", "sh", "company", "黑马");
        //获取所有的数据
        List<String> values = jedis.mget("username", "addr", "company");
        System.out.println("values = " + values);
        //3.关闭连接
        jedis.close();
    }
}

```


控制台输出结果：

小结：

1.一次性添加多个字符串数据,使用的方法如下：

```javascript 
mset(key1,value1,key2,value2,...)

```


2.一次性获取所有的字符串：

```java 
List<String>mget(key1,key2,key3...);
```


【2.下面是操作hash数据的代码】：

```java 
package com.itheima.sh.jedis_test_01;
import org.junit.Test;
import redis.clients.jedis.Jedis;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
public class JedisTest01 {
    /*
        jedis入门
     */
    @Test
    public void test01(){
        //1.创建jedis对象，连接redis数据库服务器 new Jedis(host,port)
        Jedis jedis = new Jedis("127.0.0.1",6379);
        //2.操作数据
       //【2】hash
        jedis.hset("person", "username", "锁哥");
        //存储多个数据 注意这里map集合的键和值都是String类型
        Map<String, String> map = new HashMap<>();
        map.put("age", "18");
        map.put("height", "180");
        jedis.hmset("person", map);
        //获取hash中的所有的数据
        Map<String, String> map1 = jedis.hgetAll("person");
        System.out.println(map1);
        //3.关闭连接
        jedis.close();
    }
}

```


控制台输出结果：

小结：

1.向hash中添加一个数据：

```javascript 
jedis.hset(key, field,value);
```


2.向hash中添加多个数据：

```java 
jedis.hset(key, map集合);
```


3.获取hash中所有的数据：

```java 
Map<String,String>map1 = jedis.hgetAll(key);
```
