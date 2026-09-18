# 其他

## 目录

- [querystring](#querystring)
- [url](#url)
- [util](#util)

# **querystring**

```typescript 
//querystring：url转化
let querystring = require('querystring')
console.log(querystring.parse('a=1&b=2'));
console.log(querystring.stringify({ a: '1', b: '2' }));
```


# **url**

```typescript 

 url模块    处理 url 
     url.parse(str,true)  
       str -> obj  返回对象  
      true 处理query->obj 
 

    // url.parse(str) -> obj
    // url.parse(str,true) -> obj  true=把对象的query部分，解析成对象 
    obj参数        http://localhost:8002/aaa?username=sdfsdf&content=234234#title4
      protocol: 'http:',    协议
      slashes: true,    双斜杠
      auth: null,   作者
      host: 'localhost:8002',  主机 www.baidu.com
      port: '8002',    端口
      hostname: 'localhost',  baidu
      hash: '#title',    哈希（锚)
      search: '?username=sdfsdf&content=234234',    数据
      query: 'username=sdfsdf&content=234234',    数据
      pathname: '/aaa',    文件路径
      path: '/aaa?username=sdfsdf&content=234234',    文件路径
      href: 'http://localhost:8002/aaa?username=sdfsdf&content=234234#title'


 url.format(obj)   obj -> str   返回str
```


# **util**

```typescript 
 node内置的一些工具库 
     const  { promisify} = require('util') 
 1.promisify   有点类似工具库你的Q模块； 转为node设计的promise 
 const download =promisify(require('download-git-repo') )
```
