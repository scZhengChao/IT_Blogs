# 上传

## 目录

- [1. multipart/form-data](#1-multipartform-data)
- [. jQuery上传文件](#-jQuery上传文件)

[ jQuery用FormData对象实现文件上传以及如何通过ajax下载文件 - Kwin的全栈之路 - 博客园 之前在Vue的项目里面用到过文件上传，封装好的组件用起来比较顺手，查询Element UI文档，十八般武器样样都有，一顿操作猛如虎，一看……跑偏了(⊙o⊙)…，我的意思就是用框架实现比较简单，但是如果用jQuery的话，对原理可能会更了解一些，有需要的一起看下吧\~ 1. multipart/form https://www.cnblogs.com/kaidarwang/p/9723938.html](https://www.cnblogs.com/kaidarwang/p/9723938.html " jQuery用FormData对象实现文件上传以及如何通过ajax下载文件 - Kwin的全栈之路 - 博客园 之前在Vue的项目里面用到过文件上传，封装好的组件用起来比较顺手，查询Element UI文档，十八般武器样样都有，一顿操作猛如虎，一看……跑偏了(⊙o⊙)…，我的意思就是用框架实现比较简单，但是如果用jQuery的话，对原理可能会更了解一些，有需要的一起看下吧~ 1. multipart/form https://www.cnblogs.com/kaidarwang/p/9723938.html")

之前在Vue的项目里面用到过文件上传，封装好的组件用起来比较顺手，查询Element-UI文档，十八般武器样样都有，一顿操作猛如虎，一看……跑偏了(⊙o⊙)…，我的意思就是用框架实现比较简单，但是如果用jQuery的话，对原理可能会更了解一些，有需要的一起看下吧\~

##### 1. multipart/form-data

因为HTTP提供的是基于文本的通信协议，而**上传文件传输的是二进制数据**，所以需要使用`multipart/form-data`编码格式，其HTTP消息体格式如下：

```markup 
------WebKitFormBoundaryb0GZcypmEqOvNHIY
Content-Deiposition: form-data; name="file"; filename="icon.png"
Content-Type: image/png

------WebKitFormBoundaryb0GZcypmEqOvNHIY

```


`multipart/form-data`的请求头包含一个特殊的头信息Content-Type，其值为multipart/form-data，另外需要规定一个内容分割boundary用于分割请求体中多个不同的内容：

`Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryb0GZcypmEqOvNHIY`

##### . jQuery上传文件

新版本的XMLHttpRequest对象可以使用`FormData`对象管理表单数据，可以帮我们进行二进制文件的multipart/form-data编码，如下：

```javascript 
$("#uplfileBtn").click(function(){
  var files = $("#uplfile").prop('files');
   
    var data = new FormData();
    data.append('file', files[0]);  //参数名：file
    
    $.ajax({
      url: URL,
        type: 'POST',
        data: data,
        cache: false, //禁止浏览器对该URL的缓存
        contentType: false,
        processData: false,
        success: function(){
          //后续操作
        }
    });
});

```


`   contentType`：jQuery中contentType默认为`application/x-www-form-urlencoded`，因此传入的data会被转为默认的HTTP编码，这里我们不需要这种转换，设置为false。

`processData`：jQuery会将传入的data对象转为字符串来发送HTTP请求，这里我们的data已经是FormData对象处理好的multipart/form-data编码，所以不需要转换，设置为false。
