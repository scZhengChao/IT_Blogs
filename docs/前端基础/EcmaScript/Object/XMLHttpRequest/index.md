# XMLHttpRequest

## 目录

- [设置请求头](#设置请求头)
- [获取相应头](#获取相应头)
- [响应成功](#响应成功)
- [下载](#下载)

[ XML DOM - XMLHttpRequest 对象  https://www.w3school.com.cn/xmldom/dom\_http.asp](https://www.w3school.com.cn/xmldom/dom_http.asp " XML DOM - XMLHttpRequest 对象  https://www.w3school.com.cn/xmldom/dom_http.asp")

[http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest\_level\_2.html](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html "http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html")  阮一峰

[index.vue](./file/index_IRFSKRz7AD.vue "index.vue")

附上一张 timing 图

![  ](./image/eece31134324e363bbddde6e540605d0_vJethRRgkn.png "  ")

```javascript 
    send(){
                /***
                 * loadstart 为客户端收到第一个字节的时间   
                */
                this.ajax = new XMLHttpRequest()
               
                this.ajax.addEventListener('loadEnd',function(){ //传输结束，但是不知道成功还是失败。
                    console.log('loadEnd',Date.now())
                })
                this.ajax.addEventListener('load',function(){  //传输成功完成。
                    console.log('load',Date.now())
                })
                this.ajax.addEventListener('loadstart',function(){ //传输开始。 收到第一个字节
                    console.log('loadstart',Date.now())
                })
                this.ajax.addEventListener('abort',function(){  //传输被用户取消。
                    console.log('abort',Date.now())
                })
                this.ajax.addEventListener('error',function(){  //传输中出现错误
                    console.log('error',Date.now())
                })
                this.ajax.addEventListener('progress',function(){  // 返回进度信息。 下载的
                    console.log('progress download',Date.now())
                })
                this.ajax.addEventListener('timeout',function(){  // 传输超时
                    console.log('timeout',Date.now())
                })
                this.ajax.upload.addEventListener('progress',function(){  // 返回上传进度信息
                    // 上面的代码中，event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0。
                    if (event.lengthComputable) {
            　　　　　　var percentComplete = event.loaded / event.total;
            　　　　}
                    console.log('progress upload',Date.now())
                })
                let data = {
                    a:1,
                    b:2
                }
                this.ajax.open('POST','http://localhost:3001/express')
                var str = ''
                for(var i in data){
                    str += i + '=' + data[i] + '&'
                }
                str = str.slice(0,-1);
                this.ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                let send = this.ajax.send
                this.ajax.send = function(){
                    this.beginTime = Date.now()
                    console.log('sendtime',this.beginTime)
                    this.addEventListener('readystatechange',function(){
                        if(this.readyState == 4 && this.status == 200){
                            console.log('readystatechange', Date.now())
                            console.log('ajax事件:',Date.now()-this.beginTime)
                        }
                    })
                    return send.apply(this,arguments)
                }
                this.ajax.send(str)
   }
```


# 设置请求头

```javascript 
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

```


# 获取相应头

```javascript 
xhr.getResponseHeader('content-disposition')
```


# 响应成功

```javascript 
this.addEventListener('readystatechange',function(){
    if(this.readyState == 4 && this.status == 200){
        console.log('readystatechange', Date.now())
        console.log('ajax事件:',Date.now()-this.beginTime)
    }
})

```


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
