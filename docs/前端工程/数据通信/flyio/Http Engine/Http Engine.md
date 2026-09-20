# Http Engine

## 目录

- [请求重定向](#请求重定向)
  - [背景](#背景)
    - [Cookie同步](#Cookie同步)
    - [接口安全](#接口安全)
    - [访问控制](#访问控制)
    - [性能](#性能)
    - [缓存](#缓存)
  - [请求重定向](#请求重定向)
- [Http Engine](#Http-Engine)
  - [切换engine](#切换engine)
  - [Adapter](#Adapter)
    - [一个简单的例子](#一个简单的例子)
  - [远程Http Engine](#远程Http-Engine)
    - [DSBridge Adapter](#DSBridge-Adapter)
    - [Native实现](#Native实现)

[https://wendux.github.io/dist/#/doc/flyio/engine](https://wendux.github.io/dist/#/doc/flyio/engine "https://wendux.github.io/dist/#/doc/flyio/engine")

Fly引入了Http engine 的概念，

所谓 Http Engine，就是指真正发起 http 请求的引擎

，这在浏览器中就是

XMLHttpRequest

 或 

ActiveXObject

 (IE)，而在node环境中，engine 可以用任何能发起网络请求的库或模块。而 

Fly 正是通过在不同环境切换不同engine的方式实现支持不同的javascripp运t运行环境的

。

这也是重定向的基

# 请求重定向

## 背景

          如果你开发的是一个 PC桌面应用、或者一个APP，可能有些功能你需要以通过内嵌 h5 页面的方式实现，对于这类应用，我们称之为

混合应用

。而在大所数平台的混合应用中，你会发现有个问题：你

无法干涉 

webview 中 h5 页面发起的 ajax 请求。这样一来，你就很难进行统一的请求管理！为什么要进行统一的请求管理呢？主要有以下几种场景：

1. cookie 同步.
2. 接口安全
3. 访问控制
4. 性能
5. 缓存

### Cookie同步

混合APP种非常关键的一点就是 Native 和 h5 之间的 cookie 同步

。因为 Native 和 h5 都可以发起网络请求，而两者所用的请求池并不是同一个（h5 ajax 请求是 webview 发起的），这就会导致 Native 和 h5 cookie 不能同步，如果不能统一管理请求，就会导致你要在不同的场景做大量的同步工作。更沮丧的是

**，在ios系统中WKWebview并没有提供 cookie 同步的接口，而开发者通常只能通过注入 javascript 的方式间接实现，但是，这种做法有个缺点，就是无法同步 httpOnly 属性的 cookie , 那是因为 javascript 无法操作具有httpOnly属性的cookie ( 这主要是因为现代浏览器为了防止xss攻击成功后确保用户cookie不会被恶意脚本窃取而添加的特性 )。**

### 接口安全

           为了网络传输数据安全，https协议已经越来越普及，但是，浏览器/webview 对于https请求，默认的证书校验策略是：先查看本地证书信任列表，

**如果本地信任列表中没有当前访问站点的证书，则会去检验CA链。**

这也就意味着，如果攻击者通过伪造的证书开一个代理服务器，

**然后在自己的手机中手动添加这个伪造证书至本地证书信任列表， 然后攻击者将手机代理指向其代理服务器，这么一来， webview在请求接口时，数据将会完全暴漏在攻击者面前。而目前防止代理攻击的主要方式就是在端上进行证书校验，这可以保证Native发起的请求数据是安全的，**

但是h5通过webview发起的请求仍将会暴漏，如果你的APP是一个金融理财类的应用，这将非常危险。

### 访问控制

           由于浏览器的

同源策略

，如果h5请求需要

跨域

，是一件比较麻烦的事。现在的主流的跨域方案，无论是jsonp，还是通过设置

CORS

（Cross Origin Resource Sharing）相关的请求头，都需要服务端支持。然而很多时候我们需要能在端上指定哪些域可以访问，哪些域不能访问，如果请求在webview中发起，端上根本无法干涉。

### 性能

           不同webview，底层对网络请求处理策略往往会有不同，有的是采用一个线程池，有的是每次请求都会创建一个新的线程，这就导致在有些系统上原生webview的请求会相对较慢。

### 缓存

            现在有些混合app为了实现

**页面秒开**

，都采用一些缓存自管理的方案，常见的就是将

**线上新版本的h5页面提前打包**

，然后在没次APP启动后检测更新、下载。

**然后拦截 webview 的所有请求**

，

**对于静态资源，直接从下载好的文件中读取，而动态数据则通过ajax去后台动态拉去**

，如果只是这样，那倒没什么问题，但是，有时有些静态资源也是需要通过ajax去拉取，比如，一个配置 json， 又或是一个 md格式的帮助文档。

**如果不能拦截ajax请求，也就意味着这些静态资源还是要通过网络去服务端拉取。**

## 请求重定向

            在浏览器中，Ajax请求都是浏览器发出的，而 Fly 可以通过更换 http engine的方式，将请求重定向到。典型的场景就是在混合 App中，将所有的请求转发到 Native，然后在Native上进行统一的请求管理、cookie管理、证书校验、请求过滤等，还有重要的一点就是

端上并没有同源限制，也可以在端上做访问控制

。而 Fly 最重要的一个功能就是支持请求重定向。

在了解请求重定向之前，你需要先了解一些 “http engine”。

# Http Engine

## 切换engine

var  fly=require("flyio")
//浏览器环境下
fly.engine=XMLHttpRequest
//node环境
fly.engine=xx  //任何实现了engine接口的对象

上面代码示意了 fly 如何切换 engine，那么如何来提供自定义的engine?

      本质上来讲，engine 就是一个和

XMLHttpRequest

 有相同接口、属性、行为的对象。显然，如果要自己纯手工实现一个 engine会很复杂，因为这必须得了解 

XMLHttpRequest

 的各个细节！

          为了简化 engine 的实现，Fly 提供了一个 engine-wrapper 模块，它是一个 engine 的骨架，开发者只需要实现一个适配器（adapter）便可方便的自动生成一个 engine。

下面我们看看Fly内置的 node engine 是如何使用 engine-wrapper 来实现的：

var Fly = require("../../dist/npm/fly")
var EngineWrapper = require("../../dist/npm/engine-wrapper")
//引入fly实现的node adaptervar adapter = require("./adapter/node")
//通过包装node adapter生成一个enginevar engine=EngineWrapper(adapter)
module.exports=new Fly(engine)

可以看出，

EngineWrapper

可以通过一个 adapter直接生成一个engine, 那么现在的工作就转化为如何实现一个adapter了，后面我们会详细介绍，现在我们看一下engine唯一的 API:

engine.setAdapter (adpter)

每个 engine 都可以随时切换adpter，这可以实现和切换 http engine相同的目的。

## Adapter

通过上面的例子可以看出，真正的 http请求动作是在 adapter 中完成的。而adapter是一个标准的接口，签名如下：

function (request, responseCallBack)

request

http请求信息，由engine-wrapper 传给adapter，

基本结构字段

如下：

{
  method:"",//请求方法， GET 、POST ...
  headers:{},//请求头
  url:"",//请求地址
  timeout:"",//超时时间
  body  //请求数据，GET请求时为null,类型不定，可能是FromData、字符串。
}

responseCallBack(response)

响应回调，请求结束时adapter应调用此函数，通知engine-wrapper请求结束, response 

基本结构字段

如下：

{

    responseText: '{"aa":5}',//响应内容，为字符串

    statusCode: 200,// http 状态码，发生异常时，值为0

    errMsg:"", //错误信息，

    headers: {}//响应头

}&#x20;

整个请求过程为：每次请求开始的时候

**，fly 将用户本次的请求信息传给 http engine，**

然后 http engine 根据用户请求信息

**生成一个 request 对象传递给 adapter**

， 接着

\*\* adapter 发起真正的 http 请求，等到请求结束时，adapter 通过调用 \*\*​

**responseCallBack 将请求结果回传给 http engine. 然后 http engine 将结果返回给fly**

。

**基本结构字段**

：

    所谓基本结构字段就是指fly定义的标准字段。除了这些基本结构字段，

**也可以任意扩展自定义字段。**

     对于 request对象， 用户在发起的请求配置 options 中的其它字段也会 merge 到 request 对象中，这样就可以在adapter 中获取到，这在自定义 adapter时非常有用。

    对于 response 对象，可

**以在 adapter 中给其添加任何自定义字段**

，这些自定义字段会通过engine直接传递给fly，所以你可以在 then回调中取出。

### 一个简单的例子

var engine= EngineWrapper(function (request,responseCallback) {

            responseCallback({

                statusCode:200,

                responseText:"你变或者不变，我都不变😜。",

                extraFeild:"自定义字段"

            })

        })

fly.engine=engine;

fly.get("../package.json").then(d=>{

    log(d.data)

    log(d.extraFeild)

})

控制台输出

\> 你变或者不变，我都不变😜。

\> 自定义字段

在这个例子中，adapter 并没有真正发起 http 请求，而是直接返回了固定内容，这样 fly 上层请求任何接口收到的内容永远都是相同的。

## 远程Http Engine

我们说过，在浏览器环境中，fly 使用的默认engine 就是 XMLHttpRequest。现在我们想想混合APP，

\*\* 如果能在 Native 上实现一个engine，然后供浏览器中的 fly 使用\*\*​

，那么也就会将原本应该在

**浏览器中发起的请求重定向到了 Native 上**

。而这个在 Native 上实现的 engine，我们称其为远程 engine，这是因为调用者和执行者并不在同一个环境。在介绍在fly中如何使用远程 engine之前，我们得先来了解一下什么是 

Javascript Bridge

 。

Javascript Bridge 是指web应用中Javascript与Native之间接口互调，数据传输的一个桥梁。现在github中有一些成熟易用的移动端跨平台实现如: 

[dsBridge](https://github.com/wendux/DSBridge-Android "dsBridge")

 、 

[WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge "WebViewJavascriptBridge")

 。

         通过 Javascript bridge，我们可以在 adapter 中将请求信息转发到 Natvie上，然后在 native 上根据请求信息发起真正的网络请求。这样做的好处就是可以在native进行统一的证书验证、cookie管理、访问控制 、缓存策略等等。等到native请求完成后再将请求结果回传给 adapter ， 然后 adapter 再返回给 fly，整个请求流程结束。

         因为不同的 Javascript bridge， 数据传输的协议不同，我们只需为我们使用的 javascript bridge 提供一个 adapter 即可。fly 预置了 DSBridge 的 adapter 。

### DSBridge Adapter

[dsBridge](https://github.com/wendux/DSBridge-Android "dsBridge")

 是一个优秀的跨平台的 Javascript Bridge ，最大的特点是不仅支持

异步调用

，也支持

同步调用

和进度

连续调用

。如果你的 App 使用的是DSBridge， 那么你可以非常方便的使用fly。

var adapter = require("flyio/dist/npm/adapter/dsbridge")

var EngineWrapper = require("flyio/dist/npm/engine-wrapper")

var Fly = require("flyio/dist/npm/fly")

var dsEngine = EngineWrapper(adapter)

var fly = new Fly(engine);

//然后你就可以使用fly发起请求了

fly.get("xxx.com")...

现在在h5中通过fly发起的所有ajax请求都会被重定向到端上。

### Native实现

Fly 将 http 请求重定向到 Native ，Native 是需要完成真正的 http 请求。具体实现由端上根据使用的网络框架自定。Fly官方提供了Android端的实现示例，可供开发者参考，详情请参考 

[Native 实现 Http Engine](https://wendux.github.io/dist/#/doc/flyio/native "Native 实现 Http Engine")

 。

***

后续有机会继续深入；可惜了没有axios的取消请求；各有优劣
