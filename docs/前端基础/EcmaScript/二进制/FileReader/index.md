# FileReader

## 目录

- [3. FileReader](#3-FileReader)
  - [（1）基本使用](#1基本使用)
  - [（2）事件处理](#2事件处理)

## 3. FileReader

FileReader 是一个异步 API，用于**读取文件并提取其内容以供进一步使用**。**FileReader 可以将 Blob 读取为不同的格式**。

> 注意：FileReader 仅用于以安全的方式从用户（远程）系统读取文件内容，不能用于从文件系统中按路径名简单地读取文件。

### （1）基本使用

可以使用 FileReader 构造函数来创建一个 FileReader 对象：

```javascript 
const reader = new FileReader();

```


这个对象常用属性如下：

- `error`：表示在读取文件时发生的错误；
- `result`：文件内容。该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作。
- `readyState`：表示`FileReader`状态的数字。取值如下：
  | **常量名** | **值** | **描述**      |
  | ------- | ----- | ----------- |
  | EMPTY   | 0     | 还没有加载任何数据。  |
  | LOADING | 1     | 数据正在被加载。    |
  | DONE    | 2     | 已完成全部的读取请求。 |

FileReader 对象提供了以下方法来加载文件：

- `FileReader.readAsArrayBuffer()`：读取指定 Blob 中的内容，完成之后，`result` 属性中保存的将是被读取文件的 `ArrayBuffer` 数据对象；
- `FileReader.readAsBinaryString()`：读取指定 Blob 中的内容，完成之后，`result` 属性中将包含所读取文件的原始二进制数据；
- `FileReader.readAsDataURL()`：读取指定 Blob 中的内容，完成之后，`result` 属性中将包含一个`data: URL` **格式的 Base64 字符串以表示所读取文件的内容。**
- `FileReader.readAsText()`：读取指定 Blob 中的内容，完成之后，`result` 属性中将包含一个字符串以表示所读取的文件内容。

可以看到，上面这些方法都接受一个要读取的 blob 对象作为参数，读取完之后会将读取的结果放入对象的 `result` 属性中。

### （2）事件处理

FileReader 对象常用的事件如下：

- `abort`：该事件在读取操作被中断时触发；
- `error`：该事件在读取操作发生错误时触发；
- `load`：该事件在读取操作完成时触发；
- `progress`：该事件在读取 Blob 时触发。

当然，这些方法可以加上前置 on 后在HTML元素上使用，比如`onload`、`onerror`、`onabort`、`onprogress`。除此之外，由于`FileReader`对象继承自`EventTarget`，因此还可以使用 `addEventListener()` 监听上述事件。

下面来看一个简单的例子，首先定义一个 `input` 输入框用于上传文件：

```javascript 
<input type="file" id="fileInput">

```


接下来定义 `input` 标签的 `onchange` 事件处理函数和`FileReader`对象的`onload`事件处理函数：

```javascript 
const fileInput = document.getElementById("fileInput");

const reader = new FileReader();

fileInput.onchange = (e) => {
    reader.readAsText(e.target.files[0]);
}

reader.onload = (e) => {
    console.log(e.target.result);
}

```


这里，首先创建了一个 `FileReader` 对象，当文件上传成功时，使用 `readAsText()` 方法读取 `File` 对象，当读取操作完成时打印读取结果。

使用上述例子读取文本文件时，就是比较正常的。如果读取二进制文件，比如png格式的图片，往往会产生乱码，如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cce9851388a74748ae27250af1abf7a2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

那该如何处理这种二进制数据呢？`readAsDataURL()` 是一个不错的选择，它可以将读取的文件的内容转换为 base64 数据的 URL 表示。这样，就可以直接将 URL 用在需要源链接的地方，比如 img 标签的 src 属性。

对于上述例子，将 readAsText 方法改为 `readAsDataURL()`：

```javascript 
const fileInput = document.getElementById("fileInput");

const reader = new FileReader();

fileInput.onchange = (e) => {
    reader.readAsDataURL(e.target.files[0]);
}

reader.onload = (e) => {
    console.log(e.target.result);
}

```


这时，再次上传二进制图片时，就会在控制台打印一个 base64 编码的 URL，如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c234b4607e4449e99c0a72d808ee1a3a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

下面来修改一下这个例子，将上传的图片通过以上方式显示在页面上：

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


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e7debef050b4f97be89983042218159~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

当上传大文件时，可以通过 `progress` 事件**来监控文件的读取进度：**

```javascript 
const reader = new FileReader();

reader.onprogress = (e) => {
  if (e.loaded && e.total) {
    const percent = (event.loaded / event.total) * 100;
    console.log(`上传进度: ${Math.round(percent)} %`);
  }
});

```


`progress` 事件提供了两个属性：`loaded`（已读取量）和`total`（需读取总量）。

[常见错误](./常见错误/index.md "常见错误")
