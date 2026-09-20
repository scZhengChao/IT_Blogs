# 监控-Admin可视化

目的：能够搭建 可视化监控平台 &#x20;

讲解：

SpringBoot Admin 有两个角色，客户端(Client)和服务端(Server)。

Spring Boot Admin为注册的应用程序提供以下功能：

- 显示健康状况
- 显示详细信息，例如
  - JVM和内存指标
  - micrometer.io指标
  - 数据源指标
  - 缓存指标
- 显示内部信息
- 关注并下载日志文件
- 查看JVM系统和环境属性
- 查看Spring Boot配置属性
- 支持Spring Cloud的可发布/ env-和// refresh-endpoint
- 轻松的日志级别管理
- 与JMX-beans交互
- 查看线程转储
- 查看http-traces
- 查看审核事件
- 查看http端点
- 查看预定的任务
- 查看和删除活动会话（使用spring-session）
- 查看Flyway / Liquibase数据库迁移
- 下载heapdump
- 状态更改通知（通过电子邮件，Slack，Hipchat等）
- 状态更改的事件日志（非持久性）

  快速入门：[https://codecentric.github.io/spring-boot-admin/2.3.1/#getting-started](https://codecentric.github.io/spring-boot-admin/2.3.1/#getting-started "https://codecentric.github.io/spring-boot-admin/2.3.1/#getting-started")

实现：

以下为创建服务端和客户端工程步骤：

搭建Server端：

1、创建 admin\_server 模块，引入依赖

```java 
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.3.10.RELEASE</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>

<dependencies>
    <dependency>
        <groupId>de.codecentric</groupId>
        <artifactId>spring-boot-admin-starter-server</artifactId>
        <version>2.3.1</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

</dependencies>
```


2、开启注解支持

```java 
package com.itheima.sh;

import de.codecentric.boot.admin.server.config.EnableAdminServer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAdminServer
public class AdminApplication {
    public static void main(String[] args) {
        SpringApplication.run(AdminApplication.class, args);
    }
}

```


注意端口修改为：9999

搭建Client端：

1、在任意服务里面引入依赖

```java 
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-client</artifactId>
    <version>2.3.1</version>
</dependency>

```


2、配置文件

```java 
  # 执行admin.server地址
spring:   
  boot:
    admin:
      client:
        url: http://localhost:9999  # admin 服务地址
        instance:
          prefer-ip: true   # 显示IP
  application:
    name: boot_data  # 项目名称

management:
  endpoints:
    enabled-by-default: true #暴露所有端点信息
    web:
      exposure:
        include: '*'  #以web方式暴露

  endpoint:
    health:
      enabled: true   # 开启健康检查详细信息
      show-details: always

```


3、启动服务，访问admin Server [http://localhost:9999/](http://localhost:9999/ "http://localhost:9999/")

![](./image/image_GX-1vfjedH.png)
