# Blob 使用场景

## 目录

- [三、Blob 使用场景](#三Blob-使用场景)
  - [3.1 分片上传](#31-分片上传)
  - [3.2 从互联网下载数据](#32-从互联网下载数据)
  - [3.3 Blob 用作 URL](#33-Blob-用作-URL)
    - [1.Blob URL/Object URL ](#1Blob-URLObject-URL)
    - [2.Blob 文件下载示例](#2Blob-文件下载示例)
  - [3.4 Blob 转换为 Base64](#34-Blob-转换为-Base64)
  - [3.5 图片压缩](#35-图片压缩)
  - [3.6 生成 PDF 文档](#36-生成-PDF-文档)

# **三、Blob 使用场景**

## **3.1 分片上传**

**File 对象是特殊类型的 Blob**，且可以用在任意的 Blob 类型的上下文中。所以针对大文件传输的场景，我们可以使用 slice 方法对大文件进行切割，然后分片进行上传，具体示例如下：

```javascript 
 const file = new File(["a".repeat(1000000)], "test.txt"); 
 
 
 const chunkSize = 40000; 
 const url = "https://httpbin.org/post"; 
 
 
 async function chunkedUpload() { 
   for (let start = 0; start < file.size; start += chunkSize) { 
       const chunk = file.slice(start, start + chunkSize + 1); 
       const fd = new FormData(); 
       fd.append("data", chunk); 
 
 
       await fetch(url, { method: "post", body: fd }).then((res) => 
         res.text() 
       ); 
   } 
 }
```


## **3.2 从互联网下载数据**

我们可以使用以下方法从互联网上下载数据并将数据存储到 Blob 对象中，比如：

```javascript 
 const downloadBlob = (url, callback) => { 
     const xhr = new XMLHttpRequest() 
     xhr.open('GET', url) 
     xhr.responseType = 'blob' 
     xhr.onload = () => { 
         callback(xhr.response) 
     } 
     xhr.send(null) 
 }
```


&#x20;   当然除了使用 XMLHttpRequestAPI 之外，我们也可以使用 fetch API 来实现以流的方式获取二进制数据。这里我们来看一下如何使用 fetch API 获取线上图片并本地显示，具体实现如下：

```javascript 
 const myImage = document.querySelector('img'); 
 const myRequest = new Request('flowers.jpg'); 
 
 
 fetch(myRequest) 
   .then(function(response) { 
     return response.blob(); 
   }) 
 .then(function(myBlob) { 
    let objectURL = URL.createObjectURL(myBlob); 
    myImage.src = objectURL; 
 });
```


&#x20;   当 fetch 请求成功的时候，我们调用 response 对象的 blob()方法，从 response 对象中读取一个 Blob 对象，然后使用createObjectURL()方法创建一个 objectURL，然后把它赋值给 img元素的 src属性从而显示这张图片。

## **3.3 Blob 用作 URL**

    Blob 可以很容易的作为 \<a>、\<img>或其他标签的 URL，多亏了 type属性，我们也可以上传/下载 Blob 对象。下面我们将举一个 Blob 文件下载的示例，不过在看具体示例前我们得简单介绍一下 Blob URL。

### \*\*1.Blob URL/Object URL \*\*​

    Blob URL/Object URL 是一种**伪协议**，允许**Blob 和 File 对象用作图像，下载二进制数据链接等的 URL 源**。在浏览器中，我们使用 

**URL.createObjectURL方法来创建 Blob URL**，该方法接收一个**Blob对象，并为其创建一个唯一的 URL，其形式为**

**blob:\<origin>/\<uuid>**，对应的示例如下：

```javascript 
 blob:https://example.org/40a5fb5a-d56d-4a33-b4e2-0acf6a8e5f641
```


    浏览器内部为每个通过 URL.createObjectURL**生成的 URL 存储了一个 URL → Blob 映射**。因此，此类 URL 较短，但可以访问 

Blob。**生成的 URL 仅在当前文档打开的状态下才有效**。它允许引用 \<img>、\<a>中的 Blob，但如果你访问的 Blob URL 不再存在，则会从浏览器中收到 404 错误。述的 Blob URL 看似很不错，但实际上它也有**副作用**。虽然**存储了 URL → Blob 的映射**，但

**Blob 本身仍驻留在内存**中，**浏览器无法释放它**。**映射在文档卸载时自动清除，因此 Blob 对象随后被释放。**

**方法，**从**内部映射中删除引用，从而允许删除 Blob（如果没有其他引用），并释放内存**。接下来，我们来看一下 Blob 文件下载的具体示例。

### **2.Blob 文件下载示例**

\*\*index.html    \*\*​

```javascript 
 <!DOCTYPE html> 
 <html> 
   <head> 
     <meta charset="UTF-8" /> 
     <title>Blob 文件下载示例</title> 
   </head> 
 
 
   <body> 
     <button id="downloadBtn">文件下载</button> 
     <script src="index.js"></script> 
   </body> 
 </html>
```


**index.js**

```javascript 
 const download = (fileName, blob) => { 
   const link = document.createElement("a"); 
   link.href = URL.createObjectURL(blob); 
   link.download = fileName; 
   link.click(); 
   link.remove(); 
   URL.revokeObjectURL(link.href); 
 }; 
 
 const downloadBtn = document.querySelector("#downloadBtn"); 
 downloadBtn.addEventListener("click", (event) => { 
   const fileName = "blob.txt"; 
   const myBlob = new Blob(["一文彻底掌握 Blob Web API"], { type: "text/plain" }); 
   download(fileName, myBlob); 
 });
```


在示例中，我们通过调用 Blob 的构造函数来创建类型为  **"text/plain"** 的 Blob 对象，然后通过动态创建 a标签来实现文件的下载。

## **3.4 Blob 转换为 Base64**

    URL.createObjectURL的一个替代方法是，将 Blob转换为 base64 编码的字符串。**Base64是一种基于 64 个可打印字符来表示二进制数据的表示方法**，**它常用于在处理文本数据的场合，表示、传输、存储一些二进制数据，包括 MIME 的电子邮件及 XML 的一些复杂数据。**

    在 MIME 格式的电子邮件中，base64 可以用来将二进制的字节序列数据编码成 ASCII 字符序列构成的文本。使用时，在传输编码方式中指定 base64。使用的字符包括大小写拉丁字母各 26 个、数字 10 个、加号 + 和斜杠 /，共 64 个字符，等号 = 用来作为后缀用途

&#x20;    下面我们来介绍如何在 HTML 中嵌入 base64 编码的图片。在编写 HTML 网页时，对于一些简单图片，通常会选择将图片内容直接内嵌在网页中，从而减少不必要的网络请求，但是图片数据是二进制数据，该怎么嵌入呢？绝大多数现代浏览器都支持一种名为&#x20;

Data URLs的特性，允许使用 base64 对图片或其他文件的二进制数据进行编码，将其作为文本字符串嵌入网页中。

**Data URLs 由四个部分组成：前缀（****data:****）、指示数据类型的 MIME 类型、如果非文本则为可选的 ****base64****标记、数据本身：**

```javascript 
 data:[<mediatype>][;base64],<data>
```


    mediatype是个 MIME 类型的字符串，例如 "image/jpeg" 表示 JPEG 图像文件。如果被省略，则默认值为 

text/plain;charset=US-ASCII。如果数据是文本类型，你可以直接将文本嵌入（根据文档类型，使用合适的实体字符或转义字符）。如果是二进制数据，你可以将数据进行 base64 编码之后再进行嵌入。比如嵌入一张图片：

```javascript 
 <img alt="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...">
```


**但需要注意的是：如果图片较大，图片的色彩层次比较丰富，则不适合使用这种方式，因为该图片经过**\*\* base64 编码后的字符串非常大，会明显增大 HTML 页面的大小，从而影响加载速度。\*\* ​

 除此之外，利用 FileReader API，我们也可以方便的实现图片本地预览功能，具体代码如下：

```javascript 
<input type="file" accept="image/*" onchange="loadFile(event)">
<img id="output"/>


<script>
  const loadFile = function(event) {

    const reader = new FileReader();
   
    reader.onload = function(){

      const output = document.querySelector('output');

      output.src = reader.result;

    };

    reader.readAsDataURL(event.target.files[0]);

  };
</script>
```


    在以上示例中，我们为 file 类型输入框绑定 onchange事件处理函数 loadFile，在该函数中，我们创建了一个 FileReader 对象并为该对象绑定 onload相应的事件处理函数，然后调用 FileReader 对象的 readAsDataURL()方法，**把本地图片对应的 File 对象转换为 Data URL**

    在完成本地图片预览之后，我们可以直接把图片对应的 Data URLs 数据提交到服务器。针对这种情形，服务端需要做一些相关处理，才能正常保存上传的图片，这里以 Express 为例，具体处理代码如下：

```arduino 
 const app = require('express')(); 
 
 
 app.post('/upload', function(req, res){ 
     let imgData = req.body.imgData; // 获取POST请求中的 base64 图片数据 
     let base64Data = imgData.replace(/^data:image\/\w+;base64,/, ""); 
     let dataBuffer = Buffer.from(base64Data, 'base64'); 
     fs.writeFile("image.png", dataBuffer, function(err) { 
         if(err){ 
           res.send(err); 
         }else{ 
           res.send("图片上传成功！"); 
         } 
     }); 
 });
```


&#x20;   对于 FileReader 对象来说，除了支持把**Blob/File 对象转换为 Data URL 之外**，它还提供了\*\*readAsArrayBuffer()****和****readAsText()\*\***方法，用于把 Blob/File 对象转换为其它的数据格式**。这里我们来看个 readAsArrayBuffer()的使用示例：

```javascript 
 // 从 blob 获取 arrayBuffer 
 let fileReader = new FileReader(); 
 
 fileReader.onload = function(event) { 
   let arrayBuffer = fileReader.result; 
 }; 
 fileReader.readAsArrayBuffer(blob);
```


## **3.5 图片压缩**

    在一些场合中，我们希望在上传本地图片时，先对图片进行一定的压缩，然后再提交到服务器，从而减少传输的数据量。在前端要实现图片压缩，我们可以利用\*\* Canvas 对象提供的 ****`toDataURL`****()方法，该方法接收`type`和 ​`encoderOptions`\*\***两个可选参数。**

&#x20;          其中 type表示图片格式，默认为 image/png。而 encoderOptions用于表示图片的质量，在指定图片格式为 image/jpeg或 image/webp的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92，其他参数会被忽略。

下面我们来看一下具体如何实现图片压缩：

```javascript 
 // compress.js  canvas 实现图片压缩 
 const MAX_WIDTH = 800; // 图片最大宽度 
 
 
 function compress(base64, quality, mimeType) { 
   let canvas = document.createElement("canvas"); 
   let img = document.createElement("img"); 
   img.crossOrigin = "anonymous"; 
   return new Promise((resolve, reject) => { 
     img.src = base64; 
     img.onload = () => { 
       let targetWidth, targetHeight; 
       if (img.width > MAX_WIDTH) { 
         targetWidth = MAX_WIDTH; 
         targetHeight = (img.height * MAX_WIDTH) / img.width; 
       } else { 
         targetWidth = img.width; 
         targetHeight = img.height; 
       } 
       canvas.width = targetWidth; 
       canvas.height = targetHeight; 
       let ctx = canvas.getContext("2d"); 
       ctx.clearRect(0, 0, targetWidth, targetHeight); // 清除画布 
       ctx.drawImage(img, 0, 0, canvas.width, canvas.height); 
       let imageData = canvas.toDataURL(mimeType, quality / 100); 
       resolve(imageData); 
     }; 
   }); 
 }
```


    对于返回的 Data URL 格式的图片数据，为了进一步减少传输的数据量，我们可以把它转换为 Blob 对象：

```javascript 
 function dataUrlToBlob(base64, mimeType) { 
   let bytes = window.atob(base64.split(",")[1]); 
   let ab = new ArrayBuffer(bytes.length); 
   let ia = new Uint8Array(ab); 
   for (let i = 0; i < bytes.length; i++) { 
     ia[i] = bytes.charCodeAt(i); 
   } 
   return new Blob([ab], { type: mimeType }); 
 }
```


    在转换完成后，我们就可以压缩后的图片对应的 Blob 对象封装在 FormData 对象中，然后再通过 AJAX 提交到服务器上：

```javascript 
 function uploadFile(url, blob) { 
   let formData = new FormData(); 
   let request = new XMLHttpRequest(); 
   formData.append("image", blob); 
   request.open("POST", url, true); 
   request.send(formData); 
 }
```


其实 Canvas 对象除了提供 toDataURL()方法之外，它还提供了一个 toBlob()方法，该方法的语法如下：

```javascript 
 canvas.toBlob(callback, mimeType, qualityArgument)
```


和 toDataURL()方法相比，toBlob()方法**是异步的，** 因此多了个 callback参数，这个 callback回调方法默认的第一个参数就是转换好的

blob文件信息。介绍完上述的内容，我们来看一下本地图片压缩完整的示例：

```html 
 <!DOCTYPE html> 
 <html> 
   <head> 
     <meta charset="UTF-8" /> 
     <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
     <title>本地图片压缩</title> 
   </head> 
   <body> 
     <input type="file" accept="image/*" onchange="loadFile(event)" /> 
     <script src="./compress.js"></script> 
     <script> 
 
       const loadFile = function (event) { 
 
         const reader = new FileReader(); 
 
         reader.onload = async function () { 
 
           let compressedDataURL = await compress( 
             reader .result, 
              90, 
              "image/jpeg" 
            ); 
            let compressedImageBlob = dataUrlToBlob(compressedDataURL); 
            uploadFile("https://httpbin.org/post", compressedImageBlob); 
          }; 
         reader .readAsDataURL(event.target.files[0]); 
        }; 
 
     </script> 
   </body> 
 </html>
```


## **3.6 生成 PDF 文档**

PDF（便携式文件格式，Portable Document Format）是由 Adobe Systems 在 1993 年用于文件交换所发展出的文件格式。在浏览器端，利用一些现成的开源库，比如 jsPDF，我们也可以方便地生成 PDF 文档。

```html 
 <!DOCTYPE html> 
 <html> 
   <head> 
     <meta charset="UTF-8" /> 
     <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
     <title>客户端生成 PDF 示例</title> 
   </head> 
   <body> 
     <h3>客户端生成 PDF 示例</h3> 
     <script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js"></script> 
     <script> 
 
       (function generatePdf() { 
 
         const doc = new jsPDF(); 
 
         doc.text("Hello semlinker!", 66, 88); 
 
         const blob = new Blob([doc.output()], { type: "application/pdf" }); 
 
         blob.text().then((blobAsText) => { 
 
           console.log(blobAsText); 
 
         }); 
 
       })(); 
 
     </script> 
   </body> 
 </html>
```


在以上示例中，我们首先创建 PDF 文档对象，然后调用该对象上的 text()方**法在指定的坐标点上添加 Hello semlinker!文本**，然后我们利用生成的 PDF 内容来创建对应的 Blob 对象，需要注意的是我们设置 Blob 的类型为 application/pdf，最后我们把 Blob 对象中保存的内容转换为文本并输出到控制台。由于内容较多，这里我们只列出少部分输出结果：

```javascript 
 %PDF-1.3 
 %ºß¬à 
 3 0 obj 
 <</Type /Page 
 /Parent 1 0 R 
 /Resources 2 0 R 
 /MediaBox [0 0 595.28 841.89] 
 /Contents 4 0 R 
 >> 
 endobj 
 ....
```


其实 jsPDF 除了支持纯文本之外，它也可以生成带图片的 PDF 文档，比如：

```javascript 
 let imgData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/...' 
 let doc = new jsPDF(); 
 
 
 doc.setFontSize(40) 
 doc.text(35, 25, 'Paranyan loves jsPDF') 
 doc.addImage(imgData, 'JPEG', 15, 40, 180, 160)
```


Blob 的应用场景还很多，这里我们就不一一列举了，感兴趣的小伙伴可以自行查阅相关资料。
