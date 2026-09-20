# Logback

- Logback是由log4j创始人设计的另一个开源日志组件，性能比log4j要好
- 官方网站：[https://logback.qos.ch/index.html](https://logback.qos.ch/index.html "https://logback.qos.ch/index.html")
- Logback是基于`slf4j`的日志规范实现的框架。

Logback主要分为三个技术模块：

- logback-core： `logback-core` 模块为其他两个模块奠定了基础 ,相当于入口，必须有。
- logback-classic：它是`log4j`的一个改良版本，核心功能模块 , 同时它完整实现了slf4j API。
- &#x20;logback-access 模块与 Tomcat 和 Jetty 等 Servlet 容器集成，以提供 HTTP 访问日志功能

[基本使用](IT/服务端/java学习/java基础/Java%20%20一次/工程/日志框架/Logback/基本使用/基本使用.md "基本使用")

[配置细节](./配置细节/index.md "配置细节")

[日志级别](./日志级别/index.md "日志级别")
