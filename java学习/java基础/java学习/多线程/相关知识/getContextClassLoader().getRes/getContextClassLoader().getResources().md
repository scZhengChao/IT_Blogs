# getContextClassLoader().getResources()

## 目录

- [基本语法](#基本语法)
- [方法解析](#方法解析)
- [主要特点](#主要特点)
- [典型使用场景](#典型使用场景)
  - [1. 查找所有匹配的资源](#1-查找所有匹配的资源)
  - [2. 加载SPI实现](#2-加载SPI实现)
  - [3. 查找所有配置文件](#3-查找所有配置文件)
- [参数说明](#参数说明)
- [注意事项](#注意事项)
- [与相关方法的比较](#与相关方法的比较)

`getContextClassLoader().getResources()`是Java中用于查找类路径资源的一种常用方法组合，它结合了线程上下文类加载器和资源查找功能。

## 基本语法

```java 
Enumeration<URL> resources = Thread.currentThread()
                                .getContextClassLoader()
                                .getResources(name);
```


## 方法解析

1. **getContextClassLoader()**- **获取当前线程的上下文类加载器**
2. **getResources(String name)**- 查找具有给定名称的所有资源

## 主要特点

- **多位置查找**：与`getResource()`不同，`getResources()`会返回所有匹配的资源，而不仅仅是第一个
- **类路径扫描**：常用于扫描类路径上所有特定文件（如META-INF/services下的SPI配置文件）
- **跨模块/库支持**：能查找多个JAR或模块中的同名资源

## 典型使用场景

### 1. 查找所有匹配的资源

```java 
Enumeration<URL> resources = Thread.currentThread()
                                .getContextClassLoader()
                                .getResources("META-INF/services/com.example.MyService");

while (resources.hasMoreElements()) {
    URL url = resources.nextElement();
    // 处理每个找到的资源
}
```


### 2. 加载SPI实现

```java 
// 加载所有服务提供者实现
Enumeration<URL> configs = ClassLoader.getSystemResources("META-INF/services/javax.servlet.ServletContainerInitializer");
```


### 3. 查找所有配置文件

```java 
// 查找所有application.properties文件
Enumeration<URL> propertiesFiles = Thread.currentThread()
                                      .getContextClassLoader()
                                      .getResources("application.properties");
```


## 参数说明

- `name`参数：资源名称，使用'/'分隔路径，如"com/example/config.xml"
- 返回：包含所有找到的资源URL的Enumeration

## 注意事项

1. 资源路径不应以'/'开头
2. 返回的URL可能需要使用URLDecoder解码特殊字符
3. 资源查找遵循类加载器的委托模型
4. 在模块化系统(JPMS)中行为可能有所不同

## 与相关方法的比较

| 方法                                         | 返回单个资源 | 返回多个资源 | 使用上下文类加载器 |
| ------------------------------------------ | ------ | ------ | --------- |
| \`Class.getResource()\`                    | ✓      | ✗      | ✗         |
| \`ClassLoader.getResource()\`              | ✓      | ✗      | ✗         |
| \`ClassLoader.getResources()\`             | ✗      | ✓      | ✗         |
| \`getContextClassLoader().getResources()\` | ✗      | ✓      | ✓         |

这种方法组合在框架开发中特别有用，特别是在需要扫描整个应用程序类路径查找资源时。
