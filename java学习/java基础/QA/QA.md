# QA

## 目录

- [control层的方法；为什么会自带一个repsonse对象](#control层的方法为什么会自带一个repsonse对象)
- [\<scope>test\</scope>](#scopetestscope)

#### control层的方法；为什么会自带一个repsonse对象

大多数现代Web框架（如Spring MVC、Express、Django等）会**自动注入**`response`对象到Controller方法中，这是为了简化开发。例如：

- **Spring MVC**（Java）：通过方法参数自动注入`HttpServletResponse`。

```java 
@GetMapping("/example")
public void handleRequest(HttpServletResponse response) {
    // 直接使用response对象
}
```


#### \<scope>test\</scope>

在 Maven 的`pom.xml`文件中，`<scope>test</scope>`用于定义依赖项（Dependency）的作用范围，表示该依赖**仅在测试阶段（Test Phase）可用**，不会打包到最终的生产代码（如 WAR/JAR）中。
