# Content-Type

## 目录

- [语法](#语法)
  - [application/x-www-form-urlencoded](#applicationx-www-form-urlencoded)
  - [ application/json](#applicationjson)
  - [multipart/form-data ](#multipartform-data-)
  - [application/octet-stream](#applicationoctet-stream)
- [常见格式](#常见格式)
- [get请求](#get请求)

[ HTTP Headers Content-Type 详解 - whosmeya - 博客园 Content-Type 实体头部用于指示资源的 MIME 类型 media type 。 语法 Content-Type: text/html; charset=utf-8 Content-Type https://www.cnblogs.com/whosmeya/p/14315632.html](https://www.cnblogs.com/whosmeya/p/14315632.html " HTTP Headers Content-Type 详解 - whosmeya - 博客园 Content-Type 实体头部用于指示资源的 MIME 类型 media type 。 语法 Content-Type: text/html; charset=utf-8 Content-Type https://www.cnblogs.com/whosmeya/p/14315632.html")

[ Content-Type - HTTP | MDN Content-Type 实体头部用于指示资源的 MIME 类型 media type 。 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type " Content-Type - HTTP | MDN Content-Type 实体头部用于指示资源的 MIME 类型 media type 。 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type")

**`content-Type`** 实体头部用于指示资源的 MIME 类型 [media type](https://developer.mozilla.org/zh-CN/docs/Glossary/MIME_type "media type") 。

MediaType，即是Internet Media Type，互联网媒体类型；也叫做MIME类型，在Http协议消息头中，使用Content-Type来表示具体请求中的媒体类型信息。    

在**响应中**，Content-Type 标头**告诉客户端实际返回的内容的内容类型**。浏览器会在某些情况下进行 MIME 查找，并不一定遵循此标题的值; 为了防止这种行为，可以将标题 [X-Content-Type-Options](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-Content-Type-Options "X-Content-Type-Options") 设置为 **nosniff**。

在**请求**中 (如[POST](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST "POST") 或 [PUT](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/PUT "PUT"))，**客户端告诉服务器实际发送的数据类型**。

# 语法

```纯文本 
Content-Type: text/html;  charset =utf-8
Content-Type: multipart/form-data;  boundary =something
```


| 参数         | 说明               |
| ---------- | ---------------- |
| media-type | 资源或数据的 MIME type |
| charset    | 字符编码标准           |
| boundary   | boundary         |

常见 media-type

- text/plain
- application/json
- application/x-www-form-urlencoded
- multipart/form-data

## application/x-www-form-urlencoded

1、不属于http content-type规范，通常用于浏览器表单提交，数据组织格式:**`name1=value1&name2=value2`**,post时会放入http body，get时，显示在在地址栏。

2、所有键与值，都会被urlencoded，请查看[urlencoder](http://blog.csdn.net/wangjun5159/article/details/49451649 "urlencoder")数据组织格式

```typescript 
 contentType一般为默认的application/x-www-form-urlencoded，  key=value$key1=value1
 
var xmlhttp = new XMLHttpRequest();
xmlhttp.open('POST', 'https://xxx.xxx.com/xxx', true);
xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xmlhttp.send('a=1&b=2');
```


##  application/json

```typescript 
 application/json，  消息主题是 序列化的json字符串   
    
$.ajax({
    method: "POST",
    url: "",
    contentType: 'application/json',
    data:JSON.stringify({
            "id": id
    }),
    success: function( data ) {
    
    }
});


var xmlhttp = new XMLHttpRequest();
xmlhttp.open('POST', 'https://xxx.xxx.com/xxx', true);
xmlhttp.setRequestHeader('Content-Type', 'application/json');
xmlhttp.send(JSON.stringify({ a: 1, b: 1 }));
```


## \*\*multipart/form-data \*\*

一种常见的媒体格式是上传文件之时使用：

1、既可以提交普通键值对，也可以提交(多个)文件键值对。

2、HTTP规范中的Content-Type不包含此类型，只能用在POST提交方式下，属于http客户端(浏览器、java httpclient)的扩展

3、通常在浏览器表单中，或者http客户端(java httpclient)中使用。页面中，form的enctype是multipart/form-data,提交时，content-type也是multipart/form-data

```typescript 
const formdata = new FormData();
formdata.append('file', file.file);
formdata.append('businessType', BusinessTypeEnum.房产);
formdata.append('validatorRule', ValidatorRuleEnum.有校验);
formdata.append('compressRule', CompressRuleEnum.按照比例压缩);
const res = await apiFileUploadImg(formdata);
      
 /**
 * 图片上传
 * */
export function apiFileUploadImg(data: FormData): Promise<IResponse<UploadImgModal>> {
  //todo 暂时测试用any
  return request({
    url: '/backend/file/upload',
    method: 'post',
    data,
  });
}
```


## application/octet-stream

1、只能提交二进制，而且只能提交一个二进制，如果提交文件的话，只能提交一个文件,

后台接收参数只能有一个，而且只能是流（或者字节数组）

2、属于HTTP规范中Content-Type的一种

3、很少使用

# 常见格式

```typescript 

   text/html ： HTML格式
   text/plain ：纯文本格式      
   text/xml ：  XML格式
   image/gif ：gif图片格式    
   image/jpeg ：jpg图片格式
   image/png：png图片格式
   以application开头的媒体格式类型：
   application/xhtml+xml ：XHTML格式
   application/xml     ： XML数据格式
   application/atom+xml  ：Atom XML聚合格式    
   application/json    ： JSON数据格式
   application/pdf       ：pdf格式  
   application/msword  ： Word文档格式
   application/octet-stream ： 二进制流数据（如常见的文件下载）
   application/x-www-form-urlencoded ： <form encType=””>中默认的encType，form表单数据被编码为         

```


# get请求

> **“GET”的话,以上三种都可以,因为GET类型的参数是紧跟在url后面,与Content-Type无关。**
