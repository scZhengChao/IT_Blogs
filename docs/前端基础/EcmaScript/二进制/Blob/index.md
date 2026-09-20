# Blob

## 目录

- [FileReader操作Blob](#FileReader操作Blob)
- [转换](#转换)
- [用途：](#用途)
  - [1.使用Blob最简单的方法就是创建一个URL来指向Blob：](#1使用Blob最简单的方法就是创建一个URL来指向Blob)
  - [2.Blob 响应  或者下载 responseType:'blob'](#2Blob-响应--或者下载-responseTypeblob)

# **FileReader**操作Blob

Blob是**浏览器端的类文件对象**。操作 `Blob`**需要使用数据类型 FileReader**。

FileReader有以下方法，可以把 Blob转化为其它数据

- **FileReader.prototype.readAsArrayBuffer**
- **FileReader.prototype.readAsText**
- **FileReader.prototype.readAsDataURL**
- **FileReader.prototype.readAsBinaryString**

# 转换

```javascript 
// text 转 blob
const blob =  new Blob('hello'.split('')) 


 // 表示文件的大小 
blob.size

// typedArray 转 blob
 const array = new Uint8Array([128, 128, 128]) 
const blob2 = new Blob([array])


function readBlob (blob, type) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = function (e) {
      resolve(e.target.result)
    }
    reader.readAsArrayBuffer(blob)
  })
}

readBlob(blob, 'DataURL').then(url => console.log(url))
```


# 用途：

## 1.使用Blob最简单的方法就是创建一个URL来指向Blob：

```javascript 
<a download="data.txt" id="getData">下载</a>

var data= 'Hello world!';

var blob = new Blob([data], { type: 'text/html,charset=UTF-8' });

window.URL = window.URL || window.webkitURL;

document.querySelector("#getData").href = URL.createObjectURL(blob);
```


## **2.Blob 响应  或者下载 responseType:'blob'**

```javascript 
window.URL = window.URL || window.webkitURL;  // Take care of vendor prefixes.

var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png', true);
xhr.responseType = 'blob';

xhr.onload = function(e) {
   if (this.status == 200) {
     var blob = this.response;
    var img = document.createElement('img');
     var URL = window.URL || window.webkitURL;  //兼容处理
     var objectUrl = URL.createObjectURL(blob);
     img.onload = function(e) {
       window.URL.revokeObjectURL(img.src); // 释放 url.
     };
     img.src = objectUrl;

     document.body.appendChild(img);
   }
};
xhr.send();
```


[Blob 简介](<./Blob 简介/index.md> "Blob 简介")

[Blob 使用场景](<./Blob 使用场景/index.md> "Blob 使用场景")

[Blob 与 ArrayBuffer 的区别](<./Blob 与 ArrayBuffer 的区别/index.md> "Blob 与 ArrayBuffer 的区别")

[Blob](./index.md "blob")

[数据类型MIME](./数据类型MIME/index.md "数据类型MIME")

## 子目录与文章

- [blob](./blob/index.md)
