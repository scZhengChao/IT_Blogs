# AJAX请求与回调

## 目录

- [url](#url)
- [type](#type)
- [data](#data)
- [dataType](#dataType)
- [success](#success)
- [context](#context)
- [cache](#cache)
- [error](#error)
- [complete](#complete)
- [jsonp](#jsonp)
- [jsonpCallback](#jsonpCallback)

jQuery 的 AJAX ，核心的请求处理函数只有一个，就是 **\$.ajax()** ，然后就是一个简单的上层函数。 &#x20;

**\$.ajax()** 的基本使用形式是：

`jQuery.ajax( settings )`

***settings*** 是一个对象，里面包含了所有的配置项。

这里，只介绍常用的 **settings** 项：

##### *url*

请求的地址。

##### *type*

请求的方法类型， ***GET***\*\* , \*\*​***POST*** 。 默认是 ***GET*** 。

##### *data*

要发送出去的数据。

##### *dataType*

服务器返回的数据类型，支持： 'xml', 'html', 'script', 'json', 'jsonp', 'text' 。

##### *success*

请求成功时调用的处理函数。 `success(data, textStatus, jqXHR)` 。

##### *context*

回调函数执行时的上下文

##### *cache*

默认为 ***true*** ，是否为请求单独添加一个随机参数以防止浏览器缓存

##### *error*

请求错误时的调用函数。 `error(jqXHR, textStatus, errorThrown)` ，第二个参数是表示请求状态的字符串： "timeout", "error", "abort", "parsererror" 。第三个参数是当 HTTP 错误发生时，具体的错误描述： "Not Found", "Internal Server Error." 等。

##### *complete*

请求结束（无论成功或失败）时的一个回调函数。 `complete(jqXHR, textStatus)` ，第二个参数是表示请求状态的字符串： "success", "notmodified", "error", "timeout", "abort", "parsererror" 。

##### *jsonp*

一个参数名，默认是 ***callback*** ，一般用于指明回调函数名。设置成 ***false*** 可以让请求没有 ***callback*** 参数。

##### *jsonpCallback*

***callback*** 参数值。默认是自动生成的一个随机值。

对于整套应用来说，其资    **源请求通常有一套约定的规则**，使用 **\$.ajaxSetup()** 可以**配置参数的默认值**，参数就是上面介绍的那些（不完整）。

`$.ajax(options)`

AJAX 请求的默认配置。

前面提到过， **\$.ajax()** 是一个核心函数，在其之上，有一些现成的封装，常用的是：

`$.get( url [, data] [, success(data, textStatus, jqXHR)] [, dataType] )`

GET 请求

`$.post( url [, data] [, success(data, textStatus, jqXHR)] [, dataType] )`

POST 请求
