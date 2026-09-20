# 项目集成swagger流程

## 目录

- [1、Swagger快速入门](#1Swagger快速入门)
  - [1.1 swagger介绍](#11-swagger介绍)
  - [1.2 项目集成swagger流程](#12-项目集成swagger流程)
  - [1.3 项目集成swagger](#13-项目集成swagger)
- [其他例子](#其他例子)

## 1、Swagger快速入门

### 1.1 swagger介绍

官网： &#x20;

Swagger 是一个规范和完整的Web API框架，**用于生成、描述、调用和可视化 RESTful 风格的 Web 服务。**

功能主要包含以下几点:

A. 使得前后端分离开发更加方便，有利于团队协作;

B. 接口文档在线自动生成 **，降低后端开发人员编写接口文档的负担;**

C. **接口功能测试;**

使用Swagger只需要按照它的规范去定义接口及接口相关的信息，再通过Swagger衍生出来的一系列项目和工具，就可以做到生成各种格式的接口文档，以及在线接口调试页面等等;

### 1.2 项目集成swagger流程

- 引入swagger依赖；
- 定义swagger配置类；
  - swagger扫描管理的web资源路径；
  - 配置项目文档标题、描述、版本等信息、官网地址等信息；
- 通过swagger注解给指定资源添加描述信息；
- 项目启动，访问并测试在线资源；

### 1.3 项目集成swagger

- 在stock\_common工程引入依赖

```xml 
  <dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
  </dependency>
  <dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
  </dependency>  

```


在stock\_backend工程config包定义swagger配置类

```java 
package com.itheima.stock.config;
  import com.github.xiaoymin.knife4j.spring.annotations.EnableKnife4j;
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;
  import org.springframework.context.annotation.Import;
  import springfox.bean.validators.configuration.BeanValidatorPluginsConfiguration;
  import springfox.documentation.builders.ApiInfoBuilder;
  import springfox.documentation.builders.PathSelectors;
  import springfox.documentation.builders.RequestHandlerSelectors;
  import springfox.documentation.service.ApiInfo;
  import springfox.documentation.service.Contact;
  import springfox.documentation.spi.DocumentationType;
  import springfox.documentation.spring.web.plugins.Docket;
  import springfox.documentation.swagger2.annotations.EnableSwagger2;
  /**
   * @author : itheima
   * @date : 2022/12/15 11:27
   * @description : 定义swagger配置类
   */
  @Configuration
  @EnableSwagger2
  public class SwaggerConfiguration {
     @Bean
     public Docket buildDocket() {
        //构建在线API概要对象
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(buildApiInfo())
                .select()
                // 要扫描的API(Controller)基础包
                .apis(RequestHandlerSelectors.basePackage("com.itheima.stock.web"))
                .paths(PathSelectors.any())
                .build();
     }
     private ApiInfo buildApiInfo() {
        //网站联系方式
        Contact contact = new Contact("黑马程序员","https://www.itheima.com/","itcast@163.com");
        return new ApiInfoBuilder()
                .title("今日指数-在线接口API文档")//文档标题
                .description("这是一个方便前后端开发人员快速了解开发接口需求的在线接口API文档")//文档描述信息
                .contact(contact)//站点联系人相关信息
                .version("1.0.0")//文档版本
                .build();
     }
  } 
```


在stock\_backend工程导入配置类：

```java 
  @SpringBootApplication
  @MapperScan("com.itheima.stock.mapper")
  public class StockApp {
      public static void main(String[] args) {
          SpringApplication.run(StockApp.class, args);
      }
  }

```


***

- swagger相关注解介绍
  | **注解**​                | **位置**​    | **说明**​                                      |
  | ---------------------- | ---------- | -------------------------------------------- |
  | \`@Api\`               | 类          | 加载Controller类上，表示对类的说明                       |
  | \`@ApiModel\`          | 类（通常是实体类）  | 描述实体类的作用，通常表示接口接收参数的实体对象                     |
  | \`@ApiModelProperty\`  | 属性         | 描述实体类的属性，（用对象接收参数时，描述对象的一个字段）                |
  | \`@ApiOperatio n\`     | 方法         | 说明方法的用途、作用                                   |
  | \`@ApiImplicitParams\` | 方法         | 表示一组参数说明                                     |
  | \`@ApiImplicitParam\`  | 方法         | 用在\`@ApiImplicitParams\`注解中，指定一个请求参数的各个方面的属性 |
  | \`@ApiParam\`          | 方法入参或者方法之上 | 单个参数的描述信息，描述form表单、url参数                     |
  @ApiImplicitParam注解详解：

***

| **属性**​           | **取值**​    | **作用**​                                      |
| ----------------- | ---------- | -------------------------------------------- |
| **paramType**​    |            | 查询参数类型                                       |
|                   | \`path\`   | 以地址的形式（REST风格）提交数据，例如：\`/user/{id}\`         |
|                   | \`query\`  | 直接跟参数完成自动映射赋值，例如：\`/add/user?name=zhangsan\` |
|                   | \`body\`   | 以流的形式提交，仅支持POST请求                            |
|                   | \`header\` | 参数在\`request headers\`里边提交                   |
|                   | \`form\`   | 以form表单的形式提交，仅支持POST请求                       |
| **dataType**​     |            | 参数的数据类型，只作为标志说明，并没有实际验证                      |
|                   | \`Long\`   | 数据类型为长整型                                     |
|                   | \`String\` | 数据类型为字符串                                     |
| **name**​         |            | 接收参数名（方法入参的名称）                               |
| **value**​        |            | 接收参数的意义描述（描述信息）                              |
| **required**​     |            | 参数是否必填                                       |
|                   | \`true\`   | 必填                                           |
|                   | \`false\`  | 非必填                                          |
| **defaultValue**​ |            | 默认值                                          |

***

> 其它注解：
>
> @ApiResponse：HTTP响应其中1个描述 &#x20;
>
> @ApiResponses：HTTP响应整体描述 &#x20;
>
> @ApiIgnore：使用该注解忽略这个API &#x20;
>
> @ApiError ：发生错误返回的信息&#x20;

- 在stock\_backent工程为web资源添加注解支持

```java 
@RestController
@RequestMapping("/api")
@Api(value = "用户认证相关接口定义",tags = "用户功能-用户登录功能")
public class UserController {
    /**
     * 注入用户服务bean
     */
    @Autowired
    private UserService userService;
    /**
     * 根据用户名查询用户信息
     * @param userName
     * @return
     */
    @GetMapping("/{userName}")
    @ApiOperation(value = "根据用户名查询用户信息",notes = "用户信息查询",response = SysUser.class)
    @ApiImplicitParam(paramType = "path",name = "userName",value = "用户名",required = true)
    public SysUser getUserByUserName(@PathVariable("userName") String userName){
        return userService.getUserByUserName(userName);
    }
    /**
     * 用户登录功能接口
     * @param vo
     * @return
     */
    @PostMapping("/login")
    @ApiOperation(value = "用户登录功能",notes = "用户登录",response = R.class)
    public R<LoginRespVo> login(@RequestBody LoginReqVo vo){
        return userService.login(vo);
    }
    /**
     * 生成登录校验码的访问接口
     * @return
     */
    @GetMapping("/captcha")
    @ApiOperation(value = "验证码生成功能",response = R.class)
    public R<Map> getCaptchaCode(){
        return userService.getCaptchaCode();
    }
}
```


# 其他例子

```java 
package com.example.swagger2.controller;


import com.example.swagger2.exception.SwaggerException;
import com.example.swagger2.model.User;
import io.swagger.annotations.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Api(tags = "接口服务", value = "/api/v1/swagger/**")
@RestController
@RequestMapping("/api/v1/swagger")
public class ApiController {

    @ApiOperation("保存用户信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "name", value = "名字", required = true, paramType = "path"),
            @ApiImplicitParam(name = "age", dataType = "int", value = "年龄", required = true, paramType = "query")
    })
    @PostMapping("/{name}")
    @ResponseBody
    public Boolean save(
            @PathVariable("name") String name,
            @RequestParam("age") Integer age
    ) {
        userInfo.put(name, new User(name, age));
        return true;
    }


    @ApiOperation("查询年龄")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "name", value = "名字", required = true, paramType = "path")
    })
    @ApiResponses({
            @ApiResponse(code = 404, message = "用户不存在", response = SwaggerException.class)
    })
    @GetMapping("/{name}")
    @ResponseBody
    public User get(
            @PathVariable("name") String name
    ) throws SwaggerException {
        if (!userInfo.containsKey(name)) {
            throw new SwaggerException(name + "不存在！");
        }
        return userInfo.get(name);
    }

    public static Map<String, User> userInfo = new HashMap<>(16);
}

```


```java 
package com.example.swagger2.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@ApiModel(description = "用户信息")
public class User {

    @ApiModelProperty(value = "姓名")
    String name;
    @ApiModelProperty(value = "年龄")
    Integer age;
}

```
