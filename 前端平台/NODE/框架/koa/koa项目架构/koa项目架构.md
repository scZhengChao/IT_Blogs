# koa项目架构

## 目录

- [看云：](#看云)
- [官网：（和koa一样简介）](#官网和koa一样简介)
- [1.Koa 脚手架](#1Koa-脚手架)
  - [与 express-generator 的功能对比](#与-express-generator-的功能对比)
  - [1.1 安装 Koa 生成器](#11-安装-Koa-生成器)
  - [1.2 创建 Hello world](#12-创建-Hello-world)
  - [1.3 目录解析](#13-目录解析)
  - [1.4 Koa v2 中间件的写法](#14-Koa-v2-中间件的写法)
  - [1.7 Koa 代码调试](#17-Koa-代码调试)
- [2.env  环境变量](#2env-环境变量)
  - [2.1、.env的作用](#21env的作用)
  - [2.2、.env的使用方法](#22env的使用方法)
  - [2.针对开发测试生产配置不同的环境：](#2针对开发测试生产配置不同的环境)

> 首先：推荐两个学习网址：

### 看云：

[https://www.kancloud.cn/cooldrw2015/koa\_v2/1146985#env\_\_3](https://www.kancloud.cn/cooldrw2015/koa_v2/1146985#env__3 "https://www.kancloud.cn/cooldrw2015/koa_v2/1146985#env__3")

### 官网：（和koa一样简介）

[https://koa.bootcss.com/#links](https://koa.bootcss.com/#links "https://koa.bootcss.com/#links")

# 1.Koa 脚手架

koa-generator 是用于生成 Koa 项目骨架的生成器，虽然比较精简，但它的结构十分清晰，足以满足一般的开发需求。

#### 与 express-generator 的功能对比

**express-generator 提供的功能如下**

- 生成项目骨架，集成必要的中间件。
- 约定目录结构。
- 支持 css 预处理器。

**koa-generator 提供的功能如下**

- 生成项目的骨架，集成必要的中间件。
- 约定目录结构（和 express-generator 约定的结构一模一样）

**两个生成器共同支持的项目骨架描述如下**

- app.js 为入口
- bin/www 为启动入口
- 支持静态服务器，即 publish 目录
- 支持 routes 目录
- 支持 views 视图目录
- 默认将 Pug （之前的名字是 Jade）作为模板引擎。

### 1.1 安装 Koa 生成器

npm install -g koa-generator

koa-generator 支持 v1 和 v2 ，安装后分别使用 koa 和 koa2 命令创建 Koa 项目模板，以 koa2 为例。

### 1.2 创建 Hello world

koa2 helloworld

### 1.3 目录解析

使用 koa-generator 生成的目录结构如下：

. ├── app.js ├── bin |  └── www ├── directoryList.md ├── out.txt ├── package.json ├── public |  ├── images |  ├── javascripts |  └── stylesheets ├── routes |  ├── index.js |  └── users.js └── views    ├── error.pug    ├── index.pug    └── layout.pug

下面会对以上文件作用和文件的内容做简单的介绍

**package.json**

&#x20;package.json 是 Node.js 模块定义的核心配置文件，接触新项目的第一件事就是打开该文件了解模块的各个属性。比如名称，版本，依赖模块，开发方式等。  package.json 文件里包含了 4 个 npm script 脚本，分别介绍如下：

- npm start 是开发阶段使用的脚本，使用时代码发生变动，需要重启 Node.js 进程。
- npm run dev 也是开发阶段使用的脚本，使用时代码会发生变动， nodemon 会自动启动 Node.js 进程。
- npm run prd 是产品环境使用的脚本，通过 pm2 来启动工程，默认按照 CPU 核数来启动对应的进程数，是目前最流行的方式。
- test 只会打印未实现日志，和 Express 里的用法是一样的。

***

**入口文件 bin/www**

&#x20;入口文件的核心代码如下：

const server = http.createServer(app.callback()) server.listen(port) server.on('error', onError); server.on('listening', onListening);

这里唯一和 Express 不同的是，Koa 里的 app.callback() 返回的是 function(req, res){}，所以想在 http.createServer 里启动 Koa，就必须将 app 修改为 app.callback().

***

**核心文件 app.js**

&#x20;app.js 是 Koa 的核心文件，主要包含 4 个部分，分别如下

- 中间件
- 路由
- 静态服务
- 视图  这里注意，中间件按照加载顺序执行，下面是 app.js 里包含的中间件的名称，用途（按照加载顺序排列）。

| 中间件名称           | 用途                                                   | 加载顺序 |
| --------------- | ---------------------------------------------------- | ---- |
| bodyparser      | 解析 Post 类 HTTP 动词的 body 内容，加上 bodyparser 后就可以处理所有请求了 | 1    |
| json            | 更好的支持 JSON                                           | 2    |
| logger          | 开发阶段的日志                                              | 3    |
| koa-static      | 提供 HTTP 静态托管服务                                       | 4    |
| koa-views       | 视图渲染，支持模板引擎                                          | 5    |
| 自定义的 logger 中间件 | 记录日志                                                 | 6    |

***

**路由位于 routes 目录下**

路由支持返回 视图渲染，JSON API 和字符串

- 视图渲染

router.get('/',async(ctx, next)=>{await ctx.render('index',{     title:'Hello Koa 2!'})})

- JSON API

router.get('/json',async(ctx, next)=>{   ctx.body ={a:1}})

- 字符串

router.get('/string',async(ctx, next)=>{   ctx.body ='koa2 string'})

赋予 ctx.body 不同类型的值时会返回不同的结果；值得注意的是，ctx.render 是 koa-views 中间件绑定到 ctx上的，原本 ctx 上是没有 render 函数的。

***

**静态服务位于 public 目录下**

&#x20;静态服务主要用于存放静态资源，比如 HTML，CSS，JS 文件等，但是值得注意的是，静态服务是方便开发存在的，实际项目处理时，一般将静态文件存放在 CDN 服务器上。  public目录是为了方便开发而存在的，一般真正的项目有如下三类：

- 纯 API 项目，不需要 public 目录。
- 纯前后端分离项目，后端不需要 public 目录，前端需要
- 需要 public 目录的项目，但会将 public 目录的内容发布到 cdn 上。

*tip*

： 注意，不要把 static 中间件放到 Koa 的全局中间件上（如果对于每个请求都需要判断一次是不是静态资源，会影响 QPS），最好结合 koa-router 来处理，按需挂在，上代码。

router.get('/public/',async(ctx, next)=>{       ctx.url = path.basename(ctx.url)   await next() },   staticServer(resolve('./public'),{gzip:true}))

***

**视图位于 views 目录下**

&#x20;Koa 多采用 Pug 作为模板，使用时可根据需要自行选择。

***

### 1.4 Koa v2 中间件的写法

Koa 支持三种中间件写法，功能是一样的

- async 函数优先级最高，最简单易懂。
- Promise 其次。await 结合 Promise 是非常常见的，而且利用 Promise的特性是刚需，比如，通过 Promise.race 和 Promise.all 等实现并发可以在某种程度上弥补 async 函数的不足。
- Generator 主要在 Koa v1 中使用，ES6 Generator 风格的中间件非常常见。使用时可以通过 co 库来调用 ES6 Generator，由于 co 的返回值是 Promise，所以相当于重复了 await + Promise 的用法。

***

**1.5 路由**

&#x20;koa-router 中间件提供了路由机制，使用时进一步学习。

***

**1.6 切换视图模板引擎**

&#x20;使用以下命令可以在创建项目时切换模板

koa2 -e hellowrold -ejs

下面以切换 react 模板引擎为例，演示模板的切换过程

- 安装对应的模板引擎模块：npm install --save react。
- 修改 app.js 里与 koa-views 相关的配置，将 extension 设置为 react，代码如下：

app.use(views(\_\_dirname +'./views'),{   extension:'react'})

***

### 1.7 Koa 代码调试

各个编辑器都提供了调试功能，根据编辑器自行调试即可。

# 2.env  环境变量

env 环境变量配置敏感信息

## 2.1、.env的作用

.env

文件是用来自定义配置的一个简单方法，可以将一些不能在代码中存储的敏感/账号数据从代码中剥离出来，作为环境变量存储在环境中。

***

## 2.2、.env的使用方法

        .env 文件通常不包含在版本控制内，它可能包含敏感的 API Key 或者 密码。

       所有需要环境变量定义(不敏感的定义)的项目都需要创建一个.env.example 文件，这个环境变量包含他们自己定义的环境变量或者联合开发包含的环境变量。

     项目合作开发者可以独立的复制 .env.example并且重命名为.env，并且修改为正确的本地环境配置，存储密码key或者提供他们必要的值。&#x20;

**在这个使用方法中 .env 文件应该添加到.gitignore文件中并且永远不会被项目的合作者签入/签出。**

这个方法确保里边没有敏感的 API Key 或者 密码在版本控制中出现从而减少了安全风险，

**并且开发环境中的配置永远不会告知合作开发者。**

- 在根目录下添加.env文件

```javascript 
 DB_HOST=127.0.0.1   
DB_NAME=timeseriesmonitor" 
DB_PORT=5432 
DB_USER=tsm  
DB_UNSECURE=true
```


- 引入
  dotenv
  npm install dotenv

```javascript 
 let dotenv =  require('dotenv'); 
dotenv.config('./env'); 
console.log(process.env);
```


打印log如下：

```javascript 
 {     
  ...     
DB_HOST:  '127.0.0.1',          
DB_NAME:  'timeseriesmonitor',         
DB_PORT:  '5432',          
 DB_UNSECURE:  'true',          
 DB_USER:  'tsm',    
    ...
}
```


[https://www.cnblogs.com/init00/p/12617969.html](https://www.cnblogs.com/init00/p/12617969.html "https://www.cnblogs.com/init00/p/12617969.html")

## 2.针对开发测试生产配置不同的环境：

   scripts

"dev": " cross-env NODE\_ENV=dev ./node\_modules/.bin/nodemon bin/www",    

"sit": " cross-env NODE\_ENV=sit ./node\_modules/.bin/nodemon bin/www",    

"prd": "cross-env NODE\_ENV=prd  pm2 start bin/www",

config 配置&#x20;

const dotenv = require('dotenv');

const fs = require('fs')

const path = require('path')

function resolve(file){

    try{

        fs.statSync(file)

        return path.resolve(\_\_dirname,'../',file)

    }catch(err){

        return null

    }

}

/\*\*

&#x20;\*&#x20;

**这下面的 是 不在代码里的机密信息 在进程里直接取**

&#x20;\*/

dotenv.config({ path: resolve(\`.env.\${process.env.NODE\_ENV}\`) });

dotenv.config({ path: resolve('.env') });

/\*\*

\*\* \* 下面是在代码里导出的\*\*

\*\* \* 配置不同环境的数据库等配置\*\*

&#x20;\*/

const env = process.env.NODE\_ENV

const conf  = require(\`./\${env}\`)

const common = {

}

module.exports = Object.assign({},common,conf)
