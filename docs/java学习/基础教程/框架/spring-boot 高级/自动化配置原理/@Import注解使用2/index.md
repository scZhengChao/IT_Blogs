# @Import注解使用2

目的：讲解@Import注解使用另外两种使用方式 &#x20;

步骤：

1. **导入 ImportSelector 实现类。一般用于加载配置文件中的类**
2. 导入 ImportBeanDefinitionRegistrar 实现类

实现：

**导入 ImportSelector 实现类。一般用于加载配置文件中的类**

1、编写 ImportSelector 实现类，MyImportSelector

2、引导类导入

```java 
package com.itheima.sh;

import com.itheima.sh.config.MyImportSelector;
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

//@Import(MyConfig.class)
//2、创建MyConfig bean，并且类中有 带有@Bean注解方法，创建对象存到IOC容器，bean名称为：默认方法名称

@Import(MyImportSelector.class)
//3、创建MyConfig bean 名称为：类名全路径，创建带有@Bean注解方法实例，名称为：方法名称
public class DataApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(DataApplication.class, args);

      Map<String, MyConfig> map = applicationContext.getBeansOfType(MyConfig.class);
      //{com.itheima.sh.config.MyConfig=com.itheima.sh.config.MyConfig@44384b4a}
      System.out.println(map);

      Map<String, User> userMap = applicationContext.getBeansOfType(User.class);
      //{getUser=com.itheima.sh.pojo.User@5cc3e49b}
      System.out.println(userMap);

    }
}
```


**导入 ImportBeanDefinitionRegistrar 实现类**

1、编写 ImportBeanDefinitionRegistrar 实现类，MyImportBeanDefinitionRegistrar

```java 
package com.itheima.sh.config;

import com.itheima.sh.pojo.User;
import org.springframework.beans.factory.support.AbstractBeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.context.annotation.ImportBeanDefinitionRegistrar;
import org.springframework.core.type.AnnotationMetadata;

public class MyImportBeanDefinitionRegistrar implements ImportBeanDefinitionRegistrar {

  /**
     * @param importingClassMetadata 导入类的元注解信息
     * @param registry Bean注册表
     */
  @Override
  public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
    AbstractBeanDefinition beanDefinition = BeanDefinitionBuilder
      .rootBeanDefinition(User.class).getBeanDefinition();
    registry.registerBeanDefinition("user", beanDefinition);
  }
}
```


2、引导类测试

```java 
package com.itheima.sh;

import com.itheima.sh.config.MyImportBeanDefinitionRegistrar;
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

//@Import(MyConfig.class)
//2、创建MyConfig bean，并且类中有 带有@Bean注解方法，创建对象存到IOC容器，bean名称为：默认方法名称

//@Import(MyImportSelector.class)
//3、创建MyConfig bean 名称为：类名全路径，创建带有@Bean注解方法实例，名称为：方法名称

@Import(MyImportBeanDefinitionRegistrar.class)
//4、创建Bean，名称：在registerBeanDefinition中定义
public class DataApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(DataApplication.class, args);

        Map<String, User> userMap = applicationContext.getBeansOfType(User.class);
        //{user=com.itheima.sh.pojo.User@23c7cb18}
        System.out.println(userMap);

    }
}
```


小结：

- 讲解当前小节的目的主要是为源码准备
- 还有我们也可以知道创建Bean对象，还可以使用`@Import`四种方式
