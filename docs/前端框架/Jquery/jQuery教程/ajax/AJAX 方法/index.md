# AJAX 方法

## 目录

- [jQuery AJAX 方法](#jQuery-AJAX-方法)

## jQuery AJAX 方法

AJAX 是一种与服务器交换数据的技术，可以在**不重新载入整个页面的情况下更新网页的一部分。**

下面的表格列出了所有的 jQuery AJAX 方法：

|                                                                                                   |                                                    |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| \[\\\$.ajax()]\(<https://www.runoob.com/jquery/ajax-ajax.html> "\\\$.ajax()")                     | 执行异步 AJAX 请求                                       |
| \\\$.ajaxPrefilter()                                                                              | 在每个请求发送之前且被 \\\$.ajax() 处理之前，处理自定义 Ajax 选项或修改已存在选项 |
| \[\\\$.ajaxSetup()]\(<https://www.runoob.com/jquery/ajax-ajaxsetup.html> "\\\$.ajaxSetup()")      | 为将来的 AJAX 请求设置默认值                                  |
| \\\$.ajaxTransport()                                                                              | 创建处理 Ajax 数据实际传送的对象                                |
| \[\\\$.get()]\(<https://www.runoob.com/jquery/ajax-get.html> "\\\$.get()")                        | 使用 AJAX 的 HTTP GET 请求从服务器加载数据                      |
| \[\\\$.getJSON()]\(<https://www.runoob.com/jquery/ajax-getjson.html> "\\\$.getJSON()")            | 使用 HTTP GET 请求从服务器加载 JSON 编码的数据                    |
| \[\\\$.getScript()]\(<https://www.runoob.com/jquery/ajax-getscript.html> "\\\$.getScript()")      | 使用 AJAX 的 HTTP GET 请求从服务器加载并执行 JavaScript          |
| \[\\\$.param()]\(<https://www.runoob.com/jquery/ajax-param.html> "\\\$.param()")                  | 创建数组或对象的序列化表示形式（可用于 AJAX 请求的 URL 查询字符串）            |
| \[\\\$.post()]\(<https://www.runoob.com/jquery/ajax-post.html> "\\\$.post()")                     | 使用 AJAX 的 HTTP POST 请求从服务器加载数据                     |
| \[ajaxComplete()]\(<https://www.runoob.com/jquery/ajax-ajaxcomplete.html> "ajaxComplete()")       | 规定 AJAX 请求完成时运行的函数                                 |
| \[ajaxError()]\(<https://www.runoob.com/jquery/ajax-ajaxerror.html> "ajaxError()")                | 规定 AJAX 请求失败时运行的函数                                 |
| \[ajaxSend()]\(<https://www.runoob.com/jquery/ajax-ajaxsend.html> "ajaxSend()")                   | 规定 AJAX 请求发送之前运行的函数                                |
| \[ajaxStart()]\(<https://www.runoob.com/jquery/ajax-ajaxstart.html> "ajaxStart()")                | 规定第一个 AJAX 请求开始时运行的函数                              |
| \[ajaxStop()]\(<https://www.runoob.com/jquery/ajax-ajaxstop.html> "ajaxStop()")                   | 规定所有的 AJAX 请求完成时运行的函数                              |
| \[ajaxSuccess()]\(<https://www.runoob.com/jquery/ajax-ajaxsuccess.html> "ajaxSuccess()")          | 规定 AJAX 请求成功完成时运行的函数                               |
| \[load()]\(<https://www.runoob.com/jquery/ajax-load.html> "load()")                               | 从服务器加载数据，并把返回的数据放置到指定的元素中                          |
| \[serialize()]\(<https://www.runoob.com/jquery/ajax-serialize.html> "serialize()")                | 编码表单元素集为字符串以便提交                                    |
| \[serializeArray()]\(<https://www.runoob.com/jquery/ajax-serializearray.html> "serializeArray()") | 编码表单元素集为 names 和 values 的数组                        |

| 名称                             | 值/描述                                                       |
| ------------------------------ | ---------------------------------------------------------- |
| async                          | 布尔值，表示请求是否异步处理。默认是 true。                                   |
| beforeSend(\*xhr\*)            | 发送请求前运行的函数。                                                |
| cache                          | 布尔值，表示浏览器是否缓存被请求页面。默认是 true。                               |
| complete(\*xhr,status\*)       | 请求完成时运行的函数（在请求成功或失败之后均调用，即在 success 和 error 函数之后）。         |
| contentType                    | 发送数据到服务器时所使用的内容类型。默认是："application/x-www-form-urlencoded"。 |
| context                        | 为所有 AJAX 相关的回调函数规定 "this" 值。                               |
| data                           | 规定要发送到服务器的数据。                                              |
| dataFilter(\*data\*,\*type\*)  | 用于处理 XMLHttpRequest 原始响应数据的函数。                             |
| dataType                       | 预期的服务器响应的数据类型。                                             |
| error(\*xhr,status,error\*)    | 如果请求失败要运行的函数。                                              |
| global                         | 布尔值，规定是否为请求触发全局 AJAX 事件处理程序。默认是 true。                      |
| ifModified                     | 布尔值，规定是否仅在最后一次请求以来响应发生改变时才请求成功。默认是 false。                  |
| jsonp                          | 在一个 jsonp 中重写回调函数的字符串。                                     |
| jsonpCallback                  | 在一个 jsonp 中规定回调函数的名称。                                      |
| password                       | 规定在 HTTP 访问认证请求中使用的密码。                                     |
| processData                    | 布尔值，规定通过请求发送的数据是否转换为查询字符串。默认是 true。                        |
| scriptCharset                  | 规定请求的字符集。                                                  |
| success(\*result,status,xhr\*) | 当请求成功时运行的函数。                                               |
| timeout                        | 设置本地的请求超时时间（以毫秒计）。                                         |
| traditional                    | 布尔值，规定是否使用参数序列化的传统样式。                                      |
| type                           | 规定请求的类型（GET 或 POST）。                                       |
| url                            | 规定发送请求的 URL。默认是当前页面。                                       |
| username                       | 规定在 HTTP 访问认证请求中使用的用户名。                                    |
| xhr                            | 用于创建 XMLHttpRequest 对象的函数。                                 |
