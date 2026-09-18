# select

## 目录

- [操作处理文字  select](#操作处理文字-select)

# \*\*操作处理文字  \*\*select

select 文字的用法 和div 的contenteditable实现双向绑定  禁止文字被选中

div 的contenteditable实现双向绑定 :

[  https://segmentfault.com/a/1190000008261449](https://segmentfault.com/a/1190000008261449 "  https://segmentfault.com/a/1190000008261449")

[https://segmentfault.com/a/1190000009225098](https://segmentfault.com/a/1190000009225098 "https://segmentfault.com/a/1190000009225098")

首先你要判断你需不需要双向绑定,不需要可以以直接操作dom的\$refs.input 获取或者设置值

详细:

[https://www.cnblogs.com/strangerqt/p/3745426.html](https://www.cnblogs.com/strangerqt/p/3745426.html "https://www.cnblogs.com/strangerqt/p/3745426.html")

基础:

[https://www.cnblogs.com/zyzg/p/7856594.html](https://www.cnblogs.com/zyzg/p/7856594.html "https://www.cnblogs.com/zyzg/p/7856594.html")

最清晰range对象,超详细:

[https://www.cnblogs.com/tugenhua0707/p/7395966.html](https://www.cnblogs.com/tugenhua0707/p/7395966.html "https://www.cnblogs.com/tugenhua0707/p/7395966.html")

禁止文字被选中:

[https://blog.csdn.net/toubennuhai/article/details/53039457](https://blog.csdn.net/toubennuhai/article/details/53039457 "https://blog.csdn.net/toubennuhai/article/details/53039457")

```javascript 
 var getSelectedText = function() {
    if (window.getSelection) {
        return window.getSelection();
    } else if (document.getSelection) {
        return document.getSelection();
    }else{
        return "";
    }
}

let text = getSelectedText().toString()
if(text.length>0){
    let rangobject = getSelectedText().getRangeAt(0)
    rangobject.deleteContents();
    let box = document.createElement('a')
    box.setAttribute('href','https://www.baidu.com/')
    box.setAttribute('contenteditable',false)
    box.setAttribute('target','_black')
    box.innerHTML = text
    rangobject.insertNode(box)
}
```
