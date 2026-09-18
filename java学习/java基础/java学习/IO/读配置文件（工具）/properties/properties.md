# properties

## 目录

- [基本概念](#基本概念)
- [Properties概述：](#Properties概述)
  - [构造方法](#构造方法)
  - [核心方法](#核心方法)
    - [1. 基本操作方法](#1-基本操作方法)
    - [2. 文件I/O方法](#2-文件IO方法)
  - [典型用法](#典型用法)
    - [1. 基本使用](#1-基本使用)
    - [2. 加载配置文件](#2-加载配置文件)
    - [3. 保存配置文件](#3-保存配置文件)
  - [文件格式示例](#文件格式示例)
  - [特殊特性](#特殊特性)
  - [使用场景](#使用场景)
  - [注意事项](#注意事项)
- [结合io流使用](#结合io流使用)
  - [读取配置文件](#读取配置文件)
  - [存取配置文件](#存取配置文件)

`Properties`是 Java 中一个非常重要的工具类，位于`java.util`包中，主要用于处理**键值对形式的配置文件**。

## 基本概念

`Properties`类继承自`Hashtable<Object,Object>`，具有以下特点：

- 专门用于处理**属性文件**（`.properties`文件）
- 键和值**默认都是字符串类型**（String）
- 支持从**输入流/输出流**加载和保存属性
- 广泛应用于**应用程序配置**、**国际化资源**等场景

# Properties概述：

- 是一个**Map体系的集合类**
- Properties**中有跟IO相关的**方法
- 不需要**加泛型.默认存储的是Object类型, 但是工作中只存字符串**

## 构造方法

```java 
properties prop = new Properties()
```


## 核心方法

### 1. 基本操作方法

```java 
// 设置属性
void setProperty(String key, String value)

// 获取属性（如果key不存在返回null）
String getProperty(String key)

// 获取属性（带默认值）
String getProperty(String key, String defaultValue)
 
 
// 获取所有属性名
Enumeration<?> propertyNames()

Set<String> stringPropertyNames()
```


```java 
package com.properties;

import java.util.Enumeration;
import java.util.Properties;
import java.util.Set;

public class Demo1 {
    public static void main(String[] args) {
        Properties props = new Properties();
        // 不需要泛型；都是string类型
        props.setProperty("java","asfa");
        props.setProperty("js","zc");
        
        System.out.println(props.getProperty("java"));
        
        Set<String> names = props.stringPropertyNames();
        
        System.out.println(names );

    }
}

```


### 2. 文件I/O方法

```java 
// 从输入流加载属性
void load(InputStream inStream)
void load(Reader reader)

// 保存到输出流（默认ISO-8859-1编码）
void store(OutputStream out, String comments)
void store(Writer writer, String comments)

// JDK9+新增：支持UTF-8编码的存储
void storeToXML(OutputStream os, String comment, String encoding)
```


## 典型用法

### 1. 基本使用

```java 
Properties props = new Properties();
props.setProperty("username", "admin");
props.setProperty("password", "123456");

String user = props.getProperty("username");
String pwd = props.getProperty("password", "default");
```


### 2. 加载配置文件

```java 
try (InputStream input = getClass().getResourceAsStream("/config.properties")) {
    Properties prop = new Properties();
    prop.load(input);
    
    String dbUrl = prop.getProperty("db.url");
    String dbUser = prop.getProperty("db.user");
} catch (IOException ex) {
    ex.printStackTrace();
}
```


### 3. 保存配置文件

```java 
Properties prop = new Properties();
prop.setProperty("key1", "value1");
prop.setProperty("key2", "value2");

try (FileOutputStream output = new FileOutputStream("config.properties")) {
    prop.store(output, "Configuration File");
} catch (IOException io) {
    io.printStackTrace();
}
```


## 文件格式示例

典型的`.properties`文件内容：

```.properties 
# 数据库配置
db.url=jdbc:mysql://localhost:3306/mydb
db.user=root
db.password=secret

# 应用设置
app.name=MyApplication
app.version=1.0.0
```


## 特殊特性

1. **默认值链**：可以设置默认的Properties对象

```java 
Properties defaults = new Properties();
defaults.setProperty("color", "red");

Properties props = new Properties(defaults);
String color = props.getProperty("color"); // 返回"red"
```


1. 系统属性集成：可以获取系统属性

```java 
Properties sysProps = System.getProperties();
String javaVersion = sysProps.getProperty("java.version");
```


1. **XML格式支持**：可以读写XML格式的属性文件

```java 
// 加载XML格式
prop.loadFromXML(inputStream);

// 保存为XML
prop.storeToXML(outputStream, "XML Config");
```


## 使用场景

1. **应用程序配置**：数据库连接、服务器设置等
2. **国际化支持**：多语言资源文件（如messages\_zh.properties）
3. **系统属性管理**：获取JVM环境变量
4. **框架配置**：如Spring、Hibernate等框架的配置文件

## 注意事项

1. **字符编码**：默认使用ISO-8859-1编码，处理中文需要使用Unicode转义（如`\u4e2d\u6587`）
2. **线程安全**：继承自Hashtable，是线程安全的
3. **性能考虑**：频繁读写时不如HashMap高效
4. **资源释放**：使用try-with-resources确保流正确关闭

`Properties`类是Java中处理配置文件的经典工具，虽然现在有更多现代配置方案（如YAML、JSON），但在许多遗留系统和简单场景中仍然非常实用。

# 结合io流使用

## 读取配置文件

- properties 配置文件；已key/value的形式体现；存储正在properties 当中

```java 
package com.properties;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class Demo2 {
    public static void main(String[] args) throws IOException {
        Properties prop = new Properties();
        prop.load(new FileInputStream("config.properties"));
        System.out.println(prop);
    }
}

```


> {password=12124, name=asa, age=214}
> Process finished with exit code 0

![](image_wBw5nEhLLQ.png)

## 存取配置文件

```java 
package com.properties;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

public class Demo3 {
    public static void main(String[] args) throws IOException {
        Properties props = new Properties();

         props.setProperty("Java","zc");
        props.setProperty("js","12");
        props.setProperty("name","as");

        props.store( new FileOutputStream("config.properties",true),"备注描述");
     }
}
```
