# Request 和 Response 对象

## 目录

- [Response](#Response)
  - [📘 一、Response对象的基本概念](#-一Response对象的基本概念)
  - [🧱 二、Response的常见属性](#-二Response的常见属性)
  - [🧰 三、Response的常见方法](#-三Response的常见方法)
    - [1️⃣ 创建自定义的Response对象](#1️⃣-创建自定义的Response对象)
- [Request](#Request)
  - [📘 一、Request对象的基本概念](#-一Request对象的基本概念)
  - [🧱 二、Request的常见属性](#-二Request的常见属性)
  - [🧰 三、Request的常见方法](#-三Request的常见方法)
  - [✅ 四、Request的常见用法示例](#-四Request的常见用法示例)
    - [1️⃣ 使用new Request()创建一个请求对象](#1️⃣-使用new-Request创建一个请求对象)
    - [2️⃣ 复用Request对象](#2️⃣-复用Request对象)
    - [3️⃣ 修改Request对象（克隆）](#3️⃣-修改Request对象克隆)
    - [4️⃣ 在 Service Worker 中使用Request](#4️⃣-在-Service-Worker-中使用Request)
  - [五、Request和fetch()的关系](#五Request和fetch的关系)

# Response

[ Response - Web APIs | MDN Learn about the Response interface, including its constructor, properties, and methods, code examples, specifications, and browser compatibility. https://developer.mozilla.org/en-US/docs/Web/API/Response](https://developer.mozilla.org/en-US/docs/Web/API/Response " Response - Web APIs | MDN Learn about the Response interface, including its constructor, properties, and methods, code examples, specifications, and browser compatibility. https://developer.mozilla.org/en-US/docs/Web/API/Response")

> **Note:** This feature is available in[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API "Web Workers").

`Response`是 Web API 中的一个重要接口，属于 ​**​Fetch API​**​ 的一部分，用于表示 HTTP 请求的响应结果。

## 📘 一、`Response`对象的基本概念

当你使用`fetch()`发起一个网络请求时，它会返回一个`Promise`，这个`Promise`在请求完成后会 resolve 为一个`Response`对象。

```javascript 
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    // 这里的 response 就是一个 Response 对象
    console.log(response);
  });
```


`Response`对象封装了 HTTP 响应的所有信息，包括：

- 状态码（如`200`、`404`）
- 响应头（Headers）
- 响应体（Body，可能是 JSON、文本、Blob 等）

***

## 🧱 二、`Response`的常见属性

| 属性             | 类型      | 说明                                         |
| -------------- | ------- | ------------------------------------------ |
| \`status\`     | Number  | HTTP 状态码，如\`200\`、\`404\`                  |
| \`statusText\` | String  | HTTP 状态文本，如\`"OK"\`、\`"Not Found"\`        |
| \`ok\`         | Boolean | 请求是否成功（状态码在\`200-299\`之间时为\`true\`）        |
| \`headers\`    | Headers | 响应头对象，用于读取响应头信息                            |
| \`url\`        | String  | 响应的 URL                                    |
| \`type\`       | String  | 响应类型（如\`"basic"\`、\`"cors"\`、\`"error"\`等） |
| \`redirected\` | Boolean | 是否发生了重定向                                   |

***

## 🧰 三、`Response`的常见方法

`Response`对象提供了一些方法用于**读取响应体（Body）** 中的数据。注意：**响应体只能被读取一次**，读取后就不能再次读取了。

| 方法                         | 返回值                     | 说明                             |
| -------------------------- | ----------------------- | ------------------------------ |
| \`response.text()\`        | Promise\\\<String>      | 将响应体解析为字符串                     |
| \`response.json()\`        | Promise\\\<Object>      | 将响应体解析为 JSON 对象                |
| \`response.blob()\`        | Promise\\\<Blob>        | 将响应体解析为 Blob 对象（常用于文件下载）       |
| \`response.arrayBuffer()\` | Promise\\\<ArrayBuffer> | 将响应体解析为 ArrayBuffer（用于处理二进制数据） |
| \`response.formData()\`    | Promise\\\<FormData>    | 将响应体解析为 FormData（用于表单提交）       |

> ⚠️ 注意：这些方法都是**异步**的，返回的是`Promise`，需要使用`await`或`.then()`来获取结果。

### 1️⃣ 创建自定义的`Response`对象

你可以通过`new Response()`构造函数手动生成一个`Response`对象，常用于测试或模拟响应。

```javascript 
const response = new Response(JSON.stringify({ message: 'Hello, World!' }), {
  status: 200,
  headers: { 'Content-Type': 'application/json' }
});

console.log(response.status); // 200
console.log(response.headers.get('Content-Type')); // 'application/json'

response.json().then(data => {
  console.log(data); // { message: 'Hello, World!' }
});
```


# Request

`Request`是 Web API 中的一个重要接口，属于 ​**​Fetch API​**​ 的一部分，用于表示一个 HTTP 请求。它通常与`fetch()`方法一起使用，用来发起网络请求，也可以用来​**​****封装、定制或复用请求配置****​**​（如 URL、方法、请求头、请求体等）。

## 📘 一、`Request`对象的基本概念

`Request`对象是对 HTTP 请求的抽象，它封装了请求的所有信息，包括：

- 请求的 URL
- 请求方法（如`GET`、`POST`）
- 请求头（Headers）
- 请求体（Body）
- 请求模式（如`cors`、`no-cors`）
- 凭据模式（如是否发送 Cookie）
- 缓存策略等

你可以通过`new Request()`构造函数创建一个`Request`对象，也可以直接将请求的 URL 字符串传递给`fetch()`方法（这时`fetch()`会隐式地创建一个`Request`对象）。

***

## 🧱 二、`Request`的常见属性

| 属性                 | 类型                     | 说明                                                           |
| ------------------ | ---------------------- | ------------------------------------------------------------ |
| \`url\`            | String                 | 请求的 URL                                                      |
| \`method\`         | String                 | 请求方法，如\`"GET"\`、\`"POST"\`                                   |
| \`headers\`        | Headers                | 请求头对象，包含所有的请求头信息                                             |
| \`body\`           | ReadableStream \| null | 请求体（通常是\`FormData\`、\`Blob\`、\`String\`等）                    |
| \`mode\`           | String                 | 请求模式，如\`"cors"\`、\`"no-cors"\`、\`"same-origin"\`             |
| \`credentials\`    | String                 | 是否发送凭据（如 Cookie），如\`"include"\`、\`"omit"\`、\`"same-origin"\` |
| \`cache\`          | String                 | 缓存模式，如\`"default"\`、\`"no-store"\`、\`"reload"\`              |
| \`redirect\`       | String                 | 重定向模式，如\`"follow"\`、\`"error"\`、\`"manual"\`                 |
| \`integrity\`      | String                 | 子资源完整性校验值（如\`"sha256-..."\`）                                 |
| \`keepalive\`      | Boolean                | 是否在页面卸载后仍然保持请求（用于发送日志等）                                      |
| \`signal\`         | AbortSignal            | 用于取消请求的信号（与\`AbortController\`配合使用）                          |
| \`referrer\`       | String                 | 请求的来源（referrer）                                              |
| \`referrerPolicy\` | String                 | referrer 策略，如\`"no-referrer"\`、\`"origin"\`                  |

> 注意：某些属性（如`body`）只能被**读取一次，读取后就不能再次读取了**（类似于`Response`的设计）。

***

## 🧰 三、`Request`的常见方法

`Request`对象本身没有太多方法，但它继承了`Body`混入（mixin），因此它支持以下方法用于读取请求体（如果你创建的是一个带有请求体的`Request`对象）：

| 方法                        | 返回值                     | 说明                  |
| ------------------------- | ----------------------- | ------------------- |
| \`request.text()\`        | Promise\\\<String>      | 将请求体解析为字符串          |
| \`request.json()\`        | Promise\\\<Object>      | 将请求体解析为 JSON 对象     |
| \`request.blob()\`        | Promise\\\<Blob>        | 将请求体解析为 Blob 对象     |
| \`request.arrayBuffer()\` | Promise\\\<ArrayBuffer> | 将请求体解析为 ArrayBuffer |
| \`request.formData()\`    | Promise\\\<FormData>    | 将请求体解析为 FormData    |

> ⚠️ 注意：这些方法通常用于读取`Request`对象的请求体（比如在 Service Worker 中拦截请求并读取其内容）。如果你只是发起请求（使用`fetch(request)`），一般不需要调用这些方法。

## ✅ 四、`Request`的常见用法示例

### 1️⃣ 使用`new Request()`创建一个请求对象

你可以使用`new Request()`构造函数来创建一个自定义的`Request`对象，然后将其传递给`fetch()`方法。

```javascript 
const request = new Request('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'GET', // 请求方法
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer my-token' // 添加自定义请求头
  },
  mode: 'cors', // 请求模式
  credentials: 'include' // 是否发送 Cookie
});

fetch(request)
  .then(response => response.json())
  .then(data => {
    console.log(data); // 输出响应数据
  });
```


> 这种方式比直接传递 URL 字符串给`fetch()`更灵活，因为你可以自定义请求的各个部分（如方法、头信息、凭据等）。

***

### 2️⃣ 复用`Request`对象

**由于**\*\*`Request`\*\***是一个对象，你可以将它保存下来并多次使用，而不需要每次都重新定义请求的配置。**

```javascript 
const request = new Request('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
});

// 第一次使用
fetch(request)
  .then(response => response.json())
  .then(data => {
    console.log('First fetch:', data);
  });

// 第二次使用（复用同一个 Request 对象）
fetch(request)
  .then(response => response.json())
  .then(data => {
    console.log('Second fetch:', data);
  });
```


> 注意：如果`Request`的`body`不为`null`（即它是一个带有请求体的请求），那么复用同一个`Request`对象可能会导致问题，因为`body`只能被读取一次。

### 3️⃣ 修改`Request`对象（克隆）

由于`Request`对象的`body`只能被读取一次，如果你需要多次使用同一个请求（比如在中间件或拦截器中），可以通过`clone()`方法创建一个副本。

```javascript 
const request = new Request('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'GET'
});

// 克隆请求
const clonedRequest = request.clone();

// 使用原始请求
fetch(request)
  .then(response => response.json())
  .then(data => {
    console.log('Original request:', data);
  });

// 使用克隆的请求
fetch(clonedRequest)
  .then(response => response.json())
  .then(data => {
    console.log('Cloned request:', data);
  });
```


> `clone()`方法会创建一个新的`Request`对象，它的属性和原始对象完全相同，但`body`可以被独立读取。

### 4️⃣ 在 Service Worker 中使用`Request`

`Request`对象在\*\* Service Worker 中非常有用，因为你可以拦截请求、修改请求或返回自定义的响应\*\*。

```javascript 
self.addEventListener('fetch', event => {
  const request = event.request;

  // 打印请求 URL
  console.log('Request URL:', request.url);

  // 检查请求方法
  if (request.method === 'GET') {
    // 对 GET 请求进行缓存处理
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request); // 如果缓存中有，直接返回；否则发起网络请求
      })
    );
  } else {
    // 对非 GET 请求直接转发
    event.respondWith(fetch(request));
  }
});
```


> 在 Service Worker 中，`event.request`就是一个`Request`对象，你可以根据它的属性（如 URL、方法）来决定是否缓存、拦截或修改请求。

## 五、`Request`和`fetch()`的关系

- `fetch()`方法可以接受两种参数：
  1. 一个 URL 字符串（如`fetch('https://example.com')`），这时`fetch()`会隐式地创建一个默认的`Request`对象；
  2. 一个`Request`对象（如`fetch(request)`），这时你可以完全自定义请求的配置。

> 使用`Request`对象的好处是可以更灵活地控制请求的各个方面（如方法、头信息、凭据等），并且可以复用或克隆请求。
