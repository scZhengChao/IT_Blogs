# references

[ tsc性能优化Project References使用详解 - 爱码帮™分享编程知识和开发经验 tsc性能优化Project References使用详解 - 目录什么是 Project References示例项目结构不使用 Project References 带来的问题tsconfig.json 的 references 配置项tsconfig.json 的 composite 配置项使用 Project ... http://www.ukotlin.com/article/363330](http://www.ukotlin.com/article/363330 " tsc性能优化Project References使用详解 - 爱码帮™分享编程知识和开发经验 tsc性能优化Project References使用详解 - 目录什么是 Project References示例项目结构不使用 Project References 带来的问题tsconfig.json 的 references 配置项tsconfig.json 的 composite 配置项使用 Project ... http://www.ukotlin.com/article/363330")

TypeScript 3.0中的一项新功能，允许您将TypeScript程序构建为更小的部分。通过这样做，您可以大大缩短构建时间，实现组件之间的逻辑分离，并以新的更好的方式组织代码。

它是一个对象的数组，指明要引用的工程：

```javascript 
{
    "compilerOptions": {
        // The usual
    },
    "references": [
        { "path": "../src" }
    ]
}
```


每个引用的`path`属性都可以指向到包含`tsconfig.json`文件的目录，或者直接指向到配置文件本身（名字是任意的）。

```javascript 
{
  "files": [],
  "references": [{ "path": "./tsconfig.node.json" }, { "path": "./tsconfig.web.json" }],
  "include": ["src/**/*", "types/**/*.d.ts", "mock/**/*.ts"]
}

```


当你引用一个工程时，会发生下面的事：

- 导入**引用工程中的模块实际加载的是它\_输出\_的声明文件（****`.d.ts`****）**。
- 如果引用的工程生成一个`outFile`，那么这个输出文件的`.d.ts`文件里的声明对于当前工程是可见的。
- 构建模式（后文）会根据需要自动地构建引用的工程

[什么是 references](<./什么是 references/index.md> "什么是 references")
