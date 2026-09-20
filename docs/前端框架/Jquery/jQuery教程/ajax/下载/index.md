# 下载

[ 前端 js jQuery ajax实现文件流下载, 下载doc,xsl等文件内容乱码问题\_js下载docx出现乱码-CSDN博客 文章浏览阅读1.1w次，点赞8次，收藏24次。问题描述：前端通过jQuery ajax接受后端的文件流，前端下载文件后内容乱码后端代码：Header("Content-type: application/octet-stream");Header("Accept-Ranges: bytes");前端代码：\$.ajax({  type: "POST",  url: url,  xhrFields:  https://blog.csdn.net/XUANEER/article/details/108496931](https://blog.csdn.net/XUANEER/article/details/108496931 " 前端 js jQuery ajax实现文件流下载, 下载doc,xsl等文件内容乱码问题_js下载docx出现乱码-CSDN博客 文章浏览阅读1.1w次，点赞8次，收藏24次。问题描述：前端通过jQuery ajax接受后端的文件流，前端下载文件后内容乱码后端代码：Header(\"Content-type: application/octet-stream\");Header(\"Accept-Ranges: bytes\");前端代码：\$.ajax({  type: \"POST\",  url: url,  xhrFields:  https://blog.csdn.net/XUANEER/article/details/108496931")

```javascript 
$.ajax({
  type: "POST",
  url: url,
  xhrFields: { responseType: "blob" },
  success: (response) => {
    const blob = new Blob(["\ufeff", response], {type: 'application/msword'});
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = blobUrl;
    a.target = '_blank';
    a.click();
  }
})

```


> jQuery ajax response 类型只能是：xml， html，script，json，jsonp，text。 无法接受blob类型的response。 当后端返回给前端一个文件流的时候，前端ajax会将文件流转化成string 类型。 无法正确读取改文件流，导致文本内容乱码。

> xhrFields: { responseType: "blob" },

这个会存在问题；未解决；

最后决定用 原生的； XMLHttpRequest
