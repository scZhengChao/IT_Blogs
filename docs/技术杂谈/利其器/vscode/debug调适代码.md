# debug调适代码

## 目录

- [1. 终端调试](#1-终端调试)
  - [1.1 使用JavaScript Debug Terminal(debug 终端)](#11-使用JavaScript-Debug-Terminaldebug-终端)
  - [1.2 Auto Attach: Smart](#12-Auto-Attach-Smart)
- [2. 侧边栏Debug调试](#2-侧边栏Debug调试)
  - [2.1 无launch.json](#21-无launchjson)
  - [2.2 有launch.json配置文件](#22-有launchjson配置文件)
    - [2.2.1 launch](#221-launch)
    - [2.2.2 attach](#222-attach)

[ 在 VS Code 中调试 Node.js - VSCode 编辑器  https://vscode.js.cn/docs/nodejs/nodejs-debugging](https://vscode.js.cn/docs/nodejs/nodejs-debugging " 在 VS Code 中调试 Node.js - VSCode 编辑器  https://vscode.js.cn/docs/nodejs/nodejs-debugging")

## 1. 终端调试

终端调试：主要在终端中运行程序命令，从而进入调试模式。

有两种方式：

1. JavaScript Debug Terminal(debug 终端)
2. 默认终端+设置smart模式

下面一一介绍:

### 1.1 使用JavaScript Debug Terminal(debug 终端)

直接启动一个`debug`模式的终端, 在里面启动的`node`都会进入`debug`模式。

具体步骤：

1. 打开一个新终端，下拉选择JavaScript Debug Terminal

![](../../../assets/技术杂谈/利其器/image/image_XYocA7L1II.png)

1. 运行程序命令 node index.js

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7bb0a2c8fe35429bb65601f66de45e78~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiA6K-65rua6Zuq55CD:q75.awebp?rk3s=f64ab15b\&x-expires=1750978592\&x-signature=4u2WDI%2FTHz7c%2F5s9pgCoWi3c%2Br8%3D)

上面的方式，是每次都需要切换到`JavaScript Debug Terminal`终端，有没有不用切换特定的终端，也可以直接进入调试。

答案是有的，接下来看`Auto Attach`。

### 1.2 Auto Attach: Smart

上面的方式每次都需要开一个额外的终端进行调试，`Auto Attach`的特性，它可以在**不切换 shell 的方式直接调试 node.js**。

具体步骤如下：

1. 使用快捷命令`ctrl + shift + p`,输入`Toggle Auto Attach`,选择`Smart`。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/955556eb401945cb9e7a81fbd5ae10f7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiA6K-65rua6Zuq55CD:q75.awebp?rk3s=f64ab15b\&x-expires=1750978592\&x-signature=VOv4r0aQI4zJfWFov5Bys7lCqLw%3D)

1. 新建普通终端运行`node index.js`直接进入调试模式

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f575024ed3694c5e8dbb80a19824d113~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiA6K-65rua6Zuq55CD:q75.awebp?rk3s=f64ab15b\&x-expires=1750978592\&x-signature=ViEoh1IfySrhBeMF1nljVrMpHPY%3D)

可在 vscode 的设置中，可以找到关于 Smart 模式下允许执行的脚本列表。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/0c63b0bbad63420fb65bd21a5a9a7845~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiA6K-65rua6Zuq55CD:q75.awebp?rk3s=f64ab15b\&x-expires=1750978592\&x-signature=zkgjoWKIjbQ8FchF%2FNVs9VcQXws%3D)

## 2. 侧边栏Debug调试

vscode中的默认debug栏，可以默认或者使用配置文件启动。

### 2.1 无launch.json

无配置文件，直接点击Run and Debug，默认是调试当前文件。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/de027f003ea9400ba84a7c1c8b19de7b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiA6K-65rua6Zuq55CD:q75.awebp?rk3s=f64ab15b\&x-expires=1750978592\&x-signature=V32MjxNYWbnfpNcOO8%2FkoxG9qYk%3D)

会进入当前文件的调试

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/cdd5b5f8731942c0a6cfe68613940906~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiA6K-65rua6Zuq55CD:q75.awebp?rk3s=f64ab15b\&x-expires=1750978592\&x-signature=hkF91S7WNNXA%2FtSjlMdU%2F7PV4cU%3D)

### 2.2 有launch.json配置文件

启动配置\*\*是以一种配置文件的方式去设置如何启动`debug`\*\***模式的方式, 提供更加配置化去满足运行调试需求。**

具体步骤：

1. 正常初次调试，点击debug的右侧侧边栏，点击`create a launch.json file`。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5ffd489fec1f4040beab5e8676a157a8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiA6K-65rua6Zuq55CD:q75.awebp?rk3s=f64ab15b\&x-expires=1750978592\&x-signature=5B25lpGUx4PZPk%2B0pzlnsZgkR0U%3D)

1. 选择运行的环境，不同的语言选择不同

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/c31ae639bc3644bba5193eca1c67a8df~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiA6K-65rua6Zuq55CD:q75.awebp?rk3s=f64ab15b\&x-expires=1750978592\&x-signature=WOxdBfkLlwgyWzhGyQngX2ZvTDg%3D)

1. 选择node.js,根目录下的会创建.vscode/launch.json文件

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f3d3010e264444c082053fcb71185424~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiA6K-65rua6Zuq55CD:q75.awebp?rk3s=f64ab15b\&x-expires=1750978592\&x-signature=J7FiWu%2FHAsRYHAutJOAR7mLL%2BHQ%3D)

