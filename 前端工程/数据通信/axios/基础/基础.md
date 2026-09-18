# &#x20;基础

## 目录

- [响应超时](#响应超时)
- [axios功能特点](#axios功能特点)
- [安装 axios](#安装-axios)
- [axios 基本使用](#axios-基本使用)
- [axios 发送并发请求](#axios-发送并发请求)
- [axios.spread](#axiosspread)
- [axios配置信息](#axios配置信息)
  - [全局配置](#全局配置)
- [axios 的实例](#axios-的实例)
- [封装一个网络请求模块](#封装一个网络请求模块)
- [axios拦截器的使用](#axios拦截器的使用)
- [axios 和 resource 对比](#axios-和-resource-对比)

```javascript 
 axios 配置  不同同步请求 
 const service = axios.create({ 
   baseURL: process.env.VUE_APP_BASE_API, 
   headers: { 
     'Content-Type': 'application/x-www-form-urlencoded', 
     'X-Requested-With': 'XMLHttpRequest' 
   }, 
   params: { locale: 'zh_CN' }, 
   // timeout: 10 * 1000, 
   withCredentials: true 
 }) 
 // axios请求拦截器 
 service.interceptors.request.use( 
   config => { 
     if (store.getters.token) { 
       config.headers['authToken'] = getToken() 
     } 
     return config 
   }, 
   error => { 
     return Promise.reject(error) 
   } 
 )
```


**或者(更好推荐)**

```javascript 
 import axios from 'axios'; 
 import qs from 'qs'; 
 // 或者备用： var headers = {"Content-Type":"application/json; charset=utf-8" } 
 axios.defaults.withCredentials = true; 
 axios.defaults.headers.post['Content-Type'] = 'application/x-www-fotm-urlencoded' 
 axios.defaults.headers['x-requested-with'] = 'XMLHttpRequest'  如果不加这个 后端无法识别请求为Ajax请求,jquery默认自带. 
 const service = axios.create({  
     timeout:15000 
 }) 
 service.interceptors.request.use( 
     config => { 
         return config; 
     }, 
     err => { 
         return Promise.reject(err) 
     } 
 ) 
 service.interceptors.response.use( 
     response => { 
         return response 
     }, 
     err => { // 不为200 都是err 
         return Promise.reject(err) 
     } 
 ) 
 // 封装axios的 fetch 
 export function fetch(url,options) { 
     let opt = options || {} 
     let data = Object.assign({}, opt.data) 
     if (opt.type == 'get') { 
         opt.params?opt.params._t = Date.parse(new Date()):opt.params = {_t: Date.parse(new Date())} 
     } 
     return new Promise((resolve, reject) => { 
         service({ 
             method: opt.type || 'post', 
             url: url, 
             params: Object.assign({}, opt.params), 
             data: (opt.headers ? data : qs.stringify(data)) || {}, 
             responseType: opt.dataType || 'json', 
             headers:opt.headers || {'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'} 
         }).then(res =>{ 
             resolve(res) 
         }).catch(error => { 
             reject(error) 
         }) 
     ) 
 }
```


# 响应超时

[ Vue 结合 Axios 接口超时统一处理 - 会写代码的赖先生 - 博客园 引语：当网路慢的时候。又或者公司服务器不在内地的时候，接口数据请求不回来超时报错的情况相信大家肯定遇到过的，这里我把我公司项目请求超时的处理方法分享下，希望看过后有帮助。 axios基本用法就不多说了 https://www.cnblogs.com/ljx20180807/p/9921347.html](https://www.cnblogs.com/ljx20180807/p/9921347.html " Vue 结合 Axios 接口超时统一处理 - 会写代码的赖先生 - 博客园 引语：当网路慢的时候。又或者公司服务器不在内地的时候，接口数据请求不回来超时报错的情况相信大家肯定遇到过的，这里我把我公司项目请求超时的处理方法分享下，希望看过后有帮助。 axios基本用法就不多说了 https://www.cnblogs.com/ljx20180807/p/9921347.html")

# axios功能特点

- 在浏览器中发送XMLHttpRequest请求
- 在node.js中发送http请求
- 支持Promise API
- 拦截请求和响应
- 转换请求和响应数据

# 安装 axios

```vue 
 npm install axios --save
```


# axios 基本使用

```vue 
 import axios from 'axios';
axios({ 
    url: 'http://127.0.0.1:8080/home/multidata',
    method: 'get' // 不指定method时： 默认get请求
}).then(res => {
    console.log(res);
})
```


# axios 发送并发请求

```vue 
 axios.all([
    axios({
        url: 'url1',
        params: {
            请求参数1: '参数1',
            请求参数2: '参数2'
        }
    }),
    axios({ 
        url: 'url2',
        params: {
            请求参数1: '参数1'
        }
    })
]).then(results => {
    console.log(results);
})
/**
发送并发请求，例如这里的两个，
返回的数据results是一个数组
results[0] === url1 的返回数据
results[1] === url2 的返回数据
*/
```


# axios.spread

```vue 
 axios.all([
    axios({
        url: 'url1',
        params: {
            请求参数1: '参数1',
            请求参数2: '参数2'
        }
    }),
    axios({ 
        url: 'url2',
        params: {
            请求参数1: '参数1'
        }
    }]
).then(axios.spread((res1,res2) =>{
    console.log(res1) 
    console.log(res2);
}))
```


# axios配置信息

## 全局配置

- 实际上，开发中可能很多参数都是固定的，比如 url前缀
- 这时候可以进行一些抽取，可以利用axios的全局配置

axios.defaults.baseURL = '<http://127.0.0.0:8080>' //设置公共url

axios.defaults.timeout = 5000 //设置请求超时时间，单位毫秒

- 常见配置选项
  - 请求地址
    - url: '/user'
  - 请求类型
    - method: 'get'
  - 请求根路径
    - baseURL: <http://127.0.0.0:8080>'
  - 请求前数据处理
    - transformRequest: \[function(data){}]
  - 请求后数据处理
    - transfromResponse: \[function(data){}]
  - 自定义请求头
    - headers: {'x-Requested-With':'XMLHttpRequest'}
  - URL查询对象
    - parms: {id: 12}
  - 查询对象序列化函数
    - paramsSerializer: function(params){}
  - request body
    - data: {key: 'value'}
  - 超时设置(单位毫秒)
    - timeout: 1000
  - 跨域是否携带Token
    - wihtCredemtials: false
  - 自定义请求处理
    - adapter: function(resolve, reject, config)()
  - 身份验证信息
    - auth: {uname: 'uname', pwd: '123'}
  - 响应的数据格式 json/blob/document/arraybuffer/text/stream
    - responseType: 'json'

# axios 的实例

- 当从axios模块中导入对象时，使用的实例就是默认的实例
- 当给该实例设置一些默认配置时，这些配置就被固定下来了
- 但是后续开发中，某些配置可能会不太一样
- 比如某些请求需要使用特定的 baseURL或者timeout等
- 这个时候，就可以创建新的实例，并且传入属于该实例的配置信息

```vue 
 //使用axios.create创建实例
const instance1 = axios.create({
    baseURL: 'http://127.0.0.0:8080', //传入公共接口地址
    timeout: 5000 //设置此实例得超时时间
})
//使用实例
instance1({ 
    url: '/home/multidata'
}).then(res =>{
    console.log(res);
});
instance1({ 
    url: '/home/data',
    params: { //传入请求参数，params是针对于get请求得 type: 'pop',
        page: 1
    }
}).then(res => {
    console.log(res);
})
//如果有其他请求需要用到其他的配置，这时候就可以使用axios.create创建其他实例
```


# 封装一个网络请求模块

```vue 
 /**
* /src/network/request.js
    config:
    这个模块只负责网络请求，对于数据处理交给调用该模块的组件传入的回调函数处理
*/
/**
* /src/network/request.js
*/
import axios from 'axios';
// 封装方式1
// export function request(config) {
// return new Promise(((resolve, reject) => {
//
// //1.创建axios实例
// const instance = axios.create({
//    baseURL: 'http://152.136.185.210:8000',
//    timeout: 5000
// });
//
// //发送网络请求
// instance(config)
// .then(res => {
//     resolve(res);
// })
// .catch(err => {
//     reject(err);
// })
// }))
// }
//封装方式2
export function request(config) {
//1. 创建axios实例
const instance = axios.create({
  baseURL: 'http://127.0.0.0:8080',
  timeout: 5000
})
// 发送网络请求
return instance(config); //他本身的返回值就是一个promise
//所以直接返回它
}
<template>
  <div id="app">
      <p>{{results}}</p>
  </div>
</template>
<script>
import {request} from './network/request'
export default {
  name: 'App',
  data(){
    return {
      results: ''
    }
},
created() {
//上面两种封装方式不影响这个地方的使用
    request({
        url: '/home/multidata'
    }).then(res =>{
        this.results = res;
    }).catch(err =>{
        console.log(err);
    })
}
}
</script>
```


# axios拦截器的使用

1. 全局拦截

axios.interceptors.request.use()

1. 拦截当前实例

instance.interceptors.request.use

- 拦截器的作用
  - 比如config中的一些信息不符合服务器要求
  - 比如每次发送网络请求，都希望在界面中显示一个请求的图标
  - 某些网络请求必须携带一些特殊信息，比如登陆 token
- 请求拦截 instance.interceptors.request.use

```vue 
 export function request(config) {
//1. 创建axios实例
const instance = axios.create({
  baseURL: 'http://152.136.185.210:8000',
  timeout: 5000
}) 
//请求拦截 
instance.interceptors.request.use(config => {
//console.log(config);
//必须返回config
  return config;
}, 
err => { 
//console.log(err);
}) 
//响应拦截
instance.interceptors.response.use(res => { console.log(res);
  return res.data;
}, 
err => { 
  console.log(err);
})
// 3. 发送网络请求
  return instance(config);
}
```


**上述内容只适合上手；封装还得看其他内容**

# axios 和 resource 对比

```vue 
 resource:需要在服务器环境下使用

              url:'http://localhost:80/php5/post.php',
                headers:{  'Content-Type':'application/x-www-form-urlencoded' },
               method:'post',
                emulateJSON:true,
               body:{a:11,b:22}
1.get方式

    this.$http({
        url:'http://localhost:80/php5/get.php',
        params:{a:11,b:22}
    }).then(
        res=>this.d=res.body
    )

2 .post
    let params = new URLSearchParams();
    params.append(key,value) key=value=string
    params.append("a","11");
    params.append("b","15");
    this.$http({
              url:'http://localhost:80/php5/post.php',
headers:{  'Content-Type':'application/x-www-form-urlencoded' },
               method:'post',
              body:params
    }).then(
            res=>this.d=res.body
    )

或者 不用 urlsearchparams
    this.$http({
               body:"a=11&b=22"
    }).then(
    res=>this.d=res.body
    )

3.jsonp
     this.$http.jsonp(
            'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
            {
              params:{
                wd:'labula'
              },
              jsonp:'cb'
            }
          ).then(
            res=>this.list=res.body.s
          )


axios并没有jsonp

import axios from 'axios';
Vue.prototype.$http = axios   把axios绑在vue的原型上
axios.defaults.withCredentials=true   //解决所有axios的携带凭证

1.post
axios({
        url:'http://localhost/1809-12-11/php/post.php',
        data:{a:-2,b:3},
        method:"POST",
    }).then((res)=>{
        console.log(res)
    })

2.get
    axios({
        url:'http://localhost/1809-12-11/php/get.php',
        params:{a:-23,b:3},
    }).then((res)=>{
        console.log(res)
    })

3.put 
    axios({
        url:'http://localhost/1809-12-11/php/post.php',
        data:{a:-2,b:3},
        method:"put",
    }).then((res)=>{
        console.log(res)
    })
```
