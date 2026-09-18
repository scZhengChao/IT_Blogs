# 热更新、自动重启

## 目录

- [nodemon](#nodemon)
  - [4.1. 方式一：通过命令行参数配置 nodemon](#41-方式一通过命令行参数配置-nodemon)
- [supervisor](#supervisor)

# nodemon

[ nodemon - npm Simple monitor script for use during development of a Node.js app.. Latest version: 3.1.7, last published: 2 months ago. Start using nodemon in your project by running \`npm i nodemon\`. There are 6370  https://www.npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon " nodemon - npm Simple monitor script for use during development of a Node.js app.. Latest version: 3.1.7, last published: 2 months ago. Start using nodemon in your project by running `npm i nodemon`. There are 6370  https://www.npmjs.com/package/nodemon")

自动重启  调试

```bash 
npm i nodemon -D   nodemon src/app.js

```


> 配置 nodemon 有三种配置方式：命令参数、[package.json](https://so.csdn.net/so/search?q=package.json\&spm=1001.2101.3001.7020 "package.json")和nodemon.json

> 三种配置的优先级： nodemon.json > package.json > 命令参数；

配置:

```json title="nodemon.json"


{
    "watch":["./src/**/*.js"]
}


```


### 4.1. 方式一：通过[命令行](https://so.csdn.net/so/search?q=命令行\&spm=1001.2101.3001.7020 "命令行")参数配置 nodemon

- `--help`，获取帮助；

```bash 
nodemon --help

```


- `--config` ：设置指定的配置文件；
- `--ignore`：设置无需监视的文件路径；
- `--exec` ：执行脚本
- `--watch` : 设置要监视的文件和文件夹路径；
- `--ext` : 设置监视文件的后缀扩展名；

> 默认情况下，`nodemon` 会`watching path(s): *.*`所有项目文件，啥文件改动一下都要重启服务，其实没必要。

配置只监视 src 目录

```bash 
nodemon --watch src server.js

配置监视文件的后缀扩展名
nodemon --ext js,json


```


上面使用的 `--watch` 参数，在这次`--ext`中并没有保存下来，监视的目录又变成默认的： `*`，所以说，命令配置临时用一下是可以的，常用的话，还是用[配置文件](https://so.csdn.net/so/search?q=配置文件\&spm=1001.2101.3001.7020 "配置文件")香；

```json title="完整的 nodemon.json 总结一下"
{
  "restartable": "rs",
  "verbose": true,
  "watch": [
    "config/",
    "router/",
    "utils/",
    "views/",
    "app.ts",
    "index.ts"
  ],
  "ignore": [
    "test/*.spec.ts"
  ],
  "delay": "1000",
  "exec": "TS_NODE_PROJECT=tsconfig.server.json node --inspect -r ts-node/register ./app.ts",
  "ext": "ts ejs yml json"
}


```


nodemon.json 各项配置含义：

- –restartable：设置重启命令，默认是 rs；
- –verbose：是否输出重启的详细信息，布尔值，默认false；
- –watch：监视文件或文件夹的路径，数组，每个参数都指某个路径；
- –ignore：忽略监视的路径，默认忽略的是：.git，node\_modules，bower–components，.sass-cache；
- –delay：设置延迟时间；
- –ext：指定默认文件扩展名，参数是字符串，空格分隔；
- –script：指定监视的文件，一般指项目入口的 js 文件；
- –exec：执行的命令；
- –env ：运行环境 development 是开发环境，production 是生产环境，pr–ot 是端口；

# supervisor

npm i supervisor -g
