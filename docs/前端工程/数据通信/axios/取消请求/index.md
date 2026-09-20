# 取消请求

## 目录

- [场景](#场景)
- [资料](#资料)
- [取消请求](#取消请求)
  - [第一种：](#第一种)
  - [第二种：](#第二种)
- [重复点击](#重复点击)

# 场景

         在很多地方都会用到取消请求的场景；我第一次尝试是在断点续传是需要暂停上传文件；这个时候需要调用xhr.abort()来取消没有完成的请求；其他地方也会用的到；比如多次点击；比如网速慢导致请求完成的时间差异导致数据混乱；等

# 资料

[使用说明 · Axios 中文说明 · 看云 Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。 https://www.kancloud.cn/yunye/axios/234845](https://www.kancloud.cn/yunye/axios/234845 "使用说明 · Axios 中文说明 · 看云 Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。 https://www.kancloud.cn/yunye/axios/234845")

# 取消请求

使用 *cancel token*取消请求Axios 的 cancel token API 基于[cancelable promises proposal](https://github.com/tc39/proposal-cancelable-promises "cancelable promises proposal")，它还处于第一阶段。

## 第一种：

可以使用 CancelToken.source工厂方法创建 cancel token，像这样：

```javascript 
 var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // 处理错误
  }
});

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');
```


## 第二种：

还可以通过传递一个 executor 函数到 CancelToken的构造函数来创建 cancel token：

```javascript 
 var CancelToken = axios.CancelToken;
var cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// 取消请求
cancel();
```


Note : 可以使用同一个 cancel token 取消多个请求

# 重复点击

        那我们经常开发的时候会遇到一个重复点击的问题，短时间内多次点击同一个按钮发送请求会加重服务器的负担，消耗浏览器的性能，多以绝大多数的时候我们需要做一个取消重复点击的操作 &#x20;

       在vue开发中，这个方法一样完美解决这一问题，通常我们会封装一遍axios，这里我们便可以将此功能封装到拦截器里面去

        其实在fetch.js这个文件也可以自己封装；以url和method为标志存一个存一个全局变量；有就不发送请求；没有就发送请求；发送前先存一个；等返回response 在删除掉

```javascript 
     import axios from 'axios';
    
    axios.defaults.timeout = 5000;
    axios.defaults.baseURL ='';

    let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
    let cancelToken = axios.CancelToken;
    let removePending = (ever) => {
        for(let p in pending){
            if(pending[p].u === ever.url + '&' + ever.method) { //当当前请求在数组中存在时执行函数体
                pending[p].f(); //执行取消操作
                pending.splice(p, 1); //把这条记录从数组中移除
            }
        }
    }
    
    //http request 拦截器
    axios.interceptors.request.use(
    config => {
      config.data = JSON.stringify(config.data);
      config.headers = {
        'Content-Type':'application/x-www-form-urlencoded'
      }
      // ------------------------------------------------------------------------------------
      removePending(config); //在一个ajax发送前执行一下取消操作
      config.cancelToken = new cancelToken((c)=>{
         // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
         pending.push({ u: config.url + '&' + config.method, f: c });  
      });
      // -----------------------------------------------------------------------------------------
      return config;
    },
    error => {
      return Promise.reject(err);
    }
  );
  //http response 拦截器
  axios.interceptors.response.use(
    response => {
      // ------------------------------------------------------------------------------------------
      removePending(res.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
      // -------------------------------------------------------------------------------------------
      if(response.data.errCode ==2){
        router.push({
          path:"/login",
          querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
        })
      }
      return response;
    },
    error => {
      return Promise.reject(error)
    }
  )
```


灵感来源

[axios取消接口请求 自己碰到的问题，扒了很多文档才理清楚，当做是笔记记下来说到取消接口请求，可能没碰到这样的坑冷不丁还有点懵，为什么会有取消请求这回事，既然决定要请求这个接口了又要取消它，岂不是... https://www.jianshu.com/p/22b49e6ad819](https://www.jianshu.com/p/22b49e6ad819 "axios取消接口请求 自己碰到的问题，扒了很多文档才理清楚，当做是笔记记下来说到取消接口请求，可能没碰到这样的坑冷不丁还有点懵，为什么会有取消请求这回事，既然决定要请求这个接口了又要取消它，岂不是... https://www.jianshu.com/p/22b49e6ad819")

         同理：你可以将一个请求标识放进数组；当完成（无论成功还是失败都把这个标识从数组里去除）；下次请求先判断是否有这个标识；如果给出弹框（请勿重复点击）优点：统一管理；代码优雅；方便修改和扩展; &#x20;
