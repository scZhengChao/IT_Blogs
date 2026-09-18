# Blob 与 ArrayBuffer 的区别

## 目录

- [四、Blob 与 ArrayBuffer 的区别](#四Blob-与-ArrayBuffer-的区别)
  - [4.1 Blob vs ArrayBuffer](#41-Blob-vs-ArrayBuffer)

# **四、Blob 与 ArrayBuffer 的区别**

\*\*       ArrayBuffer**对象用于表示**通用的，****固定长度的原始二进制数据缓冲区**。你**不能直接操纵 ArrayBuffer 的内容 \*\*，而是需要创建一个

**类型化数组对象或 DataView 对**象，该对象以**特定格式表示缓冲区，并使用该对象读取和写入缓冲区的内容。**

\*\*    Blob**类型的对象表示**不可变的类似文件对象的原始数据 \*\*。Blob 表示的不一定是 JavaScript 原生格式的数据。**File 接口基于 Blob，继承了Blob 功能并将其扩展为支持用户系统上的文件。**

## **4.1 Blob vs ArrayBuffer**

- \*\*除非你需要使用 ****ArrayBuffer 提供的写入/编辑的能力****，\*\***否则 Blob 格式可能是最好的。**
- **Blob 对象是不可变的，而 ArrayBuffer 是可以通过 TypedArrays 或 DataView 来操作。**
- **ArrayBuffer 是存在内存中的，可以直接操作。****而 Blob 可以位于磁盘、高速缓存内存和其他不可用的位置****。**
- **虽然 Blob 可以直接作为参数传递给其他函数，比如 ****window\.URL.createObjectURL()****。但是，你可能仍需要 FileReader 之类的 File API 才能与 Blob 一起使用。**
- **Blob 与 ArrayBuffer 对象之间是可以相互转化的：**
  - **使用 FileReader 的 readAsArrayBuffer() 方法，可以把 Blob 对象转换为 ArrayBuffer 对象；**
  - **使用 Blob 构造函数，如 new Blob(\[new Uint8Array(data]);，可以把 ArrayBuffer 对象转换为 Blob 对象。**

对于 HTTP 的场景，比如在 AJAX 场景下，**Blob**和 **ArrayBuffer**可以通过以下方式来使用：

```javascript 
 function GET(url, callback) { 
   let xhr = new XMLHttpRequest(); 
   xhr.open('GET', url, true); 
   xhr.responseType = 'arraybuffer'; // or xhr.responseType = "blob"; 
   xhr.send(); 
 
   xhr .onload = function(e) { 
     if (xhr.status != 200) { 
       alert("Unexpected status code " + xhr.status + " for " + url); 
       return false; 
     } 
     callback(new Uint8Array(xhr.response)); // or new Blob([xhr.response]); 
   }; 
 }
```
