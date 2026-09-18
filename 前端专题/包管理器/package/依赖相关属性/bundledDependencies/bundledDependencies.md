# bundledDependencies

上面的几个依赖相关的配置项都是一个对象，而 `bundledDependencies` 配置项**是一个数组，数组**里可以指定一些模块，**这些模块将在这个包发布时被一起打包。**

需要注意，**这个字段数组中的值必须是在 dependencies, devDependencies 两个里面声明过的包才行。**

如果**期望一些依赖包能出现在最终打包的包里**，可以将这些依赖放在`bundledDependencies`中，与其他`dependencies`不同的是，`bundledDependencies`接收一个包含依赖名的数组，例如：

```json 
{
  "name": "myReact",
  "version": "1.0.0",
  "bundledDependencies": [
    "react", "react-dom"
  ],
}


```


`npm pack`后会生成`myReact-1.0.0.tgz`，在`npm install /path/to/myReact-1.0.0.tgz`时，会把`bundledDependencies`中的依赖一并安装。
