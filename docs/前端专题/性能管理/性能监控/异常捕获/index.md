# 异常捕获

## 目录

- [异常捕获分类](#异常捕获分类)
- [try...catch](#trycatch)
- [onerror](#onerror)
- [addEventListener('error')](#addEventListenererror)
- [promise错误](#promise错误)
- [崩溃和卡顿](#崩溃和卡顿)
- [监听不到的情况](#监听不到的情况)
  - [iframe](#iframe)
    - [解决办法](#解决办法)
- [总结](#总结)

[前端开发不得不知道的异常捕获技巧  https://mp.weixin.qq.com/s?\_\_biz=Mzg5ODA5NTM1Mw==\&mid=2247491153\&idx=1\&sn=a1b74c56ac66d6828bd2cc45c62c0d88\&chksm=c0669fc7f71116d19ac3f04a6e81e07f087745310fcbcef5b266b49e7b5abac21b92e62aaf03\&mpshare=1\&scene=1\&srcid=1208vijDwhRXbJSEeOkzl6QU\&sharer\_sharetime=1607385878426\&sharer\_shareid=c581942ba12fd83f754283490bd7311e\&key=e66ff9015e6b37adf7331ef754c32e1be567ee2df6adf9f41507ecf3864292a502da0021212895d2bd261a6474781da632768eddd7132e07586851cf18f69c0af1303433e74715833b5c40240db7e07462c57962a7eb888f02cf1c5dd051f5adce9d2d778c9729ce4baa62733a47c8cfcca0d46493e6bd225c8b3d205f256eb8\&ascene=1\&uin=MjQ0ODM4OTYwNg%3D%3D\&devicetype=Windows+10+x64\&version=6300002f\&lang=zh\_CN\&exportkey=A6jj4ATRs7b%2Bc%2BegHNJ3oGk%3D\&pass\_ticket=aEkIcvTp05dn9s4%2FgqXNp6gUXVz5cyRk3hHYgG7RNnoNgbASUF15hKsqHAF7teZH\&wx\_header=0](https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==\&mid=2247491153\&idx=1\&sn=a1b74c56ac66d6828bd2cc45c62c0d88\&chksm=c0669fc7f71116d19ac3f04a6e81e07f087745310fcbcef5b266b49e7b5abac21b92e62aaf03\&mpshare=1\&scene=1\&srcid=1208vijDwhRXbJSEeOkzl6QU\&sharer_sharetime=1607385878426\&sharer_shareid=c581942ba12fd83f754283490bd7311e\&key=e66ff9015e6b37adf7331ef754c32e1be567ee2df6adf9f41507ecf3864292a502da0021212895d2bd261a6474781da632768eddd7132e07586851cf18f69c0af1303433e74715833b5c40240db7e07462c57962a7eb888f02cf1c5dd051f5adce9d2d778c9729ce4baa62733a47c8cfcca0d46493e6bd225c8b3d205f256eb8\&ascene=1\&uin=MjQ0ODM4OTYwNg%3D%3D\&devicetype=Windows+10+x64\&version=6300002f\&lang=zh_CN\&exportkey=A6jj4ATRs7b%2Bc%2BegHNJ3oGk%3D\&pass_ticket=aEkIcvTp05dn9s4%2FgqXNp6gUXVz5cyRk3hHYgG7RNnoNgbASUF15hKsqHAF7teZH\&wx_header=0 "前端开发不得不知道的异常捕获技巧  https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==\&mid=2247491153\&idx=1\&sn=a1b74c56ac66d6828bd2cc45c62c0d88\&chksm=c0669fc7f71116d19ac3f04a6e81e07f087745310fcbcef5b266b49e7b5abac21b92e62aaf03\&mpshare=1\&scene=1\&srcid=1208vijDwhRXbJSEeOkzl6QU\&sharer_sharetime=1607385878426\&sharer_shareid=c581942ba12fd83f754283490bd7311e\&key=e66ff9015e6b37adf7331ef754c32e1be567ee2df6adf9f41507ecf3864292a502da0021212895d2bd261a6474781da632768eddd7132e07586851cf18f69c0af1303433e74715833b5c40240db7e07462c57962a7eb888f02cf1c5dd051f5adce9d2d778c9729ce4baa62733a47c8cfcca0d46493e6bd225c8b3d205f256eb8\&ascene=1\&uin=MjQ0ODM4OTYwNg%3D%3D\&devicetype=Windows+10+x64\&version=6300002f\&lang=zh_CN\&exportkey=A6jj4ATRs7b%2Bc%2BegHNJ3oGk%3D\&pass_ticket=aEkIcvTp05dn9s4%2FgqXNp6gUXVz5cyRk3hHYgG7RNnoNgbASUF15hKsqHAF7teZH\&wx_header=0")

# 异常捕获分类

![  ](./image/2c0dad57e536c4863e679e67f77d6f83_NAnF9hUB08.png "  ")

# try...catch

try...catch只能捕获到**同步的运行时错误**，对于语法和异步错误无能为力，捕获不到。

1. 同步运行时错误
2. 不能捕获语法错误，我们修改一个代码，删掉一个单引号

Uncaught SyntaxError: Invalid or unexpected token语法错误SyntaxError，不管是window\.error还是try...catch都没法捕获异常。但是不用担心，在你写好代码按下保存那一刻，编译器会帮你检查是否有语法错误，如果有错误有会有个很明显的红红的波浪线，把鼠标移上去就能看到报错信息。因此，面对SyntaxError语法错误，一定要小心小心再小心

# onerror

```typescript 
window.onerror = function(message, source, lineno, colno, error) { 
    //... 
}
```


- &#x20;message：错误信息（字符串）。可用于HTML onerror=""处理程序中的event。
- &#x20;source：发生错误的脚本URL（字符串）
- &#x20;lineno：发生错误的行号（数字）
- &#x20;colno：发生错误的列号（数字）
- error：Error对象（对象）

若该函数返回true，则阻止执行默认事件处理函数。

注意：

1. window\.onerror 函数只有在返回 true 的时候，异常才不会向上抛出（浏览器接收后报红），否则即使是知道异常的发生控制台还是会显示 Uncaught Error: xxxxx
2. window\.onerror 最好写在所有JS脚本的前面，否则有可能捕获不到错误
3. window\.onerror无法捕获语法错误
4. 无法捕获静态资源异常，或者接口异常
5. 可以捕获异步错误
6. 可以捕获到iframe的错误；如果跨域拿不到具体的信息"Script Error"，可以通过**crossorigin解决**

# addEventListener('error')

```typescript 
window.addEventListener('error', function(event) { 
    //... 
}，true)   
```


该事件必须得在捕获阶段进行；因为他不会冒泡；且捕获阶段优先于冒泡阶段；一定要加true

注意：

- 不同浏览器下返回的 error 对象可能不同，需要注意兼容处理。
- 需要注意避免 window\.addEventListener 重复监听。
- 由于网络请求异常不会事件冒泡，因此必须在捕获阶段将其捕捉到才行

Access-Control-Allow-Origin是HTML5中定义的一种解决资源跨域的策略。他是通过**服务器端返回带有Access-Control-Allow-Origin标识的Response header，用来解决资源的跨域权限问题。**

使用方法，在response添加 Access-Control-Allow-Origin，例如

- **Access-Control-Allow-Origin:[www.google.com](http://www.google.com)**

[www.google.com是访问的域名，根据实际情况设置。](http://www.google.com是访问的域名，根据实际情况设置。)

也可以设置为 \* 表示该资源谁都可以用**Access-Control-Allow-Origin: \***如果**资源是html页面**，可以设置 **<meta http-equiv="Access-Control-Allow-Origin" content=" *">**

对于前端的异常捕获，我们都会知道onerror事件(当然还有try，catch)，但针对window的error事件的用法，其实是有区别的。

方式一： window\.onerror = handleOnError

1\. 能捕获到js执行错误，不能捕获带有src的标签元素的加载错误。

2\. 参数对应5个值（错误信息，所在文件，行，列，错误信息）

3\. 函数体内用return true可以不让异常信息输出到控制台

方式二:  window\.addEventListener

1\. 为捕获状态时（第三个参数为true）能捕获到js执行错误，也能捕获带有src的标签元素的加载错误。

  为冒泡状态时（第三个参数为false）能捕获到js执行错误，不能捕获带有src的标签元素的加载错误。

2\. 参数对应1个值，异常事件，错误信息都在里面

3\. 函数体内用preventDefault可以不让异常信息输出到控制台

注：如果script的src是非同源的跨域引用则需要在标签上加crossorigin参数，并且配置一下服务器，设置静态资源Javascript的Response为Access-Control-Allow-Origin'才可以

# promise错误

- **unhandledrejection**

**监听unhandledrejection事件，即可捕获到未处理的Promise错误**

```typescript 
window.addEventListener('unhandledrejection', event => { 
  //···
});
```


reason: Promise的reject值

- **rejectionhandled**

\*\*当一个Promise错误最初未被处理，但是稍后又得到了处理，则会触发 rejectionhandled 事件： 注意：他会先触发 unhandledrejection \*\*​

```typescript 
window.addEventListener('rejectionhandled', event => {
    //···
});
```


# 崩溃和卡顿

         卡顿也就是网页暂时响应比较慢， JS可能无法及时执行。但崩溃就不一样了，网页都崩溃了，JS都不运行了，还有什么办法可以监控网页的崩溃，并将网页崩溃上报呢？

1.利用 window对象的 load和 beforeunload 事件实现了网页崩溃的监控。  不错的文章，推荐阅读：[http://jasonjl.me/blog/2015/06/21/taking-action-on-browser-crashes/](http://jasonjl.me/blog/2015/06/21/taking-action-on-browser-crashes/ "http://jasonjl.me/blog/2015/06/21/taking-action-on-browser-crashes/")。

```typescript 
window.addEventListener('load', function () {
    sessionStorage.setItem('good_exit', 'pending');
    setInterval(function () {
        sessionStorage.setItem('time_before_crash', new Date().toString());
    }, 1000);
});
window.addEventListener('beforeunload', function () {
  sessionStorage.setItem('good_exit', 'true');
});
if(sessionStorage.getItem('good_exit') &&. sessionStorage.getItem('good_exit') !== 'true') {
  /*
      insert crash logging code here
  */
  alert('Hey, welcome back from your crash, looks like you crashed on: ' + sessionStorage.getItem('time_before_crash'));
}
```


2.基于以下原因，我们可以使用 Service Worker 来实现网页崩溃的监控：

1. Service Worker 有自己独立的工作线程，与网页区分开，网页崩溃了，Service Worker一般情况下不会崩溃
2. Service Worker 生命周期一般要比网页还要长，可以用来监控网页的状态
3. 网页可以通过 navigator.serviceWorker.controller.postMessage API 向掌管自己的 SW 发送消息

# 监听不到的情况

## iframe

iframe的错暂时监听不到：

    有两种情况：  首先你的onerror 函数 必须放在报错之前监听：之后监听 是捕获不到的

- 同域：
  - parent页面 监听(onerror)不到 iframe 里的错(不管是src的错；还是iframe页面里报的错)
- 跨域：
  - 更加的监听不到； 且你操作跨域页面的window时还会提示你没有权限的错误

但是iframe和script标签还有img等标签有相似的地方；也有不一样的地方； 归根结底他也只是一个特殊一点的get请求；逃过了跨域

### 解决办法

- 所以监听 xhr 请求
- **但是以上安全策略：**
  - 这是浏览器的同源策略，当加载自不同域（协议、域名、端口三者任一不同）的脚本中发生语法(?)错误时，为避免信息泄露，语法错误的细节将不会报告，**而代之简单的"Script error."。（还是捕获到了，只是没有原因onerror可以捕获到）**
  - 解决安全策略：
  - **我们给b.js加上Access-Control-Allow-Origin:\*的response header**
  - **我们继续给b.js加上crossorigin属性，发现可以了，想要的信息都收集到了**
  - **\<script type="text/javascript" src="<http://a.com/a.js>" >\</script>**
  - **\<script type="text/javascript" src="[http://b.com/b.js"  crossorigin>\</script](http://b.com/b.js"  crossorigin></script)>**

# **总结**

1. 可疑区域增加 try...catch
2. 全局监控JS异常： window\.onerror
3. 全局监控静态资源异常： window\.addEventListener
4. 全局捕获没有 catch的promise 异常：unhandledrejection
5. iframe 异常：window\.error
6. VUE errorHandler 和 
7. React componentDidCatch
8. 监控网页崩溃：window 对象的 load 和 beforeunload
9. Script Error跨域 crossOrigin 解决
