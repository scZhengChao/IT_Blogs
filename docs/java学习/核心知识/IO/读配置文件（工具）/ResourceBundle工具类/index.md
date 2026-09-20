# ResourceBundle工具类

## 目录

- [API介绍](#API介绍)

> 作用：**读取项目工程**中`src`下的`.properties`配置文件的；

# API介绍

- java.util.ResourceBundle它是一**个抽象类**
- 我们可以使用它的子类`PropertyResourceBundle`来读取以.properties结尾的配置文件

**通过静态方法直接获取对象**

- `static ResourceBundle getBundle(String baseName)` 可以根据名字直接**获取默认语言环境下的属性资源。**
- 参数注意: baseName&#x20;
  &#x20; 	1.\*\*属性集名称不含扩展名。
  &#x20;   	2.属性集文件****是在src目录中的****
  \*\*比如：src中存在一个文件 user.properties
  ResourceBundle bundle = ResourceBundle.getBundle("user");
- ResourceBundle中常用方法：
  &#x20;  `String getString(String key) `: 通过键，获取对应的值&#x20;

```java 
package com.properties;

import java.util.ResourceBundle;

public class Resource {
    public static void main(String[] args) {
        ResourceBundle rb = ResourceBundle.getBundle("config");
        String name = rb.getString("name");
        System.out.println(name);
    }
}

```