默认内容如下

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e6660658f52d441c8db6efd31ca015fb~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiA6K-65rua6Zuq55CD:q75.awebp?rk3s=f64ab15b\&x-expires=1750978592\&x-signature=6dq5WVZuz1zSPkEUlCA1EWhwbow%3D)

其中有三个通用参数：

- type: 运行环境
- request：launch 或 attach
- name：调试启动的名称

可以配置是一个数组，提供下拉列表供调试使用。

下面主要说明（launch和attach）两种调试方式的区别：

先写一段js程序,用原生node写一个简易服务器

```javascript 
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello World\n');
})

server.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
})

```


#### 2.2.1 launch

定义launch方式，点击生成，默认如下：

```json 
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}\\index.js"
        }
    ]
}

```


点击调试

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ac0f0df5f6cb4b78b1c13822769e14f9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiA6K-65rua6Zuq55CD:q75.awebp?rk3s=f64ab15b\&x-expires=1750978592\&x-signature=MFxSFbSb9PhMsqIjsEmC%2BKUOoPk%3D)

访问`http://localhost:3000`

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/0882e733a1eb4004af242295e5bcebda~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiA6K-65rua6Zuq55CD:q75.awebp?rk3s=f64ab15b\&x-expires=1750978592\&x-signature=LbihI%2B471Ws2zpDpibPNTykPcwI%3D)

程序中加断点，然后刷新3000页面，就进入调试模式

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d1c1f87bd1fc48b3bceb36ca1202488d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiA6K-65rua6Zuq55CD:q75.awebp?rk3s=f64ab15b\&x-expires=1750978592\&x-signature=1PONRUZZhhV8la3N5qucQ7ScPww%3D)

`launch模式`是**一个未启动的程序，但是当程序已经启动，不用重新启动，如何添加断点，就使用attach。**

#### 2.2.2 attach

需要配置一个attach模式，使用快捷方式，如下图所示：

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3aa8c16acc134227b33bc423a549cee1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiA6K-65rua6Zuq55CD:q75.awebp?rk3s=f64ab15b\&x-expires=1750978592\&x-signature=Jtlo0Ziq4CdXYd5Tnhq%2FLk7UkK8%3D)

会多出来一条配置

```json 
{
    "name": "Attach by Process ID",
    "processId": "${command:PickProcess}",
    "request": "attach",
    "skipFiles": [
        "<node_internals>/**"
    ],
    "type": "node"
},


```


具体调试步骤：

1. 先运行node程序

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/89d7b86297c84ed0a396404bb475df8e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiA6K-65rua6Zuq55CD:q75.awebp?rk3s=f64ab15b\&x-expires=1750978592\&x-signature=DEc1TFqKidczHBDhAO2a2A5x%2FiM%3D)

1. 启动debug

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b4639cce41aa41f898eb3f2422952d59~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5LiA6K-65rua6Zuq55CD:q75.awebp?rk3s=f64ab15b\&x-expires=1750978592\&x-signature=Kyx2CBEztrII9l9WZpd69X0vE4M%3D)
