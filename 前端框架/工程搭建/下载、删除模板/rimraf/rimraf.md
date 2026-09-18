# rimraf

## 目录

- [rimraf](#rimraf)

```typescript 
"scripts": {
    ......
    "build": "rimraf dist && cross-env vite build"
    "clean": "rimraf node_modules **/*/node_modules",
}
```


#### rimraf

`rimraf` 这是一个nodejs库，库官方地址: [https://www.npmjs.com/package/rimraf](https://links.jianshu.com/go?to=https://www.npmjs.com/package/rimraf "https://www.npmjs.com/package/rimraf")

**插件介绍**

前端执行打包命令时每次都会生成一个dist目录存放打包后的文件，生成打包文件之前我们需要先把 `dist` 目录里的所有文件全部删掉，除了可以使用 `rm -rf /dist/` 命令删除外，还可以使用 `rimraf /dist/` 命令；

**作用**

以包的形式**包装rm -rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除；**

**安装**

局部安装：npm install rimraf --save-dev

全局安装：npm install rimraf -g 使

用：rimraf \<path> \[\<path> ...]
