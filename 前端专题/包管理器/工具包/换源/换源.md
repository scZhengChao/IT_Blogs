# 换源

[   https://juejin.cn/post/6969738540003360799](https://juejin.cn/post/6969738540003360799 "   https://juejin.cn/post/6969738540003360799")

或者叫做代理；镜像 都可以

```javascript 
sudo npm i yrm -g   // yarn 和 npm 镜像管理
sudo npm i nrm -g    // npm 镜像管理
   
   
查看源: nrm ls
添加源: nrm add name http//:xxx.xxx.xxx.xxx:4873/
删除源: nrm del name
使用指定源: nrm use npm
- test。测试镜像源速度
- use  使用某个镜像源
- ls  列出所有镜像源


Usage: yrm [options] [command]

  Commands:

    ls                           List all the registries
    use <registry>               Change registry to registry
    add <registry> <url> [home]  Add one custom registry
    del <registry>               Delete one custom registry
    home <registry> [browser]    Open the homepage of registry with optional browser
    test [registry]              Show the response time for one or all registries
    help                         Print this help

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

```
