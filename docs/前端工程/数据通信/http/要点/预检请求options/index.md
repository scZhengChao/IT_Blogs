# 预检请求options

## 目录

- [为什么要发预检请求](#为什么要发预检请求)
- [什么时候发预检请求](#什么时候发预检请求)
  - [简单请求](#简单请求)
  - [需预检的请求](#需预检的请求)

1. 预检请求就是，当客户端发起 **复杂请求**，可能会有 cors （跨域问题）， 预检请求就会先去探探路。这也就是，为什么每次 发起 复杂请求，检查元素中的 network 会有两个请求，一次是 options, 一次是真正的 复杂请求。
2. 当 options 请求探路回来，会带着 `Access-Control-Allow-Origin`, 其中会显示是否支持发起跨域请求。 如果允许，真正的复杂请求才会发起。

## 为什么要发预检请求

我们都知道浏览器的同源策略，就是出于安全考虑，浏览器会**限制从脚本发起**的跨域HTTP请求，像XMLHttpRequest和Fetch都遵循同源策略。 &#x20;
浏览器限制跨域请求一般有两种方式：

1. 浏览器限制发起跨域请求
2. 跨域请求可以正常发起，但是返回的结果被浏览器拦截了

一般浏览器都是第二种方式限制跨域请求，那就是说请求已到达服务器，并有可能对数据库里的数据进行了操作，但是返回的结果被浏览器拦截了，那么我们就获取不到返回结果，这是一次失败的请求，但是可能对数据库里的数据产生了影响。

**为了防止这种情况的发生，规范要求**，对这种可能对服务器数据产生副作用的HTTP请求方法，**浏览器必须先使用**\*\*`OPTIONS`\*\***方法发起一个预检请求，从而获知服务器是否允许该跨域请求**：如果允许，就发送带数据的真实请求；如果不允许，则阻止发送带数据的真实请求。

## 什么时候发预检请求

**HTTP请求包括： 简单请求 和 需预检的请求**

### 简单请求

简单请求不会触发CORS预检请求;若满足所有下述条件，则该请求可视为“简单请求”：

使用下列方法之一：

- GET
- HEAD
- POST
  - Content-Type: (仅当POST方法的Content-Type值等于下列之一才算做简单需求)
    - text/plain
    - multipart/form-data
    - application/x-www-form-urlencoded

```typescript 
通过添加以下响应头实现cors： res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
```


### 需预检的请求

“需预检的请求”**要求必须首先使用**\*\*`OPTIONS`\*\***方法发起一个预检请求到服务区，以获知服务器是否允许该实际请求**。“预检请求”的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。

当请求满足下述任一条件时，即应首先发送预检请求：

- 使用了下面任一 HTTP 方法：
  - `PUT`
  - `DELETE`
  - `CONNECT`
  - `OPTIONS`
  - `TRACE`
  - `PATCH`
- 人为设置了[对 CORS 安全的首部字段集合](https://links.jianshu.com/go?to=https://fetch.spec.whatwg.org/#cors-safelisted-request-header "对 CORS 安全的首部字段集合")之外的其他首部字段。该集合为：
  - `Accept`
  - `Accept-Language`
  - `Content-Language`
  - `Content-Type`
  - `DPR`
  - `Downlink`
  - `Save-Data`
  - `Viewport-Width`
  - `Width`
  - `Content-Type`的值不属于下列之一
    - `application/x-www-form-urlencoded`
    - `multipart/form-data`
    - `text/plain`

如下是一个需要执行预检请求的HTTP请求：

```typescript 
var invocation = new XMLHttpRequest();
var url = 'http://bar.other/resources/post-here/';
var body = '<?xml version="1.0"?><person><name>Arun</name></person>';
    
function callOtherDomain(){
  if(invocation)
    {
      invocation.open('POST', url, true);
      invocation.setRequestHeader('X-PRODUCT', 'H5');
      invocation.setRequestHeader('Content-Type', 'application/xml');
      invocation.onreadystatechange = handler;
      invocation.send(body); 
    }
}

......
```


上面的代码使用POST请求发送一个XML文档，该请求包含了一个自定义的首部字段（X-PRODUCT:H5）。另外，该请求的`Content-Type`为`application/xml`。因此，该请求需要首先发起“预检请求”。

[如何避免频繁的发送预检请求](./如何避免频繁的发送预检请求/index.md "如何避免频繁的发送预检请求")
