# 命令行配置

```typescript title="命令行解析：
"
命令行解析： 

rollup --input main.js --output.file bundle.js --format cjs
(1)该命令编译 main.js 生成 bundle.js, --format cjs 意味着打包为 node.js 环境代码,
--input 这个包的入口点
--output.file 文件出口
--format 格式 分5种
    * amd – 异步模块定义，用于像RequireJS这样的模块加载器
    * cjs – CommonJS，适用于 Node 和 Browserify/Webpack
    * es – 将软件包保存为ES模块文件
    * iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
    * umd – 通用模块定义，以amd，cjs 和 iife 为一体

(2) 当不想把引入的插件打包进去的时候, 可以使用 external, 配合globals
  globals:{
    jquery:'$'
  },
  external:['jquery' ],

使用配置文件

执行 rollup -c rollup.config.js启动配置项;
rollup 提供了 --watch / -w 参数来监听文件改动并自动重新打包
```
