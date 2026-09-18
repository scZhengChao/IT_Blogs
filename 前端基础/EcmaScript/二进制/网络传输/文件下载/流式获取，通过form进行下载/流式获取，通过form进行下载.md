# 流式获取，通过form进行下载

在\*\*不需要`header`****中添加认证的****`POST`****请求中**，也可以采用`form`的方式进行下载（比如使用的是`cookie`认证），他的好处**就是下载的时候不会占用`js`主线程，下载过程中不会导致页面卡顿。\*\*当然`form`也可以直接进行`get`请求的流式下载（理论上讲，能请求浏览器，就能进行get下载，iframe，form都可以），但这就有点多此一举了，get请求可以直接参考方法1进行下载，省时省力。**下面看下如何使用form进行post请求的流式下载。**

```javascript 
const form = document.createElement('form')
form.action = "http://localhost:3000/download"
form.target = "_self"
form.method = "post"
form.style.display = "none"
document.body.appendChild(form)
form.submit()
form.remove()

```


需要注意的是，不管是iframe还是form，进行流式下载的时候，需要服务端在header中添加`'Content-Disposition': 'attachment; filename=customfilename.txt'`**配置进行强制文件下载，否则会被浏览器当做页面直接进行展示**。
