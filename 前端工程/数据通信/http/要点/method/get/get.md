# get

## 目录

- [基础](#基础)
- [下载](#下载)
  - [第一种方式是前端创建超链接](#第一种方式是前端创建超链接)
  - [另一种情况是创建div标签，动态创建a标签：](#另一种情况是创建div标签动态创建a标签)
  - [用window.location.href 调用](#用windowlocationhref-调用)

# 基础

```typescript 
最直观的区别就是GET把参数包含在URL中，POST通过request body传递参数。
1.GET在 浏览器回退时是无害的， 而POST会再次提交请求。
5.GET请求 参数会被完整保留在浏览器历史记录 里，而POST中的参数不会被保留。 //get 会被保存在浏览器记录里,而post不会
2.GET产生的URL地址可以被Bookmark，而POST不可以。//收藏到书签
3.GET请求会被 浏览器主动cache ，而POST不会，除非手动设置  //get会被缓存而post不会
4.GET请求 只能进行url编码 ，而POST支持多种编码方式。 //get只能在url编码,而post不会
6.GET请求在URL中传送的参数是 有长度限制的 ，而POST没有。  //get在url中的有长度限制,而post没有/一般是2k最大64k的,不同服务器也是不一致的
7.对参数的数据类型，GET只 接受ASCII字符 ，而POST没有限制。  //对参数的数据类型，GET只接受ASCII字符，而POST没有限制。
8.GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。 //post更加安全

GET和POST还有一个重大区别，简单的说：( 都是基于tcp协议 )
好了，现在你知道，GET和POST本质上就是TCP链接，并无差别。但是由于HTTP的规定和浏览器/服务器的限制导致的一些区别，

GET产生 一个TCP数据包 ；POST 产生两个TCP数据包。 


```


- 对于GET方式的请求，**浏览器会把http header和data一并发送出去，服务器响应200（** 返回数据）；
- 而对于POST，**浏览器先发送header，服务器响应100** continue，浏览器**再发送data**，服务器响应200 ok（返回数据）。**数据完整性上更加可靠**

> 也就是说，GET只需要汽车跑一趟就把货送到了，而POST得跑两趟，第一趟，先去和服务器打个招呼“嗨，我等下要送一批货来，你们打开门迎接我”，然后再回头把货送过去。

# 下载

#### 第一种方式是前端创建超链接

通过[a标签](https://so.csdn.net/so/search?q=a标签\&spm=1001.2101.3001.7020 "a标签")的链接向后端服务发get请求，接收后端的文件流，非常简单

```typescript 
<a :href='"/user/downloadExcel"' >下载模板</a>

```


#### 另一种情况是创建div标签，动态创建a标签：

```typescript 
<div name="downloadfile" οnclick="downloadExcel()">下载</div>
function downloadExcel() {
    let a = document.createElement('a')
    a.href ="/user/downloadExcel"
    a.click();
} 

```


#### 用window\.location.href 调用

```typescript 
function downloadExcel() {
    window.location.href = "/tUserHyRights/downloadUsersUrl";
} 

```
