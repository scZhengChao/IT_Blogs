# bin

**`bin `**字段用来指定各个**内部命令对应的可执行文件的位置：**

```json 
"bin": {
  "someTool": "./bin/someTool.js"
}
 
```


这里，`someTool` 命令对应的**可执行文件为 bin 目录下的 someTool.js，**someTool.js 会**建立符号链接** node\_modules/.bin/someTool。由于 node\_modules/.bin / **目录会在运行时加入系统的 PATH 变量**，因此在运行 npm 时，**就可以不带路径，直接通过命令来调用这些脚本**。因此，下面的写法可以简写：

```json 
scripts: {  
  start: './node_modules/bin/someTool.js build'
}
 
// 简写
scripts: {  
  start: 'someTool build'
}

```


所有 node\_modules/.bin / 目录下的命令，**都可以用 npm run \[命令] 的格式运行。**

上面的配置在 package.json 包中提供了一个映射到本地文件名的 bin 字段，之后 npm 包将链接这个文件到 prefix/fix 里面，以便全局引入。或者链接到本地的 node\_modules/.bin / 文件中，以便在本项目中使用。
