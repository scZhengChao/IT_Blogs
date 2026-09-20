# knife4j快速入门

## 目录

- [2.1 knife4j介绍](#21-knife4j介绍)
- [2.2 项目集成knife4j](#22-项目集成knife4j)

### 2.1 knife4j介绍

knife4j是为Java MVC框架集成Swagger生成Api文档的增强解决方案,前身是swagger-bootstrap-ui,取名kni4j是希望它能像一把匕首一样小巧,轻量,并且功能强悍!

gitee地址：[https://gitee.com/xiaoym/knife4j](https://gitee.com/xiaoym/knife4j "https://gitee.com/xiaoym/knife4j")

官方文档：[https://doc.xiaominfo.com/](https://doc.xiaominfo.com/ "https://doc.xiaominfo.com/")

效果演示：[http://knife4j.xiaominfo.com/doc.html](http://knife4j.xiaominfo.com/doc.html "http://knife4j.xiaominfo.com/doc.html")

**核心功能**

该UI增强包主要包括两大核心功能：**文档说明 和 在线调试**

- 文档说明：根据Swagger的规范说明，详细列出接口文档的说明，包括接口地址、类型、请求示例、请求参数、响应示例、响应参数、响应码等信息，使用swagger-bootstrap-ui能根据该文档说明，对该接口的使用情况一目了然。
- 在线调试：提供在线接口联调的强大功能，自动解析当前接口参数,同时包含表单验证，调用参数可返回接口响应内容、headers、Curl请求命令实例、响应时间、响应状态码等信息，帮助开发者在线调试，而不必通过其他测试工具测试接口是否正确,简介、强大。
- 个性化配置：通过个性化ui配置项，可自定义UI的相关显示信息
- 离线文档：根据标准规范，生成的在线markdown离线文档，开发者可以进行拷贝生成markdown接口文档，通过其他第三方markdown转换工具转换成html或pdf，这样也可以放弃swagger2markdown组件
- 接口排序：自1.8.5后，ui支持了接口排序功能，例如一个注册功能主要包含了多个步骤,可以根据swagger-bootstrap-ui提供的接口排序规则实现接口的排序，step化接口操作，方便其他开发者进行接口对接

### 2.2 项目集成knife4j

**1)快速集成knife4j**

在stock\_common工程添加依赖：

```xml 
<!--knife4j的依赖-->
<dependency>
  <groupId>com.github.xiaoymin</groupId>
  <artifactId>knife4j-spring-boot-starter</artifactId>
</dependency>
<!--支持接口参数校验处理-->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-validation</artifactId>
</dependency>

```


在swagger配置类添加knife4j配置：

```java 
@Configuration
@EnableSwagger2
@EnableKnife4j
@Import(BeanValidatorPluginsConfiguration.class)
public class SwaggerConfiguration {
     //.....其它不变......
}
```


以上有两个注解需要特别说明，如下表：

| 注解                  | 说明\&#x20;                                                                     |
| ------------------- | ----------------------------------------------------------------------------- |
| \`@EnableSwagger2\` | 该注解是Springfox-swagger框架提供的使用Swagger注解，该注解必须加                                  |
| \`@EnableKnife4j\`  | 该注解是\`knife4j\`提供的增强注解,Ui提供了例如动态参数、参数过滤、接口排序等增强功能,如果你想使用这些增强功能就必须加该注解，否则可以不用加 |

**2)访问在线文档资源**：[**http://localhost:8091/doc.html**](http://localhost:8091/doc.html "http://localhost:8091/doc.html")
