# 自动化配置原理-debug全流程

## 目录

- [12-SpringBoot2高级-自动化配置原理-总结  ](#12-SpringBoot2高级-自动化配置原理-总结--)

目的：能够理解整个SpringBoot启动的完成自动化配置及属性加载的全过程 &#x20;

#### 12-SpringBoot2高级-自动化配置原理-总结 &#x20;

SpringBoot自动化配置流程总结：

- 程序启动找到自动化配置包下 `META-INF/spring.factories` 的`EnableAutoConfiguration`
- SpringBoot先加载所有的自动配置类 **xxxxxAutoConfiguration**
- 每个自动配置类按照**条件**进行生效。
- 生效的配置类就会给容器中装配很多组件
- 只要容器中有这些组件，相当于这些功能就有了
- 定制化配置
  - 用户直接自己@Bean替换底层的组件
  - 用户去看这个组件是获取的配置文件什么值就去修改。

```java 
graph LR;
1[xxxxAutoConfiguration] --> 2[ Bean组件]
2 --> 3[xxxxProperties里面取值]
3 --> 4[application.properties]

```


开发人员使用步骤总结：

- 引入[场景依赖](https://docs.spring.io/spring-boot/docs/current/reference/html/using-spring-boot.html#using-boot-starter "场景依赖")
- 查看自动配置了哪些（选做）
  - 自己分析，引入场景对应的自动配置一般都生效了
  - 配置文件中debug=true开启自动配置报告。Negative（不生效）\Positive（生效）
- **自己分析**是否需要修改
- 参照[文档](https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-application-properties.html#common-application-properties "文档")修改配置项，xxxxProperties绑定了配置文件的哪些。
  - 自定义加入或者替换组件，@Bean、@Component等
