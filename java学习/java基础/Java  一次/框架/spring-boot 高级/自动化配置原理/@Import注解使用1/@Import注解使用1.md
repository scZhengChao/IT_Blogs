# @Import注解使用1

目的：能够理解@Import注解作用及4种使用方式 &#x20;

讲解：

作用：使用@Import导入的类会被Spring加载到IOC容器中

@Import提供4种用法：

1. 导入Bean
2. 导入配置类
3. **导入 ImportSelector 实现类。一般用于加载配置文件中的类**
4. 导入 ImportBeanDefinitionRegistrar 实现类

实现：

1、导入Bean

```java 
package com.itheima.sh;

import com.itheima.sh.pojo.User;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Import;

import java.util.Map;

@SpringBootApplication
@Import(User.class)  
//会自动执行当前类的构造方法创建对象，存到IOC容器, bean名称为：类的全路径

public class DataApplication {
  public static void main(String[] args) {
    ConfigurableApplicationContext applicationContext = SpringApplication.run(DataApplication.class, args);

    Map<String, User> map = applicationContext.getBeansOfType(User.class);
    System.out.println(map);

    User user1 = applicationContext.getBean("com.itheima.sh.pojo.User", User.class);
    System.out.println(user1);

  }
}

```


2、导入配置类

```java 
package com.itheima.sh;

import com.itheima.sh.config.MyConfig;
import com.itheima.sh.pojo.User;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Import;

import java.util.Map;

@SpringBootApplication
@MapperScan(basePackages = "com.itheima.sh.mapper")
//@Import(User.class)
//1、会自动执行当前类的构造方法创建对象，存到IOC容器, bean名称为：类的全路径

@Import(MyConfig.class)
//2、创建MyConfig bean，并且类中有 带有@Bean注解方法，创建对象存到IOC容器，bean名称为：默认方法名称
public class DataApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(DataApplication.class, args);

        //{getUser=com.itheima.sh.pojo.User@1b4a3a1}
        Map<String, User> map = applicationContext.getBeansOfType(User.class);
        System.out.println(map);

        User user1 = applicationContext.getBean("getUser", User.class);
        System.out.println(user1);

        Map<String, MyConfig> config = applicationContext.getBeansOfType(MyConfig.class);
        //{com.itheima.sh.config.MyConfig=com.itheima.sh.config.MyConfig@7e848aea}
        System.out.println(config);
    }
}

```
