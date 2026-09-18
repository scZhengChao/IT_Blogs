# **异常捕获**

## 目录

- [注意](#注意)
- [iframe](#iframe)
  - [跨域：](#跨域)
  - [同域](#同域)
- [总结](#总结)
  - [方式一： window.onerror = handleOnError](#方式一-windowonerror--handleOnError)
  - [方式二:  window.addEventListener](#方式二--windowaddEventListener)
  - [捕获到未处理的Promise错误](#捕获到未处理的Promise错误)

**异常捕获（图片，静态资源，script，link js同步代码；iframe）**

```javascript 
window.onerror = function(message, source, lineno, colno, error) { ... }
//  message：错误信息（字符串）。可用于HTML onerror=""处理程序中的event。
//  source：发生错误的脚本URL（字符串）
//  lineno：发生错误的行号（数字）
//  colno：发生错误的列号（数字）
//  error：Error对象（对象）
若该函数返回true，则阻止执行默认事件处理函数。

```


# 注意

- `window.addEventListener('error', function(event) { ... }，true)`   该事件必须得在**捕获阶段进行**；因为他不会冒泡；且捕获阶段优先于冒泡阶段；一定要加true
  `ErrorEvent `类型的event包含**有关事件和错误的所有信息。**

# iframe

另外iframe的错暂时监听不到：有两种情况： &#x20;

- 首先你的onerror 函数 必须放在报错之前监听：之后监听 是捕获不到的

### 跨域：

更加的监听不到； 且你操作跨域页面的window时还会提示你没有权限的错误
但是iframe和script标签还有img等标签有相似的地方；也有不一样的地方； 归根结底他也只是一个特殊一点的get请求；逃过了跨域
所以监听 xhr 请求是拿不到的；得进一步研究

### 同域

&#x20;parent页面 监听(onerror)不到 iframe 里的错(不管是src的错；还是iframe页面里报的错)
&#x20;   你想拿到 iframe的window进行监控 ；你想多了；一上来是拿不到的；只有onload时能拿到；但是当parent页面onload时；iframe早就onload了；**所以监听不到同步错误；也监听不到文件图片加载错误； 但是能加载到 异步错误**

但是以上安全策略：这是浏览器的同源策略，当加载自不同域（协议、域名、端口三者任一不同）的脚本中发生语法(?)错误时，为避免信息泄露，语法错误的细节将不会报告，而代之简单的"`Script error.`"。（还是捕获到了，只是没有原因）
解决安全策略：

- 我们给b.js加上Access-Control-Allow-Origin:\*的response header
- 我们继续给b.js加上crossorigin属性，发现可以了，想要的信息都收集到了

```javascript 
<script type="text/javascript" src="http://a.com/a.js" ></script>
<script type="text/javascript" src="http://b.com/b.js"  crossorigin></script>
```


Access-Control-Allow-Origin是HTML5中定义的一种解决资源跨域的策略。他是通过**服务器端返回带有Access-Control-Allow-Origin标识的Response header，用来解决资源的跨域权限问题。**
使用方法，在response添加 Access-Control-Allow-Origin，例如

```javascript 
Access-Control-Allow-Origin:www.google.com  //www.google.com是访问的域名，根据实际情况设置。

Access-Control-Allow-Origin: *   //也可以设置为 * 表示该资源谁都可以用

```


如果**资源是html页面**，可以设置 `<meta http-equiv="Access-Control-Allow-Origin" content="*">`

# 总结

对于前端的异常捕获，我们都会知道`onerror`事件(当然还有`try，catch`)，但针对`window`的`error`事件的用法，其实是有区别的。

### 方式一： window\.onerror = handleOnError

1\. 能捕**获到js执行错误，**不能捕获带有src的标签元素的加载错误。
2\. 参数对应5个值（错误信息，所在文件，行，列，错误信息）
3\. 函数体内用`return true`可以**不让异常信息输出到控制台**

### 方式二:  window\.addEventListener

1\. 为捕获状态时（第三个参数为true）**能捕获到js执行错误，也能捕获带有src的标签元素的加载错误**。
&#x20; 为冒泡状态时（第三个参数为false）能捕获到js执行错误，**不能捕获带有src的标签元素**的加载错误。
2\. 参数对**应1个值，异常事**件，错误信息都在里面
3\. 函数体内用`preventDefault`可以不让异常信息输出到控制台

注：如果`script`的`src`是**非同源的跨域**引用则需要在标签上加`crossorigin`参数，并且配置一下服务器，设置静态资源`Javascript`的`Response`为`Access-Control-Allow-Origin'才可以`

### 捕获到未处理的Promise错误

监听`unhandledrejection`事件，即可捕获到未处理的`Promise`错误；reason: Promise的reject值

```javascript 
window.addEventListener('unhandledrejection', event => ···);
```


当一个Promise错误最初未被处理，但**是稍后又得到了处理**，则会触发 `rejectionhandled` 事件： 注意：他会先触发 `unhandledrejection `

```javascript 
window.addEventListener('rejectionhandled', event => ···);
```
