# starter依赖管理机制

讲解：

1. 通过依赖 `spring-boot-dependencies` 搜索 `starter-` 发现非常多的官方starter，并且已经帮助我们管理好了版本。
2. 项目中使用直接引入对应的 `starter` 即可，这个场景下需要的依赖就会自动导入到项目中，简化了繁琐的依赖。

   **如果需要修改版本可以有两种方式：**
   - 重写maven属性
   - 使用Maven依赖管理的就近原则
3. 引入 `starter` 不仅仅是帮助我们管理了依赖，还帮我做了很多的默认的配置信息，简化了大量的配置，使用更加的简单。
4. 所有的场景启动器的底层都依赖 `spring-boot-starter`
   ```typescript 
   <dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter</artifactId>
     <version>2.3.10.RELEASE</version>
     <scope>compile</scope>
   </dependency>

   ```


小结：

- 引入官方starter**依赖**默认都可以不写版本
- 如果配置满足您当前开发需要，则**默认配置**即可
