# 自动化配置初体验

目的：以web MVC自动化配置原理为例讲解，能够理解web MVC自动化配置加入了哪些依赖，做了哪些默认配置。 &#x20;

讲解：

回忆一下：SpringMVC学习时候，我们在 SSM整合时;

添加spring及spring web mvc相关依赖

springmvc配置类：

1、扫描controller层

2、静态资源控制

3、......

servlet容器配置类：

1、扫描springmvc配置类

2、扫描spring配置类

3、设置哪些请求交给springmvc处理

4、POST请求乱码过滤器

部署还需要单独的tomcat

也就是说：我们现在需要在开发业务代码前，就必须要准备好这些环境，否则无法完成业务代码，这就是我们现在的问题。

让这些问题成为过去，现在我们就探索一下SpringBoot是如何帮助我们完成强大而又简单自动化配置的。

引入 web 开发场景启动器依赖：

```xml 
<!--web开发的起步依赖   场景启动器依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

```


帮助我们做了以下自动化配置：

1. 依赖版本和依赖什么jar都不需要开发者关注
2. 自动化配置
   - 自动配好SpringMVC
     - 引入SpringMVC全套组件
     - 自动配好SpringMVC常用组件（三大组件，文件上传等）
   - 自动配好Web常见功能，如：字符编码问题，静态资源管理
3. 自动配好Tomcat

小结：

- 有了SpringBoot以后，让开发人员重点关注业务本身，而不是环境上，提升了开发效率。
