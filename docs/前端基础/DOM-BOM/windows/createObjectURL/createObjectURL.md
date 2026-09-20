# createObjectURL

## 目录

- [下载](#下载)

静态方法会创建一个 DOMString，
其中包含一个表示参数中给出的对象的URL。这\*\*个 URL 的生命周期和创建它的窗口中的 document 绑定。
\*\*这个新的URL \*\*对象表示指定的 File 对象或 Blob 对象。
\*\*
**createObjectURL返回一段带hash的url，****并且一直存储在内存中，直到document触发了unload事件（例如：document close）或者执行revokeObjectURL来释放。**

**使用createObjectURL可以节省性能并更快速，只不过需要在不使用的情况下手动释放内存**

```javascript 
let  windowURL = window.URL || window.webkitURL ｜｜ window 

 const url  = windowURL.createObjectURL(files[0])   

 windowURL.revokeObjectURL(url)  //释放内存
```


[图片预览](图片预览.md "图片预览")

[音视频流传输](音视频流传输.md "音视频流传输")

[结合 Blob](<结合 Blob.md> "结合 Blob")

[createObjectURL()  和  FileReader.readAsDataURL(file) 比较](<createObjectURL()  和  FileReader.readAsDataURL(fil.md> "createObjectURL()  和  FileReader.readAsDataURL(file) 比较")

# 下载

```javascript 
const contentDisposition = xhr.getResponseHeader('content-disposition')
const fileName = window.decodeURI(contentDisposition.split('filename=')[1])
const type = xhr.getResponseHeader('content-type')
const windowURL = window.URL || window.webkitURL || window
const url = windowURL.createObjectURL(new Blob([xhr.response],{
    type:type
}))
const a = document.createElement('a');
a.style.display = 'none';
a.href = url;
a.download=fileName
document.body.appendChild(a)
a.click();
windowURL.revokeObjectURL(url)
document.body.removeChild(a)
```
