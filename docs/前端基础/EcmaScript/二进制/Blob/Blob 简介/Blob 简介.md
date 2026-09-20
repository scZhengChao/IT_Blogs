# Blob 简介

## 目录

- [一、Blob 是什么](#一Blob-是什么)
- [二、Blob API 简介](#二Blob-API-简介)
  - [2.1 构造函数](#21-构造函数)
  - [2.3 方法](#23-方法)

* Blob 是什么
* Blob API 简介
  - 构造函数
  - 属性和方法
* Blob 使用场景
  - 分片上传
  - 从互联网下载数据
  - Blob 用作 URL
  - Blob 转换为 Base64
  - 图片压缩
  - 生成 PDF
* Blob 与 ArrayBuffer 的区别

# **一、Blob 是什么**

    Blob（Binary Large Object）表示**二进制类型的大对象**。在数据库管理系统中，将**二进制数据存储为一个单一个体的集合**。Blob 通常是影像、声音或多媒体文件。

&#x20;     **在 JavaScript 中 Blob 类型的对象表示不可变的类似文件对象的原始数据。**

 为了更直观的感受 Blob 对象，我们先来使用 Blob 构造函数，创建一个 myBlob 对象，具体如下图所示：

![  ](f9123841f757e4f3b1eb306a6b11f6b2_P92PBuc5Y7.png "  ")

    如你所见，myBlob 对象含有两个属性：**size 和 type**。其中**size属性用于表示数据的大小（以字节为单位）**，**type是 MIME 类型的字符串**。Blob 表示的不一定是 JavaScript 原生格式的数据。比如\*\*File接口基于 \*\***Blob**，**继承了 blob 的功能并将其扩展使其支持用户系统上的文件。**

# **二、Blob API 简介**

    Blob由一个可选的字符串 type（通常是 MIME 类型）和 blobParts组成：

![  ](2a4eabe6be21401bcf2544862633a460_ibADzJn111.png "  ")

    MIME（Multipurpose Internet Mail Extensions）多用途互联网邮件扩展类型，是设定**某种扩展名的文件用一种应用程序来打开的方式类型，**当**该扩展名文件被访问的时候，浏览器会自动使用指定应用程序来打开**。多用于指定一些客户端自定义的文件名，以及一些媒体文件打开方式。

常见的 MIME 类型有：

**超文本标记语言文本 .html text/html、PNG图像 .png image/png、普通文本 .txt text/plain 等。**

#### **2.1 构造函数**

    Blob 构造函数的语法为：

```javascript 
 var aBlob = new Blob(blobParts, options);
```


相关的参数说明如下：

- blobParts：**它是一个由 ArrayBuffer，ArrayBufferView，Blob，DOMString 等****对象构成****的数组**。DOMStrings 会被编码为 UTF-8。
- options：一个可选的对象，包含以下两个属性：
  - type —— 默认值为 ""，它代表了将会被放入到 blob 中的数组内容的 MIME 类型。
  - endings —— 默认值为 "transparent"，用于指定包含行结束符 \n 的字符串如何被写入。它是以下两个值中的一个："native"，代**表行结束符会被更改为适合宿主操作系统文件系统的换行符**，**或者 ****"transparent"****，代表会保持 blob 中保存的结束符不变**。

**示例一：从字符串创建 Blob**

```javascript 
 let myBlobParts = ['<html><h2>Hello Semlinker</h2></html>']; // an array consisting of a single DOMString 
 let myBlob = new Blob(myBlobParts, {type : 'text/html', endings: "transparent"}); // the blob 
 
 console.log(myBlob.size + " bytes size"); 
 // Output: 37 bytes size 
 console.log(myBlob.type + " is the type"); 
 // Output: text/html is the type
```


**示例二：从类型化数组和字符串创建 Blob**

```javascript 
 let hello = new Uint8Array([72, 101, 108, 108, 111]); // 二进制格式的 "hello" 
 let blob = new Blob([hello, ' ', 'semlinker'], {type: 'text/plain'});
```


介绍完 Blob 构造函数，接下来我们来分别介绍 Blob 类的属性和方法：

![  ](cace41e2c1e2f05f8171145c1e04cbe7_HupRebilfc.png "  ")

**2.2 属性**

前面我们已经知道 Blob 对象包含两个属性：

- size（只读）：表示 Blob 对象中所包含数据的大小（以字节为单位）。
- type（只读）：一个字符串，表明该 Blob 对象所包含数据的 MIME 类型。如果类型未知，则该值为空字符串。

#### **2.3 方法**

- slice(\[start\[, end\[, contentType]]])：**返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据。**
- stream()：返回一个能读取 blob 内容的 ReadableStream。
- text()：返回一个 Promise 对象且包含 blob 所有内容的 UTF-8 格式的 USVString。
- arrayBuffer()：返回一个 Promise 对象且包含 blob 所有内容的二进制格式的 ArrayBuffer。

    这里我们需要注意的是，**Blob对象是不可改变的**。我们不能直接在一个 Blob 中更改数据，但是我们可以对一个 Blob 进行分割，从其中创建新的 Blob 对象，将它们混合到一个新的 Blob 中。这种行为类似于 JavaScript 字符串：我们无法更改字符串中的字符，但可以创建新的更正后的字符串。
