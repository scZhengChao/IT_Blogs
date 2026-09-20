# File对象

## 目录

- [（1）input](#1input)
- [（2）文件拖放](#2文件拖放)

文件（File）接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。实际上，**File 对象是特殊类型的 Blob**，且可以用在任意的 Blob 类型的 context 中。Blob 的属性和方法都可以用于 File 对象。

> 注意：**File 对象中只存在于浏览器环境中**，在 Node.js 环境中不存在。

在 JavaScript 中，**主要有两种方法**来获取 File 对象：

- `<input>` 元素上选择文件后返回的 FileList 对象；
- 文件拖放操作生成的 `DataTransfer` 对象；

### （1）input

首先定义一个输入类型为 file 的 `input` 标签：

```javascript 
<input type="file" id="fileInput" multiple="multiple">

```


这里给 `input` 标签添加了三个属性：

- `type="file"`：指定 `input` 的输入类型为文件；
- `id="fileInput"`：指定 `input` 的唯一 id；
- `multiple="multiple"`：指定 `input` 可以同时上传多个文件；

下面来给 `input` 标签添加 `onchange` 事件，当选择文件并上传之后触发：

```javascript 
const fileInput = document.getElementById("fileInput");

fileInput.onchange = (e) => {
    console.log(e.target.files);
}

```


当点击上传文件时，控制台就会输出一个 FileList 数组，这个数组的每个元素都是一个 File 对象，一个上传的文件就对应一个 File 对象：&#x20;

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48de94b712ab4b2cbd9934a93af5c212~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

每个 `File` 对象都包含文件的一些属性，这些属性都继承自 Blob 对象：

- `lastModified`：引用文件最后修改日期，为自1970年1月1日0:00以来的毫秒数；
- `lastModifiedDate`：引用文件的最后修改日期；
- `name`：引用文件的文件名；
- `size`：引用文件的文件大小；
- `type`：文件的媒体类型（MIME）；
- `webkitRelativePath`：文件的路径或 URL。

通常，我们在上传文件时，可以**通过对比 size 属性来限制文件大小，通过对比 type 来限制上传文件的格式等。**

### （2）文件拖放

另一种获取 File 对象的方式就是拖放 API，这个 API 很简单，就是将浏览器之外的文件拖到浏览器窗口中，并将它放在一个成为拖放区域的特殊区域中。拖放区域用于响应放置操作并从放置的项目中提取信息。这些是通过 `ondrop` 和 `ondragover` 两个 API 实现的。

下面来看一个简单的例子，首先定义一个拖放区域：

```javascript 
<div id="drop-zone"></div>

```


然后给这个元素添加 `ondragover` 和 `ondrop` 事件处理程序：

```javascript 
const dropZone = document.getElementById("drop-zone");

dropZone.ondragover = (e) => {
    e.preventDefault();
}

dropZone.ondrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files)
}

```


**注意**：这里给两个 API 都添加了 `e.preventDefault()`，用来**阻止默认事件。它是非常重要的**，可以用来阻止浏览器的一些默认行为，比如放置文件将显示在浏览器窗口中。

当拖放文件到拖放区域时，控制台就会输出一个 FileList 数组，该数组的每一个元素都是一个 `File` 对象。这个 FileList 数组是从事件参数的 `dataTransfer` 属性的 `files` 获取的：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a13a94e85c5e4d9caf48c2b430ef5036~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

可以看到，这里得到的 `File` 对象和通过 `input` 标签获得的 `File` 对象是完全一样的。

[File](IT/前端基础/EcmaScript/二进制/File对象/File/File.md "File")

[和Blob的区别](./和Blob的区别/index.md "和Blob的区别")
