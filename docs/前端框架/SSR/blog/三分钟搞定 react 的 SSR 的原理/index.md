# 三分钟搞定 react 的 SSR 的原理

## 目录

- [为什么要用服务端渲染(SSR)？](#为什么要用服务端渲染SSR)
- [它的核心原理是什么？](#它的核心原理是什么)
- [用ejs模拟下SSR](#用ejs模拟下SSR)
- [用jsx替换ejs模拟SSR](#用jsx替换ejs模拟SSR)
- [SSR全方位模拟hydrateRoot](#SSR全方位模拟hydrateRoot)
  - [路由同构](#路由同构)
  - [数据同构](#数据同构)
  - [节点复用](#节点复用)
- [实现React SSR服务端渲染](#实现React-SSR服务端渲染)
  - [1.装备一个干净的项目，](#1装备一个干净的项目)
  - [2.服务端渲染](#2服务端渲染)
  - [3.配置webpack](#3配置webpack)
  - [4.配置命令](#4配置命令)
  - [5.测试](#5测试)
  - [6.同构](#6同构)
  - [7.hydrateRoot将服务器和浏览器相结合](#7hydrateRoot将服务器和浏览器相结合)
- [总结](#总结)
- [客户端渲染和服务端渲染的项目部署区别](#客户端渲染和服务端渲染的项目部署区别)

## 为什么要用服务端渲染(SSR)？

`1. 首屏等待`

在`SPA`模式下，所有的数据请求和`Dom`渲染都在浏览器端完成，所以当我们第一次访问页面的时候，页面上只会加载一个空的`div`，至于`div`里面的组件，需要`js`一步步解析成`html`以后，才能显示出完整的页面。服务端渲染是我提前将一部分组件用node先处理成html，然后插入到div容器里面。此后js该干嘛干嘛，继续做原来该做的事情，对已有的元素不再理会，对没有的元素进行追加处理。最后出现一个完整的页面。最后就达到了提前渲染的效果，用户能第一时间就看到内容，很好的避免白屏等待。

`2.没考虑SEO的感受`

页面上的内容是只有`div`，当用户访问以后才执行`js`，解析出需要的`html`来，展示在页面上，此时你会发现页面上只有个空的`div`，百度搜索怎么搜到你呢？是不是，再说很多页面的流量都是靠搜索引擎获取的，流量等于`money`，没有流量，你搞个网站意淫吗？所以说`SEO`变相等于`money`，这就是为什么`SEO`作为一项性能优化的指标的原因。

其实在前后端分离以前，咱们的页面就是服务端渲染，所有的页面和`java`耦合在一起，这时候，后端的任务量就很大。项目还不宜维护。等前后端分离以后，用户在浏览器上输入`url`，然后访问`nginx`服务器，然后服务器把`html，js，css`文件返回给浏览器，浏览器开始解析`html`文件，此时的`html`文件里面只有个空的`div`容器，其他元素等到执行完`js`以后才能出现。此时要是有个服务器提前把`js`执行下，帮我把首页的`html`解析出来，用户就能第一时间看到首页，还不影响页面性能，留住用户，其他页面全部由前端`js`自己搞定，这是不是就是`SPA+SSR`相结合的优势。

所以说单独的SPA和单独的SSR是没有优势可言，还有很多弊端，但是他俩相结合，相当于打通了网页的任督二脉，最终发挥出各自强大的优势。

## 它的核心原理是什么？

服务端渲染的最核心就是`同构`。这个图很好，大家可以看看。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6682486df5dc49958110f540c270336b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=o0oUtLEHFNxGDciKWuwQFsSHNIk%3D)

其实，说白了很多事情`react`框架都帮我们做了，我们只需要调用具体的`api`就好了，但是具体的细节和原理还是需要理解的。

用户输入url以后，进入服务器，`node server`接收客户端请求，根据url，他进入路由配置表，查找url对应的页面组件，拿到组件以后调用组件的getInitialProps方法，将数据注入组件里面，然后利用`react`内置的服务端渲染`API ``renderToString() 或者 renderToNodeStream()`把组件渲染为`html字符串`,然后插入到`div`容器里面，会提前显示在页面上，当然此时js也会根据路由配置去找组件，解析成虚拟`dom`，他会看看`current`树里面有没有可以服用的`fiberNode`，如果有的话，就复用，没有的话就加上，然后给元素加上具体的执行事件，显示到页面上，这样服务端渲染出来的元素就得到了复用。

从`react`解析来看，**没有服务器渲染的时候，首次登录，页面走的是解析组件到挂载页面的过程**，有了服务端渲染以后，**页面走的是对比元素，更新页面的过程。这只对首次加载有影响，与其他页面加载无关。**

## 用`ejs`模拟下`SSR`

创建一个新的空项目里面创建2个文件夹，如下：

> 友情提示：请不要在react框架下面尝试，你会发现很多解决不完的bug，我已经尝试过了，干净的项目是最容易跑通的。

```javascript 
npm init -y

```


![](./image/image_9ghYd8ewvd.png)

index.ejs 文件,模拟一个html模板出来

```html 
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>react ssr <%= title %></title>
</head>
<body>
   <%=  data %>
</body>
</html>

```


`server.js`文件，启动一个`http`服务，然后解析`index.cjs`文件，把他解析成`html`

```typescript 
import ejs from 'ejs';
import http from 'http'

http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html' 
        });
     
        ejs.renderFile('./views/index.ejs', {
            title: 'react ssr', 
            data: '首页'}, 
            (err, data) => {
            if (err ) {
                console.log(err);
            } else {
                res.end(data);
            }
        })
    }
}).listen(8080);

```


执行`node server.js`打开页面：[http://localhost:8080/](https://link.juejin.cn/?target=http://localhost:8080/ "http://localhost:8080/")

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/eb8ff528e9034fb0836a8c6c40cc2496~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=Rsgs01dLimg6w7Z2X0PlJbCFty0%3D)

这就是一个简单的服务端渲染。赶紧动动你的小手指，试试呗！

## 用`jsx`替换`ejs`模拟`SSR`

```javascript 
const  React  = require('react');

const { renderToString}  = require( 'react-dom/server');

const http = require('http');

//组件
class Index extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <h1>{this.props.data.title}</h1>
    }
}
 
//模拟数据的获取
const fetch = function () {
    return {
        title:'react ssr',
        data:[]
    }
}

//服务
http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        const data = fetch();

        const html = renderToString(<Index data={data}/>);
        res.end(html);
    }
}).listen(8080);



```


这个文件里面有jsx的代码，所以需要babel编译一下才能执行

```javascript 
npm install @babel/core@7.4.5 @babel/preset-env@7.4.5 @babel/cli @babel/preset-react -D  

```


配置Babel的插件，可以配到配置文件babel.config.js，.babelrc,package.json里面，也可以带到，命令行里面：

```bash 
npx babel script.js --out-file script-compiled.js --presets=@babel/preset-react

```


我们配到package.json里看看

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5c0ec6ed72044cab83a2360bda1ec0dd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=1Gl7pUwi8V%2FsYQ%2BBjD9qYsGWJXU%3D)

然后执行命令： 将script.js用Babel编译到lib下面

```bash 
npx babel script.js --out-dir lib 

```


![](./image/image_mdgL2y4QXZ.png)

启动该文件

```bash 
node lib/script.js

```


发现报错，因为文件用到了react，所以还要安装下面：

```bash 
npm i react react-dom -S

```


启动后

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/dccd51c3f54546c287447ea9330e9de4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=zqfgSe8sECAk%2B4DiUKy3pyWWKtM%3D)

有没有很有成就感？咱们启动了一个项目把数据填充到了jsx里面去了

![](./image/image_IHuHAw96WB.png)

这段代码就是SSR的核心所在，但是它暴露了一个问题：

1. **双端路由如何维护？就是前后端都会使用到路由，你怎么才能统一起来？**
2. **获取数据的方法和逻辑写在哪里？fetch方法你写到哪里去？**
3. 服务端 html 节点无法重用，**就是react解析出来的dom会覆盖服务器渲染出来的html，导致出现闪屏。**

## SSR全方位模拟hydrateRoot

上面就说了服务器渲染的**核心就是同构，分别是：路由同构，数据同构，节点复用三个。**

### 路由同构

对一个`react`项目而言，我们的路由配置文件都是单独放在一个文件里面的，是不是？现在往咱们的项目里面引入`react-router`看看

`import { matchRoutes } from "react-router-config";`利用`matchRoutes`可以将`url`直接匹配到`router`

写个服务出来

```javascript 
//引入官方库
import { matchRoutes } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import routes from './routes-config.js';
import http from 'http';
import React from 'react';

//node server 
http.createServer((req, res) => {
    
        const url = req.url;
        //简单容错，排除图片等资源文件的请求
        if(url.indexOf('.')>-1) { res.end(''); return false;}

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        const data = fetch(); //查找数据
        const branch =  matchRoutes(routes,url); //查找组件
        const Component = branch[0].route.component; //得到组件

        //将组件渲染为 html 字符串
        const html = renderToString(<Component data={data}/>);

        res.end(html);
        
 }).listen(8081);

```


写`./routes-config.js`

```javascript 
import React from 'react'

class Detail extends React.Component{

    render(){
        return <div>detail</div>
    }
}

class Home extends React.Component {

    render() {
        return <div>index</div>
    }
}


const routes = [
  
            {
                path: "/",
                exact: true,
                component: Home
            },
            {
                path: '/detail', exact: true,
                component:Detail,
            },
            {
                path: '/detail/:a/:b', exact: true,
                component: Detail
            }
         
];

//导出路由表
export default routes;


```


现在所有的文件都是`react`的，所以需要`babel`编译下，然后再执行`node`文件

```javascript 
 npx babel src/server.js --out-dir src/lib 
 npx babel src/routes-config.js --out-dir src/lib 
 node ./src/lib/server.js

```


![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9f1102f7cf974d0c872b9731ba2e0809~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=S8cMA472PRGzS7kT5oCLbPqh7oM%3D)

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/dd7f750e222a47dd916f683a61da8c9c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=0%2FIXYh4M%2Fkd5if6cHlUgbZvLqNE%3D)

这一步做完，相当于服务器渲染就和路由配置文件挂钩了。接下来就看看数据同构

### 数据同构

就是你要通过**组件路由中得参数，执行组件里面得异步请求，拿到后端给我们得数据，然后加载到页面上。**

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/90a7ba5362284aa48461b8a174b9c5df~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=pSF0lleDDLufxFMwSaXloEl8sZ4%3D)

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d4755112c3d64183a81fb002def10f93~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=hF9f%2BUeOjyzP1fmWMRjXldzCyjg%3D)

完整代码：

```javascript 
//引入官方库
import { matchRoutes } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import routes from './routes-config.js';
import http from 'http';
import React from 'react';

//node server 
http.createServer(async (req, res) => {
        const url = req.url;
        //简单容错，排除图片等资源文件的请求
        if(url.indexOf('.')>-1) { res.end(''); return false;}

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        const branch =  matchRoutes(routes,url); //查找组件
        const Component = branch[0].route.component; //得到组件
        const data = await Component.getInitialProps();

        //将组件渲染为 html 字符串
        const html = renderToString(<Component initialData={data}/>);

        res.end(html);
        
 }).listen(8081);



```


`routes-config.js`代码

```javascript 
import React from 'react'

class Detail extends React.Component{

    render(){
        return <div>detail</div>
    }
}

//组件
class Home extends React.Component{
    constructor(props){
        super(props);
    }

    //数据预取方法  静态 异步 方法
    static async  getInitialProps() {
        //这个数据是从后台取得，现在假装从后台拿
        return Promise.resolve({
            title: '测试标题',
            content: '测试内容'
        })
    }

    render(){
        const { initialData } = this.props;
        console.log(initialData, 5555)

        return <div>
            <h1>页面数据：{initialData?.title}</h1>
            <p>{initialData?.content}</p>
        </div>
    }
}


const routes = [
            {
                path: "/",
                exact: true,
                component: Home,
            },
            {
                path: '/detail', exact: true,
                component:Detail,
            },  
];

//导出路由表
export default routes;


```


执行命令：

```javascript 
 npx babel src/server.js --out-dir src/lib 
 npx babel src/routes-config.js --out-dir src/lib 
 node ./src/lib/server.js

```


![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/610c14220f964c109ca991e7bf6e2e5c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=R6ES5rnXIbvZUuZTeSOlOTT5zo4%3D)

现在我们的数据注入就成功了。**数据注入其实就是再服务器渲染的时候，你不能只渲染个框架出来，他的数据，你也要请求出来，写到组件里面去。**

### 节点复用

节点复用是啥，就是当浏览器拿到fiber节点以后，**不是直接往div容器里面插入dom，而是要去更新。**同时如果组件内的异步请求，已经在**服务器渲染的时候执行过一次了，在浏览器渲染的时候再执行一次，页面就会出现闪烁**。因为数据变了，页面要重绘。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3583f5a228a546f3b44874c806982227~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=O44ywdNsvhnElSLnBOzs8%2BqQb%2Fw%3D)

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/68b6362572e040af8e7bd4b44681c682~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=6%2FmoXBP9IWQVE02CMdg3BVV53DI%3D)

完整代码：

```javascript 
 
import { matchRoutes } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import routes from './routes-config.js';
import http from 'http';
import React from 'react';
import ejs from 'ejs'

//node server  参考代码
http.createServer((req, res) => {
    const url = req.url;
    if(url.indexOf('.')>-1) { res.end(''); return false;}
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    //查找组件
    const branch =  matchRoutes(routes,url);
    const Component = branch[0].route.component;
    const data = Component.getInitialProps(branch[0].match?.params);
    const html = renderToString(<Component data={data}/>);
    const propsData = `<textarea style="display:none" id="krs-server-render-data-BOX">${JSON.stringify(data)}</textarea>`;

    // 通过 ejs 模板引擎将数据注入到页面
    ejs.renderFile('./views/data.ejs', {
        htmlContent: html,  
        propsData
    },  // 渲染的数据key: 对应到了ejs中的index
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                res.end(data);
            }
    })

}).listen(8080);



```


data.ejs

```html 
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>

<body>
<div id="rootEle">
   <%= htmlContent %> 这个是组件 html内容
</div>

<%= propsData %> 这个是组件 init  state ，现在是个字符串
</body>

</html>
</body>

```


执行命令：

```javascript 
 npx babel data/server.js --out-dir data/lib 
 npx babel data/routes-config.js --out-dir data/lib 
 node ./data/lib/server.js

```


测试：

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5eb986d8d7b3415eb2c3c61f55697d3f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=3hcOS3kNSoTdvm02KzB0hOorm3c%3D)

就这样节点被成功复用了，但是还有个问题就是数据会请求两次，所以要加一点料

就这样节点被成功复用了，但是还有个问题就是数据会请求两次，所以要加一点料

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5d85d9e5bc8f4f0a82da926910e801e9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=noLKW7iitgiNQB5Zsr6HCUoe%2FBk%3D)

整个SSR的全过程就用nodejs模拟出来了。你一定要记得动手试试看。

## 实现React SSR服务端渲染

那我们就徒手搭建一个项目出来试试看呗！

### 1.装备一个干净的项目，

我这边就用上次我们搭建的这个项目[《# 抛开脚手架，徒手搭建 react 项目（二）》](https://juejin.cn/post/7398087074971172879 "《# 抛开脚手架，徒手搭建 react 项目（二）》")

你们做的时候也最好用一个干净的项目，不要用create-react-app搭建的项目。

启动服务以后，一切正常，即可！

### 2.服务端渲染

安装express

```bash 
npm install --save express 
npm install --save-dev @types/express


```


在src下面写一个server.js文件出来

```typescript 
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from "./App.tsx";

const app = express();

app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<div><App /></div>);
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>React SSR</title>
      </head>
      <body>
         <div id="root">${app}</div>
      </body>
    </html>
  `;

  res.send(html);
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});


```


### 3.配置webpack

因为咱们项目里面使用了App组件，他是react的，还涉及了ts，**所以需要用babel编译以后才能使用，所以我需要打包下，然后才能用node访问它。** 创建一个webpack.server.js文件，然后配置如下：

![](./image/image_4gTw5VrjlG.png)

```javascript 
import path from 'path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import nodeExternals from 'webpack-node-externals';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { DEV } = process.env; //线程

export default {
  target: 'node',
  externals: [nodeExternals()], // 排除处理node_modules
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.cjs',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'), //不解析的模块
        loader: 'babel-loader',
        options: {
          presets: [
            //他的主席那个顺序时自下往上的。
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
        },
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: !!DEV,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: !!DEV,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1 * 1024, // 小于1kb转base64，减少请求次数
          },
        },
        generator: {
          filename: 'public/img/[hash:10][ext][query]', // 指定打包路径和文件名
        },
      },
      {
        test: /\.(ttf|woff|woff2?)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'public/iconfont/[hash:10][ext][query]',
        },
      },
      {
        test: /\.(mp3|mp4|avi)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'public/media/[hash:10][ext][query]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },
};



```


### 4.配置命令

```javascript 
  "scripts": {
    "start": "node dist/server.js",
    "dev": " webpack-dev-server --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js",
    "dev:server": "webpack --config webpack.server.js --mode development --watch",
    "build:server": "webpack build --config webpack.server.js --mode production --stats verbose",
    "fix": "eslint --fix \"./src/**/*.{js,jsx,ts,tsx}\"",
    "lint": "eslint \"./src/**/*.{js,jsx,ts,tsx}\""
  },

```


### 5.测试

执行命令：`npm run build:server`， 它会在dist里面打包出`server.js`

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7bd42d04ea3142789d5f145ab3f64a05~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=d3zt%2B%2Bzbm9xh8dpUTCj7QOTWOhA%3D)

我们用node 启动它：`node dist/server.js`

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/96a040c6c99f4ceb8c1cf5b22509c1da~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=j4v7w1nox7%2FG5p1FHzd24puaKaU%3D)

不过很明显服务端加载的页面，几乎是秒出。这个倒确实能解决它的第一个问题，首屏记载速度慢。但是你仔细看看，样式没有了，而且按钮也点一下也不动了，就说明服务端渲染的时候它会将样式和元素的事件全部过滤掉。所以接下来我们要用将客户端渲染的东西和服务端渲染的东西结合在一起。

### 6.同构

改造服务端的server.js文件

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/eaa74c5a97274c109959d7d61264d8b0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=R1ZGBDxoE3EI8tgXq1CnNsmRqEs%3D)

```bash 
 npm run build:server
 node dist/server.cjs

```


执行

```bash 
 npm run build:server
 node dist/server.cjs

```


执行客户端渲染：npm run dev

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/41439928d53d42ffbb1544363ef88d61~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=xjoxQc8kySwuJIu7u7EHgMgGSgo%3D)

执行服务端渲染 node dist/server.cjs

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/22eb1611a3af4497bc2caddc9cab9a10~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=AoOP%2Bq47gmSbfY%2Flu6gPaNPid5E%3D)

你可以看看这个明显的性能差距

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a2c349c0460446a8ab2d1869ea0007f6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=FDNyXApZcSRIUfvk%2FbtTRScy%2F%2FI%3D)

### 7.`hydrateRoot`将服务器和浏览器相结合

客户端入口文件

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/af6a65986895427181cdd192126f63db~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=9BVXXycAVBy%2BLGBhuW1orZpx6K8%3D)

```typescript 
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.hydrateRoot(document.getElementById("root") as any, <App />);

```


安装2个工具如下：

nodemon：是node 命令的升级版，如果你修改了js文件，不用再执行node XX.js,nodemon就会帮你自动执行下。 &#x20;
npm-run-all：是为了解决官方的 npm run 命令无法同时运行多个脚本的问题。

之前我们打包的时候要这么执行

```javascript 
npm run build:client
npm run build:server
npm run start

```


有人觉得，我们完全可以把`npm run build:client`和`npm run build:server`合并成一个，`npm run build`所以就出来了`npm-run-all`

```bash 
npm install nodemon npm-run-all  -D

```


优化命令行

```json 
 "scripts": {
    "start": "node dist/server.js",
    "dev": "npm-run-all --parallel dev:*",
    "build": "npm-run-all build:*",
    "dev:client": " webpack-dev-server --config webpack.dev.js",
    "build:client": "webpack --config webpack.prod.js",
    "dev:server": "webpack --config webpack.server.js --mode development --watch",
    "build:server": "webpack build --config webpack.server.js --mode production --stats verbose",
    "fix": "eslint --fix \"./src/**/*.{js,jsx,ts,tsx}\"",
    "lint": "eslint \"./src/**/*.{js,jsx,ts,tsx}\""
  },

```


执行命令

```bash 
npm run build
npm run start

```


打包以后执行包里面的`server.cjs`文件

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ffdb63519bb249d8a97ddd7ea15660aa~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc25vd-adpeS6hg==:q75.awebp?rk3s=f64ab15b\&x-expires=1750887973\&x-signature=GoA2IzAeJdo8lnjwVgv4DLpIq4w%3D)

## 总结

`createRoot()`和`hydrateRoot()`在大部分情况下的行为是相似的，这两个都会将React元素渲染到指定的DOM节点中，但是在处理服务端渲染返回的HTML是有一些区别。

服务端渲染的时候，**服务端会渲染React元素并且生成一个HTML字符串返回给客户端（也就是浏览器）**，之后客户端会用这个HTML来生成DOM。在同构渲染的时候 **，客户端还会重新执行一遍JS代码，重新生成一个React组件树和相应的DOM节点。**

`createRoot()`会直接创建一个新的React组件数和相应的DOM节点，而`hydrateRoot()`则是在生成的时候，会判断这个节点是否已经在服务端渲染好，**会尽可能地保留现有的DOM，只更新必要的部分**。

使用了Node服务之后，也就不需要Nginx了。

## `客户端渲染`和`服务端渲染`的项目部署区别

`客户端渲染（csr）项目`的部署: 是把`webpack`打包后生成的静态文件`（dist）`上传到`nginx`服务器上，当浏览器访问这个`url`，`nginx`会将对应的静态资源转发给浏览器。（静态资源就是打包后的`dist`里面的文件）

`服务端渲染（ssr）项目`的部署：是先把静态资源放到云服务上，然后安装`node`，用`node`把`server.js`文件启动起来，**然后当用户访问以后，根据**\*\*`url`****，****`server`****会构建出具体的****`html`\*\***发送给浏览器**
