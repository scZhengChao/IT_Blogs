# 通讯

## 目录

- [父页面向iframe](#父页面向iframe)
- [子页面iframe 向父页面](#子页面iframe-向父页面)
- [监听](#监听)
  - [移交所有权](#移交所有权)

#### 父页面向iframe

```typescript 
frames['test'].postMessage(obj,'http://localhost:9005')  //发送

document.getElementById("mapIframe").contentWindow.postMessage("父页面向子页面发送消息", "*");

document.getElementById("mapIframe").contentWindow.postMessage("父页面给子页面发送信息", "http://10.192.195.166:56225/son.html");



```


#### 子页面iframe 向父页面

```typescript 
window.addEventListener("message",function(eve){  //接受
 console.log(eve.data.data);  // 或者 e.originalEvent
  setTimeout(()=>{  //回信
    eve.source.postMessage('i get it ','/')
    window.parent.postMessage('i get it ','/')
    window.parent.postMessage('子页面向父页面发送消息','*');
  },1000)
},false)

```


### 监听

```javascript 
window.addEventListener("message", function(event) {        // 接受
   console.log(event, event.data);
}, false);
```


#### 移交所有权

```typescript 
otherWindow.postMessage(message, targetOrigin, [transfer]);  //第三个参数 指定是否移交所有权 
window.top.postMessage('message','/',false)  //发送
window.addEventListener("message",function(eve){ //接收
  console.log(eve.data.data,'test')
  setTimeout(()=>{
     eve.source.postMessage('i get it ','/')
  },1000)
},false)

```
