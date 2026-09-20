# 总结

## 目录

- [谈谈JS二进制：File、Blob、FileReader、ArrayBuffer、Base64](#谈谈JS二进制FileBlobFileReaderArrayBufferBase64)
  - [1. Blob](#1-Blob)
    - [（1）Blob 创建](#1Blob-创建)
    - [（2）Blob 分片](#2Blob-分片)
  - [4. ArrayBuffer](#4-ArrayBuffer)
  - [5. Object URL](#5-Object-URL)
  - [6. Base64](#6-Base64)
  - [7. 格式转化](#7-格式转化)
    - [（1）ArrayBuffer → blob](#1ArrayBuffer--blob)
    - [（2）ArrayBuffer → base64](#2ArrayBuffer--base64)
    - [（3）base64 → blob](#3base64--blob)
    - [（4）blob → ArrayBuffer](#4blob--ArrayBuffer)
    - [（5）blob → base64](#5blob--base64)
    - [（6）blob → Object URL](#6blob--Object-URL)

# 谈谈JS二进制：File、Blob、FileReader、ArrayBuffer、Base64

JavaScript 提供了一些 API 来**处理文件或原始文件数据**，例如：`File`、`Blob`、`FileReader`、`ArrayBuffer`、`base64` 等。下面就来看看它们都是如何使用的，它们之间又有何区别和联系。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa83846a988842ad8656a68331207bef~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 1. Blob

Blob 全称为 `binary large object` ，即**二进制大对象**，它是 JavaScript 中的一个对象，表示**原始的类似文件的数据**。下面是 MDN 中对 Blob 的解释：

> Blob 对象表示\*\*`一个不可变、原始数据的类文件对象`\*\*。它的数据可以按文本或二进制的格式进行读取，也可以转换成` `[ReadableStream](https://link.juejin.cn?target=https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream "ReadableStream")` `来用于数据操作。

实际上，Blob 对象是包含有只读**原始数据的类文件对象**。简单来说，Blob 对象就是一个**不可修改的二进制文件。**

### （1）Blob 创建

可以使用 Blob() 构造函数来创建一个 Blob：

```javascript 
new Blob(array, options);

```


其有两个参数：

- `array`：由 `ArrayBuffer`、`ArrayBufferView`、`Blob`、`DOMString` 等对象构成的，将会被放进 `Blob`；
- `options`：可选的 `BlobPropertyBag` 字典，它可能会指定如下两个属性
  - `type`：默认值为 ""，表示将会被放入到 `blob` 中的数组内容的 MIME 类型。
  - `endings`：默认值为"`transparent`"，用于指定包含行结束符`\n`的字符串如何被写入，不常用。

常见的 MIME 类型如下：

| **MIME 类型**      | **描述**        |
| ---------------- | ------------- |
| text/plain       | 纯文本文档         |
| text/html        | HTML 文档       |
| text/javascript  | JavaScript 文件 |
| text/css         | CSS 文件        |
| application/json | JSON文件        |
| application/pdf  | PDF文件         |
| application/xml  | XML 文件        |
| image/jpeg       | JPEG图像        |
| image/png        | PNG图像         |
| image/gif        | GIF 图像        |
| image/svg+xml    | SVG 图像        |
| audio/mpeg       | MP3 文件        |
| video/mpeg       | MP4 文件        |

下面来看一个简单的例子：

```javascript 
const blob = new Blob(["Hello World"], {type: "text/plain"});

```


这里可以成为动态文件创建，其正在创建一个类似文件的对象。这个 blob 对象上有两个属性：

- `size`：Blob对象中所包含数据的大小（字节）；
- `type`：字符串，认为该Blob对象所包含的 MIME 类型。如果类型未知，则为空字符串。

下面来看打印结果：

```javascript 
const blob = new Blob(["Hello World"], {type: "text/plain"});

console.log(blob.size); // 11
console.log(blob.type); // "text/plain"

```


注意，字符串"Hello World"是 UTF-8 编码的，因此它的每个字符占用 1 个字节。

到现在，Blob 对象看起来似乎我们还是没有啥用。那该如何使用 Blob 对象呢？可以使用 `URL.createObjectURL()` 方法将将其转化为一个 URL，并在 Iframe 中加载：

![](./assets/image/image_ACdf_9XAIz.png)

```javascript 

<iframe></iframe>

const iframe = document.getElementsByTagName("iframe")[0];

const blob = new Blob(["Hello World"], {type: "text/plain"});

iframe.src = URL.createObjectURL(blob);


```


### （2）Blob 分片

除了使用`Blob()`构造函数来创建blob 对象之外，还可以从 blob 对象中创建blob，也就是将 blob 对象切片。Blob 对象内置了 slice() 方法用来将 blob 对象分片，其语法如下：

```javascript 
const blob = instanceOfBlob.slice([start [, end [, contentType]]]};

```


其有三个参数：

- `start`：设置切片的起点，即切片开始位置。默认值为 0，这意味着切片应该从第一个字节开始；
- `end`：设置切片的结束点，会对该位置之前的数据进行切片。默认值为`blob.size`；
- `contentType`：设置新 blob 的 MIME 类型。如果省略 type，则默认为 blob 的原始值。

下面来看例子：

```javascript 
const iframe = document.getElementsByTagName("iframe")[0];

const blob = new Blob(["Hello World"], {type: "text/plain"});

const subBlob = blob.slice(0, 5);

iframe.src = URL.createObjectURL(subBlob);

```


此时页面会显示"Hello"。

## 4. ArrayBuffer

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e91b79159224b52907a3ee7ba2598bb~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

![](./assets/image/image_w0_s2w0K5h.png)

## 5. Object URL

Object URL（MDN定义名称）又称Blob URL（W3C定义名称），是HTML5中的新标准。**它是一个用来表示File Object 或Blob Object 的URL**。在网页中，我们可能会看到过这种形式的 Blob URL：&#x20;

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7177d40eb374b09bb6413dd44a9212f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

&#x20;      对于 Blob/File 对象，可以使用 URL构造函数的 `createObjectURL()` 方法创建将给出的对象的 URL。这个 URL 对象表示指定的 File 对象或 Blob 对象。我们可以在`<img>`、`<script>` 标签中或者 `<a>` 和 `<link>` 标签的 `href` 属性中使用这个 URL。

&#x20;     来看一个简单的例子，首先定义一个文件上传的 input 和一个 图片预览的 img：

&#x20;     其实Blob URL/Object URL 是一种伪协议，允许将 Blob 和 File 对象用作图像、二进制数据下载链接等的 URL 源。

```javascript 
<input type="file" id="fileInput" />

<img id="preview" />

```


再来使用 `URL.createObjectURL()` 将File 对象转化为一个 URL：

```javascript 
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

fileInput.onchange = (e) => {
  preview.src = URL.createObjectURL(e.target.files[0]);
  console.log(preview.src);
};

```


可以看到，上传的图片转化成了一个 URL，并显示在了屏幕上：&#x20;

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7f21bcf752940199d5985065baacb92~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

那**这个 API 有什么意义呢？可以将Blob/File对象转化为URL，通过这个URL 就可以实现文件下载或者图片显示等。**

&#x20;        当我们使用`createObjectURL()`方法创建一个data URL 时，就需要使用`revokeObjectURL()`方法从内存中清除它来释放内存。虽然浏览器会在文档卸载时自动释放 Data URL，但为了提高性能，我们应该使用`createObjectURL()`来手动释放它。`revokeObjectURL()`方法接受一个Data URL 作为其参数，返回`undefined`。下面来看一个例子：

```javascript 
const objUrl = URL.createObjectURL(new File([""], "filename"));
console.log(objUrl);
URL.revokeObjectURL(objUrl);

```


## 6. Base64

Base64 是**一种基于64个可打印字符来表示二进制数据的表示方法**。Base64 编码普遍应用于需要通过**被设计为处理文本数据的媒介上储存和传输二进制数据而需要编码该二进制数据的场景**。这样是为了保证数据的完整并且不用在传输过程中修改这些数据。

在 JavaScript 中，有两个函数被分别用来处理解码和编码 *base64* 字符串：

- **`atob()`：解码，解码一个 Base64 字符串；**
- **`btoa()`：编码，从一个字符串或者二进制数据编码一个 Base64 字符串。**

```javascript 
btoa("JavaScript")       // 'SmF2YVNjcmlwdA=='
atob('SmF2YVNjcmlwdA==') // 'JavaScript'

```


那 base64 的实际应用场景有哪些呢？**其实多数场景就是基于Data URL的。** 比如，使用`toDataURL()`方法把 canvas 画布内容生成 base64 编码格式的图片：

```javascript 
const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext("2d");
const dataUrl = canvas.toDataURL();

```


除此之外，还可以使用`readAsDataURL()`方法把上传的文件转为base64格式的data URI，比如上传头像展示或者编辑：

```javascript 
<input type="file" id="fileInput" />

<img id="preview" />

```


```javascript 
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const reader = new FileReader();

fileInput.onchange = (e) => {
  reader.readAsDataURL(e.target.files[0]);
};

reader.onload = (e) => {
  preview.src = e.target.result;
  console.log(e.target.result);
};

```


效果如下，将图片（二进制数据）转化为可打印的字符，也便于数据的传输：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dab15ad32263414aa69ccc37d7ef2275~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

另外，**一些小的图片都可以使用 base64 格式进行展示**，`img`标签和`background`的 `url` 属性都支持使用base64 格式的图片，**这样做也可以减少 HTTP 请求。**

## 7. 格式转化

看完这些基本的概念和使用，下面就来看看常用的格式之间是如何转换的。

### （1）ArrayBuffer → blob

```javascript 
const blob = new Blob([new Uint8Array(buffer, byteOffset, length)]);

```


### （2）ArrayBuffer → base64

```javascript 
const base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));

```


### （3）base64 → blob

```javascript 
const base64toBlob = (base64Data, contentType, sliceSize) => {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

```


### （4）blob → ArrayBuffer

```javascript 
function blobToArrayBuffer(blob) { 
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject;
      reader.readAsArrayBuffer(blob);
  });
}

```


### （5）blob → base64

```javascript 
function blobToBase64(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}


```


### （6）blob → Object URL

```javascript 
const objectUrl = URL.createObjectURL(blob);

```


[ArrayBuffer](IT/前端基础/EcmaScript/二进制/总结/ArrayBuffer/ArrayBuffer.md "ArrayBuffer")
