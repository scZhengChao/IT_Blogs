# @RequestParam

## 目录

- [基本用法](#基本用法)
  - [1. 基本参数绑定](#1-基本参数绑定)
  - [2. 指定参数名](#2-指定参数名)
  - [3. 设置默认值](#3-设置默认值)
  - [4. 非必需参数](#4-非必需参数)
- [高级用法](#高级用法)
  - [1. 绑定到Map](#1-绑定到Map)
  - [2. 绑定到多值参数](#2-绑定到多值参数)
  - [3. 与@PathVariable组合使用](#3-与PathVariable组合使用)

`@RequestParam`是 Spring MVC 中用于从 HTTP 请求中**获取参数的注解**，主要用来处理 URL 查询参数或表单数据。

## 基本用法

### 1. 基本参数绑定

```java 
@GetMapping("/user")
public String getUser(@RequestParam String name) {
    return "User: " + name;
}
```


访问`/user?name=John`会返回 "User: John"

### 2. 指定参数名

当方法参数名与请求参数名不一致时：

```java 
@GetMapping("/user")
public String getUser(@RequestParam("username") String name) {
    return "User: " + name;
}

```


访问`/user?username=John`

### 3. 设置默认值

```java 
@GetMapping("/user")
public String getUser(@RequestParam(defaultValue = "Guest") String name) {
    return "User: " + name;
}
```


访问`/user`会返回 "User: Guest"

### 4. 非必需参数

```java 
@GetMapping("/user")
public String getUser(@RequestParam(required = false) String name) {
    return "User: " + (name != null ? name : "Anonymous");
}
```


## 高级用法

### 1. 绑定到Map

获取所有请求参数：

```java 
@GetMapping("/params")
public String getParams(@RequestParam Map<String, String> allParams) {
    return "Parameters: " + allParams.toString();
}
```


### 2. 绑定到多值参数

```java 
@GetMapping("/fruits")
public String getFruits(@RequestParam List<String> fruits) {
    return "Fruits: " + String.join(", ", fruits);
}
```


访问`/fruits?fruits=apple&fruits=banana`

### 3. 与@PathVariable组合使用

```java 
@GetMapping("/users/{userId}/posts")
public String getUserPosts(
    @PathVariable Long userId,
    @RequestParam(required = false) Integer page) {
    // 实现逻辑
}
```
