# fly

## 目录

- [简介](#简介)
- [定位与目标](#定位与目标)
  - [浏览器支持](#浏览器支持)
  - [其它支持的平台](#其它支持的平台)
- [安装](#安装)
- [请求](#请求)
  - [GET](#GET)
  - [POST](#POST)
  - [并发](#并发)
  - [直接通过 request 接口发起请求](#直接通过request接口发起请求)
  - [发送URLSearchParams](#发送URLSearchParams)
  - [发送 FormData](#发送FormData)
  - [请求二进制数据](#请求二进制数据)
- [拦截器](#拦截器)
  - [在拦截器中执行异步任务](#在拦截器中执行异步任务)
  - [实例：](#实例)
  - [拦截器锁定API](#拦截器锁定API)
    - [别名](#别名)
    - [this指向](#this指向)
- [请求配置选项](#请求配置选项)
- [实例级配置](#实例级配置)
- [单次请求配置](#单次请求配置)
- [体积](#体积)

> **JS HTTP请求终极解决方案 - fly.js**

官网文档 :     作者也是一个很6666的人； 比axios 更简洁高级；更多高级用法见官网

[https://wendux.github.io/dist/#/doc/flyio/readme](https://wendux.github.io/dist/#/doc/flyio/readme "https://wendux.github.io/dist/#/doc/flyio/readme")

Fly.js 是一个功能强大的轻量级的javascript http请求库，同时支持浏览器和node环境，通过适配器，它可以运行在任何具有网络能力的javascript运行环境；同时fly.js有一些高级的玩法如全局ajax拦截、在web app中支持请求重定向等，耐心看下去，它会给你足够的惊喜。

## 简介

Fly.js 是一个基于 promise 的，轻量且强大的 Javascript http 网络库，它有如下特点：

1. 提供统一的 Promise API。
2. 支持浏览器环境，**轻量且非常轻量** 。
3. 支持 Node 环境。
4. 支持请求／响应拦截器。
5. 自动转换 JSON 数据。
6. **支持切换底层 Http Engine，可轻松适配各种运行环境**。
7. **浏览器端支持全局Ajax拦截 。**
8. **H5页面内嵌到原生 APP 中时，支持将 http 请求转发到 Native。支持直接请求图片**。
9. **高度可定制、可拆卸、可拼装**

## 定位与目标

\*\*        Fly 的定位是成为 Javascript http请求的终极解决方案。也就是说，在任何能够执行 Javascript 的环境，只要具有访问网络的能力，Fly都能运行在其上，提供统一的API。\*\* ​

### 浏览器支持

|   |
| - |

| ✔ | ✔ | ✔ | ✔ | ✔ | > 8 |
| - | - | - | - | - | --- |

### 其它支持的平台

目前Fly.js支持的平台包括：

[Node.js](https://nodejs.org/ "Node.js")

 、

[微信小程序](https://mp.weixin.qq.com/cgi-bin/wx "微信小程序")

 、

[Weex](http://weex.apache.org/ "Weex")

 、

[React Native](http://facebook.github.io/react-native/ "React Native")

 、

[Quick App](https://www.quickapp.cn/ "Quick App")

 和浏览器，这些平台的 JavaScript 运行时都是不同的。更多的平台正在持续添加中，请保持关注。

## 安装

npm install flyio         ----npm

\<script src="[https://unpkg.com/flyio/dist/fly.min.js">\</script>  ](https://unpkg.com/flyio/dist/fly.min.js"></script>  ) ---cnd

[https://unpkg.com/flyio/dist/umd/fly.umd.min.js](https://unpkg.com/flyio/dist/umd/fly.umd.min.js "https://unpkg.com/flyio/dist/umd/fly.umd.min.js")

              ---UMD

## 请求

### GET

query参数通过对象传递
fly.get('/user', {
      id: 133
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

### POST

fly.post('/user', {
    name: 'Doris',
    age: 24
    phone:"18513222525"
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

### 并发

发起多个并发请求，参数是一个promise 数组；当所有请求都成功后才会调用

then

，只要有一个失败，就会调

catch

。

function getUserRecords() {
  return fly.get('/user/133/records');}

function getUserProjects() {
  return fly.get('/user/133/projects');}

fly.all(\[getUserRecords(), getUserProjects()])
  .then(fly.spread(function (records, projects) {
    //两个请求都完成
  }))
  .catch(function(error){
    console.log(error)
  })

### 直接通过 request 接口发起请求

//直接调用request函数发起post请求
fly.request("/test",{hh:5},{
    method:"post",
    timeout:5000 //超时设置为5s
&#x20;}).then(d=>{ console.log("request result:",d)}).catch((e) => console.log("error", e))

### 发送URLSearchParams

const params = new URLSearchParams();
params.append('a', 1);
fly.post("",params).then(d=>{ console.log("request result:",d)})

注：Node环境不存在URLSearchParams。各个浏览器对URLSearchParams的支持程度也不同，使用时务必注意

### 发送 FormData

&#x20;var formData = new FormData();
&#x20;var log=console.log
&#x20;formData.append('username', 'Chris');
&#x20;fly.post("../package.json",formData).then(log).catch(log)

### 请求二进制数据

fly.get("/Fly/v.png",null,{
    responseType:"arraybuffer"}).then(d=>{
  //d.data 为ArrayBuffer实例})

## 拦截器

Fly支持请求／响应拦截器，可以通过它在请求发起之前和收到响应数据之后做一些预处理。

// 添加请求拦截器
fly.interceptors.request.use((request) => {
    // 在发送请求之前做些什么
    let token = uni.getStorageSync('aliToken')
    if (token) {
        request.headers\['token'] = token
    }
    return request
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
fly.interceptors.response.use((res) => {
    // 对响应数据做些事
    // if (!res.data) {
    // return Promise.reject(res)
    // }
    return res
}, (error) => {
    return Promise.reject(error)
})

如果你想移除拦截器，只需要将拦截器设为null即可：

fly.interceptors.request.use(null)

fly.interceptors.response.use(null,null)

### 在拦截器中执行异步任务

如果您想在拦截器里发起一个异步任务，然后等该异步任务结束后才继续往下执行，那么，您可以返回一个promise，但是请注意，fly会根据该promise的最终值判断是否应该继续完成之前网络请求，规则如下：

1. 如果promise的最终值是fly传给您拦截器的request对象， 那么fly会继续完成之前的请求，如：

*//添加请求拦截器*

fly.interceptors.request.use((request)=>{

*//将request作为promise的最终值*

return Promise.resolve(request)&#x20;

})

  2.如果promise的最终值不是fly传给您拦截器的

request

对象，那么请求将会将promise的最终值作为本次请求的结果（而不会继续完成之前的请求），如：

*//添加请求拦截器*

fly.interceptors.request.use((request)=>{&#x20;

*//当promise的最终值不是\`request\`时，*

*//fly会将其作为本次网络请求的结果(而不会继续执行网络请求).*

return Promise.resolve("xx")&#x20;

})&#x20;

fly.get("/test").then(d=>{&#x20;

console.log(d)&#x20;

*//输出xx*

})

要在拦截中通过异步一些异步数据来决定是否应该继续完成本次请求的关键就在于promise返回的最终值是不是 

request

对象， 如果是，fly会使用该

request

 对象继续完成网络请求，您可以在拦截器中修改

request

的属性。

### **实例：**

在请求拦截器中执行异步任务

下面我们看一个例子：由于安全原因，我们需要所有的请求都需要在header中设置一个

csrfToken

，如果

csrfToken

不存在时，我们需要先请求一个

csrfToken

，然后再发起网络请求，由于请求

csrfToken

是异步的，所以我们需要在拦截器中执行异步请求，代码如下：

var csrfToken="";
var tokenFly=new Fly();
var fly=new Fly();
fly.interceptors.request.use(function (request) {
  log(\`发起请求：path:\${request.url}，baseURL:\${request.baseURL}\`)
  if (!csrfToken) {
    log("没有token，先请求token...");
    //锁定当天实例，后续请求会在拦截器外排队，详情见后面文档
    fly.lock();
    return newFly.get("/token").then((d) => {
      request.headers\["csrfToken"] = csrfToken = d.data.data.token;
      log("token请求成功，值为: " + d.data.data.token);
      log(\`继续完成请求：path:\${request.url}，baseURL:\${request.baseURL}\`)
      return request; //只有最终返回request对象时，原来的请求才会继续
    }).finally(()=>{
      fly.unlock();//解锁后，会继续发起请求队列中的任务，详情见后面文档
    })
  } else {
    request.headers\["csrfToken"] = csrfToken;
  }
})

### 拦截器锁定API

请求拦截器和响应拦截器都提供了锁定自身的API， 拦截器锁定后，未进入到该拦截器的请求将在拦截器外面排队，暂停网络请求，直到拦截器解锁时，排队的请求才再次进入拦截器继续请求。请求拦截器和响应拦截器都提供了如下两个API:

lock()

锁定当前拦截器是。

unlock

解锁当前拦截器。

具体的用法见后面示例部分

#### 别名

由于请求拦截器锁定时，后续的请求都会入队，这也相当于锁定了当前fly实例，所以fly提供了两个别名函数：

fly.lock=fly.interceptors.request.lock&#x20;

fly.unlock=fly.interceptors.request.unlock

#### this指向

Fly在调用您提供的拦截器处理函数时，会将this指向为当前拦截器对象，所以你在不同的拦截器中通过this调用加/解锁API是一种简洁的做法，但是请注意，在定义拦截器函数时不要使用箭头函数，这回导致this指向错误。

如：

fly.interceptors.request.use(function(request){
   this.lock() //相当于调用fly.interceptors.request.lock()或fly.lock()
})

如果您使用的是箭头函数，则不能使用this:

fly.interceptors.request.use((request)=>{
   fly.interceptors.request.lock() //或调用fly.lock()
})

## 请求配置选项

可配置选项：

{
  headers:{}, //http请求头，
  baseURL:"", //请求基地址
  timeout:0,//超时时间，为0时则无超时限制
  withCredentials:false //跨域时是否发送cookie

}

## 实例级配置

实例级配置可用于

**当前Fly实例发起的所有请求**

//定义公共headers
fly.config.headers={xx:5,bb:6,dd:7}//设置超时
fly.config.timeout=10000;//设置请求基地址
fly.config.baseURL="<https://wendux.github.io/>"

## 单次请求配置

需要对单次请求配置时，需使用

request

方法，配置只对当次请求有效。

fly.request("/test",{hh:5},{
    method:"post",
    timeout:5000 //超时设置为5s

})

注：若单次配置和实例配置冲突，则会优先使用单次请求配置

## 体积

         在浏览器环境下，一个库的大小是非常重要的。这方面 Fly 做的很好，它在保持强大的功能的同时，将自己的身材控制到了最好。min 只有 4.6K 左右，GZIP 压缩后不到 2K，体积是 axios 的四分之一。
