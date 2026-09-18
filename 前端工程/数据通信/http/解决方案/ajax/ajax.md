# ajax

## 目录

- [jsonp](#jsonp)
- [ajax.readyState](#ajaxreadyState)
- [ajax](#ajax)

# jsonp

```typescript 
//promise改装jsonp
function jsonp(url,data){
    var p = new Promise(function(success){
        var str = '';
        for(var i in data){
            str += i + '=' + data[i] + '&'
        }
        str = str.slice(0,-1)
        url = url + '?' + str
        var script = document.createElement('script')
        script.src = url;
        document.body.appendChild(script);
        window[data[data._callback]] = function(res){
            success(res)
        }
    })
    return p
}
//运行 jsonp(url,data).then(function(res){}).

JSONP(JSON with Padding)，前端+后端方案，绕过跨域

//前端构造script标签请求指定URL（由script标签发出的GET请求不受同源策略限制），服务器返回一个函数 执行语句，该函数名称通常由查询参callback的值决定，函数的参数为服务器返回的json数据。该函数在前端执行后即可获取数据。

```


# ajax.readyState

```typescript 
 ajax.readyState 
     0 －（未初始化）还没有调用send()方法 
     1 －（载入）已调用send()方法，正在发送请求 
     2 －（载入完成）send()方法执行完成，已经接收到全部响应内容 
     3 －（交互）正在解析响应内容 
     4 －（完成）响应内容解析完成，可以在客户端调用了
```


# ajax

```typescript 
 //promise 改装后的ajax的封装 
//post
function ajaxPost(url,data){
    var p = new Promise(function(success){
        var d = new Date()
        url = url + '?_t=' + d.getTime()
        var ajax = new XMLHttpRequest()
        ajax.open('POST',url)
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                success(ajax.responseText)
            }
        }
        var str = ''
        for(var i in data){
            str += i + '=' + data[i] + '&'
        }
        str = str.slice(0,-1);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(str)
    })
    return p
}
 //get 
function ajaxGet(url,data){
    var p = new Promise(function(success){
        var d = new Date()
        var str = ''
        for(var i in data){
            str += i + '=' + data[i] + '&'
        }
        url = url + '?' + str + '_t=' + d.getTime()
        var ajax = new XMLHttpRequest()
        ajax.open('GET',url)
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                success(ajax.responseText)
            }
        }
        ajax.send(null)
    })
    return p;
}
```
