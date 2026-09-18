# 配置细节

## 目录

- [Logback日志：输出位置、格式设置](#Logback日志输出位置格式设置)
- [例子](#例子)

Logback**日志系统的特性**都是通过**核心配置文件**`logback.xml`**控制的**

# Logback日志：输出位置、格式设置

1. 通过`logback.xml` 中的`<append>`标签可以设置输出位置和日志信息的详细格式。
   通常可以设置2个日志输出位置：一个是控制台、一个是系统文件中

输出到控制台的配置标志(记录红色字体即可)

```java 
<appender name=" CONSOLE " class="ch.qos.logback.core.ConsoleAppender">
```


输出到系统文件的配置标志(记录红色字体即可)

```java 
<appender name=" FILE " class="ch.qos.logback.core.rolling.RollingFileAppender">
```


# 例子

```java 
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!--
        CONSOLE ：表示当前的日志信息是可以输出到控制台的。
    -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <!--输出流对象 默认 System.out 改为 System.err-->
        <target>System.out</target>
        <encoder>
            <!--格式化输出：
            %d表示日期，
            %thread表示线程名，
            %-5level：级别从左显示5个字符宽度
                %msg：日志消息，
                %n是换行符
                -->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%-5level]  %c [%thread] : %msg%n</pattern>
        </encoder>
    </appender>

    <!-- File是输出的方向通向文件的 -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
            <charset>utf-8</charset>
        </encoder>
        <!--日志输出路径-->
        <file>C:/code/itheima-data.log</file>
        <!--指定日志文件拆分和压缩规则-->
        <rollingPolicy
                class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!--通过指定压缩文件名称，来确定分割文件方式-->
            <fileNamePattern>C:/code/itheima-data2-%d{yyyy-MMdd}.log%i.gz</fileNamePattern>
            <!--文件拆分大小-->
            <maxFileSize>1MB</maxFileSize>
        </rollingPolicy>
    </appender>

    <!--

    level:用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL 和 OFF
   ， 默认debug
    <root>可以包含零个或多个<appender-ref>元素，标识这个输出位置将会被本日志级别控制。
    -->
    <root level="ALL">
        <appender-ref ref="CONSOLE"/>
        <appender-ref ref="FILE" />
    </root>
</configuration>
```
