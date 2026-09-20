依赖自动装配&#x20;
======

## 目录

- [依赖自动装配特征  ](#依赖自动装配特征)

![](./assets/image/image_Q-YXnvqz_e.png)

- 配置中使用`bean`标签**autowire**属性设置自动装配的类型

```xml 
<bean id="bookDao" class="com.itheima.dao.impl.BookDaoImpl"/>
<bean id="bookService" class="com.itheima.service.impl.BookServiceImpl" autowire="byType"/>

```


依赖自动装配特征

- 自动装配用于**引用类型依赖注入**，不能对简单类型进行操作
- 使用按类型装配时（byType）必须保障容器**中相同类型的bean唯一，推荐使用**
- 使用按名称装配时（byName）必须保障容器中**具有指定名称的bean，因变量名与配置耦合，不推荐使用**
- 自动装配**优先级低于**setter注入与构造器注入，同时出现时自动装配配置失效
