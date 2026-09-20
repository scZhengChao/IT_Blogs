# onUploadProgress

## 目录

- [计算机存储单位之间换算和关系](#计算机存储单位之间换算和关系)

onUploadProgress 是 Axios 这个 JavaScript 库中用于处理 HTTP 请求的一个配置选项之一。Axios 是一个基于 Promise 的 HTTP 客户端，用于在浏览器和 Node.js 中进行 HTTP 请求。

`onUploadProgress` 允许指定一个回调函数，在上传进度发生变化时被调用。这个回调函数**接收一个进度事件对象**作为参数，可以从中获取上传进度的信息。这对于跟踪文件上传的进度很有用，特别是在需要显示进度条时。

以下是一个使用 `onUploadProgress` 的简单示例：

```javascript 
axios.post('/upload', formData, {
  onUploadProgress: function(progressEvent) {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    console.log(`Upload Progress: ${percentCompleted}%`);
    // 可以在这里更新用户界面以显示上传进度
  }
})
.then(function(response) {
  console.log('Upload Complete', response.data);
})
.catch(function(error) {
  console.error('Error during upload', error);
});

```


在这个示例中，当上传进度发生变化时，`onUploadProgress` 回调函数会被调用。进度事件对象包含 `loaded` 属性**表示已上传的字节数**，以及 `total` 属性**表示总字节数**。通过计算这两个值的比例，可以得出上传的百分比，然后可以使用这个百分比更新用户界面。

请注意，onUploadProgress 只适用于发送请求时的上传过程，不适用于下载过程。如果需要跟踪下载进度，可以使用 Axios 的 onDownloadProgress 配置选项。

### 计算机存储单位之间换算和关系

上传文件少不了对计算机存储单位之间有一定了解，我们需要掌握一定的储存单位知识

**位 (bit)** 是计算机数据存储的最小单位。每个二进制数字0或者1就是1个位；

**字节 (byte)** 8个位构成一个字节；即：1 byte (字节)= 8 bit(位)；

**千字节 (Kb)** 通常我们常见的最小单位kb就是千字节 1kb = 1024byte 即，一千字节 = 1024 字节，一千字节 = 1024\*8 位(bit)

\*\*`兆字节 (Mb)`\*\* 兆字节是现在最普遍看到的单位，现在的通信网络带宽都是以兆字节为基础

**1 MB = 1024 KB ； 1 GB = 1024 MB; (2^20 B) ； 1 TB = 1024 GB; (2^30 B)**
