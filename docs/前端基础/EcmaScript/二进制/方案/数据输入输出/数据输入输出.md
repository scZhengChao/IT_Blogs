# 数据输入输出

## 目录

- [数据输入](#数据输入)
  - [fetch](#fetch)
  - [xhr](#xhr)
  - [File](#File)
- [数据输出](#数据输出)
  - [Data URL](#Data-URL)
    - [Base64 编码与解码](#Base64-编码与解码)
  - [Object URL](#Object-URL)
  - [下载](#下载)

## **数据输入**

数据输入或者叫资源的请求可以分为以下两种途径

- 通过 url 地址请求网络资源
- 通过文件上传请求本地资源

### **fetch**

**fetch**\*\* 应该是大家比较熟悉的，但****大多使用环境比较单一，一般用来请求 json 数据****。其实， 「它也可以设置返回数据格式为 Blob 或者 ArrayBuffer。」\*\*

- fetch 返回一个包含 Response 对象的 Promise，Response 有以下方法
- **Response.prototype.arrayBuffer**
- **Response.prototype.blob**
- **Response.prototype.text**
- **Response.prototype.json**

[详情可以查看 MDN 文档 ](https://developer.mozilla.org/en-US/docs/Web/API/Response "详情可以查看 MDN 文档 ")

```javascript 
fetch('/api/ping').then(res => {
  // true
  console.log(res instanceof Response)
   // 最常见的使用
  return res.json() 


  // 返回 Blob
  // return res.blob()


  // 返回 ArrayBuffer
  // return res.arrayBuffer()
})
```


另外，**万能的 Response API既可以可以使用 TypedArray，Blob，Text作为输入，又可以使用它们作为输出**。**「这意味着关于这三种数据类型的转换完全可以通过 Response」**

### **xhr**

**「xhr 可以设置 responseType 接收合适的数据类型」**

```javascript 
 const request = new XMLHttpRequest() 
 request.responseType = 'arraybuffer' 
 request.responseType = 'blob'
```


### **File**

本地文件可以通过` input[type=file]` 来上传文件。

```javascript 
 <input type="file" id="input">
```


&#x20;      当上传成功后，可以通过 `document.getElementById('input').files[0]`获取到上传的文件，即一个 File 对象，它是 Blob 的子类，可以通过 FileReader或者 Response获取文件内容。

## **数据输出**

或者叫**数据展示或者下载，**数据**经二进制处理后可以由 url 表示**，然后**通过 image, video 等元素引用或者直接下载**。

### **Data URL**

Data URL 即 Data As URL。所以， \*\*「如果资源过大，地址便会很长。」\*\*使用以下形式表示。

```javascript 
 data:[<mediatype>][;base64],<data>
```


先来一个 hello, world。把以下地址粘入地址栏，会访问到 hello, world

```javascript 
 data:text/html,<h1>Hello%2C%20World!</h1>
```


#### **Base64 编码与解码**

Base64 使用**大小写字母，数字，+ 和 / 64 个字符**来编码数据，所以称为 Base64。经编码后，**文本体积会变大 1/3**在浏览器中，可以使用 `atob`和 `btoa`编码解码数据。

```javascript 
 // aGVsbG8= 
 btoa('hello')
```


### **Object URL**

可以使用浏览器新的 API URL对象**生成一个地址来表示 Blob数据**。

```javascript 
 // 粘贴生成的地址，可以访问到 hello, world 
 // blob: http://host/27254c37-db7a-4f2f-8861-0cf9aec89a64 
 URL.createObjectURL(new Blob('hello, world'.split(''))) 
 
 //file映射本地地址 
 if (window.createObjectURL != undefined) { 
     // basic 
     url = window.createObjectURL(file); 
 } else if (window.URL != undefined) { 
     // mozilla(firefox) 
     url = window.URL.createObjectURL(file); 
 } else if (window.webkitURL != undefined) { 
     // webkit or chrome 
     url = window.webkitURL.createObjectURL(file); 
 }
```


### **下载**

`Data URL` 和 `Object URL`  都可以进行下载

> data:application/octet-stream;base64,5bGx5pyI

资源的下载可以利用 FileSaver\[1]。

这里也简单写一个函数，用来下载一个链接

```javascript 
function download (url, name) {
  const a = document.createElement('a')
  a.download = name
  a.rel = 'noopener'
  a.href = url
  // 触发模拟点击
   a.dispatchEvent(new MouseEvent('click'))
  // 或者 a.click() 
}
```
