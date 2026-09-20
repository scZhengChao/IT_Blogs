# @Conditional衍生条件装配

目的：理解@Conditional衍生条件装配的作用 &#x20;

讲解：

作用：条件装配，满足Conditional指定的条件，则进行组件注入，初始化Bean对象到IOC容器  。

![](./assets/image/image_EygQnzSqCV.png)

演示：

在RedisConfig类中添加注释：

方法中定义：

![](./assets/image/image_MaahXBpWZJ.png)

类上定义：

![](./assets/image/image_pXjPT3l0_a.png)

**注意：也可以添加到 类上， 满足条件则类及类中的对象生效。**

小结：

- @ConditionalOnXXX 注解存在的意义是：满足条件当前类或者Bean才有效，按需导入。
