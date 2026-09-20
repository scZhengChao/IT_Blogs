# @Configuration配置注解

目的：掌握@Configuration注解的作用及新特性 &#x20;

讲解：

1、@Configuration注解的作用是替代原始 spring配置文件 功能

演示：

1）编写配置类

```java 

package com.itheima.sh.config;

import com.itheima.sh.pojo.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 1、@Configuration 替代 spring配置文件（配置bean）
 * 2、组件源码中包含 @Component 注解，当前类也会注册到 IOC 容器，默认类名小写
 * 3、默认都是单例的
 */
@Configuration
public class MyConfig {

    @Bean   // 默认方法名称作为容器中的name
    public User getUser() {
        return new User();
    }
}


```


2）在引导类编写代码测试：

```java 
@SpringBootApplication
@MapperScan(basePackages = "com.itheima.sh.mapper")
public class DataApplication {
  public static void main(String[] args) {
    ConfigurableApplicationContext applicationContext = SpringApplication.run(DataApplication.class, args);

   // 根据name获取容器中的bean
    User user1 = applicationContext.getBean("getUser", User.class);
    User user2 = applicationContext.getBean("getUser", User.class);
    System.out.println(user1 == user2);

    MyConfig myConfig1 = applicationContext.getBean("myConfig", MyConfig.class);
    MyConfig myConfig2 = applicationContext.getBean("myConfig", MyConfig.class);
    System.out.println(myConfig1 == myConfig2);
    // 注意：如果 MYConfig配置类没有按照规范编写，则容器中bean 的name为 类名
  }
}

```


> SpringBoot 提供一个注解和当前注解功能一样：@SpringBootConfiguration

2、proxyBeanMethods：代理bean的方法属性（since spring 5.2以后）

![](image_9ZIxo8rSu6.png)

功能：

- proxyBeanMethods = true：Full模式，**保证每个@Bean方法被调用多少次返回的组件都是单实例的**
- proxyBeanMethods = false：Lite模式，每**个@Bean方法被调用多少次返回的组件都是新创建的**

演示：

1. 默认 proxyBeanMethods=true，springBoot会检查这个组件是否在容器中有,有则直接引用

```java 
// 默认 proxyBeanMethods=true springBoot会检查这个组件是否在容器中有,有则直接引用
User user3 = myConfig1.getUser();
System.out.println(user1 == user3);  // true
```


1. 修改 proxyBeanMethods=false，则每调用一次Spring就会创建一个新的Bean对象

![](image_6ynUpkkWll.png)

在执行结果则为 false， 证明两次获取的bean不是同一个bean。

小结：

- 组件依赖必须使用Full模式默认。
- Full模式每次都会检查bean，效率较Lite模式慢
