# 启动类

## 目录

- [App.java](#Appjava)
- [application.yaml](#applicationyaml)

# App.java

```java 
package com.zc.stock;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.zc.stock.mapper") //扫描持久层mapper接口；生成代理对象，并维护到spring的IOC容器中；
public class BackendApp {
    public static void main(String[] args) {
        SpringApplication.run(BackendApp.class,args);
    }
}

```


# application.yaml

```yaml 
server:
  port: 8091
spring:
  # 配置mysql数据源
  datasource:
    druid:
      username: root
      password: root
      url: jdbc:mysql://localhost:3306/stock_db?useUnicode=true&characterEncoding=UTF-8&allowMultiQueries=true&useSSL=false&serverTimezone=Asia/Shanghai
      driver-class-name: com.mysql.jdbc.Driver
      # 初始化时建立物理连接的个数。初始化发生在显示调用 init 方法，或者第一次 getConnection 时
      initialSize: 6
      # 最小连接池数量
      minIdle: 2
      # 最大连接池数量
      maxActive: 20
      # 获取连接时最大等待时间，单位毫秒。配置了 maxWait 之后，缺省启用公平锁，
      # 并发效率会有所下降，如果需要可以通过配置 useUnfairLock 属性为 true 使用非公平锁。
      maxWait: 60000

# 配置mybatis
mybatis:
  mapper-locations: mapper/*.xml
  configuration:
    map-underscore-to-camel-case: true #开启驼峰映射
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl #通过mybatis执行的sql以日志方式输出到终端
  type-aliases-package: com.zc.stock.pojo.entity #批量给实体类取别名；方便在xml中直接使用别名；避免冗余的 一些配置
#配置分页插件
pagehelper:
  auto-dialect: mysql #p配置分页方言；数据库类型
  reasonable: true #开启合理查询； 比如总页数100；查询101页；会自动查询100页
```
