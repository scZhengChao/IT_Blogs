# html的生命周期

## 目录

- [beforeunload](#beforeunload)
- [结构解析](#结构解析)
- [监听页面是否活动](#监听页面是否活动)
- [onunload  onbeforeunload  onunload](#onunload--onbeforeunload--onunload)

# beforeunload

离开页面提示

```javascript 
window.addeventListenr('beforeunload',function(e){
  const msg = "确定离开页面？"
  e.returnValue = msg
  return msg
})
```


# **结构解析**

这是结构解析,而不是资源加载 &#x20;

```javascript 
document.addEventListener('DOMContentLoaded',function(){},false)   
```


# **监听页面是否活动**

js 监听页面的**隐藏显示或者页面的切换(最小化，或者切换tab）**  注意onload 第一次式不会执行的

```javascript 
 document.addEventListener('visibilitychange',function(){
    console.log(document.visibilityState) //hidden visible
},true)
//注意： ie上必须在事件捕获阶段监听；否则不执行

```


监听 focus 和 blur 事件 比这个更加全面（能监听到页面是否在最上层）

# **onunload  onbeforeunload  onunload**

- **页面加载时只执行onload**
- **页面关闭时先执行onbeforeunload，最后onunload**
- **页面刷新时先执行onbeforeunload，然后onunload，最后onload。**

兼容：
1\. ios微信，关闭浏览器不触发beforeunload，但是触发unload
2\. ios微信，传统页面间的跳转，beforeunload，unload 都不触发

```text 
    
所以出现替代api：
    pageshow   pagehide
pageshow定义和用法
    onpageshow 事件在用户浏览网页时触发。
    onpageshow 事件类似于 onload 事件，onload 事件在页面第一次加载时触发， onpageshow 事件在每次加载页面时触发，即 onload 事件在页面从浏览器缓存中读取时不触发。
    为了查看页面是直接从服务器上载入还是从缓存中读取，你可以使用 PageTransitionEvent 对象的 persisted 属性来判断。 如果页面从浏览器的缓存中读取该属性返回 ture，否则返回 false

pagehide定义和用法
    onpagehide 事件在用户离开网页时触发。
    离开网页有多种方式。如点击一个链接，刷新页面，提交表单，关闭浏览器等。.
    onpagehide 事件有时可以替代 onunload 事件，但 onunload 事件触发后无法缓存页面。
    为了查看页面是直接从服务器上载入还是从缓存中读取，你可以使用 PageTransitionEvent 对象的 persisted 属性来判断。 如果页面从浏览器的缓存中读取该属性返回 ture，否则返回 false 。
```
